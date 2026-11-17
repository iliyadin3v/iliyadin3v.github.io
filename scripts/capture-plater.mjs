// Captures the live plater.bg redesign as source imagery for the case study.
// Uses the locally installed Microsoft Edge through playwright-core (no browser download).
// Viewport captures (what a visitor actually sees) at each section, stepping through tall ones.
// Output: assets-src/plater-live/*.png  (sources; scripts/images.mjs optimizes them)
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('assets-src/plater-live');
const URL = 'https://plater.bg/';

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });

async function prepare(page) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  // Decline non-essential cookies so the banner is not in the captures.
  const decline = page.getByRole('button', { name: /Отказ|Decline|Reject/i }).first();
  if (await decline.isVisible().catch(() => false)) await decline.click();
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
}

async function shoot(page, name) {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
}

// Desktop 1440x960, 2x
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 2, locale: 'bg-BG' });
  const page = await ctx.newPage();
  await prepare(page);
  // Hero: three frames so a frame without a card mid-transition can be chosen.
  for (let i = 0; i < 3; i++) { await shoot(page, `d-hero-${i}`); await page.waitForTimeout(1400); }
  const secs = await page.evaluate(() =>
    [...document.querySelectorAll('section')].map((s, i) => {
      const r = s.getBoundingClientRect();
      return { i, id: s.id || `s${i}`, top: Math.round(r.top + scrollY), height: Math.round(r.height) };
    }).filter((s) => s.height > 120 && s.top > 300)
  );
  for (const s of secs) {
    const steps = Math.max(1, Math.ceil((s.height - 200) / 860));
    for (let k = 0; k < steps; k++) {
      await page.evaluate((y) => window.scrollTo(0, y), s.top - 72 + k * 860);
      await shoot(page, `d-${String(s.i).padStart(2, '0')}-${s.id}-${k}`);
    }
  }
  await ctx.close();
}

// Mobile 390x844, 3x
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'bg-BG' });
  const page = await ctx.newPage();
  await prepare(page);
  await shoot(page, 'm-hero');
  await ctx.close();
}

await browser.close();
console.log('captured to', OUT);
