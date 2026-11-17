import { Header } from '../components/Header.jsx';
import { Contact } from '../components/Sections.jsx';
import { Picture, ratio } from '../components/Picture.jsx';
import manifest from '../content/images.json';

const ratioNum = (name) => (manifest[name] ? manifest[name].width / manifest[name].height : 1);
import { Icon } from '../components/Icon.jsx';
import { CompareStates } from '../components/CompareStates.jsx';
import { DecisionLens } from '../components/DecisionLens.jsx';
import { OrderDemo } from '../components/OrderDemo.jsx';
import { useActiveSection } from '../lib/hooks.js';
import './CaseStudy.css';

// Reusable case-study layout. Content comes from a data file (see src/content/plater.js);
// each section's `type` picks its renderer.

function Paras({ items, className = '' }) {
  return items.map((p) => (
    <p key={p} className={className}>
      {p}
    </p>
  ));
}

function TextMedia({ s }) {
  return (
    <>
      <div className="cs-cols">
        <div className="cs-prose">
          <Paras items={s.body} />
        </div>
      </div>
      <div className="cs-media-pair" data-count={s.media.length}>
        {s.media.map((md) =>
          s.media.length === 1 ? (
            <figure key={md.image} className="cs-figure" data-tall={ratioNum(md.image) < 1.4 || undefined}>
              <div className="cs-scroll" tabIndex={0} role="region" aria-label={`${md.caption} Scrolls sideways on small screens.`}>
                <div className="cs-shot" style={{ aspectRatio: ratio(md.image) }}>
                  <Picture name={md.image} alt={md.alt} sizes="(min-width: 1200px) 78vw, (min-width: 641px) 94vw, 960px" />
                </div>
              </div>
              <p className="cs-scroll__hint" aria-hidden="true">
                Scroll sideways to see all of it <Icon name="arrow-right" size={14} />
              </p>
              <figcaption>{md.caption}</figcaption>
            </figure>
          ) : (
            <figure key={md.image}>
              <div className="cs-shot" style={{ aspectRatio: ratio(md.image) }}>
                <Picture name={md.image} alt={md.alt} sizes="(min-width: 1200px) 34vw, 94vw" />
              </div>
              <figcaption>{md.caption}</figcaption>
            </figure>
          )
        )}
      </div>
    </>
  );
}

function Problem({ s }) {
  const block = (b) => (
    <div className="cs-col-block">
      <h3 className="cs-h4">{b.heading}</h3>
      {b.body ? <p>{b.body}</p> : null}
      {b.items ? (
        <ul className="cs-ticks">
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
  return (
    <>
      <div className="cs-prose cs-prose--lede">
        <Paras items={s.body} />
      </div>
      <div className="cs-three">
        {block(s.users)}
        {block(s.goals)}
        {block(s.constraints)}
      </div>
    </>
  );
}

function Findings({ s }) {
  return (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <ol className="findings">
        {s.findings.map((f) => (
          <li key={f.n} className="finding" id={`finding-${f.n}`}>
            <span className="finding__n" aria-hidden="true">
              {f.n}
            </span>
            <div className="finding__main">
              <h3 className="finding__title">
                <span className="visually-hidden">Finding {f.n}: </span>
                {f.title}
              </h3>
              <dl className="finding__dl">
                <div>
                  <dt>Observed</dt>
                  <dd>{f.observed}</dd>
                </div>
                <div>
                  <dt>Cost</dt>
                  <dd>{f.cost}</dd>
                </div>
                <div className="finding__fix">
                  <dt>Fix</dt>
                  <dd>{f.fix}</dd>
                </div>
              </dl>
              <p className="finding__principle label">Heuristic: {f.principle}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Gallery({ s }) {
  return (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <div className="gallery">
        {s.items.map((it, i) => (
          <figure key={it.image} className={`gallery__item gallery__item--${i % 2 ? 'b' : 'a'}`}>
            <div className="cs-shot" style={{ aspectRatio: ratio(it.image) }}>
              <Picture name={it.image} alt={it.alt} sizes="(min-width: 1200px) 58vw, 94vw" />
            </div>
            <figcaption>
              <h3 className="cs-h4">{it.title}</h3>
              <p>{it.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      {s.demo ? <OrderDemo /> : null}
    </>
  );
}

function Outcomes({ s }) {
  return (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <div className="outcomes">
        <table className="outcomes__table">
          <caption className="visually-hidden">Audit findings and what shipped on plater.bg</caption>
          <thead>
            <tr>
              <th scope="col">Finding</th>
              <th scope="col">Area</th>
              <th scope="col">Status</th>
              <th scope="col">On the live site</th>
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r) => (
              <tr key={r.n}>
                <td className="t-mono">
                  <a href={`#finding-${r.n}`}>{r.n}</a>
                </td>
                <th scope="row">{r.area}</th>
                <td>
                  <span className="outcome-status" data-kind={r.status.startsWith('Shipped,') ? 'changed' : r.status === 'Removed' ? 'removed' : 'shipped'}>
                    <span className="outcome-status__mark" aria-hidden="true" />
                    {r.status}
                  </span>
                </td>
                <td>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="outcomes__foot">
        <a className="link-arrow" href={s.evidence.href} rel="noopener">
          {s.evidence.label} <Icon name="external" />
        </a>
        {s.metrics ? (
          <p className={s.metrics.placeholder ? 'placeholder outcomes__metrics' : 'outcomes__metrics'}>
            <span>{s.metrics.text}</span>
          </p>
        ) : null}
      </div>
    </>
  );
}

function Learning({ s }) {
  return (
    <div className="learning">
      <div className="learning__limits">
        <h3 className="cs-h4">Limits</h3>
        <ul className="cs-ticks">
          {s.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div className="learning__lessons">
        <h3 className="cs-h4">Lessons</h3>
        <dl className="lessons">
          {s.lessons.map((l) => (
            <div key={l.title}>
              <dt>{l.title}</dt>
              <dd>{l.body}</dd>
            </div>
          ))}
        </dl>
      </div>
      {s.next ? (
        <div className={`learning__next ${s.next.placeholder ? 'placeholder' : ''}`}>
          <h3 className="cs-h4">{s.next.heading}</h3>
          <ul className="cs-ticks">
            {s.next.items.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

// A problem, its answer and where the answer lives in the app, one row each.
function Pairs({ s }) {
  return (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <div className="outcomes">
        <table className="outcomes__table pairs__table">
          <caption className="visually-hidden">{s.caption}</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Number</span>
              </th>
              {s.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r) => (
              <tr key={r.n}>
                <td className="t-mono pairs__n">{r.n}</td>
                <th scope="row">{r.problem}</th>
                <td data-label={s.columns[1]}>{r.answer}</td>
                <td className="pairs__where" data-label={s.columns[2]}>
                  {r.where}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// A wide image (a flow, a row of phones) with its prose above and optional notes or a callout below.
function FigureSection({ s }) {
  return (
    <>
      {s.body ? (
        <div className="cs-prose cs-figure__prose">
          <Paras items={s.body} />
        </div>
      ) : null}
      <figure className="cs-figure">
        <div className="cs-scroll" tabIndex={0} role="region" aria-label={`${s.figCaption || s.heading} Scrolls sideways on small screens.`}>
          <div className="cs-shot cs-shot--night" style={{ aspectRatio: ratio(s.image) }}>
            <Picture name={s.image} alt={s.alt} sizes="(min-width: 1520px) 1160px, (min-width: 1200px) 78vw, (min-width: 641px) 94vw, 960px" />
          </div>
        </div>
        <p className="cs-scroll__hint" aria-hidden="true">
          Scroll sideways to see all of it <Icon name="arrow-right" size={14} />
        </p>
        {s.figCaption ? <figcaption>{s.figCaption}</figcaption> : null}
      </figure>
      {s.notes ? (
        <dl className="cs-notes">
          {s.notes.map((n) => (
            <div key={n.title}>
              <dt>{n.title}</dt>
              <dd>{n.body}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {s.callout ? (
        <aside className="cs-callout" aria-label={s.callout.heading}>
          <h3 className="cs-h4">{s.callout.heading}</h3>
          <p>{s.callout.body}</p>
        </aside>
      ) : null}
    </>
  );
}

// A row of single phone screens, each with a short title and note.
function Screens({ s }) {
  return (
    <>
      {s.intro ? <p className="cs-prose cs-intro">{s.intro}</p> : null}
      <ul className="cs-screens" data-count={s.items.length} tabIndex={0} aria-label={`${s.heading}: ${s.items.length} screens. Scrolls sideways on small screens.`}>
        {s.items.map((it) => (
          <li key={it.image}>
            <figure>
              <div className="cs-phone" style={{ aspectRatio: ratio(s.items[0].image) }}>
                <Picture name={it.image} alt={it.alt} sizes="(min-width: 1200px) 18vw, (min-width: 641px) 30vw, 72vw" />
              </div>
              <figcaption>
                <span className="cs-screens__title">{it.title}</span> {it.body}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}

// The project's own identity: type specimen, palette, values and the mark in use.
function System({ s }) {
  return (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <div className={`cs-system${ratioNum(s.specimen.image) > 3 ? ' cs-system--wide' : ''}`}>
        <figure className="cs-system__type">
          <div className="cs-shot" style={{ aspectRatio: ratio(s.specimen.image) }}>
            <Picture name={s.specimen.image} alt={s.specimen.alt} sizes="(min-width: 1200px) 50vw, 94vw" />
          </div>
          <figcaption>
            <span className="cs-screens__title">{s.typeface.name}.</span> {s.typeface.note}
          </figcaption>
        </figure>
        <div className="cs-system__side">
          <div className="cs-system__group">
            <h3 className="cs-h4">Colour</h3>
            <ul className="cs-swatches">
              {s.colors.map((c) => (
                <li key={c.hex}>
                  <span className="cs-swatches__chip" style={{ background: c.hex }} aria-hidden="true" />
                  <span className="cs-swatches__hex">{c.hex}</span>
                  {c.name ? <span className="cs-swatches__name">{c.name}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          {s.values ? (
            <div className="cs-system__group">
              <h3 className="cs-h4">{s.values.heading}</h3>
              <ul className="cs-values">
                {s.values.items.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      {s.media ? (
        <div className="cs-media-pair cs-media-pair--even">
          {s.media.map((md) => (
            <figure key={md.image}>
              <div className={`cs-shot${md.fit === 'contain' ? ' cs-shot--contain' : ''}`} style={{ aspectRatio: '4 / 3' }}>
                <Picture name={md.image} alt={md.alt} sizes="(min-width: 1200px) 34vw, 94vw" />
              </div>
              <figcaption>{md.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </>
  );
}

const RENDER = {
  pairs: Pairs,
  figure: FigureSection,
  screens: Screens,
  system: System,
  'text-media': TextMedia,
  problem: Problem,
  findings: Findings,
  compare: ({ s }) => (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <CompareStates section={s} />
    </>
  ),
  lens: ({ s }) => (
    <>
      <p className="cs-prose cs-intro">{s.intro}</p>
      <DecisionLens section={s} />
    </>
  ),
  gallery: Gallery,
  outcomes: Outcomes,
  learning: Learning,
};

export function CaseStudy({ study }) {
  const ids = study.sections.map((s) => s.id);
  const active = useActiveSection(ids, { rootMargin: '-30% 0px -60% 0px' });
  const activeIndex = active ? ids.indexOf(active) : -1;

  return (
    <>
      <Header page="case" />
      <main id="main" className="cs">
        <header className="cs-hero" data-ground="night">
          <div className="page">
            <a className="cs-back link-arrow" href="/#work">
              <Icon name="arrow-left" /> All work
            </a>
            <div className="cs-hero__grid">
              <h1 className="cs-title">{study.title}</h1>
              <p className="cs-lede">{study.lede}</p>
            </div>
            <dl className="cs-meta">
              {study.meta.map((d) => (
                <div key={d.term}>
                  <dt>{d.term}</dt>
                  <dd>
                    {d.term === 'Status' ? (
                      <span className="status" data-live={d.live === false ? undefined : true}>
                        <span className="status__mark" aria-hidden="true" />
                        {d.detail}
                        {d.href ? (
                          <>
                            {', '}
                            <a href={d.href} rel="noopener">
                              {d.linkLabel}
                            </a>
                          </>
                        ) : null}
                      </span>
                    ) : (
                      d.detail
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="page cs-hero__figure">
            <div className="cs-hero__shot" style={{ aspectRatio: ratio(study.hero.image), viewTransitionName: study.hero.viewTransition }}>
              <Picture name={study.hero.image} alt={study.hero.alt} sizes="(min-width: 1520px) 1408px, 94vw" priority />
            </div>
            <figcaption className="t-small t-muted">{study.hero.caption}</figcaption>
          </figure>
        </header>

        <div data-ground="paper">
        <div className="page cs-body">
          <nav className="cs-toc" aria-label="On this page">
            <div className="cs-toc__box">
              <p className="label cs-toc__head">On this page</p>
              <ol>
                {study.sections.map((s, i) => {
                  const served = activeIndex > i;
                  return (
                    <li key={s.id} data-served={served || undefined}>
                      <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                        <span className="cs-toc__n t-mono" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="cs-toc__name">{s.nav}</span>
                        {served ? <span className="visually-hidden"> (read)</span> : null}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <div className="cs-sections">
            {study.sections.map((s) => {
              const R = RENDER[s.type];
              return (
                <section key={s.id} id={s.id} className={`cs-section cs-section--${s.type}`} aria-labelledby={`${s.id}-h`}>
                  <h2 className="t-h2 cs-section__h" id={`${s.id}-h`}>
                    {s.heading}
                  </h2>
                  {R ? <R s={s} /> : null}
                </section>
              );
            })}

            <a className="cs-next" href={study.next.href} {...(study.next.external ? { rel: 'noopener' } : {})}>
              <span className="cs-next__label">{study.next.label}</span>
              <span className="cs-next__detail">{study.next.detail}</span>
              <Icon name={study.next.external ? 'external' : 'arrow-right'} size={20} />
            </a>
          </div>
        </div>
        </div>
      </main>
      <Contact />
    </>
  );
}
