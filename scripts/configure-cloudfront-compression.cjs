#!/usr/bin/env node
const { execFileSync } = require('node:child_process');

const DISTRIBUTION_ID = 'E2GNF2ZJTU2DX5';
const SITE = 'pradyumnashome.com';

function aws(operation, options = {}) {
  const args = ['cloudfront', operation];
  if (operation === 'wait') args.push('distribution-deployed');
  args.push('--output', 'json', '--no-cli-pager');
  for (const [key, value] of Object.entries(options)) args.push(`--${key}`, typeof value === 'string' ? value : JSON.stringify(value));
  try {
    const output = execFileSync('aws', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, AWS_PAGER: '' } });
    return output.trim() ? JSON.parse(output) : {};
  } catch (error) {
    // CLI errors can embed full arguments, including origin custom headers.
    // Report only the AWS error category, never command/config/credential data.
    const category = String(error.stderr || '').match(/An error occurred \(([A-Za-z0-9]+)\)/)?.[1];
    throw new Error(`AWS CloudFront ${operation} failed (${category || `exit ${Number.isInteger(error.status) ? error.status : 'unavailable'}`}); configuration omitted`);
  }
}

// Inspect every policy before returning a plan. Never replace a policy, change
// cache TTLs/keys, or modify a policy shared with another distribution.
function inspectCompression(run = aws) {
  const snapshot = run('get-distribution-config', { id: DISTRIBUTION_ID });
  if (!snapshot.ETag || !snapshot.DistributionConfig) throw new Error('Distribution config or ETag is missing');
  const config = structuredClone(snapshot.DistributionConfig);
  if (!config.Aliases?.Items?.includes(SITE)) throw new Error('Distribution is not the expected personal site');
  const behaviors = [config.DefaultCacheBehavior, ...(config.CacheBehaviors?.Items || [])];
  const policies = new Map();
  const policyUpdates = [];
  const gzipOnlyBehaviors = [];
  let distributionChanged = false;
  for (const behavior of behaviors) {
    if (!behavior) throw new Error('Cache behavior is missing');
    if (behavior.OriginRequestPolicyId) {
      const origin = run('get-origin-request-policy', { id: behavior.OriginRequestPolicyId });
      const headers = origin.OriginRequestPolicy?.OriginRequestPolicyConfig?.HeadersConfig;
      const mode = headers?.HeaderBehavior;
      const names = (headers?.Headers?.Items || []).map(name => name.toLowerCase());
      if (mode !== 'none' && !(mode === 'whitelist' && !names.includes('accept-encoding'))) {
        throw new Error('Origin request policy may forward Accept-Encoding; review it before enabling compression');
      }
    }
    if (!behavior.CachePolicyId) {
      const headers = behavior.ForwardedValues?.Headers?.Items || [];
      if (headers.some(header => ['accept-encoding', '*'].includes(header.toLowerCase()))) {
        throw new Error('Legacy cache behavior forwards Accept-Encoding; review it before enabling compression');
      }
      if (!behavior.ForwardedValues) throw new Error('Legacy cache behavior has no ForwardedValues configuration');
      // Legacy settings support gzip with Compress alone. Preserve their full
      // cache key and TTLs; Brotli needs a separately reviewed policy migration.
      gzipOnlyBehaviors.push(behavior.PathPattern || 'default');
    } else if (!policies.has(behavior.CachePolicyId)) {
      const policy = run('get-cache-policy', { id: behavior.CachePolicyId });
      const original = policy.CachePolicy?.CachePolicyConfig;
      if (!policy.ETag || !original?.ParametersInCacheKeyAndForwardedToOrigin) throw new Error('Cache policy config or ETag is missing');
      const next = structuredClone(original);
      const parameters = next.ParametersInCacheKeyAndForwardedToOrigin;
      if (!parameters.EnableAcceptEncodingGzip || !parameters.EnableAcceptEncodingBrotli) {
        const custom = run('list-cache-policies', { type: 'custom' });
        if (!custom.CachePolicyList?.Items?.some(item => item.CachePolicy?.Id === behavior.CachePolicyId)) {
          throw new Error('Managed cache policy lacks compression; policy replacement needs separate review');
        }
        const users = run('list-distributions-by-cache-policy-id', { 'cache-policy-id': behavior.CachePolicyId });
        const list = users.DistributionIdList;
        if (!list || list.NextMarker || list.Items?.length !== 1 || list.Items[0] !== DISTRIBUTION_ID || list.Quantity !== 1) {
          throw new Error('Cache policy is shared or its full distribution usage could not be verified');
        }
        parameters.EnableAcceptEncodingGzip = true;
        parameters.EnableAcceptEncodingBrotli = true;
        policyUpdates.push({ Id: behavior.CachePolicyId, IfMatch: policy.ETag, CachePolicyConfig: next });
      }
      policies.set(behavior.CachePolicyId, next);
    }
    if (!behavior.Compress) {
      behavior.Compress = true;
      distributionChanged = true;
    }
  }
  return {
    policyUpdates,
    gzipOnlyBehaviors,
    distributionUpdate: distributionChanged ? { Id: DISTRIBUTION_ID, IfMatch: snapshot.ETag, DistributionConfig: config } : null,
  };
}

function configureCompression({ apply = false, run = aws } = {}) {
  const plan = inspectCompression(run);
  const summary = { distributionId: DISTRIBUTION_ID, cachePoliciesToUpdate: plan.policyUpdates.map(update => update.Id), distributionToUpdate: Boolean(plan.distributionUpdate), gzipOnlyBehaviors: plan.gzipOnlyBehaviors, applied: apply };
  if (apply) {
    for (const update of plan.policyUpdates) run('update-cache-policy', { 'cli-input-json': update });
    if (plan.distributionUpdate) run('update-distribution', { 'cli-input-json': plan.distributionUpdate });
    // The following S3 deploy creates the existing /* invalidation only after
    // this config has reached every edge, so cached uncompressed files retire.
    if (plan.policyUpdates.length || plan.distributionUpdate) run('wait', { id: DISTRIBUTION_ID });
  }
  return summary;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 1 || !['--inspect', '--apply'].includes(args[0])) {
    process.stderr.write('Usage: node scripts/configure-cloudfront-compression.cjs --inspect|--apply\n');
    process.exitCode = 1;
  } else {
    try {
      process.stdout.write(`${JSON.stringify(configureCompression({ apply: args[0] === '--apply' }))}\n`);
    } catch (error) {
      process.stderr.write(`CloudFront compression configuration failed: ${error.message}\n`);
      process.exitCode = 1;
    }
  }
}

module.exports = { DISTRIBUTION_ID, aws, inspectCompression, configureCompression };
