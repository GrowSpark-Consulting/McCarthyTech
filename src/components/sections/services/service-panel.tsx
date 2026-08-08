'use client';

import { useEffect, useState } from 'react';
import { AppLink } from '@/components/ui/app-link';

import { ArrowGlyph } from '@/components/ui/arrow-glyph';
import { cn } from '@/lib/utils';
import type { ServiceOffering } from '@/types/services';

/**
 * Panel height, per breakpoint — `.xb-service-item`.
 *
 * The panels are a fixed-height filmstrip rather than content-sized boxes, which
 * is what lets the expanding one grow horizontally without the row's height
 * shifting. Note the reference *increases* the height between 576px and 767px:
 * once panels stack, the taller box is what stops the copy from crowding the
 * video beneath it.
 */
const PANEL_HEIGHT_CLASS = cn(
  'h-[920px]',
  'max-bs-xxl:h-[800px]',
  'max-bs-xl:h-[670px]',
  'max-bs-md:h-[635px]',
  'bs-sm:max-bs-md:h-[810px]',
);

/** Inner padding, per breakpoint — `.xb-service-item .xb-item--item`. */
const PANEL_PADDING_CLASS = cn(
  'px-[92px] pb-[85px] pt-[82px]',
  'max-[1600px]:px-[45px]',
  'max-bs-xxl:px-[50px]',
  'max-bs-xl:px-[30px]',
  'max-bs-md:px-5',
);

/**
 * Shared reveal transition for the three content layers.
 *
 * Collapsed panels park their content 30px low at zero opacity; expanding
 * releases them on a staggered 300/400/500ms cascade so heading, copy, and media
 * arrive in reading order rather than all at once.
 *
 * Below 768px the panels are stacked and always open, so the classes are
 * neutralised there rather than being driven by the active state.
 */
const CONTENT_REVEAL_CLASS = cn(
  'translate-y-[30px] opacity-0 transition-all duration-panel-content',
  'max-bs-md:translate-y-0 max-bs-md:opacity-100',
);

/** Applied to the three content layers once their panel is expanded. */
const CONTENT_REVEALED_CLASS = 'translate-y-0 opacity-100';

export interface ServicePanelProps {
  readonly offering: ServiceOffering;
  /** Whether this panel is the expanded one. */
  readonly isActive: boolean;
  /** Requests that this panel become the active one. */
  readonly onActivate: () => void;
  /**
   * Whether the accordion has scrolled close enough to warrant loading media.
   */
  readonly isNearViewport: boolean;
  /** Whether the layout has collapsed to a stacked, always-open column. */
  readonly isStacked: boolean;
}

/**
 * One panel of the services accordion.
 *
 * Collapsed, it shows only a vertically rotated title and a dim circular badge.
 * Expanded, it grows from `flex: 1` to `flex: 3` over 600ms while its heading,
 * description, and looping preview fade up in sequence.
 *
 * **Video loading.** The seven clips total roughly 4 MB, and the reference
 * autoplays all of them on page load. Here a clip mounts only once the section
 * is near the viewport *and* its panel is either expanded or in stacked layout —
 * then stays mounted, so browsing across panels never re-downloads one. On
 * desktop that means a single clip on arrival instead of seven.
 *
 * @param props - See {@link ServicePanelProps}.
 */
export function ServicePanel({
  offering,
  isActive,
  onActivate,
  isNearViewport,
  isStacked,
}: ServicePanelProps) {
  const shouldLoadVideo = isNearViewport && (isActive || isStacked);

  // Latches on. Once a clip has been fetched, keep it mounted so moving back and
  // forth across the accordion never re-requests it.
  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);
  useEffect(() => {
    if (shouldLoadVideo) setHasLoadedVideo(true);
  }, [shouldLoadVideo]);

  const revealed = (extra?: string) =>
    cn(CONTENT_REVEAL_CLASS, isActive && CONTENT_REVEALED_CLASS, extra);

  return (
    <article
      // Hover is the reference's own affordance; focus is added so the accordion
      // is operable from the keyboard, which the original is not.
      onPointerEnter={onActivate}
      onFocusCapture={onActivate}
      aria-label={offering.title}
      className={cn(
        'relative isolate overflow-hidden transition-all duration-panel ease-in-out',
        'flex-1 origin-center backdrop-blur-[40px]',
        'bg-glass-sheen shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
        isActive && 'flex-[3]',
        'max-bs-md:w-full max-bs-md:flex-none',
        PANEL_HEIGHT_CLASS,
      )}
    >
      {/* Fine grain over the flat glass fill — `.xb-service-item::before`. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-panel-noise bg-cover bg-no-repeat"
      />

      {/* 1px gradient hairline — `.xb-border::after`, squared off for panels. */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 bg-hairline p-px',
          '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
        )}
      />

      <div className={PANEL_PADDING_CLASS}>
        <div className={revealed('relative block delay-panel-head')}>
          <h3
            className={cn(
              'font-heading text-[42px] tracking-[-0.06em] text-white',
              'max-bs-xxl:max-w-[365px]',
              'max-bs-xl:max-w-[280px] max-bs-xl:text-[30px]',
              'max-bs-lg:max-w-[200px]',
              'max-bs-md:text-[26px]',
              'bs-sm:max-bs-md:max-w-full bs-sm:max-bs-md:text-[38px]',
            )}
          >
            <AppLink
              href={offering.href}
              className={cn(
                'inline w-full bg-sweep-underline bg-[length:0_100%] bg-no-repeat',
                '[background-position-y:-2px]',
                'transition-[background-size] duration-underline ease-underline',
                'hover:bg-[length:100%_100%]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
              )}
            >
              {offering.title}
            </AppLink>
          </h3>

          <AppLink
            href={offering.href}
            tabIndex={-1}
            aria-hidden="true"
            className={cn(
              'absolute right-0 top-0 flex size-[50px] items-center justify-center',
              'rounded-full bg-lime text-ink transition-transform duration-300 ease-out hover:scale-105',
              'max-bs-xl:-top-[5px] max-bs-xl:size-[45px]',
            )}
          >
            <ArrowGlyph variant="badge" size={22} absolute={false} />
          </AppLink>
        </div>

        <p className={revealed('my-[15px] mb-8 inline-block max-w-[446px] delay-panel-copy')}>
          {offering.description}
        </p>

        {/* `.img-hove-effect` — a second, circular copy of the clip layered over
            the first, which shrinks to 90% on hover. */}
        <div className="group/media">
          <div className={revealed('relative overflow-hidden rounded-2xl delay-panel-media')}>
            {hasLoadedVideo ? (
              <>
                <AppLink href={offering.href} tabIndex={-1} aria-hidden="true" className="block">
                  <ServiceVideo src={offering.videoSrc} />
                </AppLink>
                <AppLink
                  href={offering.href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-0 overflow-hidden rounded-full',
                    'transition-transform duration-300 ease-out group-hover/media:scale-90',
                    'max-bs-lg:w-full',
                  )}
                >
                  <ServiceVideo src={offering.videoSrc} />
                </AppLink>
              </>
            ) : (
              // Placeholder holding the media box so expanding a panel for the
              // first time does not reflow its copy.
              <div aria-hidden="true" className="aspect-video w-full rounded-2xl bg-white/5" />
            )}
          </div>
        </div>
      </div>

      {/* Collapsed state: the rotated title rail and its dim badge. Hidden once
          this panel expands, and entirely absent in stacked layout. */}
      <div
        aria-hidden="true"
        className={cn(
          'transition-all duration-300 ease-in-out',
          isActive && 'invisible opacity-0',
          'max-bs-md:hidden',
        )}
      >
        <h3
          className={cn(
            'absolute top-[4%] flex w-full items-center justify-end whitespace-nowrap text-center',
            'left-[11%] max-bs-xxl:left-[18%] max-bs-xl:left-[16%]',
            'origin-bottom-right -translate-x-1/2 -rotate-90',
            'font-heading text-[42px] tracking-[-0.06em] text-white',
            'max-bs-xl:text-[30px]',
          )}
        >
          {offering.title}
        </h3>
        <span
          className={cn(
            'absolute bottom-[85px] left-1/2 flex size-[50px] -translate-x-1/2 items-center',
            'justify-center rounded-full bg-ink/20 text-white',
            'max-bs-xl:bottom-[65px]',
          )}
        >
          <ArrowGlyph variant="badge" size={22} absolute={false} />
        </span>
      </div>
    </article>
  );
}

/**
 * A single looping preview layer.
 *
 * `object-contain` matches the reference: these clips are UI mockups, and
 * cropping them to fill would cut off the very interface they exist to show.
 */
function ServiceVideo({ src }: { readonly src: string }) {
  return (
    <video
      muted
      autoPlay
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="size-full rounded-2xl object-contain"
      src={src}
    />
  );
}
