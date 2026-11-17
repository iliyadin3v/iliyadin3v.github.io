import { useRef, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Picture } from './Picture.jsx';
import { Icon } from './Icon.jsx';
import './CompareStates.css';

// Keyboard behaviour for a row of tabs: arrows move and activate, Home/End jump.
function useTabKeys(count, index, set, refs) {
  return (e) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % count;
    if (e.key === 'ArrowLeft') next = (index - 1 + count) % count;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = count - 1;
    if (next === null) return;
    e.preventDefault();
    set(next);
    refs.current[next]?.focus();
  };
}

export function CompareStates({ section }) {
  const { topics, states } = section;
  const [t, setT] = useState(0);
  const [s, setS] = useState(2); // start on "Shipped"
  const topicRefs = useRef([]);
  const stateRefs = useRef([]);
  const topic = topics[t];
  const frame = topic.frames[s];
  const onTopicKeys = useTabKeys(topics.length, t, setT, topicRefs);
  const onStateKeys = useTabKeys(states.length, s, setS, stateRefs);
  const panelId = `${section.id}-panel`;

  return (
    <div className="compare">
      <div className="compare__bar">
        <div role="tablist" aria-label="Topic" className="compare__topics" onKeyDown={onTopicKeys}>
          {topics.map((tp, i) => (
            <button
              key={tp.id}
              ref={(el) => (topicRefs.current[i] = el)}
              role="tab"
              type="button"
              id={`${section.id}-tab-${tp.id}`}
              aria-selected={i === t}
              aria-controls={panelId}
              tabIndex={i === t ? 0 : -1}
              className="compare__topic"
              onClick={() => setT(i)}
            >
              {tp.label}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Version" className="compare__states" onKeyDown={onStateKeys}>
          {states.map((st, i) => (
            <button
              key={st}
              ref={(el) => (stateRefs.current[i] = el)}
              role="radio"
              type="button"
              aria-checked={i === s}
              tabIndex={i === s ? 0 : -1}
              className="compare__state"
              onClick={() => setS(i)}
            >
              <span className="compare__state-n t-mono" aria-hidden="true">
                {i + 1}
              </span>
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="compare__panel" id={panelId} role="tabpanel" aria-labelledby={`${section.id}-tab-${topic.id}`}>
        <div className="compare__frame">
          <AnimatePresence initial={false} mode="popLayout">
            <m.div
              key={`${topic.id}-${s}`}
              className="compare__img"
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Picture name={frame.image} alt={`${states[s]}: ${frame.alt}`} sizes="(min-width: 1200px) 66vw, 94vw" />
            </m.div>
          </AnimatePresence>
          <span className="compare__tag" aria-hidden="true">
            {states[s]}
          </span>
        </div>
        <div className="compare__note">
          <p>{topic.note}</p>
          {topic.quote ? (
            <blockquote className="quote">
              <p className="quote__bg" lang="bg">
                {topic.quote.bg}
              </p>
              <p className="quote__en">{topic.quote.en}</p>
            </blockquote>
          ) : null}
          <a className="compare__finding link-arrow" href={`#finding-${topic.finding}`}>
            Audit finding {topic.finding}
            <Icon name="arrow-right" className="arrow-up-turn" />
          </a>
        </div>
      </div>
    </div>
  );
}
