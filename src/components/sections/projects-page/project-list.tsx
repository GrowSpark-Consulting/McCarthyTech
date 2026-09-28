import { ProjectItem } from '@/components/sections/projects-page/project-item';
import { Container } from '@/components/ui/container';
import { projectsPageContent } from '@/lib/projects-page';
import type { Project } from '@/types/projects';

export interface ProjectListProps {
  readonly projects: readonly Project[];
}

/**
 * The Projects page list — `.xb-project-wrap_2` inside `.container.mxw-1650`.
 *
 * Rows run edge to edge of a 1650px container with 100px between them (30px
 * on phones), starting directly beneath the title band. Featured projects come
 * first; `sort` is stable, so both groups keep the order they were written in.
 *
 * A Server Component with no client JavaScript — there is nothing on the page
 * that needs to hydrate.
 *
 * @param props - See {@link ProjectListProps}.
 */
export function ProjectList({ projects }: ProjectListProps) {
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured === true) - Number(a.featured === true),
  );

  return (
    <section aria-label={projectsPageContent.listLabel}>
      <Container width="shell" className="bs-lg:px-[15px]">
        <div className="flex flex-col gap-[100px] max-bs-md:gap-[30px]">
          {ordered.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
