import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Shell } from './App.jsx';
import { initSmoothScroll } from './lib/smooth-scroll.js';
import './styles/base.css';

// Pages are prerendered at build time (scripts/prerender.mjs); hydrate when markup exists.
export function boot(element) {
  const root = document.getElementById('root');
  const tree = (
    <StrictMode>
      <Shell>{element}</Shell>
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, tree);
  else createRoot(root).render(tree);
  initSmoothScroll();
}
