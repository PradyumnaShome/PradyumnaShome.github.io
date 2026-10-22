const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { spawnSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');

function findOptionalDownloadPackages(root = projectRoot) {
  const packages = {};
  let manifest = path.join(root, 'package.json');
  for (const name of ['gatsby-plugin-s3', 'fs-posix', 'git-win', 'nugget', 'request']) {
    try {
      manifest = createRequire(manifest).resolve(`${name}/package.json`);
      packages[name] = manifest;
    } catch (error) {
      // git-win is an optional dependency and is absent on macOS installs.
      if (name === 'git-win' && error.code === 'MODULE_NOT_FOUND') return packages;
      throw error;
    }
  }
  return packages;
}

function findOptionalRequest(root = projectRoot) {
  return findOptionalDownloadPackages(root).request;
}

function applyPatchDirectory(directory, cwd = projectRoot) {
  const result = spawnSync(process.execPath, [
    require.resolve('patch-package'),
    '--error-on-fail',
    '--patch-dir',
    path.relative(cwd, path.join(projectRoot, 'patches', directory)),
  ], { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Security patches failed: ${directory}`);
}

function applySecurityPatches() {
  applyPatchDirectory('gatsby');
  const packages = findOptionalDownloadPackages();
  for (const [name, version, directory] of [
    ['git-win', '2.3.0', 'optional-git-win'],
    ['request', '2.88.2', 'optional-request'],
  ]) {
    const manifestPath = packages[name];
    if (!manifestPath) continue;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.version !== version) throw new Error(`Review the ${name} security compatibility patch before upgrading.`);
    // Apply relative to its owning node_modules directory, including nested installs.
    applyPatchDirectory(directory, path.dirname(path.dirname(path.dirname(manifestPath))));
  }
}

if (require.main === module) applySecurityPatches();
module.exports = { findOptionalRequest, findOptionalDownloadPackages, applySecurityPatches };
