#!/usr/bin/env node
// Rebuild only explicitly referenced assets. Originals are never changed.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const yaml = require('js-yaml');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'static/images/optimized');
sharp.concurrency(1);
sharp.cache({ memory: 32, files: 8, items: 16 });

async function main() {
  const recipes = yaml.load(await fs.readFile(path.join(root, 'src/components/recipes/recipes.yaml'), 'utf8')).recipes;
  const entries = [
    ['pradyumna-shome.jpeg', [320, 640, 960]],
    ...['ai-card-icon.png', 'computer-security-and-privacy-card-icon.png', 'software-engineering-card-logo.png'].map(name => [name, [96, 144]]),
    ...['logo_pink.png', 'logo_simple.png'].map(name => [name, [160, 320, 480]]),
    ...recipes.map(recipe => ['recipes/' + recipe.imageUrl, [360, 720, 1080, 1600]]),
  ];
  await fs.mkdir(output, { recursive: true });
  const manifest = {};
  let originalBytes = 0;
  let derivedBytes = 0;
  let next = 0;
  async function worker() {
    while (next < entries.length) {
      const [name, widths] = entries[next++];
      const source = await fs.readFile(path.join(root, 'static/images', name));
      const metadata = await sharp(source).metadata();
      const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
      const width = rotated ? metadata.height : metadata.width;
      const height = rotated ? metadata.width : metadata.height;
      if (!width || !height) throw new Error('Missing dimensions: ' + name);
      const lossless = !name.startsWith('recipes/') && metadata.hasAlpha;
      const options = { version: 1, widths, lossless, avifQuality: 55, webpQuality: 82 };
      const hash = crypto.createHash('sha256').update(source).update(JSON.stringify(options)).digest('hex').slice(0, 16);
      const stem = path.basename(name, path.extname(name)).replace(/[^a-z0-9_-]/gi, '-');
      const item = { width, height, original: '/images/' + name, avif: [], webp: [] };
      originalBytes += source.length;
      for (const targetWidth of [...new Set(widths.map(value => Math.min(value, width)))]) {
        for (const format of ['avif', 'webp']) {
          const filename = `${stem}-${hash}-${targetWidth}.${format}`;
          const destination = path.join(output, filename);
          let info;
          try {
            info = await sharp(destination).metadata();
          } catch {
            let pipeline = sharp(source).rotate().resize({ width: targetWidth, withoutEnlargement: true }).toColourspace('srgb');
            pipeline = format === 'avif' ? pipeline.avif({ quality: 55, effort: 3 }) : pipeline.webp({ quality: 82, lossless, effort: 4 });
            await pipeline.toFile(destination);
            info = await sharp(destination).metadata();
          }
          const bytes = (await fs.stat(destination)).size;
          derivedBytes += bytes;
          item[format].push({ src: '/images/optimized/' + filename, width: info.width, height: info.height, bytes });
        }
      }
      item.fallback = item.webp[Math.min(1, item.webp.length - 1)].src;
      manifest[item.original] = item;
      console.log('Optimized ' + name);
    }
  }
  await Promise.all([worker(), worker()]);
  const ordered = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(path.join(root, 'src/generated'), { recursive: true });
  const manifestPath = path.join(root, 'src/generated/image-manifest.json');
  await fs.writeFile(manifestPath + '.tmp', JSON.stringify(ordered, null, 2) + '\n');
  await fs.rename(manifestPath + '.tmp', manifestPath);
  console.log(JSON.stringify({ images: entries.length, originalBytes, derivedBytes }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
