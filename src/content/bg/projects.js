// Selected work, Bulgarian. Mirrors src/content/projects.js key for key; edit both together.
// On the pass each project is an order ticket on the rail; front of house it is an entry on the
// menu, shown as a working drawing beside the finished screen.
// Status must stay honest: 'Работещ продукт' (Live product), 'Личен концептуален проект'
// (Self-initiated concept), 'Концепция' (Concept).

export const selected = [
  {
    id: 'plater',
    ticket: '002',
    key: '1',
    name: 'Plater',
    summary:
      'Платформа за ресторанти с QR менюта, поръчки от масата, кухненски екрани и отчети за собственика. Пилотните заведения я ползват всеки ден.',
    role: 'Водещ дизайнер и маркетинг специалист, Valora',
    status: 'Работещ продукт',
    live: true,
    years: '2024 – досега',
    challenge:
      'Една система за трима потребители: гостът поръчва за по-малко от минута, сервитьорът следи в движение какво става по масите, а собственикът проверява продажбите от лаптоп.',
    decision:
      'Одитът откри, че първият екран на сайта обещаваше пет неща наведнъж. Новият дизайн първо назовава категорията, а после показва как една поръчка минава от масата през кухнята до сервитьора.',
    thumb: 'scene-guest',
    drawing: {
      image: 'plater-before-hero',
      label: 'Преди',
      alt: 'Старият първи екран на plater.app от UX одита: „Digitize your restaurant.“ със снимка на храна, примерна карта с поръчка и четири показателя, които се борят за внимание.',
    },
    image: 'plater-live-hero',
    imageLabel: 'На живо',
    alt: 'Актуалната начална страница на plater.bg: заглавието „Система за управление на заведения“ до кухненски екран и два телефона, които показват как една поръчка минава от масата през кухнята до сервитьора.',
    viewTransition: 'plater-shot',
    link: { href: '/bg/work/plater/', label: 'Прочетете казуса: одит и редизайн' },
  },
  {
    id: 'vault',
    ticket: '003',
    key: '2',
    name: 'Vault',
    summary: 'Портфейл за лични финанси и криптовалути, с който да се чувствате спокойни като в обикновено банково приложение.',
    role: 'Продуктов дизайнер, работих сам',
    status: 'Личен концептуален проект',
    years: '2025',
    challenge:
      'Да направя изпращането на криптовалута безопасно за хора, които никога не са ползвали крипто приложение, без да забавя всичко останало.',
    decision:
      'Допълнителни стъпки само преди действията, които не можете да отмените. Трима от петима участници без опит с крипто завършиха изпращане, затова преработвах стъпката за потвърждение, докато не успяха и петимата.',
    thumb: 'frag-vault',
    drawing: {
      image: 'vault-flow',
      label: 'Пътят на потребителя',
      alt: 'Пътят на потребителя във Vault: от регистрация или вход към началната страница, а оттам разклонения към инвестиции, разходи, джоб, внасяне, теглене и настройки на профила.',
    },
    image: 'vault-hero',
    imageLabel: 'Проследяване на разходите',
    alt: 'Vault на телефон, оставен върху бетон: похарчени $142.57 от 1 юли, графика на разходите, разделен на преводи и финансови услуги, и плочките Round Ups и Weekly Depositer.',
    viewTransition: 'vault-shot',
    link: { href: '/bg/work/vault/', label: 'Прочетете казуса' },
  },
  {
    id: 'aura',
    ticket: '004',
    key: '3',
    name: 'Aura',
    summary: 'Приложение за благополучие, в което следите физическото, психическото и емоционалното си състояние от един начален екран, който настройвате сами.',
    role: 'UI/UX и дизайн на лого',
    status: 'Личен концептуален проект',
    // Year not confirmed by Iliya; this is the Behance publication year.
    yearLabel: 'Публикуван',
    years: '2024, Behance',
    challenge:
      'Да събера проследяването на настроението, съня и активността на едно място, без началният екран да се превърне в табло с всичко.',
    decision:
      'Началният екран първо задава един въпрос, „How are you feeling today?“, и подрежда показателите под него като големи плочки.',
    thumb: 'aura-welcome',
    drawing: {
      image: 'aura-ia',
      label: 'Информационна архитектура',
      alt: 'Информационната архитектура на Aura: вход, начален екран, програми, известия и профил, с разклонения за сканиране на храна, записване на тренировка или настроение и тренировъчни програми.',
    },
    image: 'aura-life',
    imageLabel: 'Екран за добре дошли',
    alt: 'Поглед през рамо над бюро: две ръце държат телефон с екрана за добре дошли на Aura и ментовия лотос (визуализация).',
    viewTransition: 'aura-shot',
    link: { href: '/bg/work/aura/', label: 'Прочетете казуса' },
  },
];

// The rest of the work. Links go to Behance; `year` is the Behance publication year.
// `status: null` renders a visible "Status to confirm" placeholder until Iliya confirms it.
// TripTryst, EVOLVE and Luscious confirmed as work assignments by Iliya on 2026-11-17.
export const archive = [
  { name: 'TripTryst', type: 'Сайт за резервации на пътувания', status: 'Работно задание', year: '2024', href: 'https://www.behance.net/gallery/201405955/TripTryst-Booking-Trips-Website-UIUX-Design' },
  { name: 'Редизайн на плащането в Nike', type: 'UX проект', status: 'Личен проект', year: '2025', href: 'https://www.behance.net/gallery/231621155/Nike-Checkout-Redesign-Project-UX-Project' },
  { name: 'Достъп до клиентската поддръжка на Amazon', type: 'UX проект', status: 'Личен проект', year: '2025', href: 'https://www.behance.net/gallery/229917273/Amazon-Customer-Support-Access-UX-Project' },
  { name: 'EVOLVE', type: 'Компания за електрически велосипеди, продуктов дизайн', status: 'Работно задание', year: '2025', href: 'https://www.behance.net/gallery/224550275/EVOLVE-Electric-bike-company-Product-Design' },
  { name: 'UX проучване на Apple', type: 'Експертна оценка', status: 'Личен проект', year: null, href: null },
  { name: 'Luscious', type: 'Сайт с рецепти', status: 'Работно задание', year: '2024', href: 'https://www.behance.net/gallery/196061981/Luscious-Food-and-cocktail-recipe-website-design' },
];

// "One order": the pinned scroll scene. Every line is checked against the CV or plater.bg.
export const orderScene = {
  heading: 'Една поръчка, четирима души',
  intro: 'Гост с минута време, готвач с десет поръчки на опашка, сервитьор в движение и собственикът, който на следващата сутрин преглежда цифрите за седмицата. Plater трябва да е ясен и за четиримата.',
  steps: [
    {
      id: 'order-table',
      station: 'Маса',
      art: 'table',
      body: 'Гостът сканира QR кода и поръчва от масата, без да инсталира нищо. Вижда снимки, добавки и алергени, а сметката е една за цялата маса.',
    },
    {
      id: 'order-kitchen',
      station: 'Кухня',
      art: 'kitchen',
      body: 'Поръчката се появява на кухненския екран в колона „Нова“. Всяко състояние има свой цвят, затова екранът се разчита от метър разстояние.',
    },
    {
      id: 'order-waiter',
      station: 'Сервитьор',
      art: 'waiter',
      body: 'Телефонът на сервитьора показва кога поръчката е готова и кога масата иска сметката. Всичко е на една карта, с едно действие.',
    },
    {
      id: 'order-owner',
      station: 'Собственик',
      art: 'owner',
      body: 'Собственикът управлява заведението от панела за управление: меню, персонал, зони за доставка с автоматични такси. Всяка седмица отчет по имейл обобщава цифрите, а един от пилотните ресторанти вече поръчва стоката си по него.',
    },
  ],
  outro: 'Най-много промениха този процес осемте теста с потребители в ресторанти: поръчка вече се приема с два екрана вместо с четири.',
};
