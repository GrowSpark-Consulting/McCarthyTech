'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { ThmButton } from '@/components/ui/thm-button';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the heading carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-process-heading';

/**
 * Where in the viewport a panel has to sit to claim the step card.
 *
 * A band across the middle rather than a single line: `-45% 0px -45% 0px` leaves
 * a 10% strip, so exactly one panel qualifies at a time and the card cannot
 * flicker between two as they cross a boundary together.
 */
const ACTIVE_BAND = '-45% 0px -45% 0px';

export interface ServiceProcessBandProps {
  /** The service being rendered. Must carry a `processBand`. */
  readonly service: ServiceDetail;
}

/**
 * `#process` — the sticky step indicator.
 *
 * The left column sticks 50px below the viewport top while the right column's
 * panels scroll past it, and the step card swaps as each panel reaches the
 * middle of the screen. The reference achieves this by toggling `.active` on
 * cards that are otherwise `display: none`; the observation is done here with an
 * `IntersectionObserver` rather than a scroll handler, so nothing runs per frame.
 *
 * **All steps stay in the DOM.** Only the active one is visible, but the others
 * are hidden with `sr-only`-style clipping rather than unmounted, so the whole
 * sequence is available to a screen reader and to search without anyone having
 * to scroll it into being. The reference's `display: none` would hide them from
 * both.
 *
 * @param props - See {@link ServiceProcessBandProps}.
 */
export function ServiceProcessBand({ service }: ServiceProcessBandProps) {
  const { processBand } = service;
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const panels = panelsRef.current.filter((panel): panel is HTMLDivElement => panel !== null);
    if (panels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = panels.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { rootMargin: ACTIVE_BAND },
    );

    for (const panel of panels) observer.observe(panel);
    return () => observer.disconnect();
  }, [processBand]);

  if (processBand === undefined) return null;

  const { eyebrow, title, cta, stepArtwork, steps } = processBand;

  return (
    <section aria-labelledby={HEADING_ID} className="relative z-[1] pt-[150px] max-bs-md:pt-20">
      <Container>
        <div className="flex max-bs-lg:flex-col">
          {/* `.xb-process-left-container` */}
          <div
            className={cn(
              'sticky top-[50px] mr-[50px] w-5/12 self-start pb-[150px]',
              'max-bs-lg:static max-bs-lg:mr-0 max-bs-lg:w-full max-bs-lg:pb-[30px]',
            )}
          >
            <div className="mb-[50px]">
              <SectionEyebrow tone="dot" className="mb-[25px] block">
                {eyebrow}
              </SectionEyebrow>
              <h2
                id={HEADING_ID}
                className="inline font-heading text-[52px] font-normal leading-[1.2] tracking-display text-white max-bs-md:text-[32px]"
              >
                {title}
              </h2>{' '}
              <span className="inline-block translate-x-[22px] translate-y-[-10px] align-middle max-bs-lg:translate-x-0 max-bs-lg:translate-y-[5px]">
                <ThmButton href={cta.href} label={cta.label} />
              </span>
            </div>

            <ol className="m-0 list-none p-0">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  // Inactive steps are clipped rather than removed, so the
                  // sequence stays readable to assistive technology throughout.
                  className={cn(index === activeIndex ? 'block' : 'sr-only')}
                >
                  <div
                    className={cn(
                      'relative mr-[63px] overflow-hidden rounded-[10px] p-[20px_20px_25px] text-center',
                      'bg-glass-sheen shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[40px]',
                      'max-bs-xl:mr-[285px] max-bs-lg:mr-0',
                      "before:absolute before:inset-0 before:-z-[1] before:rounded-[inherit] before:content-['']",
                      'before:bg-process-noise before:bg-cover before:bg-no-repeat',
                    )}
                  >
                    <div className="relative shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]">
                      <Image
                        src={stepArtwork}
                        alt=""
                        width={400}
                        height={260}
                        aria-hidden="true"
                        className="h-auto w-full"
                      />
                      <span className="absolute left-1/2 top-[51%] -translate-x-1/2 -translate-y-1/2 font-heading text-[30px] font-normal tracking-[-0.04em] text-white">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="pt-[30px] font-heading text-[22px] font-normal tracking-[-0.04em] text-white">
                      {step.name}
                    </h3>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* `.xb-process-right-container` */}
          <div className="w-7/12 pb-[150px] text-end max-bs-lg:w-full max-bs-lg:pb-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(node) => {
                  panelsRef.current[index] = node;
                }}
                className="mt-[30px]"
              >
                <Image
                  src={step.image}
                  alt=""
                  width={800}
                  height={520}
                  aria-hidden="true"
                  className="ml-auto h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
