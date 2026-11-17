import { createContext, useContext } from 'react';
import { ui } from './ui.js';

// The page's language, its content and its interface strings, provided once at the root.
// English lives at /, Bulgarian at /bg/ with the same paths below it.
const SiteContext = createContext({ lang: 'en', path: '/', content: {}, t: ui.en });

export function SiteProvider({ lang = 'en', path = '/', content, children }) {
  return <SiteContext.Provider value={{ lang, path, content, t: ui[lang] }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

// An English site path in the given language: '/work/plater/' → '/bg/work/plater/', '/#work' → '/bg/#work'
export function localPath(path, lang) {
  if (lang !== 'bg') return path;
  if (path === '/') return '/bg/';
  if (path.startsWith('/#')) return '/bg/' + path.slice(1);
  return '/bg' + path;
}
