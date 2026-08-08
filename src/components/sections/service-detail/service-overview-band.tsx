import Image from 'next/image';

import { SectionJumpLink } from '@/components/sections/service-detail/section-jump-link';
import { TextReveal } from '@/components/shared/text-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { WipeButton } from '@/components/ui/wipe-button';
import { OVERVIEW_ORBIT, OVERVIEW_SCROLL_CUE } from '@/lib/service-hero-band';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the statement carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-overview-heading';

export interface ServiceOverviewBandProps {
  /** The service being rendered. Must carry an `overviewBand`. */
  readonly service: ServiceDetail;
}

/**
 * `section.about` — the overview panel beneath the hero.
 *
 * Three details in the original are worth naming, because each looks like a
 * mistake until you see what it is doing:
 *
 * **The eyebrow is absolutely positioned, not centred.** `.ai-about-inner` is a
 * centred 1000px column, but `.ai-about-inner .sec-title-three .sub-title` is
 * pulled out of that flow to `top: 31px; left: 21px` of the *panel*. So the
 * label sits in the panel's top-left corner while the statement beneath it stays
 * optically centred — the two are not in the same column at all.
 *
 * **The bottom row is `inline-flex` inside a centred block.** That is what
 * centres a paragraph and a button as one unit while leaving the paragraph's own
 * text left-aligned. A regular flex row would stretch the full column width and
 * the pair would drift apart as the viewport grew.
 *
 * **The ring is pulled 350px above the panel and rotates for 70 seconds.** Only
 * its lower arc is ever visible; it sits at `-z-10` behind the mesh, and it is
 * dropped entirely below 768px.
 *
 * A Server Component apart from the scroll cue and the statement's reveal.
 *
 * @param props - See {@link ServiceOverviewBandProps}.
 */
export function ServiceOverviewBand({ service }: ServiceOverviewBandProps) {
  const { overviewBand } = service;

  if (overviewBand === undefined) return null;

  return (
    <section aria-labelledby={HEADING_ID} className="relative overflow-clip">
      <Container width="fluid">
        {/*
          `.ai-about-wrap.mlr-20` — the panel. Positioned, so both the corner
          eyebrow and the ring resolve against it rather than against the column.
        */}
        <div
          className={cn(
            'relative z-[1] mx-5 min-h-[607px] bg-drawer',
            'max-bs-md:mx-0 max-bs-md:px-[10px]',
            // `::before` — the mesh, behind the content but above the ring.
            "before:absolute before:inset-0 before:-z-[1] before:content-['']",
            'before:bg-ai-about-net before:bg-cover before:bg-center before:bg-no-repeat',
          )}
        >
          <div
            className={cn(
              'mx-auto max-w-[1000px] text-center',
              'pt-[175px] ref-sm:pt-[160px] ref-xs:pt-[135px] ref-xxs:pt-[110px]',
            )}
          >
            <SectionEyebrow tone="square" className="absolute left-[21px] top-[31px]">
              {overviewBand.eyebrow}
            </SectionEyebrow>

            <TextReveal
              id={HEADING_ID}
              className={cn(
                'font-heading font-normal tracking-display text-white',
                'text-svc-band-title ref-md:text-svc-band-title-md ref-sm:text-svc-band-title-sm',
                'ref-xs:text-svc-band-title-xs ref-xxs:text-svc-band-title-xxs',
              )}
            >
              {overviewBand.statement}
            </TextReveal>

            {/* `.ai-about-bottom.ul_li` */}
            <div
              className={cn(
                'mt-[25px] inline-flex flex-wrap items-center justify-start gap-[28px]',
                'max-bs-lg:justify-center',
              )}
            >
              <p className="mb-0 max-w-[502px] text-start text-hero-sub">{overviewBand.body}</p>

              <WipeButton
                href={overviewBand.cta.href}
                label={overviewBand.cta.label}
                srSuffix={` about ${service.name}`}
              />
            </div>
          </div>

          <SectionJumpLink
            targetId={OVERVIEW_SCROLL_CUE.targetId}
            label={OVERVIEW_SCROLL_CUE.label}
            className="absolute bottom-[30px] right-5"
          />

          {/* `.ai-circle-img` */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -z-10 animate-about-orbit motion-reduce:animate-none',
              'left-[14.2%] top-[-350px]',
              'ref-xxl:left-[7.2%]',
              'ref-xl:left-0',
              'ref-lg:left-0 ref-lg:top-[-295px]',
              'ref-md:left-0 ref-md:top-[-144px]',
              'ref-sm:left-0 ref-sm:top-[-42px]',
              'max-bs-md:hidden',
            )}
          >
            <Image
              src={OVERVIEW_ORBIT.src}
              alt=""
              width={OVERVIEW_ORBIT.width}
              height={OVERVIEW_ORBIT.height}
              quality={70}
              sizes="(max-width: 1200px) 900px, 1326px"
              className="h-auto max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
