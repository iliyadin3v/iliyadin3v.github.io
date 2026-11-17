import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Smooth, inertial wheel scrolling (Lenis). Touch keeps the device's native scrolling,
// and people who ask for reduced motion keep plain native scrolling too.
// In-page links glide to their target, clear the sticky header, and move focus there.
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function initSmoothScroll() {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis = null;

  const start = () => {
    if (lenis || reduce.matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.11, smoothWheel: true, syncTouch: false });
  };
  const stop = () => {
    lenis?.destroy();
    lenis = null;
  };
  start();
  reduce.addEventListener('change', () => (reduce.matches ? stop() : start()));

  const headerOffset = () => (document.querySelector('.site-header')?.offsetHeight || 0) + 16;

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
      // Lenis already honours the scroll-padding-top set in base.css for the sticky header.
      // A calm glide: eases in and out over 1.6s rather than jumping off at full speed.
      lenis.scrollTo(target, { duration: 1.6, easing: easeInOutCubic, onComplete: settle });
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({ top: y, behavior: reduce.matches ? 'auto' : 'smooth' });
      settle();
    }
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);
  });
}
