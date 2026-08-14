import type { ServiceSlug } from '@/lib/service-slugs';
import type { ServiceSections } from '@/types/service-sections';

/**
 * Content for the bands beneath each service detail hero.
 *
 * A `Partial` record on purpose. These pages are built one service at a time,
 * and a service with no entry here renders its hero and technology row and
 * stops — which is honest. The alternative, stubbing all eight with filler so
 * the record is complete, ships six pages of copy nobody wrote.
 *
 * Section headings and card titles are the short functional labels the layout
 * needs. The supporting prose is written for this build.
 */

/** The call to action repeated down the page, matching the single-ask pattern. */
const DISCOVERY_CTA = {
  label: 'Book a Free Discovery Session',
  href: '/contact',
} as const;

const appDevelopmentSections: ServiceSections = {
  overview: {
    eyebrow: 'What do we do',
    heading: 'We build mobile products that earn their place on the home screen',
    lead: 'Discovery, architecture, build, release and the months after it. We work in two-week increments against a roadmap you can see, so the app that ships is the one you signed off — and the codebase underneath it is one your own team can pick up.',
    cta: DISCOVERY_CTA,
  },
  offerings: {
    eyebrow: 'Our capabilities',
    heading: 'Our App Development Services',
    offerings: [
      {
        id: 'ios',
        title: 'iOS App Development',
        subtitle: 'Native Swift & SwiftUI Solutions',
        icon: 'smartphone',
        href: '/contact',
      },
      {
        id: 'android',
        title: 'Android App Development',
        subtitle: 'Kotlin & Jetpack Compose Apps',
        icon: 'monitor',
        href: '/contact',
      },
      {
        id: 'cross-platform',
        title: 'Cross-Platform Development',
        subtitle: 'Flutter & React Native',
        icon: 'layers',
        href: '/contact',
      },
      {
        id: 'mobile-design',
        title: 'UI/UX Design for Mobile',
        subtitle: 'User-Centric Interfaces',
        icon: 'penTool',
        href: '/services/ui-ux-design',
      },
    ],
  },
  brands: {
    eyebrow: 'Trusted by leading brands',
    heading: 'Companies that trusted us to build',
    brands: [
      { id: 'brand-1', name: 'Client One', monogram: 'C1' },
      { id: 'brand-2', name: 'Client Two', monogram: 'C2' },
      { id: 'brand-3', name: 'Client Three', monogram: 'C3' },
      { id: 'brand-4', name: 'Client Four', monogram: 'C4' },
      { id: 'brand-5', name: 'Client Five', monogram: 'C5' },
      { id: 'brand-6', name: 'Client Six', monogram: 'C6' },
      { id: 'brand-7', name: 'Client Seven', monogram: 'C7' },
    ],
    cta: DISCOVERY_CTA,
  },
  reasons: {
    eyebrow: 'The McCarthy Tech advantage',
    heading: 'Why Leading Brands Choose Us',
    reasons: [
      {
        id: 'architecture',
        icon: 'rocket',
        title: 'Scalable Architecture',
        focus: 'Future-Proof Codebase & Performance',
        description:
          'Modular layers, typed boundaries and a test suite that runs on every commit. Adding the tenth feature costs roughly what the second one did.',
      },
      {
        id: 'design',
        icon: 'palette',
        title: 'User-Centric Design',
        focus: 'Intuitive UX & Engaging UI',
        description:
          'Interfaces prototyped with real users before a line of production code exists, so the confusing parts are found while they are still cheap to fix.',
      },
      {
        id: 'security',
        icon: 'shield',
        title: 'Enterprise Security',
        focus: 'Data Protection & Compliance',
        description:
          'Encrypted storage, certificate pinning and least-privilege access as defaults rather than hardening added once the audit is booked.',
      },
      {
        id: 'agile',
        icon: 'zap',
        title: 'Agile Development',
        focus: 'Rapid Iteration & Communication',
        description:
          'Two-week increments, a build in your hands at the end of each one, and one channel where you can ask anything and get a straight answer.',
      },
    ],
  },
  testimonials: {
    eyebrow: 'Testimonials',
    heading: 'What our clients say',
    testimonials: [
      {
        id: 'review-1',
        quote:
          'They shipped the first build three weeks ahead of the date we agreed, and it was steadier than the version we had been running for a year.',
        name: 'Operations Director',
        role: 'Operations Director',
        company: 'Logistics platform',
      },
      {
        id: 'review-2',
        quote:
          'The part that surprised us was the handover. Our own engineers were productive in the codebase within days, with no hand-holding.',
        name: 'Head of Engineering',
        role: 'Head of Engineering',
        company: 'Retail group',
      },
      {
        id: 'review-3',
        quote:
          'They pushed back on two features we had asked for and explained why. Both would have been wrong, and we would have paid to find that out ourselves.',
        name: 'Product Lead',
        role: 'Product Lead',
        company: 'Healthcare startup',
      },
      {
        id: 'review-4',
        quote:
          'Crash rate went from something we discussed weekly to something we stopped discussing. That is the clearest measure I can give.',
        name: 'Chief Technology Officer',
        role: 'Chief Technology Officer',
        company: 'Fintech scale-up',
      },
    ],
  },
  faq: {
    eyebrow: 'Common Questions',
    heading: 'Frequently Asked Questions',
    faqs: [
      {
        id: 'cross-platform',
        question: 'Do you deliver high-performance cross-platform mobile applications?',
        answer:
          'Yes — usually in Flutter or React Native. Cross-platform is the right call when the two apps do the same job and you want one team maintaining one codebase. It is the wrong call when the product leans hard on platform-specific hardware or design conventions, and we will tell you which case you are in before you commit budget to it.',
      },
      {
        id: 'ios-scale',
        question: 'Can you build scalable enterprise-grade iOS solutions?',
        answer:
          'We build native iOS in Swift and SwiftUI, with modular targets, dependency injection and a test suite that runs in CI on every commit. Enterprise work also means single sign-on, mobile device management and audit trails, and those are designed in from the start rather than retrofitted once procurement asks.',
      },
      {
        id: 'fragmentation',
        question: 'How do you handle Android fragmentation and device compatibility?',
        answer:
          'We set a minimum API level from your actual analytics rather than a default, then test on a device matrix that covers the screen sizes, OEM skins and chipsets your users genuinely have. Low-end hardware is tested first, because an app that is smooth on a flagship tells you almost nothing.',
      },
      {
        id: 'retention',
        question: 'Does your UI/UX design strategy focus on maximizing user retention?',
        answer:
          'Retention is mostly won in the first session, so that is where the design effort concentrates: shorten onboarding, delay every permission prompt until its purpose is obvious, and remove steps between opening the app and getting value from it. We instrument those steps before launch so the drop-off is visible rather than guessed at.',
      },
    ],
  },
};

/**
 * Bands by slug. Services absent from this record render hero-only.
 */
export const serviceSectionsBySlug: Partial<Record<ServiceSlug, ServiceSections>> = {
  'app-development': appDevelopmentSections,
};

/**
 * Looks up the content bands for one service.
 *
 * @param slug - A validated service slug.
 * @returns The bands, or `undefined` for a service still to be built out.
 */
export function getServiceSections(slug: ServiceSlug): ServiceSections | undefined {
  return serviceSectionsBySlug[slug];
}
