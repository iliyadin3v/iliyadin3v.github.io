# Iliya Dinev, portfolio

Personal product-design portfolio. React + Vite + Motion, prerendered to static HTML and hosted on GitHub Pages at `https://iliyadin3v.github.io/`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/, every page prerendered
npm run preview    # serve dist/ at http://localhost:4173
```

## Edit content

All text lives in `src/content/`, separate from the components:

| File | What it holds |
|---|---|
| `src/content/site.js` | Name, email, links, hero copy, the three "What I do" pillars, About, Contact |
| `src/content/projects.js` | Selected work (Plater feature, Vault and Aura, each with a working drawing and finished screens), the "More work" list, and the "One order, four people" scroll scene |
| `src/content/plater.js` | The Plater case study: every section, finding, comparison, decision-lens pin and outcome |

The case-study layout is reusable: copy `plater.js`, change the content, add an HTML entry like `work/plater/index.html` and a `src/main-*.jsx` file, and register it in `vite.config.js` and `scripts/prerender.mjs`.

### Placeholders still to fill

They render with a dashed blue border so nobody mistakes them for real content:

- **Plater outcome numbers**: `plater.js` → `outcome.metrics`. Add sign-up or contact-form data if Valora agrees; otherwise keep the honest note.
- **What I would test next**: `plater.js` → `learning.next`. Confirm, rewrite or delete.

Decision-lens pins are positioned in percent of the image (`x`, `y` in `plater.js`). If you replace the hero screenshot, adjust them.

## Images

`npm run images` turns sources into responsive WebP files in `public/img/` and writes their dimensions to `src/content/images.json` (so nothing shifts while loading). Where each image came from is recorded in `scripts/image-sources.json` and in a `.webp.json` provenance sidecar next to every file; neither is published.

- Sources are listed in `scripts/images.mjs`: the Plater audit slides from Behance, live plater.bg captures, and project files from `D:\Work`.
- `npm run capture` re-captures the live plater.bg site (uses the installed Microsoft Edge).
- To swap in Figma exports, point a job's `src` at the exported PNG and run `npm run images` (or `npm run images -- <key>` for one image).

`assets-src/` (raw sources) is git-ignored; `public/img/` is committed.

## Deploy to GitHub Pages

1. Create a public repository named **`iliyadin3v.github.io`** on GitHub.
2. Push this folder to its `main` branch.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Every push to `main` runs `.github/workflows/deploy.yml`, builds the site and publishes it.

## Design system

"Theme Room": a graphite night ground with one light-purple accent. The opening is the name itself as a built object (`src/components/NameBuilt.jsx`): real type laid on an axonometric plane, its letter walls drawn as one fine text-shadow stack that projects straight down at that angle, standing on a lit drafting grid that takes its cast shadow, with a card on the a, a toggle on the grid and one small block hopping letter by letter and back (keyframes generated from measured landing squares; the card lifts only while the block rests, so they never meet). The board tilts up into place on load (about a second), nods slowly, pauses when the opening leaves the screen and holds still under reduced motion; a visually hidden h1 carries the name for assistive tech. The site is in English at `/` and Bulgarian at `/bg/` (same paths below it). Interface strings live in `src/i18n/ui.js`, content in `src/content/*.js` and `src/content/bg/*.js`; `node scripts/check-bg.mjs` checks that every Bulgarian file mirrors its English one. Bulgarian pages are set in Onest, since Mona Sans has no Cyrillic. Everything reads four root tokens in `src/styles/tokens.css` (`--t-hue`, `--t-radius`, `--t-width`, `--t-density`), the same shape as Plater's per-venue theming; change them there and the whole site follows. Mona Sans (medium weight for the name and headings, normal for reading) plus Martian Mono for times and indices. See `DESIGN.md` for the full system.
