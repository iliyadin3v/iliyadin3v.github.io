// Site-wide content. Edit text here; presentation lives in src/components.
// Every claim below comes from Iliya's CV, his Behance projects or the live plater.bg site,
// and was confirmed citable by Iliya on 2026-11-17.

export const person = {
  name: 'Iliya Dinev',
  role: 'Product designer',
  location: 'Sofia, Bulgaria',
  email: 'iliyailiyadinev@gmail.com',
  now: 'Design Lead & Marketing Specialist at Valora',
  cv: { href: '/cv/Iliya-Dinev-Product-Designer-CV.pdf', label: 'CV', size: 'PDF, 86 KB' },
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/iliya-dinev-5b0940194/' },
    { label: 'Behance', href: 'https://www.behance.net/iliyadinev' },
    { label: 'GitHub', href: 'https://github.com/iliyadin3v' },
  ],
};

export const hero = {
  headline: 'I design the whole product, from the first sketch to the launch.',
  intro:
    "Product designer in Sofia. As the only designer at Valora, I take Plater, a restaurant platform, from research and flows to the interface, the brand and the launch.",
};

// The hero stack: five real fragments from the work. `note` is the pencil caption.
export const artifacts = [
  {
    id: 'kds',
    image: 'frag-kds',
    alt: 'Plater kitchen board with three columns: new, cooking, ready. Each order card shows the table, a timer and the dishes.',
    title: 'Plater, kitchen board',
    note: 'One colour per order state, so the board reads from a metre away.',
    href: '/work/plater/',
  },
  {
    id: 'audit',
    image: 'frag-audit',
    alt: 'A page from the Plater UX audit listing the first problem found: an overloaded hero with a diluted primary action.',
    title: 'Plater, UX audit',
    note: 'Finding 01: the old hero made five promises at once.',
    href: '/work/plater/#audit',
  },
  {
    id: 'bill',
    image: 'frag-bill',
    alt: "Plater waiter app on a phone showing a bill request for table 4: 51.80 euro, the ordered items, and a green 'Paid' button.",
    title: 'Plater, waiter phone',
    note: 'A bill request arrives with the whole order and one action: paid.',
    href: '/work/plater/#flows',
  },
  {
    id: 'vault',
    image: 'frag-vault',
    alt: 'Vault home screen: total balance of 584,420 dollars on a purple card, with Add money and Transfer buttons and recent contacts.',
    title: 'Vault, home',
    note: 'The dashboard leads with what you actually have.',
    href: '#work-vault',
  },
  {
    id: 'valora',
    title: 'Valora, identity',
    note: 'Logo, colour and type for the company, built from scratch.',
    href: '#playground',
  },
];

export const about = {
  heading: 'How I work',
  intro: [
    "I studied cybersecurity before I studied design, and it shows: I get specific about logins, permissions and anything that moves money. At Valora I do all of the design, from the product UI and design system to the brand, the website and the launch videos.",
  ],
  practices: [
    {
      title: 'Watch the work happen',
      body: 'Eight usability sessions inside restaurants, with owners and waiting staff, shaped Plater more than any review. The biggest change they produced: taking an order went from four screens to two.',
    },
    {
      title: 'Design the system, not the screen',
      body: "Every Plater venue gets its own branded subdomain, so the interface runs on a theming layer I designed: 40+ components with tokens, light and dark themes, and per-venue colour and type that can't break a component.",
    },
    {
      title: 'Friction only where it protects people',
      body: 'In Vault, I added extra steps only before actions you can’t undo. Five people new to crypto tested the send flow; three finished on the first try, so I redesigned the confirmation step until all five did.',
    },
    {
      title: 'Check what ships',
      body: 'Plater releases every two weeks. I review each build against the designs before it reaches pilot venues, including a 100-table restaurant.',
    },
  ],
  details: [
    { term: 'Education', detail: 'UX and UI Designer diploma, SoftUni Creative (2025). Bachelor of Cybersecurity, Higher School of Security and Economics, Plovdiv (2025).' },
    { term: 'Skills', detail: 'End-to-end design, information architecture (IA), A/B testing, heatmaps, SEO.' },
    { term: 'Tools', detail: 'Figma (variables, dev mode, prototyping), Maze, Adobe Creative Cloud including After Effects, Framer, Webflow. I read HTML, CSS and JS well enough to review what developers ship.' },
    { term: 'Languages', detail: 'Bulgarian (native), English (professional).' },
  ],
};

export const playground = {
  heading: 'Brand and side work',
  intro: 'Smaller pieces that sit next to the product work.',
  items: [
    {
      image: 'valora-sign',
      alt: 'The Valora logo mounted as a metal sign on a concrete building facade (mockup).',
      title: 'Valora identity on signage',
      caption: 'Mockup. Logo, colour system and typography designed from scratch for Valora.',
    },
    {
      image: 'valora-shirt',
      alt: 'A white t-shirt with a small VALORA wordmark on the chest (mockup).',
      title: 'Team shirt',
      caption: 'Mockup. The wordmark at its smallest size.',
    },
    {
      image: 'vault-values',
      alt: 'Vault brand values diagram: Security, Innovation, User-centric and Trust in rings around the words Brand Values.',
      title: 'Vault brand values',
      caption: 'From the Vault identity work: security, innovation, user-centric, trust.',
    },
  ],
};

export const contact = {
  heading: 'Write to me.',
  body: 'Hiring a product designer, building something, or curious how Plater works? Email me. I’m open to full-time roles and freelance projects.',
};

// What I do: three practices, proof lines from the CV (confirmed citable 2026-11-17).
export const pillars = [
  {
    id: 'product',
    title: 'Product design',
    lede: 'One product that a guest with a minute, a waiter mid-service and an owner checking the week’s numbers all have to understand.',
    proof: [
      'Around 60 screens across the guest, waiter, kitchen and owner sides of Plater.',
      'Eight usability sessions in restaurants; taking an order went from four screens to two.',
      'Shipped every two weeks, each build reviewed before it reached pilot venues.',
      'I work end to end: information architecture, A/B tests and heatmaps, not only the screens.',
    ],
  },
  {
    id: 'systems',
    title: 'Design systems',
    lede: 'Built once, themed per venue: change a token and every component follows. The blocks here are this site’s own colour tokens.',
    proof: [
      '40+ components with tokens, light and dark themes.',
      'Per-venue theming: each subdomain changes colour and type without breaking a component.',
      'Set up so the developer builds straight from Figma, no questions about spacing.',
    ],
  },
  {
    id: 'brand',
    title: 'Brand and launch',
    lede: 'Everything around the product: the identity, the website and the launch.',
    proof: [
      'Valora identity from scratch: logo, colour system, typography.',
      'Designed and built the marketing site.',
      'SEO for the websites I design and build.',
      'Launch content for LinkedIn and Instagram, including promo videos.',
    ],
  },
];
