'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { AgencyButton } from '@/components/ui/agency-button';
import { cn } from '@/lib/utils';
import type { ProjectShowcase } from '@/types/projects';

/**
 * How far ahead of the viewport to start loading a card's clip. Generous,
 * because these files are large and a late start would show an empty card.
 */
const VIDEO_PREFETCH_MARGIN = '600px';

export interface ProjectCardProps {
  readonly project: ProjectShowcase;
  /** Reports visibility upward so the pagination rail can follow the stack. */
  readonly onVisible: (slug: string) => void;
}

/**
 * One card in the sticky project stack.
 *
 * **Video loading.** The reference autoplays every clip on page load, and
 * renders each one *twice* per card — once sharp, once blurred as a backdrop.
 * With `hms.mp4` at 15 MB and `ecommerce.mp4` at 18 MB, that is well over 60 MB
 * of video requested before the visitor has scrolled anywhere near this section.
 * Here both layers mount only when the card comes within 600px of the viewport,
 * and then stay mounted. The two layers share one URL, so the browser serves the
 * second from cache rather than fetching twice.
 *
 * **Layering.** The blurred backdrop sits at `-z-10`, the sharp clip at `z-0`,
 * and the caption at `z-10` — the caption must be lifted explicitly, because a
 * positioned sibling with `z-index: 0` would otherwise paint over
 * non-positioned block content that comes before it.
 *
 * @param props - See {@link ProjectCardProps}.
 */
export function ProjectCard({ project, onVisible }: ProjectCardProps) {
  const { ref, inView } = useInView({ rootMargin: VIDEO_PREFETCH_MARGIN });
  // Tracks the card's centre crossing the viewport middle, which is what drives
  // the pagination rail — a separate, tighter observer than the media one.
  const { ref: activeRef, inView: isCentred } = useInView({ rootMargin: '-45% 0px -45% 0px' });

  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);
  useEffect(() => {
    if (inView) setHasLoadedVideo(true);
  }, [inView]);

  useEffect(() => {
    if (isCentred) onVisible(project.slug);
  }, [isCentred, onVisible, project.slug]);

  return (
    <article
      ref={ref}
      aria-labelledby={`project-${project.slug}-title`}
      className={cn(
        'sticky top-[50px] z-[1] flex items-center justify-start overflow-hidden rounded-[10px]',
        'py-[90px] pl-[55px] pr-[120px]',
        'max-bs-xxl:top-[30px]',
        'max-bs-xl:py-20 max-bs-xl:pl-[50px] max-bs-xl:pr-[100px]',
        'max-bs-lg:top-10',
        'max-bs-md:top-5 max-bs-md:p-5',
        'lg:bg-project-sheen',
      )}
    >
      <span ref={activeRef} aria-hidden="true" className="absolute inset-0 -z-20" />

      {hasLoadedVideo ? (
        <>
          {/* Blurred backdrop. Desktop only — on a phone the sharp clip already
              fills the card, so a second decode buys nothing. */}
          <video
            src={project.videoSrc}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              'absolute inset-0 -z-10 hidden size-full rounded-[10px] object-cover',
              'opacity-80 blur-[25px] brightness-[0.7] lg:block',
            )}
          />
          {/* Sharp clip. `object-contain` on desktop so the UI in the recording
              is never cropped; `cover` on mobile where it is the only layer. */}
          <video
            src={project.videoSrc}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className={cn(
              'absolute left-0 top-0 -z-10 size-full rounded-[10px] object-cover',
              'lg:left-[30px] lg:z-0 lg:w-[calc(100%-60px)] lg:rounded-[20px] lg:object-contain',
            )}
          />
        </>
      ) : (
        <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-[10px] bg-ink/60" />
      )}

      <div className="relative z-10">
        <div
          className={cn(
            'relative isolate inline-block w-[500px] rounded-[10px]',
            'bg-project-caption shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[30px]',
            'pb-[38px] pl-10 pr-9 pt-[34px]',
            'max-bs-xl:pb-[60px] max-bs-xl:pl-[60px] max-bs-xl:pr-[45px] max-bs-xl:pt-[55px]',
            'max-bs-lg:w-[460px] max-bs-lg:pb-[38px] max-bs-lg:pl-10 max-bs-lg:pr-9 max-bs-lg:pt-[34px]',
            'max-bs-md:w-full max-bs-md:max-w-full max-bs-md:px-[30px] max-bs-md:pb-[60px] max-bs-md:pt-[55px]',
          )}
        >
          {/* Grain — `.xb-item--inner::before`. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-project-noise bg-cover bg-no-repeat"
          />
          {/* 1px gradient hairline — `.xb-border::after`. */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
              '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
            )}
          />

          <h3
            id={`project-${project.slug}-title`}
            className={cn(
              'mb-[15px] font-heading text-[42px] tracking-[-0.06em] text-white',
              'max-bs-xl:text-[38px] max-bs-lg:text-[32px] max-bs-md:text-[26px]',
              'bs-sm:max-bs-md:text-[28px]',
            )}
          >
            {project.title}
          </h3>

          <p>{project.description}</p>

          <ul
            className={cn(
              'my-[33px] mb-10 flex list-none gap-[127px] p-0 text-lg font-medium',
              'max-bs-xl:justify-between max-bs-xl:gap-[60px] max-bs-lg:gap-[15px]',
            )}
          >
            {project.facts.map((fact) => (
              <li key={fact.label}>
                {fact.label}: <span className="font-normal text-lime">{fact.value}</span>
              </li>
            ))}
          </ul>

          {/* The visible label repeats across all four cards. Hidden text names
              the project, so both the accessible name and the link's text
              content are unique — on screen it still reads "read more". */}
          <AgencyButton
            href={project.href}
            label="read more"
            srSuffix={` about ${project.title}`}
          />
        </div>
      </div>
    </article>
  );
}
