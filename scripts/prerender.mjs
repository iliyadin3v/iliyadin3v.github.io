// Injects server-rendered markup into the built HTML files, so every page is
// readable without JavaScript and paints before the bundle loads.
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const pages = [
  ['home', 'dist/index.html'],
  ['plater', 'dist/work/plater/index.html'],
  ['vault', 'dist/work/vault/index.html'],
  ['aura', 'dist/work/aura/index.html'],
  ['404', 'dist/404.html'],
];
for (const [page, file] of pages) {
  const html = await readFile(file, 'utf8');
  const out = html.replace('<div id="root"></div>', `<div id="root">${render(page)}</div>`);
  if (out === html) throw new Error(`root not found in ${file}`);
  await writeFile(file, out);
  console.log('prerendered', file);
}
await rm('dist-ssr', { recursive: true, force: true });

// Provenance sidecars (*.webp.json) stay in the repo for traceability but are not published.
for (const f of await readdir('dist/img')) if (f.endsWith('.json')) await rm(path.join('dist/img', f));
