import type { Project, ProjectsPageContent } from '@/types/projects';

/**
 * Content for the `/projects` page.
 *
 * This is the one file to edit: the page's copy lives in `projectsPageContent`
 * and every project in `projects`. Nothing in the components needs to change to
 * add, remove, reorder or restyle a project's content.
 *
 * Images live in `public/assets/img/projects/`. A 16:9 image fits the frame
 * exactly; set `imageTone: 'light'` on a project whose image is mostly light.
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
    id: 'nenjam-matrimony',
    title: 'Nenjam Matrimony',
    category: 'Mobile App · Matrimony',
    description:
      'A premium, Tamil-first matrimony app — a guided 12-step profile wizard, verified profiles, and matches scored on horoscope compatibility, personality and partner preferences, so families find a match on more than filters.',
    image: '/assets/img/projects/nenjam-matrimony.webp',
    technologies: ['Flutter', 'Riverpod', 'NestJS', 'PostgreSQL', 'Firebase Auth'],
    year: '2026',
  },
  {
    id: 'chelliah-enterprises',
    title: 'Chelliah Enterprises',
    category: 'Business Website · Construction',
    description:
      'A lead-generating website for a Chennai waterproofing and epoxy-flooring contractor — services for industrial, commercial and residential work, a project portfolio, and a site-inspection enquiry form with WhatsApp contact.',
    image: '/assets/img/projects/chelliah-enterprises.webp',
    imageTone: 'light',
    technologies: ['Next.js'],
    liveUrl: 'https://chelliah-enterprises.vercel.app/',
  },
  {
    id: 'dishpop',
    title: 'DishPop',
    category: 'SaaS · Restaurant Tech',
    description:
      'A next-generation dining platform that lets guests see dishes in photorealistic 3D and AR before they order — with nutritional insights, live order management and offline-capable restaurant billing in one system.',
    image: '/assets/img/projects/dishpop.webp',
    imageTone: 'light',
    liveUrl: 'https://www.dishpop.in/',
  },
  {
    id: 'library-management-system',
    title: 'Library Management System',
    category: 'ERP · Education',
    description:
      'Library automation software that runs every daily operation — acquisition and cataloguing, circulation, serial control and MIS reports — with RFID stock management and an online catalogue (OPAC) on web and mobile.',
    image: '/assets/img/projects/library-management-system.webp',
    imageTone: 'light',
  },
  {
    id: 'growspark-consulting',
    title: 'Grow Spark Consulting',
    category: 'Corporate Website · Consulting',
    description:
      'The website for a business-transformation consultancy — AI automation, custom software and digital delivery, its Business Transformation Framework, case studies and industry pages, built to turn visitors into strategy sessions.',
    image: '/assets/img/projects/growspark-consulting.webp',
    technologies: ['Next.js'],
    liveUrl: 'https://www.growsparkconsulting.com/',
  },
];
