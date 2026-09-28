'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

/**
 * Cards in each copy of a column's track.
 *
 * Four keeps one copy taller than the visible window at every breakpoint. The
 * loop depends on that: a track travels exactly one copy before it repeats, so
 * a copy shorter than the window would open a gap at the trailing edge.
 */
const CARDS_PER_COLUMN = 4;

/**
 * The three columns: direction, pace and starting phase.
 *
 * Each reuses the `marquee-y` keyframe (0 → -50% of a track holding two copies)
 * at its own duration — the outer two rise slowly, the middle one sinks a little
 * faster — so the columns drift past one another instead of moving as a block.
 * The outer columns start level and the middle one half a cycle-step off, via a
 * negative delay. Level outer columns also keep the badges they share two cards
 * apart, rather than side by side. The middle track's static offset is only seen
 * under reduced motion: while the animation runs, its keyframes own `transform`.
 */
const COLUMNS = [
  { column: '', track: 'animate-[marquee-y_64s_linear_infinite]' },
  {
    column: '',
    track:
      '-translate-y-[6%] animate-[marquee-y_50s_linear_infinite_reverse] [animation-delay:-20s]',
  },
  {
    column: 'max-bs-sm:hidden',
    track: 'animate-[marquee-y_76s_linear_infinite]',
  },
] as const;

/** Three depth steps, cycled so neighbouring cards never share one. */
const DEPTH = ['', 'scale-[0.94] opacity-75', 'scale-[0.97] opacity-90'] as const;

/**
 * Small sideways drifts, so the columns never settle into a rigid grid.
 *
 * Kept within the field's 16px side padding, so an outer card never drifts into
 * the clip and gets cut off with a hard edge.
 */
const DRIFT = [
  'translate-x-[4%]',
  '-translate-x-[3%]',
  'translate-x-[2%]',
  '-translate-x-[4%]',
] as const;

/** One badge on its dark glass card, lit from below. */
function AwardCard({ src, className }: { readonly src: string; readonly className?: string }) {
  return (
    <li
      className={cn(
        'relative flex aspect-[20/22] items-center justify-center overflow-hidden rounded-[16px]',
        'border border-white/[0.07]',
        'bg-[radial-gradient(70%_45%_at_50%_100%,rgba(44,82,254,0.34),rgba(44,82,254,0)_70%),linear-gradient(180deg,#0c1128_0%,#060918_100%)]',
        'shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9),0_0_36px_-14px_rgba(34,211,238,0.3)]',
        'max-bs-md:shadow-[0_16px_32px_-18px_rgba(0,0,0,0.9),0_0_24px_-12px_rgba(34,211,238,0.2)]',
        // A cyan hairline catching the card's top edge.
        "before:absolute before:inset-x-[18%] before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent-cyan/50 before:to-transparent before:content-['']",
        className,
      )}
    >
      {/* Eager: the badges are ~1.5 KB each, and a lazy one would pop in mid-glide
          as it slid out from under the column's clip. */}
      <Image
        src={src}
        alt=""
        width={96}
        height={110}
        loading="eager"
        className="h-auto w-[56%] max-w-[112px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
      />
    </li>
  );
}

export interface AboutTransformAwardsProps {
  /** Badge image paths. Distributed across the columns, cycling as needed. */
  readonly awards: readonly string[];
  /** Accessible name for the whole field. */
  readonly label: string;
}

/**
 * The moving badge field beside the About page's closing call to action.
 *
 * Three columns of cards glide vertically at different paces behind a strong
 * top and bottom fade, so cards surface and dissolve rather than being cut off.
 * Each column renders its list twice and travels exactly one copy per cycle, so
 * the loop has no visible seam.
 *
 * The glide is pure CSS on `transform`. The only JavaScript is a gentle scroll
 * parallax: the atmosphere drifts slower than the page and the cards slightly
 * faster, a few dozen pixels either way. Under reduced motion both the glide and
 * the parallax are off and the cards rest in a staggered arrangement.
 *
 * @param props - See {@link AboutTransformAwardsProps}.
 */
export function AboutTransformAwards({ awards, label }: AboutTransformAwardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-48, 48]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  // Column c takes every third badge from c onward, so each column's four are
  // all different and the three columns start on different badges.
  const columns = COLUMNS.map((column, c) => ({
    ...column,
    cards: Array.from(
      { length: CARDS_PER_COLUMN },
      (_, k) => awards[(c + 3 * k) % awards.length],
    ).filter((src): src is string => src !== undefined),
  }));

  return (
    <div ref={ref} className="relative isolate">
      {/* Atmosphere: a blue and a green bloom behind the cards. */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: glowY }}
        className="pointer-events-none absolute inset-0 -z-10 max-bs-md:opacity-70"
      >
        <span className="absolute left-1/2 top-1/2 size-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(44,50,254,0.2),rgba(44,50,254,0))]" />
        <span className="absolute left-[4%] top-[52%] size-[72%] rounded-full bg-[radial-gradient(closest-side,rgba(0,255,151,0.09),rgba(0,255,151,0))]" />
      </motion.div>

      <motion.div
        role="img"
        aria-label={label}
        style={prefersReducedMotion ? undefined : { y: fieldY }}
        className={cn(
          'mx-auto flex h-[660px] gap-5 overflow-hidden px-4',
          'max-bs-xl:h-[600px] max-bs-lg:h-[560px] max-bs-lg:max-w-[620px]',
          'max-bs-md:gap-4 max-bs-sm:h-[460px] max-bs-sm:max-w-[420px]',
          '[mask-image:linear-gradient(to_bottom,transparent_0%,#000_20%,#000_80%,transparent_100%)]',
        )}
      >
        {columns.map(({ column, track, cards }, c) => (
          <div key={track} className={cn('min-w-0 flex-1', column)}>
            <div
              className={cn(
                'flex flex-col will-change-transform motion-reduce:animate-none',
                track,
              )}
            >
              {/* Two identical copies; the second is where the first began once
                  the track has travelled -50%. Each copy ends on its own gap so
                  the seam is spaced exactly like every other pair of cards. */}
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden="true"
                  className="m-0 flex list-none flex-col gap-5 p-0 pb-5 max-bs-md:gap-4 max-bs-md:pb-4"
                >
                  {cards.map((src, k) => (
                    <AwardCard
                      key={`${src}-${k}`}
                      src={src}
                      className={cn(
                        DEPTH[(k + c) % DEPTH.length],
                        DRIFT[(k + 2 * c) % DRIFT.length],
                      )}
                    />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
