'use client';

import { useCallback, useState } from 'react';

import { ProjectCard } from '@/components/sections/projects/project-card';
import { projectsContent } from '@/lib/projects';
import { cn } from '@/lib/utils';
import type { ProjectShowcase } from '@/types/projects';

export interface ProjectStackProps {
  readonly projects: readonly ProjectShowcase[];
}

/**
 * The sticky project stack.
 *
 * Each card is `position: sticky` at a 50px offset, so as the page scrolls they
 * pile up on one another like a deck rather than scrolling past. The pagination
 * rail sits in its own full-height sticky column, and the card list is pulled up
 * over it with `-100vh` so the two occupy the same band of the page — that
 * negative margin is what makes the rail appear pinned alongside the deck rather
 * than stacked above it.
 *
 * The reference hard-codes `active` onto item 2 and never updates it. Here the
 * rail follows the deck: each card reports when its centre crosses the viewport
 * middle, and the rail highlights that index. Same visual, but it now means
 * something.
 *
 * @param props - See {@link ProjectStackProps}.
 */
export function ProjectStack({ projects }: ProjectStackProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(projects[0]?.slug ?? null);

  const handleVisible = useCallback((slug: string) => setActiveSlug(slug), []);

  return (
    <div className="relative mx-auto w-full max-w-[1800px] px-3">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none sticky top-0 z-[2] flex min-h-dvh flex-col items-end justify-center pr-5',
        )}
      >
        <ol className="z-[1] flex list-none flex-col gap-[10px] p-0 max-bs-md:hidden">
          {projects.map((project, index) => {
            const isActive = activeSlug === project.slug;

            return (
              <li
                key={project.slug}
                className={cn(
                  'relative flex size-10 items-center justify-center rounded-full bg-ink',
                  'text-xl font-bold transition-colors duration-300 ease-out',
                  // The 80% inner ring — `.xb-project-pagination li::before`.
                  "before:absolute before:size-[80%] before:rounded-[inherit] before:border before:content-['']",
                  isActive ? 'text-lime before:border-mint' : 'text-white before:border-white/50',
                )}
              >
                <span className="sr-only">{projectsContent.paginationLabel} </span>
                {index + 1}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Pulls the deck up into the rail's sticky band. */}
      <div className="mt-[-100dvh] size-full">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} onVisible={handleVisible} />
        ))}
      </div>
    </div>
  );
}
