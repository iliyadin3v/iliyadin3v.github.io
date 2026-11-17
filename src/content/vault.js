// Vault case study. Sources:
//  - Iliya's Vault presentation and Figma screens in D:/Work/Vault (problem/solution slide, user flow,
//    registration, crypto, settings, notifications, card, typography and colours, brand values)
//  - his CV, confirmed citable on 2026-11-17 (the five-person test of the send flow)
// Placeholders in the screens (names, balances, prices) are not presented as data.
// Left out on purpose: the survey slide (demographics only, and its age figures add up to 115%) and the
// posters with an invented "Best Finance App of 2024" quote.

export const vault = {
  slug: 'vault',
  name: 'Vault',
  title: 'Vault',
  lede: 'A personal-finance and crypto wallet meant to feel as calm as an ordinary banking app. A self-initiated concept, from problem framing and flows to the interface and the brand.',
  hero: {
    image: 'vault-hero',
    alt: 'Vault on a phone lying on concrete in raking light: spent $142.57 since 1 July, a spend tracker split into transfers and financial services, and tiles for Round Ups and Weekly Depositer.',
    caption: 'Track spending, the screen the saving rules hang off (mockup).',
    viewTransition: 'vault-shot',
  },
  meta: [
    { term: 'Role', detail: 'Product designer, solo: problem framing, flows, interface and brand.' },
    { term: 'Platform', detail: 'Mobile app, designed on iPhone screens.' },
    { term: 'Scope', detail: 'Onboarding and identity check, crypto market and price alerts, spending and automatic saving, card, brand system.' },
    { term: 'Year', detail: '2025' },
    { term: 'Status', detail: 'Self-initiated concept', live: false, href: 'https://www.behance.net/gallery/207053483/VAULT-Finance-Mobile-app-UIUX-Design', linkLabel: 'Behance' },
  ],

  sections: [
    {
      id: 'context',
      nav: 'Context',
      type: 'text-media',
      heading: 'Money, crypto and investing in one app',
      body: [
        'Vault keeps everyday money, cryptocurrencies and investments in one place. Home opens on the total balance with Add money and Transfer, the people you pay most and the latest transactions. Beside it sit a wallet with monthly activity, a card account, a crypto market and an investment overview.',
        'I did not want it to look like a trading terminal. Vault starts from the kind of banking app people already use every day and puts crypto inside it. The welcome screen says it in three words: “Simplify, Secure, Succeed.”',
      ],
      media: [
        { image: 'vault-screens', alt: 'Three Vault screens side by side: Home with the total balance and recent transactions, My Wallet with a monthly activity chart, and the card account with top-up, pay and transfer.', caption: 'Home, wallet and card: the screens people would open most.' },
      ],
    },

    {
      id: 'problem',
      nav: 'Problem',
      type: 'pairs',
      heading: 'Six problems, six answers',
      intro:
        'I framed the concept around six problems people run into when they manage money in an app, and answered each one in the product. Where an answer is not designed as screens yet, the last column says so.',
      caption: 'The six problems Vault answers, and where each answer lives in the app',
      columns: ['Problem', 'Answer', 'In the app'],
      rows: [
        { n: '01', problem: 'Not knowing which investment options exist.', answer: 'Learning resources and personal recommendations inside the app.', where: 'Investment overview and activity. The learning content is not designed yet.' },
        { n: '02', problem: 'Fear of market volatility.', answer: 'Risk assessment and diversified portfolio options.', where: 'Price alerts, so nobody has to watch the chart. Risk tools are not designed yet.' },
        { n: '03', problem: 'Overspending and weak budgeting.', answer: 'Budgeting tools and spending alerts.', where: 'Spend tracker by category, transaction alerts.' },
        { n: '04', problem: 'Missing a fraudulent transaction.', answer: 'Real-time transaction alerts and a secure way to report suspicious activity.', where: 'Transaction alerts. The report flow is not designed yet.' },
        { n: '05', problem: 'Setting savings goals and never reaching them.', answer: 'Goals and automatic saving.', where: 'Brain: round-ups, a weekly deposit and overdraft protection.' },
        { n: '06', problem: 'Low interest on savings accounts.', answer: 'Insight into higher-yield savings and other places to grow money.', where: 'Interest on savings, part of Vault Premium.' },
      ],
    },

    {
      id: 'structure',
      nav: 'Structure',
      type: 'figure',
      heading: 'One home, everything one step away',
      body: ['The user flow starts at sign up or log in and lands on Home, the financial overview. Every other part of the app branches from there, and the tab bar keeps five of them in reach: Home, Search, Market, Alerts and Profile.'],
      image: 'vault-flow',
      alt: 'Vault user flow: from sign up or log in to the home page, then branches for notifications, investment (overview, activity), spend (tracker), pocket, deposit (select account, confirm deposit), withdraw, and profile with update details, quick transfers, notifications, app icon, security and Vault Premium.',
      figCaption: 'User flow from the Vault presentation.',
      notes: [
        { title: 'Spend', body: 'The spend tracker and the rules that set money aside.' },
        { title: 'Investment', body: 'Portfolio overview and activity.' },
        { title: 'Pocket, deposit, withdraw', body: 'Moving money in and out, with an account picker and a confirmation before a deposit goes through.' },
        { title: 'Profile', body: 'Account details, quick transfers, notifications, app icon, security, and the upgrade to Premium.' },
      ],
    },

    {
      id: 'onboarding',
      nav: 'Onboarding',
      type: 'figure',
      heading: 'Opening an account that holds real money',
      body: [
        'A wallet has to know who you are, and hiding that makes it feel worse. The second screen lays the whole setup out as three steps before anything is asked: create your account, secure it with email and password, verify your identity with an ID or passport.',
        'The name screen asks for the name “as it appears on official documents”, split into legal first, middle and last name, so it matches the identity check later. Returning users log in with email and password, or with Google, Facebook or Apple.',
      ],
      image: 'vault-reg',
      alt: 'Four onboarding screens: Welcome to Vault; Let’s get started with three steps (create your account, secure your account, verify identity); the legal name form; and log in with email, password, and Google, Facebook or Apple.',
      figCaption: 'Registration and onboarding.',
    },

    {
      id: 'crypto',
      nav: 'Crypto',
      type: 'figure',
      heading: 'Crypto without watching the chart',
      body: [
        'The market lists coins with price and daily change, filtered by all, watchlists and trending. A coin opens on its chart with Buy and Sell at the bottom, and stats, positions and open orders one tab away.',
        'For someone nervous about volatility, the most useful action is often not a trade but an alert. “Let me know when the price is” takes a target from a ruler or the keypad, and the confirmation says plainly what happens next.',
      ],
      image: 'vault-crypto',
      alt: 'Four crypto screens: the market list with Bitcoin, Ethereum and other coins; the Ethereum detail with a weekly chart and Buy and Sell; Create ETH price alert with a $3,500 target and a keypad; and Price alert created.',
      figCaption: 'Market, coin, price alert, confirmation. Prices are placeholders.',
      callout: {
        heading: 'Testing the send flow',
        body: 'I tested the core flows with five people new to crypto. Three of them completed a send on the first try, so I redesigned the confirmation step until all five did. Friction stays in front of the actions you cannot undo, and nowhere else.',
      },
    },

    {
      id: 'saving',
      nav: 'Saving',
      type: 'screens',
      heading: 'Saving that runs itself, and says what it did',
      intro:
        'Automatic saving only works if people can see what moved and why. Vault speaks in the first person when it acts on its own: “This is where you can configure how I set money aside for you.”',
      items: [
        { image: 'vault-brain', alt: 'The Brain screen: enable quick transfers, a note about how money is set aside, and bank balance protection with overdraft deposits on, automatic mode, weekly depositer and round ups on Wednesdays.', title: 'Brain', body: 'Every saving rule in one place: overdraft deposits, an automatic mode, a weekly deposit and round-ups on Wednesdays.' },
        { image: 'vault-notify', alt: 'Notification settings with switches for bank balance, how often, monthly lookback, investments, surveys, rule-based transfers and overdraft suggestion.', title: 'Notifications', body: 'Seven alert types, each with its own switch, down to “I’ll tell you when I make a transfer triggered by a saving rule.”' },
      ],
    },

    {
      id: 'card',
      nav: 'Card',
      type: 'figure',
      heading: 'Choosing the card',
      body: ['The Vault debit card gets its own introduction before anyone orders it: customisation, transparent pricing with no hidden fees, and instant discounts. The next screen is a colour picker across five finishes, starting with Deep Purple.'],
      image: 'vault-cardpick',
      alt: 'The card colour picker showing a Deep Purple card, with graphite, coral, blue and white finishes lined up beside the phone.',
      figCaption: 'The card picker and its five finishes.',
    },

    {
      id: 'brand',
      nav: 'Brand',
      type: 'system',
      heading: 'Brand and system',
      intro: 'The identity aims for simplicity and trust: a split-stem V, one typeface, and a purple palette that stays calm on a near-black ground.',
      specimen: { image: 'vault-type', alt: 'Type specimen: the word VAULT and the Lufga alphabet in upper and lower case with numerals.' },
      typeface: { name: 'Lufga', note: 'One typeface for the wordmark and the interface.' },
      colors: [{ hex: '#613DC1' }, { hex: '#7D80DA' }, { hex: '#A786DB' }, { hex: '#FFE4FA' }, { hex: '#121212' }],
      values: { heading: 'Brand values', items: ['Security', 'Innovation', 'User-centric', 'Trust'] },
      media: [
        { image: 'vault-sign', alt: 'The Vault V on a purple square sign mounted on a building facade (mockup).', caption: 'The mark on signage (mockup).' },
        { image: 'vault-icon', alt: 'An iPhone dock on lavender with the Vault app icon beside Phone, Safari and Messages (mockup).', caption: 'The app icon in the dock (mockup).' },
      ],
    },

    {
      id: 'learning',
      nav: 'Learning',
      type: 'learning',
      heading: 'Limits and what I took from it',
      limits: [
        'Vault is a concept: no real accounts, money or market data. Names, balances and prices on the screens are placeholders.',
        'The early survey only recorded who answered (gender, region, age and role), not what they struggle with, so the six problems are my framing rather than research findings.',
        'The send flow and its redesigned confirmation step are not among the published screens.',
        'Three of the six answers (learning content, risk tools and reporting fraud) are not designed as screens yet.',
      ],
      lessons: [
        { title: 'Borrow trust from banking', body: 'People already know how a banking app behaves. Putting crypto inside that asks less of them than a trading app would.' },
        { title: 'Put friction where it protects', body: 'A confirmation step earns its cost before something irreversible. Anywhere else it is only a delay.' },
        { title: 'Automation has to explain itself', body: 'Rules that move money need one place to set them and a message every time they act.' },
      ],
      next: {
        heading: 'What I would design next',
        items: [
          'The send and confirmation flow as a published sequence, in the version all five testers completed.',
          'A short risk check before a first investment, and the learning content the first problem calls for.',
          'Reporting a suspicious transaction straight from its alert.',
        ],
      },
    },
  ],

  next: { label: 'Next project: Aura', detail: 'A wellbeing app that asks one question first', href: '/work/aura/' },
};
