import Image from 'next/image';

import { ServiceBrandSwitcher } from '@/components/sections/service-detail/service-brand-switcher';
import { ServiceHeroClipPlayer } from '@/components/sections/service-detail/service-hero-clip';
import { TextReveal } from '@/components/shared/text-reveal';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { WipeButton } from '@/components/ui/wipe-button';
import { FLOATING_SHAPE } from '@/lib/service-hero-band';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the statement carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-brand-heading';

export interface ServiceBrandBandProps {
  /** The service being rendered. Must carry a `brandBand`. */
  readonly service: ServiceDetail;
}

/**
 * `.brand` — the client band.
 *
 * A frosted column floating over a looping clip. The column is the interesting
 * part: `backdrop-filter: blur(40px)` against a background that is only 10%
 * opaque, so the clip stays visible through it while the copy on top keeps its
 * contrast. Its `min-height` matches the wrapper's exactly (772px), which is
 * what makes the panel look like a cut-out of the video rather than a card
 * sitting on it.
 *
 * A Server Component apart from the switcher, the clip, and the statement's
 * word sweep.
 *
 * @param props - See {@link ServiceBrandBandProps}.
 */
export function ServiceBrandBand({ service }: ServiceBrandBandProps) {
  const { brandBand } = service;

  if (brandBand === undefined) return null;

  return (
    <section aria-labelledby={HEADING_ID} className="mt-20">
      <Container width="fluid">
        {/* `.sec-border.mlr-20` */}
        <div
          className={cn(
            'mx-5 border border-white/15 px-5 py-[30px]',
            'max-bs-md:mx-0 max-bs-md:px-[10px]',
          )}
        >
          {/* `.ai-brand-heading.mt-45.mb-60.ul_li_between` */}
          <div
            className={cn(
              'mb-[60px] mt-[45px] flex flex-nowrap items-center justify-between gap-[30px]',
              'max-bs-md:flex-wrap max-bs-md:justify-center',
            )}
          >
            <div>
              <SectionEyebrow tone="square" className="mb-[25px]">
                {brandBand.eyebrow}
              </SectionEyebrow>

              <TextReveal
                id={HEADING_ID}
                className={cn(
                  'max-w-[900px] font-heading font-normal tracking-display text-white',
                  'text-svc-band-title ref-md:text-svc-band-title-md ref-sm:text-svc-band-title-sm',
                  'ref-xs:text-svc-band-title-xs ref-xxs:text-svc-band-title-xxs',
                )}
              >
                {brandBand.statement}
              </TextReveal>
            </div>

            {/* `.shape` — the same ornament the hero floats, reused here. */}
            <span aria-hidden="true" className="shrink-0">
              <Image
                src={FLOATING_SHAPE.src}
                alt=""
                width={FLOATING_SHAPE.width}
                height={FLOATING_SHAPE.height}
                unoptimized
                className="h-auto"
              />
            </span>
          </div>

          {/* `.ai-brand-wrap.pos-rel` */}
          <div className="relative mb-[50px] min-h-[772px] overflow-hidden">
            <ServiceHeroClipPlayer clip={brandBand.clip} />
            <Image
              src={brandBand.clip.poster}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="-z-10 object-cover"
            />

            {/* `.ai-brand-content` */}
            <div
              className={cn(
                'relative z-[1] mx-auto min-h-[772px] backdrop-blur-[40px]',
                'bg-drawer/10 p-[45px_30px_50px]',
                'max-w-[710px] ref-sm:max-w-[490px] ref-xs:max-w-[420px] ref-xxs:max-w-[490px]',
                'ref-xs:p-[45px_20px_50px] ref-xxs:p-[45px_5px_50px]',
                // `::before` — grain over the frosted panel.
                "before:absolute before:inset-0 before:-z-[1] before:content-['']",
                'before:bg-brand-noise02 before:bg-cover before:bg-center before:bg-no-repeat',
              )}
            >
              <p className="mb-0 text-[23px] leading-[30px] text-white">{brandBand.body}</p>

              {/* `.ai-brand-inner` */}
              <div className="mt-10 border-t border-[#e8e8e8]/20 pb-[75px] pt-[65px]">
                <ServiceBrandSwitcher brands={brandBand.brands} />
              </div>

              <p className="mb-0 text-[23px] leading-[30px] text-white">{brandBand.closing}</p>

              <WipeButton
                href={brandBand.cta.href}
                label={brandBand.cta.label}
                srSuffix={` about ${service.name}`}
                className="mt-[30px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
