import Image from 'next/image';
import { Linkedin, UserRound } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { TeamMember } from '@/types/team';

/** `lead` is the board's `.xb-team-item-big`; `member` the regular card. */
export type TeamCardSize = 'lead' | 'member';

export interface TeamCardProps {
  readonly member: TeamMember;
  readonly size: TeamCardSize;
}

/**
 * One person — `.xb-team-item` in the reference.
 *
 * A dark framed card: the portrait sits inset within it on its own rounded
 * corners, with the name, designation and a small round LinkedIn button
 * beneath. Board cards use a square portrait and larger type; the rest use a
 * 4:5 portrait. The card stretches to its row's height, so a longer
 * designation never leaves its neighbours short.
 *
 * Hover lifts the card a few pixels, firms up its border, eases the portrait
 * in and fills the button with lime. Nothing is revealed on hover alone: the
 * button is always visible, so it is reachable by touch and by keyboard.
 *
 * Without an `image` the frame shows a neutral silhouette rather than a stock
 * face, so a placeholder can never be mistaken for a real colleague.
 *
 * @param props - See {@link TeamCardProps}.
 */
export function TeamCard({ member, size }: TeamCardProps) {
  const isLead = size === 'lead';
  const nameId = `team-${member.id}-name`;

  return (
    <article
      aria-labelledby={nameId}
      className={cn(
        'group flex h-full flex-col rounded-[10px] border border-white/15 bg-surface',
        'transition-[transform,border-color] duration-500 ease-out',
        'focus-within:border-white/35 hover:-translate-y-1.5 hover:border-white/35',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        isLead ? 'p-5 max-bs-lg:p-4' : 'p-[18px] max-bs-lg:p-4',
      )}
    >
      {/* Portrait — `.xb-item--img`. */}
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-svc-well',
          isLead ? 'aspect-square' : 'aspect-[4/5]',
        )}
      >
        {member.image === undefined ? (
          <div className="flex size-full items-center justify-center bg-svc-card">
            <UserRound aria-hidden="true" strokeWidth={1} className="size-[42%] text-white/20" />
          </div>
        ) : (
          <Image
            src={member.image}
            alt={`Portrait of ${member.name}`}
            fill
            sizes={isLead ? '(max-width: 575px) 360px, 320px' : '(max-width: 575px) 360px, 260px'}
            className={cn(
              'object-cover object-top',
              'transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none',
            )}
          />
        )}
      </div>

      {/* Caption — `.xb-item--holder`. */}
      <div className={cn('flex items-center justify-between gap-3', isLead ? 'mt-5' : 'mt-4')}>
        <div className="min-w-0">
          <h3
            id={nameId}
            className={cn(
              'break-words font-heading font-normal tracking-[-0.04em] text-white',
              isLead ? 'text-2xl max-bs-lg:text-[22px]' : 'text-lg',
              'leading-[1.25]',
            )}
          >
            {member.name}
          </h3>
          <p className={cn('mt-1 leading-snug text-white/70', isLead ? 'text-sm' : 'text-[13px]')}>
            {member.role}
          </p>
        </div>

        {/*
         * The circle is 32px to stay secondary to the name; the `after:` box
         * widens its hit area to the 44px touch minimum. Without a profile URL
         * it is drawn as an inert, muted mark — never a link that goes nowhere —
         * so the card keeps its composition until the URL is filled in.
         */}
        {member.linkedinUrl === undefined ? (
          <span
            aria-hidden="true"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink text-white/35"
          >
            <Linkedin className="size-3.5" />
          </span>
        ) : (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
            className={cn(
              'relative inline-flex size-8 shrink-0 items-center justify-center rounded-full',
              "after:absolute after:-inset-1.5 after:content-['']",
              'border border-white/15 bg-ink text-white',
              'transition-colors duration-300 ease-out',
              'hover:border-lime hover:bg-lime hover:text-ink group-hover:border-lime/60',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
            )}
          >
            <Linkedin aria-hidden="true" className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
