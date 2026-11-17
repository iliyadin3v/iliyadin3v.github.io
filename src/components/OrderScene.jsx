import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { StationArt } from './StationArt.jsx';
import './OrderScene.css';

// "One order": a pinned scroll scene. While the section is pinned the page scrolls at its
// normal speed; progress picks the station. Without motion (or on small screens) the same
// steps render as an ordinary stacked list, each one linkable.
function usePinnedMode() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 900px) and (min-height: 600px)');
    const update = () => setPinned(!rm.matches && wide.matches);
    update();
    rm.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      rm.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, []);
  return pinned;
}

// The scroll-linked part of the pinned scene. It is mounted only while the scene is near the screen,
// so nothing tracks the scroll position anywhere else on the page. The line fills with a transform,
// not a width, so it never triggers layout.
function Progress({ trackRef, n, onActive }) {
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const scaleX = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => onActive(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999)))));
  return <m.span className="scene__fill" style={{ scaleX }} />;
}

function Step({ s, i, total }) {
  return (
    <div className="scene-step__inner">
      <div className="scene-step__text">
        <h3 className="scene-step__station">{s.station}</h3>
        <p className="scene-step__meta">
          <span className="t-mono">
            {String(i + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </p>
        <p className="scene-step__body">{s.body}</p>
      </div>
      <div className="scene-step__art">
        <StationArt kind={s.art} />
      </div>
    </div>
  );
}

export function OrderScene({ scene }) {
  const pinned = usePinnedMode();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const [still, setStill] = useState(false);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStill(!e.isIntersecting));
    const nearIo = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '50% 0px' });
    io.observe(el);
    nearIo.observe(el);
    return () => {
      io.disconnect();
      nearIo.disconnect();
    };
  }, []);
  const n = scene.steps.length;

  return (
    <section className="scene" id="order" ref={sectionRef} data-ground="night" data-pinned={pinned || undefined} data-still={still || undefined} aria-labelledby="scene-h">
      <div className="scene__track" ref={trackRef} style={{ '--steps': n }}>
        {pinned
          ? scene.steps.map((s, i) => (
              <span key={s.id} id={s.id} className="scene__anchor" style={{ top: `calc(${i} * 100svh + 1px)` }} aria-hidden="true" />
            ))
          : null}
        <div className="scene__sticky">
          <div className="page scene__frame">
            <header className="scene__head">
              <h2 className="scene__h" id="scene-h">
                {scene.heading}
              </h2>
              <p className="scene__intro">{scene.intro}</p>
            </header>

            {pinned ? (
              <div className="scene__stage" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={scene.steps[active].id}
                    className="scene-step scene-step--pinned"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <Step s={scene.steps[active]} i={active} total={n} />
                  </m.div>
                </AnimatePresence>
              </div>
            ) : (
              <ol className="scene__list">
                {scene.steps.map((s, i) => (
                  <li key={s.id} id={s.id} className="scene-step">
                    <Step s={s} i={i} total={n} />
                  </li>
                ))}
              </ol>
            )}

            <div className="scene__line" aria-hidden="true">
              <span className="scene__line-bar" />
              {scene.steps.map((s, i) => (
                <span
                  key={s.id}
                  className="scene__stop"
                  data-pos={i === 0 ? 'first' : i === n - 1 ? 'last' : undefined}
                  data-on={pinned ? i <= active || undefined : true}
                  style={{ left: `${(i / (n - 1)) * 100}%` }}
                >
                  <span className="scene__stop-label">{s.station}</span>
                </span>
              ))}
              {pinned && near ? <Progress trackRef={trackRef} n={n} onActive={setActive} /> : null}
            </div>
            <p className="scene__outro">{scene.outro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
