import { AppLink } from '@/components/ui/app-link';
import { DiagonalArrowGlyph } from '@/components/ui/diagonal-arrow-glyph';
import { cn } from '@/lib/utils';

/**
 * `.thm-btn.chatbot-btn` — the CTA the two-column heroes use.
 *
 * Distinct from both the site's lime `AgencyButton` and the white `WipeButton`:
 * a dark navy pill with a hairline gradient edge, a glow that slides out of
 * frame on hover, and a round ink button holding the same diagonal arrow the
 * offering cards use.
 *
 * The arrow choreography is the `.thm-btn` pattern — the resting glyph flies out
 * to the north-east while an identical one arrives from the south-west 100ms
 * behind it, so the two never occupy the same spot mid-flight.
 *
 * The `::after` hairline is a masked gradient frame rather than a border,
 * because a border cannot hold a gradient: the pseudo-element is filled with the
 * gradient, then `mask-composite: exclude` punches out everything but a 1px
 * inset ring.
 */
const BASE = cn(
  'group relative z-[1] inline-flex items-center justify-center self-center overflow-clip',
  'rounded-cta bg-[#060E50] font-body text-base font-bold uppercase leading-[1.1] tracking-normal text-white',
  'gap-[27px] py-[7px] pl-5 pr-[7px] transition-all duration-300',
  'max-bs-md:gap-2.5 max-bs-md:pl-2.5',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
  // The masked gradient hairline.
  "after:pointer-events-none after:absolute after:inset-0 after:-z-[1] after:rounded-cta after:p-px after:content-['']",
  'after:bg-hairline after:[mask-composite:exclude] after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
);

export interface ThmButtonProps {
  /** Destination route. */
  readonly href: string;
  /** Visible label, uppercased by CSS. */
  readonly label: string;
  readonly className?: string;
}

/**
 * The two-column heroes' call to action.
 *
 * A Server Component — the whole hover sequence is CSS driven off one `group`.
 *
 * @param props - See {@link ThmButtonProps}.
 */
export function ThmButton({ href, label, className }: ThmButtonProps) {
  return (
    <AppLink href={href} className={cn(BASE, className)}>
      {/* `.btn-bg` — a radial glow that slides left and out of frame on hover. */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-0 -z-[1] size-full transition-all duration-300',
          'bg-[radial-gradient(circle_at_100%_50%,rgba(196,240,18,0.55)_0%,rgba(0,2,15,0)_60%)]',
          'group-hover:left-[-100px]',
        )}
      />

      {label}

      <span className="relative size-[46px] shrink-0 overflow-hidden rounded-full bg-ink">
        <DiagonalArrowGlyph
          className={cn(
            'absolute left-[9px] top-[10px] size-7 text-white',
            'transition-transform duration-300 group-hover:-translate-y-[30px] group-hover:translate-x-[30px]',
          )}
        />
        <DiagonalArrowGlyph
          className={cn(
            'absolute left-[9px] top-[10px] size-7 -translate-x-[30px] translate-y-[30px] text-white',
            'transition-transform duration-300 group-hover:delay-100',
            'group-hover:translate-x-0 group-hover:translate-y-0',
          )}
        />
      </span>
    </AppLink>
  );
}
