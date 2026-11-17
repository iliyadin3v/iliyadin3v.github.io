import { Box, Flat, Shade, Scene } from './PillarArt.jsx';
import './StationArt.css';

// "One order, four people": one axonometric scene per station, built in the same kit as the opening
// and the "What I do" scenes (same plane, glass boxes, solid light-purple blocks, the drafting grid).
// Drawn in code, so every station stays sharp at any size. The order is the one solid block with the
// opening's banded walls, the same in every scene it appears in. The step's own text carries the
// meaning, so the art is decorative.

// The order: a solid block with banded walls (rim, violet, foot), as the letters of the name.
function Order({ where }) {
  return <Box tone="solid" x={0} y={0} w={0.55} d={0.4} h={0.22} className={`os-order os-order--${where}`} />;
}

// Table: a guest picks a dish on their phone and sends the order; it lifts off the table and leaves.
function TableArt() {
  return (
    <Scene kind="station os-table" w={4.2} d={2.8} fitW={4.7} fitH={3.1}>
      <Shade x={0.2} y={0.3} w={3.8} d={2.3} />
      <Box x={0.2} y={0.3} w={3.8} d={2.3} h={0.12}>
        <Flat x={0.25} y={0.3} w={0.72} d={0.72} className="os-round" />
        <Flat x={0.38} y={0.43} w={0.46} d={0.46} tone="faint" className="os-round" />
        <Flat x={0.25} y={1.26} w={0.72} d={0.72} className="os-round" />
        <Flat x={0.38} y={1.39} w={0.46} d={0.46} tone="faint" className="os-round" />
        {/* knife and fork beside each plate */}
        <Flat x={1.04} y={0.32} w={0.05} d={0.68} tone="faint" />
        <Flat x={1.12} y={0.32} w={0.05} d={0.68} tone="faint" />
        <Flat x={1.04} y={1.28} w={0.05} d={0.68} tone="faint" />
        <Flat x={1.12} y={1.28} w={0.05} d={0.68} tone="faint" />
        <Box x={1.25} y={0.22} w={0.95} d={1.85} h={0.12} className="ik-device os-mass">
          <Flat x={0.1} y={0.1} w={0.42} d={0.08} />
          {[0, 1, 2].map((k) => (
            <span key={k}>
              <Flat x={0.1} y={0.3 + k * 0.36} w={0.26} d={0.26} tone="faint" />
              <Flat x={0.42} y={0.32 + k * 0.36} w={0.42} d={0.07} />
              <Flat x={0.42} y={0.45 + k * 0.36} w={0.26} d={0.06} tone="faint" />
            </span>
          ))}
          <Flat x={0.06} y={0.62} w={0.83} d={0.32} className="os-pick" />
          <Flat x={0.1} y={1.55} w={0.75} d={0.18} />
          <Flat x={0.1} y={1.55} w={0.75} d={0.18} tone="solid" className="os-lit os-lit--send" />
        </Box>
        <Box x={2.75} y={0.5} w={0.62} d={0.12} h={0.66} className="os-qr" />
      </Box>
      <Order where="table" />
    </Scene>
  );
}

// Kitchen: the board stands on the counter, upright like the screen in a real kitchen. The order's
// ticket comes in under New, then moves to Cooking and Ready; every state has its own colour, so the
// board reads from a metre away. The order block waits on the counter until it is served.
const COLS = [
  { id: 'new', count: 2 },
  { id: 'cooking', count: 3 },
  { id: 'ready', count: 1 },
];
function KitchenArt() {
  return (
    <Scene kind="station os-kitchen" w={4.4} d={2.4} fitW={4.9} fitH={4.3}>
      <Shade x={0.2} y={0.9} w={4.0} d={1.4} />
      <Box x={0.2} y={0.9} w={4.0} d={1.4} h={0.3} className="os-counter" />
      <div className="os-screen os-screen--board" style={{ left: '0.4em', top: `${0.98 - 1.9}em`, width: '3.6em', height: '1.9em' }}>
        <div className="os-board">
          <div className="os-board__top">
            <span className="os-board__title" />
            <span className="os-board__live" />
          </div>
          <div className="os-board__cols">
            {COLS.map((c) => (
              <div key={c.id} className={`os-col os-col--${c.id}`}>
                <span className="os-col__label">
                  <i />
                  <b>{c.count}</b>
                </span>
                <span className="os-col__frame" />
                <span className="os-ticket">
                  <i className="os-ticket__stripe" />
                  <i className="os-ticket__line" />
                  <i className="os-ticket__line os-ticket__line--short" />
                  <i className="os-ticket__action" />
                </span>
              </div>
            ))}
            <span className="os-ticket os-ticket--order">
              <i className="os-ticket__stripe os-tint os-tint--new" />
              <i className="os-ticket__stripe os-tint os-tint--cooking" />
              <i className="os-ticket__stripe os-tint os-tint--ready" />
              <i className="os-ticket__line" />
              <i className="os-ticket__line os-ticket__line--short" />
              <i className="os-ticket__action os-tint os-tint--new" />
              <i className="os-ticket__action os-tint os-tint--cooking" />
              <i className="os-ticket__action os-tint os-tint--ready" />
            </span>
          </div>
        </div>
      </div>
      <Order where="kitchen" />
    </Scene>
  );
}

// Waiter: at the pass, not at a table. The order is plated under the heat lamp, and the phone the
// waiter carries lights up: ready, then the table's bill with everything on one card, then paid.
function WaiterArt() {
  return (
    <Scene kind="station os-waiter" w={4.0} d={2.0} fitW={4.6} fitH={4.1}>
      <Shade x={0.1} y={0.3} w={3.8} d={0.95} />
      <Box x={0.1} y={0.3} w={3.8} d={0.95} h={0.42} className="os-counter">
        <Flat x={0.2} y={0.17} w={0.6} d={0.6} className="os-round" />
        <Flat x={0.33} y={0.3} w={0.34} d={0.34} tone="solid" className="os-round os-food" />
        <Flat x={1.0} y={0.17} w={0.6} d={0.6} className="os-round" />
        <Flat x={1.13} y={0.3} w={0.34} d={0.34} tone="solid" className="os-round os-food" />
        <Flat x={1.8} y={0.17} w={0.6} d={0.6} className="os-round" />
        {/* the dock the waiter's phone stands in between orders */}
        <Box x={2.75} y={0.45} w={0.9} d={0.28} h={0.08} className="os-mass" />
      </Box>
      {/* the heat lamp over the pass, on two posts */}
      <Box x={0.2} y={0.42} w={0.05} d={0.05} h={1.35} className="os-post" />
      <Box x={2.5} y={0.42} w={0.05} d={0.05} h={1.35} className="os-post" />
      <Box x={0.15} y={0.38} w={2.45} d={0.14} h={0.06} className="os-lamp" style={{ transform: 'translateZ(1.35em)' }} />
      <Order where="waiter" />
      {/* the phone, upright in its dock: ready, then the bill, then paid */}
      <div className="os-screen os-screen--phone" style={{ left: '2.85em', top: `${0.3 + 0.45 + 0.24 - 1.72}em` , width: '0.9em', height: '1.72em' }}>
        <div className="os-phone">
          <span className="os-phone__bar" />
          <span className="os-phone__ring" />
          <span className="os-phone__ready" />
          <span className="os-phone__bill">
            <i />
            <i />
            <i />
          </span>
          <span className="os-phone__paid">
            <i />
          </span>
        </div>
      </div>
    </Scene>
  );
}

// Owner: the management panel open on a laptop, showing delivery zones on a map, and the weekly
// report beside it, its seven days filling in.
function OwnerArt() {
  return (
    <Scene kind="station os-owner" w={4.6} d={2.7} fitW={5.15} fitH={3.6}>
      <Shade x={0.3} y={1.0} w={2.5} d={1.5} />
      <Shade x={3.2} y={1.45} w={1.2} d={0.85} />
      <Box x={0.3} y={1.0} w={2.5} d={1.5} h={0.1} className="os-mass">
        {Array.from({ length: 30 }).map((_, k) => (
          <Flat key={k} x={0.22 + (k % 10) * 0.21} y={0.16 + Math.floor(k / 10) * 0.2} w={0.16} d={0.14} tone="faint" />
        ))}
        <Flat x={0.85} y={0.86} w={0.8} d={0.48} tone="faint" />
      </Box>
      {/* the screen hinges up from the back edge of the base, facing the viewer */}
      <div className="os-screen os-screen--laptop" style={{ left: '0.3em', top: `${1.0 - 1.5}em`, width: '2.5em', height: '1.5em' }}>
        <div className="os-screen__panel">
          <span className="os-screen__side" />
          <span className="os-zone os-zone--a" />
          <span className="os-zone os-zone--b" />
          <span className="os-zone os-zone--c" />
          <span className="os-pin" />
        </div>
      </div>
      <Box x={3.2} y={1.45} w={1.2} d={0.85} h={0.05} className="os-report">
        <Flat x={0.1} y={0.08} w={0.5} d={0.08} />
        {Array.from({ length: 7 }).map((_, k) => (
          <Box
            key={k}
            tone="solid"
            x={0.12 + k * 0.14}
            y={0.52}
            w={0.08}
            d={0.08}
            h={[0.22, 0.34, 0.28, 0.46, 0.4, 0.58, 0.5][k]}
            className="os-bar"
            style={{ '--k': k }}
          />
        ))}
      </Box>
    </Scene>
  );
}

export function StationArt({ kind }) {
  if (kind === 'table') return <TableArt />;
  if (kind === 'kitchen') return <KitchenArt />;
  if (kind === 'waiter') return <WaiterArt />;
  return <OwnerArt />;
}
