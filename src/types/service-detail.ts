import type { NavLink } from '@/types/navigation';

/**
 * Service detail domain types.
 *
 * Each of the eight service routes under `/services/[slug]` renders from one
 * `ServiceDetail` record. Modelling the page as data rather than as eight
 * hand-written pages is what guarantees every service gets the same structure,
 * the same SEO completeness, and the same accessible markup — and it makes
 * adding a ninth service a data change rather than a new component tree.
 *
 * The shape is deliberately narrow at this phase: it describes exactly what the
 * hero band renders. Later bands extend it rather than the record carrying
 * fields nothing reads.
 */

/**
 * The four accent themes the detail pages are drawn from.
 *
 * A closed union rather than a free-form colour string, because the accent
 * selects a set of pre-authored Tailwind classes. Tailwind's scanner only sees
 * class names that appear literally in source, so a runtime-interpolated
 * `text-${accent}` would compile to nothing at all. The union makes that
 * impossible to get wrong — an unhandled accent is a type error, not a page
 * that silently renders unstyled.
 */
export type ServiceAccent = 'mint' | 'lime' | 'violet' | 'cyan';

/**
 * One of the two figures that count up beneath the hero copy.
 *
 * `value` is a number rather than a display string because these animate —
 * `react-countup` needs something to count to. The unit lives in `suffix` so the
 * counter can tick the digits while the "+" or "%" stays put.
 */
export interface ServiceStat {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Target the counter climbs to. */
  readonly value: number;
  /** Unit appended after the digits, e.g. "+" or "%". Empty string for none. */
  readonly suffix: string;
  /** What the figure counts, e.g. "Successful mobile apps". */
  readonly label: string;
}

/**
 * One technology chip in the row beneath the hero.
 *
 * Rendered as an original monogram tile rather than a vendor logo. Naming the
 * technologies a team works in is plain fact; reproducing each vendor's
 * trademarked artwork is a separate matter, and not one this project needs to
 * take on for a decorative row.
 */
export interface ServiceTech {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Full technology name, shown as the chip's label. */
  readonly name: string;
  /** One- or two-character monogram drawn in the chip's tile. */
  readonly monogram: string;
}

/** Everything the detail hero band renders. */
export interface ServiceHero {
  /**
   * The service name, shown above the headline alongside the animated ornament.
   *
   * Read together with {@link headline} it forms one phrase — "App Development"
   * / "for Business Growth" — which is why the headline reads as a fragment on
   * its own.
   */
  readonly eyebrow: string;
  /** The remainder of the headline phrase, rendered as the `<h1>`. */
  readonly headline: string;
  /** Supporting paragraph beneath the headline. */
  readonly lead: string;
  /** The single primary call to action. */
  readonly cta: NavLink;
  /** Exactly two counters. */
  readonly stats: readonly [ServiceStat, ServiceStat];
  /** Technologies shown in the chip row directly beneath the hero. */
  readonly tech: readonly ServiceTech[];
}

/**
 * One logo in the hero's overlapping platform cluster.
 *
 * Dimensions are required rather than optional because the cluster overlaps its
 * members by a negative margin — a logo that arrives without reserved space
 * shifts the two beside it, and the row is directly beneath the headline where a
 * layout shift is at its most visible.
 */
export interface ServiceHeroLogo {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Path under `public/`. */
  readonly src: string;
  /** Technology name. These identify the platforms, so they are not decorative. */
  readonly alt: string;
  /** Intrinsic pixel dimensions. */
  readonly width: number;
  readonly height: number;
}

/**
 * A looping clip with the still it falls back to.
 *
 * Used by the hero's full-bleed backdrop and by the offering cards alike — both
 * play a muted loop over a poster, and both need the poster to carry the frame
 * whenever the clip is deferred or suppressed.
 */
export interface ServiceClip {
  /**
   * Path under `public/`.
   *
   * Optional, because not every card is a clip: the AI pages use static artwork
   * in slots where the others play video. Omitting it renders the poster alone,
   * which is a complete card rather than a broken one — no `<video>` is mounted
   * and nothing is fetched.
   */
  readonly src?: string;
  /** MIME type, so the browser can skip a source it cannot play. */
  readonly type?: string;
  /** The still. Always present — it is what the slot shows when there is no clip. */
  readonly poster: string;
}

/**
 * The reference's `hero-style--three` band.
 *
 * Six of the eight service pages open with this exact arrangement: a headline
 * split around an animated ornament, a sub-heading set inline after it, a
 * floating shape, and a baseline row reading
 * "Successful / Mobile Apps  [logos]  Deployed  [CTA]". The remaining two —
 * AI Implementation and AI Chatbot — use a two-column variant instead, which is
 * why this is its own type rather than fields bolted onto {@link ServiceHero}.
 *
 * The headline is modelled as two halves rather than one string because the
 * ornament sits *between* them, mid-phrase. Storing the markup would put
 * presentation in the content layer; storing the two halves keeps the component
 * free to decide what goes in the gap.
 */
export interface ServiceHeroBand {
  /** Headline text before the ornament, e.g. "App Development". */
  readonly titleLead: string;
  /** Headline text after the ornament, e.g. "for Business Growth". */
  readonly titleTrail: string;
  /** The sentence set inline after the headline. */
  readonly subTitle: string;
  /** Quiet first line of the baseline metric, e.g. "Successful". */
  readonly metricLead: string;
  /** Accented second line, e.g. "Mobile Apps". */
  readonly metricSubject: string;
  /** Display-size word closing the metric phrase, e.g. "Deployed". */
  readonly metricVerb: string;
  /**
   * Platform logos between the metric and its closing word.
   *
   * Empty for the services the reference shows none for — UI/UX Design and AI
   * Marketing both render the row without a cluster.
   */
  readonly logos: readonly ServiceHeroLogo[];
  /** The single call to action. */
  readonly cta: NavLink;
  /** Background clip for the band. */
  readonly clip: ServiceClip;
}

/**
 * One card in the offerings grid.
 *
 * The card is a 4:5 clip; everything else — caption, description, link — lives
 * in a panel that is scaled to nothing until the card is hovered or something
 * inside it takes focus.
 */
export interface ServiceOfferingCard {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Caption, e.g. "iOS App Development". */
  readonly title: string;
  /** Single supporting line, e.g. "Native Swift & SwiftUI Solutions". */
  readonly description: string;
  /** Where the card's arrow leads. */
  readonly href: string;
  /** The looping clip and its poster frame. */
  readonly clip: ServiceClip;
}

/**
 * The reference's `#service` band — the offerings grid.
 *
 * A heading row that splits a scroll-revealed statement from a supporting
 * paragraph, above a four-column grid of clip cards.
 */
export interface ServiceOfferingsBand {
  /** Square-marked label above the statement. */
  readonly eyebrow: string;
  /** The statement that lights word by word as it scrolls. */
  readonly statement: string;
  /** Paragraph set to the right of the statement at desktop widths. */
  readonly body: string;
  /** The cards, in render order. */
  readonly cards: readonly ServiceOfferingCard[];
}

/**
 * The reference's `section.about` — the overview panel beneath the hero.
 *
 * A dark inset panel carrying a lime-squared eyebrow pinned to its top-left
 * corner, a scroll-revealed statement, a supporting paragraph set beside the
 * call to action, and a slowly rotating ring bleeding in from above.
 */
export interface ServiceOverviewBand {
  /** The label pinned to the panel's corner, e.g. "What do we do". */
  readonly eyebrow: string;
  /** The statement that lights word by word as it scrolls. */
  readonly statement: string;
  /** Supporting paragraph, set to the left of the call to action. */
  readonly body: string;
  /** The single call to action, repeated from the hero. */
  readonly cta: NavLink;
}

/**
 * One card in the "why leading brands choose us" grid.
 *
 * The title is stored as three parts because the reference sets them
 * differently: an emoji, a run in white, and a closing run in the accent. Keeping
 * them separate leaves the markup to the component instead of pushing a `<span>`
 * into the content layer.
 */
export interface ServiceChooseCard {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Two-digit ordinal shown on the clip, e.g. "01". */
  readonly index: string;
  /** Leading emoji. Decorative, and hidden from assistive technology. */
  readonly emoji: string;
  /** First half of the title, set in white. */
  readonly titleLead: string;
  /** Closing half, set in the accent. */
  readonly titleAccent: string;
  /** What follows the bold "Focus:" label. */
  readonly focus: string;
  /** The looping clip and its poster frame. */
  readonly clip: ServiceClip;
}

/** The reference's `.award` band — a 2×2 grid of clip cards. */
export interface ServiceChooseBand {
  /** Square-marked label above the grid. */
  readonly eyebrow: string;
  /** The cards, in render order. */
  readonly cards: readonly ServiceChooseCard[];
}

/** One client in the brand band's switcher. */
export interface ServiceBrandEntry {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Client name, as shown in the list. */
  readonly name: string;
  /** Path to the logo under `public/`. */
  readonly logo: string;
}

/**
 * The reference's `.brand` band — a client switcher over a looping clip.
 *
 * Selecting a name swaps the logo beside it. The reference ships all seven logos
 * and toggles `display`; this renders only the selected one, which is the same
 * result with six fewer image requests.
 */
export interface ServiceBrandBand {
  /** Square-marked label above the statement. */
  readonly eyebrow: string;
  /** The statement that lights word by word as it scrolls. */
  readonly statement: string;
  /** Paragraph above the switcher. */
  readonly body: string;
  /** The line beneath the switcher, above the call to action. */
  readonly closing: string;
  /** The call to action. */
  readonly cta: NavLink;
  /** Clients, in render order. The first is selected initially. */
  readonly brands: readonly ServiceBrandEntry[];
  /** Background clip for the band. */
  readonly clip: ServiceClip;
}

/** One question in the FAQ band, with the clip it swaps in when opened. */
export interface ServiceFaqEntry {
  /** Stable key for list rendering. */
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  /** Shown beside the accordion while this entry is the open one. */
  readonly clip: ServiceClip;
}

/** The reference's `.faq` band — an accordion that drives a clip beside it. */
export interface ServiceFaqBand {
  /** Square-marked label above the statement. */
  readonly eyebrow: string;
  /** The statement that lights word by word as it scrolls. */
  readonly statement: string;
  /** The questions, in render order. The first is open initially. */
  readonly faqs: readonly ServiceFaqEntry[];
}

/**
 * The reference's `hero-style--two` band — the two-column hero.
 *
 * Used by AI Implementation and AI Chatbot, and sharing nothing with
 * {@link ServiceHeroBand} beyond the word "hero": copy sits in a left column at
 * half width, artwork fills the right, and a blurred slab bleeds off the bottom
 * edge instead of a bordered panel.
 */
export interface ServiceSplitHeroBand {
  /** The headline. One string — no ornament splits it here. */
  readonly title: string;
  /** Supporting sentence beneath the headline. */
  readonly subTitle: string;
  /** The single call to action. */
  readonly cta: NavLink;
  /** Artwork or clip filling the right column. */
  readonly media: ServiceClip;
  /** Backdrop behind the whole band. */
  readonly background: string;
}

/** One tab in the showcase frame. */
export interface ServiceShowcaseTab {
  /** Stable key, and the fragment the panel is addressed by. */
  readonly id: string;
  /** Tab label, e.g. "Dashboard". */
  readonly label: string;
  /** Small icon shown before the label. Decorative. */
  readonly icon: string;
  /** The clip this tab reveals. */
  readonly clip: ServiceClip;
}

/**
 * The reference's `.video` band — a browser frame with tabbed clips inside it.
 *
 * The frame is a PNG, and the tab strip and clip are absolutely positioned over
 * it, so the whole thing reads as a screen recording of an application without
 * any of it being one.
 */
export interface ServiceShowcaseBand {
  /** The tabs, in render order. The first is selected initially. */
  readonly tabs: readonly ServiceShowcaseTab[];
}

/**
 * The decorative overlay a feature card carries over its clip.
 *
 * A closed union rather than a class name, because each one is a different
 * asset positioned differently and animated differently — the only thing they
 * share is sitting on top of a video.
 */
export type ServiceFeatureOrnament = 'logo' | 'scan' | 'circle' | 'security';

/** One card in the features grid. */
export interface ServiceFeatureCard {
  /** Stable key for list rendering. */
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly clip: ServiceClip;
  /** Which overlay sits over the clip, if any. */
  readonly ornament?: ServiceFeatureOrnament;
  /** Whether this card spans two thirds of the row rather than one third. */
  readonly wide?: boolean;
  /**
   * Pulls the card ahead of its siblings at desktop widths.
   *
   * The reference's `order-lg-first`. It exists so the narrow card can lead the
   * row visually while the wide one keeps its place in source — which is the
   * order a screen reader and a crawler follow.
   */
  readonly orderFirst?: boolean;
}

/** The reference's `#features` band — a mixed-width grid of clip cards. */
export interface ServiceFeaturesBand {
  /** Label above the heading, between two small icons. */
  readonly eyebrow: string;
  /** The heading, set after an animated pill. */
  readonly title: string;
  /** The call to action set inline at the end of the heading. */
  readonly cta: NavLink;
  /** The cards, in render order. */
  readonly cards: readonly ServiceFeatureCard[];
}

/**
 * The reference's marquee `brand` band — a scrolling strip of client logos.
 *
 * Not to be confused with {@link ServiceBrandBand}, which is the switcher on the
 * `hero-style--three` pages. This one has no interaction at all: a label between
 * two small icons, and a continuous horizontal run of marks beneath it.
 */
export interface ServiceLogoMarqueeBand {
  /** Label above the strip, set between two icons. */
  readonly eyebrow: string;
  /** Logo paths under `public/`, in render order. */
  readonly logos: readonly string[];
}

/** One step in the process band's sticky indicator. */
export interface ServiceProcessStep {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Two-digit ordinal drawn over the card's artwork, e.g. "01". */
  readonly number: string;
  /** Step name, e.g. "Assess & Strategy". */
  readonly name: string;
  /** The panel shown alongside this step. */
  readonly image: string;
}

/**
 * The reference's `#process` band.
 *
 * A sticky left column whose step card changes as the right column's panels
 * scroll past it — only one step is ever mounted visibly, the rest being
 * `display: none` until their turn.
 */
export interface ServiceProcessBand {
  /** Label above the heading, e.g. "How It Works". */
  readonly eyebrow: string;
  /** The heading, e.g. "Implement AI in 3 Steps". */
  readonly title: string;
  /** The call to action set inline after the heading. */
  readonly cta: NavLink;
  /** Artwork behind every step card's ordinal. Shared by all steps. */
  readonly stepArtwork: string;
  /** The steps, in order. */
  readonly steps: readonly ServiceProcessStep[];
}

/**
 * The reference's `#integration` band.
 *
 * Two halves stacked: a claim with a checklist beside two counter-scrolling
 * columns of platform marks, and beneath it a before/after comparison split by a
 * "VS" badge.
 */
export interface ServiceIntegrationBand {
  /** Label above the heading, e.g. "Seamless Ecosystem". */
  readonly eyebrow: string;
  /** The heading, e.g. "Integration with your stack". */
  readonly title: string;
  /** The four capability lines beside the heading. */
  readonly capabilities: readonly string[];
  /** The call to action beneath them. */
  readonly cta: NavLink;
  /** Platform logo paths, split across two columns at render time. */
  readonly logos: readonly string[];
  /** Heading and lines for the "before" column. */
  readonly beforeTitle: string;
  readonly before: readonly string[];
  /** Heading and lines for the "after" column. */
  readonly afterTitle: string;
  readonly after: readonly string[];
}

/** One plan in the pricing band. */
export interface ServicePricingPlan {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Small icon above the price. */
  readonly icon: string;
  /** Monthly price in whole units, e.g. 0 or 49. */
  readonly monthly: number;
  /**
   * Yearly price, when the plan offers one.
   *
   * Absent on plans with nothing to toggle — the trial has one price and no
   * billing choice, so it renders {@link period} instead of a switch.
   */
  readonly yearly?: number;
  /** Suffix beside a fixed price, e.g. "/1-Month Trial". */
  readonly period?: string;
  /** Label on the plan's call to action. */
  readonly ctaLabel: string;
  /** Destination for that call to action. */
  readonly ctaHref: string;
  /** Corner tag, e.g. "Pilot Phase". */
  readonly tag: string;
  /** Whether this is the highlighted plan. */
  readonly featured?: boolean;
  /** What the plan includes. */
  readonly features: readonly string[];
}

/** The reference's `#pricing` band. */
export interface ServicePricingBand {
  readonly eyebrow: string;
  /** Heading text before the inline ornament. */
  readonly titleLead: string;
  /** Heading text after it. */
  readonly titleTrail: string;
  readonly plans: readonly ServicePricingPlan[];
}

/** One question in the numbered FAQ accordion. */
export interface ServiceNumberedFaq {
  readonly id: string;
  /** Two-digit ordinal shown before the question. */
  readonly number: string;
  readonly question: string;
  readonly answer: string;
}

/** The reference's `#faq` band — a numbered accordion, no media. */
export interface ServiceNumberedFaqBand {
  readonly eyebrow: string;
  readonly title: string;
  readonly faqs: readonly ServiceNumberedFaq[];
}

/** The reference's closing `cta` band. */
export interface ServiceCtaBand {
  readonly eyebrow: string;
  readonly title: string;
  readonly cta: NavLink;
}

/** Search-engine copy for one detail route. */
/** One step in a sub-service's process accordion. */
export interface ServiceSubProcessStep {
  /** Stable key for list rendering. */
  readonly id: string;
  /** Step name, e.g. "Strategy & Discovery". */
  readonly title: string;
  /** What happens during this step. */
  readonly description: string;
}

/**
 * One of the offering cards' own detail pages — the reference's
 * `service-details` template.
 *
 * Only App Development's four cards resolve to real pages on the reference
 * site; every other service's cards link back to their own parent page. This
 * type exists for that one case rather than being folded into
 * {@link ServiceOfferingCard}, so the other seven services cannot accidentally
 * imply a sub-page that was never built.
 */
export interface ServiceSubDetail {
  /** URL segment under the parent service, e.g. `ios`. */
  readonly slug: string;
  /** Parent service's slug, e.g. `app-development`. */
  readonly parentSlug: string;
  /** Full `<title>` and meta description. */
  readonly seo: ServiceSeo;
  /** Breadcrumb label and `<h1>` text, e.g. "iOS App Development". */
  readonly title: string;
  /** Hero image shown above the description. */
  readonly heroImage: string;
  /** Sub-heading introducing the description, e.g. "Native Swift & SwiftUI Solutions". */
  readonly subtitle: string;
  /** One or two supporting paragraphs. */
  readonly description: readonly string[];
  /** The four-step process accordion. */
  readonly process: readonly ServiceSubProcessStep[];
  /** Heading above the outcome checklist, e.g. "Services outcome". */
  readonly outcomeHeading: string;
  /** What the engagement delivers. */
  readonly outcomes: readonly string[];
}

export interface ServiceSeo {
  /** Full `<title>`, authored absolutely so it is not squeezed through the site template twice. */
  readonly title: string;
  /** Meta description and Open Graph description. */
  readonly description: string;
}

/** One service detail page, end to end. */
export interface ServiceDetail {
  /**
   * URL segment under `/services/`.
   *
   * Must match the `href` the navigation already publishes for this service.
   * `warnOnNavigationDrift` in `lib/service-details.ts` compares the two lists
   * at module load, so a mismatch surfaces in development rather than being
   * discovered as a 404 in production.
   */
  readonly slug: string;
  /** Human name, used in the breadcrumb, the JSON-LD, and the accessible page title. */
  readonly name: string;
  /** Which of the four themes this page is drawn in. */
  readonly accent: ServiceAccent;
  readonly seo: ServiceSeo;
  readonly hero: ServiceHero;
  /**
   * The reference-accurate opening band, once this service has been ported to it.
   *
   * Optional on purpose, and only for as long as the port is in progress. The
   * services are being rebuilt against the reference one at a time; a service
   * that has a band renders it, and one that does not falls back to
   * {@link hero}. Making it required would mean rewriting all eight at once,
   * which is exactly the big-bang change the phased order exists to avoid.
   *
   * When the eighth service lands, this becomes required and {@link hero} goes
   * away with it.
   */
  readonly heroBand?: ServiceHeroBand;
  /**
   * The reference-accurate overview panel. Optional for the same reason as
   * {@link heroBand} — the port lands one band at a time.
   */
  readonly overviewBand?: ServiceOverviewBand;
  /**
   * The reference-accurate offerings grid. Optional for the same reason as
   * {@link heroBand} — the port lands one band at a time.
   */
  readonly offeringsBand?: ServiceOfferingsBand;
  /**
   * The reference-accurate "why choose us" grid. Optional for the same reason as
   * {@link heroBand} — the port lands one band at a time.
   */
  readonly chooseBand?: ServiceChooseBand;
  /**
   * The reference-accurate client band. Optional for the same reason as
   * {@link heroBand} — the port lands one band at a time.
   */
  readonly brandBand?: ServiceBrandBand;
  /**
   * The reference-accurate FAQ band. Optional for the same reason as
   * {@link heroBand} — the port lands one band at a time.
   */
  readonly faqBand?: ServiceFaqBand;
  /**
   * The reference-accurate two-column hero, for the services that use it
   * instead of {@link heroBand}. The two are mutually exclusive.
   */
  readonly splitHeroBand?: ServiceSplitHeroBand;
  /** The reference-accurate showcase frame, on the pages that carry one. */
  readonly showcaseBand?: ServiceShowcaseBand;
  /** The reference-accurate features grid, on the pages that carry one. */
  readonly featuresBand?: ServiceFeaturesBand;
  /** The reference-accurate logo marquee, on the pages that carry one. */
  readonly logoMarqueeBand?: ServiceLogoMarqueeBand;
  /** The reference-accurate process band, on the pages that carry one. */
  readonly processBand?: ServiceProcessBand;
  /** The reference-accurate integration band, on the pages that carry one. */
  readonly integrationBand?: ServiceIntegrationBand;
  /** The reference-accurate pricing band, on the pages that carry one. */
  readonly pricingBand?: ServicePricingBand;
  /** The numbered FAQ accordion, distinct from the media-linked `faqBand`. */
  readonly numberedFaqBand?: ServiceNumberedFaqBand;
  /** The closing call-to-action band. */
  readonly ctaBand?: ServiceCtaBand;
}
