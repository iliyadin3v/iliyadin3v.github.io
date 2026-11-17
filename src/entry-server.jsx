import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Shell } from './App.jsx';
import { SiteProvider } from './i18n/index.jsx';
import { Home } from './pages/Home.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import { NotFound } from './pages/NotFound.jsx';
import * as en from './content/en.js';
import * as bg from './content/bg.js';

const CONTENT = { en, bg };
const PAGES = {
  home: { el: () => <Home />, path: '/' },
  plater: { el: () => <CaseStudy slug="plater" />, path: '/work/plater/' },
  vault: { el: () => <CaseStudy slug="vault" />, path: '/work/vault/' },
  aura: { el: () => <CaseStudy slug="aura" />, path: '/work/aura/' },
  404: { el: () => <NotFound />, path: '/' },
};

export function render(page, lang = 'en') {
  const p = PAGES[page];
  return renderToString(
    <StrictMode>
      <SiteProvider lang={lang} path={p.path} content={CONTENT[lang]}>
        <Shell>{p.el()}</Shell>
      </SiteProvider>
    </StrictMode>
  );
}
