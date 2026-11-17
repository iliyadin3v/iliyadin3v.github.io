import { useEffect, useRef, useState } from 'react';
import { Picture, ratio } from './Picture.jsx';
import { Icon } from './Icon.jsx';
import { person, contact } from '../content/site.js';
import './Sections.css';

export function About({ data }) {
  return (
    <section className="about section" id="about" data-ground="paper" aria-labelledby="about-h">
      <div className="page grid">
        <div className="about__head">
          <h2 className="t-h2" id="about-h">
            {data.heading}
          </h2>
        </div>
        <div className="about__main">
          {data.intro.map((p) => (
            <p key={p} className="t-lede about__intro measure">
              {p}
            </p>
          ))}
          <ol className="practices">
            {data.practices.map((p) => (
              <li key={p.title} className="practice">
                <h3 className="practice__title">{p.title}</h3>
                <p className="practice__body">{p.body}</p>
              </li>
            ))}
          </ol>
          <dl className="about__details">
            {data.details.map((d) => (
              <div key={d.term}>
                <dt>{d.term}</dt>
                <dd>{d.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Playground({ data }) {
  return (
    <section className="playground section" id="playground" data-ground="paper" aria-labelledby="playground-h">
      <div className="page">
        <div className="playground__head">
          <h2 className="t-h3" id="playground-h">
            {data.heading}
          </h2>
          <p className="t-muted t-small">{data.intro}</p>
        </div>
        <ul className="playground__grid">
          {data.items.map((it, i) => (
            <li key={it.title} className={`pg pg--${i}`}>
              <figure>
                <div className="pg__img" style={{ aspectRatio: i === 0 ? '4 / 3' : ratio(it.image) }}>
                  <Picture name={it.image} alt={it.alt} sizes={i === 0 ? '(min-width: 960px) 55vw, 94vw' : '(min-width: 960px) 38vw, 94vw'} />
                </div>
                <figcaption>
                  <span className="pg__title">{it.title}</span> <span className="t-muted">{it.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CopyEmail({ email }) {
  // Reports "Copied" only when the clipboard write actually succeeded.
  const [state, setState] = useState('idle');
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2400);
  };
  const label = state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed, select the address instead' : 'Copy address';
  return (
    <button type="button" className="copy-btn" onClick={copy} data-state={state}>
      <Icon name={state === 'copied' ? 'check' : 'copy'} />
      <span aria-live="polite">{label}</span>
    </button>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" data-ground="night" aria-labelledby="contact-h">
      <div className="page contact__inner">
        <div className="contact__copy">
          <h2 className="contact__heading" id="contact-h">
            {contact.heading}
          </h2>
          <p className="contact__body">{contact.body}</p>
        </div>
        <div className="contact__card panel">
          <p className="label contact__card-label">Email</p>
          <a className="contact__address" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <CopyEmail email={person.email} />
        </div>
        <ul className="contact__links">
          {person.links.map((l) => (
            <li key={l.label}>
              <a className="btn btn--night-line" href={l.href} rel="noopener">
                {l.label} <Icon name="external" />
              </a>
            </li>
          ))}
          <li>
            <a className="btn btn--night-line" href={person.cv.href} download>
              Download CV <span className="contact__size">{person.cv.size}</span> <Icon name="download" />
            </a>
          </li>
        </ul>
      </div>
      <footer className="page footer">
        <p>
          © {new Date().getFullYear()} Iliya Dinev. Sofia, Bulgaria.
        </p>
        <p>Built with React and hosted on GitHub Pages.</p>
      </footer>
    </section>
  );
}
