import { Header } from '../components/Header.jsx';
import { Icon } from '../components/Icon.jsx';

export function NotFound() {
  return (
    <>
      <Header page="case" />
      <main id="main" className="page" style={{ paddingBlock: 'var(--section)' }}>
        <h1 className="t-display" style={{ maxWidth: '12ch' }}>
          This page isn’t on the desk.
        </h1>
        <p className="t-lede" style={{ marginTop: 'var(--s-5)', maxWidth: '44ch' }}>
          The link may be old, or the address has a typo.
        </p>
        <p style={{ marginTop: 'var(--s-6)' }}>
          <a className="btn btn--ink" href="/">
            Back to the work <Icon name="arrow-right" />
          </a>
        </p>
      </main>
    </>
  );
}
