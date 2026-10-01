import { TeamCard, type TeamCardSize } from '@/components/sections/team-page/team-card';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { cn } from '@/lib/utils';
import type { TeamGroupContent, TeamMember } from '@/types/team';

/** Seconds between neighbouring cards' entrances. */
const CARD_STAGGER_S = 0.1;

/**
 * Column widths per card size, net of the 20px gutters.
 *
 * Flex-wrap rather than a grid so a short last row is centred instead of
 * left-hanging — three leaders at two-up, or a team that does not divide by
 * four. In the single phone column each card is capped, so a portrait is not
 * blown up to the full screen width.
 */
const ITEM_WIDTH: Record<TeamCardSize, string> = {
  lead: cn(
    'w-full max-w-[360px]',
    'bs-sm:w-[calc((100%-20px)/2)] bs-sm:max-w-none',
    'bs-lg:w-[calc((100%-40px)/3)]',
  ),
  member: cn(
    'w-full max-w-[360px]',
    'bs-sm:w-[calc((100%-20px)/2)] bs-sm:max-w-none',
    'bs-lg:w-[calc((100%-60px)/4)]',
  ),
};

/** Most columns each size reaches, so the stagger restarts on every row. */
const MAX_COLUMNS: Record<TeamCardSize, number> = { lead: 3, member: 4 };

export interface TeamGroupProps {
  readonly content: TeamGroupContent;
  readonly members: readonly TeamMember[];
  readonly size: TeamCardSize;
  readonly className?: string;
}

/**
 * One titled group of cards — a `.sec-title.text-center` over a `.row`.
 *
 * Renders nothing for an empty group, so leaving a list empty in
 * `lib/team-page.ts` removes its heading too.
 *
 * @param props - See {@link TeamGroupProps}.
 */
export function TeamGroup({ content, members, size, className }: TeamGroupProps) {
  if (members.length === 0) return null;

  const eyebrowId = `${content.id}-eyebrow`;

  /*
   * Named by eyebrow and heading together. "Our Team" alone would give this
   * region the same accessible name as the page's "Our team" title band, and
   * two identically named landmarks cannot be told apart in a screen reader's
   * landmark list.
   */
  return (
    <section aria-labelledby={`${eyebrowId} ${content.id}`} className={className}>
      <div className="mb-[50px] text-center max-bs-md:mb-[30px]">
        <SectionEyebrow id={eyebrowId} className="mb-[15px]">
          {content.eyebrow}
        </SectionEyebrow>
        <h2
          id={content.id}
          className={cn(
            'font-heading font-normal tracking-[-0.08em] text-white',
            'text-[62px] max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px] max-[480px]:text-[28px]',
            'leading-[1.3]',
          )}
        >
          {content.title}
        </h2>
      </div>

      {/*
       * Capped at 960px — the grid container's `bs-lg` width — so four cards
       * stay compact on wide screens instead of stretching to 1320px.
       */}
      <ul
        role="list"
        className="m-0 mx-auto flex max-w-[960px] list-none flex-wrap justify-center gap-5 p-0"
      >
        {members.map((member, index) => (
          <li key={member.id} className={ITEM_WIDTH[size]}>
            <ScrollReveal
              variant="rise"
              delay={(index % MAX_COLUMNS[size]) * CARD_STAGGER_S}
              className="h-full"
            >
              <TeamCard member={member} size={size} />
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
