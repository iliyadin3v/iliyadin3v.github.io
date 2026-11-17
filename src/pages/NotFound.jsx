import { Header } from '../components/Header.jsx';
import { Icon } from '../components/Icon.jsx';

// One 404 serves every address on GitHub Pages, so it speaks both languages.
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
        <p className="t-lede" lang="bg" style={{ marginTop: 'var(--s-3)', maxWidth: '44ch' }}>
          Тази страница я няма. Връзката може да е стара или в адреса има грешка.
        </p>
        <p style={{ marginTop: 'var(--s-6)', display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <a className="btn btn--ink" href="/">
            Back to the work <Icon name="arrow-right" />
          </a>
          <a className="btn btn--line" href="/bg/" lang="bg">
            Към проектите <Icon name="arrow-right" />
          </a>
        </p>
      </main>
    </>
  );
}
