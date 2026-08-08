import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * `tailwind-merge`, taught about this project's custom theme scales.
 *
 * This is not optional polish — without it `cn()` silently deletes classes.
 * `tailwind-merge` decides which group a `text-*` class belongs to by inspecting
 * its value: something that parses as a length is a font size, anything else is
 * a colour. Custom theme keys like `text-hero-xl` parse as neither, so they are
 * assumed to be colours and are dropped whenever a real colour (`text-white`)
 * appears later in the same `cn()` call — which is exactly how the hero headline
 * is written.
 *
 * Declaring the custom keys here restores correct grouping, so a size and a
 * colour coexist and only genuine same-property conflicts are resolved.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['hero-xl', 'hero-lg', 'hero-md', 'hero-sm', 'hero-xs', 'hero-sub', 'hero-sub-sm'],
        },
      ],
      'font-family': [{ font: ['body', 'heading'] }],
      tracking: [{ tracking: ['display', 'body', 'cue'] }],
      rounded: [{ rounded: ['glass', 'glass-sm', 'pill', 'cta'] }],
      shadow: [{ shadow: ['glass', 'sticky', 'submenu'] }],
      'bg-image': [
        {
          bg: [
            'hero-veil',
            'aurora',
            'glass-sheen',
            'service-stage',
            'panel-noise',
            'hairline',
            'sweep-underline',
            'feature-noise',
            'brand-noise',
            'glass-sheen-215',
            'project-stage',
            'industries-stage',
            'project-noise',
            'project-caption',
            'project-sheen',
            'served-card',
            'served-icon',
            'served-ring',
            'svc-card',
            'svc-sheen',
            'contact-stage',
            'contact-noise',
            'testimonial-stage',
            'footer-stage',
            'indus-rail',
            'indus-halo',
            'indus-charge',
          ],
        },
      ],
      'max-w': [{ 'max-w': ['shell', 'hero-content', 'hero-sub', 'hero-sub-lg'] }],
      pb: [{ pb: ['hero-gutter', 'hero-gutter-md', 'hero-gutter-sm'] }],
      z: [{ z: ['header', 'drawer', 'backdrop', 'preloader'] }],
      duration: [
        {
          duration: [
            'drawer',
            'sticky',
            'reveal',
            'menu',
            'glass',
            'underline',
            'panel',
            'panel-content',
            'pill',
            'card',
            'ring',
          ],
        },
      ],
      ease: [{ ease: ['house', 'reveal', 'sticky', 'drawer', 'cue', 'menu', 'underline'] }],
      delay: [{ delay: ['panel-head', 'panel-copy', 'panel-media'] }],
      'backdrop-blur': [{ 'backdrop-blur': ['glass'] }],
      'backdrop-saturate': [{ 'backdrop-saturate': ['glass'] }],
      animate: [
        {
          animate: [
            'hero-scroll',
            'marquee-x',
            'served-scroll',
            'served-scroll-sm',
            'served-spin',
            'stream-1',
            'stream-2',
            'stream-3',
            'stream-4',
            'stream-5',
            'live-pulse',
            'live-pulse-red',
            'gradient-pan',
            'indus-twinkle',
            'indus-logo-glow',
            'indus-logo-illum',
            'indus-line-flow',
            'xb-blink',
          ],
        },
      ],
    },
  },
});

/**
 * Merges conditional class names and resolves Tailwind conflicts.
 *
 * `clsx` flattens the conditional forms; the configured `twMerge` above then
 * guarantees that a class passed by a caller wins over the component's own
 * default for the same CSS property — so a caller's `rounded-full` replaces an
 * internal `rounded-cta` instead of both landing in the class list and the
 * outcome depending on stylesheet order.
 *
 * @param inputs - Class values in any form `clsx` accepts.
 * @returns A single, conflict-free class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
