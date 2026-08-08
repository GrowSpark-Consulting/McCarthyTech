import type { NavLink } from '@/types/navigation';

/**
 * Types for the content bands beneath a service detail hero.
 *
 * Kept separate from `types/service-detail.ts`, which describes the hero every
 * service has. These bands are built out one service at a time, so they are
 * attached through a `Partial` record rather than being required on every
 * `ServiceDetail` — a service without them renders the hero and technology row
 * and stops, instead of rendering empty sections.
 */

/**
 * Icon keys the section components can draw.
 *
 * A closed union mapped to Lucide components in the rendering layer. Icons
 * cannot be selected by interpolating a name at runtime — the bundler would have
 * to include every icon in the library to make that work — so the set a page can
 * reach is declared here and resolved through a lookup.
 */
export type ServiceIconKey =
  | 'smartphone'
  | 'monitor'
  | 'layers'
  | 'penTool'
  | 'rocket'
  | 'palette'
  | 'shield'
  | 'zap';

/** §4 — the "what do we do" statement. */
export interface ServiceOverviewBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead: string;
  readonly cta: NavLink;
}

/** One card in the offerings grid (§6). */
export interface ServiceOffering {
  readonly id: string;
  readonly title: string;
  /** One-line qualifier beneath the title. */
  readonly subtitle: string;
  readonly icon: ServiceIconKey;
  readonly href: string;
}

/** §6 — the four-column capability grid. */
export interface ServiceOfferingsBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly offerings: readonly ServiceOffering[];
}

/**
 * One organisation in the trust strip (§7).
 *
 * Carries a name and a monogram rather than a logo path. Displaying another
 * company's trademark as a client is a claim about a real business relationship,
 * so the artwork is deliberately left to be supplied rather than invented — drop
 * a `logoSrc` in when you have permission and the strip will render it.
 */
export interface ServiceBrand {
  readonly id: string;
  readonly name: string;
  readonly monogram: string;
}

/** §7 — the trusted-by strip. */
export interface ServiceBrandsBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly brands: readonly ServiceBrand[];
  readonly cta: NavLink;
}

/** One differentiator card (§8). */
export interface ServiceReason {
  readonly id: string;
  readonly icon: ServiceIconKey;
  readonly title: string;
  /** Short "Focus:" qualifier shown under the title. */
  readonly focus: string;
  readonly description: string;
}

/** §8 — why clients choose us. */
export interface ServiceReasonsBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly reasons: readonly ServiceReason[];
}

/**
 * One review (§9).
 *
 * Attributions are illustrative and are labelled as such where they render. A
 * testimonial names a real person making a real claim; fabricating one attached
 * to a named individual or company is not something to ship by accident, so the
 * data is structured to be replaced wholesale once real reviews exist.
 */
export interface ServiceTestimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
}

/** §9 — the reviews carousel. */
export interface ServiceTestimonialsBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly testimonials: readonly ServiceTestimonial[];
}

/** One question and answer (§10). */
export interface ServiceFaq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

/** §10 — the FAQ accordion. */
export interface ServiceFaqBand {
  readonly eyebrow: string;
  readonly heading: string;
  readonly faqs: readonly ServiceFaq[];
}

/** Every band beneath the hero, for one service. */
export interface ServiceSections {
  readonly overview: ServiceOverviewBand;
  readonly offerings: ServiceOfferingsBand;
  readonly brands: ServiceBrandsBand;
  readonly reasons: ServiceReasonsBand;
  readonly testimonials: ServiceTestimonialsBand;
  readonly faq: ServiceFaqBand;
}
