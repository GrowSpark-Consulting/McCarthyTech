import Image from 'next/image';
import { AppLink } from '@/components/ui/app-link';

import { brandLogo, brandMark, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export interface BrandMarkProps {
  /**
   * Sizes the box the image is drawn into. Set one dimension and `auto` on the
   * other; the file's aspect ratio supplies the rest.
   */
  readonly className?: string;
  /** Whether to fetch the image at high priority. */
  readonly priority?: boolean;
  /** `eager` fetches immediately without adding a preload to the head. */
  readonly loading?: 'eager' | 'lazy';
}

/**
 * Draws one of the two brand files, unframed and unlinked.
 *
 * Only the box is ever sized — `object-contain` means a box of any shape can
 * neither stretch nor crop the artwork.
 *
 * The alt text is empty: each placement is either inside a link that already
 * names the company, or purely decorative.
 */
function BrandImage({
  asset,
  className,
  priority = false,
  loading,
}: BrandMarkProps & { readonly asset: typeof brandLogo | typeof brandMark }) {
  return (
    <Image
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      priority={priority}
      loading={loading}
      className={cn('object-contain', className)}
    />
  );
}

/**
 * The full McCarthy Digital logo — mark and wordmark — unframed and unlinked.
 *
 * @param props - See {@link BrandMarkProps}.
 */
export function BrandLockup(props: BrandMarkProps) {
  return <BrandImage asset={brandLogo} {...props} />;
}

/**
 * The lime mark alone, for placements too small or too square for the
 * wordmark to read — the framed ornaments.
 *
 * @param props - See {@link BrandMarkProps}.
 */
export function BrandMark(props: BrandMarkProps) {
  return <BrandImage asset={brandMark} {...props} />;
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
 * The full logo, wrapped in a home link.
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
      <BrandLockup
        priority={priority}
        className={cn('w-auto', placement === 'header' ? 'h-11 max-bs-lg:h-9' : 'h-10')}
      />
    </AppLink>
  );
}
