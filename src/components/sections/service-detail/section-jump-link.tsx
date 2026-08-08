'use client';

import { useCallback } from 'react';

import { useSmoothScroll } from '@/components/shared/smooth-scroll-provider';
import { ChevronDownGlyph } from '@/components/ui/chevron-down-glyph';
import { cn } from '@/lib/utils';

export interface SectionJumpLinkProps {
  /** Id of the section to travel to. */
  readonly targetId: string;
  /** Visible label beside the chevron. */
  readonly label: string;
  readonly className?: string;
}

/**
 * `.down-arrow.scrollspy-btn` — the corner cue that drops to the next band.
 *
 * A real `<a href="#id">`, unlike the hero's cue, which had to be a button
 * because its target did not exist. This one resolves, so it keeps anchor
 * semantics: it is announced as a link, it works from the keyboard for free, and
 * without JavaScript it still jumps to the right place.
 *
 * The click is intercepted only to route the travel through Lenis. `globals.css`
 * deliberately leaves `scroll-behavior: auto`, because a native smooth scroll
 * runs alongside Lenis's own loop and the two fight; the default jump is
 * therefore instant, and this restores the easing the reference has.
 *
 * @param props - See {@link SectionJumpLinkProps}.
 */
export function SectionJumpLink({ targetId, label, className }: SectionJumpLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(targetId);
      if (target === null) return;

      event.preventDefault();
      scrollTo(target);
    },
    [targetId, scrollTo],
  );

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-[6px] font-medium uppercase text-white',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
        className,
      )}
    >
      <ChevronDownGlyph />
      {label}
    </a>
  );
}
