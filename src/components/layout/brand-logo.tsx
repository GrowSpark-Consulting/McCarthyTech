import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';

import { brandLogo, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

/** `.xb-header-logo img { max-width: 160px }` — the header's rendered cap. */
const HEADER_LOGO_MAX_WIDTH = 160;

/** `.xb-logo-mobile img { height: 40px }` — the drawer's rendered cap. */
const DRAWER_LOGO_HEIGHT = 40;

export interface BrandLogoProps {
  /**
   * Which surface the mark is rendering on. `header` caps by width, `drawer`
   * caps by height, matching the reference's two sizing rules.
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
 * The Grow Spark wordmark, wrapped in a home link.
 *
 * The link's accessible name is the company name plus destination rather than
 * the bare alt text, so a screen-reader user hears where it goes. The `<Image>`
 * itself carries an empty alt because the surrounding link already names it —
 * announcing both would read the brand twice.
 *
 * @param props - See {@link BrandLogoProps}.
 */
export function BrandLogo({ placement = 'header', priority = false, className }: BrandLogoProps) {
  const isHeader = placement === 'header';

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
      <Image
        src={brandLogo.src}
        alt=""
        width={brandLogo.width}
        height={brandLogo.height}
        priority={priority}
        sizes={`${isHeader ? HEADER_LOGO_MAX_WIDTH : DRAWER_LOGO_HEIGHT * 4}px`}
        className={cn(
          'h-auto w-auto object-contain',
          isHeader ? 'max-w-[160px] max-bs-md:max-w-[130px]' : 'max-h-10 max-w-[160px]',
        )}
      />
    </AppLink>
  );
}
