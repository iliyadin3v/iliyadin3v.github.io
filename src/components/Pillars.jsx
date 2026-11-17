import { useEffect, useRef, useState } from 'react';
import { PillarArt } from './PillarArt.jsx';
import { useSite } from '../i18n/index.jsx';
import './Pillars.css';

// What I do: three practices, each backed by concrete proof from the CV, and each opened by a small
// 3D scene about that practice (one order across three screens; tokens driving components; the
// Valora mark and a launch post). The scenes pause when the section leaves the screen.
export function Pillars({ items }) {
  const { t } = useSite();
  const ref = useRef(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStill(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="pillars" id="practice" ref={ref} data-ground="night" data-still={still || undefined} aria-labelledby="pillars-h">
      <div className="page">
        <h2 className="t-h2 pillars__h" id="pillars-h">
          {t.whatIDo}
        </h2>
        <div className="pillars__grid">
          {items.map((p) => (
            <article key={p.id} className={`pillar pillar--${p.id}`}>
              <div className="pillar__art">
                <PillarArt kind={p.id} />
              </div>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__lede">{p.lede}</p>
              <ul className="pillar__proof">
                {p.proof.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
