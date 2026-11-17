// Injects server-rendered markup into the built HTML files, so every page is
// readable without JavaScript and paints before the bundle loads.
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const pages = [
  ['home', 'dist/index.html', 'en'],
  ['plater', 'dist/work/plater/index.html', 'en'],
  ['vault', 'dist/work/vault/index.html', 'en'],
  ['aura', 'dist/work/aura/index.html', 'en'],
  ['home', 'dist/bg/index.html', 'bg'],
  ['plater', 'dist/bg/work/plater/index.html', 'bg'],
  ['vault', 'dist/bg/work/vault/index.html', 'bg'],
  ['aura', 'dist/bg/work/aura/index.html', 'bg'],
  ['404', 'dist/404.html', 'en'],
];
for (const [page, file, lang] of pages) {
  const html = await readFile(file, 'utf8');
  const out = html.replace('<div id="root"></div>', `<div id="root">${render(page, lang)}</div>`);
  if (out === html) throw new Error(`root not found in ${file}`);
  await writeFile(file, out);
  console.log('prerendered', file);
}
await rm('dist-ssr', { recursive: true, force: true });

// Provenance sidecars (*.webp.json) stay in the repo for traceability but are not published.
for (const f of await readdir('dist/img')) if (f.endsWith('.json')) await rm(path.join('dist/img', f));
