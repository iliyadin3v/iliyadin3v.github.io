import './PillarArt.css';

// Three small axonometric scenes for "What I do", in the same build language as the opening:
// the same plane (rotateX 56°, rotateZ -30°, no perspective), glass parts with hairline lavender
// edges, solid light-purple blocks, a drafting grid one step lighter than the night. Each one is
// about its practice. All positions are in em of the scene's own font-size, which is fitted to the
// art box with container units, so the scenes scale with their column. Decorative: the proof lists
// carry the meaning.

// A cuboid: footprint (x, y, w, d) on its parent's floor, height h. Children go on its top face.
export function Box({ x = 0, y = 0, w, d, h, tone = 'glass', className = '', style, children }) {
  return (
    <div className={`ik-box ik-box--${tone} ${className}`} style={{ left: `${x}em`, top: `${y}em`, '--w': `${w}em`, '--d': `${d}em`, '--h': `${h}em`, ...style }}>
      <i className="ik-f ik-f--s" />
      <i className="ik-f ik-f--w" />
      <div className="ik-f ik-f--top">{children}</div>
    </div>
  );
}

// A flat mark printed on a top face: a bar, a row, a column outline.
export function Flat({ x, y, w, d, tone = 'line', className = '' }) {
  return <i className={`ik-flat ik-flat--${tone} ${className}`} style={{ left: `${x}em`, top: `${y}em`, width: `${w}em`, height: `${d}em` }} />;
}

// A soft contact shade on the grid under an object, offset down and to the right like the opening's
// cast shadow (light from the upper left).
export function Shade({ x, y, w, d }) {
  return <i className="ik-shade" style={{ left: `${x}em`, top: `${y}em`, width: `${w}em`, height: `${d}em` }} />;
}

export function Scene({ kind, w, d, fitW, fitH, children }) {
  return (
    <div className={`ik ik--${kind}`} aria-hidden="true" style={{ '--fit-w': fitW, '--fit-h': fitH }}>
      <div className="ik__scene" style={{ width: `${w}em`, height: `${d}em` }}>
        <div className="ik__floor" />
        {children}
      </div>
    </div>
  );
}

// Product design: one order crossing the three screens it touches. It is sent from the guest's
// phone, moves New, Cooking, Ready on the kitchen board, and reaches the waiter's phone, which
// lights the ready card.
function ProductArt() {
  return (
    <Scene kind="product" w={5.4} d={2.4} fitW={5.9} fitH={3.2}>
      <Shade x={0} y={0.2} w={1} d={2} />
      <Shade x={1.3} y={0.35} w={2.7} d={1.7} />
      <Shade x={4.3} y={0.2} w={1} d={2} />
      <Box x={0} y={0.2} w={1} d={2} h={0.08} className="ik-device">
        <Flat x={0.12} y={0.14} w={0.46} d={0.09} />
        <Flat x={0.12} y={0.38} w={0.76} d={0.22} />
        <Flat x={0.12} y={0.68} w={0.76} d={0.22} />
        <Flat x={0.12} y={0.98} w={0.76} d={0.22} />
        <Flat x={0.7} y={0.68} w={0.18} d={0.22} />
        <Flat x={0.12} y={1.68} w={0.76} d={0.18} />
        <Flat x={0.12} y={1.68} w={0.76} d={0.18} tone="solid" className="ik-lit ik-lit--send" />
      </Box>
      <Box x={1.3} y={0.35} w={2.7} d={1.7} h={0.08} className="ik-device">
        {/* New, Cooking, Ready: the header of the column the order is in lights up */}
        {[0, 1, 2].map((k) => (
          <span key={k}>
            <Flat x={0.1 + k * 0.87} y={0.1} w={0.8} d={0.12} />
            <Flat x={0.1 + k * 0.87} y={0.1} w={0.8} d={0.12} tone="solid" className={`ik-lit ik-col-${k}`} />
            <Flat x={0.1 + k * 0.87} y={0.3} w={0.8} d={1.3} tone="faint" />
          </span>
        ))}
        <Flat x={0.16} y={1.0} w={0.68} d={0.34} />
        <Flat x={1.03} y={1.0} w={0.68} d={0.34} />
      </Box>
      <Box x={4.3} y={0.2} w={1} d={2} h={0.08} className="ik-device">
        <Flat x={0.12} y={0.14} w={0.46} d={0.09} />
        <Flat x={0.12} y={0.36} w={0.76} d={0.56} />
        <Flat x={0.12} y={0.36} w={0.76} d={0.56} tone="solid" className="ik-lit ik-lit--ready" />
        <Flat x={0.12} y={1.02} w={0.76} d={0.22} />
        <Flat x={0.12} y={1.32} w={0.76} d={0.22} />
      </Box>
      <Box tone="solid" x={0} y={0} w={0.34} d={0.22} h={0.07} className="ik-order" />
    </Scene>
  );
}

// Design systems: four token blocks in this site's own accent steps (wash, light, base, deep).
// A selector moves along them, and the button, toggle knob, card bar and tab on the board take on
// whichever token is selected: change a token, and every component follows.
const TOKENS = ['var(--accent-wash)', 'var(--accent-on-night)', 'var(--accent)', 'var(--accent-deep)'];
function Themed() {
  return (
    <span className="ik-theme">
      {TOKENS.map((c, k) => (
        <i key={k} style={{ background: c }} />
      ))}
    </span>
  );
}
function SystemsArt() {
  return (
    <Scene kind="systems" w={2.7} d={2.9} fitW={3.85} fitH={2.6}>
      <Shade x={0.1} y={0.08} w={2.48} d={0.5} />
      <Shade x={0} y={0.9} w={2.7} d={2.0} />
      {TOKENS.map((c, k) => (
        <Box key={k} tone="token" x={0.1 + k * 0.66} y={0.08} w={0.5} d={0.5} h={0.3} style={{ '--tok': c }} />
      ))}
      <Box className="ik-select" x={0.04} y={0.02} w={0.62} d={0.62} h={0.44} />
      <Box x={0} y={0.9} w={2.7} d={2.0} h={0.06} className="ik-device">
        <Box className="ik-themed" x={0.2} y={0.2} w={1.1} d={0.34} h={0.1}>
          <Themed />
        </Box>
        <Box x={1.5} y={0.23} w={0.74} d={0.28} h={0.05} />
        <Box className="ik-themed" x={1.96} y={0.23} w={0.28} d={0.28} h={0.12}>
          <Themed />
        </Box>
        <Box x={0.2} y={0.76} w={1.1} d={1.0} h={0.05}>
          <span className="ik-bar">
            <Themed />
          </span>
          <Flat x={0.1} y={0.36} w={0.8} d={0.1} />
          <Flat x={0.1} y={0.56} w={0.6} d={0.1} />
        </Box>
        <span className="ik-tab">
          <Themed />
        </span>
        <Flat x={1.92} y={0.86} w={0.32} d={0.2} />
      </Box>
    </Scene>
  );
}

// Brand and launch: the Valora AV mark, set from its own outlines and standing on a plinth like a
// sign, with the launch around it: a phone that publishes a post onto a small feed.
const AV_A =
  'M149.96,10.48l100.17,283.94h-48.62L125.07,63.68l-76.44,230.74H0L100.17,10.48C102.35,4.31,108.57.13,115.6.13h18.93c7.03,0,13.26,4.18,15.43,10.35Z';
const AV_V =
  'M282.1,283.94L181.98,0h48.6l76.41,230.74L383.4,0h48.6l-100.13,283.94c-2.18,6.17-8.4,10.35-15.43,10.35h-18.92c-7.02,0-13.25-4.18-15.43-10.35Z';
// The mark stands upright facing the viewer. Its thickness is drawn as copies of the outline in its
// own plane, offset along the direction that projects onto "straight back" at this angle: per unit
// of depth, -0.577 across and -0.779 up (in the mark's own units). Farthest copies paint first.
const MARK_DEPTH = 46; // units of the 294-unit-tall mark
const MARK_STEPS = 24;
const markWalls = Array.from({ length: MARK_STEPS }, (_, i) => {
  const t = (MARK_STEPS - i) / MARK_STEPS;
  const band = t <= 0.2 ? 1 : t <= 0.82 ? 2 : 3;
  return { dx: +(-0.577 * MARK_DEPTH * t).toFixed(2), dy: +(-0.779 * MARK_DEPTH * t).toFixed(2), band };
});
function BrandArt() {
  return (
    <Scene kind="brand" w={3.4} d={2.5} fitW={4.1} fitH={3.3}>
      {/* the sign's own shadow: the mark laid on the grid from its base line, flipped so its top falls
          farthest away, leaning with the light like the name's long cast */}
      <div className="ik-sign-cast" style={{ left: '0.12em', top: '1.16em', width: '2.05em', height: '0.84em' }}>
        <svg viewBox="0 0 432 294.42" preserveAspectRatio="none">
          {/* the blur lives inside the SVG, so it is painted once instead of filtered every frame */}
          <filter id="ik-cast-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <use href="#ik-av" filter="url(#ik-cast-soft)" />
        </svg>
      </div>
      <Shade x={0.05} y={1.0} w={2.25} d={0.36} />
      <Shade x={2.55} y={0.25} w={0.78} d={1.4} />
      <Shade x={2.6} y={1.9} w={0.6} d={0.6} />
      <Box x={0} y={1.06} w={2.3} d={0.26} h={0.06} />
      <div className="ik-sign" style={{ left: '0.12em', top: '-0.26em', width: '2.05em', height: '1.4em' }}>
        <svg className="ik-mark" viewBox="0 0 432 294.42" overflow="visible">
          <defs>
            <g id="ik-av">
              <path d={AV_A} />
              <path d={AV_V} />
            </g>
          </defs>
          {markWalls.map((s, k) => (
            <use key={k} href="#ik-av" className={`ik-mark__wall ik-mark__wall--${s.band}`} transform={`translate(${s.dx} ${s.dy})`} />
          ))}
          <use href="#ik-av" className="ik-mark__face" />
        </svg>
      </div>
      <Box x={2.55} y={0.25} w={0.78} d={1.4} h={0.07} className="ik-device">
        <Flat x={0.1} y={0.12} w={0.36} d={0.08} />
        <Flat x={0.12} y={0.3} w={0.54} d={0.54} tone="faint" />
        <Flat x={0.1} y={0.96} w={0.58} d={0.08} />
        <Flat x={0.1} y={1.12} w={0.4} d={0.08} />
      </Box>
      <Box x={2.6} y={1.9} w={0.6} d={0.6} h={0.04} />
      <Box x={2.6} y={1.9} w={0.6} d={0.6} h={0.04} className="ik-feed-2" />
      <Box tone="solid" x={0} y={0} w={0.52} d={0.52} h={0.04} className="ik-post" />
    </Scene>
  );
}

export function PillarArt({ kind }) {
  if (kind === 'product') return <ProductArt />;
  if (kind === 'systems') return <SystemsArt />;
  return <BrandArt />;
}
