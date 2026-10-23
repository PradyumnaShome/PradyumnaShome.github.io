const assert = require('node:assert/strict');
const test = require('node:test');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { configureCompression, DISTRIBUTION_ID } = require('../scripts/configure-cloudfront-compression.cjs');

function fixture({ encoded = true, shared = false, managed = false, compressed = false, legacy = false, originHeaders } = {}) {
  const config = { CallerReference: 'original', Aliases: { Quantity: 1, Items: ['pradyumnashome.com'] }, Enabled: true, Comment: 'preserve me', Origins: { Quantity: 1, Items: [{ Id: 'origin', DomainName: 'example.s3.amazonaws.com' }] }, DefaultCacheBehavior: { TargetOriginId: 'origin', CachePolicyId: 'policy', Compress: compressed, ViewerProtocolPolicy: 'redirect-to-https', ...(originHeaders ? { OriginRequestPolicyId: 'origin-policy' } : {}) }, CacheBehaviors: { Quantity: 0 }, ViewerCertificate: { Certificate: 'preserved' } };
  if (legacy) {
    delete config.DefaultCacheBehavior.CachePolicyId;
    Object.assign(config.DefaultCacheBehavior, { MinTTL: 0, DefaultTTL: 123, MaxTTL: 4567, ForwardedValues: { QueryString: true, Cookies: { Forward: 'none' }, Headers: { Quantity: 1, Items: ['Origin'] } } });
  }
  const policy = { Name: 'keep-existing-policy', Comment: 'unchanged', MinTTL: 0, DefaultTTL: 1234, MaxTTL: 9876, ParametersInCacheKeyAndForwardedToOrigin: { EnableAcceptEncodingGzip: encoded, EnableAcceptEncodingBrotli: encoded, HeadersConfig: { HeaderBehavior: 'none' }, CookiesConfig: { CookieBehavior: 'none' }, QueryStringsConfig: { QueryStringBehavior: 'all' } } };
  const calls = [];
  const run = (operation, options) => {
    calls.push({ operation, options: structuredClone(options) });
    if (operation === 'get-distribution-config') return { ETag: 'distribution-version', DistributionConfig: config };
    if (operation === 'get-cache-policy') return { ETag: 'policy-version', CachePolicy: { Id: 'policy', CachePolicyConfig: policy } };
    if (operation === 'get-origin-request-policy') return { OriginRequestPolicy: { OriginRequestPolicyConfig: { HeadersConfig: originHeaders } } };
    if (operation === 'list-cache-policies') return { CachePolicyList: { Items: managed ? [] : [{ CachePolicy: { Id: 'policy' } }] } };
    if (operation === 'list-distributions-by-cache-policy-id') return { DistributionIdList: { Quantity: shared ? 2 : 1, Items: shared ? [DISTRIBUTION_ID, 'another-site'] : [DISTRIBUTION_ID] } };
    if (['update-cache-policy', 'update-distribution', 'wait'].includes(operation)) return {};
    throw new Error(`Unexpected ${operation}`);
  };
  return { config, policy, calls, run };
}

test('inspection performs no writes and preserves the original snapshot', () => {
  const f = fixture();
  const before = structuredClone(f.config);
  const result = configureCompression({ run: f.run });
  assert.equal(result.applied, false);
  assert.deepEqual(f.config, before);
  assert.ok(f.calls.every(call => call.operation.startsWith('get-')));
});

test('distribution update preserves every setting and passes its exact ETag', () => {
  const f = fixture();
  configureCompression({ apply: true, run: f.run });
  const update = f.calls.find(call => call.operation === 'update-distribution').options['cli-input-json'];
  const expected = structuredClone(f.config);
  expected.DefaultCacheBehavior.Compress = true;
  assert.deepEqual(update, { Id: DISTRIBUTION_ID, IfMatch: 'distribution-version', DistributionConfig: expected });
  assert.equal(f.calls.at(-1).operation, 'wait');
  assert.deepEqual(f.calls.at(-1).options, { id: DISTRIBUTION_ID });
});

test('exclusive custom policy changes only encoding flags before distribution deployment', () => {
  const f = fixture({ encoded: false });
  configureCompression({ apply: true, run: f.run });
  const changes = f.calls.filter(call => call.operation.startsWith('update-'));
  assert.deepEqual(changes.map(call => call.operation), ['update-cache-policy', 'update-distribution']);
  const expected = structuredClone(f.policy);
  expected.ParametersInCacheKeyAndForwardedToOrigin.EnableAcceptEncodingGzip = true;
  expected.ParametersInCacheKeyAndForwardedToOrigin.EnableAcceptEncodingBrotli = true;
  assert.deepEqual(changes[0].options['cli-input-json'], { Id: 'policy', IfMatch: 'policy-version', CachePolicyConfig: expected });
});

test('already enabled configuration is idempotent', () => {
  const f = fixture({ compressed: true });
  assert.equal(configureCompression({ apply: true, run: f.run }).distributionToUpdate, false);
  assert.ok(f.calls.every(call => call.operation.startsWith('get-')));
});

test('legacy behavior enables gzip while preserving its entire cache key and TTLs', () => {
  const f = fixture({ legacy: true });
  const summary = configureCompression({ apply: true, run: f.run });
  assert.deepEqual(summary.gzipOnlyBehaviors, ['default']);
  const expected = structuredClone(f.config);
  expected.DefaultCacheBehavior.Compress = true;
  const update = f.calls.find(call => call.operation === 'update-distribution');
  assert.deepEqual(update.options['cli-input-json'].DistributionConfig, expected);
  assert.ok(!f.calls.some(call => call.operation === 'update-cache-policy'));
});

test('legacy Accept-Encoding forwarding refuses any mutation', () => {
  const f = fixture({ legacy: true });
  f.config.DefaultCacheBehavior.ForwardedValues.Headers.Items = ['Accept-Encoding'];
  assert.throws(() => configureCompression({ apply: true, run: f.run }), /Legacy cache behavior forwards/);
  assert.ok(f.calls.every(call => !call.operation.startsWith('update-')));
});

test('mixed live behavior layout enables legacy gzip and preserves CachingDisabled resources exactly', () => {
  const f = fixture({ legacy: true });
  const domainBehavior = { ...structuredClone(f.config.DefaultCacheBehavior), PathPattern: 'd1yvjzzbi5g5l7.cloudfront.net' };
  const resourcesBehavior = { PathPattern: 'resources/*', TargetOriginId: 'origin', CachePolicyId: '4135ea2d-6df8-44a3-9df3-4b5a84be39ad', Compress: false, ViewerProtocolPolicy: 'redirect-to-https', AllowedMethods: { Quantity: 2, Items: ['GET', 'HEAD'], CachedMethods: { Quantity: 2, Items: ['GET', 'HEAD'] } }, ResponseHeadersPolicyId: '0a546385-eba7-4ab7-91c6-5404c4da0bcd' };
  f.config.CacheBehaviors = { Quantity: 2, Items: [resourcesBehavior, domainBehavior] };
  const before = structuredClone(f.config);
  const summary = configureCompression({ apply: true, run: f.run });
  const expected = structuredClone(before);
  expected.DefaultCacheBehavior.Compress = true;
  expected.CacheBehaviors.Items[1].Compress = true;
  const update = f.calls.find(call => call.operation === 'update-distribution').options['cli-input-json'];
  assert.deepEqual(update.DistributionConfig, expected);
  assert.deepEqual(update.DistributionConfig.CacheBehaviors.Items[0], resourcesBehavior);
  assert.deepEqual(f.config, before);
  assert.deepEqual(summary.gzipOnlyBehaviors, ['default', domainBehavior.PathPattern]);
  assert.deepEqual(summary.excludedBehaviors, [{ pathPattern: 'resources/*', policyId: resourcesBehavior.CachePolicyId, reason: 'CachingDisabled: edge compression requires caching' }]);
  assert.deepEqual(summary.cachePoliciesToUpdate, []);
  assert.deepEqual(f.calls.map(call => call.operation), ['get-distribution-config', 'update-distribution', 'wait']);
});

test('a CachingDisabled-only behavior remains a no-op without policy reads or writes', () => {
  const f = fixture();
  f.config.DefaultCacheBehavior.CachePolicyId = '4135ea2d-6df8-44a3-9df3-4b5a84be39ad';
  f.config.DefaultCacheBehavior.OriginRequestPolicyId = 'preserve-unmodified-origin-policy';
  const before = structuredClone(f.config);
  const summary = configureCompression({ apply: true, run: f.run });
  assert.equal(summary.distributionToUpdate, false);
  assert.deepEqual(summary.gzipOnlyBehaviors, []);
  assert.equal(summary.excludedBehaviors[0].pathPattern, 'default');
  assert.deepEqual(f.config, before);
  assert.deepEqual(f.calls.map(call => call.operation), ['get-distribution-config']);
});

test('actual CLI failures expose only the AWS category, not config or credential text', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'cloudfront-cli-test-'));
  try {
    writeFileSync(path.join(directory, 'aws'), `#!${process.execPath}\nprocess.stderr.write('An error occurred (AccessDenied) when calling GetDistributionConfig: secret-origin-header synthetic-credential'); process.exit(1);\n`, { mode: 0o755 });
    const result = spawnSync(process.execPath, [path.join(__dirname, '../scripts/configure-cloudfront-compression.cjs'), '--inspect'], { encoding: 'utf8', env: { ...process.env, PATH: `${directory}${path.delimiter}${process.env.PATH}` } });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /get-distribution-config failed \(AccessDenied\)/);
    assert.doesNotMatch(result.stderr, /secret-origin-header|synthetic-credential/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

for (const [name, options, message] of [
  ['shared policy', { encoded: false, shared: true }, /shared/],
  ['managed policy replacement', { encoded: false, managed: true }, /Managed/],
  ['explicit Accept-Encoding forwarding', { originHeaders: { HeaderBehavior: 'whitelist', Headers: { Items: ['Accept-Encoding'] } } }, /Origin request/],
  ['implicit Accept-Encoding forwarding', { originHeaders: { HeaderBehavior: 'allViewer' } }, /Origin request/],
]) {
  test(`refuses ${name} before any mutation`, () => {
    const f = fixture(options);
    assert.throws(() => configureCompression({ apply: true, run: f.run }), message);
    assert.ok(f.calls.every(call => !call.operation.startsWith('update-') && call.operation !== 'wait'));
  });
}
