// Aura case study. Sources: Iliya's Aura presentation and screens in D:/Work/Aura (problem and solution
// slides, persona, information architecture, onboarding, home, mental health, sleep, typography and colours).
// Every number on the screens is placeholder data and is not presented as a result.
// Left out on purpose: the "reviews from early adopters" and "proven engagement" slides (no evidence behind
// them for a concept), the investment pitch, and claims that AI insights or wearable sync exist as built features.

export const aura = {
  slug: 'aura',
  name: 'Aura',
  title: 'Aura',
  lede: 'A wellbeing app that puts physical, mental and emotional tracking on one home screen, and asks how you feel before it shows a single number. A self-initiated concept: product design, interface and the logo.',
  hero: {
    image: 'aura-life',
    alt: 'Over the shoulder at a desk: two hands hold a phone showing the Aura welcome screen with the mint lotus, beside a plant, a laptop and a keyboard.',
    caption: 'The welcome screen in hand (mockup).',
    viewTransition: 'aura-shot',
  },
  meta: [
    { term: 'Role', detail: 'UI/UX and logo design.' },
    { term: 'Platform', detail: 'Mobile app, designed on iPhone screens.' },
    { term: 'Scope', detail: 'Problem framing, information architecture, onboarding and sign-up, home, mood and sleep, brand and type.' },
    { term: 'Published', detail: '2024, Behance' },
    { term: 'Status', detail: 'Self-initiated concept', live: false, href: 'https://www.behance.net/gallery/211887005/Aura-Health-Tracker-and-Wellness-Mobile-App', linkLabel: 'Behance' },
  ],

  sections: [
    {
      id: 'context',
      nav: 'Context',
      type: 'text-media',
      heading: 'One place for body and mind',
      body: [
        'Aura brings physical, mental and emotional wellbeing into one app: mood check-ins, sleep, steps and calories, logging meals and workouts, programs, and tips that follow your goals.',
        'When I compared trackers such as Fitbit and Google Fit, they centred on physical fitness, with mental and emotional wellbeing underplayed or kept apart. Aura starts from how you feel and lets the numbers follow.',
      ],
      media: [
        { image: 'aura-pair', alt: 'Two Aura screens: My Mood, a list of daily moods each with its heart rate; and the logging hub, with tiles to scan a meal, log a workout, a mood or sleep.', caption: 'The mood log, with heart rate beside each day, and the logging hub.' },
      ],
    },

    {
      id: 'problem',
      nav: 'Problem',
      type: 'problem',
      heading: 'Why trackers get in the way',
      body: ['I started from what goes wrong with the health trackers people already use, and from one person who has to fit wellbeing into a full day.'],
      users: {
        heading: 'Who it is for',
        body: 'People who want a steadier routine without becoming data analysts. The persona I designed for is David, 35, an office worker with a demanding job, a family and fitness goals he struggles to keep up with.',
      },
      goals: {
        heading: 'What goes wrong today',
        items: [
          'Interfaces that bury beginners in data and features.',
          'Generic insights that ignore the person’s own goals.',
          'Unreliable syncing with wearables.',
          'Notifications that nag instead of help.',
          'Mental and emotional wellbeing left out or kept separate.',
        ],
      },
      constraints: {
        heading: 'What Aura had to do',
        items: [
          'Stay simple enough for a beginner: one number per tracker, not a dashboard.',
          'Treat mood and sleep as first-class, beside steps and calories.',
          'Remind gently, at the right moments, instead of all day.',
          'Read clearly for people of any age and any comfort with technology.',
        ],
      },
    },

    {
      id: 'structure',
      nav: 'Structure',
      type: 'figure',
      heading: 'Home in the middle, logging one tap away',
      body: ['After sign-up, everything starts at Home. Five branches leave it: tips, programs, notifications, the profile, and a logging hub for meals, barcodes, workouts and mood. The tab bar holds Home, Search, Log in, Programs and Lifestyle.'],
      image: 'aura-ia',
      alt: 'Aura information architecture: log in or sign up leads to Home, which branches to tips, log in (scan a meal, scan a barcode, log a workout, log a mood), programs (recommendation class, warmup, stretch, full-body workout), notifications and profile (my awards). A tilted phone shows the mood question.',
      figCaption: 'Information architecture from the Aura presentation.',
      notes: [
        { title: 'Logging hub', body: 'Scan a meal or a barcode, log a workout or a mood, all from one place.' },
        { title: 'Programs', body: 'A recommended class, warm-up, stretching and full-body workouts.' },
        { title: 'Profile', body: 'Personal details, medical history and care instructions, and awards.' },
      ],
    },

    {
      id: 'first-run',
      nav: 'First run',
      type: 'screens',
      heading: 'First run',
      intro: 'After the welcome screen, three illustrated cards and a short sign-up: personal details, a password, and the body measurements the trackers need.',
      items: [
        { image: 'aura-s-goal', alt: 'Onboarding card “Track Your Goal” with an illustration of a woman looking at an X-ray.', title: 'Goals', body: 'The first of three cards on goals, activity and food. Help with goals is offered, not demanded up front.' },
        { image: 'aura-s-details', alt: 'Personal details: first name, last name and email, with a Confirm button.', title: 'Details', body: 'Name and email on one screen, nothing else yet.' },
        { image: 'aura-s-password', alt: 'Password setup with a four-segment strength meter at three of four, the A–Z and 0–9 rules met, and Confirm enabled.', title: 'Password', body: 'A strength meter and two rules, A–Z and 0–9, that grey out once met. Confirm waits until then.' },
        { image: 'aura-s-profile', alt: 'Complete your profile: choose gender, date of birth, weight in kilograms and height in centimetres.', title: 'Profile', body: 'Gender, date of birth, weight and height, with the unit beside each field.' },
      ],
    },

    {
      id: 'decisions',
      nav: 'Decisions',
      type: 'lens',
      heading: 'Decision lens: the home screen',
      intro: 'Select a pin to read the decision behind that part of the screen.',
      image: 'aura-s-home',
      portrait: true,
      alt: 'The Aura home screen with four numbered pins: on the mood question, on the steps tile, on the calorie card with its week of bars, and on the Log in tab.',
      caption: 'Aura home screen. Pins mark the four decisions listed beside it.',
      hotspots: [
        { n: 1, x: 66, y: 18.4, title: 'One question before any numbers', body: 'Home opens by asking “How are you feeling today?” with five faces to tap. The brief named mental wellbeing as the gap, so mood comes first, and it takes one tap.' },
        { n: 2, x: 88, y: 48.5, title: 'One number per tile', body: 'Steps and weather sit side by side, each with one figure. Steps also shows progress to a goal (“50% of your goal”), not a log of raw data.' },
        { n: 3, x: 33, y: 71, title: 'The week at a glance', body: 'Calories show today’s figure and a strip of seven bars with today picked out, so the pattern is visible without opening a chart.' },
        { n: 4, x: 50, y: 89.6, title: 'Logging in the middle of the tab bar', body: 'Meals, barcodes, workouts and mood are all logged from the centre tab, the easiest one to reach with a thumb.' },
      ],
    },

    {
      id: 'mood',
      nav: 'Check-ins',
      type: 'screens',
      heading: 'Check-ins instead of forms',
      intro: 'Mood and sleep are logged by answering one question, not by filling in a form: a dial for mood, five plain answers for sleep, and a week that shows the pattern in colour.',
      items: [
        { image: 'aura-s-dial', alt: '“How would you describe your mood?” with a neutral face and a colour dial from sad to happy, the needle at neutral. “I Feel Neutral.”', title: 'Mood', body: 'A dial from sad to happy, with the answer written out: “I feel neutral.”' },
        { image: 'aura-s-sleeprate', alt: '“How would you rate your sleep quality?” with five answers: Excellent 7–9 hours, Good 6–7, Fair 5, Poor 3–4, Worst under 3, each with a face.', title: 'Sleep check-in', body: 'Five answers from Excellent to Worst, each with the hours it means.' },
        { image: 'aura-s-tracker', alt: 'Mood tracker on yellow: a large smiling face, Happy, and seven bars for the week in different mood colours.', title: 'Mood tracker', body: 'Today’s mood large, and the week as bars in each day’s mood colour.' },
      ],
    },

    {
      id: 'sleep',
      nav: 'Sleep',
      type: 'screens',
      heading: 'Sleep, from score to schedule',
      intro: 'The sleep screens go from one score to the detail and then to action: how the night went, why, and what to change.',
      items: [
        { image: 'aura-s-sleep', alt: 'Sleep quality on purple: a score of 50, “Fair enough.”, and an overview of REM and core sleep.', title: 'Score', body: 'One number and a plain verdict, “Fair enough”, then REM and core sleep.' },
        { image: 'aura-s-insights', alt: 'Sleep insights: sleep stages through the night as bars, then tips about snoring, room temperature and irregular sleep.', title: 'Insights', body: 'Sleep stages through the night, then suggestions such as lowering the room temperature.' },
        { image: 'aura-s-slept', alt: '“You slept for 8.25h” with concentric rings and the split between REM, core and post-REM sleep, and a Confirm button.', title: 'Last night', body: 'Hours slept and the split between REM, core and post-REM, confirmed in one tap.' },
        { image: 'aura-s-schedule', alt: 'New sleep schedule: sleep at 11:00 PM, wake up at 8:00 AM, repeat snooze, repeat days, and switches for automatic sleep stats and alarm.', title: 'Schedule', body: 'Bedtime and wake-up, snooze, repeat days, and switches for automatic stats and alarm.' },
      ],
    },

    {
      id: 'brand',
      nav: 'Brand',
      type: 'system',
      heading: 'Brand and system',
      intro: 'A lotus mark and soft, natural colours aim for calm. Each tracker on Home has its own colour, so the screen reads at a glance.',
      specimen: { image: 'aura-type', alt: 'Type specimen: Work Sans in Regular, Medium, SemiBold and Bold, with the alphabet and numerals.' },
      typeface: { name: 'Work Sans', note: 'Regular, Medium, SemiBold and Bold.' },
      colors: [
        { hex: '#99D9AF', name: 'Turquoise green' },
        { hex: '#A694F5', name: 'Blue purple' },
        { hex: '#ED7E1C', name: 'Princeton orange' },
        { hex: '#FFCE5C', name: 'Naples yellow' },
        { hex: '#FFFFFF', name: 'White' },
      ],
      media: [
        { image: 'aura-logo', alt: 'The Aura logo: a mint lotus of five petals on white.', caption: 'The lotus mark.', fit: 'contain' },
        { image: 'aura-icon', alt: 'An iPhone dock on mint with the Aura app icon beside Phone, Safari and Messages (mockup).', caption: 'The app icon in the dock (mockup).' },
      ],
    },

    {
      id: 'learning',
      nav: 'Learning',
      type: 'learning',
      heading: 'Limits and what I took from it',
      limits: [
        'Aura is a concept. No research or test results are documented for it, so this page makes no claims about how people used it.',
        'Wearable syncing and personalised insights are part of the concept, not built features. Every number on the screens is a placeholder.',
        'The centre tab is labelled “Log in”, which reads like signing in. I would rename it “Log”.',
      ],
      lessons: [
        { title: 'Ask before you measure', body: 'Opening with one question about how someone feels makes the rest of the screen about them, not about the data.' },
        { title: 'One number per tile', body: 'Each tracker shows one figure and progress to a goal. The detail lives one tap deeper.' },
        { title: 'Questions beat forms', body: 'A dial or five plain answers is faster to log than fields, and easier to keep doing every day.' },
      ],
      next: {
        heading: 'What I would test next',
        items: [
          'Whether people keep checking in after the first week, with and without reminders.',
          'Whether the mood question on Home changes what people log afterwards.',
          'Names for the logging tab, with first-time users.',
        ],
      },
    },
  ],

  next: { label: 'Back to the live product: Plater', detail: 'A restaurant platform, its UX audit and redesign', href: '/work/plater/' },
};
