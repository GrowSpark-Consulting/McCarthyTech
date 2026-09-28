import type { Metadata } from 'next';

import { ProjectList } from '@/components/sections/projects-page/project-list';
import { ProjectsHero } from '@/components/sections/projects-page/projects-hero';
import { projects, projectsPageContent } from '@/lib/projects-page';

export const metadata: Metadata = {
  title: projectsPageContent.metaTitle,
  description: projectsPageContent.metaDescription,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: projectsPageContent.metaTitle,
    description: projectsPageContent.metaDescription,
    url: '/projects',
  },
};

/** The `/projects` page: a title band, then the project list. */
export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectList projects={projects} />
    </>
  );
}
