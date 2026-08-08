'use client';

import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { DURATION, REVEAL_EASE, heroRevealTransform } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Tags this component can render as.
 *
 * A lookup map rather than a dynamic `motion[tag]` index so the rendered element
 * stays fully typed and the bundler can see exactly which motion components are
 * reachable.
 */
const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  div: motion.div,
} as const;

export interface RevealProps {
  /** Element to render. Defaults to `div`. */
  readonly as?: keyof typeof MOTION_TAGS;
  /** Entrance delay in seconds, producing the staggered cascade. */
  readonly delay?: number;
  readonly className?: string;
  readonly children: React.ReactNode;
  /** DOM id, so a section can label itself with the revealed heading. */
  readonly id?: string;
}

/**
 * Plays the reference's signature entrance: content flies up and forward out of
 * depth while fading in.
 *
 * The original composes four transforms at once — `rotateX`, a 3D translate, and
 * a `scaleZ` — which Framer Motion cannot drive as independent props, since
 * `scaleZ` has no first-class equivalent. Instead a single eased `1 → 0`
 * progress value is animated and every axis is derived from it, so the whole
 * pose interpolates in lockstep on exactly the original curve. Only `transform`
 * and `opacity` change, so the whole move stays on the compositor.
 *
 * When the visitor has asked for reduced motion, the content is placed directly
 * in its final pose with no animation.
 *
 * @param props - See {@link RevealProps}.
 */
export function Reveal({ as = 'div', delay = 0, className, children, id }: RevealProps) {
  const MotionTag = MOTION_TAGS[as];
  const prefersReducedMotion = usePrefersReducedMotion();
  const Tag = as;

  // 1 = start pose, 0 = revealed. Starting at 1 means the element is hidden on
  // first paint without a flash of un-animated content.
  const progress = useMotionValue(1);
  const transform = useTransform(progress, heroRevealTransform);
  const opacity = useTransform(progress, [1, 0], [0, 1]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const controls = animate(progress, 0, {
      duration: DURATION.reveal,
      ease: REVEAL_EASE,
      delay,
    });

    return () => controls.stop();
  }, [progress, delay, prefersReducedMotion]);

  /**
   * Under reduced motion, render a plain element with no motion values at all.
   *
   * Previously this branch called `progress.set(0)` from an effect, which left
   * the outcome dependent on effect ordering — `usePrefersReducedMotion` starts
   * `false`, so the animation had already been queued and the corrective `set`
   * raced it. In practice the element stayed stuck at the *start* pose:
   * `opacity: 0`, fully translated off-position. Content was invisible for
   * exactly the users who asked for less motion, and axe caught it as a missing
   * level-one heading.
   *
   * Returning early removes the race instead of patching it: there is no
   * animation to correct, and no styles to settle.
   */
  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      style={{ transform, opacity }}
      className={cn(
        className,
        /**
         * CSS backstop, and the one that actually guarantees the outcome.
         *
         * The JS branch above depends on `usePrefersReducedMotion` having
         * resolved, which in turn depends on hydration. If anything delays or
         * breaks that, the element stays frozen at the start pose — invisible —
         * for precisely the users who asked for less motion.
         *
         * These two utilities are marked `!important`, which beats the inline
         * styles Framer Motion writes, so the final pose is enforced by the
         * stylesheet whether or not a single line of JavaScript runs.
         */
        'motion-reduce:!transform-none motion-reduce:!opacity-100',
      )}
    >
      {children}
    </MotionTag>
  );
}
