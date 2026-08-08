import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { industriesServedContent, servedIndustries } from '@/lib/industries';
import { cn } from '@/lib/utils';
import type { ServedIndustry } from '@/types/industries';

/**
 * One copy of the industry strip.
 *
 * Rendered twice so the `-50%` travel loops seamlessly. Both copies are
 * `aria-hidden`; the strip's container carries a single label.
 */
function ServedTrack({ industries }: { readonly industries: readonly ServedIndustry[] }) {
  return (
    <>
      {industries.map((industry) => (
        <div
          key={industry.id}
          className={cn(
            'group/card w-[236px] shrink-0 rounded-[18px] border border-white/[0.09] px-[22px] pb-[30px] pt-9 text-center',
            'bg-served-card shadow-[0_12px_34px_-14px_rgba(0,0,0,0.65)]',
            'transition-[transform,border-color,box-shadow,opacity,filter] duration-card ease-out',
            // Spotlight: the strip dims every card, this one lifts back out.
            'group-hover/strip:opacity-40 group-hover/strip:saturate-[0.65]',
            'hover:!opacity-100 hover:!saturate-100',
            'hover:-translate-y-3 hover:scale-105 hover:border-mint/55',
            'hover:shadow-[0_24px_55px_-18px_rgba(0,255,151,0.4)]',
            'max-bs-md:w-[180px] max-bs-md:px-4 max-bs-md:pb-6 max-bs-md:pt-7',
          )}
        >
          <div
            className={cn(
              'relative mx-auto mb-[22px] grid size-[116px] place-items-center rounded-full',
              'border border-white/[0.08] bg-served-icon',
              'max-bs-md:size-[92px]',
            )}
          >
            {/* Rotating accent arc, revealed on hover. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-px rounded-full bg-served-ring p-[1.5px] opacity-0 content-['']",
                'transition-opacity duration-ring ease-out group-hover/card:opacity-100',
                'animate-served-spin motion-reduce:animate-none',
                '[mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]',
              )}
            />
            <Image
              src={industry.icon.src}
              alt=""
              width={industry.icon.width}
              height={industry.icon.height}
              className={cn(
                'size-[52px] object-contain transition-transform duration-500 ease-out',
                'group-hover/card:scale-[1.14] max-bs-md:size-[42px]',
              )}
            />
          </div>
          <h3 className="m-0 font-heading text-xl tracking-[-0.02em] text-white">
            {industry.title}
          </h3>
        </div>
      ))}
    </>
  );
}

/**
 * "Industries We Are Serving" — an auto-scrolling card strip.
 *
 * Hovering the strip pauses it and dims every card, then the card under the
 * cursor lifts back to full opacity with a mint ring. That spotlight is done
 * entirely in CSS with two nested `group` scopes: `group/strip` dims the field,
 * `group/card` restores the one being pointed at.
 *
 * A Server Component with **no JavaScript** — the whole behaviour is a keyframe
 * plus `:hover` rules.
 */
export function IndustriesServedSection() {
  return (
    <section
      id={industriesServedContent.id}
      aria-labelledby="industries-served-heading"
      className="bg-industries-stage bg-cover bg-center bg-no-repeat pb-[165px] max-bs-md:pb-20"
    >
      <Container>
        <div className="mb-[50px] text-center">
          <SectionEyebrow className="mb-[15px]">{industriesServedContent.eyebrow}</SectionEyebrow>
          <h2
            id="industries-served-heading"
            className={cn(
              'block font-heading text-[62px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
            )}
          >
            {industriesServedContent.heading}
          </h2>
        </div>
      </Container>

      <div
        role="img"
        aria-label={industriesServedContent.accessibleLabel}
        className={cn(
          'group/strip overflow-hidden py-[30px]',
          // Fade the strip out at both edges.
          '[mask-image:linear-gradient(to_right,transparent_0%,#000_7%,#000_93%,transparent_100%)]',
        )}
      >
        <div
          className={cn(
            'flex w-max gap-[26px] will-change-transform',
            'animate-served-scroll max-bs-md:animate-served-scroll-sm max-bs-md:gap-[18px]',
            'motion-reduce:animate-none',
            'group-hover/strip:[animation-play-state:paused]',
          )}
        >
          <ServedTrack industries={servedIndustries} />
          <ServedTrack industries={servedIndustries} />
        </div>
      </div>
    </section>
  );
}
