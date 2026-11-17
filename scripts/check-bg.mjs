// Checks that each Bulgarian content file mirrors its English one: same exports, same keys, same
// array lengths, same ids, image keys and numbers, and that internal links point into /bg/.
// Usage: node scripts/check-bg.mjs [name ...]   (names: site projects plater vault aura)
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const names = process.argv.slice(2).length ? process.argv.slice(2) : ['site', 'projects', 'plater', 'vault', 'aura'];
// Values that must stay identical in both languages
const SAME = new Set(['id', 'slug', 'n', 'key', 'ticket', 'image', 'thumb', 'viewTransition', 'email', 'x', 'y', 'w', 'h', 'hex', 'finding', 'kind', 'type', 'art', 'portrait', 'external', 'live', 'placeholder', 'demo', 'year', 'size']);
let problems = 0;
const fail = (msg) => {
  problems++;
  console.log('  ✗ ' + msg);
};

function compare(en, bg, where) {
  if (Array.isArray(en)) {
    if (!Array.isArray(bg)) return fail(`${where}: expected an array`);
    if (en.length !== bg.length) fail(`${where}: ${en.length} items in English, ${bg.length} in Bulgarian`);
    en.forEach((v, i) => compare(v, bg[i], `${where}[${i}]`));
    return;
  }
  if (en && typeof en === 'object') {
    if (!bg || typeof bg !== 'object') return fail(`${where}: expected an object`);
    for (const k of Object.keys(en)) {
      if (!(k in bg)) fail(`${where}.${k}: missing`);
      else if (SAME.has(k) && typeof en[k] !== 'object' && en[k] !== bg[k] && where.split('.').pop() !== 'type') {
        // `type` is a section renderer in case studies but prose in the archive list
        if (!(k === 'type' && typeof en[k] === 'string' && en[k].includes(' '))) fail(`${where}.${k}: must stay "${en[k]}", got "${bg[k]}"`);
      } else compare(en[k], bg[k], `${where}.${k}`);
    }
    for (const k of Object.keys(bg)) if (!(k in en)) fail(`${where}.${k}: not in English`);
    return;
  }
  if (typeof en !== typeof bg) fail(`${where}: ${typeof en} in English, ${typeof bg} in Bulgarian`);
  if (typeof en === 'string' && /^\/(?!\/)/.test(en) && !en.startsWith('/img/') && !en.startsWith('/cv/')) {
    const want = en === '/' ? '/bg/' : '/bg' + en;
    if (bg !== want) fail(`${where}: internal link should be "${want}", got "${bg}"`);
  }
  if (typeof en === 'string' && typeof bg === 'string' && /^https?:\/\//.test(en) && en !== bg) fail(`${where}: external link changed`);
}

for (const name of names) {
  const bgFile = path.resolve('src/content/bg', name + '.js');
  console.log(name);
  if (!fs.existsSync(bgFile)) {
    fail('src/content/bg/' + name + '.js does not exist yet');
    continue;
  }
  const en = await import(pathToFileURL(path.resolve('src/content', name + '.js')).href);
  const bg = await import(pathToFileURL(bgFile).href + '?t=' + Date.now());
  compare({ ...en }, { ...bg }, name);
  const cyr = JSON.stringify({ ...bg }).match(/[Ѐ-ӿ]/g)?.length || 0;
  console.log(`  Cyrillic characters: ${cyr}`);
}
console.log(problems ? `\n${problems} problem(s)` : '\nall files mirror their English versions');
process.exit(problems ? 1 : 0);
