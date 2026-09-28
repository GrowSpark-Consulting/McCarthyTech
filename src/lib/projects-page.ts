import type { Project, ProjectsPageContent } from '@/types/projects';

/**
 * Content for the `/projects` page.
 *
 * This is the one file to edit: the page's copy lives in `projectsPageContent`
 * and every project in `projects`. Nothing in the components needs to change to
 * add, remove, reorder or restyle a project's content.
 *
 * The projects below are placeholders, as are their images in
 * `public/assets/img/projects/`. Replace an image by pointing `image` at your
 * own file (any format — a 16:9 screenshot fits the frame exactly).
 */
export const projectsPageContent: ProjectsPageContent = {
  metaTitle: 'Our Projects',
  metaDescription:
    'Explore selected McCarthy Tech projects across web, mobile, AI and product design.',
  title: 'Our projects',
  // description: 'An optional line beneath the title.',
  breadcrumb: [
    { label: 'home', href: '/' },
    { label: 'Our projects', href: '/projects' },
  ],
  cardCta: 'read more',
  listLabel: 'Project list',
};

export const projects: readonly Project[] = [
  {
    id: 'boutiqueware',
    title: 'BoutiqueWare',
    category: 'SaaS · Boutique Management',
    description:
      'The complete platform for boutique management, built for Indian boutiques and tailoring shops — every order, worker and payment in one dashboard, from customer measurements and QR-scanned production stages to WhatsApp invoice delivery.',
    image: '/assets/img/projects/boutiqueware.webp',
    imageTone: 'light',
    liveUrl: 'https://www.boutiqueware.in/',
    featured: true,
  },
  {
    id: 'project-02',
    title: 'Project Two',
    category: 'Mobile App',
    description:
      'A cross-platform mobile app with offline support and real-time sync, designed around a few everyday tasks done well.',
    image: '/assets/img/projects/project-02.svg',
    technologies: ['Flutter', 'Firebase'],
    year: '2026',
    liveUrl: '#',
  },
  {
    id: 'project-03',
    title: 'Project Three',
    category: 'AI / ML',
    description:
      'A machine-learning service that turns unstructured documents into structured data, with a review step for anything it is unsure of.',
    image: '/assets/img/projects/project-03.svg',
    technologies: ['Python', 'PyTorch', 'FastAPI'],
    year: '2025',
    liveUrl: '#',
  },
  {
    id: 'project-04',
    title: 'Project Four',
    category: 'UI / UX Design',
    description:
      'A design system and product redesign that brought a sprawling interface down to one consistent set of components.',
    image: '/assets/img/projects/project-04.svg',
    technologies: ['Figma', 'Design Tokens'],
    year: '2025',
    liveUrl: '#',
  },
  {
    id: 'project-05',
    title: 'Project Five',
    category: 'Backend & Cloud',
    description:
      'An event-driven backend on managed cloud infrastructure, built to scale with demand and deploy without downtime.',
    image: '/assets/img/projects/project-05.svg',
    technologies: ['Node.js', 'AWS', 'Docker'],
    year: '2025',
    liveUrl: '#',
  },
  {
    id: 'project-06',
    title: 'Project Six',
    category: 'E-commerce',
    description:
      'A headless storefront with a custom checkout, tuned for fast page loads and a smooth path from product to purchase.',
    image: '/assets/img/projects/project-06.svg',
    technologies: ['Shopify', 'React'],
    year: '2024',
    liveUrl: '#',
  },
];
