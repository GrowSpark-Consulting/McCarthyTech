'use client';

import { BrandLogo } from '@/components/layout/brand-logo';
import { DesktopNav } from '@/components/layout/desktop-nav';
import { MobileNavToggle } from '@/components/layout/mobile-nav-toggle';
import { PillButton } from '@/components/ui/pill-button';
import { Container } from '@/components/ui/container';
import { headerCta } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/**
 * Chrome for the two header presentations.
 *
 * `floating` is the glassmorphic capsule that sits over the hero: a translucent
 * dark fill, a blurred-and-saturated backdrop, a hairline border that brightens
 * on hover, and a 60px radius that relaxes to 22px on small screens where a
 * full capsule would waste horizontal space.
 *
 * `pinned` strips all of that, because the wrapper around it already supplies
 * the frosted bar — leaving a capsule inside a bar would read as two stacked
 * surfaces.
 */
const BAR_VARIANT_CLASS = {
  floating: cn(
    'rounded-glass border border-white/[0.12] bg-glass/[0.28] px-[34px] py-2 shadow-glass',
    'backdrop-blur-glass backdrop-saturate-glass',
    'transition-[background-color,border-color] duration-glass ease-out hover:border-white/20',
    'max-bs-lg:rounded-glass-sm max-bs-lg:px-5 max-bs-lg:py-1.5',
  ),
  pinned: 'border-0 bg-transparent px-0 py-0 shadow-none',
} as const;

export interface HeaderBarProps {
  /** Which presentation to render. */
  readonly variant: keyof typeof BAR_VARIANT_CLASS;
  /** Opens the mobile drawer. */
  readonly onOpenDrawer: () => void;
  /** Whether the drawer is open, for the toggle's `aria-expanded`. */
  readonly isDrawerOpen: boolean;
  /** The drawer's DOM id, for the toggle's `aria-controls`. */
  readonly drawerId: string;
  /** Whether the brand mark should be fetched at high priority. */
  readonly logoPriority?: boolean;
}

/**
 * The header's contents, shared by the floating and pinned presentations.
 *
 * Extracting it means the two headers are one component rendered twice, so the
 * nav links, CTA, and logo can never drift between them.
 *
 * Visibility follows the reference exactly: the desktop nav appears from 992px,
 * the "join now" pill from 1200px, and the hamburger below 992px — so there is
 * always exactly one way to reach the navigation at every width.
 *
 * @param props - See {@link HeaderBarProps}.
 */
export function HeaderBar({
  variant,
  onOpenDrawer,
  isDrawerOpen,
  drawerId,
  logoPriority = false,
}: HeaderBarProps) {
  return (
    <Container width="shell">
      <div className={cn('flex items-center justify-between gap-4', BAR_VARIANT_CLASS[variant])}>
        <BrandLogo priority={logoPriority} />
        <DesktopNav />
        <PillButton href={headerCta.href} label={headerCta.label} className="max-bs-xl:hidden" />
        <MobileNavToggle onOpen={onOpenDrawer} isOpen={isDrawerOpen} controls={drawerId} />
      </div>
    </Container>
  );
}
