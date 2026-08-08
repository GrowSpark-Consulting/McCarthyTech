import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent, ServiceTech } from '@/types/service-detail';

/** DOM id the hero's scroll cue targets. */
export const TECH_ROW_ID = 'tech-stack';

export interface ServiceTechRowProps {
  /** Technologies to display, in render order. */
  readonly tech: readonly ServiceTech[];
  /** Accent theme for the monogram tiles. */
  readonly accent: ServiceAccent;
}

/**
 * The technology row directly beneath the hero.
 *
 * Each entry is an original monogram tile paired with the technology's name,
 * rather than a vendor logo. Two reasons: stating which technologies a team
 * works in is plain fact and needs no artwork, and a row of nine third-party
 * marks would mean nine more image requests for something a two-character tile
 * communicates just as well at a fraction of the weight.
 *
 * A Server Component with no JavaScript at all — the hover lift is a CSS
 * transition on a `group`.
 *
 * The list is labelled rather than left as bare items so a screen reader
 * announces what the row is before reading three names out of context.
 *
 * @param props - See {@link ServiceTechRowProps}.
 */
export function ServiceTechRow({ tech, accent }: ServiceTechRowProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <div id={TECH_ROW_ID} className="mt-16 max-bs-md:mt-12">
      <h2 className="sr-only">Technologies we build with</h2>
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-3 p-0">
        {tech.map((item) => (
          <li key={item.id}>
            <span
              className={cn(
                'group flex items-center gap-3 rounded-full border border-white/[0.08]',
                'bg-svc-card py-2.5 pl-2.5 pr-6 transition-colors duration-500 ease-out',
                accentClasses.cardHover,
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full bg-svc-well',
                  'font-heading text-sm leading-none tracking-[-0.02em]',
                  accentClasses.text,
                )}
              >
                {item.monogram}
              </span>
              <span className="whitespace-nowrap text-sm text-white">{item.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
