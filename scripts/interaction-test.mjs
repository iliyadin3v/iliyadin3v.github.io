// Drives the interactive parts with keyboard, mouse and touch, and reports what changed.
// Usage: node scripts/interaction-test.mjs [baseUrl]
import { chromium } from 'playwright-core';

const BASE = process.argv[2] || 'http://localhost:5173';
const OUT = '.impeccable/review';
const browser = await chromium.launch({ channel: 'msedge' });
const results = [];
const ok = (name, pass, detail = '') => results.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`);

// ---------- Home, desktop ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  await page.keyboard.press('Tab');
  ok('skip link is first tab stop', (await page.evaluate(() => document.activeElement.className)) === 'skip-link');

  const time = await page.textContent('.nav-clock time');
  ok('nav shows live Sofia time', /^\d\d:\d\d$/.test(time.trim()), time);

  // Hero: the name built in 3D. One h1 for assistive tech, the build hidden from it, animated,
  // centred on the stage, and paused off screen
  ok('one h1 names the page', (await page.locator('h1').count()) === 1 && (await page.textContent('h1')).trim() === 'Iliya Dinev');
  ok('the 3D name is decorative', (await page.locator('.hero .nb[aria-hidden="true"]').count()) === 1);
  const nb = await page.locator('.nb__scene').boundingBox();
  ok('the 3D name sits in the middle of the stage', Math.abs(nb.x + nb.width / 2 - 720) < 60, String(Math.round(nb.x + nb.width / 2)));
  const nbRunning = () => page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.nb')).length);
  ok('the 3D name moves', (await nbRunning()) >= 3, String(await nbRunning()));
  const lede = await page.locator('.hero__lede').boundingBox();
  const cta = await page.locator('.hero .btn--accent').boundingBox();
  ok('lede and main action are in the first screen', lede.y + lede.height <= 900 && cta.y + cta.height <= 900, `${Math.round(cta.y + cta.height)}`);
  await page.evaluate(() => window.scrollTo(0, document.getElementById('work').offsetTop));
  await page.waitForTimeout(500);
  await page.click('.hero__email');
  await page.waitForTimeout(2200);
  ok('hero "Email me" glides to the contact section', Math.abs((await page.evaluate(() => document.getElementById('contact').getBoundingClientRect().top)) - 76) < 40 || (await page.evaluate(() => Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2)));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  ok('the 3D name pauses off screen', (await page.getAttribute('.hero', 'data-still')) !== null && (await nbRunning()) === 0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // What I do: three decorative 3D scenes, animating while on screen and paused off it
  ok('pillar scenes: three, all decorative', (await page.locator('.pillar__art .ik[aria-hidden="true"]').count()) === 3);
  const ikRunning = () => page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.ik')).length);
  await page.evaluate(() => document.getElementById('practice').scrollIntoView());
  // the scenes hold still while the page is scrolling and resume once it settles
  await page.waitForFunction(() => !document.documentElement.classList.contains('lenis-scrolling'), null, { timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(400);
  ok('pillar scenes animate on screen', (await ikRunning()) >= 6, String(await ikRunning()));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  ok('pillar scenes pause off screen', (await page.getAttribute('.pillars', 'data-still')) !== null && (await ikRunning()) === 0);
  const titles = await page.evaluate(() => [...document.querySelectorAll('.pillar__title')].map((t) => Math.round(t.getBoundingClientRect().top)));
  ok('pillar titles line up', new Set(titles).size === 1, titles.join(','));

  // Pinned order scene steps through stations
  await page.evaluate(() => window.scrollTo(0, document.getElementById('order').offsetTop + 10));
  await page.waitForTimeout(800);
  const s1 = await page.textContent('.scene-step__station');
  await page.evaluate(() => window.scrollTo(0, document.getElementById('order').offsetTop + innerHeight * 2.2));
  await page.waitForTimeout(900);
  const s3 = await page.textContent('.scene-step__station');
  ok('order scene moves table → waiter on scroll', s1.trim() === 'Table' && s3.trim() === 'Waiter', `${s1} → ${s3}`);
  ok('scene is pinned', (await page.getAttribute('#order', 'data-pinned')) !== null);
  ok('order scene shows the station in 3D, decorative', (await page.locator('#order .scene-step__art .ik--station').count()) === 1 && (await page.locator('#order .ik--station[aria-hidden="true"]').count()) === 1);


  // Header ground follows the section beneath
  await page.evaluate(() => window.scrollTo(0, document.getElementById('about').offsetTop + 200));
  await page.waitForTimeout(1200);
  ok('header turns paper over the menu/about', (await page.getAttribute('.site-header', 'data-under')) === 'paper');
  await page.evaluate(() => window.scrollTo(0, document.getElementById('order').offsetTop + 200));
  await page.waitForTimeout(500);
  ok('header turns night again over the order scene', (await page.getAttribute('.site-header', 'data-under')) === 'night');

  await page.click('.copy-btn');
  await page.waitForTimeout(200);
  ok('copy button copies and says so', (await page.textContent('.copy-btn')).includes('Copied'));

  ok('no page errors (home)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Home, mobile touch ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('scene not pinned on phones', (await page.getAttribute('#order', 'data-pinned')) === null);
  ok('3D name sits above the words on phones and the action is in the first screen', (await page.locator('.nb__scene').boundingBox()).y < (await page.locator('.hero__lede').boundingBox()).y && (await page.locator('.hero .btn--accent').boundingBox()).y < 844);
  const small = await page.evaluate(() =>
    [...document.querySelectorAll('a, button')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const inline = getComputedStyle(el).display === 'inline';
        return r.width > 0 && r.height > 0 && r.height < 32 && !inline && !el.classList.contains('skip-link');
      })
      .map((el) => (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24) + ':' + Math.round(el.getBoundingClientRect().height))
  );
  ok('block-level touch targets at least 32px', small.length === 0, small.slice(0, 6).join(', '));
  ok('no page errors (mobile)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Case study ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + '/work/plater/', { waitUntil: 'networkidle' });

  const alt = () => page.getAttribute('.compare__img img', 'alt');
  const a0 = await alt();
  await page.click('.compare__state >> text=Before');
  await page.waitForTimeout(400);
  ok('compare: Before shows the old screen', (await alt()).startsWith('Before') && a0 !== (await alt()));
  await page.locator('.lens').scrollIntoViewIfNeeded();
  await page.click('.lens__btn >> nth=2');
  await page.waitForTimeout(400);
  ok('lens: decision 3 expands, pin lit, leader drawn', (await page.getAttribute('.lens__btn >> nth=2', 'aria-expanded')) === 'true' && (await page.locator('.lens__line path').count()) === 1);
  await page.evaluate(() => document.getElementById('outcome').scrollIntoView());
  await page.waitForTimeout(900);
  const served = await page.locator('.cs-toc li[data-served]').count();
  ok('order-ticket TOC strikes off read sections', served >= 5, `${served} struck`);
  await page.locator('.cs-toc').screenshot({ path: `${OUT}/i-toc.png` });
  await page.locator('.demo').scrollIntoViewIfNeeded();
  await page.click('.demo-btn--primary');
  await page.waitForTimeout(300);
  await page.click('.demo-col--new .demo-btn');
  await page.waitForTimeout(300);
  await page.click('.demo-col--cooking .demo-btn');
  await page.waitForTimeout(300);
  ok('case: order demo reaches the waiter', (await page.locator('.demo-alert').count()) === 1);
  ok('no page errors (case)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Vault and Aura case studies ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  // The home cards link to the new pages, not to Behance
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('home: Vault card opens its case study', (await page.getAttribute('#work-vault .wk-link', 'href')) === '/work/vault/');
  ok('home: Aura card opens its case study', (await page.getAttribute('#work-aura .wk-link', 'href')) === '/work/aura/');

  for (const slug of ['vault', 'aura']) {
    await page.goto(`${BASE}/work/${slug}/`, { waitUntil: 'networkidle' });
    const h1 = (await page.textContent('h1')).trim();
    const sections = await page.locator('.cs-section').count();
    const empty = await page.evaluate(() => [...document.querySelectorAll('.cs-section')].filter((s) => s.children.length < 2).map((s) => s.id));
    ok(`${slug}: page renders every section`, h1.toLowerCase() === slug && sections >= 8 && empty.length === 0, `${sections} sections${empty.length ? ', empty: ' + empty.join(',') : ''}`);
    ok(`${slug}: status is not marked live`, (await page.locator('.cs-meta .status[data-live]').count()) === 0);
    ok(`${slug}: Behance stays linked`, (await page.locator('.cs-meta a[href*="behance.net"]').count()) === 1);
  }
  // Aura's decision lens on a portrait screen
  await page.locator('.lens').scrollIntoViewIfNeeded();
  await page.click('.lens__btn >> nth=3');
  await page.waitForTimeout(400);
  ok('aura: lens decision 4 opens with a leader line', (await page.getAttribute('.lens__btn >> nth=3', 'aria-expanded')) === 'true' && (await page.locator('.lens__line path').count()) === 1);
  ok('aura: lens has no audit-finding links', (await page.locator('.lens__ref').count()) === 0);
  ok('no page errors (vault, aura)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Bulgarian ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('EN home: skills listed', (await page.textContent('#about')).includes('A/B testing, heatmaps, SEO'));
  ok('EN home: switch links to the Bulgarian home', (await page.getAttribute('.lang__opt[hreflang="bg"]', 'href')) === '/bg/' && (await page.getAttribute('.lang__opt[aria-current]', 'hreflang')) === 'en');
  await page.click('.hero__email');
  await page.waitForTimeout(2200);
  ok('EN home: switch keeps no section anchor', (await page.getAttribute('.lang__opt[hreflang="bg"]', 'href')) === '/bg/');
  await page.click('.lang__opt[hreflang="bg"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);
  ok('BG switch opens the page at the top, not scrolled down', (await page.evaluate(() => Math.round(window.scrollY))) < 5, String(await page.evaluate(() => Math.round(window.scrollY))));
  ok('BG switch opens /bg/ in Bulgarian', page.url().endsWith('/bg/') && (await page.getAttribute('html', 'lang')) === 'bg' && (await page.getAttribute('.lang__opt[aria-current]', 'hreflang')) === 'bg');
  ok('BG home: navigation and headings in Bulgarian', (await page.textContent('.nav__link[data-nav="work"]')).trim() === 'Проекти' && /[А-Яа-я]/.test(await page.textContent('#pillars-h')) && /[А-Яа-я]/.test(await page.textContent('.hero__lede')));
  ok('BG home: skills listed in his words', (await page.textContent('#about')).includes('SEO оптимизация') && (await page.textContent('#about')).includes('Цялостен дизайн'));
  const fonts = await page.evaluate(() => [getComputedStyle(document.querySelector('.hero__lede')).fontFamily, getComputedStyle(document.querySelector('.nb__scene')).fontFamily]);
  ok('BG home: Cyrillic set in Onest, the 3D name stays in Mona Sans', fonts[0].includes('Onest') && fonts[1].startsWith('"Mona Sans'), fonts.join(' | '));
  ok('BG home: case study links stay in Bulgarian', (await page.getAttribute('#work-vault .wk-link', 'href')) === '/bg/work/vault/' && (await page.getAttribute('#work-plater .wk-name a', 'href')) === '/bg/work/plater/');
  for (const slug of ['plater', 'vault', 'aura']) {
    await page.goto(`${BASE}/bg/work/${slug}/`, { waitUntil: 'networkidle' });
    const toc = (await page.textContent('.cs-toc__head')).trim();
    const back = await page.getAttribute('.cs-back', 'href');
    const en = await page.getAttribute('.lang__opt[hreflang="en"]', 'href');
    const sections = await page.locator('.cs-section').count();
    ok(`BG ${slug}: Bulgarian page with every section, switch back to English`, toc === 'На тази страница' && back === '/bg/#work' && en === `/work/${slug}/` && sections >= 8, `${sections} sections`);
  }
  ok('no page errors (bulgarian)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Reduced motion ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('reduced motion: scene renders as stacked steps', (await page.locator('.scene__list .scene-step').count()) === 4);
  ok('reduced motion: pillar scenes hold still', (await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.ik')).length)) === 0);
  ok('reduced motion: 3D name holds still', (await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.nb')).length)) === 0);
  ok('reduced motion: no scroll smoothing on the page', (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)) === 'auto');
  ok('no page errors (reduced motion)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

console.log(results.join('\n'));
await browser.close();
