import {
  Layers,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ServiceIconKey } from '@/types/service-sections';

/**
 * Icon key → Lucide component.
 *
 * An explicit lookup rather than a dynamic import keyed on a string: the latter
 * forces the bundler to keep every icon in the library reachable, which is over a
 * thousand components. This way the build includes exactly these eight.
 *
 * `Record<ServiceIconKey, …>` means adding a key to the union without mapping it
 * fails the build rather than rendering nothing.
 */
const ICON_COMPONENTS: Record<ServiceIconKey, LucideIcon> = {
  smartphone: Smartphone,
  monitor: Monitor,
  layers: Layers,
  penTool: PenTool,
  rocket: Rocket,
  palette: Palette,
  shield: ShieldCheck,
  zap: Zap,
};

export interface ServiceIconProps {
  /** Which glyph to draw. */
  readonly icon: ServiceIconKey;
  /** Classes for the surrounding tile — pass the accent's text colour here. */
  readonly className?: string;
}

/**
 * A glyph in a rounded tile, used by the offerings and reasons grids.
 *
 * The reference sets emoji into these cards. Lucide's stroked glyphs are used
 * instead: emoji render as a different typeface on every platform and are
 * announced aloud by screen readers, so a decorative rocket becomes the words
 * "rocket" mid-sentence. The tile is `aria-hidden` — the card's own heading
 * already names it.
 *
 * @param props - See {@link ServiceIconProps}.
 */
export function ServiceIcon({ icon, className }: ServiceIconProps) {
  const Glyph = ICON_COMPONENTS[icon];

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center rounded-[14px]',
        'border border-white/[0.08] bg-svc-well',
        className,
      )}
    >
      <Glyph className="size-[22px]" strokeWidth={1.6} />
    </span>
  );
}
