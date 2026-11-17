// In-page links glide to their target, clear the sticky header, and move focus there.
// Wheel, trackpad and touch scrolling are left to the browser: native scrolling runs off the main
// thread, so the 3D scenes can never make it stutter. Only a link click animates the scroll, and any
// wheel, touch or key input takes over from the glide at once. Reduced motion jumps straight there.
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const DURATION = 1600;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const headerOffset = () => (document.querySelector('.site-header')?.offsetHeight || 0) + 16;

  let raf = 0;
  const cancel = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
    window.addEventListener(type, cancel, { passive: true });
  }

  const glide = (toY, done) => {
    cancel();
    const fromY = window.scrollY;
    const distance = toY - fromY;
    if (Math.abs(distance) < 2) return done();
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      // 'instant' so the page's own smooth scroll-behaviour does not ease every step again
      window.scrollTo({ top: fromY + distance * easeInOutCubic(t), behavior: 'instant' });
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        raf = 0;
        done();
      }
    };
    raf = requestAnimationFrame(step);
  };

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
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = Math.min(max, Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset()));
    if (reduce.matches) {
      window.scrollTo({ top: y, behavior: 'instant' });
      settle();
    } else {
      glide(y, settle);
    }
    if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);
  });
}
