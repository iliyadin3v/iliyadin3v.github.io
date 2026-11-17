// Plater case study. Sources:
//  - Iliya's UX audit, published on Behance 2026-06-26 (findings, fixes, before/proposal screens, takeaways)
//  - the live plater.bg site, captured 2026-11-17 (shipped screens and copy)
//  - Iliya's CV, confirmed citable on 2026-11-17 (product facts)
// Bulgarian copy is quoted as `bg` with an English translation.
// `placeholder: true` marks content Iliya still has to supply; it renders visibly as a placeholder.

export const plater = {
  slug: 'plater',
  name: 'Plater',
  title: 'Plater',
  lede: 'A UX audit of the plater.bg website, and the redesign that shipped from it. How a restaurant platform learned to explain itself to owners who have never bought software.',
  hero: {
    image: 'plater-live-hero',
    alt: 'The live plater.bg homepage. Headline: "Restaurant management system". Beside it, a kitchen board and two phones show one order moving from the table (1) to the kitchen (2) to the waiter (3).',
    caption: 'Shipped: plater.bg, captured November 2026.',
    viewTransition: 'plater-shot',
  },
  meta: [
    { term: 'Role', detail: 'UX audit and redesign. Design Lead & Marketing Specialist at Valora.' },
    { term: 'Team', detail: 'Iliya Dinev (design), with Valora’s CTO and full-stack developer.' },
    { term: 'Scope', detail: 'Heuristic audit, information architecture, hierarchy and copy, pricing, FAQ, contact paths, UI.' },
    { term: 'Timeline', detail: 'Two-week audit in 2026, then a redesign shipped to plater.bg.' },
    { term: 'Status', detail: 'Live', href: 'https://plater.bg/', linkLabel: 'plater.bg' },
  ],

  sections: [
    {
      id: 'context',
      nav: 'Context',
      type: 'text-media',
      heading: 'The product behind the site',
      body: [
        'Plater is a multi-tenant platform for restaurants. Guests open the menu from a QR code and order from the table without installing anything. Staff get order and kitchen screens. Owners get a management panel. Every venue runs on its own branded subdomain.',
        'I joined Valora in June 2024 as the first and only designer, working with the CTO and one full-stack developer. Since then I have designed around 60 screens across the guest, waiter, kitchen and owner sides, and the design system they run on: 40+ components with tokens, light and dark themes, and per-venue theming. Eight usability sessions in real restaurants changed the product most; the order-taking flow went from four screens to two.',
      ],
      media: [
        { image: 'plater-live-guest', alt: 'Two phones showing the Plater guest menu: dishes with photos, a pizza detail screen with sizes and add-ons, and the shared table bill.', caption: 'Guests order from the table: photos, add-ons, sizes and allergens, one shared bill per table.' },
        { image: 'plater-live-staff', alt: 'Three phones from the Plater staff app: a live kitchen queue, a floor view of tables with free and occupied states, and a bill request for table 4.', caption: 'Staff on their phones: live kitchen, tables and floor, bill requests.' },
      ],
    },

    {
      id: 'problem',
      nav: 'Problem',
      type: 'problem',
      heading: 'A good product, explained badly',
      body: [
        'By 2026 the product could do a lot, and the website said all of it at once. The audit’s summary: Plater had a strong, product-focused landing page that overwhelmed new visitors with dense copy, mixed messaging and under-prioritised primary actions.',
      ],
      users: {
        heading: 'Who has to understand it',
        body: 'Owners of restaurants, cafés, bars and fast-food places in Bulgaria. Mostly not technical, and often moving off paper menus for the first time.',
      },
      goals: {
        heading: 'What the redesign had to do',
        items: [
          'Make the value clear to a non-technical owner on the first screen.',
          'Make the offer understandable in under 30 seconds.',
          'Fix the information architecture, hierarchy and copy so visitors see what it is, who it is for and what to do next.',
          'Support the flows that matter: sign up, choose a plan, ask about a custom setup.',
        ],
      },
      constraints: {
        heading: 'Constraints',
        items: [
          'Bulgarian first, with an English version.',
          'A product that ships every two weeks, so the site cannot turn into release notes.',
          'A free plan that has to be believable: no card, no time limit.',
          'A three-person team.',
        ],
      },
    },

    {
      id: 'audit',
      nav: 'Audit',
      type: 'findings',
      heading: 'Six problems, found by walking the page',
      intro:
        'A heuristic review over two weeks, in three passes: information architecture and navigation, visual hierarchy and layout, and interaction patterns and flows. Each problem is written as what I observed, what it costs the visitor, and the fix I proposed.',
      findings: [
        {
          n: '01',
          title: 'An overloaded hero with a diluted primary action',
          observed: 'The headline, “live in 15 minutes”, “free plan, no card”, a sample order, stats and QR imagery all competed above the fold.',
          cost: 'Visitors parsed a lot before they understood the core benefit or knew what to click.',
          fix: 'One outcome-led headline, one primary action, and the detail moved further down.',
          principle: 'Aesthetic and minimalist design',
        },
        {
          n: '02',
          title: 'Pricing with a high cognitive load',
          observed: 'Four plans, each with a long feature list, similar visual weight, overlapping benefits and mixed naming.',
          cost: 'Owners had to read every column to find their plan, which delayed the decision or stalled it on the free plan.',
          fix: 'Split self-serve from bespoke, highlight one recommended plan, compare four to six real differences, add “Which plan is for you?”.',
          principle: 'Recognition rather than recall',
        },
        {
          n: '03',
          title: 'A changelog competing with the funnel',
          observed: 'A full changelog with version numbers and dates sat above the FAQ and contact.',
          cost: 'Good transparency, but it took attention that busy owners would rather spend on outcomes.',
          fix: 'Two plain-language highlights on the page, with the full history behind an accordion or on its own page.',
          principle: 'Aesthetic and minimalist design',
        },
        {
          n: '04',
          title: 'A feature-by-feature story',
          observed: '“What Plater does” split into dense subsections: QR menus, kitchen and bar displays, delivery zones, translation, Facebook posting, branding.',
          cost: 'Owners could not map features onto their working day.',
          fix: 'A simple journey instead: from paper menu to a fully digital dining room, in three steps.',
          principle: 'Match between the system and the real world',
        },
        {
          n: '05',
          title: 'FAQ answers written as paragraphs',
          observed: 'The real objections (is it free forever, can I cancel, do I need technical skills) were answered in full paragraphs.',
          cost: 'Visitors with one specific worry could not scan for it.',
          fix: 'Question-led accordions in the owner’s words, with a bold one-sentence answer first.',
          principle: 'Recognition rather than recall',
        },
        {
          n: '06',
          title: 'One path for every kind of venue',
          observed: 'A single contact block and a generic “Start free” served a small café and a group of restaurants the same way.',
          cost: 'Higher-value leads were not guided towards a conversation.',
          fix: 'Two clear paths after pricing: start yourself, or ask for a custom setup with a short intake.',
          principle: 'Flexibility and efficiency of use',
        },
      ],
    },

    {
      id: 'iterations',
      nav: 'Iterations',
      type: 'compare',
      heading: 'Before, proposal, shipped',
      intro:
        'The proposal was not the end. Each topic below shows the old site, the redesign from the audit, and what is live today. Where the shipped version moved away from the proposal, the note says how.',
      states: ['Before', 'Proposal', 'Shipped'],
      topics: [
        {
          id: 'hero',
          label: 'Hero',
          finding: '01',
          frames: [
            { image: 'plater-before-hero', alt: 'Old plater.app hero: "Digitize your restaurant." with a food photo, a sample order card and a row of four stats: 15 minutes, Free, 12 languages, None.' },
            { image: 'plater-proposal-hero', alt: 'Proposed hero: "Digitize your restaurant in 15 minutes." with one Start free button and a See demo link.' },
            { image: 'plater-live-hero', alt: 'Shipped hero: "Restaurant management system", one Start free button, and an order shown moving from table to kitchen to waiter.' },
          ],
          note: 'The proposal cut the hero to one claim and one action, with “See demo” opening a preview. The shipped hero goes further: it names the category instead of promising a time, and the demo is no longer behind a click. One order moves through three numbered stages, table, kitchen, waiter, right next to the headline.',
        },
        {
          id: 'pricing',
          label: 'Pricing',
          finding: '02',
          frames: [
            { image: 'plater-before-pricing', alt: 'Old pricing: four dense columns titled Free, Basic, Pro and Bespoke, each with a long bullet list.' },
            { image: 'plater-proposal-pricing', alt: 'Proposed pricing: one comparison table for Free, Basic and Pro, a dark banner for bespoke builds, and three "Which plan is for you?" cards.' },
            { image: 'plater-live-scenarios', alt: 'Shipped pricing: the end of the comparison table, a dark "Looking for something custom?" banner, and three cards matching plans to venue types.' },
          ],
          note: 'Shipped as proposed in structure: one table for three self-serve plans, a separate custom path, and scenario cards. Live, each plan is named by the job it does (digital menu; orders and kitchen; bar and automation), and the scenarios read: small café or takeaway, start with Free or Basic; busy restaurant with tables, choose Pro; larger venue, talk to us.',
        },
        {
          id: 'journey',
          label: 'Story',
          finding: '04',
          frames: [
            { image: 'plater-before-journey', alt: 'Old features section: "Everything your restaurant stops doing by hand." followed by dense feature blocks.' },
            { image: 'plater-proposal-journey', alt: 'Proposed section: "From paper menu to a fully digital dining room, in three steps." Step one: build a digital menu that looks like you.' },
            { image: 'plater-live-what', alt: 'Shipped "What is Plater" section: four accordion rows (the menu, orders, kitchen and bar, one system) next to a photo of a dining room.' },
          ],
          note: 'The three-step journey shipped in two parts: “What is Plater” groups the product into four things an owner recognises (the menu, orders, kitchen and bar, one system), and a separate three-step “How to start” covers signing up, adding the menu and taking orders.',
        },
        {
          id: 'faq',
          label: 'FAQ',
          finding: '05',
          frames: [
            { image: 'plater-before-faq', alt: 'Old FAQ: "Questions we get, honestly." with the first answer written as a full paragraph.' },
            { image: 'plater-proposal-faq', alt: 'Proposed FAQ: the same questions, each answer opening with a bold one-line summary.' },
            { image: 'plater-live-faq', alt: 'Shipped FAQ: "What restaurant owners ask", with question rows and a call to start on the free plan.' },
          ],
          note: 'Shipped as proposed: every answer opens with one bold sentence, written the way owners talk.',
          quote: { bg: 'Не, щом ползвате Facebook, ще се справите.', en: '“Do I need technical knowledge?” No. If you use Facebook, you’ll manage.' },
        },
        {
          id: 'contact',
          label: 'Contact',
          finding: '06',
          frames: [
            { image: 'plater-before-contact', alt: 'Old contact block: "Talk to a human. No funnels." with phone, email and a generic form.' },
            { image: 'plater-proposal-contact', alt: 'Proposed contact: two tabs, Getting started and Custom build, with intake dropdowns for venue type, number of locations and delivery.' },
            { image: 'plater-live-contact', alt: 'Shipped contact: "Write to us" with a short form (name, email, optional venue name, message) and a reply within one working day.' },
          ],
          note: 'Shipped simpler than proposed. The custom path moved up into pricing (“Looking for something custom? Write to us”), so the contact form stayed short: name, email, an optional venue name and a message, with a promise to reply within one working day.',
        },
      ],
    },

    {
      id: 'decisions',
      nav: 'Decisions',
      type: 'lens',
      heading: 'Decision lens: the shipped hero',
      intro: 'Select a pin to read the decision behind that part of the screen.',
      image: 'plater-live-hero',
      alt: 'The shipped plater.bg hero with four numbered pins: on the headline, on the order shown at the kitchen stage, on the call-to-action buttons, and on the three reassurance checks.',
      hotspots: [
        {
          n: 1,
          x: 39.5,
          y: 31,
          title: 'Name the category before making promises',
          body: 'The headline says what Plater is: a restaurant management system. The old hero and the proposal led with speed (“in 15 minutes”). An owner who has never bought software needs to recognise the thing first.',
          finding: '01',
        },
        {
          n: 2,
          x: 76.5,
          y: 62.5,
          title: 'Show the system working instead of listing it',
          body: 'One order travels through three numbered stages: at the table, in the kitchen, with the waiter. It replaces a feature list and the demo that used to sit behind a click.',
          finding: '04',
        },
        {
          n: 3,
          x: 41.5,
          y: 70,
          title: 'One filled button',
          body: '“Start free” is the only filled action. “What is Plater” is an outline button that scrolls down the page, so the two never compete.',
          finding: '01',
        },
        {
          n: 4,
          x: 10.5,
          y: 77,
          title: 'Answer objections where the decision happens',
          body: 'Three checks under the buttons: no commission, a free plan, works in the browser without an app. They are the same worries the FAQ answers, met before the click.',
          finding: '05',
        },
      ],
    },

    {
      id: 'flows',
      nav: 'Flows',
      type: 'gallery',
      demo: true,
      heading: 'Flows the site has to carry',
      intro: 'The live site explains product flows I designed in the app. Two of them, as they appear on plater.bg:',
      items: [
        {
          image: 'plater-live-zones',
          alt: 'Delivery zones on a map of Sofia: coloured circles for districts, each with its own fee, and a panel showing the delivery fee and arrival time for an order.',
          title: 'Delivery zones with automatic fees',
          body: 'An owner draws zones on a map and picks how each is charged: a free radius, a per-kilometre fee, or a fixed fee. The guest sees the delivery price before confirming the order.',
        },
        {
          image: 'plater-live-pricing',
          alt: 'The shipped pricing table: Free at 0 euro, Basic at 19.99 euro marked recommended, and Pro at 39.99 euro, with ticks for menu, online orders, delivery, table ordering and kitchen and bar screens.',
          title: 'Plans compared by what changes',
          body: 'Nine rows, not four columns of bullets. Each plan is named by its job, and the recommended plan is the only filled button.',
        },
      ],
    },

    {
      id: 'outcome',
      nav: 'Outcome',
      type: 'outcomes',
      heading: 'What shipped',
      intro: 'Every finding, checked against the live site in November 2026.',
      rows: [
        { n: '01', area: 'Hero', status: 'Shipped, changed', kind: 'changed', detail: 'One action and a category headline; the order journey replaced the demo link.' },
        { n: '02', area: 'Pricing', status: 'Shipped', kind: 'shipped', detail: 'One table, a recommended plan, a custom path and scenario cards.' },
        { n: '03', area: 'Changelog', status: 'Removed', kind: 'removed', detail: 'No longer on the homepage.' },
        { n: '04', area: 'Story', status: 'Shipped, changed', kind: 'changed', detail: '“What is Plater” plus a three-step “How to start”.' },
        { n: '05', area: 'FAQ', status: 'Shipped', kind: 'shipped', detail: 'Bold one-line answers in the owner’s words.' },
        { n: '06', area: 'Contact paths', status: 'Shipped, changed', kind: 'changed', detail: 'Custom path in pricing; a short contact form.' },
      ],
      evidence: { label: 'See it live on plater.bg', href: 'https://plater.bg/' },
      metrics: {
        placeholder: true,
        text: 'Placeholder: add sign-up or contact-form numbers from before and after the redesign, if Valora agrees to share them. Until then, this case makes no claim about conversion.',
      },
    },

    {
      id: 'learning',
      nav: 'Learning',
      type: 'learning',
      heading: 'Limits and what I took from it',
      limits: [
        'This was an expert review, not a usability study of the website. The product research (eight sessions in restaurants) was about the app, not this page.',
        'The shipped site differs from the proposal in several places. The case shows both rather than presenting the proposal as the final design.',
      ],
      lessons: [
        { title: 'Lead with one job', body: 'Owners should understand straight away that Plater takes them from a paper menu to digital orders with little setup.' },
        { title: 'Tell a workflow story, not a feature list', body: 'Menu, orders, kitchen and bar are easier to remember than a dozen features.' },
        { title: 'Design pricing for decisions, not completeness', body: 'Help people pick by the size and type of their venue.' },
        { title: 'Use transparency on purpose', body: 'Release notes and policies build trust when they support the main path instead of competing with it.' },
        { title: 'Separate self-serve from high-touch', body: '“Start yourself” and “talk to us” are different journeys and deserve different paths.' },
      ],
      next: {
        placeholder: true,
        heading: 'What I would test next',
        items: [
          'Placeholder: confirm or replace. Run five owner sessions on the live site, timing how long it takes to explain what Plater is.',
          'Placeholder: confirm or replace. Track how many sign-ups come from each scenario card.',
        ],
      },
    },
  ],

  next: { label: 'Next project: Vault', detail: 'A personal-finance and crypto wallet that should feel calm', href: '/work/vault/' },
};
