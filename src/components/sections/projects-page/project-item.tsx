import Image from 'next/image';

import { AgencyButton } from '@/components/ui/agency-button';
import { projectsPageContent } from '@/lib/projects-page';
import { cn } from '@/lib/utils';
import type { Project, ProjectFact } from '@/types/projects';

/** Links that leave the site open in a new tab. */
const EXTERNAL_URL = /^https?:\/\//;

/** The facts row: each optional field that is set, in a fixed order. */
function projectFacts(project: Project): ProjectFact[] {
  const facts: ProjectFact[] = [];
  if (project.category) facts.push({ label: 'Category', value: project.category });
  if (project.client) facts.push({ label: 'Client', value: project.client });
  if (project.year) facts.push({ label: 'Year', value: project.year });
  if (project.technologies?.length) {
    facts.push({ label: 'Stack', value: project.technologies.join(', ') });
  }
  return facts;
}

export interface ProjectItemProps {
  readonly project: Project;
  /** Zero-based position in the list; every second row is mirrored. */
  readonly index: number;
}

/**
 * One project — `.xb-project-wrap_2 .xb-project-item` in the reference.
 *
 * A 16:9 screenshot frame with a glass copy card laid over it, vertically
 * centred on the frame and pinned to one edge, alternating left and right down
 * the list.
 *
 * The reference positions the card absolutely, which clips any card taller
 * than its frame — a real risk at 768–991px, where the frame is only 363px
 * tall. Here card and frame share one grid cell instead: identical while the
 * card fits, and when it does not the row grows to hold it rather than cutting
 * it off.
 *
 * The frame is full width from 1200px, capped at 760px and then 645px below
 * that, and dropped entirely below 768px — where the row is the card alone,
 * exactly as the reference behaves.
 *
 * The reference fills the card with title, copy and button only. The facts row
 * uses the same component's `.xb-item--list` treatment, the one the homepage's
 * project cards show, and appears only for the optional fields a project sets.
 *
 * @param props - See {@link ProjectItemProps}.
 */
export function ProjectItem({ project, index }: ProjectItemProps) {
  const isMirrored = index % 2 === 1;
  const titleId = `project-${project.id}-title`;
  const facts = projectFacts(project);
  const hasSource = Boolean(project.githubUrl) && project.githubUrl !== '#';
  const href = project.liveUrl ?? '#';

  return (
    <article
      aria-labelledby={titleId}
      className="relative z-[1] grid grid-cols-1 items-center overflow-hidden rounded-[10px] lg:bg-project-sheen"
    >
      <div
        className={cn(
          '[grid-area:1/1] max-bs-md:w-full',
          isMirrored ? 'justify-self-end' : 'justify-self-start',
        )}
      >
        <div
          className={cn(
            'relative isolate max-w-full rounded-[10px]',
            // Phones drop the screenshot, so there the card is always standard glass.
            project.imageTone === 'light'
              ? 'bg-project-glass-dim max-bs-md:bg-project-glass'
              : 'bg-project-glass',
            'shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)] backdrop-blur-[30px]',
            'w-[840px] max-[1500px]:w-[790px] max-bs-xl:w-[730px] max-bs-lg:w-[660px] max-bs-md:w-full',
            'pb-[60px] pt-[55px] max-bs-lg:pb-[45px] max-bs-lg:pt-10',
            // Unmirrored cards hug the container's left edge, so from 1501px
            // their copy is inset 165px to clear it.
            isMirrored
              ? 'px-[60px] max-bs-lg:px-[30px] max-bs-md:px-5'
              : 'pl-[165px] pr-[45px] max-[1500px]:px-[50px] max-bs-lg:px-[30px] max-bs-md:px-5',
          )}
        >
          {/* Grain — `.xb-item--inner::before`. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-project-noise bg-cover bg-no-repeat"
          />
          {/*
           * 1px gradient hairline — `.xb-border::after`. The `exclude` sits
           * inside the `mask` shorthand: a separate `mask-composite` utility is
           * reset by the shorthand, and the gradient then fills the whole card.
           */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
              '[mask:linear-gradient(#fff_0_0)_content-box_exclude,linear-gradient(#fff_0_0)]',
            )}
          />

          <h2
            id={titleId}
            className={cn(
              'mb-[15px] font-heading font-normal tracking-[-0.06em] text-white',
              'text-[42px] max-bs-xl:text-[38px] max-bs-lg:text-[32px] max-bs-md:text-[26px] bs-sm:max-bs-md:text-[28px]',
              'leading-[1.2]',
            )}
          >
            {project.title}
          </h2>

          <p className={cn('text-white', isMirrored && 'max-w-[626px]')}>{project.description}</p>

          {facts.length > 0 || hasSource ? (
            <ul
              className={cn(
                'mt-[33px] flex list-none flex-wrap gap-x-[60px] gap-y-2 p-0 text-lg font-medium',
                'max-bs-lg:gap-x-[15px]',
              )}
            >
              {facts.map((fact) => (
                <li key={fact.label}>
                  {fact.label}: <span className="font-normal text-lime">{fact.value}</span>
                </li>
              ))}
              {hasSource ? (
                <li>
                  Source:{' '}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'font-normal text-lime underline-offset-4 hover:underline',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
                    )}
                  >
                    GitHub
                    <span className="sr-only"> repository for {project.title}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}

          <div className="mt-10">
            <AgencyButton
              size="project"
              href={href}
              label={projectsPageContent.cardCta}
              srSuffix={` about ${project.title}`}
              newTab={EXTERNAL_URL.test(href)}
            />
          </div>
        </div>
      </div>

      {/* Screenshot frame — `.xb-project-img`, behind the card. */}
      <div
        className={cn(
          'relative -z-10 w-full overflow-hidden rounded-[10px] [grid-area:1/1]',
          'max-bs-xl:max-w-[760px] max-bs-lg:max-w-[645px] max-bs-md:hidden',
          isMirrored ? 'justify-self-start' : 'justify-self-end',
        )}
      >
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            // The first frame starts inside the opening viewport on desktop.
            priority={index === 0}
            sizes="(max-width: 767px) 1px, (max-width: 991px) 645px, (max-width: 1199px) 760px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
