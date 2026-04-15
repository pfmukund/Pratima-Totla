import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'public/img');

const MAX_WIDTH = 1600;
const WEBP_Q = 72;
const AVIF_Q = 55;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

async function convert(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.webp', '.jpg', '.jpeg'].includes(ext)) return null;
  const base = file.slice(0, -ext.length);
  const [buf, origStat] = await Promise.all([readFile(file), stat(file)]);
  const img = sharp(buf).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const [webpBuf, avifBuf] = await Promise.all([
    img.clone().webp({ quality: WEBP_Q, effort: 6 }).toBuffer(),
    img.clone().avif({ quality: AVIF_Q, effort: 6 }).toBuffer(),
  ]);
  await writeFile(base + '.webp', webpBuf);
  await writeFile(base + '.avif', avifBuf);
  return {
    file: path.relative(ROOT, file),
    before: origStat.size,
    webp: webpBuf.length,
    avif: avifBuf.length,
  };
}

const files = await walk(ROOT);
const results = [];
for (const f of files) {
  const r = await convert(f);
  if (r) results.push(r);
}

const totalBefore = results.reduce((a, r) => a + r.before, 0);
const totalWebp = results.reduce((a, r) => a + r.webp, 0);
const totalAvif = results.reduce((a, r) => a + r.avif, 0);
const kb = (b) => (b / 1024).toFixed(1) + 'KB';
console.log('File'.padEnd(38), 'before'.padStart(10), 'webp'.padStart(10), 'avif'.padStart(10));
for (const r of results) {
  console.log(r.file.padEnd(38), kb(r.before).padStart(10), kb(r.webp).padStart(10), kb(r.avif).padStart(10));
}
console.log('TOTAL'.padEnd(38), kb(totalBefore).padStart(10), kb(totalWebp).padStart(10), kb(totalAvif).padStart(10));
console.log('Savings (avif vs before):', ((1 - totalAvif / totalBefore) * 100).toFixed(1) + '%');
