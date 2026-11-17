import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Shell } from '../../../src/App.jsx';
import { Header } from '../../../src/components/Header.jsx';
import { Icon } from '../../../src/components/Icon.jsx';
import { Picture } from '../../../src/components/Picture.jsx';
import { person } from '../../../src/content/site.js';
import '../../../src/styles/base.css';
import './previews.css';
import './previews-2.css';

// Development-only sketches of three openings. Not part of the build.

function Actions() {
  return (
    <div className="pv-actions">
      <a className="btn btn--accent" href="#work">
        See the work <Icon name="arrow-down" />
      </a>
      <a className="hero__email pv-email" href={`mailto:${person.email}`}>
        Email me
      </a>
    </div>
  );
}

/* ---------- A: Pulled apart ---------- */
const STATIONS = [
  { id: 'guest', n: '01', name: 'Guest', note: 'Orders from the table, nothing to install.', img: 'scene-guest', w: 236, d: 300, pos: '20% 30%', light: true },
  { id: 'kitchen', n: '02', name: 'Kitchen', note: 'One colour per order state.', img: 'scene-kds', w: 430, d: 246 },
  { id: 'waiter', n: '03', name: 'Waiter', note: 'The bill arrives with one action: paid.', img: 'frag-bill', w: 230, d: 282, pos: 'center top' },
  { id: 'owner', n: '04', name: 'Owner', note: 'Menu, staff and delivery zones.', img: 'scene-owner', w: 560, d: 250, light: true },
];
const GAP = 104;

function Slab({ s, z, active }) {
  return (
    <div
      className={`pv-slab${active ? ' is-active' : ''}${s.light ? ' is-light' : ''}`}
      style={{ '--w': `${s.w}px`, '--d': `${s.d}px`, '--z': `${z}px`, left: -s.w / 2, top: -s.d / 2 }}
    >
      <i className="pf pf--s" />
      <i className="pf pf--w" />
      <div className="pf pf--top">
        <Picture name={s.img} alt="" sizes="600px" style={{ objectPosition: s.pos || 'center' }} />
      </div>
    </div>
  );
}

function PulledApart() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held) return;
    const id = setInterval(() => setI((v) => (v + 1) % STATIONS.length), 2600);
    return () => clearInterval(id);
  }, [held]);
  const zOf = (k) => (STATIONS.length - 1 - k) * GAP;
  return (
    <section className="pv pv-a" data-ground="night">
      <div className="page pv-a__grid">
        <div className="pv-a__copy">
          <h1 className="pv-name">Iliya Dinev</h1>
          <p className="pv-lede">I design for people with thirty seconds to spare.</p>
          <p className="pv-meta">Product designer in Sofia. At Valora I design Plater, a restaurant platform, here pulled apart for the four people one order passes through.</p>
          <ol className="pv-stations" onMouseLeave={() => setHeld(false)}>
            {STATIONS.map((s, k) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={k === i}
                  onMouseEnter={() => (setI(k), setHeld(true))}
                  onFocus={() => (setI(k), setHeld(true))}
                  onBlur={() => setHeld(false)}
                >
                  <span className="t-mono">{s.n}</span>
                  <span className="pv-stations__name">{s.name}</span>
                  <span className="pv-stations__note">{s.note}</span>
                </button>
              </li>
            ))}
          </ol>
          <Actions />
        </div>
        <div className="pv-a__stage" aria-hidden="true">
          <div className="pv-a__shadow" />
          <div className="pv-iso">
            {STATIONS.map((s, k) => (
              <Slab key={s.id} s={s} z={zOf(k)} active={k === i} />
            ))}
            <div className="pv-order" style={{ '--z': `${zOf(i) + 12}px` }}>
              <i className="pf pf--s" />
              <i className="pf pf--w" />
              <i className="pf pf--top" />
            </div>
            <div className="pv-axis" style={{ '--hh': `${GAP * 3 + 40}px` }} />
          </div>
          {STATIONS.map((s, k) => {
            const sc = 1.1;
            const z = zOf(k) + 10 + (k === i ? 40 : 0);
            const x = (-(s.w + s.d) / (2 * Math.SQRT2)) * sc;
            const y = (((s.w - s.d) / (2 * Math.SQRT2)) * sc) * Math.cos((58 * Math.PI) / 180) - z * Math.sin((58 * Math.PI) / 180);
            return (
              <span key={s.id} className={`pv-tag${k === i ? ' is-active' : ''}`} style={{ left: `calc(52% + ${x}px)`, top: `calc(68% + ${y}px)` }}>
                <span className="t-mono">{s.n}</span> {s.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- B: Redlined ---------- */
const MARKS = {
  kitchen: {
    img: 'scene-kds',
    label: 'Kitchen board',
    alt: 'The Plater kitchen board with three columns: new, cooking and ready.',
    marks: [
      { x: 1.5, y: 25, w: 97, h: 12, text: 'One colour per order state, so the board reads from a metre away.' },
      { x: 2.4, y: 43, w: 30, h: 10, text: 'Each ticket leads with its table and a running timer.' },
      { x: 2.4, y: 72, w: 29, h: 15, text: 'One action per ticket: start, ready, served.' },
    ],
  },
};

function Redlined() {
  const set = MARKS.kitchen;
  return (
    <section className="pv pv-b" data-ground="night">
      <div className="page pv-b__grid">
        <div className="pv-b__copy">
          <h1 className="pv-name">Iliya Dinev</h1>
          <p className="pv-lede">I design for people with thirty seconds to spare.</p>
          <p className="pv-meta">Product designer in Sofia, Design Lead at Valora. This is Plater’s kitchen board, marked up the way I hand it to the developer.</p>
          <Actions />
        </div>
        <figure className="pv-b__sheet">
          <div className="pv-b__screen">
            <Picture name={set.img} alt={set.alt} sizes="760px" priority />
            {set.marks.map((m, k) => (
              <span key={k} className="pv-mark" style={{ left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%`, '--k': k }}>
                <b className="t-mono">{k + 1}</b>
              </span>
            ))}
          </div>
          <ol className="pv-b__notes">
            {set.marks.map((m, k) => (
              <li key={k} style={{ '--k': k }}>
                <b className="t-mono">{k + 1}</b>
                {m.text}
              </li>
            ))}
          </ol>
          <div className="pv-b__tabs" role="group" aria-label="Screen">
            <button type="button" aria-pressed="true">Kitchen board</button>
            <button type="button" aria-pressed="false">Waiter phone</button>
            <button type="button" aria-pressed="false">Guest menu</button>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ---------- C: Name and index ---------- */
const INDEX = [
  { n: '01', name: 'Plater', status: 'Live product', live: true, year: '2024–now', img: 'plater-live-hero', cap: 'Plater, plater.bg after the redesign' },
  { n: '02', name: 'Vault', status: 'Self-initiated concept', year: '2025', img: 'vault-spending', cap: 'Vault, spending tracker' },
  { n: '03', name: 'Aura', status: 'Self-initiated concept', year: '2024', img: 'aura-home', cap: 'Aura, home screen' },
  { n: '04', name: 'More work', status: 'TripTryst, EVOLVE, Nike, Amazon', year: '', img: 'trip-cover', cap: 'TripTryst, booking website' },
];

function NameIndex() {
  const [i, setI] = useState(0);
  const item = INDEX[i];
  return (
    <section className="pv pv-c" data-ground="night">
      <div className="page pv-c__grid">
        <h1 className="pv-c__name">Iliya Dinev</h1>
        <div className="pv-c__left">
          <p className="pv-lede">I design for people with thirty seconds to spare. Product designer in Sofia, Design Lead at Valora.</p>
          <ol className="pv-index">
            {INDEX.map((p, k) => (
              <li key={p.n}>
                <a href="#work" aria-current={k === i ? 'true' : undefined} onMouseEnter={() => setI(k)} onFocus={() => setI(k)}>
                  <span className="t-mono">{p.n}</span>
                  <span className="pv-index__name">{p.name}</span>
                  <span className="pv-index__status">
                    {p.live ? <i className="pv-live" /> : null}
                    {p.status}
                  </span>
                  <span className="t-mono pv-index__year">{p.year}</span>
                </a>
              </li>
            ))}
          </ol>
          <Actions />
        </div>
        <figure className="pv-c__frame">
          <Picture key={item.img} name={item.img} alt="" sizes="800px" priority />
          <figcaption>{item.cap}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- D: Four screens to two ---------- */
function Schematic({ kind }) {
  return (
    <div className="pv-ph__ui">
      <i className="pv-ph__bar" />
      {kind === 'grid' ? (
        <div className="pv-ph__grid">
          {Array.from({ length: 9 }).map((_, k) => (
            <i key={k} className={k === 4 ? 'on' : undefined} />
          ))}
        </div>
      ) : null}
      {kind === 'list' ? (
        <div className="pv-ph__rows">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <i key={k} className={k === 1 ? 'on' : undefined} />
          ))}
        </div>
      ) : null}
      {kind === 'cards' ? (
        <div className="pv-ph__cards">
          {[0, 1, 2, 3].map((k) => (
            <i key={k} className={k === 2 ? 'on' : undefined} />
          ))}
        </div>
      ) : null}
      {kind === 'sum' ? (
        <div className="pv-ph__rows pv-ph__rows--sum">
          {[0, 1, 2].map((k) => (
            <i key={k} />
          ))}
        </div>
      ) : null}
      <i className="pv-ph__btn" />
    </div>
  );
}

const PHONES = ['grid', 'list', 'cards', 'sum'];

function FourToTwo() {
  return (
    <section className="pv pv-d" data-ground="night">
      <div className="page pv-d__grid">
        <h1 className="pv-name pv-d__name">Iliya Dinev</h1>
        <div className="pv-d__copy">
          <p className="pv-lede">I design for people with thirty seconds to spare.</p>
          <p className="pv-meta">Product designer in Sofia, Design Lead at Valora. After eight usability sessions inside restaurants, taking an order in Plater went from four screens to two.</p>
          <Actions />
        </div>
        <div className="pv-d__count" aria-hidden="true">
          <span className="pv-d__n pv-d__n--4">4</span>
          <span className="pv-d__n pv-d__n--2">2</span>
          <span className="pv-d__unit">screens to take an order</span>
        </div>
        <div className="pv-d__stage" aria-hidden="true">
          <div className="pv-d__shadow" />
          <div className="pv-iso pv-d__iso">
            {PHONES.map((kind, k) => (
              <div key={kind} className={`pv-ph pv-ph--${k + 1}`} style={{ left: -360 + k * 190, top: -150 }}>
                <i className="pf pf--s" />
                <i className="pf pf--w" />
                <div className="pf pf--top pv-ph__screen">
                  <Schematic kind={kind} />
                  {k === 1 || k === 2 ? (
                    <div className="pv-ph__merged">
                      <Schematic kind={k === 1 ? 'cards' : 'sum'} />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <p className="pv-d__caption">Schematic of the waiter’s order flow, before and after the restaurant sessions.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- E: Before and after ---------- */
function BeforeAfter() {
  const [p, setP] = useState(100);
  const [drag, setDrag] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setP(52), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="pv pv-e" data-ground="night">
      <div className="page pv-e__grid">
        <h1 className="pv-name pv-e__name">Iliya Dinev</h1>
        <div className="pv-e__copy">
          <p className="pv-lede">I design for people with thirty seconds to spare.</p>
          <p className="pv-meta">Product designer in Sofia, Design Lead at Valora. Below: the Plater homepage before my audit and after the redesign that shipped. Drag the line.</p>
          <Actions />
        </div>
      </div>
      <div className="page">
        <div className={`pv-e__frame${drag ? ' is-drag' : ''}`}>
          <Picture name="plater-live-hero" alt="The live plater.bg homepage after the redesign." className="pv-e__img" sizes="1400px" priority />
          <div className="pv-e__before" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>
            <Picture name="plater-before-hero" alt="The old Plater homepage before the audit: five promises competing in the hero." className="pv-e__img" sizes="1400px" priority />
          </div>
          <div className="pv-e__line" style={{ left: `${p}%` }}>
            <span className="pv-e__handle">
              <Icon name="arrow-left" size={14} />
              <Icon name="arrow-right" size={14} />
            </span>
          </div>
          <span className="pv-e__label pv-e__label--l">Before the audit</span>
          <span className="pv-e__label pv-e__label--r">Live on plater.bg</span>
          <input
            className="pv-e__range"
            type="range"
            min="0"
            max="100"
            value={p}
            aria-label="Compare the homepage before and after"
            onPointerDown={() => setDrag(true)}
            onPointerUp={() => setDrag(false)}
            onChange={(e) => setP(+e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- F: The name, built ---------- */
function NameBuilt() {
  const layers = 14;
  return (
    <section className="pv pv-f" data-ground="night">
      <h1 className="visually-hidden">Iliya Dinev</h1>
      <div className="pv-f__stage" aria-hidden="true">
        <div className="pv-f__shadow" />
        <div className="pv-f__scene">
          <div className="pv-f__floor" />
          <span className="pv-f__sizer">Iliya Dinev</span>
          {Array.from({ length: layers }).map((_, k) => (
            <span key={k} className="pv-f__layer" style={{ '--k': k, color: k < layers - 4 ? 'var(--accent-deep)' : 'var(--accent)' }}>
              Iliya Dinev
            </span>
          ))}
          <span className="pv-f__layer pv-f__layer--top" style={{ '--k': layers }}>
            Iliya Dinev
          </span>
          <div className="pv-f__on">
            <div className="pv-part pv-part--solid" style={{ left: '62%', top: '30%', '--w': '74px', '--d': '30px', '--h': '16px' }}>
              <i className="pf pf--s" />
              <i className="pf pf--w" />
              <i className="pf pf--top" />
            </div>
            <div className="pv-part" style={{ left: '35.5%', top: '44%', '--w': '58px', '--d': '58px', '--h': '8px' }}>
              <i className="pf pf--s" />
              <i className="pf pf--w" />
              <i className="pf pf--top" />
            </div>
            <div className="pv-part" style={{ left: '83%', top: '40%', '--w': '40px', '--d': '22px', '--h': '22px' }}>
              <i className="pf pf--s" />
              <i className="pf pf--w" />
              <i className="pf pf--top" />
            </div>
            <div className="pv-part pv-part--solid pv-part--hop" style={{ top: '62%', '--w': '26px', '--d': '26px', '--h': '26px' }}>
              <i className="pf pf--s" />
              <i className="pf pf--w" />
              <i className="pf pf--top" />
            </div>
          </div>
        </div>
      </div>
      <div className="page pv-f__foot">
        <div>
          <p className="pv-lede">I design for people with thirty seconds to spare.</p>
          <p className="pv-meta">Product designer in Sofia, Design Lead at Valora, where I design Plater, a restaurant platform.</p>
        </div>
        <Actions />
      </div>
    </section>
  );
}

const VARIANTS = { a: PulledApart, b: Redlined, c: NameIndex, d: FourToTwo, e: BeforeAfter, f: NameBuilt };

function App() {
  const v = new URLSearchParams(location.search).get('v') || 'a';
  const View = VARIANTS[v] || PulledApart;
  return (
    <Shell>
      <Header page="home" />
      <main id="main">
        <View />
      </main>
    </Shell>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
