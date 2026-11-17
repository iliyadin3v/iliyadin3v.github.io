import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Smooth wheel scrolling (Lenis), tuned to stay light: it follows the wheel closely (lerp 0.14),
// leaves touch to the device, and is skipped entirely for anyone who asks for reduced motion.
// It can stay smooth because the page keeps its own per-frame work small: 3D scenes are composited,
// off-screen scenes are skipped (content-visibility), and the header reads its ground from an
// IntersectionObserver instead of measuring on scroll.
// In-page links glide to their target over 1.6s, clear the sticky header, and move focus there.
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const DURATION = 1.6;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const headerOffset = () => (document.querySelector('.site-header')?.offsetHeight || 0) + 16;
  let lenis = null;

  const start = () => {
    if (lenis || reduce.matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.14, smoothWheel: true, syncTouch: false, wheelMultiplier: 1 });
  };
  const stop = () => {
    lenis?.destroy();
    lenis = null;
  };
  start();
  // The phone menu locks the page while it is open; the wheel must not glide the page behind it.
  window.addEventListener('site:scroll-lock', (e) => (e.detail ? lenis?.stop() : lenis?.start()));
  reduce.addEventListener('change', () => (reduce.matches ? stop() : start()));

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a[href*="#"]');
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();

    const settle = () => {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    if (lenis) {
      // Lenis honours the scroll-padding-top set in base.css for the sticky header.
      lenis.scrollTo(target, { duration: DURATION, easing: easeInOutCubic, onComplete: settle });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({ top: y, behavior: 'instant' });
      settle();
    }
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);
  });
}
