import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { FeatureColumnSide, FeatureHighlight } from '@/types/features';

export interface FeatureCardProps {
  readonly highlight: FeatureHighlight;
  /** Which column this card belongs to; mirrors its internal order. */
  readonly side: FeatureColumnSide;
}

/**
 * One capsule in the "Why businesses choose us" grid.
 *
 * The two columns mirror each other around the centre ornament: left-column
 * cards push their content to the trailing edge with the icon after the title,
 * right-column cards lead with the icon. Below 768px both collapse to the same
 * left-aligned reading order, because a right-aligned card next to a
 * left-aligned one looks like a mistake once they are stacked in one column.
 *
 * The card is a stack of three layers: a 5% white sheen over a 40px backdrop
 * blur, a grain texture, and a 1px gradient hairline drawn as a masked frame —
 * a gradient cannot be a real border and still follow the corner radius.
 *
 * @param props - See {@link FeatureCardProps}.
 */
export function FeatureCard({ highlight, side }: FeatureCardProps) {
  const isLeft = side === 'left';

  const icon = (
    <span
      className={cn(
        'inline-flex size-[52px] shrink-0 items-center justify-center rounded-full bg-ink/30',
      )}
    >
      <Image
        src={highlight.icon.src}
        alt={highlight.icon.alt}
        width={highlight.icon.width}
        height={highlight.icon.height}
        aria-hidden="true"
        className="size-6 transition-transform duration-300 ease-out group-hover:[transform:rotateY(180deg)]"
      />
    </span>
  );

  const title = (
    <h3
      className={cn(
        'm-0 font-heading text-[21px] leading-8 tracking-[-0.03em] text-white',
        'max-bs-xl:text-[19px] max-lg:text-[17px] max-bs-lg:text-xl max-bs-md:text-[19px]',
        isLeft && 'text-end max-bs-md:text-left',
      )}
    >
      {highlight.titleLines[0]}
      <br />
      {highlight.titleLines[1]}
    </h3>
  );

  return (
    <div className="group relative overflow-hidden rounded-[10px] shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]">
      <div
        className={cn(
          'relative isolate flex flex-wrap items-center gap-5 px-[15px] py-[19px]',
          'bg-glass-sheen backdrop-blur-[40px]',
          'max-bs-xl:gap-[14px] max-bs-xl:px-[10px]',
          isLeft && 'justify-end max-bs-md:flex-row-reverse max-bs-md:justify-start',
        )}
      >
        {/* Grain — `.xb-feature-item .xb-item--inner::before`. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-feature-noise bg-cover bg-no-repeat"
        />
        {/* 1px gradient hairline — `.xb-border::after`. */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
            '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
          )}
        />

        {isLeft ? (
          <>
            {title}
            {icon}
          </>
        ) : (
          <>
            {icon}
            {title}
          </>
        )}
      </div>
    </div>
  );
}
