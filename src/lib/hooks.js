import { useEffect, useState } from 'react';

// Tracks which section is in view, for the active state in navigation.
export function useActiveSection(ids, { rootMargin = '-40% 0px -55% 0px' } = {}) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length || !('IntersectionObserver' in window)) return;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => seen.get(id));
        setActive(current ?? null);
      },
      { rootMargin }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join('|'), rootMargin]);
  return active;
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return scrolled;
}

// True after hydration; lets server markup and the first client render match.
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// Live Sofia time. Renders a placeholder until hydration so prerendered HTML matches.
export function useSofiaTime(withSeconds = false) {
  const mounted = useMounted();
  const [now, setNow] = useState(null);
  useEffect(() => {
    if (!mounted) return;
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Sofia',
      hour: '2-digit',
      minute: '2-digit',
      ...(withSeconds ? { second: '2-digit' } : {}),
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, withSeconds ? 1000 : 15000);
    return () => clearInterval(id);
  }, [mounted, withSeconds]);
  return now ?? (withSeconds ? '--:--:--' : '--:--');
}
