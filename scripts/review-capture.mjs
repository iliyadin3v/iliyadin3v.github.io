// QA captures of the running site at the shipped viewport sizes.
// Usage: node scripts/review-capture.mjs [baseUrl]   (default http://localhost:5173)
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://localhost:5173';
const OUT = '.impeccable/review';
await mkdir(OUT, { recursive: true });

const sizes = [
  { name: 'desktop', width: 1440, height: 900, dpr: 1 },
  { name: 'tablet', width: 834, height: 1112, dpr: 1 },
  { name: 'mobile', width: 390, height: 844, dpr: 1, mobile: true },
];
const pages = [
  { name: 'home', path: '/' },
  { name: 'plater', path: '/work/plater/' },
];

const browser = await chromium.launch({ channel: 'msedge' });
for (const s of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: s.dpr,
    isMobile: !!s.mobile,
    hasTouch: !!s.mobile,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  for (const p of pages) {
    await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.screenshot({ path: `${OUT}/${p.name}-${s.name}-fold.png` });
    await page.screenshot({ path: `${OUT}/${p.name}-${s.name}.png`, fullPage: true });
    console.log(p.name, s.name, 'overflow-x:', overflow, errors.length ? 'errors: ' + errors.join(' | ') : '');
    errors.length = 0;
  }
  await ctx.close();
}
await browser.close();
