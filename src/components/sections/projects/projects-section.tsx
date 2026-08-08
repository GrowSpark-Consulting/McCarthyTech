import Image from 'next/image';

import { ProjectStack } from '@/components/sections/projects/project-stack';
import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { projectShowcases, projectsContent } from '@/lib/projects';
import { cn } from '@/lib/utils';

/**
 * Projects section — "Tailored for every industry".
 *
 * A centred heading block above a sticky stack of four showcase cards, over a
 * full-bleed backdrop. The heading is preceded by a pill-cropped animated GIF,
 * the same ornament that closes the About headline.
 *
 * A Server Component; only the stack hydrates, and only because it tracks which
 * card is centred.
 */
export function ProjectsSection() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="bg-project-stage bg-cover bg-center bg-no-repeat pb-[150px] pt-[135px] max-bs-md:py-20"
    >
      <Container>
        <div className="mb-[55px] text-center max-bs-xl:mb-20">
          <h2
            id="projects-heading"
            className={cn(
              'block font-heading text-[62px] font-normal leading-[1.5]',
              'tracking-[-0.08em] text-white',
              'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'mr-[30px] inline-block h-[50px] w-[305px] overflow-hidden rounded-full align-middle',
                'max-bs-md:mr-0 max-bs-md:w-[160px] bs-sm:max-bs-md:w-[305px]',
              )}
            >
              <Image
                src={projectsContent.headingOrnament.src}
                alt={projectsContent.headingOrnament.alt}
                width={projectsContent.headingOrnament.width}
                height={projectsContent.headingOrnament.height}
                // Animated GIF: the optimiser would flatten it to one frame.
                unoptimized
                className="h-[50px] w-full object-cover"
              />
            </span>
            {projectsContent.heading}
          </h2>

          <div className="mb-2 mt-12">
            <SectionEyebrow>{projectsContent.eyebrow}</SectionEyebrow>
          </div>

          <div className="inline-block">
            <AgencyButton href={projectsContent.cta.href} label={projectsContent.cta.label} />
          </div>
        </div>
      </Container>

      <ProjectStack projects={projectShowcases} />
    </section>
  );
}
