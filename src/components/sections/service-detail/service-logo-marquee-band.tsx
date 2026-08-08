import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** DOM id the label carries, referenced by the section's `aria-labelledby`. */
const HEADING_ID = 'service-logo-marquee-heading';

/**
 * `.ac-brand-marquee::after` — the hairline that rules the strip top and bottom.
 *
 * A gradient rather than a flat line, fading to nothing at both ends so the rule
 * never meets the viewport edge with a visible stop.
 */
const RULE = cn(
  "absolute inset-x-0 h-px content-['']",
  'bg-[linear-gradient(90deg,rgba(0,2,15,0.01)_0%,rgba(255,255,255,0.3)_52.02%,rgba(0,2,15,0.01)_100%)]',
);

export interface ServiceLogoMarqueeBandProps {
  /** The service being rendered. Must carry a `logoMarqueeBand`. */
  readonly service: ServiceDetail;
}

/**
 * The scrolling strip of client logos.
 *
 * **The list is rendered twice.** `marquee-x` translates the track exactly
 * `-50%`, so at the loop point the second copy sits precisely where the first
 * started and the seam is invisible. One copy would snap back; anything other
 * than two would not land on a whole logo.
 *
 * Only the first copy is exposed: the strip carries a single summarising label
 * and the duplicate track is `aria-hidden`, so a screen reader hears the claim
 * once rather than twenty-two logo filenames twice.
 *
 * A Server Component — the scroll is one CSS animation, paused entirely under
 * `prefers-reduced-motion`.
 *
 * @param props - See {@link ServiceLogoMarqueeBandProps}.
 */
export function ServiceLogoMarqueeBand({ service }: ServiceLogoMarqueeBandProps) {
  const { logoMarqueeBand } = service;

  if (logoMarqueeBand === undefined) return null;

  const { eyebrow, logos } = logoMarqueeBand;

  return (
    <section aria-labelledby={HEADING_ID}>
      <Container>
        <div className="mb-[30px] text-center">
          <h2
            id={HEADING_ID}
            className="inline-flex items-center gap-2.5 font-body text-base font-normal uppercase text-white"
          >
            <Image
              src="/assets/img/icon/sub-left-icon.png"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            {eyebrow}
            <Image
              src="/assets/img/icon/sub-right-icon.png"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </h2>
        </div>
      </Container>

      {/* `.ac-brand-marquee` */}
      <div
        className={cn(
          'relative overflow-hidden bg-ink py-9',
          `before:top-0 ${RULE}`,
          `after:bottom-0 ${RULE}`,
        )}
      >
        <div className="flex w-max animate-marquee-x motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              // The second run exists only to make the loop seamless.
              aria-hidden={copy === 1 ? 'true' : undefined}
              className="mr-[60px] flex shrink-0 items-center gap-[60px]"
            >
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="block max-w-[105px] shrink-0 opacity-50 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image src={logo} alt="" width={105} height={40} className="h-auto w-full" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
