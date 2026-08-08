import Image from 'next/image';

import { StreamPanels } from '@/components/sections/industries/stream-panels';
import { StreamPill } from '@/components/sections/industries/stream-pill';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { aiStreamContent, streamRows } from '@/lib/industries';
import { cn } from '@/lib/utils';
import type { StreamEntry, StreamRow } from '@/types/industries';

/**
 * Minimum pills per half-track.
 *
 * All five rows start at the same x, but the visible window is centred on the
 * widest of them. The two stat rows hold only four entries each, so at that
 * centre they had already run out of content and rendered as blank columns.
 * Tiling every row up to this count makes them comparable in length; the count
 * is per *half*, so both halves stay identical and the `-50%` loop still lands
 * seam-free.
 */
const MIN_ENTRIES_PER_HALF = 8;

/**
 * The four decorative rails — `.xb-gradiant-line span`.
 *
 * Two flank each side of the stream at differing heights, and each fades on its
 * own 0.9s-offset schedule so they never pulse in unison.
 */
const RAIL_POSITIONS = [
  'left-[8%] top-[25px] max-bs-lg:top-[18%] max-bs-md:left-[5%] max-bs-md:top-[20%]',
  'left-[18%] top-[21%] max-bs-lg:top-[30%] max-bs-md:left-[14%] max-bs-md:top-[35%]',
  'right-[8%] top-[25px] max-bs-lg:top-[18%] max-bs-md:right-[5%] max-bs-md:top-[20%]',
  'right-[18%] top-[26%] max-bs-lg:top-[30%] max-bs-md:right-[14%] max-bs-md:top-[35%]',
] as const;

const RAIL_DELAYS = [
  '',
  '[animation-delay:0.9s]',
  '[animation-delay:1.8s]',
  '[animation-delay:2.7s]',
] as const;

/**
 * Repeats a row's entries until it holds at least {@link MIN_ENTRIES_PER_HALF}.
 *
 * Whole repetitions only — a partial tail would break the two halves' symmetry
 * and put a visible jump in the loop.
 */
function tileEntries(entries: readonly StreamEntry[]): readonly StreamEntry[] {
  if (entries.length === 0) return entries;
  const repeats = Math.ceil(MIN_ENTRIES_PER_HALF / entries.length);
  return Array.from({ length: repeats }, () => entries).flat();
}

/**
 * One scrolling row of pills.
 *
 * The half-track is rendered twice so the `-50%` travel lands the second copy
 * exactly where the first began — the same seamless-loop trick the brand
 * marquee uses.
 */
function StreamTrack({ row }: { readonly row: StreamRow }) {
  const half = tileEntries(row.entries);

  return (
    <div
      className={cn(
        // `w-max` is load-bearing. As flex children these rows would otherwise
        // stretch to the width of the *longest* row, leaving the two shorter
        // stat rows with a tail of dead space — and making their `-50%` travel
        // half of the wrong width, so the loop showed a gap instead of tiling.
        'flex w-max items-center gap-[10px]',
        row.animationClass,
        'motion-reduce:animate-none',
        // Paused while the section is hovered, so a pill can actually be read.
        'group-hover/stream:[animation-play-state:paused]',
      )}
    >
      {[...half, ...half].map((entry, index) => (
        <StreamPill key={`${entry.text}-${index}`} entry={entry} />
      ))}
    </div>
  );
}

/**
 * "Real-time AI for smarter business" — a simulated live API traffic feed.
 *
 * The illusion is built from one trick: five ordinary horizontal marquees are
 * placed in a container rotated `-90deg`, so their horizontal travel reads as
 * five vertical columns of traffic streaming past. Rows two and four run in
 * `reverse`, and all five are on different durations — that mismatch is what
 * stops the columns moving as one block.
 *
 * Rows 1–3 carry API traffic; rows 4–5 carry company stats in the same pill
 * shape. A vertical mask fades the stream out at both ends so pills dissolve
 * rather than being cut off.
 *
 * Around it sit the pieces that make the section read as an instrument panel:
 * four breathing rails behind, two monospace read-out panels either side, and
 * the circuit traces fanning down into the glowing logo badge.
 *
 * The stream itself is server-rendered with no JavaScript — every motion is a
 * CSS keyframe and pause-on-hover is a `:hover` rule. Only `StreamPanels`
 * hydrates, because its read-outs tick.
 */
export function AiStreamSection() {
  return (
    <section
      aria-labelledby="ai-stream-heading"
      className="relative bg-industries-stage bg-cover bg-center bg-no-repeat pb-[50px] pt-[145px] max-bs-md:pt-20"
    >
      <Container>
        <div className="mb-10 text-center">
          <SectionEyebrow className="mb-[15px]">{aiStreamContent.eyebrow}</SectionEyebrow>
          <h2
            id="ai-stream-heading"
            className={cn(
              'block font-heading text-[62px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
            )}
          >
            {aiStreamContent.heading}
          </h2>
        </div>

        {/* Four faint vertical rails, breathing out of phase behind the stream. */}
        <div aria-hidden="true">
          {RAIL_POSITIONS.map((position, index) => (
            <span
              key={position}
              className={cn(
                'absolute -z-10 h-[780px] w-px bg-indus-rail',
                'animate-indus-twinkle motion-reduce:animate-none',
                position,
                RAIL_DELAYS[index],
                'max-bs-md:hidden',
              )}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative w-full bs-lg:max-w-[66.666%] bs-xl:max-w-[50%]">
            <StreamPanels />
            <div
              role="img"
              aria-label={aiStreamContent.accessibleLabel}
              className={cn(
                'group/stream relative mb-[30px] h-[590px] overflow-hidden',
                'max-bs-xl:mb-5 max-bs-lg:mb-[30px]',
                'max-bs-md:mb-10 max-bs-md:h-[420px] bs-sm:max-bs-md:h-[590px]',
                // Soften both ends of the stream.
                '[mask-image:linear-gradient(to_bottom,transparent_0%,#000_12%,#000_92%,transparent_100%)]',
              )}
            >
              {/* Rotating the whole block turns five horizontal marquees into
                  five vertical traffic columns: the stack's *height* becomes the
                  visible width, and each row's length becomes its travel.

                  It must be absolutely centred. `w-max` makes the un-rotated box
                  thousands of pixels wide, so a plain in-flow `rotate(-90deg)`
                  spins it about a centre far off to the right and the whole band
                  lands outside the frame — which is exactly why this section
                  rendered blank. Anchoring at 50%/50% and translating by half its
                  own size first puts the centre of rotation at the centre of the
                  frame. */}
              <div
                className={cn(
                  'absolute left-1/2 top-1/2 flex w-max flex-col items-start gap-[15px]',
                  '-translate-x-1/2 -translate-y-1/2 -rotate-90',
                )}
              >
                {streamRows.map((row) => (
                  <StreamTrack key={row.id} row={row} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Circuit traces fanning down from the stream into the badge, with the
          logo sitting over their junction. The traces are one PNG; the travelling
          charge is a gradient masked to that PNG's silhouette and blended with
          `screen`, so only the trace lines light up. */}
      <div aria-hidden="true" className="relative isolate">
        {/* Traces sit at z-0, not a negative index — the section paints its own
            background image, and anything below zero disappears behind it.
            `isolate` on this wrapper keeps the layering local. */}
        <div
          className={cn(
            // The trace artwork is portrait (649x991). Rendered at its natural
            // width, as the reference does — scaling it to the container width
            // would make it nearly 1800px tall and run the traces up through the
            // heading.
            'pointer-events-none absolute -bottom-[13px] left-1/2 z-0 w-[649px] max-w-[90%]',
            '-translate-x-1/2 max-bs-md:bottom-3',
          )}
        >
          <Image
            src="/assets/img/shape/indus-shape.png"
            alt=""
            width={649}
            height={991}
            className="h-auto w-full"
          />
          <span
            className={cn(
              'pointer-events-none absolute inset-0 bg-indus-charge bg-[length:100%_200%] bg-no-repeat',
              'animate-indus-line-flow [mix-blend-mode:screen] motion-reduce:animate-none',
              '[mask:url(/assets/img/shape/indus-shape.png)_center/contain_no-repeat]',
            )}
          />
        </div>

        <div className="relative z-[1] mx-auto pb-24 pt-10 text-center max-bs-md:pb-14">
          <span
            className={cn(
              'pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[300px] rounded-full',
              'animate-indus-logo-glow bg-indus-halo motion-reduce:animate-none',
            )}
          />
          <Image
            src="/assets/img/industries/indus-logo.png"
            alt=""
            width={300}
            height={300}
            className="mx-auto h-auto w-[300px] animate-indus-logo-illum motion-reduce:animate-none max-bs-md:w-[180px]"
          />
        </div>
      </div>
    </section>
  );
}
