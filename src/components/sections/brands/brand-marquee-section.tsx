import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { brandLogos, brandsContent } from '@/lib/brands';
import { cn } from '@/lib/utils';
import type { ImageAsset } from '@/types/media';

/**
 * One copy of the logo track.
 *
 * Rendered twice inside the marquee. The animation travels exactly -50%, so at
 * the end of each cycle the second copy occupies the first copy's starting
 * position and the loop point is invisible. Both copies are `aria-hidden` — the
 * marquee's own label describes the strip once, so a screen reader is not read
 * twelve logo names for six companies.
 */
function BrandTrack({ logos }: { readonly logos: readonly ImageAsset[] }) {
  return (
    <ul
      aria-hidden="true"
      className="m-0 flex shrink-0 list-none items-center gap-20 p-0 pr-20 max-bs-md:gap-10 max-bs-md:pr-10"
    >
      {logos.map((logo) => (
        <li
          key={logo.src}
          className="shrink-0 transition-opacity duration-300 ease-out hover:opacity-50 max-bs-md:max-w-[105px]"
        >
          <Image
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            sizes="150px"
            className="h-auto w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Client logo marquee — "World's Best 30+ Companies Work With Us".
 *
 * A Server Component with **no JavaScript at all**. The reference drives this
 * with a jQuery marquee plugin that clones nodes at runtime; here the track is
 * simply rendered twice and slid with a CSS keyframe, which runs on the
 * compositor and costs nothing to hydrate.
 *
 * The heading pill is pulled up 42px so it straddles the card's top edge, and
 * the card clips the strip so logos fade out at both edges rather than
 * overflowing the section.
 */
export function BrandMarqueeSection() {
  return (
    <section aria-labelledby="brands-heading" className="pb-[150px] pt-[170px] max-bs-md:py-20">
      <Container>
        <div
          className={cn(
            'relative isolate rounded-[10px] px-[30px] pb-[55px] pt-5 text-center',
            'bg-glass-sheen-215 shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[40px]',
          )}
        >
          {/* Grain — `.xb-brand-wrap::before`. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-panel-noise bg-cover bg-no-repeat"
          />
          {/* 1px gradient hairline — `.xb-border::after`. */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
              '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
            )}
          />

          <div
            className={cn(
              'relative isolate inline-block -translate-y-[42px] rounded-[7px] bg-brand-pill',
              'px-[39px] py-1.5 text-center shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[40px]',
              'max-bs-md:-translate-y-[67px] bs-sm:max-bs-md:-translate-y-[42px]',
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-brand-noise bg-cover bg-no-repeat"
            />
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 -z-10 rounded-[7px] bg-hairline p-px',
                '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
              )}
            />

            {/* Lime dots flank the copy — `.brand-sub-title p::before/::after`. */}
            <p
              id="brands-heading"
              className={cn(
                'relative inline-block px-4 text-base font-normal capitalize tracking-body text-white',
                "before:absolute before:right-0 before:top-1/2 before:size-2 before:-translate-y-1/2 before:rounded-full before:bg-lime before:content-['']",
                "after:absolute after:left-0 after:top-1/2 after:size-2 after:-translate-y-1/2 after:rounded-full after:bg-lime after:content-['']",
              )}
            >
              {brandsContent.headingBefore}
              <span className="text-lime">{brandsContent.headingHighlight}</span>
              {brandsContent.headingAfter}
            </p>
          </div>

          <div role="img" aria-label={brandsContent.accessibleLabel} className="overflow-hidden">
            <div className="flex w-max animate-marquee-x motion-reduce:animate-none">
              <BrandTrack logos={brandLogos} />
              <BrandTrack logos={brandLogos} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
