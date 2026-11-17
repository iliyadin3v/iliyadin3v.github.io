// Measures how light each image's outer edge is and records it in src/content/images.json as
// `edge: 'light' | 'dark'`. The site uses it to pick a picture frame that separates the image
// from the ground it sits on (a white slide on paper needs a stronger hairline than a dark one).
// Usage: node scripts/edge-tone.mjs   (scripts/images.mjs calls the same function for new images)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function edgeTone(input) {
  const { data, info } = await sharp(input).resize({ width: 240 }).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const band = 4;
  let sum = 0;
  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < band || y < band || x >= w - band || y >= h - band) {
        sum += data[y * w + x];
        n++;
      }
    }
  }
  return sum / n > 150 ? 'light' : 'dark';
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = 'src/content/images.json';
  const manifest = JSON.parse(await readFile(file, 'utf8'));
  for (const [key, entry] of Object.entries(manifest)) {
    const largest = entry.files[entry.files.length - 1];
    entry.edge = await edgeTone(path.join('public/img', largest.file));
    console.log(key.padEnd(28), entry.edge);
  }
  await writeFile(file, JSON.stringify(manifest, null, 2));
}
