import type { NavLink } from '@/types/navigation';

/**
 * Content for the `/services` hub.
 *
 * Kept separate from `lib/services.ts`, which holds the seven-item accordion the
 * homepage renders. The hub advertises nine capabilities — a different, longer
 * list — and conflating them would force one page's copy to distort the other's.
 */

/** One card in the capability grid. */
export interface ServiceCapability {
  /** Two-digit index shown in the card corner. */
  readonly number: string;
  readonly title: string;
  readonly description: string;
  /** Looping preview clip. */
  readonly videoSrc: string;
  /** Destination. Three cards share `/services` — see the note below. */
  readonly href: string;
}

export const servicesPageContent = {
  eyebrow: 'What we build',
  /** Rendered as two lines, the second in the accent colour. */
  titleLines: ['Engineering the', 'Future'] as const,
  lead: 'Premium IT solutions from Singapore to the rest of the world — we turn complex ideas into scalable digital realities.',
  primaryCta: { label: 'Start your project', href: '/contact' } satisfies NavLink,
  secondaryCta: { label: 'Explore services', href: '#capabilities' } satisfies NavLink,
  /** Ticker of disciplines beneath the hero copy. */
  disciplines: [
    'AI & LLMs',
    'Web',
    'Mobile',
    'UI / UX',
    'Cloud',
    'Branding',
    'Data',
    'Automation',
    'E-commerce',
    'CRM',
  ],
  gridEyebrow: 'Our capabilities',
  gridHeading: 'Everything you need, under one roof',
  whyEyebrow: 'The McCarthy Tech advantage',
  whyHeading: 'Why partner with us',
  ctaEyebrow: "Let's talk",
  ctaHeading: 'Have a project in mind?',
  ctaLead: "Book a free consultation and let's build something remarkable together.",
  ctaButton: { label: 'Get a free consultation', href: '/contact' } satisfies NavLink,
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ] satisfies readonly NavLink[],
} as const;

/** The four figures beneath the grid. */
export const servicesPageStats = [
  { id: 'projects', value: '30+', label: 'Projects Delivered' },
  { id: 'countries', value: '12+', label: 'Countries Served' },
  { id: 'experts', value: '50+', label: 'Skilled Experts' },
  { id: 'satisfaction', value: '100%', label: 'Client Satisfaction' },
] as const;

/** "Why partner with us" — four differentiators. */
export const servicesPageReasons = [
  {
    id: 'global-footprint',
    title: 'Global Footprint',
    description: 'Over 30 projects delivered across continents and industries.',
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Innovation',
    description: 'Everything from the first brand logo to the final AI integration.',
  },
  {
    id: 'agile',
    title: 'Agile Methodology',
    description: 'We adapt to your feedback in real time so the result exceeds expectations.',
  },
  {
    id: 'support',
    title: 'Dedicated Support',
    description: 'Singapore roots, global reach — premium engineering with a personal touch.',
  },
] as const;

/**
 * The nine capability cards, in grid order.
 *
 * Cards 07–09 point at `/services` rather than a detail route. The reference
 * links them to `/services/details`, a placeholder that does not describe any
 * one of the three — following it would land a visitor on generic copy that
 * contradicts the card they clicked. Sending them back to the hub is the honest
 * behaviour until those three pages exist.
 */
export const serviceCapabilities: readonly ServiceCapability[] = [
  {
    number: '01',
    title: 'App Development',
    description:
      'Native & cross-platform iOS/Android apps built for seamless performance, scale and security.',
    videoSrc: '/assets/img/video-assets/mobile-apps.mp4',
    href: '/services/app-development',
  },
  {
    number: '02',
    title: 'Web Development',
    description:
      'High-converting corporate sites and complex web platforms engineered for speed and scale.',
    videoSrc: '/assets/img/video-assets/web-dev.mp4',
    href: '/services/web-development',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description:
      'User-centric interfaces that are as intuitive to use as they are beautiful to look at.',
    videoSrc: '/assets/img/video-assets/ui-ux-design.mp4',
    href: '/services/ui-ux-design',
  },
  {
    number: '04',
    title: 'AI Implementation & LLMs',
    description:
      'From automation to large language models, we embed data-driven intelligence into your operations.',
    videoSrc: '/assets/img/video-assets/ai-main.mp4',
    href: '/services/ai-implementation',
  },
  {
    number: '05',
    title: 'Digital Marketing',
    description:
      'Growth-driven SEO, social and content campaigns that put your brand in front of the right people.',
    videoSrc: '/assets/img/video-assets/digital.mp4',
    href: '/services/digital-marketing',
  },
  {
    number: '06',
    title: 'Branding',
    description:
      'Strategic identity work that makes your business unmistakable across every touchpoint.',
    videoSrc: '/assets/img/video-assets/branding3.mp4',
    href: '/services/branding',
  },
  {
    number: '07',
    title: 'E-commerce Solutions',
    description:
      'Scalable storefronts, inventory systems and seamless payment gateways that lift your sales.',
    videoSrc: '/assets/img/video-assets/saas.mp4',
    href: '/services',
  },
  {
    number: '08',
    title: 'ERP & CRM Systems',
    description:
      'Tailored internal platforms that bring your operations, pipeline and reporting into one place.',
    videoSrc: '/assets/img/video-assets/crm-design.mp4',
    href: '/services',
  },
  {
    number: '09',
    title: 'AI-Powered Tools',
    description:
      'Bespoke assistants, chatbots and copilots that do the repetitive work so your team does not.',
    videoSrc: '/assets/img/video-assets/ai-screen.mp4',
    href: '/services',
  },
];
