import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { HeadingSegment } from '@/types/about';

export interface DecoratedHeadingProps {
  /** Ordered mix of text runs and inline ornaments. */
  readonly segments: readonly HeadingSegment[];
  readonly className?: string;
  /** DOM id, so a section can label itself with this heading. */
  readonly id?: string;
}

/**
 * A heading whose text flows around inlaid animated ornaments.
 *
 * Each ornament sits in a fixed-size inline slot with the image absolutely
 * positioned inside it. That indirection is what lets the artwork overflow its
 * slot (the first one is sized at 180% and bleeds left) without disturbing the
 * surrounding line breaks — the slot reserves exactly the space the layout
 * expects while the image is free to sit wherever the design wants it.
 *
 * The ornaments are purely decorative: each carries an empty `alt` and its slot
 * is `aria-hidden`, so a screen reader reads one clean sentence rather than
 * three interruptions. Text runs preserve their leading and trailing spaces,
 * which is what keeps the words from butting against the artwork.
 *
 * @param props - See {@link DecoratedHeadingProps}.
 */
export function DecoratedHeading({ segments, className, id }: DecoratedHeadingProps) {
  return (
    <h2 id={id} className={className}>
      {segments.map((segment, index) => {
        if (segment.kind === 'text') {
          // Index is a safe key here: the segment list is static content,
          // never reordered or filtered at runtime.
          return <span key={`text-${index}`}>{segment.value}</span>;
        }

        return (
          <span
            key={segment.asset.src}
            aria-hidden="true"
            className={cn('relative inline-block', segment.slotClassName)}
          >
            <Image
              src={segment.asset.src}
              alt={segment.asset.alt}
              width={segment.asset.width}
              height={segment.asset.height}
              // Animated GIFs must bypass the optimiser: Next's pipeline
              // re-encodes them to a single still frame, which would silently
              // kill the animation these ornaments exist for.
              unoptimized
              className={cn('-z-10', segment.imageClassName)}
            />
          </span>
        );
      })}
    </h2>
  );
}
