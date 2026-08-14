import type { BackgroundVideoAsset } from '@/types/media';
import type { NavLink } from '@/types/navigation';

/**
 * Hero section content and media.
 *
 * Copy is transcribed verbatim from the reference. Keeping it out of the JSX
 * means the headline can be swapped (or later fed from a CMS) without touching
 * the animation or layout code that renders it.
 */
export const heroContent = {
  /** Rendered as the page's single `<h1>`. */
  headline: 'Empowering Businesses Through Innovative Technology Solutions',
  subheadline:
    'Premium IT solutions from Singapore to the rest of the world. We specialize in turning complex ideas into scalable digital realities.',
  cta: { label: 'Start Your Project', href: '/contact' } satisfies NavLink,
  scrollCue: {
    label: 'Scroll',
    /** Anchor target for the cue; the next section owns this id. */
    targetId: 'about',
    /** Announced to assistive tech in place of the decorative label. */
    accessibleLabel: 'Scroll to content',
  },
} as const;

/**
 * Full-bleed background clip behind the hero.
 *
 * The poster is the frame the browser paints for Largest Contentful Paint, so it
 * is preloaded at high priority while the (much heavier) clip streams in behind
 * it — see `HeroVideoBackdrop` for the deferred-mount strategy.
 */
export const heroBackgroundVideo: BackgroundVideoAsset = {
  src: '/assets/img/video/development.mp4',
  type: 'video/mp4',
  poster: {
    src: '/assets/img/bg/hero_bg.png',
    alt: '',
    width: 1920,
    height: 938,
  },
} as const;
