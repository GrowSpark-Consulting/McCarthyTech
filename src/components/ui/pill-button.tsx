import { AppLink } from '@/components/ui/app-link';

import { cn } from '@/lib/utils';

export interface PillButtonProps {
  /** Destination route. */
  readonly href: string;
  /** Visible label. Uppercased by CSS, so author it in natural casing. */
  readonly label: string;
  /** Extra classes for the anchor. */
  readonly className?: string;
}

/**
 * The compact lime pill pinned to the right of the desktop header ("join now").
 *
 * On hover a white sheet scales up vertically from the pill's centre and fills
 * it. The sheet is a separate absolutely-positioned layer rather than a
 * background-colour transition because scaling a layer is compositor-only,
 * whereas cross-fading `background-color` repaints on every frame.
 *
 * The label is lifted into its own stacking layer so the sheet passes behind the
 * text rather than over it.
 *
 * @param props - See {@link PillButtonProps}.
 */
export function PillButton({ href, label, className }: PillButtonProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        'group relative z-[3] inline-flex items-center justify-center overflow-clip',
        'rounded-full px-[30px] py-[17px]',
        'bg-lime font-body text-sm font-bold uppercase leading-[1.1] text-ink',
        'transition-colors duration-300 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 rounded-full bg-white',
          'scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100',
        )}
      />
      <span className="relative">{label}</span>
    </AppLink>
  );
}
