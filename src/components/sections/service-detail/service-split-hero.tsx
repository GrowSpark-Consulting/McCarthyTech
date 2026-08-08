import Image from 'next/image';

import { ServiceHeroClipPlayer } from '@/components/sections/service-detail/service-hero-clip';
import { Reveal } from '@/components/shared/reveal';
import { Container } from '@/components/ui/container';
import { ThmButton } from '@/components/ui/thm-button';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the `<h1>` carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-hero-heading';

/**
 * `.hero-content--two .title` — the display ramp.
 *
 * Paired line-heights rather than a unitless ratio, because that is how the
 * original sets them: 65/82, 57/70, 52/65, 36/52. The ratio drifts from 1.26 to
 * 1.44 across the ramp, so a single multiplier would be wrong at both ends.
 */
const TITLE = cn(
  'mb-0 font-heading font-normal tracking-display text-white',
  'text-[65px] leading-[82px]',
  'ref-lg:text-[57px] ref-lg:leading-[70px]',
  'ref-md:text-[57px] ref-md:leading-[70px]',
  'ref-sm:text-[52px] ref-sm:leading-[65px]',
  'ref-xs:text-[36px] ref-xs:leading-[52px]',
  'ref-xxs:text-[36px] ref-xxs:leading-[52px]',
);

export interface ServiceSplitHeroProps {
  /** The service being rendered. Must carry a `splitHeroBand`. */
  readonly service: ServiceDetail;
}

/**
 * `hero-style--two` — the two-column hero.
 *
 * Copy on the left at half width, artwork on the right, and `.hero-linear`
 * bleeding off the bottom: a 65px slab of the page's own canvas colour, blurred
 * 10px and set 45px below the section, which softens the join to whatever
 * follows rather than ending on a hard edge. It is 102% wide on purpose, so the
 * blur's soft left and right ends fall outside the viewport instead of showing
 * as two faded corners.
 *
 * The entrance is the reference's `.scale-animation`: a 3D pose — rotated 20°
 * on X and pushed 418px along Z — settling over one second. That is reproduced
 * through the shared `Reveal`, which already owns those exact values and the
 * `motion-reduce` guard that keeps the copy visible when the animation is
 * suppressed.
 *
 * A Server Component apart from the reveal and the clip.
 *
 * @param props - See {@link ServiceSplitHeroProps}.
 */
export function ServiceSplitHero({ service }: ServiceSplitHeroProps) {
  const { splitHeroBand } = service;

  if (splitHeroBand === undefined) return null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        'relative isolate z-[1] overflow-hidden bg-cover bg-center bg-no-repeat',
        // `.hero-style` + `.hero-style--two`, band by band.
        'min-h-[920px] pt-[185px]',
        'ref-xl:min-h-[790px] ref-lg:min-h-[790px] ref-md:min-h-[790px]',
        'ref-sm:min-h-[755px] ref-sm:pt-40 ref-xs:min-h-[755px] ref-xs:pt-40',
        'ref-xxs:min-h-[755px] ref-xxs:pt-40',
      )}
    >
      <Image
        src={splitHeroBand.background}
        alt=""
        fill
        priority
        quality={72}
        sizes="100vw"
        aria-hidden="true"
        className="-z-10 object-cover"
      />

      <Container>
        <div className="flex items-center max-bs-lg:flex-col max-bs-lg:items-start">
          {/* `.col-lg-6` + `.hero-content--two` */}
          <div
            className={cn(
              'w-1/2 max-bs-lg:w-full',
              'pt-[65px] ref-sm:pt-[30px] ref-xs:pt-2.5 ref-xxs:pt-2.5',
            )}
          >
            <Reveal as="h1" id={HEADING_ID} className={TITLE}>
              {splitHeroBand.title}
            </Reveal>

            <Reveal as="p" className="mb-[42px] mt-1.5 max-w-[678px] text-hero-sub text-subtle">
              {splitHeroBand.subTitle}
            </Reveal>

            <Reveal>
              <ThmButton href={splitHeroBand.cta.href} label={splitHeroBand.cta.label} />
            </Reveal>
          </div>

          {/* `.col-lg-6` + `.hero-img-container` */}
          <div className="w-1/2 max-bs-lg:mt-12 max-bs-lg:w-full">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <Image
                src={splitHeroBand.media.poster}
                alt=""
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
                aria-hidden="true"
                className="object-cover"
              />
              <ServiceHeroClipPlayer clip={splitHeroBand.media} />
            </div>
          </div>
        </div>
      </Container>

      {/* `.hero-linear` */}
      <span
        aria-hidden="true"
        className="absolute bottom-[-45px] left-0 h-[65px] w-[102%] bg-ink blur-[10px]"
      />
    </section>
  );
}
