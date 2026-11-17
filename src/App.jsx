import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

// Shared shell for every page. MotionConfig honours prefers-reduced-motion:
// transforms are dropped and only opacity changes remain.
export function Shell({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
