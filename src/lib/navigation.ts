import type { MegaMenuPromo, NavLink, PrimaryNavItem, ServiceMenuItem } from '@/types/navigation';

/**
 * Navigation content — the single source of truth for every menu surface.
 *
 * Labels, hrefs, ordering, and supporting copy are transcribed verbatim from the
 * reference site, including its lowercase CTA labels ("join now",
 * "contact us now"), which are styled to uppercase in CSS rather than baked into
 * the content.
 */

/** The nine tiles in the desktop services mega-menu, in render order. */
export const serviceMenuItems: readonly ServiceMenuItem[] = [
  {
    label: 'App Development',
    href: '/services/app-development',
    iconSrc: '/assets/img/icon/m_01.svg',
    description: 'Custom mobile solutions.',
  },
  {
    label: 'Web Development',
    href: '/services/web-development',
    iconSrc: '/assets/img/icon/m_02.svg',
    description: 'Scalable web platforms.',
  },
  {
    label: 'UI/UX Design',
    href: '/services/ui-ux-design',
    iconSrc: '/assets/img/icon/m_03.svg',
    description: 'Intuitive user experiences.',
  },
  {
    label: 'Branding',
    href: '/services/branding',
    iconSrc: '/assets/img/icon/m_05.svg',
    description: 'Strategic brand identity.',
  },
  {
    label: 'Digital Marketing',
    href: '/services/digital-marketing',
    iconSrc: '/assets/img/icon/service-icon05.svg',
    description: 'Growth-driven marketing.',
  },
  {
    label: 'AI Implementation',
    href: '/services/ai-implementation',
    iconSrc: '/assets/img/icon/service-icon01.svg',
    description: 'Enterprise AI solutions.',
  },
  {
    label: 'AI Chatbot',
    href: '/services/ai-chatbot',
    iconSrc: '/assets/img/icon/service-icon03.svg',
    description: 'Conversational AI assistants.',
  },
  {
    label: 'AI Marketing',
    href: '/services/ai-marketing',
    iconSrc: '/assets/img/icon/service-icon02.svg',
    description: 'AI-powered campaigns.',
  },
  {
    label: 'View All Services',
    href: '/services',
    iconSrc: '/assets/img/icon/m_04.svg',
    description: 'Explore our full capabilities.',
  },
] as const;

/**
 * The service tiles the mobile drawer exposes.
 *
 * The reference drawer lists seven of the nine — it omits the two conversational
 * AI entries — so the port mirrors that rather than silently expanding the
 * mobile menu. Derived by filtering the canonical list so the two can never
 * drift apart in copy or href.
 */
const MOBILE_OMITTED_SERVICE_HREFS: readonly string[] = [
  '/services/ai-chatbot',
  '/services/ai-marketing',
];

export const mobileServiceMenuItems: readonly ServiceMenuItem[] = serviceMenuItems.filter(
  (item) => !MOBILE_OMITTED_SERVICE_HREFS.includes(item.href),
);

/** Desktop primary navigation, in render order. */
export const primaryNavItems: readonly PrimaryNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', services: serviceMenuItems },
  { label: 'About Us', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
] as const;

/**
 * Mobile drawer navigation.
 *
 * The drawer surfaces two routes the desktop bar does not (Blog and Projects),
 * matching the reference.
 */
export const mobileNavItems: readonly PrimaryNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', services: mobileServiceMenuItems },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
] as const;

/** Promo panel rendered to the right of the mega-menu grid. */
export const megaMenuPromo: MegaMenuPromo = {
  videoSrc: '/assets/img/video-assets/ai-main.mp4',
  heading: 'Looking for custom AI solutions tailored to you?',
  cta: { label: 'contact us now', href: '/contact' },
  width: 171,
  height: 186,
} as const;

/** CTA below the mega-menu grid. */
export const megaMenuConsultationCta: NavLink = {
  label: 'Get free consultation',
  href: '/contact',
} as const;

/** The lime pill button pinned to the right of the desktop header. */
export const headerCta: NavLink = {
  label: 'join now',
  href: '/contact',
} as const;
