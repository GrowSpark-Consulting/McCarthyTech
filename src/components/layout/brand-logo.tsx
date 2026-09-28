import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';

import { brandLogo, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export interface BrandMarkProps {
  /**
   * Sizes the box the mark is drawn into. Set one dimension and `auto` on the
   * other; the file's aspect ratio supplies the rest.
   */
  readonly className?: string;
  /** Whether to fetch the image at high priority. */
  readonly priority?: boolean;
  /** `eager` fetches immediately without adding a preload to the head. */
  readonly loading?: 'eager' | 'lazy';
}

/**
 * The McCarthy Tech logo image, unframed and unlinked.
 *
 * Every placement draws the mark through this component, so there is exactly
 * one implementation of it. Only the box is ever sized — `object-contain` means
 * a box of any shape can neither stretch nor crop the mark.
 *
 * The alt text is empty: each placement is either inside a link that already
 * names the company, or purely decorative.
 *
 * @param props - See {@link BrandMarkProps}.
 */
export function BrandMark({ className, priority = false, loading }: BrandMarkProps) {
  return (
    <Image
      src={brandLogo.src}
      alt=""
      width={brandLogo.width}
      height={brandLogo.height}
      priority={priority}
      loading={loading}
      className={cn('object-contain', className)}
    />
  );
}

export interface BrandLogoProps {
  /**
   * Which surface the logo is rendering on. Only the mark's height differs
   * between the header bar and the mobile drawer.
   */
  readonly placement?: 'header' | 'drawer';
  /**
   * Whether to fetch the image at high priority. Set on the header instance
   * only — it is above the fold and part of the first meaningful paint.
   */
  readonly priority?: boolean;
  readonly className?: string;
}

/**
 * The McCarthy Tech logo, wrapped in a home link.
 *
 * The link's accessible name is the company name plus destination rather than
 * the bare alt text, so a screen-reader user hears where it goes. The image
 * carries an empty alt because the link already names it — announcing both
 * would read the brand twice.
 *
 * @param props - See {@link BrandLogoProps}.
 */
export function BrandLogo({ placement = 'header', priority = false, className }: BrandLogoProps) {
  return (
    <AppLink
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        'inline-flex shrink-0 items-center transition-opacity duration-300 ease-out hover:opacity-80',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime',
        className,
      )}
    >
      <BrandMark
        priority={priority}
        className={cn('w-auto', placement === 'header' ? 'h-11 max-bs-lg:h-9' : 'h-10')}
      />
    </AppLink>
  );
}
