const assert = require('node:assert/strict');
const test = require('node:test');
const { DISTRIBUTION_ID } = require('../scripts/configure-cloudfront-compression.cjs');
const { ANALYTICS_ORIGINS, canonicalCsp, addAnalyticsConnections, configureSecurity } = require('../scripts/configure-cloudfront-security.cjs');

const CSP = "default-src 'self' *.pradyumnashome.com fonts.gstatic.com fonts.googleapis.com *.youtube.com; frame-src 'self' w.soundcloud.com www.youtube.com; script-src 'self' 'unsafe-inline' www.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self';";

function fixture({ shared = false, managed = false, override = true, csp = CSP, publicCsp = CSP, secondPolicy = false, customHeader = false } = {}) {
  const policy = { Name: 'keep-name', Comment: 'keep-comment', SecurityHeadersConfig: { StrictTransportSecurity: { AccessControlMaxAgeSec: 31536000, IncludeSubdomains: true, Override: true }, ContentTypeOptions: { Override: true } }, CustomHeadersConfig: { Quantity: 1, Items: [{ Header: 'permissions-policy', Value: 'camera=()', Override: true }] } };
  if (customHeader) {
    policy.CustomHeadersConfig.Items.push({ Header: 'Content-Security-Policy', Value: csp, Override: override });
    policy.CustomHeadersConfig.Quantity++;
  } else policy.SecurityHeadersConfig.ContentSecurityPolicy = { ContentSecurityPolicy: csp, Override: override };
  const calls = [];
  const distribution = { Aliases: { Items: ['pradyumnashome.com'] }, DefaultCacheBehavior: { ResponseHeadersPolicyId: 'policy' }, CacheBehaviors: { Items: secondPolicy ? [{ PathPattern: '/other/*', ResponseHeadersPolicyId: 'other-policy' }] : [] } };
  const run = (operation, options) => {
    calls.push({ operation, options: structuredClone(options) });
    if (operation === 'get-distribution-config') return { ETag: 'distribution-version', DistributionConfig: distribution };
    if (operation === 'get-response-headers-policy') return { ETag: 'policy-version', ResponseHeadersPolicy: { ResponseHeadersPolicyConfig: options.id === 'other-policy' ? { Name: 'no-csp' } : policy } };
    if (operation === 'list-response-headers-policies') return { ResponseHeadersPolicyList: { Items: managed ? [] : [{ ResponseHeadersPolicy: { Id: 'policy' } }] } };
    if (operation === 'list-distributions-by-response-headers-policy-id') return { DistributionIdList: { Quantity: shared ? 2 : 1, Items: shared ? [DISTRIBUTION_ID, 'other-distribution'] : [DISTRIBUTION_ID] } };
    if (['update-response-headers-policy', 'wait'].includes(operation)) return {};
    throw new Error(`Unexpected ${operation}`);
  };
  return { calls, policy, distribution, run, readCsp: async () => publicCsp };
}

test('new connect-src preserves the exact fallback sources and every other directive', () => {
  const result = addAnalyticsConnections(CSP);
  assert.ok(result.startsWith(CSP.slice(0, -1)));
  assert.ok(result.includes("connect-src 'self' *.pradyumnashome.com fonts.gstatic.com fonts.googleapis.com *.youtube.com https://www.google-analytics.com https://www.google.com;"));
  assert.equal(addAnalyticsConnections(result), result);
});

test('existing connect-src preserves its sources without inheriting broader defaults', () => {
  const result = addAnalyticsConnections("default-src *; connect-src 'self' https://api.example.com; script-src 'self'");
  assert.match(result, /connect-src 'self' https:\/\/api.example.com https:\/\/www.google-analytics.com https:\/\/www.google.com;/);
  assert.ok(!result.includes('connect-src *'));
  assert.match(addAnalyticsConnections("connect-src 'self' 'self' 'self'"), /https:\/\/www.google-analytics.com https:\/\/www.google.com/);
});

test('CSP matching tolerates formatting, directive order and source ordering', () => {
  assert.equal(canonicalCsp("default-src 'self' https://a.example; img-src 'self';"), canonicalCsp(" IMG-SRC 'self'; default-src https://a.example 'self'"));
  assert.throws(() => canonicalCsp("connect-src 'self'; connect-src *"), /duplicate/);
  assert.throws(() => addAnalyticsConnections("default-src 'none'"), /none/);
});

test('inspection does not write or expose policy configuration', async () => {
  const f = fixture();
  const before = structuredClone(f.policy);
  const summary = await configureSecurity(f);
  assert.deepEqual(f.policy, before);
  assert.ok(f.calls.every(call => !call.operation.startsWith('update-')));
  assert.deepEqual(summary.policiesToUpdate, ['policy']);
  assert.deepEqual(summary.analyticsOrigins, ANALYTICS_ORIGINS);
  assert.ok(!JSON.stringify(summary).includes('keep-comment'));
});

for (const customHeader of [false, true]) {
  test(`exclusive custom policy preserves all fields and ETag (${customHeader ? 'custom' : 'security'} CSP header)`, async () => {
    const f = fixture({ customHeader });
    await configureSecurity({ ...f, apply: true });
    const expected = structuredClone(f.policy);
    if (customHeader) expected.CustomHeadersConfig.Items[1].Value = addAnalyticsConnections(CSP);
    else expected.SecurityHeadersConfig.ContentSecurityPolicy.ContentSecurityPolicy = addAnalyticsConnections(CSP);
    const writes = f.calls.filter(call => call.operation.startsWith('update-'));
    assert.equal(writes.length, 1);
    assert.deepEqual(writes[0].options['cli-input-json'], { Id: 'policy', IfMatch: 'policy-version', ResponseHeadersPolicyConfig: expected });
    assert.deepEqual(f.calls.at(-1), { operation: 'wait', options: { id: DISTRIBUTION_ID } });
  });
}

test('already fixed public policy is idempotent', async () => {
  const csp = addAnalyticsConnections(CSP);
  const f = fixture({ csp, publicCsp: csp });
  assert.deepEqual((await configureSecurity({ ...f, apply: true })).policiesToUpdate, []);
  assert.ok(!f.calls.some(call => call.operation.startsWith('update-') || call.operation === 'wait'));
});

for (const [name, options, message] of [
  ['shared policy', { shared: true }, /Shared/],
  ['managed policy', { managed: true }, /Managed/],
  ['origin CSP precedence', { override: false }, /authority is unproven/],
  ['mismatched public CSP', { publicCsp: "default-src 'self'" }, /differs from the public/],
  ['different behavior CSP source', { secondPolicy: true }, /unambiguous CSP source/],
]) {
  test(`refuses ${name} before any write`, async () => {
    const f = fixture(options);
    await assert.rejects(configureSecurity({ ...f, apply: true }), message);
    assert.ok(!f.calls.some(call => call.operation.startsWith('update-') || call.operation === 'wait'));
  });
}

test('missing behavior policy stops rather than inventing a CSP source', async () => {
  const f = fixture();
  delete f.distribution.DefaultCacheBehavior.ResponseHeadersPolicyId;
  await assert.rejects(configureSecurity({ ...f, apply: true }), /no response headers policy/);
  assert.ok(!f.calls.some(call => call.operation.startsWith('update-')));
});
