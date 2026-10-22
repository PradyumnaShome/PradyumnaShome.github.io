const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');
const { test } = require('node:test');
const { findOptionalRequest, findOptionalDownloadPackages } = require('../scripts/apply-security-patches.cjs');

async function listen(server) {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
}

test('Gatsby detects an extensionless downloaded JPEG with the patched file-type API', async () => {
  const { fetchRemoteFile } = require('gatsby-core-utils/dist/fetch-remote-file');
  const { closeDatabase } = require('gatsby-core-utils/dist/utils/get-storage');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'personal-security-'));
  const image = await fs.readFile(path.join(__dirname, '../static/images/pradyumna-shome.jpeg'));
  const previousGlobal = global.__GATSBY;
  global.__GATSBY = { root: directory };
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/octet-stream');
    response.end(image);
  });
  try {
    const origin = await listen(server);
    const file = await fetchRemoteFile({ url: `${origin}/asset`, directory });
    assert.equal(path.extname(file), '.jpg');
    assert.deepEqual(await fs.readFile(file), image);
  } finally {
    await close(server);
    await closeDatabase();
    global.__GATSBY = previousGlobal;
    await fs.rm(directory, { recursive: true, force: true });
  }
});

const requestManifest = process.env.SECURITY_REQUEST_MANIFEST || findOptionalRequest();
test('the optional S3 download helper preserves multipart, OAuth and digest UUID behavior', {
  skip: requestManifest ? false : 'The optional git-win request package is absent on this platform.',
}, async () => {
  const request = createRequire(requestManifest)(path.dirname(requestManifest));
  const server = http.createServer(async (incoming, response) => {
    if (incoming.url === '/digest' && !incoming.headers.authorization) {
      response.writeHead(401, { 'WWW-Authenticate': 'Digest realm="security", nonce="fixture", qop="auth"' });
      return response.end();
    }
    const chunks = [];
    for await (const chunk of incoming) chunks.push(chunk);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ headers: incoming.headers, body: Buffer.concat(chunks).toString() }));
  });
  const call = options => new Promise((resolve, reject) => {
    request(options, (error, response, body) => error ? reject(error) : resolve({ response, body: JSON.parse(body) }));
  });
  try {
    const origin = await listen(server);
    const multipart = await call({ method: 'POST', url: `${origin}/multipart`, multipart: [{ 'content-type': 'text/plain', body: 'security-fixture' }] });
    assert.equal(multipart.response.statusCode, 200);
    assert.match(multipart.body.headers['content-type'], /boundary=[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i);
    assert.match(multipart.body.body, /security-fixture/);
    const oauth = await call({ url: `${origin}/oauth`, oauth: { consumer_key: 'fixture', consumer_secret: 'fixture' } });
    assert.match(oauth.body.headers.authorization, /oauth_nonce="[0-9a-f]{32}"/i);
    const digest = await call({ url: `${origin}/digest`, auth: { user: 'fixture', pass: 'fixture', sendImmediately: false } });
    assert.equal(digest.response.statusCode, 200);
    assert.match(digest.body.headers.authorization, /^Digest /);
    assert.match(digest.body.headers.authorization, /cnonce="[0-9a-f-]+"/i);
  } finally {
    await close(server);
  }
});

const gitWinManifest = process.env.SECURITY_GIT_WIN_MANIFEST || findOptionalDownloadPackages()['git-win'];
test('the optional Git download helper reads fresh release JSON with patched got', {
  skip: gitWinManifest ? false : 'The optional git-win package is absent on this platform.',
}, async () => {
  const vm = require('node:vm');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'personal-git-security-'));
  const dependencyRequire = createRequire(require.resolve('gatsby/package.json'));
  const got = dependencyRequire('got');
  const release = { id: 2026, tag_name: 'v2.50.0', body: `Git-2.50.0-64-bit.exe | ${'a'.repeat(64)}`, assets: [{ name: 'Git-2.50.0-64-bit.exe', content_type: 'application/executable' }] };
  let requests = 0;
  const server = http.createServer((incoming, response) => {
    requests += 1;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify([release]));
  });
  try {
    const origin = await listen(server);
    const source = await fs.readFile(path.join(path.dirname(gitWinManifest), 'lib/get-release.js'), 'utf8');
    const loaded = { exports: {} };
    vm.runInNewContext(source, {
      module: loaded,
      exports: loaded.exports,
      __dirname: directory,
      require: name => name === 'got' ? (url, options) => got(`${origin}/releases`, options)
        : name === './data-cache.json' ? [] : dependencyRequire(name),
    }, { filename: 'git-win/get-release.js' });
    const result = await loaded.exports();
    assert.equal(requests, 1);
    assert.equal(result.id, release.id);
    assert.equal(result.assets[0].hash, 'a'.repeat(64));
    assert.equal(JSON.parse(await fs.readFile(path.join(directory, 'data-cache.json'), 'utf8'))[0].id, release.id);
  } finally {
    await close(server);
    await fs.rm(directory, { recursive: true, force: true });
  }
});
