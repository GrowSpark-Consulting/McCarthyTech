'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * Entrance animations, ported from the Animate.css classes the reference drives
 * with WOW.js (`wow fadeInUp`, `wow zoomIn`).
 *
 * `fadeInUp` travels 100% of the element's own height, matching Animate.css's
 * `translate3d(0, 100%, 0)` — so a tall card rises further than a short one,
 * which is what gives the staggered column its sense of weight.
 */
const REVEAL_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: '0%' },
  },
  /**
   * `@keyframes fadeInLeft` — a flat **50px** of travel.
   *
   * Taken from this project's own `assets/css/animate.css`, which ships a
   * customised build: the stock Animate.css definition is
   * `translate3d(-100%, 0, 0)`, and a card that wide would start most of a
   * column off-screen. A fixed offset is also what keeps a staggered row
   * reading as one gesture, since every card travels the same distance
   * regardless of how wide it happens to be.
   */
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1 },
  },
} as const satisfies Record<string, Variants>;

/** Available entrance animations. */
export type ScrollRevealVariant = keyof typeof REVEAL_VARIANTS;

/** Reference default — `data-wow-duration="600ms"`. */
const DEFAULT_DURATION_S = 0.6;

/**
 * Fraction of the element that must be visible before it plays. A small
 * threshold means tall cards start animating as their top edge clears the fold,
 * rather than stalling until the whole card is on screen.
 */
const VISIBILITY_THRESHOLD = 0.15;

export interface ScrollRevealProps {
  readonly children: React.ReactNode;
  /** Which entrance to play. Defaults to `fadeInUp`. */
  readonly variant?: ScrollRevealVariant;
  /** Delay in seconds — the reference's `data-wow-delay`, converted. */
  readonly delay?: number;
  /** Duration in seconds. */
  readonly duration?: number;
  readonly className?: string;
}

/**
 * Plays an entrance animation the first time an element scrolls into view.
 *
 * Replaces WOW.js, which the reference loads purely to add a class when an
 * element becomes visible. `IntersectionObserver` does the same job natively —
 * no scroll listener, no layout thrash — and Framer Motion runs the animation
 * on the compositor.
 *
 * Fires once (`triggerOnce`), so content does not re-animate when scrolled past
 * a second time, and the observer detaches after firing.
 *
 * Under reduced motion the children render in their final state immediately,
 * with no wrapper animation at all.
 *
 * @param props - See {@link ScrollRevealProps}.
 */
export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = DEFAULT_DURATION_S,
  className,
}: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: VISIBILITY_THRESHOLD,
  });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={REVEAL_VARIANTS[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
