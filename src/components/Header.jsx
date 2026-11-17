import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { useActiveSection, useScrolled, useSofiaTime } from '../lib/hooks.js';
import { Icon } from './Icon.jsx';
import { useSite, localPath } from '../i18n/index.jsx';
import './Header.css';

const useIsoLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const NAV = ['work', 'about', 'contact'];

// Which ground (night pass or paper) sits under the header right now.
function useGroundUnderHeader(initial) {
  const [ground, setGround] = useState(initial);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    // A one-pixel line just under the header: the browser reports which grounds cross it, so
    // nothing is measured on the main thread while the page scrolls.
    const sections = [...document.querySelectorAll('[data-ground]')].filter((s) => !s.closest('.site-header'));
    const crossing = new Map();
    let io = null;
    const observe = () => {
      io?.disconnect();
      const top = document.querySelector('.site-header')?.offsetHeight || 60;
      const bottom = Math.max(0, window.innerHeight - top - 1);
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => crossing.set(e.target, e.isIntersecting));
          // the first in document order is the outermost section on the line, as before
          const hit = sections.find((s) => crossing.get(s));
          if (hit) setGround(hit.getAttribute('data-ground'));
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px` }
      );
      sections.forEach((s) => io.observe(s));
    };
    observe();
    window.addEventListener('resize', observe);
    return () => {
      io?.disconnect();
      window.removeEventListener('resize', observe);
    };
  }, []);
  return ground;
}

// One language button, styled like the CV button: a globe and the language it switches to (BG on
// English pages, EN on Bulgarian ones). It opens the same page in that language, at the top.
// Lock the page under the phone menu. Only the root element is locked: locking body as well makes
// body the sticky header's scroll container and sends the header (and its Close button) back to the
// top of the page. Smooth scrolling pauses too, so the wheel cannot move the page behind the menu.
function lockScroll(on) {
  document.documentElement.classList.toggle('menu-open', on);
  window.dispatchEvent(new CustomEvent('site:scroll-lock', { detail: on }));
}

function LangButton() {
  const { lang, path, t } = useSite();
  const to = lang === 'bg' ? 'en' : 'bg';
  return (
    <a className="nav__link nav__cv lang-btn" href={localPath(path, to)} hrefLang={to} lang={to} aria-label={t.langName[to]}>
      <Icon name="globe" size={14} />
      {to.toUpperCase()}
    </a>
  );
}

export function Header({ page = 'home' }) {
  const { lang, t, content } = useSite();
  const { person } = content;
  const scrolled = useScrolled();
  const ground = useGroundUnderHeader('night');
  const time = useSofiaTime();
  const sectionActive = useActiveSection(page === 'home' ? NAV : ['contact']);
  const active = page === 'home' ? sectionActive : sectionActive === 'contact' ? 'contact' : 'work';
  const listRef = useRef(null);
  const [bar, setBar] = useState(null);

  // Measure the active link so the pencil bar can slide between links.
  useIsoLayout(() => {
    const measure = () => {
      const list = listRef.current;
      const el = list?.querySelector(`[data-nav="${active}"]`);
      if (!list || !el) return setBar(null);
      const a = list.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setBar({ x: b.left - a.left, w: b.width });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const href = (id) => (page === 'home' ? `#${id}` : localPath(`/#${id}`, lang));

  // Phones: the links live in a full-screen menu opened from the header. It closes on a link,
  // on Escape and when the screen grows past the phone layout; the page underneath does not scroll.
  const [open, setOpen] = useState(false);
  // A menu link unlocks the page before the smooth-scroll click handler starts its glide.
  const closeMenu = () => {
    lockScroll(false);
    setOpen(false);
  };
  const menuBtnRef = useRef(null);
  const sheetRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    sheetRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const wide = window.matchMedia('(min-width: 641px)');
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
      lockScroll(false);
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined} data-under={ground}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className="page site-header__row">
        <a className="wordmark" href={localPath('/', lang)} aria-label={t.home}>
          <span className="wordmark__name">Iliya Dinev</span>
        </a>
        <p className="nav-clock">
          {t.clock} <time className="t-mono">{time}</time>
        </p>
        <nav aria-label={t.navLabel}>
          <ul className="nav" ref={listRef}>
            {NAV.map((id) => (
              <li key={id}>
                <a
                  className="nav__link"
                  data-nav={id}
                  href={href(id)}
                  aria-current={active === id ? (page === 'home' ? 'location' : 'page') : undefined}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
            <li>
              <a className="nav__link nav__cv" href={person.cv.href} download aria-label={t.cvAria(person.cv.size)}>
                CV <Icon name="download" size={14} />
              </a>
            </li>
            {bar ? (
              <m.li
                aria-hidden="true"
                className="nav__bar"
                initial={false}
                animate={{ x: bar.x, width: bar.w, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.8 }}
              />
            ) : null}
          </ul>
        </nav>
        <LangButton />
        <button
          ref={menuBtnRef}
          type="button"
          className="nav__link nav__cv menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-btn__icon" aria-hidden="true" data-open={open || undefined}>
            <i />
            <i />
          </span>
          {open ? t.close : t.menu}
        </button>
      </div>
      {open ? (
        <div className="menu-sheet" id="site-menu" ref={sheetRef} data-lenis-prevent>
          <nav aria-label={t.navLabel}>
            <ul className="menu-sheet__list">
              {NAV.map((id) => (
                <li key={id}>
                  <a
                    className="menu-sheet__link"
                    href={href(id)}
                    aria-current={active === id ? (page === 'home' ? 'location' : 'page') : undefined}
                    onClick={closeMenu}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn--night-line menu-sheet__cv" href={person.cv.href} download onClick={closeMenu}>
            {t.downloadCv} <span className="contact__size">{person.cv.size}</span> <Icon name="download" />
          </a>
        </div>
      ) : null}
    </header>
  );
}
