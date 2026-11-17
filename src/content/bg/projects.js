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
      'Платформа за ресторанти с QR менюта, поръчки от масата, кухненски екрани и отчети за собственика, която пилотните заведения използват ежедневно.',
    role: 'Водещ дизайнер и специалист по маркетинг, Valora',
    status: 'Работещ продукт',
    live: true,
    years: '2024 – досега',
    challenge:
      'Една система за три вида потребители: гост, който поръчва за по-малко от минута, сервитьор, който следи състоянието на масите в движение, и собственик, който проверява продажбите от лаптопа си.',
    decision:
      'Одитът установи, че първият екран на сайта обещава пет неща едновременно. Новият дизайн първо посочва вида на продукта, а след това показва как една поръчка преминава от масата през кухнята до сервитьора.',
    thumb: 'scene-guest',
    drawing: {
      image: 'plater-before-hero',
      label: 'Преди',
      alt: 'Старият първи екран на plater.app от UX одита: „Digitize your restaurant.“ със снимка на храна, примерна карта с поръчка и четири показателя, които си съперничат за вниманието.',
    },
    image: 'plater-live-hero',
    imageLabel: 'Сега',
    alt: 'Актуалната начална страница на plater.bg: заглавието „Система за управление на заведения“ до кухненски екран и два телефона, които показват как една поръчка преминава от масата през кухнята до сервитьора.',
    viewTransition: 'plater-shot',
    link: { href: '/bg/work/plater/', label: 'Разгледайте проекта: одит и редизайн' },
  },
  {
    id: 'vault',
    ticket: '003',
    key: '2',
    name: 'Vault',
    summary: 'Портфейл за лични финанси и криптовалути, който да създава същото усещане за спокойствие като обикновено банково приложение.',
    role: 'Продуктов дизайнер, самостоятелен проект',
    status: 'Личен концептуален проект',
    years: '2025',
    challenge:
      'Да направя изпращането на криптовалута безопасно за хора, които никога не са използвали приложение за криптовалути, без да забавям останалите действия.',
    decision:
      'Допълнителни стъпки само преди необратимите действия. Трима от петимата участници без опит с криптовалути завършиха изпращането, затова преработвах стъпката за потвърждение, докато не успяха и петимата.',
    thumb: 'frag-vault',
    drawing: {
      image: 'vault-flow',
      label: 'Пътят на потребителя',
      alt: 'Пътят на потребителя във Vault: от регистрацията или входа до началната страница, а оттам към инвестиции, разходи, подсметка, внасяне, теглене и настройки на профила.',
    },
    image: 'vault-hero',
    imageLabel: 'Проследяване на разходите',
    alt: 'Vault на телефон върху бетонна повърхност: похарчени $142.57 от 1 юли, графика на разходите, разделени на преводи и финансови услуги, и плочките „Round Ups“ и „Weekly Depositer“.',
    viewTransition: 'vault-shot',
    link: { href: '/bg/work/vault/', label: 'Разгледайте проекта' },
  },
  {
    id: 'aura',
    ticket: '004',
    key: '3',
    name: 'Aura',
    summary: 'Приложение за благополучие, в което следите физическото, психическото и емоционалното си състояние от един начален екран, подреден по ваш избор.',
    role: 'UI/UX дизайн и лого',
    status: 'Личен концептуален проект',
    // Year not confirmed by Iliya; this is the Behance publication year.
    yearLabel: 'Публикуван',
    years: '2024, Behance',
    challenge:
      'Да събера проследяването на настроението, съня и активността на едно място, без началният екран да се превърне в претрупано табло.',
    decision:
      'Началният екран първо задава само един въпрос – „How are you feeling today?“ – и под него подрежда показателите като големи плочки.',
    thumb: 'aura-welcome',
    drawing: {
      image: 'aura-ia',
      label: 'Информационна архитектура',
      alt: 'Информационната архитектура на Aura: вход, начален екран, програми, известия и профил, с разклонения за сканиране на ястие, отбелязване на тренировка или настроение и тренировъчни програми.',
    },
    image: 'aura-life',
    imageLabel: 'Приветствен екран',
    alt: 'Изглед през рамо към бюро: две ръце държат телефон с приветствения екран на Aura и лотоса в ментов цвят (визуализация).',
    viewTransition: 'aura-shot',
    link: { href: '/bg/work/aura/', label: 'Разгледайте проекта' },
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
  intro: 'Гост, който разполага с минута, готвач с десет чакащи поръчки, сервитьор в движение и собственик, който на следващата сутрин преглежда резултатите за седмицата. Plater трябва да е разбираем и за четиримата.',
  steps: [
    {
      id: 'order-table',
      station: 'Маса',
      art: 'table',
      body: 'Гостът сканира QR кода и поръчва от масата, без да инсталира нищо. Вижда снимки, добавки и алергени, а сметката е обща за цялата маса.',
    },
    {
      id: 'order-kitchen',
      station: 'Кухня',
      art: 'kitchen',
      body: 'Поръчката се появява на кухненския екран в колоната „Нова“. Всяко състояние има свой цвят, затова екранът се чете и от метър разстояние.',
    },
    {
      id: 'order-waiter',
      station: 'Сервитьор',
      art: 'waiter',
      body: 'Телефонът на сервитьора показва кога поръчката е готова и кога масата иска сметката. Цялата информация е на една карта, с едно действие.',
    },
    {
      id: 'order-owner',
      station: 'Собственик',
      art: 'owner',
      body: 'Собственикът управлява заведението от административния панел: меню, персонал, зони за доставка с автоматично начислявани такси. Всяка седмица получава отчет по имейл с обобщение на резултатите, а един от пилотните ресторанти вече поръчва стоката си въз основа на него.',
    },
  ],
  outro: 'Най-голямо влияние върху този процес имаха осемте теста с потребители в ресторанти: приемането на поръчка вече минава през два екрана вместо през четири.',
};
