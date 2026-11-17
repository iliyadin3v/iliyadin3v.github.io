// Image pipeline: crops and optimizes source imagery into responsive WebP files.
// Sources: assets-src/ (Behance slides, live plater.bg captures) and D:\Work (local project files).
// Output: public/img/<key>-<width>.webp, src/content/images.json (dimensions only, bundled into the site)
// and scripts/image-sources.json (where each image came from; kept out of the shipped bundle).
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { edgeTone } from './edge-tone.mjs';

const WORK = 'D:/Work/';
const SLIDES = 'assets-src/plater-audit/';
const LIVE = 'assets-src/plater-live/';
const OUT = 'public/img';

// crop: [left, top, width, height] in source pixels. trim: remove flat white margins after cropping.
const jobs = [
  // Live plater.bg redesign (captured 2026-11-17, 1440px @2x)
  { key: 'plater-live-hero', src: LIVE + 'd-hero-2.png', crop: [0, 0, 2880, 1706], source: 'plater.bg live capture, hero' },
  { key: 'plater-live-hero-m', src: LIVE + 'm-hero.png', source: 'plater.bg live capture, mobile hero 390px @3x' },
  { key: 'plater-live-what', src: LIVE + 'd-01-what-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, what is Plater' },
  { key: 'plater-live-steps', src: LIVE + 'd-02-s2-0.png', crop: [0, 144, 2880, 420], source: 'plater.bg live capture, how to start' },
  { key: 'plater-live-guest', src: LIVE + 'd-03-features-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, guest ordering' },
  { key: 'plater-live-zones', src: LIVE + 'd-03-features-1.png', crop: [0, 640, 2880, 1280], source: 'plater.bg live capture, delivery zones' },
  { key: 'plater-live-staff', src: LIVE + 'd-04-s4-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, staff phones' },
  { key: 'plater-live-pricing', src: LIVE + 'd-07-pricing-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, pricing table' },
  { key: 'plater-live-scenarios', src: LIVE + 'd-07-pricing-1.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, plan scenarios' },
  { key: 'plater-live-faq', src: LIVE + 'd-08-faq-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, FAQ' },
  { key: 'plater-live-contact', src: LIVE + 'd-09-contact-0.png', crop: [0, 144, 2880, 1776], source: 'plater.bg live capture, contact' },

  // Iliya's Plater UX audit slides (Behance, published 2026-06-26), crops of before / proposal panels
  { key: 'plater-before-hero', src: SLIDES + 'slide-09.png', crop: [40, 580, 1920, 1560], trim: true, source: 'Behance audit slide 9, before' },
  { key: 'plater-proposal-hero', src: SLIDES + 'slide-09.png', crop: [2230, 580, 2300, 1560], trim: true, source: 'Behance audit slide 9, proposal' },
  { key: 'plater-before-pricing', src: SLIDES + 'slide-10.png', crop: [50, 580, 1890, 1560], trim: true, source: 'Behance audit slide 10, before' },
  { key: 'plater-proposal-pricing', src: SLIDES + 'slide-10.png', crop: [2060, 580, 2290, 1560], trim: true, source: 'Behance audit slide 10, proposal' },
  { key: 'plater-before-changelog', src: SLIDES + 'slide-11.png', crop: [30, 580, 1900, 1560], trim: true, source: 'Behance audit slide 11, before' },
  { key: 'plater-proposal-changelog', src: SLIDES + 'slide-11.png', crop: [2030, 580, 2310, 1220], trim: true, source: 'Behance audit slide 11, proposal' },
  { key: 'plater-before-journey', src: SLIDES + 'slide-12.png', crop: [50, 580, 1890, 1560], trim: true, source: 'Behance audit slide 12, before' },
  { key: 'plater-proposal-journey', src: SLIDES + 'slide-12.png', crop: [2060, 580, 2290, 1560], trim: true, source: 'Behance audit slide 12, proposal' },
  { key: 'plater-before-faq', src: SLIDES + 'slide-13.png', crop: [50, 580, 1890, 1560], trim: true, source: 'Behance audit slide 13, before' },
  { key: 'plater-proposal-faq', src: SLIDES + 'slide-13.png', crop: [2060, 580, 2290, 1560], trim: true, source: 'Behance audit slide 13, proposal' },
  { key: 'plater-before-contact', src: SLIDES + 'slide-14.png', crop: [80, 570, 2640, 1580], trim: true, source: 'Behance audit slide 14, before' },
  { key: 'plater-proposal-contact', src: SLIDES + 'slide-14.png', crop: [3330, 570, 2300, 2160], trim: true, source: 'Behance audit slide 14, proposal' },
  { key: 'plater-audit-cover', src: SLIDES + 'slide-01.png', source: 'Behance audit slide 1, cover' },

  // Hero artifact-stack fragments (tight crops of the real work)
  { key: 'frag-kds', src: LIVE + 'd-hero-2.png', crop: [1600, 168, 800, 650], source: 'plater.bg live capture, kitchen board in hero' },
  { key: 'frag-bill', src: LIVE + 'd-04-s4-0.png', crop: [1858, 728, 612, 752], source: 'plater.bg live capture, waiter bill request' },
  { key: 'frag-audit', src: SLIDES + 'slide-05.png', crop: [240, 280, 2160, 860], source: 'Behance audit slide 5, problems found' },
  { key: 'frag-vault', src: WORK + 'Vault/Figma Pages/Homepage.png', crop: [0, 0, 786, 1080], source: 'D:/Work/Vault/Figma Pages/Homepage.png (top)' },
  { key: 'frag-valora', src: WORK + 'Valora/Wallpapers/Desktop/Valora-Logo-Desktop-Black-01.png', crop: [2700, 900, 2600, 2600], source: 'D:/Work/Valora/Wallpapers/Desktop/Valora-Logo-Desktop-Black-01.png (crop)' },

  // "The Pass" redesign: order-scene screen and working drawings beside finished screens
  { key: 'scene-guest', src: LIVE + 'd-03-features-0.png', crop: [400, 600, 1000, 1320], source: 'plater.bg live capture, guest ordering phones' },
  { key: 'scene-kds', src: LIVE + 'd-hero-2.png', crop: [1606, 334, 776, 442], source: 'plater.bg live capture, kitchen board panel only' },
  { key: 'scene-owner', src: LIVE + 'd-03-features-1.png', crop: [352, 948, 2176, 972], source: 'plater.bg live capture, owner admin panel: delivery zones' },
  { key: 'vault-flow', src: WORK + 'Vault/Pages/User Flow.png', source: 'D:/Work/Vault/Pages/User Flow.png' },
  { key: 'aura-ia', src: WORK + 'Aura/Presentation/Information Architecture.png', source: 'D:/Work/Aura/Presentation/Information Architecture.png' },

  // Vault (self-initiated)
  { key: 'vault-home', src: WORK + 'Vault/Figma Pages/Homepage.png', source: 'D:/Work/Vault/Figma Pages/Homepage.png' },
  { key: 'vault-screens', src: WORK + 'Vault/Pages/Mockups.png', source: 'D:/Work/Vault/Pages/Mockups.png' },
  { key: 'vault-cards', src: WORK + 'Vault/Pages/Card.png', source: 'D:/Work/Vault/Pages/Card.png' },
  { key: 'vault-spending', src: WORK + 'Vault/Pages/Mockup-Track-Spending.png', source: 'D:/Work/Vault/Pages/Mockup-Track-Spending.png' },
  { key: 'vault-invest', src: WORK + 'Vault/Mockups/Mockup-Investments@2x.png', source: 'D:/Work/Vault/Mockups/Mockup-Investments@2x.png' },
  { key: 'vault-values', src: WORK + 'Vault/Brand Values.png', source: 'D:/Work/Vault/Brand Values.png' },

  // Aura
  { key: 'aura-home', src: WORK + 'Aura/Presentation/Homepage.png', source: 'D:/Work/Aura/Presentation/Homepage.png' },
  { key: 'aura-welcome', src: WORK + 'Aura/Free_iPhone_16_Mockup_2.png', source: 'D:/Work/Aura/Free_iPhone_16_Mockup_2.png' },
  { key: 'aura-mood', src: WORK + 'Aura/iPhone_Mockup_5@2x.png', source: 'D:/Work/Aura/iPhone_Mockup_5@2x.png' },

  // Vault case study: phones cropped out of Iliya's presentation slides (titles left out), plus mockups
  { key: 'vault-reg', src: WORK + 'Vault/Pages/Registration.png', crop: [330, 700, 7020, 3500], source: 'D:/Work/Vault/Pages/Registration.png (four phones, title cropped)' },
  { key: 'vault-crypto', src: WORK + 'Vault/Pages/Trading Crypto.png', crop: [330, 700, 7020, 3500], source: 'D:/Work/Vault/Pages/Trading Crypto.png (four phones, title cropped)' },
  { key: 'vault-brain', src: WORK + 'Vault/Pages/Settings.png', crop: [5730, 762, 1535, 3368], source: 'D:/Work/Vault/Pages/Settings.png (Brain screen, inside the phone outline)' },
  { key: 'vault-notify', src: WORK + 'Vault/Pages/Notifications.png', crop: [5640, 1218, 1690, 3102], source: 'D:/Work/Vault/Pages/Notifications.png (Notifications screen, inside the bezel)' },
  { key: 'vault-cardpick', src: WORK + 'Vault/Pages/Card.png', crop: [2170, 700, 5510, 3500], source: 'D:/Work/Vault/Pages/Card.png (colour picker phone and card finishes)' },
  { key: 'vault-type', src: WORK + 'Vault/Pages/Typography & Colors.png', crop: [500, 600, 6900, 1500], source: 'D:/Work/Vault/Pages/Typography & Colors.png (Lufga specimen, title and swatches cropped)' },
  { key: 'vault-track', src: WORK + 'Vault/Figma Pages/Track Spending.png', source: 'D:/Work/Vault/Figma Pages/Track Spending.png' },
  { key: 'vault-hero', src: WORK + 'Vault/Mockups/Free_iPhone_Mockup_2@2x.png', crop: [0, 820, 8000, 4500], source: 'D:/Work/Vault/Mockups/Free_iPhone_Mockup_2@2x.png (Track Spending on concrete, no slide copy; 16:9 crop)' },
  { key: 'vault-welcome', src: WORK + 'Vault/Mockups/Phone Mockup.png', source: 'D:/Work/Vault/Mockups/Phone Mockup.png' },
  { key: 'vault-sign', src: WORK + 'Vault/Mockups/Outdoor_Sign_Mockup_1.png', source: 'D:/Work/Vault/Mockups/Outdoor_Sign_Mockup_1.png' },
  { key: 'vault-icon', src: WORK + 'Vault/Mockups/Phone Icon Mockup.png', source: 'D:/Work/Vault/Mockups/Phone Icon Mockup.png' },

  // Aura case study: single app screens, the type specimen and the app icon
  { key: 'aura-s-start', src: WORK + 'Aura/Screens/Start Screen.png', source: 'D:/Work/Aura/Screens/Start Screen.png' },
  { key: 'aura-s-goal', src: WORK + 'Aura/Screens/Onboarding - 1.png', source: 'D:/Work/Aura/Screens/Onboarding - 1.png' },
  { key: 'aura-s-eat', src: WORK + 'Aura/Screens/Onboarding - 3.png', source: 'D:/Work/Aura/Screens/Onboarding - 3.png' },
  { key: 'aura-s-password', src: WORK + 'Aura/Screens/Password Setup-1.png', source: 'D:/Work/Aura/Screens/Password Setup-1.png' },
  { key: 'aura-s-profile', src: WORK + 'Aura/Screens/Register Page - 2.png', source: 'D:/Work/Aura/Screens/Register Page - 2.png' },
  { key: 'aura-s-home', src: WORK + 'Aura/Screens/Homepage 2.png', source: 'D:/Work/Aura/Screens/Homepage 2.png' },
  { key: 'aura-s-dial', src: WORK + 'Aura/Screens/Mental Health-1.png', source: 'D:/Work/Aura/Screens/Mental Health-1.png' },
  { key: 'aura-s-sleeprate', src: WORK + 'Aura/Screens/Mental Health.png', source: 'D:/Work/Aura/Screens/Mental Health.png' },
  { key: 'aura-s-tracker', src: WORK + 'Aura/Screens/Mood Tracker.png', source: 'D:/Work/Aura/Screens/Mood Tracker.png' },
  { key: 'aura-s-sleep', src: WORK + 'Aura/Screens/Sleep Quality.png', source: 'D:/Work/Aura/Screens/Sleep Quality.png' },
  { key: 'aura-s-insights', src: WORK + 'Aura/Screens/Sleep Insights.png', source: 'D:/Work/Aura/Screens/Sleep Insights.png' },
  { key: 'aura-s-slept', src: WORK + 'Aura/Screens/You Slept For.png', source: 'D:/Work/Aura/Screens/You Slept For.png' },
  { key: 'aura-s-schedule', src: WORK + 'Aura/Screens/New Sleep Schedule.png', source: 'D:/Work/Aura/Screens/New Sleep Schedule.png' },
  { key: 'aura-life', src: WORK + 'Aura/mockuuups-man-holding-iphone-11-mockup.jpeg', crop: [0, 3200, 6144, 3456], source: 'D:/Work/Aura/mockuuups-man-holding-iphone-11-mockup.jpeg (Mockuuups template with the Aura welcome screen; 16:9 crop)' },
  { key: 'aura-what', src: WORK + 'Aura/Presentation/What is Aura.png', crop: [560, 790, 2720, 1290], source: 'D:/Work/Aura/Presentation/What is Aura.png (three phones, paragraph cropped)' },
  { key: 'aura-pair', src: 'assets-src/aura/mood-log-and-hub.png', source: 'Composed from D:/Work/Aura/Presentation/What is Aura.png: the My Mood and logging-hub phones side by side on white (home phone left out)' },
  { key: 'aura-s-details', src: WORK + 'Aura/Screens/Details.png', source: 'D:/Work/Aura/Screens/Details.png' },
  { key: 'aura-type', src: WORK + 'Aura/Presentation/Typography & Colors.png', crop: [2180, 140, 1500, 660], source: 'D:/Work/Aura/Presentation/Typography & Colors.png (Work Sans specimen, title and swatches cropped)' },
  { key: 'aura-icon', src: WORK + 'Aura/App_Icon_iPhone_3000px.png', source: 'D:/Work/Aura/App_Icon_iPhone_3000px.png' },
  { key: 'aura-logo', src: WORK + 'Aura/App Icon.png', source: 'D:/Work/Aura/App Icon.png' },

  // TripTryst
  { key: 'trip-cover', src: WORK + 'TripTryst/TripTryst.png', source: 'D:/Work/TripTryst/TripTryst.png' },
  { key: 'trip-phone', src: WORK + 'TripTryst/iPhone_16_Mockup@0.75x.png', source: 'D:/Work/TripTryst/iPhone_16_Mockup@0.75x.png' },
  { key: 'trip-page', src: WORK + 'TripTryst/TripTryst-2.png', source: 'D:/Work/TripTryst/TripTryst-2.png' },

  // Valora brand
  { key: 'valora-mark', src: WORK + 'Valora/Wallpapers/Desktop/Valora-Logo-Desktop-Black-01.png', source: 'D:/Work/Valora/Wallpapers/Desktop/Valora-Logo-Desktop-Black-01.png' },
  { key: 'valora-sign', src: WORK + 'Valora/Free_Sign_Mockup.png', source: 'D:/Work/Valora/Free_Sign_Mockup.png' },
  { key: 'valora-shirt', src: WORK + 'Valora/Valora t-shirts/Free_T-Shirt_Mockup_1@2x.png', source: 'D:/Work/Valora/Valora t-shirts/Free_T-Shirt_Mockup_1@2x.png' },
];

const WIDTHS = [640, 1080, 1600, 2400];
const only = process.argv.slice(2);

await mkdir(OUT, { recursive: true });
const { readFile } = await import('node:fs/promises');
let manifest = {};
let sources = {};
try { manifest = JSON.parse(await readFile('src/content/images.json', 'utf8')); } catch {}
try { sources = JSON.parse(await readFile('scripts/image-sources.json', 'utf8')); } catch {}

for (const job of jobs) {
  if (only.length && !only.includes(job.key)) continue;
  let img = sharp(job.src, { limitInputPixels: false });
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    const meta = await sharp(job.src, { limitInputPixels: false }).metadata();
    img = img.extract({ left, top, width: Math.min(width, meta.width - left), height: Math.min(height, meta.height - top) });
  }
  let buf = await img.png().toBuffer();
  if (job.trim) buf = await sharp(buf).trim({ background: '#ffffff', threshold: 12 }).png().toBuffer();
  const { width, height } = await sharp(buf).metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width <= 2400 ? [width] : []);
  const files = [];
  for (const w of [...new Set(widths)]) {
    const file = `${job.key}-${w}.webp`;
    await sharp(buf).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, file));
    await writeFile(path.join(OUT, file + '.json'), JSON.stringify({ prompt: `Sourced, not generated. Origin: ${job.source}. Optimized by scripts/images.mjs (key ${job.key}, ${w}px WebP) for the Iliya Dinev portfolio.`, createdAt: new Date().toISOString() }, null, 2));
    files.push({ w, file });
  }
  manifest[job.key] = { width, height, files, edge: await edgeTone(buf) };
  sources[job.key] = job.source;
  console.log(job.key, `${width}x${height}`, files.map((f) => f.w).join(','));
}

await writeFile('src/content/images.json', JSON.stringify(manifest, null, 2));
await writeFile('scripts/image-sources.json', JSON.stringify(sources, null, 2));
