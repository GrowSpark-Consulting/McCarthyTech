import { AppLink } from '@/components/ui/app-link';
import { StepArrowGlyph } from '@/components/ui/step-arrow-glyph';
import { cn } from '@/lib/utils';

export interface WipeButtonProps {
  /** Destination route. */
  readonly href: string;
  /** Visible label, authored in the casing it should render in. */
  readonly label: string;
  /**
   * Visually hidden text appended to the label.
   *
   * Every service page carries this same CTA, so in a crawler's link report they
   * are eight identical "Book a Free Discovery Session" entries pointing at one
   * URL. A hidden suffix makes each link's text content unique without changing
   * what is on screen — Lighthouse's `link-text` audit reads `innerText`, so an
   * `aria-label` alone would fix the accessible name and leave the audit failing.
   */
  readonly srSuffix?: string;
  readonly className?: string;
}

/**
 * `.ai-marketing-btn` — the square white CTA the service pages lead with.
 *
 * Three things move together on hover, all of them on the compositor and none of
 * them needing JavaScript:
 *
 * - A lime bar wipes left-to-right across the button's interior, inset 5px so it
 *   stops short of the edge and reads as a fill rather than a background swap.
 * - The label rolls up and out of a clipped box while an identical copy rolls in
 *   from below, so the text never appears to fade or redraw.
 * - The ink shifts from black to the canvas navy, which is what stops the label
 *   vibrating against the lime once the wipe has passed under it.
 *
 * The wipe is a `::before` rather than an element, exactly as the original
 * authors it. That keeps the DOM to what is semantically there — a link, an
 * icon, and two copies of one label — and it is why the button carries an
 * explicit `z-[1]`: the pseudo-element sits at `-z-[1]`, which only paints
 * behind the *content* rather than behind the whole button if the button owns
 * the stacking context.
 *
 * A Server Component. Both halves are spans inside one `AppLink`, so the whole
 * control is a single tab stop and a single hit target.
 *
 * @param props - See {@link WipeButtonProps}.
 */
export function WipeButton({ href, label, srSuffix, className }: WipeButtonProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        'group relative z-[1] inline-flex shrink-0 items-center gap-[15px]',
        'bg-white py-[5px] pl-[5px] pr-[15px]',
        'font-body text-base font-bold leading-7 tracking-normal',
        // `--color-black` at rest, `--color-secondary` on hover. Barely a shade
        // apart, and in the original.
        'text-black transition-colors duration-300 hover:text-ink',
        // The wipe.
        "before:absolute before:left-[5px] before:top-[5px] before:-z-[1] before:h-[50px] before:w-0 before:bg-lime before:content-['']",
        'before:transition-[width] before:duration-300 group-hover:before:w-[calc(100%-10px)]',
        // Neutralised for visitors who asked for less motion; the hover still
        // reads through the colour change alone.
        'motion-reduce:before:transition-none',
        className,
      )}
    >
      <span className="flex size-[50px] shrink-0 items-center justify-center bg-lime text-black">
        <StepArrowGlyph />
      </span>

      {/*
        The label roll. Both copies travel the same 30px — enough to clear the
        28px line box — so the incoming one arrives exactly as the outgoing one
        leaves and the text never appears to fade or redraw.
      */}
      <span className="relative flex overflow-hidden">
        <span
          className={cn(
            'transition-transform duration-300 group-hover:-translate-y-[30px]',
            'motion-reduce:transition-none',
          )}
        >
          {label}
          {srSuffix === undefined ? null : <span className="sr-only">{srSuffix}</span>}
        </span>

        {/*
          The incoming copy. Purely a visual double of the label above it, so it
          is hidden from assistive technology — otherwise every one of these
          buttons announces its own name twice.
        */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-0 top-0 translate-y-[30px]',
            'transition-transform duration-300 group-hover:translate-y-0',
            'motion-reduce:transition-none',
          )}
        >
          {label}
        </span>
      </span>
    </AppLink>
  );
}
