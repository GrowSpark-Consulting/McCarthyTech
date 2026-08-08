'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

import { LazyVideo } from '@/components/shared/lazy-video';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import type { ServiceDetail } from '@/types/service-detail';

/** `.xb-video-shape .shape` — the three ornaments drifting outside the frame. */
const SHAPES = [
  {
    src: '/assets/img/shape/video-shape01.png',
    // `shape--1` is rotated on the wrapper and rocked on the image itself, so
    // the two transforms do not fight for the same property.
    wrapper: 'left-[-14px] top-[62px] max-w-[10%] -rotate-45 ref-sm:left-[-45px] ref-sm:top-[33px]',
    image: 'origin-bottom animate-ring2 motion-reduce:animate-none',
    size: 220,
  },
  {
    src: '/assets/img/shape/video-shape02.png',
    wrapper: 'bottom-[26%] left-[-26px] max-w-[4%] ref-sm:left-[-27px]',
    image: 'animate-bounce motion-reduce:animate-none',
    size: 90,
  },
  {
    src: '/assets/img/shape/video-shape03.png',
    wrapper: 'bottom-[21%] right-[15px] max-w-[4%] ref-sm:right-[-16px]',
    image: 'animate-zoominup motion-reduce:animate-none',
    size: 90,
  },
] as const;

export interface ServiceShowcaseBandProps {
  /** The service being rendered. Must carry a `showcaseBand`. */
  readonly service: ServiceDetail;
}

/**
 * `.video` — the tabbed showcase frame.
 *
 * A browser-chrome PNG with the tab strip and clip laid over it at percentage
 * offsets, so the overlay tracks the frame as it scales rather than drifting off
 * it at other widths.
 *
 * **A real tab list.** The reference drives this with Bootstrap's pill plugin,
 * which does emit `role="tab"` and `aria-selected` but leaves arrow-key
 * navigation to the plugin. Here the roles come with the behaviour they promise:
 * one tab in the tab order, arrow keys moving between them, and each panel
 * labelled by its tab.
 *
 * @param props - See {@link ServiceShowcaseBandProps}.
 */
export function ServiceShowcaseBand({ service }: ServiceShowcaseBandProps) {
  const baseId = useId();
  const { showcaseBand } = service;
  const [activeId, setActiveId] = useState(showcaseBand?.tabs[0]?.id);

  if (showcaseBand === undefined) return null;

  const { tabs } = showcaseBand;
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  if (active === undefined) return null;

  /** Arrow keys move between tabs, per the tab-list pattern. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (delta === 0) return;

    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === active.id);
    const next = tabs[(index + delta + tabs.length) % tabs.length];
    if (next === undefined) return;

    setActiveId(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  };

  return (
    <section aria-label="Product showcase" className="relative z-[1] pb-[70px] pt-[25px]">
      <Container>
        <div className="relative text-center">
          {/* `.xb-img` — the frame, bled wide and scaled up at desktop widths. */}
          <div className="mx-[-77px] scale-x-[1.10] scale-y-[1.05] max-bs-xl:mx-0 max-bs-xl:scale-100">
            <Image
              src="/assets/img/video/video-frame.png"
              alt=""
              width={1200}
              height={800}
              aria-hidden="true"
              className="h-auto w-full"
            />
          </div>

          {/* `.xb-video-wrap` */}
          <div
            className={cn(
              'absolute left-[1%] top-[13%] z-[2] inline-block overflow-hidden rounded-[10px]',
              'border border-white/10 bg-ink',
              'max-bs-xl:left-[6%] max-bs-xl:max-w-[88%]',
              'max-bs-md:left-1/2 max-bs-md:w-[95%] max-bs-md:max-w-[95%] max-bs-md:-translate-x-1/2',
            )}
          >
            <div
              role="tablist"
              aria-label="Showcase views"
              onKeyDown={onKeyDown}
              className="flex border-b border-white/10 pl-[50px] max-bs-lg:pl-0 max-bs-md:pl-10"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === active.id;

                return (
                  <button
                    key={tab.id}
                    id={`${baseId}-tab-${tab.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel-${tab.id}`}
                    // Only the active tab is in the tab order; arrows do the rest.
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(tab.id)}
                    className={cn(
                      'relative flex items-center gap-[7px] border-r border-white/10 px-5 py-2.5',
                      'text-white transition-all duration-300 first:border-l first:border-white/10',
                      'text-sm max-bs-lg:px-[15px] max-bs-md:gap-[5px] max-bs-md:px-2.5 max-bs-md:text-xs',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-lime',
                    )}
                  >
                    {/* `::before` — a mint tint that sweeps across the active tab. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-0 top-0 h-full bg-mint/20 opacity-0',
                        isActive && 'animate-width-scale opacity-100 motion-reduce:w-full',
                      )}
                    />
                    <Image src={tab.icon} alt="" width={16} height={16} aria-hidden="true" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`${baseId}-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${tab.id}`}
                hidden={tab.id !== active.id}
                className="relative aspect-[17/9] w-[90%] overflow-hidden rounded-[10px] max-bs-md:w-full"
              >
                {tab.id === active.id ? <LazyVideo clip={tab.clip} sizes="90vw" /> : null}
              </div>
            ))}
          </div>

          {/* `.xb-video-shape` — hidden below 992px, as in the original. */}
          <div aria-hidden="true" className="max-bs-lg:hidden">
            {SHAPES.map((shape) => (
              <span key={shape.src} className={cn('absolute -z-[1]', shape.wrapper)}>
                <Image
                  src={shape.src}
                  alt=""
                  width={shape.size}
                  height={shape.size}
                  className={cn('h-auto w-full', shape.image)}
                />
              </span>
            ))}
          </div>

          {/* `.xb-linear-gradient` — four slabs that sink the frame into the page. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 -z-[2] h-[262px] w-full bg-gradient-to-b from-ink/0 to-ink max-bs-lg:h-[170px] max-bs-md:h-20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[57px] h-[161px] w-full bg-ink blur-[40px] max-bs-lg:h-[100px] max-bs-md:h-20"
          />
        </div>
      </Container>
    </section>
  );
}
