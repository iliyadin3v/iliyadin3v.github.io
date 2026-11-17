import { Picture, ratio } from './Picture.jsx';
import { Icon } from './Icon.jsx';
import { OrderScene } from './OrderScene.jsx';
import './Work.css';

function Meta({ p }) {
  return (
    <dl className="wk-meta">
      <div>
        <dt className="label">Role</dt>
        <dd>{p.role}</dd>
      </div>
      <div>
        <dt className="label">Status</dt>
        <dd>
          <span className="status" data-live={p.live || undefined}>
            <span className="status__mark" aria-hidden="true" />
            {p.status}
          </span>
        </dd>
      </div>
      <div>
        <dt className="label">{p.yearLabel || 'Year'}</dt>
        <dd>{p.years}</dd>
      </div>
    </dl>
  );
}

function ProjectLink({ p }) {
  return (
    <a className="link-arrow wk-link" href={p.link.href} {...(p.link.external ? { rel: 'noopener' } : {})}>
      {p.link.label}
      {p.link.external ? <span className="visually-hidden"> ({p.name}, opens Behance)</span> : null}
      <Icon name={p.link.external ? 'external' : 'arrow-right'} />
    </a>
  );
}

// Plater: the feature. Shipped screen large, before beside it, then the order scene.
function Feature({ p, scene }) {
  return (
    <article className="wk-feature" id={`work-${p.id}`} aria-labelledby={`t-${p.id}`}>
      <div className="wk-feature__head">
        <h3 className="wk-name" id={`t-${p.id}`}>
          <a href={p.link.href}>{p.name}</a>
        </h3>
        <p className="wk-summary">{p.summary}</p>
      </div>
      <div className="wk-feature__media">
        <figure className="wk-shot wk-shot--main">
          <a className="wk-frame" href={p.link.href} tabIndex={-1} aria-hidden="true" style={{ aspectRatio: ratio(p.image), viewTransitionName: p.viewTransition }}>
            <Picture name={p.image} alt="" sizes="(min-width: 1100px) 62vw, 94vw" />
          </a>
          <span className="visually-hidden">{p.alt}</span>
          <figcaption className="label">{p.imageLabel}</figcaption>
        </figure>
        <figure className="wk-shot wk-shot--side">
          <div className="wk-frame" style={{ aspectRatio: ratio(p.drawing.image) }}>
            <Picture name={p.drawing.image} alt={p.drawing.alt} sizes="(min-width: 1100px) 28vw, 94vw" />
          </div>
          <figcaption className="label">{p.drawing.label}</figcaption>
        </figure>
      </div>
      <div className="wk-feature__info">
        <Meta p={p} />
        <p className="wk-challenge">
          <strong>The challenge.</strong> {p.challenge}
        </p>
        <p className="wk-decision">
          <strong>Design decision.</strong> {p.decision}
        </p>
        <ProjectLink p={p} />
      </div>
      <OrderScene scene={scene} />
    </article>
  );
}

// Vault and Aura: each shows its working drawing and the finished screens.
function Project({ p }) {
  return (
    <article className={`wk-card wk-card--${p.id}`} id={`work-${p.id}`} aria-labelledby={`t-${p.id}`}>
      <div className="wk-card__media">
        <a className="wk-frame" href={p.link.href} tabIndex={-1} aria-hidden="true" {...(p.link.external ? { rel: 'noopener' } : {})} style={{ aspectRatio: ratio(p.image), viewTransitionName: p.viewTransition }}>
          <Picture name={p.image} alt="" sizes="(min-width: 960px) 46vw, 94vw" />
        </a>
        <span className="visually-hidden">{p.alt}</span>
        <div className="wk-card__drawing">
          <div className="wk-frame" style={{ aspectRatio: ratio(p.drawing.image) }}>
            <Picture name={p.drawing.image} alt={p.drawing.alt} sizes="(min-width: 960px) 20vw, 50vw" />
          </div>
          <span className="label">{p.drawing.label}</span>
        </div>
      </div>
      <h3 className="wk-name wk-name--small" id={`t-${p.id}`}>
        <a href={p.link.href} {...(p.link.external ? { rel: 'noopener' } : {})}>
          {p.name}
        </a>
      </h3>
      <p className="wk-summary">{p.summary}</p>
      <Meta p={p} />
      <p className="wk-challenge">
        <strong>The challenge.</strong> {p.challenge}
      </p>
      <p className="wk-decision">
        <strong>Design decision.</strong> {p.decision}
      </p>
      <ProjectLink p={p} />
    </article>
  );
}

export function Work({ projects, archive, scene }) {
  const [feature, ...rest] = projects;
  return (
    <section className="work" id="work" data-ground="night" aria-labelledby="work-h">
      <div className="page">
        <header className="work__head">
          <h2 className="t-h2" id="work-h">
            Selected work
          </h2>
          <p className="work__sub">One live product and two self-initiated concepts.</p>
        </header>
        <Feature p={feature} scene={scene} />
        <div className="work__pair">
          {rest.map((p) => (
            <Project key={p.id} p={p} />
          ))}
        </div>

        <section className="more" id="more" aria-labelledby="more-h">
          <h3 className="more__title t-h3" id="more-h">
            More work
          </h3>
          <div className="more__list">
            <p className="more__row more__row--head label" aria-hidden="true">
              <span>Project</span>
              <span>Type and status</span>
              <span>Published</span>
              <span />
            </p>
            <ul>
              {archive.map((it) => {
                const cells = (
                  <>
                    <span className="more__name">{it.name}</span>
                    <span className="more__type">
                      {it.type}
                      {', '}
                      {it.status ? <span>{it.status.toLowerCase()}</span> : <span className="more__todo">status to confirm</span>}
                    </span>
                    <span className="more__year t-mono">
                      {it.year ? (
                        <>
                          <span className="visually-hidden">Published </span>
                          {it.year}
                        </>
                      ) : (
                        '—'
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={it.name}>
                    {it.href ? (
                      <a className="more__row" href={it.href} rel="noopener">
                        {cells}
                        <span className="more__go">
                          <span className="visually-hidden">on Behance</span>
                          <Icon name="external" />
                        </span>
                      </a>
                    ) : (
                      <div className="more__row more__row--static">
                        {cells}
                        <span className="more__go t-small">No public write-up</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
