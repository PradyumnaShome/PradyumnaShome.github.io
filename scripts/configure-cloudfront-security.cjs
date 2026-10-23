#!/usr/bin/env node
const { aws, DISTRIBUTION_ID } = require('./configure-cloudfront-compression.cjs');

const SITE_URL = 'https://pradyumnashome.com/';
// Observed blocked GA4 collect requests. Avoid broader Google wildcards and
// preserve script-src. https://developers.google.com/tag-platform/security/guides/csp
const ANALYTICS_ORIGINS = ['https://www.google-analytics.com', 'https://www.google.com'];

function parseCsp(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('CSP is missing');
  const directives = new Map();
  for (const segment of value.split(';')) {
    const tokens = segment.trim().split(/\s+/);
    if (!tokens[0]) continue;
    const name = tokens.shift().toLowerCase();
    if (!/^[a-z][a-z0-9-]*$/.test(name) || directives.has(name)) throw new Error('CSP has invalid or duplicate directives; review before editing');
    directives.set(name, tokens);
  }
  return directives;
}

function canonicalCsp(value) {
  return JSON.stringify([...parseCsp(value)].map(([name, tokens]) => [name, [...new Set(tokens)].sort()]).sort(([a], [b]) => a.localeCompare(b)));
}

function addAnalyticsConnections(value) {
  const directives = parseCsp(value);
  const sources = directives.get('connect-src') || directives.get('default-src');
  if (!sources?.length || sources.includes("'none'")) throw new Error('Connection fallback is empty or none; review before granting analytics destinations');
  const missing = ANALYTICS_ORIGINS.filter(origin => !sources.includes(origin));
  if (directives.has('connect-src') && !missing.length) return value;
  const next = [...sources, ...missing];
  const segments = value.split(';');
  const index = segments.findIndex(segment => segment.trim().split(/\s+/)[0]?.toLowerCase() === 'connect-src');
  if (index >= 0) {
    const leading = segments[index].match(/^\s*/)[0];
    segments[index] = `${leading}connect-src ${next.join(' ')}`;
  } else {
    const insertion = ` connect-src ${next.join(' ')}`;
    if (!segments.at(-1).trim()) segments.splice(segments.length - 1, 0, insertion);
    else segments.push(insertion);
  }
  return segments.join(';');
}

async function readPublicCsp() {
  const response = await fetch(SITE_URL, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Public CSP inspection failed with HTTP ${response.status}`);
  const value = response.headers.get('content-security-policy');
  if (!value) throw new Error('Public site has no CSP header to match');
  return value;
}

function policyCsp(config) {
  const security = config.SecurityHeadersConfig?.ContentSecurityPolicy;
  const custom = (config.CustomHeadersConfig?.Items || []).filter(item => item.Header?.toLowerCase() === 'content-security-policy');
  if ((security ? 1 : 0) + custom.length !== 1) throw new Error('Response policy is not the unambiguous CSP source; review origin or edge headers');
  const target = security || custom[0];
  if (target.Override !== true) throw new Error('Response policy does not override origin CSP; its authority is unproven');
  return { target, key: security ? 'ContentSecurityPolicy' : 'Value' };
}

async function inspectSecurity({ run = aws, readCsp = readPublicCsp } = {}) {
  const snapshot = run('get-distribution-config', { id: DISTRIBUTION_ID });
  const distribution = snapshot.DistributionConfig;
  if (!snapshot.ETag || !distribution?.Aliases?.Items?.includes('pradyumnashome.com')) throw new Error('Distribution identity or ETag could not be verified');
  const behaviors = [distribution.DefaultCacheBehavior, ...(distribution.CacheBehaviors?.Items || [])];
  if (behaviors.some(behavior => !behavior?.ResponseHeadersPolicyId)) throw new Error('A cache behavior has no response headers policy; CSP source requires review');
  const publicCsp = await readCsp();
  const publicCanonical = canonicalCsp(publicCsp);
  const updates = [];
  const inspectedPolicyIds = [...new Set(behaviors.map(behavior => behavior.ResponseHeadersPolicyId))];
  for (const id of inspectedPolicyIds) {
    const snapshot = run('get-response-headers-policy', { id });
    const original = snapshot.ResponseHeadersPolicy?.ResponseHeadersPolicyConfig;
    if (!snapshot.ETag || !original) throw new Error('Response headers policy config or ETag is missing');
    const config = structuredClone(original);
    const { target, key } = policyCsp(config);
    if (canonicalCsp(target[key]) !== publicCanonical) throw new Error('Attached policy CSP differs from the public header; review behavior-specific headers before editing');
    const nextCsp = addAnalyticsConnections(target[key]);
    if (nextCsp === target[key]) continue;
    const custom = run('list-response-headers-policies', { type: 'custom' });
    if (!custom.ResponseHeadersPolicyList?.Items?.some(item => item.ResponseHeadersPolicy?.Id === id)) throw new Error('Managed response policy needs a separately reviewed clone and assignment');
    const usage = run('list-distributions-by-response-headers-policy-id', { 'response-headers-policy-id': id }).DistributionIdList;
    if (!usage || usage.NextMarker || usage.Quantity !== 1 || usage.Items?.length !== 1 || usage.Items[0] !== DISTRIBUTION_ID) throw new Error('Shared response policy requires a separately reviewed clone and assignment');
    target[key] = nextCsp;
    updates.push({ Id: id, IfMatch: snapshot.ETag, ResponseHeadersPolicyConfig: config });
  }
  return { updates, inspectedPolicyIds };
}

async function configureSecurity({ apply = false, run = aws, readCsp = readPublicCsp } = {}) {
  // Complete discovery and all guards before the first write. Preserve every
  // existing policy field and use each policy's exact ETag for IfMatch.
  const plan = await inspectSecurity({ run, readCsp });
  if (apply) {
    for (const update of plan.updates) run('update-response-headers-policy', { 'cli-input-json': update });
    if (plan.updates.length) run('wait', { id: DISTRIBUTION_ID });
  }
  return { distributionId: DISTRIBUTION_ID, inspectedPolicyIds: plan.inspectedPolicyIds, policiesToUpdate: plan.updates.map(update => update.Id), analyticsOrigins: ANALYTICS_ORIGINS, applied: apply };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && !['--inspect', '--apply'].includes(args[0]))) {
    process.stderr.write('Usage: node scripts/configure-cloudfront-security.cjs [--inspect|--apply]\n');
    process.exitCode = 1;
  } else configureSecurity({ apply: args[0] === '--apply' }).then(summary => process.stdout.write(`${JSON.stringify(summary)}\n`)).catch(error => {
    process.stderr.write(`CloudFront CSP configuration failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = { ANALYTICS_ORIGINS, canonicalCsp, addAnalyticsConnections, configureSecurity };
