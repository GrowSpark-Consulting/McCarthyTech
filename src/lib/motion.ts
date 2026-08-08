import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion tokens.
 *
 * The easing curves and durations here are lifted from the reference
 * stylesheet's transitions and keyframes, so ported components move on exactly
 * the same timing as the original rather than on Framer's defaults.
 */

/** `.scale-animation` — the hero's staggered entrance curve. */
export const REVEAL_EASE = [0.55, 0.085, 0, 0.99] as const;

/** Mobile drawer and backdrop. */
export const DRAWER_EASE = [0.165, 0.84, 0.44, 1] as const;

/** Sticky header slide-in. */
export const STICKY_EASE = [0.23, 0.76, 0.53, 0.99] as const;

/** Durations in seconds, matching the reference's CSS transition times. */
export const DURATION = {
  reveal: 1,
  drawer: 0.4,
  sticky: 0.6,
  hover: 0.3,
} as const;

/**
 * The hero reveal's start pose, transcribed from `.scale-animation`:
 * `rotateX(20deg) translate3d(85px, 304px, 418px) scaleZ(1.83)`.
 *
 * These are held as plain numbers rather than a transform string so a single
 * eased 1→0 progress value can interpolate every axis in lockstep — the only way
 * to reproduce the original's combined 3D move, since `scaleZ` has no
 * first-class Framer Motion prop.
 */
export const HERO_REVEAL_POSE = {
  rotateXDeg: 20,
  translateXPx: 85,
  translateYPx: 304,
  translateZPx: 418,
  scaleZ: 1.83,
} as const;

/**
 * Builds the hero reveal transform for a given progress value.
 *
 * @param progress - `1` at the start pose, `0` when fully revealed.
 * @returns A CSS `transform` string.
 */
export function heroRevealTransform(progress: number): string {
  const { rotateXDeg, translateXPx, translateYPx, translateZPx, scaleZ } = HERO_REVEAL_POSE;
  const rotate = rotateXDeg * progress;
  const x = translateXPx * progress;
  const y = translateYPx * progress;
  const z = translateZPx * progress;
  const depth = 1 + (scaleZ - 1) * progress;

  return `rotateX(${rotate}deg) translate3d(${x}px, ${y}px, ${z}px) scaleZ(${depth})`;
}

/**
 * Per-element entrance delays inside the hero, in seconds.
 *
 * The reference applies these as `transition-delay` on the sub-title and button,
 * producing the headline → copy → CTA cascade.
 */
export const HERO_REVEAL_DELAY = {
  headline: 0,
  subheadline: 0.2,
  cta: 0.4,
} as const;

/**
 * Per-element entrance delays inside a service detail hero, in seconds.
 *
 * The same cascade as {@link HERO_REVEAL_DELAY}, extended by two: the detail
 * heroes open with a breadcrumb and eyebrow above the headline, and close with a
 * row of figures beneath the buttons. Held as their own token rather than added
 * to the homepage's map, because that one is transcribed from the reference's
 * `transition-delay` values and should not grow entries the reference has no
 * counterpart for.
 *
 * The 0.12s step is tighter than the homepage's 0.2s on purpose. Six elements at
 * the original spacing would take a full second to finish arriving, which reads
 * as sluggish on a page a visitor has navigated to deliberately rather than
 * landed on.
 */
export const SERVICE_HERO_REVEAL_DELAY = {
  eyebrow: 0,
  headline: 0.12,
  lead: 0.24,
  cta: 0.36,
  highlights: 0.48,
} as const;

/** Slide-in transition for the mobile drawer panel and its backdrop. */
export const drawerTransition: Transition = {
  duration: DURATION.drawer,
  ease: DRAWER_EASE,
};

/** Backdrop fade paired with the drawer slide. */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Drawer panel travel — off-canvas left to flush with the viewport edge. */
export const drawerVariants: Variants = {
  hidden: { x: '-100%' },
  visible: { x: '0%' },
};

/**
 * Desktop dropdown reveal.
 *
 * The reference animates opacity alongside a 10px vertical settle
 * (`top: calc(100% + 20px)` → `calc(100% + 10px)`); expressing the travel as `y`
 * keeps it on the compositor instead of animating a layout property.
 */
export const megaMenuVariants: Variants = {
  hidden: { opacity: 0, y: 10, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
};

/** Shared 0.3s hover timing used across buttons and menu items. */
export const hoverTransition: Transition = {
  duration: DURATION.hover,
  ease: 'easeOut',
};
