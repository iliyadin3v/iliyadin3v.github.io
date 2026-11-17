import { useEffect, useMemo, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Icon } from './Icon.jsx';
import './OrderDemo.css';

// An interactive recreation of Plater's order flow, simplified. Dishes and prices are the
// La Piazza demo venue shown on plater.bg. Nothing is sent anywhere.
const MENU = [
  { id: 'margherita', name: 'Pizza Margherita', note: 'San Marzano, fior di latte, basil', price: 12.9 },
  { id: 'diavola', name: 'Pizza Diavola', note: 'Spicy salami, mozzarella', price: 17.9 },
  { id: 'formaggi', name: 'Quattro Formaggi', note: 'Gorgonzola, taleggio, mozzarella', price: 18.9 },
];
const euro = (v) => `${v.toFixed(2)} €`;
const COLUMNS = [
  { id: 'new', label: 'New', action: 'Start cooking' },
  { id: 'cooking', label: 'Cooking', action: 'Mark ready' },
  { id: 'ready', label: 'Ready', action: null },
];

function useElapsed(since) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!since) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [since]);
  if (!since) return '00:00';
  const s = Math.max(0, Math.floor((now - since) / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function OrderDemo() {
  const [qty, setQty] = useState({ margherita: 1, diavola: 1, formaggi: 0 });
  const [stage, setStage] = useState('menu'); // menu → new → cooking → ready → served
  const [sentAt, setSentAt] = useState(null);
  const [orderNo, setOrderNo] = useState(47);
  const [say, setSay] = useState('');
  const elapsed = useElapsed(stage !== 'menu' && stage !== 'served' ? sentAt : null);

  const lines = useMemo(() => MENU.filter((d) => qty[d.id] > 0), [qty]);
  const total = lines.reduce((sum, d) => sum + d.price * qty[d.id], 0);
  const count = lines.reduce((sum, d) => sum + qty[d.id], 0);

  const change = (id, delta) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(9, q[id] + delta)) }));
  const send = () => {
    setSentAt(Date.now());
    setStage('new');
    setSay(`Order ${orderNo} sent from table 4. It is now on the kitchen board in New.`);
  };
  const advance = () => {
    if (stage === 'new') {
      setStage('cooking');
      setSay(`Order ${orderNo} moved to Cooking.`);
    } else if (stage === 'cooking') {
      setStage('ready');
      setSay(`Order ${orderNo} is ready. The waiter's phone shows: table 4, order ready.`);
    }
  };
  const serve = () => {
    setStage('served');
    setSay(`Table 4 served. Total ${euro(total)}.`);
  };
  const reset = () => {
    setStage('menu');
    setSentAt(null);
    setOrderNo((n) => n + 1);
    setSay('New order started at table 4.');
  };

  const locked = stage !== 'menu';

  return (
    <div className="demo" role="group" aria-labelledby="demo-h">
      <div className="demo__head">
        <h4 className="demo__h" id="demo-h">
          Try the order flow
        </h4>
        <p className="demo__note">
          An interactive recreation of Plater’s order flow, simplified. Dishes and prices come from the La Piazza demo venue on plater.bg.
        </p>
      </div>

      <div className="demo__panels">
        {/* Guest phone */}
        <section className="demo-panel demo-guest" aria-label="Guest phone at table 4">
          <header className="demo-panel__top">
            <span>La Piazza</span>
            <span className="t-mono">Table 4</span>
          </header>
          <ul className="demo-menu">
            {MENU.map((d) => (
              <li key={d.id}>
                <div className="demo-menu__text">
                  <span className="demo-menu__name">{d.name}</span>
                  <span className="demo-menu__note">{d.note}</span>
                  <span className="demo-menu__price">{euro(d.price)}</span>
                </div>
                <div className="demo-qty" aria-label={`${d.name} quantity`}>
                  <button type="button" onClick={() => change(d.id, -1)} disabled={locked || qty[d.id] === 0} aria-label={`One less ${d.name}`}>
                    <Icon name="minus" size={14} />
                  </button>
                  <output aria-live="off">{qty[d.id]}</output>
                  <button type="button" onClick={() => change(d.id, 1)} disabled={locked} aria-label={`One more ${d.name}`}>
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <footer className="demo-guest__foot">
            <span>
              {count} {count === 1 ? 'item' : 'items'} · <strong>{euro(total)}</strong>
            </span>
            <button type="button" className="demo-btn demo-btn--primary" onClick={send} disabled={locked || count === 0}>
              {locked ? 'Order sent' : 'Send order'}
            </button>
          </footer>
        </section>

        {/* Kitchen board */}
        <section className="demo-panel demo-kitchen" aria-label="Kitchen board">
          <header className="demo-panel__top demo-panel__top--dark">
            <span>Kitchen</span>
            <span className="demo-live">Live</span>
          </header>
          <div className="demo-cols">
            {COLUMNS.map((c) => (
              <div key={c.id} className={`demo-col demo-col--${c.id}`}>
                <p className="demo-col__label">
                  {c.label} <span>{stage === c.id ? 1 : 0}</span>
                </p>
                <AnimatePresence initial={false}>
                  {stage === c.id ? (
                    <m.div
                      key={c.id}
                      className="demo-card"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <p className="demo-card__top">
                        <strong>Table 4</strong>
                        <span className="t-mono">{elapsed}</span>
                      </p>
                      <ul>
                        {lines.map((d) => (
                          <li key={d.id}>
                            {qty[d.id]}× {d.name}
                          </li>
                        ))}
                      </ul>
                      {c.action ? (
                        <button type="button" className="demo-btn" onClick={advance}>
                          {c.action}
                        </button>
                      ) : (
                        <p className="demo-card__wait">Waiting for the waiter</p>
                      )}
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Waiter phone */}
        <section className="demo-panel demo-waiter" aria-label="Waiter phone">
          <header className="demo-panel__top demo-panel__top--dark">
            <span>Waiter</span>
            <span className="t-mono">#{orderNo}</span>
          </header>
          <div className="demo-waiter__body">
            {stage === 'ready' ? (
              <div className="demo-alert">
                <p>
                  <strong>Table 4: order ready</strong>
                  <span>{count} items at the pass</span>
                </p>
                <button type="button" className="demo-btn demo-btn--go" onClick={serve}>
                  Served
                </button>
              </div>
            ) : stage === 'served' ? (
              <div className="demo-alert demo-alert--done">
                <p>
                  <strong>Table 4 served</strong>
                  <span>Bill so far {euro(total)}</span>
                </p>
                <button type="button" className="demo-btn" onClick={reset}>
                  New order
                </button>
              </div>
            ) : (
              <p className="demo-waiter__idle">
                {stage === 'menu' ? 'No orders waiting. Send one from the guest phone.' : 'Order in the kitchen. You will see it here when it is ready.'}
              </p>
            )}
          </div>
        </section>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {say}
      </p>
    </div>
  );
}
