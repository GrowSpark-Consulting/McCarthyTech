import Image from 'next/image';

import { ServiceHeroClipPlayer } from '@/components/sections/service-detail/service-hero-clip';
import { Container } from '@/components/ui/container';
import { WipeButton } from '@/components/ui/wipe-button';
import { FLOATING_SHAPE, HEADLINE_ORNAMENT } from '@/lib/service-hero-band';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the `<h1>` carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-hero-heading';

/**
 * `.hero-content--three .title` — the display ramp, band by band.
 *
 * Seven sizes for one element looks excessive until you count the reference's
 * own overrides, which is exactly seven. Each `ref-*` band is mutually exclusive
 * (see `REFERENCE_BANDS` in `tailwind.config.ts`), so these do not cascade over
 * one another — precisely one applies at any width, and it is the one written
 * here.
 */
const TITLE_TYPE = cn(
  'font-heading font-bold tracking-display text-white',
  'text-svc-title ref-xl:text-svc-title-xl ref-lg:text-svc-title-xl',
  'ref-md:text-svc-title-md ref-sm:text-svc-title-sm',
  'ref-xs:text-svc-title-xs ref-xxs:text-svc-title-xxs',
);

/**
 * The rendered box of the headline ornament.
 *
 * The source GIF is a 300×300 square drawn into a wide, short pill — the
 * reference sets both axes and leaves `object-fit` alone, so the image is
 * genuinely squashed rather than cropped. Reproduced as authored; overriding it
 * to `object-cover` would look tidier and would not be the same design.
 */
const ORNAMENT_BOX = cn(
  'inline-block overflow-hidden rounded-[100px]',
  'h-[84px] w-[217px]',
  'ref-xl:h-[65px] ref-lg:h-[65px] ref-md:h-[56px] ref-sm:h-[46px]',
  'max-bs-md:h-[40px] max-bs-md:w-[170px]',
);

export interface ServiceHeroBandProps {
  /** The service being rendered. Must carry a `heroBand`. */
  readonly service: ServiceDetail;
}

/**
 * The opening band of a service detail page — the reference's
 * `hero-style--three`.
 *
 * Two structural details drive everything else and are easy to mistake for
 * accidents:
 *
 * **The headline is `display: inline`.** The `<h1>` and the sub-heading share one
 * inline formatting context, so the sub-heading flows on from wherever the
 * headline's last line ends rather than starting a block of its own. That is
 * what produces the staggered, typeset look — and it is why the sub-heading
 * carries a left margin instead of a top one at desktop widths.
 *
 * **The floating shape is a real float.** It is placed after the sub-heading in
 * source and pulled right, so the copy wraps against it and the metric row below
 * — a flex container, and therefore its own block formatting context — is pushed
 * clear of it rather than sliding underneath.
 *
 * A Server Component. The entrance is a CSS animation rather than a motion
 * library, because the band is above the fold and so has nothing to observe:
 * WOW.js fires it on load in the original, and CSS reproduces that with no
 * hydration, no flash for visitors whose JavaScript is slow or absent, and
 * `prefers-reduced-motion` already handled globally. Only the background clip
 * hydrates.
 *
 * @param props - See {@link ServiceHeroBandProps}.
 */
export function ServiceHeroBand({ service }: ServiceHeroBandProps) {
  const { heroBand } = service;

  // Unreachable while the route only renders this for services that have a
  // band, but the field is optional during the phased port and a silent
  // `undefined` here would be a blank hero rather than a build error.
  if (heroBand === undefined) return null;

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        // `.hero.ai-marketing-hero.bg_img` — the artwork shows only in this inset.
        'relative bg-svc-hero-frame bg-cover bg-center bg-no-repeat',
        'p-[30px] max-bs-md:p-[15px]',
      )}
    >
      {/*
        `.hero-style.hero-style--three.sec-border`. Owns the stacking context the
        scrim and the copy sort themselves inside, which is why the explicit
        `z-[1]` is load-bearing rather than defensive.
      */}
      <div
        className={cn(
          'relative z-[1] overflow-hidden border border-white/15',
          // Bottom and side gutters come from `.sec-border`; the top inset is the
          // hero's own, and is the one value the original overrides at every band.
          'px-5 pb-[30px] max-bs-md:px-0',
          'pt-[320px] ref-xl:pt-[280px] ref-lg:pt-[230px] ref-md:pt-[210px]',
          'ref-sm:pt-[190px] ref-xs:pt-[190px] ref-xxs:pt-[150px]',
          'min-h-[920px] ref-xl:min-h-[800px] ref-lg:min-h-[860px] ref-md:min-h-[790px]',
          'max-bs-lg:min-h-[730px]',
        )}
      >
        {/*
          `.background_video`, at `z-index: 0`. The still is a `next/image` rather
          than the `<video poster>` attribute so it is negotiated to AVIF or WebP
          and sized to the viewport — the source JPEG is 843 KB, heavier than the
          clip it fronts. It stays mounted beneath the clip, so there is never a
          gap before the first frame paints.
        */}
        <Image
          src={heroBand.clip.poster}
          alt=""
          fill
          priority
          quality={72}
          sizes="100vw"
          aria-hidden="true"
          className="object-cover"
        />
        <ServiceHeroClipPlayer clip={heroBand.clip} />

        {/*
          `.hero-style--three::before` — the scrim, at `z-index: 1`. First in
          source so the copy, which shares that index, paints over it.
        */}
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-svc-hero-scrim" />

        <Container width="fluid">
          <div
            className={cn(
              'relative z-[1] mx-auto max-w-[1476px]',
              // `.hero-content` — inherited by this band even though its own
              // reveal does not use the third dimension.
              '[perspective:2000px] [transform-style:preserve-3d]',
            )}
          >
            {/* `.xb-content-holder.wow.fadeInUp` — `data-wow-duration="600ms"`. */}
            <div className="animate-fade-in-up">
              {/*
                The reference marks this up as an `<h2>` and leaves the page's only
                `<h1>` on a decorative footer watermark. Promoted here: a detail
                page whose headline is not its top-level heading has no outline for
                a screen reader to navigate and nothing for search to weight. The
                rendered result is identical.
              */}
              <h1 id={HEADING_ID} className={cn('inline', TITLE_TYPE)}>
                {heroBand.titleLead}{' '}
                <Image
                  src={HEADLINE_ORNAMENT.src}
                  alt=""
                  width={HEADLINE_ORNAMENT.width}
                  height={HEADLINE_ORNAMENT.height}
                  // Animated GIFs cannot pass through the image optimiser — it
                  // would return a single frame — so this one is served as-is.
                  unoptimized
                  aria-hidden="true"
                  className={ORNAMENT_BOX}
                />{' '}
                {heroBand.titleTrail}
              </h1>

              <p
                className={cn(
                  'mb-0 inline-block text-svc-sub font-semibold max-bs-md:text-svc-sub-xs',
                  'max-w-[605px] max-bs-lg:max-w-[475px] max-bs-md:w-full',
                  'mt-[6px] max-bs-lg:mt-[18px]',
                  // 50px of separation from the headline's last line, dropped
                  // once the two stop sharing a line at all.
                  'ml-[50px] ref-lg:ml-0 max-bs-xl:ml-0',
                )}
              >
                {heroBand.subTitle}
              </p>

              {/* `.hero-shape` — decorative, and dropped entirely below 768px. */}
              <span
                aria-hidden="true"
                className={cn(
                  'float-right max-bs-md:hidden',
                  'mt-[-20px]',
                  'ref-xl:mr-[-40px] ref-xl:mt-[-115px]',
                  'ref-lg:mt-[-50px]',
                  'ref-md:mr-[-40px] ref-md:mt-[-115px]',
                  'ref-sm:mr-[-40px] ref-sm:mt-[-30px]',
                )}
              >
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

            {/* `.hero-content-bottom.wow.fadeInUp` — `data-wow-delay="150ms"`. */}
            <div
              className={cn(
                'flex w-full animate-fade-in-up items-center [animation-delay:150ms]',
                'flex-nowrap justify-between gap-[30px] max-bs-md:gap-[25px]',
                // Below 1301px the row no longer fits on one line, so it wraps and
                // packs left instead of stretching to the edges.
                'ref-lg:mt-[30px] ref-lg:flex-wrap ref-lg:justify-start',
                'max-bs-xl:mt-[30px] max-bs-xl:flex-wrap max-bs-xl:justify-start',
              )}
            >
              <div className="flex flex-nowrap items-center gap-[50px] max-bs-md:gap-[25px]">
                <p className="text-svc-metric font-semibold max-bs-md:text-svc-metric-xs">
                  {heroBand.metricLead}
                  <br />
                  <span className="uppercase text-lime">{heroBand.metricSubject}</span>
                </p>

                {heroBand.logos.length === 0 ? null : (
                  <div className="flex flex-nowrap items-center">
                    {heroBand.logos.map((logo, index) => (
                      <Image
                        key={logo.id}
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        quality={90}
                        className={cn(
                          'h-auto w-auto',
                          // Intrinsic 98px at the widest band, then stepped down.
                          'ref-xl:max-w-[85px] ref-lg:max-w-[85px] ref-md:max-w-[85px]',
                          'ref-sm:max-w-[64px] max-bs-md:max-w-[54px]',
                          // Each logo after the first tucks under the one before
                          // it; the overlap tightens as the tiles shrink.
                          index === 0
                            ? undefined
                            : '-ml-[24px] max-bs-lg:-ml-[18px] max-bs-md:-ml-[12px]',
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/*
                Display type, not a section heading. The reference sets this as an
                `<h2>`, which would put a second-level heading with no content
                under it into the page outline — a `<p>` renders identically and
                does not lie about the structure.
              */}
              <p className={TITLE_TYPE}>{heroBand.metricVerb}</p>

              <WipeButton
                href={heroBand.cta.href}
                label={heroBand.cta.label}
                srSuffix={` about ${service.name}`}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
