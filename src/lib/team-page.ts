import type { TeamMember, TeamPageContent } from '@/types/team';

/**
 * Content for the `/team` page.
 *
 * This is the one file to edit: the page's copy lives in `teamPageContent`, the
 * board in `leadership` and everyone else in `teamMembers`. Nothing in the
 * components needs to change to add, remove or reorder a person.
 *
 * PLACEHOLDERS — every entry below stands in for a real person. Replace each
 * `name` and `role`, and add an `image` (a portrait in
 * `public/assets/img/team/`) and a `linkedinUrl` as they become available.
 * Until then each card shows a monogram and no LinkedIn button.
 */
export const teamPageContent: TeamPageContent = {
  metaTitle: 'Our Team',
  metaDescription:
    'Meet the McCarthy Tech team — the people behind our AI, software, design and marketing work.',
  title: 'Our team',
  breadcrumb: [
    { label: 'home', href: '/' },
    { label: 'Our team', href: '/team' },
  ],
  leadership: {
    id: 'team-leadership-heading',
    eyebrow: 'Leadership',
    title: 'Board of Directors',
  },
  people: {
    id: 'team-people-heading',
    eyebrow: 'The People',
    title: 'Our Team',
  },
};

export const leadership: readonly TeamMember[] = [
  { id: 'leadership-01', name: 'Leadership Member 01', role: 'Designation' },
  { id: 'leadership-02', name: 'Leadership Member 02', role: 'Designation' },
  { id: 'leadership-03', name: 'Leadership Member 03', role: 'Designation' },
];

export const teamMembers: readonly TeamMember[] = [
  { id: 'team-01', name: 'Team Member 01', role: 'Designation' },
  { id: 'team-02', name: 'Team Member 02', role: 'Designation' },
  { id: 'team-03', name: 'Team Member 03', role: 'Designation' },
  { id: 'team-04', name: 'Team Member 04', role: 'Designation' },
  { id: 'team-05', name: 'Team Member 05', role: 'Designation' },
  { id: 'team-06', name: 'Team Member 06', role: 'Designation' },
  { id: 'team-07', name: 'Team Member 07', role: 'Designation' },
  { id: 'team-08', name: 'Team Member 08', role: 'Designation' },
];
