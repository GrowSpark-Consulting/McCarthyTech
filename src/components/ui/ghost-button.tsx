import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';

export interface GhostButtonProps {
  /** Destination route. */
  readonly href: string;
  /** Visible label. Uppercased by CSS, so author it in natural casing. */
  readonly label: string;
  /**
   * Hover treatment, supplied by the caller.
   *
   * Left open rather than hard-coded because the services hub is always mint
   * while each detail page carries its own accent — see
   * `SERVICE_ACCENT_CLASSES[accent].ghostHover`.
   */
  readonly hoverClassName?: string;
  /** Extra classes for the outer element. */
  readonly className?: string;
  /**
   * Visually hidden text appended to the label.
   *
   * Same purpose as {@link AgencyButtonProps.srSuffix}: several pages share the
   * label "All services", and Lighthouse's `link-text` audit reads `innerText`,
   * so an `aria-label` alone would still report them as duplicates.
   */
  readonly srSuffix?: string;
}

/**
 * The outlined counterpart to {@link AgencyButton}.
 *
 * Same geometry as the primary CTA — identical `rounded-cta` radius and vertical
 * padding — so the two sit on one optical baseline when paired. It carries a
 * hairline border and no fill, which is what keeps the visual hierarchy between
 * them unambiguous.
 *
 * Extracted from the services hub, which had this styling written inline; the
 * detail heroes need the same control, and a second hand-typed copy is how the
 * two end up with different padding after one of them is tweaked.
 *
 * @param props - See {@link GhostButtonProps}.
 */
export function GhostButton({
  href,
  label,
  hoverClassName = 'hover:border-mint hover:text-mint',
  className,
  srSuffix,
}: GhostButtonProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        'inline-flex items-center self-center rounded-cta border border-white/20 px-8 py-[21px]',
        'font-body text-base font-bold uppercase leading-[1.1] text-white',
        'transition-colors duration-300 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
        hoverClassName,
        className,
      )}
    >
      {label}
      {srSuffix === undefined ? null : <span className="sr-only">{srSuffix}</span>}
    </AppLink>
  );
}
