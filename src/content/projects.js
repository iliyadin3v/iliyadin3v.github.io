// Selected work. On the pass each project is an order ticket on the rail; front of house it is
// an entry on the menu, shown as a working drawing beside the finished screen.
// Status must stay honest: 'Live product', 'Self-initiated concept', 'Concept'.

export const selected = [
  {
    id: 'plater',
    ticket: '002',
    key: '1',
    name: 'Plater',
    summary:
      'A restaurant platform for QR menus, table ordering, kitchen screens and owner reporting, in daily use at pilot venues.',
    role: 'Design Lead & Marketing Specialist, Valora',
    status: 'Live product',
    live: true,
    years: '2024 to now',
    challenge:
      'One system for three users: a guest ordering in under a minute, a waiter reading table state while walking, and an owner checking sales from a laptop.',
    decision:
      'The audit found a hero making five promises at once. The redesign names the category, then shows one order travelling from table to kitchen to waiter.',
    thumb: 'scene-guest',
    drawing: {
      image: 'plater-before-hero',
      label: 'Before',
      alt: 'The old plater.app hero from the UX audit: "Digitize your restaurant." with a food photo, a sample order card and four stats competing for attention.',
    },
    image: 'plater-live-hero',
    imageLabel: 'Shipped',
    alt: 'The live plater.bg homepage: the Bulgarian headline "Restaurant management system" next to a kitchen board and two phones showing an order moving from table to kitchen to waiter.',
    viewTransition: 'plater-shot',
    link: { href: '/work/plater/', label: 'Read the case study: audit and redesign' },
  },
  {
    id: 'vault',
    ticket: '003',
    key: '2',
    name: 'Vault',
    summary: 'A personal-finance and crypto wallet designed to feel as calm as an ordinary banking app.',
    role: 'Product designer, solo',
    status: 'Self-initiated concept',
    years: '2025',
    challenge:
      'Make sending crypto safe for people who have never used a crypto app, without slowing down everything else.',
    decision:
      'Friction only before irreversible actions. Three of five first-time testers completed a send; the confirmation step was redesigned until all five did.',
    thumb: 'frag-vault',
    drawing: {
      image: 'vault-flow',
      label: 'User flow',
      alt: 'Vault user flow: from sign up or log in to the home page, then branches for investment, spending, pocket, deposit, withdraw and profile settings.',
    },
    image: 'vault-hero',
    imageLabel: 'Track spending',
    alt: 'Vault on a phone lying on concrete: spent $142.57 since 1 July, a spend tracker splitting transfers and financial services, and Round Ups and Weekly Depositer tiles.',
    viewTransition: 'vault-shot',
    link: { href: '/work/vault/', label: 'Read the case study' },
  },
  {
    id: 'aura',
    ticket: '004',
    key: '3',
    name: 'Aura',
    summary: 'A wellbeing app that brings physical, mental and emotional tracking into one customisable home screen.',
    role: 'UI/UX and logo design',
    status: 'Self-initiated concept',
    // Year not confirmed by Iliya; this is the Behance publication year.
    yearLabel: 'Published',
    years: '2024, Behance',
    challenge:
      'Keep mood, sleep and activity tracking in one place without the home screen turning into a dashboard of everything.',
    decision:
      'The home screen asks one question first, "How are you feeling today?", and puts the trackers below it as large tiles.',
    thumb: 'aura-welcome',
    drawing: {
      image: 'aura-ia',
      label: 'Information architecture',
      alt: 'Aura information architecture: log in, home, programs, notifications and profile, with branches for scanning a meal, logging a workout or mood, and workout programs.',
    },
    image: 'aura-life',
    imageLabel: 'Welcome screen',
    alt: 'Over the shoulder at a desk: two hands hold a phone showing the Aura welcome screen with the mint lotus (mockup).',
    viewTransition: 'aura-shot',
    link: { href: '/work/aura/', label: 'Read the case study' },
  },
];

// The rest of the work. Links go to Behance; `year` is the Behance publication year.
// `status: null` renders a visible "Status to confirm" placeholder until Iliya confirms it.
// TripTryst, EVOLVE and Luscious confirmed as work assignments by Iliya on 2026-11-17.
export const archive = [
  { name: 'TripTryst', type: 'Travel booking website', status: 'Work assignment', year: '2024', href: 'https://www.behance.net/gallery/201405955/TripTryst-Booking-Trips-Website-UIUX-Design' },
  { name: 'Nike checkout redesign', type: 'UX project', status: 'Self-initiated', year: '2025', href: 'https://www.behance.net/gallery/231621155/Nike-Checkout-Redesign-Project-UX-Project' },
  { name: 'Amazon customer support access', type: 'UX project', status: 'Self-initiated', year: '2025', href: 'https://www.behance.net/gallery/229917273/Amazon-Customer-Support-Access-UX-Project' },
  { name: 'EVOLVE', type: 'E-bike company, product design', status: 'Work assignment', year: '2025', href: 'https://www.behance.net/gallery/224550275/EVOLVE-Electric-bike-company-Product-Design' },
  { name: 'Apple UX discovery', type: 'Heuristic audit', status: 'Self-initiated', year: null, href: null },
  { name: 'Luscious', type: 'Recipe website', status: 'Work assignment', year: '2024', href: 'https://www.behance.net/gallery/196061981/Luscious-Food-and-cocktail-recipe-website-design' },
];

// "One order": the pinned scroll scene. Every line is checked against the CV or plater.bg.
export const orderScene = {
  heading: 'One order, four people',
  intro: 'A guest with a minute to spare, a cook with ten tickets on the rail, a waiter walking past, and the owner reading the week the next morning. Plater has to make sense to all four.',
  steps: [
    {
      id: 'order-table',
      station: 'Table',
      art: 'table',
      body: 'The guest scans the QR code and orders from the table without installing anything. Photos, add-ons and allergens, and one shared bill for the whole table.',
    },
    {
      id: 'order-kitchen',
      station: 'Kitchen',
      art: 'kitchen',
      body: 'The order lands on the kitchen board in the New column. One colour per state, so the board reads from a metre away.',
    },
    {
      id: 'order-waiter',
      station: 'Waiter',
      art: 'waiter',
      body: 'The waiter’s phone shows when the order is ready and when the table asks for the bill, with everything on one card and one action.',
    },
    {
      id: 'order-owner',
      station: 'Owner',
      art: 'owner',
      body: 'The owner runs the venue from the management panel: menu, staff, delivery zones with automatic fees. A weekly email report closes the loop; one pilot restaurant now uses it for its inventory ordering.',
    },
  ],
  outro: 'Eight usability sessions inside restaurants changed this flow the most: taking an order went from four screens to two.',
};
