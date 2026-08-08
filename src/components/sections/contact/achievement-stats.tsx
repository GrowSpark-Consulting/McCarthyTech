'use client';

import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import { achievementStats, contactContent } from '@/lib/contact';
import { cn } from '@/lib/utils';

/** Counter duration in seconds. */
const COUNT_DURATION_S = 2.5;

/**
 * The gradient achievements card — two counters that tick up when scrolled into
 * view, with decorative shapes floating over its top edge.
 *
 * The reference drives these with Odometer.js and a jQuery scroll handler;
 * `react-countup` plus one `IntersectionObserver` does the same job with no
 * scroll listener.
 *
 * Each figure is wrapped so a screen reader announces the finished value rather
 * than every intermediate number: the animated digits are `aria-hidden`, and an
 * `sr-only` sibling carries the real text.
 */
export function AchievementStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="relative z-[1] mt-[133px]">
      {contactContent.shapes.map((shape) => (
        <div key={shape.src} className={cn('absolute', shape.className)}>
          <Image
            src={shape.src}
            alt={shape.alt}
            width={shape.width}
            height={shape.height}
            aria-hidden="true"
          />
        </div>
      ))}

      <div
        className={cn(
          'flex items-center justify-between rounded-[10px] bg-aurora',
          'px-[35px] pb-10 pt-[140px]',
          'max-lg:px-5 max-bs-lg:px-[35px]',
          'max-bs-md:gap-[30px] max-bs-md:text-center',
          'bs-sm:max-bs-md:px-5 bs-sm:max-bs-md:text-start',
        )}
      >
        {achievementStats.map((stat) => (
          <div
            key={stat.id}
            className="max-w-[186px] max-bs-xl:max-w-[180px] max-bs-lg:max-w-[210px] max-bs-md:mx-auto"
          >
            <h3
              className={cn(
                'mb-[7px] font-heading text-[55px] capitalize text-white',
                'max-bs-xl:text-[50px] max-lg:text-[48px]',
              )}
            >
              <span aria-hidden="true">
                {inView ? (
                  <CountUp end={stat.value} duration={COUNT_DURATION_S} />
                ) : (
                  // Renders "0" until the card is reached, so the card's height
                  // is identical before and after the counter runs.
                  0
                )}
                {stat.suffix}
              </span>
              <span className="sr-only">
                {stat.value}
                {stat.suffix}
              </span>
            </h3>
            <p className="text-lg font-medium text-white">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
