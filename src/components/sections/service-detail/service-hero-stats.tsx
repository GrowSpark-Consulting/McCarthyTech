'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent, ServiceStat } from '@/types/service-detail';

/** Counter duration in seconds — matched to the homepage's achievement stats. */
const COUNT_DURATION_S = 2.5;

/** Fraction of the row that must be visible before the counters start. */
const VISIBILITY_THRESHOLD = 0.3;

export interface ServiceHeroStatsProps {
  /** The two figures to count up. */
  readonly stats: readonly ServiceStat[];
  /** Accent theme for the digits. */
  readonly accent: ServiceAccent;
}

/**
 * The pair of counters beneath the hero copy.
 *
 * Uses the same approach as the homepage's `AchievementStats`: `react-countup`
 * driven by a single `IntersectionObserver`, rather than a scroll listener.
 * These sit above the fold, but the observer is still the right trigger — it
 * means the digits start from the moment they are actually visible rather than
 * racing hydration, and the component behaves identically if the row is ever
 * moved further down the page.
 *
 * Each figure is announced once, not sixty times: the animating digits are
 * `aria-hidden`, and a visually hidden sibling carries the final value. A
 * screen-reader user hears "40+ successful mobile apps", not every intermediate
 * number as the counter climbs.
 *
 * A literal `0` renders before the row is reached so the block occupies exactly
 * the same height before and after the count — the alternative is a layout
 * shift the moment it enters view.
 *
 * @param props - See {@link ServiceHeroStatsProps}.
 */
export function ServiceHeroStats({ stats, accent }: ServiceHeroStatsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: VISIBILITY_THRESHOLD });
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <dl
      ref={ref}
      className="m-0 flex flex-wrap items-start justify-center gap-x-16 gap-y-8 max-bs-md:gap-x-10"
    >
      {stats.map((stat) => (
        // `flex-col-reverse` puts the figure above its label visually while the
        // markup keeps `<dt>` before `<dd>`, so the term/value pairing survives
        // for assistive technology.
        <div key={stat.id} className="flex flex-col-reverse items-center gap-1 text-center">
          <dt className="max-w-[190px] text-sm leading-snug text-svc-muted">{stat.label}</dt>
          <dd
            className={cn(
              'm-0 font-heading leading-none tracking-[-0.03em]',
              'text-[clamp(38px,4.6vw,58px)]',
              accentClasses.text,
            )}
          >
            <span aria-hidden="true">
              {inView ? <CountUp end={stat.value} duration={COUNT_DURATION_S} /> : 0}
              {stat.suffix}
            </span>
            <span className="sr-only">
              {stat.value}
              {stat.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
