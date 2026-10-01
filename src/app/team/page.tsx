import type { Metadata } from 'next';

import { TeamGroup } from '@/components/sections/team-page/team-group';
import { TeamHero } from '@/components/sections/team-page/team-hero';
import { Container } from '@/components/ui/container';
import { buildBreadcrumbJsonLd } from '@/lib/seo';
import { leadership, teamMembers, teamPageContent } from '@/lib/team-page';

export const metadata: Metadata = {
  title: teamPageContent.metaTitle,
  description: teamPageContent.metaDescription,
  alternates: { canonical: '/team' },
  openGraph: {
    title: teamPageContent.metaTitle,
    description: teamPageContent.metaDescription,
    url: '/team',
  },
};

/** The `/team` page: a title band, then the board and the wider team. */
export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Built by `JSON.stringify` from in-repo content — no user input.
        dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd(teamPageContent.breadcrumb) }}
      />
      <TeamHero />
      {/* The title band already ends on 100px of padding, so the top inset here stays short. */}
      <Container className="pb-[130px] pt-10 max-bs-lg:pb-[100px] max-bs-md:pb-20 max-bs-md:pt-5">
        <TeamGroup content={teamPageContent.leadership} members={leadership} size="lead" />
        <TeamGroup
          content={teamPageContent.people}
          members={teamMembers}
          size="member"
          className="mt-[100px] max-bs-lg:mt-20 max-bs-md:mt-[70px]"
        />
      </Container>
    </>
  );
}
