import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';

export interface ServiceHeroBackdropProps {
  /** Which accent theme to draw the wash in. */
  readonly accent: ServiceAccent;
}

/**
 * The stage behind a service detail hero.
 *
 * Drawn entirely in CSS. The homepage hero carries a full-screen video, which is
 * the right call once — it is the first thing anyone sees. Repeating that on
 * eight interior pages would mean eight more multi-megabyte downloads for
 * decoration, so these are built from gradients instead: nothing to fetch,
 * nothing to decode, sharp at any density, and re-themed per service by one
 * class.
 *
 * Three layers, back to front:
 *
 * 1. **Grid** — two repeating gradients, radially masked so it dissolves toward
 *    the edges rather than stopping on a hard line.
 * 2. **Bloom** — the accent wash, breathing on a slow 22s cycle. Only `opacity`
 *    and `transform` animate, so the whole thing stays on the compositor.
 * 3. **Floor** — a fade to the page canvas, which is what lets the hero end
 *    without a visible seam against the section beneath it.
 *
 * The whole stage is `aria-hidden` and `pointer-events-none`: it is decoration,
 * it carries no information a screen reader needs, and it must never intercept
 * a click meant for the copy sitting over it.
 *
 * @param props - See {@link ServiceHeroBackdropProps}.
 */
export function ServiceHeroBackdrop({ accent }: ServiceHeroBackdropProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid. Masked from the top-centre outward so the lines are densest
          behind the breadcrumb and gone by the time they reach the CTAs. */}
      <div
        className={cn(
          'absolute inset-0 bg-svc-grid',
          '[mask-image:radial-gradient(75%_60%_at_50%_0%,#000_0%,transparent_100%)]',
        )}
      />

      {/* Accent bloom. `origin-top` keeps the scale anchored to the top edge, so
          it grows down over the headline instead of drifting off the section. */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[720px] origin-top',
          accentClasses.bloom,
          'animate-svc-bloom motion-reduce:animate-none',
        )}
      />

      {/* Floor fade into the page canvas. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
