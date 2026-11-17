---
name: Iliya Dinev, Product Designer
description: A calm graphite room with one light-purple accent, the name built as an object on a drafting grid, and warm paper for reading.
colors:
  lavender-on-night: "oklch(81% 0.1 295)"
  lavender-on-night-hover: "oklch(87% 0.07 295)"
  violet: "oklch(54% 0.2 295)"
  violet-hover: "oklch(47% 0.18 295)"
  violet-deep: "oklch(41% 0.155 295)"
  violet-wash: "oklch(94% 0.03 295)"
  on-violet: "oklch(98.5% 0.006 295)"
  graphite-night: "oklch(15% 0.01 270)"
  graphite-raised: "oklch(19% 0.012 270)"
  graphite-raised-2: "oklch(24% 0.014 270)"
  graphite-rule: "oklch(30% 0.012 270)"
  warm-white: "oklch(95% 0.006 85)"
  night-text-2: "oklch(78% 0.008 270)"
  night-text-3: "oklch(66% 0.01 270)"
  warm-paper: "oklch(96.2% 0.008 85)"
  paper-raised: "oklch(98.6% 0.005 85)"
  paper-sunk: "oklch(92.6% 0.01 85)"
  carbon-ink: "oklch(19% 0.01 270)"
  ink-2: "oklch(35% 0.01 270)"
  ink-3: "oklch(46% 0.01 270)"
  paper-rule: "oklch(85.5% 0.01 85)"
  paper-rule-strong: "oklch(68% 0.012 85)"
typography:
  display:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 1.5rem + 5.4vw, 7.25rem)"
    fontWeight: 620
    lineHeight: 0.95
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 100"
  headline-xl:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.4vw, 5.25rem)"
    fontWeight: 620
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 100"
  headline:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.4vw, 3.5rem)"
    fontWeight: 620
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.12rem + 0.8vw, 1.875rem)"
    fontWeight: 620
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 100"
  lede:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.45vw, 1.4375rem)"
    fontWeight: 430
    lineHeight: 1.42
    letterSpacing: "-0.006em"
  body:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 540
    lineHeight: 1.4
    letterSpacing: "0em"
  control:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 560
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 104"
  wordmark:
    fontFamily: "Mona Sans Variable, Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  mono:
    fontFamily: "Martian Mono Variable, Martian Mono, ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 420
    lineHeight: 1.45
    letterSpacing: "0em"
    fontVariation: "'wdth' 87.5"
rounded:
  ui: "10px"
  panel: "10px"
  frame: "8px"
  art: "6px"
  small: "6px"
  none: "0px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
  section: "clamp(80px, 9vw, 152px)"
  gutter: "clamp(16px, 4vw, 56px)"
  col-gap: "clamp(16px, 1.8vw, 32px)"
components:
  button-primary-night:
    backgroundColor: "{colors.lavender-on-night}"
    textColor: "{colors.graphite-night}"
    typography: "{typography.control}"
    rounded: "{rounded.ui}"
    padding: "0 20px"
    height: "48px"
  button-primary-night-hover:
    backgroundColor: "{colors.lavender-on-night-hover}"
    textColor: "{colors.graphite-night}"
  button-primary-paper:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.on-violet}"
    typography: "{typography.control}"
    rounded: "{rounded.ui}"
    padding: "0 20px"
    height: "48px"
  button-primary-paper-hover:
    backgroundColor: "{colors.violet-hover}"
    textColor: "{colors.on-violet}"
  button-night-line:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    typography: "{typography.control}"
    rounded: "{rounded.ui}"
    padding: "0 20px"
    height: "48px"
  button-night-line-hover:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.graphite-night}"
  button-ink:
    backgroundColor: "{colors.carbon-ink}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.control}"
    rounded: "{rounded.ui}"
    padding: "0 20px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.warm-paper}"
  nav-cv:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.small}"
    padding: "0 10px"
    height: "36px"
  panel-night:
    backgroundColor: "{colors.graphite-raised}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.panel}"
    padding: "24px"
  copy-button:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.ui}"
    padding: "0 14px"
    height: "44px"
  copy-button-copied:
    backgroundColor: "{colors.lavender-on-night}"
    textColor: "{colors.graphite-night}"
---

# Design System: Iliya Dinev, Product Designer

## Overview

**Creative North Star: "The Theme Room"**

A calm graphite room lit by one colour, light purple. The opening is Iliya's name made into a built object: real type laid on an axonometric plane, standing as solid letters on a drafting grid, with a few small interface parts on and beside it and one block hopping from letter to letter. Everything after it is quiet: hairline rules, one step of raised panel, real product imagery, and warm paper wherever the visitor is asked to read at length.

The whole system hangs off four root tokens that mirror Plater's per-venue token layer: accent hue (`--t-hue`, 295), corner radius (`--t-radius`, 10px), type width (`--t-width`, 100%) and density (`--t-density`, 1). Every accent shade, radius, type width and spacing step is derived from them. Nothing on the page changes them; there is no theme picker. The Design systems pillar's scene colours its token blocks straight from the accent tokens.

Density is editorial rather than dashboard: generous section padding (80 to 152px), asymmetric 12-column compositions, and proof set as plain lists under each claim. Motion is transforms and opacity, short, paused off screen and still under reduced motion. There is no portrait or photograph of Iliya; the built name is the personal signature.

**Key Characteristics:**
- Two grounds: graphite night for the opening, the work and the close; warm paper for About and the case-study body. Sections declare their ground and the header follows it.
- One accent, light purple, derived from a single hue token: a light lavender on night, a deeper violet on paper.
- Mona Sans at weight 620 and normal width for the name and every big heading; Martian Mono only for times and indices.
- Controls are rectangles with corners capped at 10px. Never pills.
- The built name is the one 3D object; translucency belongs only to its small parts.

## Colors

One light purple on a cool graphite ground, with warm paper and carbon ink for reading.

### Primary
- **Lavender on Night** (`lavender-on-night`): the accent wherever it sits on graphite. Filled, with graphite text: the primary button ("See the work"), the copy button once the clipboard write succeeds, active scene stops, the solid blocks of the 3D scenes. As text or thin marks: selection, focus outlines, caret, the nav bar under the active link, proof-list dashes, scroll-scene progress, live status marks, link and row hover, the email underline. Also the favicon ground, with graphite letters. Derived as `oklch(81% 0.1 var(--t-hue))`.
- **Lavender Hover** (`lavender-on-night-hover`): hover of every lavender fill.
- **Violet** (`violet`): the accent on paper, where lavender would fail contrast: links on hover, focus outlines, selection, the ink button's hover, the case-study instruments (read marks in the table of contents, finding numbers and fix labels, outcome marks, lens pins, ticks). Derived as `oklch(54% 0.2 var(--t-hue))`.
- **Violet Hover** (`violet-hover`) and **Violet Deep** (`violet-deep`): hover of violet fills; placeholder text.
- **Violet Wash** (`violet-wash`): the faint highlight on a targeted finding in the case study.
- **On Violet** (`on-violet`): text on violet fills.

### Neutral
- **Graphite Night** (`graphite-night`): the night ground, the page body default, and the text colour on lavender fills.
- **Graphite Raised** (`graphite-raised`): one step up for raised panels, image frames on night, the contact card and the drafting grid under the name.
- **Graphite Raised 2** (`graphite-raised-2`): defined in the tokens and currently unused.
- **Graphite Rule** (`graphite-rule`): hairlines, panel borders and section rules on night.
- **Warm White** (`warm-white`): primary text on night and the face of the built name; `night-text-2` for intro copy and secondary lines, `night-text-3` for metadata, field labels and the rules above work cards.
- **Warm Paper** (`warm-paper`): the reading ground. `paper-raised` for sheets and pins, `paper-sunk` for image wells and tracks.
- **Carbon Ink** (`carbon-ink`): text on paper and the ink button; `ink-2` for body prose, `ink-3` for labels and muted text.
- **Paper Rule** (`paper-rule`, `paper-rule-strong`): hairlines on paper and resting link underlines.

### Named Rules
**The One Hue Rule.** Every accent shade is derived from `--t-hue`. Never write a literal purple; read `--accent`, `--accent-on-night` and their siblings so a change at the root reaches everything. The only literal hues allowed are Plater's own product colours inside the order demo, which is a recreation of Plater's UI.

**The Two Grounds Rule.** A section is either night or paper, declared with `data-ground`. Night is for meeting and showing; paper is for reading. The sticky header takes the ground beneath it, crossfading over 320ms.

**The Light on Night Rule.** On graphite the accent is always the light lavender, and a lavender fill always carries graphite text. On paper the accent is always the deeper violet. Never put violet text on night or lavender on paper.

## Typography

**Display Font:** Mona Sans Variable (with ui-sans-serif, system-ui)
**Body Font:** Mona Sans Variable, the same family
**Label/Mono Font:** Martian Mono Variable at 87.5% width (with ui-monospace, Consolas)
**Bulgarian:** Onest Variable for all text on the /bg/ pages (Mona Sans has no Cyrillic); the 3D name keeps Mona Sans everywhere, and Martian Mono covers Cyrillic itself

**Character:** One grotesque carries everything, set medium and upright at normal width so the name reads as a person rather than a poster. The mono is a small instrument for clocks, timestamps and numbered indices, never a voice.

### Hierarchy
- **Display** (620, `clamp(3.25rem, 1.5rem + 5.4vw, 7.25rem)`, 0.95, -0.045em): the case-study title and the contact heading.
- **Headline XL** (620, `clamp(2.5rem, 1.1rem + 4.4vw, 5.25rem)`, 0.95, -0.04em): project names in the work section.
- **Headline** (620, `clamp(2rem, 1.25rem + 2.4vw, 3.5rem)`, 1, -0.035em): section headings on both grounds and the smaller project names.
- **Title** (620, `clamp(1.375rem, 1.12rem + 0.8vw, 1.875rem)`, 1.1): pillar titles, finding titles and other third-level headings.
- **Lede** (430, `clamp(1.1875rem, 1.05rem + 0.45vw, 1.4375rem)`, 1.42): section intros, project summaries, case-study lede, contact body; held to about 42 to 50ch. The opening's thesis line uses the lede size at 520 and 1.3.
- **Body** (420, 1.0625rem, 1.55, tabular figures): reading prose, held to 66ch.
- **Label** (540, 0.8125rem, sans): field labels such as Role, Status, Year, and table heads. Sentence case, not mono and not uppercase.
- **Control** (560, 0.9375rem, 104% width): buttons, nav links, tabs and arrow links run very slightly wide.
- **Wordmark** (700, 1.0625rem, 118% width): the header name, the one wide setting in the system; it drops to 100% below 420px.
- **Mono** (420, 0.75rem, 87.5% width): the Sofia clock, years, step indices, order numbers, case-study table-of-contents numbers and finding numbers (those at 1.5rem, 500).

The built name in the opening is the same Mona Sans 620 at -0.03em, sized by its own stage (`clamp(3.5rem, min(16vw, 26svh), 17rem)` on desktop).

### Named Rules
**The Medium Name Rule.** The name and every big heading are Mona Sans 620 at normal width (100%). No light weights, no wide stretches and no two-tone colouring on headings.

**The Instrument Rule.** Martian Mono appears only on times and indices. Labels, metadata and captions stay in the sans.

## Layout

A centred page container (max 1520px, gutter `clamp(16px, 4vw, 56px)`) over a 12-column grid with a `clamp(16px, 1.8vw, 32px)` gap. Sections breathe on the section step (`clamp(80px, 9vw, 152px)`, scaled by density). Spacing runs on a 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128), each step multiplied by the density token. The header is 60px and sticky.

Compositions are asymmetric on purpose: the pillars split 5 : 4 : 3.4; feature heads take columns 1 to 6 with their summaries on 7 to 12; the two smaller project cards are offset, each with its working drawing overlapping the screenshot's lower edge; the More work list starts at column 4. Groups are separated by a single top rule rather than boxed.

**The opening** is a stage above a foot row, filling the first screen (`100svh` minus the header). The stage holds the built name, centred; the foot row puts the thesis line and one grey line on columns 1 to 9 and the two actions on 10 to 12, bottom-aligned. Below 960px the foot row stacks; on tall screens (aspect 5/4 or narrower) the opening hugs its content instead of the full height; on phones the word fills the width and its grid may run off the edges.

**The case study** opens on night (title on columns 1 to 6, lede on 7 to 12, a five-column metadata row of ruled cells, a framed hero shot), then turns to paper: a sticky two-column table of contents beside ten columns of sections, dropped below 1200px. The Vault and Aura case-study pages are further uses of this system.

**The Pinned Scene.** Inside the Plater feature, "One order, four people" pins on wide screens (900px+): scroll progress picks the station and fills a lavender progress line. Phones and tablets in portrait (below 900px, at least 520px tall) pin a compact frame: the heading and intro scroll in above it, then the progress line sits under the header, the station's scene takes all the height its text leaves (the 3D fits itself, so a taller panel only shows more grid) and the text sits below. Each station there takes 85svh of scroll. Phones in landscape and reduced motion get a plain stacked list. The progress tracker mounts only near the scene and reads its position once on arrival, so a jump in lands on the right station. Each station is drawn as its own axonometric scene from the "What I do" kit (`StationArt.jsx`), in a rounded night panel sized with container units: the guest's table and phone, the kitchen board, the waiter's phone, the owner's laptop and weekly report. One solid light-purple block is the order in every scene. The kitchen board is the one place other colours appear: amber, blue and green for New, Cooking and Ready, Plater's own one-colour-per-state rule. The scenes are decorative, pause off screen and hold the step's moment under reduced motion. Wheel scrolling is smoothed (Lenis, lerp 0.14, touch stays native) and kept light: nothing reads the scroll position on scroll (the header uses IntersectionObservers), the pinned scene tracks progress only while it is near the screen and fills its line with a transform, and the 3D scenes pause while the page is being scrolled. In-page link clicks glide over 1.6s (ease-in-out). Reduced motion removes the smoothing, the glide and the pin.

Breakpoints observed: 1200 (case-study table of contents), 1100 (pillars and feature head), 960 (opening foot row and two-column grids), 900 (scroll scene switches from the wide to the compact pin), 760 (clock hides), 640 (phone header and menu), 420 (phone).

## Elevation & Depth

Mostly flat, with tonal layering doing the work. On night, a raised panel is one lightness step up (`graphite-raised`) with a hairline border and a single deep, soft drop shadow plus a 4% inset top light. On paper, sheets and screenshots carry a lower, warmer sheet shadow. Real depth exists only in the opening's built name and the three pillar scenes: true CSS 3D with no perspective on the same plane. The name's walls are a text-shadow stack and its grid takes a contact shadow and a long soft cast; the pillar objects sit on the same grid with a tight contact shade under each (black at 0.85, blurred 0.05em, offset down and right), and the standing Valora sign casts its own letter-shaped shadow across the grid (the outline laid flat from its base, flipped and skewed with the light).

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 1px 0 oklch(100% 0 0 / 0.04) inset, 0 24px 48px -28px oklch(0% 0 0 / 0.8)`): raised panels and image frames on night.
- **Sheet** (`box-shadow: 0 1px 1px oklch(19% 0.01 270 / 0.05), 0 12px 28px -16px oklch(19% 0.01 270 / 0.3)`): screenshots, the comparison and lens figures, and callouts on paper.
- **Sheet lift** (`box-shadow: 0 2px 2px oklch(19% 0.01 270 / 0.06), 0 26px 44px -22px oklch(19% 0.01 270 / 0.4)`): a sheet raised by interaction.
- **Cast** (`text-shadow: 0.012em 0.04em 0.025em oklch(0% 0 0 / 0.6), 0.03em 0.15em 0.07em oklch(0% 0 0 / 0.55)`): the built name's shadow on its grid, light from the upper left. Opening only.
- **Scene shade** (`background: oklch(0% 0 0 / 0.85); filter: blur(0.05em); transform: translate3d(0.07em, 0.22em, 0.5px)`): the tight contact shade under each object in the pillar scenes, on the grid plane.
- **Sign cast** (the AV outline laid flat on the grid from the sign's base line, flipped and skewed 14° with the light, fill `oklch(0% 0 0 / 0.85)`, blur 0.025em): the standing Valora sign's own shadow, shaped like the letters.

### Named Rules
**The One Step Rule.** A surface is either on the ground or one step above it. No stacks of cards, no glow, no gradient panels.

**The Glass Belongs to the Parts Rule.** Translucency describes only small 3D parts: the opening's glass card and toggle track, and in the pillar scenes the token selector and small component keys. Device screens and boards in those scenes are opaque night, and panels, cards, the header and every sheet stay opaque.

## Shapes

Rectangles with softened corners. Panels follow the radius token (10px); image frames and the 3D art panels take 0.8 of it (8px); tabs and scene stops cap at 6px. Every control caps at 10px through `min(var(--t-radius), 10px)`, so no button can ever become a pill. The nav CV and language buttons take the small radius (6px). Some instruments stay fully square: the case-study version switch, focus outlines and the 8px status marks. Phone screenshots keep the device's own proportional rounding (11% / 5%). The only circles are the numbered pins on case-study screenshots.

**The Frame Rule.** Every picture, and every 3D art panel, sits in the same frame: 8px corners (`--frame-r`), a 1px hairline drawn just outside its edge, and the ground's shadow (panel on night, sheet on paper). The hairline is dark on paper (`oklch(19% 0.01 270 / 0.1)`) and light on night (`oklch(95% 0.006 85 / 0.1)`), and doubles where the picture's own edge would melt into the ground: a light-edged picture on paper, a dark-edged one on night. The edge tone is measured at build time (`scripts/edge-tone.mjs`, stored as `edge` in images.json and set on the img as `data-edge`). Phone screens keep their device rounding inside the same hairline.

**The Light 3D Rule.** The 3D scenes stay cheap enough that scrolling never waits on them: motion is transform and opacity only (all of it runs on the compositor), soft shadows are painted (box-shadow, or a blur inside the SVG) rather than CSS `filter` blurs, which force 3D layers to be redrawn, and every art panel carries `content-visibility: auto` so off-screen scenes are skipped entirely. Each scene pauses its animations when its section leaves the screen, and all of them hold still while the page is being smooth-scrolled (`html.lenis-scrolling`), resuming when it settles.

## Components

### Buttons
Squared and plain, never pills.
- **Shape:** gently softened rectangle (10px, capped), 48px tall, 20px side padding, 1px border.
- **Primary on night:** lavender fill with graphite text; hover lightens to lavender hover. Used once per view for the main action ("See the work").
- **Primary on paper:** violet fill with near-white text; hover darkens to violet hover.
- **Night line:** transparent with a 35% warm-white border; hover fills warm white with graphite text. Used for LinkedIn, Behance and the CV.
- **Ink:** carbon fill on paper; hover turns violet.
- **Press:** translate 1px down over 140ms. Trailing arrows nudge 2 to 3px on hover.
- **Text action:** a plain underlined link (e.g. "Email me") sits beside the primary button rather than a second filled button; on night it hovers to lavender.

### Navigation
A sticky 60px bar: wordmark, a live "Sofia hh:mm" clock with the time in mono, then Work, About, Contact in the control style and a square bordered CV download. The active link carries a 2px accent bar that springs between links (the only spring on the site; soft, stiffness 220, damping 30). Clicking a link glides the page to its section over 1.6s, easing in and out; reduced motion jumps straight there. The bar's colours, accent included, follow the ground beneath it (lavender over night, violet over paper) and gain a hairline once scrolled. The clock hides below 760px. After the CV button sits one language button in the same style (6px corners): a globe and the language it switches to, BG on English pages and EN on Bulgarian ones. It opens the same page in the other language (English at /, Bulgarian at /bg/ with the same paths) at the top, with no section anchor. At 640px and below the header keeps the wordmark, the language button (label only) and a Menu button in the same style, both 40px tall; the links and CV move into a full-screen menu under the bar: Work, About and Contact as 64px rows in h3 size on hairlines, then the CV download. Menu toggles to Close (two bars turning into an X), Escape closes and returns focus, a link closes it, the page underneath does not scroll, and it closes itself if the screen grows past 640px.

### Cards / Containers
- **Corner Style:** panel radius (10px).
- **Background:** graphite-raised on night.
- **Shadow Strategy:** the Panel shadow.
- **Border:** 1px graphite-rule.
- **Internal Padding:** 24px.
Most groupings are not boxed at all: pillars, work cards, metadata rows and case-study blocks are separated by a single top rule instead.

### Pillars and their Scenes
Three practices, each opened by a small axonometric scene (`src/components/PillarArt`) in the opening's plane and materials, above a 620 title, a lede and a proof list marked with short lavender dashes (8 by 2px). Each scene is sized to its art box with container units (`container-type: size`; font-size from the box over the scene's projected extent), sits on a drafting grid of graphite raised that runs past the box on every side, pauses when the section leaves the screen and rests under reduced motion. The shared art height keeps the three titles on one line.
- **Product design:** guest phone, kitchen board and waiter phone lie on the grid with opaque night screens and hairline interface marks. One solid order is sent from the guest phone, arcs to the board, slides New → Cooking → Ready (the header of the column it is in lights), arcs to the waiter phone and lights its ready card, with a small squash on each landing (7.2s).
- **Design systems:** four solid token blocks coloured from `--accent-wash`, `--accent-on-night`, `--accent`, `--accent-deep` (sides shade down in lightness at the token's own hue). A glass selector moves along them and the button, toggle knob, card bar and tab on an opaque board crossfade to the selected token (8.8s, four phases).
- **Brand and launch:** the Valora AV mark from its own vector outlines, standing upright on a plinth as a sign; its thickness is drawn as offset copies of the outline in its own plane. A phone publishes a solid post that arcs onto a small feed stack (6s).

### The Name, Built (signature)
The opening's object, decorative (`aria-hidden`); a visually hidden h1 carries the name.
- **Plane:** the name as real type, Mona Sans 620 at -0.03em, on an axonometric plane (`rotateX(56deg) rotateZ(-30deg)`, no perspective). Every position is in em of the word's font-size, so one size scales the whole build.
- **Walls:** one 120-step text-shadow stack in the word's own plane, 0.21em deep, projecting straight down on screen, banded into a light rim (`oklch(80% 0.1 hue)`), a violet wall (`oklch(58% 0.16 hue)`) and a darker foot (`oklch(43% 0.15 hue)`) under a warm-white face.
- **Grid:** a drafting grid larger than the word, filled graphite-raised, with lavender hairlines at 20% every 0.96em and finer ones at 8% every 0.24em (a stronger line every fourth cell). It takes the Cast shadow.
- **Parts:** boxes drawn as top, south and west faces with lavender hairline edges. Glass parts are translucent accent (20 to 34% alpha); solid parts are lavender on top with mid and deep violet sides. A glass card rests on the a; a glass-and-solid toggle lies on the grid in front of the e; a small solid block hops on the letters.
- **Motion:** the board tilts up from +14° over about 1s and the parts fade in at about 0.5s; then a rotateX-only nod (55.5° to 57°, 14s) so the walls stay vertical. One 13.44s cycle: the block hops letter by letter from the I to the second i and back, with a crouch, low arcs capped at 0.21em and a squash on landing; the card lifts 0.14em only while the block rests on the I. It pauses when the opening leaves the screen (`data-still`) and holds the finished pose under reduced motion.

### Case-study instruments
On paper: a sticky table of contents with mono numbers that turn violet once read, each read section keeping a small violet mark; a findings ledger with large mono indices; a three-way version switch of joined square segments; screenshots with numbered circular pins (the decision lens); an outcomes table with small square status marks (filled, half, empty). An interactive order demo recreates Plater's own product UI and keeps Plater's colours scoped inside it.

### Contact
A display-size heading and lede on night, an email panel with the address underlined in lavender (2px) and a copy button that fills lavender with graphite text only after the clipboard write succeeds, then night-line buttons for the external links and CV.

## Do's and Don'ts

### Do:
- **Do** derive every accent shade from `--t-hue` and every corner from `--t-radius`; read the tokens, never a literal purple or radius.
- **Do** declare `data-ground="night"` or `data-ground="paper"` on each section so the header, focus, selection and caret colours follow.
- **Do** use lavender (`oklch(81% 0.1 hue)`) for every accent on night, with graphite text on lavender fills, and the deeper violet (`oklch(54% 0.2 hue)`) for every accent on paper.
- **Do** set the name and big headings in Mona Sans 620 at 100% width, and keep reading text at normal width.
- **Do** separate groups with a single hairline rule before reaching for a panel.
- **Do** animate with transforms and opacity only, pause off screen, and give every animation a still state under reduced motion.
- **Do** give every control a 40px tap area on touch screens (`pointer: coarse`), widening with padding and matching negative margin where the layout must not move, and keep text at 13px or larger on phones (the mono indices step up from 12px to 13px at 640px and below).

### Don't:
- **Don't** use pill buttons; controls cap at 10px corners.
- **Don't** put text eyebrows or kickers above headings.
- **Don't** add a theme picker or anything that changes the four root tokens at runtime.
- **Don't** place a portrait or photograph of Iliya anywhere.
- **Don't** use Martian Mono for labels, captions or prose; it is only for times and indices.
- **Don't** add glow, gradient panels or translucent card surfaces; translucency belongs only to the small 3D parts of the opening.
- **Don't** hijack scroll or add a custom cursor.
