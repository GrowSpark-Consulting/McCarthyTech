import type { NavLink } from '@/types/navigation';
import type { ProjectShowcase } from '@/types/projects';

/** Section copy. */
export const projectsContent = {
  heading: 'Tailored for every industry',
  eyebrow: 'Specialized Solutions',
  cta: { label: 'view more projects', href: '/projects' } satisfies NavLink,
  /** Ornament that precedes the heading — a pill-cropped animated GIF. */
  headingOrnament: {
    src: '/assets/img/icon/b10c3e43e836d32554bf.gif',
    alt: '',
    width: 300,
    height: 300,
  },
  /** Announced in place of the decorative pagination rail. */
  paginationLabel: 'Project',
} as const;

/**
 * The four showcase cards, in stacking order.
 *
 * Note the clip sizes: `hms.mp4` is 15 MB and `ecommerce.mp4` is 18 MB, and the
 * reference renders each of them **twice** per card (once sharp, once blurred as
 * a backdrop) with `autoplay` on page load. That is why `ProjectCard` gates
 * mounting on visibility — see the comment there.
 */
export const projectShowcases: readonly ProjectShowcase[] = [
  {
    slug: 'healthcare',
    title: 'Healthcare Solutions',
    description:
      'Smart patient management, appointment scheduling, and telemedicine platforms that improve care delivery.',
    facts: [
      { label: 'Industry', value: 'Healthcare' },
      { label: 'Focus', value: 'Efficiency & Care' },
    ],
    videoSrc: '/assets/img/industries/hms.mp4',
    href: '/projects',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce & Retail',
    description:
      'Scalable online stores, inventory management systems, and seamless payment gateways to boost your sales.',
    facts: [
      { label: 'Industry', value: 'Retail' },
      { label: 'Focus', value: 'Sales & Growth' },
    ],
    videoSrc: '/assets/img/industries/ecommerce.mp4',
    href: '/projects',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate Tech',
    description:
      'Virtual tour platforms, property listing portals, and CRM tools designed specifically for real estate agents.',
    facts: [
      { label: 'Industry', value: 'Real Estate' },
      { label: 'Focus', value: 'Engagement' },
    ],
    videoSrc: '/assets/img/industries/crm-video.mp4',
    href: '/projects',
  },
  {
    slug: 'logistics',
    title: 'Logistics Systems',
    description:
      'Fleet tracking, route optimization, and warehouse management software to streamline your supply chain.',
    facts: [
      { label: 'Industry', value: 'Logistics' },
      { label: 'Focus', value: 'Optimization' },
    ],
    videoSrc: '/assets/img/industries/logistics.mp4',
    href: '/projects',
  },
];
