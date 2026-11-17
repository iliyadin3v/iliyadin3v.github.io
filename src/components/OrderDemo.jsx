import { useEffect, useMemo, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Icon } from './Icon.jsx';
import { useSite } from '../i18n/index.jsx';
import './OrderDemo.css';

// An interactive recreation of Plater's order flow, simplified. Dishes and prices are the
// La Piazza demo venue shown on plater.bg. Nothing is sent anywhere.
// Names and notes come from the interface strings, in the page's language.
const PRICES = { margherita: 12.9, diavola: 17.9, formaggi: 18.9 };
const euro = (v) => `${v.toFixed(2)} €`;
const COLUMNS = ['new', 'cooking', 'ready'];

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
  const L = useSite().t.demo;
  const MENU = L.menu.map((m) => ({ ...m, price: PRICES[m.id] }));
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
    setSay(L.saySent(orderNo));
  };
  const advance = () => {
    if (stage === 'new') {
      setStage('cooking');
      setSay(L.sayCooking(orderNo));
    } else if (stage === 'cooking') {
      setStage('ready');
      setSay(L.sayReady(orderNo));
    }
  };
  const serve = () => {
    setStage('served');
    setSay(L.sayServed(euro(total)));
  };
  const reset = () => {
    setStage('menu');
    setSentAt(null);
    setOrderNo((n) => n + 1);
    setSay(L.sayStart);
  };

  const locked = stage !== 'menu';

  return (
    <div className="demo" role="group" aria-labelledby="demo-h">
      <div className="demo__head">
        <h4 className="demo__h" id="demo-h">
          {L.heading}
        </h4>
        <p className="demo__note">
          {L.note}
        </p>
      </div>

      <div className="demo__panels">
        {/* Guest phone */}
        <section className="demo-panel demo-guest" aria-label={L.guestAria}>
          <header className="demo-panel__top">
            <span>La Piazza</span>
            <span className="t-mono">{L.table}</span>
          </header>
          <ul className="demo-menu">
            {MENU.map((d) => (
              <li key={d.id}>
                <div className="demo-menu__text">
                  <span className="demo-menu__name">{d.name}</span>
                  <span className="demo-menu__note">{d.note}</span>
                  <span className="demo-menu__price">{euro(d.price)}</span>
                </div>
                <div className="demo-qty" aria-label={L.qtyAria(d.name)}>
                  <button type="button" onClick={() => change(d.id, -1)} disabled={locked || qty[d.id] === 0} aria-label={L.less(d.name)}>
                    <Icon name="minus" size={14} />
                  </button>
                  <output aria-live="off">{qty[d.id]}</output>
                  <button type="button" onClick={() => change(d.id, 1)} disabled={locked} aria-label={L.more(d.name)}>
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <footer className="demo-guest__foot">
            <span>
              {count} {L.items(count)} · <strong>{euro(total)}</strong>
            </span>
            <button type="button" className="demo-btn demo-btn--primary" onClick={send} disabled={locked || count === 0}>
              {locked ? L.sent : L.send}
            </button>
          </footer>
        </section>

        {/* Kitchen board */}
        <section className="demo-panel demo-kitchen" aria-label={L.kitchenAria}>
          <header className="demo-panel__top demo-panel__top--dark">
            <span>{L.kitchen}</span>
            <span className="demo-live">{L.live}</span>
          </header>
          <div className="demo-cols">
            {COLUMNS.map((c) => (
              <div key={c} className={`demo-col demo-col--${c}`}>
                <p className="demo-col__label">
                  {L.columns[c]} <span>{stage === c ? 1 : 0}</span>
                </p>
                <AnimatePresence initial={false}>
                  {stage === c ? (
                    <m.div
                      key={c}
                      className="demo-card"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <p className="demo-card__top">
                        <strong>{L.table}</strong>
                        <span className="t-mono">{elapsed}</span>
                      </p>
                      <ul>
                        {lines.map((d) => (
                          <li key={d.id}>
                            {qty[d.id]}× {d.name}
                          </li>
                        ))}
                      </ul>
                      {L.actions[c] ? (
                        <button type="button" className="demo-btn" onClick={advance}>
                          {L.actions[c]}
                        </button>
                      ) : (
                        <p className="demo-card__wait">{L.waitWaiter}</p>
                      )}
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Waiter phone */}
        <section className="demo-panel demo-waiter" aria-label={L.waiterAria}>
          <header className="demo-panel__top demo-panel__top--dark">
            <span>{L.waiter}</span>
            <span className="t-mono">#{orderNo}</span>
          </header>
          <div className="demo-waiter__body">
            {stage === 'ready' ? (
              <div className="demo-alert">
                <p>
                  <strong>{L.ready}</strong>
                  <span>{L.atPass(count)}</span>
                </p>
                <button type="button" className="demo-btn demo-btn--go" onClick={serve}>
                  {L.served}
                </button>
              </div>
            ) : stage === 'served' ? (
              <div className="demo-alert demo-alert--done">
                <p>
                  <strong>{L.servedTitle}</strong>
                  <span>
                    {L.billSoFar} {euro(total)}
                  </span>
                </p>
                <button type="button" className="demo-btn" onClick={reset}>
                  {L.newOrder}
                </button>
              </div>
            ) : (
              <p className="demo-waiter__idle">
                {stage === 'menu' ? L.idle : L.inKitchen}
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
