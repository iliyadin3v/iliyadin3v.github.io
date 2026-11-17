import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { Picture, ratio } from './Picture.jsx';
import { useMounted } from '../lib/hooks.js';
import { useSite } from '../i18n/index.jsx';
import './DecisionLens.css';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Decision lens: numbered pins on a real screen, each explained beside it.
// The list of buttons is the accessible path (and the readable static fallback:
// before hydration or with "Show all notes", every note is visible).
export function DecisionLens({ section }) {
  const { t } = useSite();
  const { hotspots } = section;
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const mounted = useMounted();
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const itemRefs = useRef([]);
  const [line, setLine] = useState(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const item = itemRefs.current[active];
    if (!wrap || !img || !item || showAll || window.innerWidth < 960) return setLine(null);
    const w = wrap.getBoundingClientRect();
    const i = img.getBoundingClientRect();
    const t = item.getBoundingClientRect();
    const h = hotspots[active];
    const px = i.left - w.left + (i.width * h.x) / 100;
    const py = i.top - w.top + (i.height * h.y) / 100;
    const elbow = i.right - w.left + 16;
    const tx = t.left - w.left - 10;
    const ty = t.top - w.top + 22;
    setLine({ d: `M ${px} ${py} H ${elbow} V ${ty} H ${tx}`, tx, ty, w: w.width, h: w.height });
  }, [active, showAll, hotspots]);

  useIsoLayout(() => {
    measure();
  }, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const onListKeys = (e) => {
    let next = null;
    if (e.key === 'ArrowDown') next = (active + 1) % hotspots.length;
    if (e.key === 'ArrowUp') next = (active - 1 + hotspots.length) % hotspots.length;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    itemRefs.current[next]?.querySelector('button')?.focus();
  };

  return (
    <div className={`lens${section.portrait ? ' lens--portrait' : ''}`} ref={wrapRef} data-enhanced={mounted || undefined} data-all={showAll || undefined}>
      <figure className="lens__figure">
        <div className="lens__screen" ref={imgRef} style={{ aspectRatio: ratio(section.image) }}>
          <Picture name={section.image} alt={section.alt} sizes={section.portrait ? '(min-width: 1200px) 26vw, 70vw' : '(min-width: 1200px) 60vw, 94vw'} />
          {hotspots.map((h, i) => (
            <button
              key={h.n}
              type="button"
              className="lens__pin"
              data-active={(!showAll && i === active) || undefined}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => {
                setShowAll(false);
                setActive(i);
              }}
            >
              {h.n}
            </button>
          ))}
        </div>
        <figcaption className="t-small t-muted lens__caption">{section.caption || t.lensCaption}</figcaption>
      </figure>

      <div className="lens__panel">
        <ol className="lens__list" onKeyDown={onListKeys}>
          {hotspots.map((h, i) => {
            const open = showAll || i === active;
            return (
              <li key={h.n} ref={(el) => (itemRefs.current[i] = el)} className="lens__item" data-open={open || undefined}>
                <h3 className="lens__h">
                  <button
                    type="button"
                    className="lens__btn"
                    aria-expanded={open}
                    aria-controls={`lens-body-${h.n}`}
                    onClick={() => {
                      setShowAll(false);
                      setActive(i);
                    }}
                  >
                    <span className="lens__n" aria-hidden="true">
                      {h.n}
                    </span>
                    <span className="visually-hidden">{t.decisionN(h.n)}</span>
                    {h.title}
                  </button>
                </h3>
                <div className="lens__body" id={`lens-body-${h.n}`}>
                  <m.div
                    key={`${h.n}-${open}`}
                    initial={mounted ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <p>{h.body}</p>
                    {h.finding ? (
                      <a className="lens__ref" href={`#finding-${h.finding}`}>
                        {t.fromFinding} {h.finding}
                      </a>
                    ) : null}
                  </m.div>
                </div>
              </li>
            );
          })}
        </ol>
        <button type="button" className="lens__all" aria-pressed={showAll} onClick={() => setShowAll((v) => !v)}>
          {showAll ? t.showOne : t.showAll}
        </button>
      </div>

      {line ? (
        <svg className="lens__line" width={line.w} height={line.h} aria-hidden="true">
          <path d={line.d} />
          <circle cx={line.tx} cy={line.ty} r="3" />
        </svg>
      ) : null}
    </div>
  );
}
