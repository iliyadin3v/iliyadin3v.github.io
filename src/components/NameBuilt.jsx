import './NameBuilt.css';

// The opening's object: the name set as real type on an axonometric plane (rotateX 56°, rotateZ
// -30°, no perspective), standing as solid letters on a drafting grid with a few interface parts on
// it. Every position is in em of the word's own font-size, so one font-size scales the whole build.
// Decorative: the page's h1 carries the name for assistive tech.
//
// The letter walls are one stack of fine text-shadows in the word's own plane. Each step is offset
// along the in-plane direction that projects straight down on screen at this angle (dx = -0.5774·dy,
// and 1.2839em of dy per em of depth), so the stack draws the silhouette a real extrusion of DEPTH
// would, as one smooth layer instead of dozens of stacked text planes.
const DEPTH = 0.21;
const STEPS = 120;
const DX = -0.7413;
const DY = 1.2839;

// Bands down the wall: a light-purple rim under the face, the violet wall, a darker foot.
const band = (t) => (t <= 0.2 ? 'var(--nb-wall-1)' : t <= 0.82 ? 'var(--nb-wall-2)' : 'var(--nb-wall-3)');
const WALLS = Array.from({ length: STEPS }, (_, i) => {
  const t = (i + 1) / STEPS;
  return `${(DX * DEPTH * t).toFixed(4)}em ${(DY * DEPTH * t).toFixed(4)}em ${band(t)}`;
}).join(',');

// Measured from Mona Sans 620 at -0.03em tracking: cap and ascender tops sit at 0.155em, the
// x-height at 0.335em, the baseline at 0.885em; the word is 4.63em wide. The hopping block's landing
// squares were found by scanning the rendered word for 0.09em squares fully on ink: the tops of I,
// l, the i's tittle, the y's right arm, the a's stem, the D's top-left corner and the second tittle.
// It hops there and back letter by letter; the stops live in the nb-hop-path keyframes.

function Part({ x, y, w, d, h, tone = 'glass', className = '' }) {
  return (
    <div className={`nb-part nb-part--${tone} ${className}`} style={{ left: `${x}em`, top: `${y}em`, '--w': `${w}em`, '--d': `${d}em`, '--h': `${h}em` }}>
      <i className="nb-f nb-f--s" />
      <i className="nb-f nb-f--w" />
      <i className="nb-f nb-f--top" />
    </div>
  );
}

export function NameBuilt({ name }) {
  return (
    <div className="nb" aria-hidden="true" style={{ '--nb-depth': `${DEPTH}em` }}>
      <div className="nb__tilt">
        <div className="nb__scene">
          <div className="nb__floor" />
          <span className="nb__cast">{name}</span>
          {/* a toggle lying on the grid in front of the e, clear of the line of letters so it never
              reads as punctuation */}
          <div className="nb__ground">
            <Part x={3.62} y={1.14} w={0.36} d={0.12} h={0.045} />
            <Part tone="solid" x={3.85} y={1.14} w={0.12} d={0.12} h={0.1} />
          </div>
          <span className="nb__face" style={{ textShadow: WALLS }}>
            {name}
          </span>
          {/* parts standing on the letters */}
          <div className="nb__on">
            {/* a card resting on the bowl of the a; it lifts and settles again, like a component
                being swapped in. (Nothing sits on the D's top bar: a strip there read as a macron.) */}
            <Part className="nb-part--lift" x={1.31} y={0.6} w={0.38} d={0.24} h={0.03} />
            {/* the block that hops letter to letter and back: the outer element travels the path,
                the inner one carries the arc, the crouch and the squash */}
            <div className="nb-hop">
              <div className="nb-hop__z">
                <Part className="nb-part--hop" tone="solid" x={0} y={0} w={0.09} d={0.09} h={0.09} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
