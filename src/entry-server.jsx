import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Shell } from './App.jsx';
import { Home } from './pages/Home.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { plater } from './content/plater.js';
import { vault } from './content/vault.js';
import { aura } from './content/aura.js';

const PAGES = {
  home: () => <Home />,
  plater: () => <CaseStudy study={plater} />,
  vault: () => <CaseStudy study={vault} />,
  aura: () => <CaseStudy study={aura} />,
  404: () => <NotFound />,
};

export function render(page) {
  return renderToString(
    <StrictMode>
      <Shell>{PAGES[page]()}</Shell>
    </StrictMode>
  );
}
