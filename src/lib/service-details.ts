import { serviceMenuItems } from '@/lib/navigation';
import {
  APP_PLATFORM_LOGOS,
  HERO_BAND_CLIP_TYPE,
  HERO_BAND_POSTER,
  SHARED_CLIENT_BRANDS,
  WEB_AUDIENCE_LOGOS,
} from '@/lib/service-hero-band';
import {
  SERVICE_DETAIL_SLUGS,
  isServiceSlug,
  serviceDetailPaths,
  type ServiceSlug,
} from '@/lib/service-slugs';
import type { ServiceDetail } from '@/types/service-detail';

/**
 * Content for the eight `/services/[slug]` detail pages.
 *
 * This module is the single source of truth for which detail routes exist. The
 * dynamic route's `generateStaticParams`, the sitemap, and the prefetch
 * allow-list in `lib/routes.ts` all derive from {@link serviceDetails}, so a
 * service cannot ship half-wired — present in the navigation but absent from
 * the sitemap, or rendered but never prefetched.
 *
 * **Copy.** The reference's detail pages are structured as: service name and
 * ornament, a headline that completes the phrase, a one-sentence lead, two
 * counters, one CTA, and a technology row. That arrangement is reproduced here.
 * The wording itself is original to this build, and the technology row is drawn
 * as monogram tiles rather than vendor logos.
 *
 * The shared CTA label is deliberate: the reference repeats one call to action
 * down the whole page rather than varying it, and a single consistent ask
 * converts better than four competing ones.
 */

/** The one call to action every detail page leads with. */
const DISCOVERY_CTA = {
  label: 'Book a Free Discovery Session',
  href: '/contact',
} as const;

/**
 * Every service, keyed by slug.
 *
 * A `Record<ServiceSlug, …>` rather than an array, so the compiler enforces that
 * each of the eight slugs has a record. Adding a slug to
 * {@link SERVICE_DETAIL_SLUGS} without writing its copy fails `tsc` — the
 * alternative is a route that builds cleanly and 404s at runtime.
 *
 * Accents cycle through the four themes rather than grouping by discipline, so
 * no two adjacent entries in the mega-menu open pages that look identical.
 */
const serviceDetailsBySlug: Record<ServiceSlug, ServiceDetail> = {
  'app-development': {
    slug: 'app-development',
    name: 'App Development',
    accent: 'cyan',
    seo: {
      title: 'App Development — Native & Cross-Platform Mobile Apps | McCarthy Tech',
      description:
        'Scalable iOS and Android applications built for engagement and return. Native Swift and Kotlin, or one cross-platform codebase — whichever your roadmap actually needs.',
    },
    hero: {
      eyebrow: 'App Development',
      headline: 'for Business Growth',
      lead: 'Scalable, user-centric mobile applications for iOS and Android — engineered to hold up on mid-range hardware, and architected so year two of features is not year one rewritten.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'apps', value: 40, suffix: '+', label: 'Successful mobile apps' },
        { id: 'deployed', value: 12, suffix: '', label: 'Countries deployed in' },
      ],
      tech: [
        { id: 'swift', name: 'Swift', monogram: 'Sw' },
        { id: 'kotlin', name: 'Kotlin', monogram: 'Kt' },
        { id: 'flutter', name: 'Flutter', monogram: 'Fl' },
      ],
    },
    /**
     * Copy transcribed verbatim from the reference, including the misspelled
     * `app-developoment.mp4` — the file on disk carries that name, so a tidied
     * path here would simply 404.
     */
    heroBand: {
      titleLead: 'App Development',
      titleTrail: 'for Business Growth',
      subTitle:
        'Scalable, user-centric mobile applications for iOS and Android that drive engagement and ROI.',
      metricLead: 'Successful',
      metricSubject: 'Mobile Apps',
      metricVerb: 'Deployed',
      logos: APP_PLATFORM_LOGOS,
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video/app-developoment.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    /** Transcribed verbatim from the reference's `section.about`. */
    overviewBand: {
      eyebrow: 'What do we do',
      statement:
        'We build scalable Mobile Applications to expand your reach and engage your customers.',
      body: 'From native iOS and Android apps to seamless cross-platform solutions, we deliver high-quality mobile experiences that drive results.',
      cta: DISCOVERY_CTA,
    },
    /**
     * Transcribed verbatim from the reference's `#service` band, including the
     * two asset filenames that carry spaces — `cross-platform application.png`
     * and `app-development videos.mp4`. Both are the names on disk.
     */
    offeringsBand: {
      eyebrow: 'Our App Development Services',
      statement:
        'We turn complex business requirements into intuitive, user-friendly mobile solutions.',
      body: 'Whether you need a consumer-facing app or an enterprise-grade solution, our team has the expertise to bring your vision to life.',
      cards: [
        {
          id: 'ios',
          title: 'iOS App Development',
          description: 'Native Swift & SwiftUI Solutions',
          href: '/services/app-development/ios',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ios-app-development.png',
          },
        },
        {
          id: 'android',
          title: 'Android App Development',
          description: 'Kotlin & Jetpack Compose Apps',
          href: '/services/app-development/android',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/android-app-development.png',
          },
        },
        {
          id: 'cross-platform',
          title: 'Cross-Platform Development',
          description: 'Flutter & React Native',
          href: '/services/app-development/cross-platform',
          clip: {
            src: '/assets/img/video-assets/app-development videos.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/cross-platform application.png',
          },
        },
        {
          id: 'ui-ux',
          title: 'UI/UX Design for Mobile',
          description: 'User-Centric Interfaces',
          href: '/services/app-development/ui-ux',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ui-ux-app.png',
          },
        },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `.award` band.
     *
     * The clips and posters are the same four assets the offerings grid uses,
     * paired differently — that re-pairing is the original's, not a shortcut.
     */
    chooseBand: {
      eyebrow: 'Why Leading Brands Choose Us',
      cards: [
        {
          id: 'architecture',
          index: '01',
          emoji: '🚀',
          titleLead: 'Scalable',
          titleAccent: 'Architecture',
          focus: 'Future-Proof Codebase & Performance',
          clip: {
            src: '/assets/img/video-assets/app-development videos.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ios-app-development.png',
          },
        },
        {
          id: 'design',
          index: '02',
          emoji: '🎨',
          titleLead: 'User-Centric',
          titleAccent: 'Design',
          focus: 'Intuitive UX & Engaging UI',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/android-app-development.png',
          },
        },
        {
          id: 'security',
          index: '03',
          emoji: '🔐',
          titleLead: 'Enterprise',
          titleAccent: 'Security',
          focus: 'Data Protection & Compliance',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/cross-platform application.png',
          },
        },
        {
          id: 'agile',
          index: '04',
          emoji: '⚡',
          titleLead: 'Agile',
          titleAccent: 'Development',
          focus: 'Rapid Iteration & Communication',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ui-ux-app.png',
          },
        },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `.brand` band, including the
     * doubled word in "Want to be one of of our successful client?" and its
     * missing apostrophe — both are in the original, and silently correcting
     * copy is how a port stops being a port.
     */
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: 'Trusted by Innovative Companies to Build World-Class Apps',
      body: 'We collaborate with businesses of all sizes to create mobile solutions that address real-world challenges and accelerate growth.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/mobile application video.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
    /**
     * Transcribed from the reference's `.faq` band.
     *
     * **One answer is authored here, not transcribed.** The reference's second
     * accordion item — "Can you build scalable enterprise-grade iOS solutions?" —
     * has an `.acc-btn` and no `.acc_body` at all: the question ships without an
     * answer, so opening it in the original reveals nothing. Leaving that gap
     * faithfully would mean shipping a control that visibly does nothing, so the
     * answer below fills it and is flagged here rather than passed off as the
     * original's copy.
     */
    faqBand: {
      eyebrow: 'Common Questions',
      statement: 'Frequently Asked Questions',
      faqs: [
        {
          id: 'cross-platform',
          question: 'Do you deliver high-performance cross-platform mobile applications?',
          answer:
            'Yes, we leverage top-tier frameworks like Flutter and React Native to build apps that offer native-like performance on both iOS and Android from a single codebase, reducing time-to-market by 40%.',
          clip: {
            src: '/assets/img/video-assets/app-development videos.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/cross-platform application.png',
          },
        },
        {
          id: 'ios',
          question: 'Can you build scalable enterprise-grade iOS solutions?',
          // Authored here — the reference ships this question with no answer.
          answer:
            'Yes. We build in Swift and SwiftUI against the same architecture we would use for any long-lived product: modular feature boundaries, a typed networking layer, and offline behaviour decided up front rather than retrofitted. That is what keeps an app maintainable once it has to serve thousands of employees rather than a pilot group.',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ios-app-development.png',
          },
        },
        {
          id: 'android',
          question: 'How do you handle Android fragmentation and device compatibility?',
          answer:
            'We conduct rigorous testing across a vast array of devices. Our development process prioritizes adaptive layouts and responsive performance to ensure your app runs flawlessly on any screen size.',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/android-app-development.png',
          },
        },
        {
          id: 'retention',
          question: 'Does your UI/UX design strategy focus on maximizing user retention?',
          answer:
            'Our user-centric design approach combines behavioral data analysis with intuitive aesthetics. We create frictionless, engaging interfaces that keep users coming back, significantly boosting LTV.',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/app-dev/ui-ux-app.png',
          },
        },
      ],
    },
  },
  'web-development': {
    slug: 'web-development',
    name: 'Web Development',
    accent: 'mint',
    seo: {
      title: 'Web Development — High-Performance Sites & Platforms | McCarthy Tech',
      description:
        'Corporate sites and complex web platforms built on modern frameworks, tuned against Core Web Vitals, and structured so your own team can maintain them.',
    },
    hero: {
      eyebrow: 'Web Development',
      headline: 'that loads before you blink',
      lead: 'Speed is decided by the architecture on day one, not bolted on at the end. We ship the smallest bundle a page can get away with and treat every performance budget as a requirement.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'lighthouse', value: 95, suffix: '+', label: 'Lighthouse, all four scores' },
        { id: 'platforms', value: 60, suffix: '+', label: 'Sites and platforms shipped' },
      ],
      tech: [
        { id: 'nextjs', name: 'Next.js', monogram: 'Nx' },
        { id: 'typescript', name: 'TypeScript', monogram: 'Ts' },
        { id: 'node', name: 'Node.js', monogram: 'Nd' },
      ],
    },
    /** Transcribed verbatim from the reference's `/services/web-development`. */
    heroBand: {
      titleLead: 'Web Development',
      titleTrail: 'for Business Growth',
      subTitle: 'Scalable, user-centric web applications and sites that drive engagement and ROI.',
      metricLead: 'Successful',
      metricSubject: 'Websites',
      metricVerb: 'Launched',
      logos: WEB_AUDIENCE_LOGOS,
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video-assets/web-dev.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    overviewBand: {
      eyebrow: 'What do we do',
      statement:
        'We build scalable Web Solutions to expand your digital presence and engage your customers.',
      body: 'From responsive promotional sites to complex custom web applications, we deliver high-performance digital experiences that drive results.',
      cta: DISCOVERY_CTA,
    },
    /**
     * The reference gives these four cards no `poster` at all — the clips are
     * bare `<video>` elements with inline sizing. The posters below are the
     * `webservice (n).png` stills the same page already uses for the same four
     * topics in its FAQ, so nothing new is introduced and every card has a frame
     * to show before its clip arrives.
     */
    offeringsBand: {
      eyebrow: 'Our Web Development Services',
      statement: 'We create powerful, user-centric web solutions tailored to your business goals.',
      body: 'From corporate websites to complex web applications, we deliver digital experiences that drive growth.',
      cards: [
        {
          id: 'custom',
          title: 'Custom Web Development',
          description: 'Tailored Solutions & Scalable Architecture',
          href: '/services/web-development',
          clip: {
            src: '/assets/img/video-assets/custom-software.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'ecommerce',
          title: 'E-commerce Solutions',
          description: 'Robust & Scalable Online Stores',
          href: '/services/web-development',
          clip: {
            src: '/assets/img/video-assets/saas.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'cms',
          title: 'CMS Development',
          description: 'WordPress, Webflow & Custom CMS',
          href: '/services/web-development',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'ui-ux',
          title: 'UI/UX Design for Web',
          description: 'Engaging & Intuitive Interfaces',
          href: '/services/web-development',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: 'Trusted by Innovative Companies to Build World-Class Web Solutions',
      body: 'We partner with businesses of all sizes to deliver web solutions that solve real-world problems and drive growth.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/web-design.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
    /**
     * Card two pairs its "User-Centric Design" copy with the `webservice (4)`
     * still and the UI/UX clip, so the grid's media order is 1 · 4 · 2 · 3
     * rather than 1 · 2 · 3 · 4. That is the original's pairing, not a slip.
     */
    chooseBand: {
      eyebrow: 'Why Leading Brands Choose Us',
      cards: [
        {
          id: 'architecture',
          index: '01',
          emoji: '🚀',
          titleLead: 'Scalable',
          titleAccent: 'Architecture',
          focus: 'Future-Proof Codebase & Performance',
          clip: {
            src: '/assets/img/video-assets/custom-software.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'design',
          index: '02',
          emoji: '🎨',
          titleLead: 'User-Centric',
          titleAccent: 'Design',
          focus: 'Intuitive UX & Engaging UI',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
        {
          id: 'security',
          index: '03',
          emoji: '🔐',
          titleLead: 'Enterprise',
          titleAccent: 'Security',
          focus: 'Data Protection & Compliance',
          clip: {
            src: '/assets/img/video-assets/saas.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'agile',
          index: '04',
          emoji: '⚡',
          titleLead: 'Agile',
          titleAccent: 'Development',
          focus: 'Rapid Iteration & Communication',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
      ],
    },
    /** All four answers are present in the reference here, unlike App Development. */
    faqBand: {
      eyebrow: 'Common Questions',
      statement: 'Frequently Asked Questions',
      faqs: [
        {
          id: 'responsive',
          question: 'Do you ensure websites are mobile-responsive?',
          answer:
            'Yes, we adopt a mobile-first approach, ensuring your website looks and functions perfectly on all devices, from smartphones to desktops.',
          clip: {
            src: '/assets/img/video-assets/custom-software.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'enterprise',
          question: 'Can you build scalable enterprise web applications?',
          answer:
            'Absolutely. We specialize in building scalable, secure, and high-performance enterprise web applications using modern technologies like React, Node.js, and Python.',
          clip: {
            src: '/assets/img/video-assets/saas.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'browsers',
          question: 'How do you handle cross-browser compatibility?',
          answer:
            'We rigorously test our websites across all major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent performance and appearance for every user.',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'seo',
          question: 'Do you offer SEO-friendly development?',
          answer:
            'Yes, our development process includes SEO best practices such as semantic HTML, fast load times, and mobile optimization to help your site rank higher.',
          clip: {
            src: '/assets/img/video-assets/ui-ux-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
  },
  'ui-ux-design': {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    accent: 'violet',
    seo: {
      title: 'UI/UX Design — Research, Interface & Design Systems | McCarthy Tech',
      description:
        'User research, wireframes, interface design and a design system your engineers can build from. Interfaces that are obvious to use, not merely pleasant to look at.',
    },
    hero: {
      eyebrow: 'UI/UX Design',
      headline: 'that needs no explaining',
      lead: 'Good design is measured in questions never asked. We research the people who will actually use the thing, prototype until the confusing parts stop being confusing, and hand over a system engineers can build from without guessing.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'products', value: 70, suffix: '+', label: 'Products designed' },
        { id: 'prototype', value: 2, suffix: ' wks', label: 'To a clickable prototype' },
      ],
      tech: [
        { id: 'figma', name: 'Figma', monogram: 'Fg' },
        { id: 'framer', name: 'Framer', monogram: 'Fr' },
        { id: 'storybook', name: 'Storybook', monogram: 'Sb' },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `/services/ui-ux-design`.
     *
     * This hero carries no logo cluster — the reference omits the
     * `.xb-item--audience` block entirely here, so the metric runs straight into
     * its closing word.
     */
    heroBand: {
      titleLead: 'UI/UX Design',
      titleTrail: 'for Digital Excellence',
      subTitle:
        'Intuitive, engaging, and user-centric designs that elevate your brand and user experience.',
      metricLead: 'Successful',
      metricSubject: 'Websites',
      metricVerb: 'Designed',
      logos: [],
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video-assets/ui-ux designing.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    overviewBand: {
      eyebrow: 'What do we do',
      statement:
        'We craft intuitive User Experiences to captivate your audience and drive engagement.',
      body: 'From in-depth user research to pixel-perfect interface design, we create digital products that users love and businesses rely on.',
      cta: DISCOVERY_CTA,
    },
    offeringsBand: {
      eyebrow: 'Our UI/UX Design Services',
      statement:
        'We create meaningful, user-centered designs that solve problems and delight users.',
      body: 'From usability testing to high-fidelity prototyping, we deliver design solutions that make an impact.',
      cards: [
        {
          id: 'research',
          title: 'User Research',
          description: 'In-depth Analysis & Personas',
          href: '/services/ui-ux-design',
          clip: {
            src: '/assets/img/video-assets/ui-ux designing2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'wireframing',
          title: 'Wireframing & Prototyping',
          description: 'Interactive Flows & Blueprints',
          href: '/services/ui-ux-design',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'visual-system',
          title: 'Visual Design System',
          description: 'Consistent Branding & Assets',
          href: '/services/ui-ux-design',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'mobile-web-ui',
          title: 'Mobile & Web UI',
          description: 'Cross-Platform Interface Design',
          href: '/services/ui-ux-design',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: 'Trusted by Innovative Companies to Build World-Class Designs',
      body: 'We partner with businesses of all sizes to deliver design solutions that solve real-world problems and drive growth.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/ui-ux designing.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
    /** The only service whose four pillars are not the shared 🚀🎨🔐⚡ set. */
    chooseBand: {
      eyebrow: 'Why Leading Brands Choose Us',
      cards: [
        {
          id: 'research',
          index: '01',
          emoji: '🔍',
          titleLead: 'User',
          titleAccent: 'Research',
          focus: 'Data-Driven Insights & Personas',
          clip: {
            src: '/assets/img/video-assets/ui-ux designing2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'interfaces',
          index: '02',
          emoji: '🎨',
          titleLead: 'Intuitive',
          titleAccent: 'Interfaces',
          focus: 'Frictionless, Engaging UX',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'design-systems',
          index: '03',
          emoji: '🧩',
          titleLead: 'Scalable',
          titleAccent: 'Design Systems',
          focus: 'Consistent, Reusable Components',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'usability',
          index: '04',
          emoji: '🧪',
          titleLead: 'Usability',
          titleAccent: 'Testing',
          focus: 'Validated, User-Approved Flows',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    /**
     * **These four questions are the web-development page's, verbatim.** The
     * reference ships them unchanged on the UI/UX route — mobile-responsiveness,
     * enterprise web apps, cross-browser testing and SEO, none of which this page
     * is about. Reproduced as-is rather than quietly rewritten, because inventing
     * four new answers would be authoring content, not porting a site. Worth
     * raising with whoever owns the copy.
     */
    faqBand: {
      eyebrow: 'Common Questions',
      statement: 'Frequently Asked Questions',
      faqs: [
        {
          id: 'responsive',
          question: 'Do you ensure websites are mobile-responsive?',
          answer:
            'Yes, we adopt a mobile-first approach, ensuring your website looks and functions perfectly on all devices, from smartphones to desktops.',
          clip: {
            src: '/assets/img/video-assets/ui-ux designing2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'enterprise',
          question: 'Can you build scalable enterprise web applications?',
          answer:
            'Absolutely. We specialize in building scalable, secure, and high-performance enterprise web applications using modern technologies like React, Node.js, and Python.',
          clip: {
            src: '/assets/img/video-assets/crm-design.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'browsers',
          question: 'How do you handle cross-browser compatibility?',
          answer:
            'We rigorously test our websites across all major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent performance and appearance for every user.',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'seo',
          question: 'Do you offer SEO-friendly development?',
          answer:
            'Yes, our development process includes SEO best practices such as semantic HTML, fast load times, and mobile optimization to help your site rank higher.',
          clip: {
            src: '/assets/img/video-assets/app-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
  },
  branding: {
    slug: 'branding',
    name: 'Branding',
    accent: 'lime',
    seo: {
      title: 'Branding — Identity, Strategy & Guidelines | McCarthy Tech',
      description:
        'Positioning, naming, identity design and a guideline set that keeps your brand consistent across every surface your business touches.',
    },
    hero: {
      eyebrow: 'Branding',
      headline: 'that holds up off the moodboard',
      lead: 'An identity that only works on a presentation slide is not an identity. Yours is built to survive a favicon, a stitched uniform and a billboard — with guidelines written so it still looks like you when someone else applies it.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'identities', value: 35, suffix: '+', label: 'Identities delivered' },
        { id: 'assets', value: 40, suffix: '+', label: 'Assets in every handover' },
      ],
      tech: [
        { id: 'illustrator', name: 'Illustrator', monogram: 'Ai' },
        { id: 'figma', name: 'Figma', monogram: 'Fg' },
        { id: 'aftereffects', name: 'After Effects', monogram: 'Ae' },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `/services/branding`.
     *
     * **The logo cluster is deliberately empty.** The reference points this hero
     * at `hero/audience-img01–03.png`, and all three return 404 from the live
     * site — the markup references artwork that was never deployed, so the
     * original renders three broken images here. Rendering none is the closest
     * honest equivalent, and matches how the UI/UX page omits the cluster
     * outright.
     */
    heroBand: {
      titleLead: 'Strategic Branding',
      titleTrail: 'for Market Impact',
      subTitle:
        'Building distinct, memorable identities that resonate with your audience and drive loyalty.',
      metricLead: 'Successful',
      metricSubject: 'Websites',
      metricVerb: 'Defined',
      logos: [],
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video-assets/branding.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    overviewBand: {
      eyebrow: 'What do we do',
      statement:
        'We craft unique Brand Identities that tell your story and differentiate you in the market.',
      body: 'From logo design to comprehensive brand guidelines, we build cohesive visual systems that embody your values and vision.',
      cta: DISCOVERY_CTA,
    },
    offeringsBand: {
      eyebrow: 'Our Branding Services',
      statement: 'We create powerful, lasting brands that connect with people and inspire action.',
      body: 'From strategy to execution, we deliver branding solutions that elevate your business.',
      cards: [
        {
          id: 'strategy',
          title: 'Brand Strategy',
          description: 'Positioning, Voice & Research',
          href: '/services/branding',
          clip: {
            src: '/assets/img/video-assets/branding3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'identity',
          title: 'Visual Identity',
          description: 'Logo, Typography & Color Systems',
          href: '/services/branding',
          clip: {
            src: '/assets/img/video-assets/branding2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'rebranding',
          title: 'Corporate Rebranding',
          description: 'Modernizing Legacy Brands',
          href: '/services/branding',
          clip: {
            src: '/assets/img/video-assets/web-dev4.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'guidelines',
          title: 'Brand Guidelines',
          description: 'Comprehensive Style Guides',
          href: '/services/branding',
          clip: {
            src: '/assets/img/video-assets/digital.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: 'Use Branding to Transform Your Business',
      body: 'We partner with businesses of all sizes to deliver branding solutions that solve real-world problems and drive growth.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/branding2.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
    chooseBand: {
      eyebrow: 'Why Leading Brands Choose Us',
      cards: [
        {
          id: 'architecture',
          index: '01',
          emoji: '🚀',
          titleLead: 'Scalable',
          titleAccent: 'Architecture',
          focus: 'Future-Proof Codebase & Performance',
          clip: {
            src: '/assets/img/video-assets/branding3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'design',
          index: '02',
          emoji: '🎨',
          titleLead: 'User-Centric',
          titleAccent: 'Design',
          focus: 'Intuitive UX & Engaging UI',
          clip: {
            src: '/assets/img/video-assets/branding2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'security',
          index: '03',
          emoji: '🔐',
          titleLead: 'Enterprise',
          titleAccent: 'Security',
          focus: 'Data Protection & Compliance',
          clip: {
            src: '/assets/img/video-assets/web-dev4.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'agile',
          index: '04',
          emoji: '⚡',
          titleLead: 'Agile',
          titleAccent: 'Development',
          focus: 'Rapid Iteration & Communication',
          clip: {
            src: '/assets/img/video-assets/digital.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    /** The web-development questions again, verbatim — see the UI/UX note. */
    faqBand: {
      eyebrow: 'Common Questions',
      statement: 'Frequently Asked Questions',
      faqs: [
        {
          id: 'responsive',
          question: 'Do you ensure websites are mobile-responsive?',
          answer:
            'Yes, we adopt a mobile-first approach, ensuring your website looks and functions perfectly on all devices, from smartphones to desktops.',
          clip: {
            src: '/assets/img/video-assets/branding3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'enterprise',
          question: 'Can you build scalable enterprise web applications?',
          answer:
            'Absolutely. We specialize in building scalable, secure, and high-performance enterprise web applications using modern technologies like React, Node.js, and Python.',
          clip: {
            src: '/assets/img/video-assets/branding2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'browsers',
          question: 'How do you handle cross-browser compatibility?',
          answer:
            'We rigorously test our websites across all major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent performance and appearance for every user.',
          clip: {
            src: '/assets/img/video-assets/web-dev4.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'seo',
          question: 'Do you offer SEO-friendly development?',
          answer:
            'Yes, our development process includes SEO best practices such as semantic HTML, fast load times, and mobile optimization to help your site rank higher.',
          clip: {
            src: '/assets/img/video-assets/digital.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
  },
  'digital-marketing': {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    accent: 'cyan',
    seo: {
      title: 'Digital Marketing — SEO, Paid & Content Campaigns | McCarthy Tech',
      description:
        'Search, paid and content campaigns measured against revenue rather than impressions, with reporting that shows what worked and what was changed.',
    },
    hero: {
      eyebrow: 'Digital Marketing',
      headline: 'measured in revenue, not reach',
      lead: 'Impressions are the easiest number to grow and the least useful to report. We instrument the whole funnel first, then run search, paid and content against it — so every month shows which spend earned its place.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'campaigns', value: 120, suffix: '+', label: 'Campaigns run' },
        { id: 'channels', value: 6, suffix: '', label: 'Channels, one strategy' },
      ],
      tech: [
        { id: 'analytics', name: 'Google Analytics', monogram: 'Ga' },
        { id: 'meta', name: 'Meta Ads', monogram: 'Me' },
        { id: 'search-console', name: 'Search Console', monogram: 'Sc' },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `/services/digital-marketing`.
     *
     * Its brand band plays `custom-bakcground.mp4` — the misspelling is the
     * filename on disk and on the live site.
     */
    heroBand: {
      titleLead: 'Digital Marketing',
      titleTrail: 'for Growth',
      subTitle:
        'Data-driven strategies that increase visibility, traffic, and conversions for your business.',
      metricLead: 'Successful',
      metricSubject: 'Websites',
      metricVerb: 'Scaled',
      logos: [],
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video-assets/digital.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    overviewBand: {
      eyebrow: 'What do we do',
      statement: 'We drive measurable results through targeted Digital Marketing campaigns.',
      body: 'From SEO and content marketing to paid advertising, we help you reach the right audience and achieve your business goals.',
      cta: DISCOVERY_CTA,
    },
    offeringsBand: {
      eyebrow: 'Our Digital Marketing Services',
      statement: 'We create high-impact campaigns that deliver ROI and brand awareness.',
      body: 'From organic growth to paid acquisition, we have the expertise to scale your business.',
      cards: [
        {
          id: 'seo',
          title: 'SEO Optimization',
          description: 'Rank Higher & Drive Traffic',
          href: '/services/digital-marketing',
          clip: {
            src: '/assets/img/video-assets/web-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'social',
          title: 'Social Media Marketing',
          description: 'Engage & Grow Your Audience',
          href: '/services/digital-marketing',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'ppc',
          title: 'PPC Advertising',
          description: 'Targeted Ad Campaigns',
          href: '/services/digital-marketing',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'content',
          title: 'Content Marketing',
          description: 'Compelling Storytelling',
          href: '/services/digital-marketing',
          clip: {
            src: '/assets/img/video-assets/webdev3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: 'Accelerate Business Growth with Data-Driven Strategies',
      body: 'We partner with businesses of all sizes to deliver marketing solutions that solve real-world problems and drive growth.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/custom-bakcground.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
    chooseBand: {
      eyebrow: 'Why Leading Brands Choose Us',
      cards: [
        {
          id: 'architecture',
          index: '01',
          emoji: '🚀',
          titleLead: 'Scalable',
          titleAccent: 'Architecture',
          focus: 'Future-Proof Codebase & Performance',
          clip: {
            src: '/assets/img/video-assets/web-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'design',
          index: '02',
          emoji: '🎨',
          titleLead: 'User-Centric',
          titleAccent: 'Design',
          focus: 'Intuitive UX & Engaging UI',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'security',
          index: '03',
          emoji: '🔐',
          titleLead: 'Enterprise',
          titleAccent: 'Security',
          focus: 'Data Protection & Compliance',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'agile',
          index: '04',
          emoji: '⚡',
          titleLead: 'Agile',
          titleAccent: 'Development',
          focus: 'Rapid Iteration & Communication',
          clip: {
            src: '/assets/img/video-assets/webdev3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    /** The web-development questions again, verbatim — see the UI/UX note. */
    faqBand: {
      eyebrow: 'Common Questions',
      statement: 'Frequently Asked Questions',
      faqs: [
        {
          id: 'responsive',
          question: 'Do you ensure websites are mobile-responsive?',
          answer:
            'Yes, we adopt a mobile-first approach, ensuring your website looks and functions perfectly on all devices, from smartphones to desktops.',
          clip: {
            src: '/assets/img/video-assets/web-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'enterprise',
          question: 'Can you build scalable enterprise web applications?',
          answer:
            'Absolutely. We specialize in building scalable, secure, and high-performance enterprise web applications using modern technologies like React, Node.js, and Python.',
          clip: {
            src: '/assets/img/video-assets/mobile-apps.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'browsers',
          question: 'How do you handle cross-browser compatibility?',
          answer:
            'We rigorously test our websites across all major browsers (Chrome, Firefox, Safari, Edge) to ensure consistent performance and appearance for every user.',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'seo-dev',
          question: 'Do you offer SEO-friendly development?',
          answer:
            'Yes, our development process includes SEO best practices such as semantic HTML, fast load times, and mobile optimization to help your site rank higher.',
          clip: {
            src: '/assets/img/video-assets/webdev3.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
  },
  'ai-implementation': {
    slug: 'ai-implementation',
    name: 'AI Implementation',
    accent: 'mint',
    seo: {
      title: 'AI Implementation — LLMs, RAG & Automation | McCarthy Tech',
      description:
        'Language models, retrieval pipelines and workflow automation wired into the systems you already run, with evaluation and guardrails before anything reaches production.',
    },
    hero: {
      eyebrow: 'AI Implementation',
      headline: 'wired into the work itself',
      lead: 'A model on its own changes nothing. The value is in the plumbing — retrieval over your actual documents, evaluation you can trust, and an honest answer about which problems are worth pointing a model at.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'pipelines', value: 25, suffix: '+', label: 'AI systems in production' },
        { id: 'pilot', value: 4, suffix: ' wks', label: 'To a working pilot' },
      ],
      tech: [
        { id: 'python', name: 'Python', monogram: 'Py' },
        { id: 'claude', name: 'Claude', monogram: 'Cl' },
        { id: 'vector', name: 'Vector Search', monogram: 'Vs' },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `/services/ai-implementation`.
     *
     * This page opens with `hero-style--two` rather than the bordered
     * `hero-style--three` the other six use, so it fills `splitHeroBand` and
     * leaves `heroBand` unset — the two are mutually exclusive by design.
     */
    splitHeroBand: {
      title: 'Seamless AI Integration for Modern Enterprises',
      subTitle:
        "We don't just build models; we embed intelligence into your existing workflows for tangible results.",
      cta: { label: 'Start Your Integration', href: '/contact' },
      background: '/assets/img/bg/hero_bg02.jpg',
      media: {
        src: '/assets/img/video-assets/ai-screen.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    /**
     * Transcribed from the reference's `.video` band.
     *
     * The fourth tab reuses `sheet_icon.svg` — the original has no whiteboard
     * icon, so Sheet's is shown twice. Kept as-is.
     */
    showcaseBand: {
      tabs: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: '/assets/img/icon/dash_board_icon.svg',
          clip: {
            src: '/assets/img/video-assets/ai-new.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: HERO_BAND_POSTER,
          },
        },
        {
          id: 'document',
          label: 'Document',
          icon: '/assets/img/icon/document_icon.svg',
          clip: {
            src: '/assets/img/video-assets/ai-screen.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: HERO_BAND_POSTER,
          },
        },
        {
          id: 'sheet',
          label: 'Sheet',
          icon: '/assets/img/icon/sheet_icon.svg',
          clip: {
            src: '/assets/img/video-assets/ai-1.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: HERO_BAND_POSTER,
          },
        },
        {
          id: 'whiteboard',
          label: 'Whiteboard',
          icon: '/assets/img/icon/sheet_icon.svg',
          clip: {
            src: '/assets/img/video-assets/ai-2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: HERO_BAND_POSTER,
          },
        },
      ],
    },
    /**
     * Transcribed from the reference's `#features` band.
     *
     * Two things worth recording. The eyebrow reads "Altibix AI Implementation"
     * in the original; it carries the brand, and the brand has since been
     * renamed, so it follows the rename here rather than reintroducing the old
     * name on one page. And the fifth card ships **without** the
     * `xb-feature-item-3` wrapper its four siblings have — the reference has five
     * captions and five clips but only four wrappers, so that card renders
     * unstyled upstream. All five are given the same treatment here.
     */
    featuresBand: {
      eyebrow: 'McCarthy Tech AI Implementation',
      title: 'Enterprise-Grade AI Solutions',
      cta: { label: 'Transform Your Business Today', href: '/contact' },
      cards: [
        {
          id: 'automation',
          title: 'Intelligent Automation',
          description:
            'Streamline workflows and reduce manual effort by embedding intelligent agents into your core business processes.',
          ornament: 'logo',
          wide: true,
          clip: {
            src: '/assets/img/video-assets/ai-new.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: HERO_BAND_POSTER,
          },
        },
        {
          id: 'pipelines',
          title: 'Real-time Data Pipelines',
          description:
            'Connect disparate data sources for real-time inference and decision making.',
          ornament: 'scan',
          // `order-lg-first` — this card leads the row at desktop while the
          // wide card above it keeps its place in source.
          orderFirst: true,
          clip: {
            src: '/assets/img/video-assets/custom-software.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (1).png',
          },
        },
        {
          id: 'scalability',
          title: 'Global Scalability',
          description:
            'Deploy models that scale effortlessly across regions and languages without performance loss.',
          ornament: 'circle',
          clip: {
            src: '/assets/img/video-assets/saas.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (2).png',
          },
        },
        {
          id: 'monitoring',
          title: 'Performance Monitoring',
          description:
            'Track model drift, accuracy, and usage with our advanced observability tooling.',
          clip: {
            src: '/assets/img/video-assets/saas2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (3).png',
          },
        },
        {
          id: 'security',
          title: 'Secure AI Infrastructure',
          description:
            'Enterprise-grade security and compliance for your sensitive data and model IP.',
          ornament: 'security',
          clip: {
            src: '/assets/img/video-assets/web-dev2.mp4',
            type: HERO_BAND_CLIP_TYPE,
            poster: '/assets/img/service/webservice (4).png',
          },
        },
      ],
    },
    /** Transcribed from the reference's marquee `brand` band. */
    logoMarqueeBand: {
      eyebrow: 'Trusted by 9000+ AI Assistants created',
      logos: [
        '/assets/img/brand/logo01.png',
        '/assets/img/brand/logo02.png',
        '/assets/img/brand/logo03.png',
        '/assets/img/brand/logo04.png',
        '/assets/img/brand/logo05.png',
        '/assets/img/brand/logo06.png',
        '/assets/img/brand/logo07.png',
        '/assets/img/brand/logo08.png',
        '/assets/img/brand/logo09.png',
        '/assets/img/brand/logo10.png',
        '/assets/img/brand/logo11.png',
      ],
    },
    /**
     * Transcribed from the reference's `#process` band.
     *
     * All three step cards share `process/img01.png` — the reference varies only
     * the ordinal and the name, so `stepArtwork` is one value rather than being
     * repeated three times.
     */
    processBand: {
      eyebrow: 'How It Works',
      title: 'Implement AI in 3 Steps',
      cta: { label: 'Get Started Now', href: '/contact' },
      stepArtwork: '/assets/img/process/img01.png',
      steps: [
        {
          id: 'assess',
          number: '01',
          name: 'Assess & Strategy',
          image: '/assets/img/process/img02.png',
        },
        {
          id: 'develop',
          number: '02',
          name: 'Develop & Integrate',
          image: '/assets/img/process/img03.png',
        },
        {
          id: 'deploy',
          number: '03',
          name: 'Deploy & Scale',
          image: '/assets/img/process/img04.png',
        },
      ],
    },
    /**
     * Transcribed from the reference's `#integration` band.
     *
     * The "after" column is headed "With Altibix AI" in the original; it carries
     * the brand, so it follows the rename here for the same reason the features
     * eyebrow does.
     */
    integrationBand: {
      eyebrow: 'Seamless Ecosystem',
      title: 'Integration with your stack',
      capabilities: [
        'Enterprise Stack Integration.',
        'Cloud & On-Premise Connectors.',
        'Customer Support & CRM Integration.',
        'Custom API & Middleware Development.',
      ],
      cta: { label: 'Start Your AI Transformation', href: '/contact' },
      logos: [
        '/assets/img/integration/airtable.png',
        '/assets/img/integration/android.png',
        '/assets/img/integration/apple.png',
        '/assets/img/integration/discord.png',
        '/assets/img/integration/google-meet.png',
        '/assets/img/integration/instagram.png',
        '/assets/img/integration/line.png',
        '/assets/img/integration/linkedin.png',
        '/assets/img/integration/loom.png',
        '/assets/img/integration/mailchimp.png',
        '/assets/img/integration/messenger.png',
        '/assets/img/integration/microsoft.png',
        '/assets/img/integration/paypal.png',
        '/assets/img/integration/plateform.png',
        '/assets/img/integration/shazam.png',
        '/assets/img/integration/shopify.png',
        '/assets/img/integration/slack.png',
        '/assets/img/integration/snapchat.png',
        '/assets/img/integration/telegram.png',
        '/assets/img/integration/whatsapp.png',
      ],
      beforeTitle: 'Legacy Operations',
      before: [
        'Losing competitive edge due to slow manual processes.',
        'Wasting resources on repetitive, low-value tasks.',
        'Spending hours on manual data entry and correction.',
        'Scalability bottlenecks during high-demand periods.',
        'Siloed teams struggling with information access.',
        'Missed opportunities due to language/region barriers.',
        'Complex, unmaintainable legacy codebases.',
      ],
      afterTitle: 'With McCarthy Tech AI',
      after: [
        'Automated workflows operating 24/7.',
        'Scalable architecture for enterprise growth.',
        'Unified data insights for strategic decisions.',
        'Robust security and compliance built-in.',
        'Focus on high-value tasks.',
        'Save time, even when replying yourself, with AI assistance.',
        'Scale effortlessly with AI.',
        'Enterprise-level security.',
      ],
    },
    /** Transcribed from the reference's `#pricing` band. */
    pricingBand: {
      eyebrow: 'Pricing Plans',
      titleLead: 'Simple &',
      titleTrail: 'flexible pricing',
      plans: [
        {
          id: 'trial',
          icon: '/assets/img/icon/pricing-icon01.svg',
          monthly: 0,
          period: '/1-Month Trial',
          ctaLabel: 'get started free',
          ctaHref: '/contact',
          tag: 'Pilot Phase',
          features: [
            'Basic AI Readiness Audit.',
            'Up to 1,000 conversations/month.',
            'Single Process Automation.',
            'Basic Roadmap Outline.',
            'Standard response speed.',
          ],
        },
        {
          id: 'pro',
          icon: '/assets/img/icon/pricing-icon02.svg',
          monthly: 49,
          yearly: 529,
          ctaLabel: 'subscribe to pro',
          ctaHref: '/contact',
          tag: 'Premium Plan',
          featured: true,
          features: [
            'Everything in Free Plan +.',
            'Unlimited API Requests/Mo.',
            'Custom Model Training & Tuning.',
            'Priority customer support.',
            'End-to-End Implementation.',
          ],
        },
      ],
    },
    /**
     * Transcribed from the reference's `#faq` band.
     *
     * The questions carry their ordinal inline as `01_`, so the number is stored
     * separately and the question text kept clean — the accordion draws the two
     * itself.
     */
    numberedFaqBand: {
      eyebrow: 'Frequently Asked Questions',
      title: 'Have a question look here',
      faqs: [
        {
          id: 'timeline',
          number: '01',
          question: 'How long does an AI implementation project take?',
          answer:
            'The timeline varies based on complexity. A pilot project can be up and running in 2-4 weeks, while a full-scale enterprise integration may take 2-3 months. We work in agile sprints to deliver value at every stage.',
        },
        {
          id: 'team',
          number: '02',
          question: 'Do we need a dedicated data science team?',
          answer:
            "No, you don't. Our team of experts handles the entire technical lifecycle, from data preprocessing and model selection to deployment and maintenance. We act as your extended AI department.",
        },
        {
          id: 'security',
          number: '03',
          question: 'Is my data secure during the process?',
          answer:
            'Security is our top priority. We employ enterprise-grade encryption, role-based access controls, and comply with major data regulations (GDPR, HIPAA, etc.) to ensure your sensitive data remains protected.',
        },
        {
          id: 'legacy',
          number: '04',
          question: 'Can you integrate with legacy systems?',
          answer:
            'Yes, we specialize in modernizing legacy stacks. We build custom APIs and middleware connectors to bridge the gap between your existing on-premise systems and modern AI capabilities without disrupting operations.',
        },
        {
          id: 'roi',
          number: '05',
          question: 'How do we measure the ROI of AI implementation?',
          answer:
            'We define clear KPIs before starting, such as “hours saved”, “error reduction rates”, or “revenue increase”. Our real-time analytics dashboards track these metrics so you can verify the impact.',
        },
      ],
    },
    /** Transcribed from the reference's closing `cta` band. */
    ctaBand: {
      eyebrow: 'Optimize Operations with AI',
      title: 'Streamline Complex Workflows',
      cta: { label: 'Schedule Your Consultation', href: '/contact' },
    },
  },
  'ai-chatbot': {
    slug: 'ai-chatbot',
    name: 'AI Chatbot',
    accent: 'violet',
    seo: {
      title: 'AI Chatbot Development — Support & Sales Assistants | McCarthy Tech',
      description:
        'Conversational assistants that answer from your documentation, cite their sources, hand over cleanly to a human, and decline instead of inventing an answer.',
    },
    hero: {
      eyebrow: 'AI Chatbot',
      headline: 'that admits when it does not know',
      lead: 'The fastest way to lose a customer is a confident wrong answer. Ours answer from your documentation, cite where the answer came from, and escalate the moment they are out of their depth.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'assistants', value: 18, suffix: '+', label: 'Assistants deployed' },
        { id: 'deflection', value: 60, suffix: '%', label: 'Typical ticket deflection' },
      ],
      tech: [
        { id: 'claude', name: 'Claude', monogram: 'Cl' },
        { id: 'rag', name: 'Retrieval', monogram: 'Rg' },
        { id: 'websockets', name: 'WebSockets', monogram: 'Ws' },
      ],
    },
  },
  'ai-marketing': {
    slug: 'ai-marketing',
    name: 'AI Marketing',
    accent: 'lime',
    seo: {
      title: 'AI Marketing — Personalisation & Campaign Automation | McCarthy Tech',
      description:
        'Segmentation, creative variation and lifecycle automation driven by your own customer data, with a person approving everything that reaches an audience.',
    },
    hero: {
      eyebrow: 'AI Marketing',
      headline: 'that still sounds human',
      lead: 'Automation is only worth it if the output is something you would have sent anyway. Models handle what scales badly — segmenting, drafting variants, timing sends — and a person keeps the approval step, because your audience can tell.',
      cta: DISCOVERY_CTA,
      stats: [
        { id: 'audiences', value: 90, suffix: '+', label: 'Audiences segmented' },
        { id: 'lift', value: 30, suffix: '%', label: 'Average engagement lift' },
      ],
      tech: [
        { id: 'segment', name: 'Segment', monogram: 'Sg' },
        { id: 'hubspot', name: 'HubSpot', monogram: 'Hs' },
        { id: 'python', name: 'Python', monogram: 'Py' },
      ],
    },
    /**
     * Transcribed verbatim from the reference's `/services/ai-marketing`.
     *
     * **Both clips were external.** The reference hotlinks two Pexels downloads
     * rather than serving its own files; they are localised here so the page has
     * no third-party dependency at run time, and so the clips cannot vanish when
     * someone else's CDN changes.
     *
     * The offerings grid is **deliberately absent**. The reference points its
     * four cards at `service/img17–20.png`, and all four return 404 from the live
     * site — the same failure mode as Branding's hero cluster. There is nothing
     * to render, so nothing is rendered.
     */
    heroBand: {
      titleLead: 'AI Marketing',
      titleTrail: 'for Smarter Insights and',
      subTitle: 'AI audience & media solutions for Global Brands to increase media Efficency & ROI',
      metricLead: 'Successfully',
      metricSubject: 'AI audience',
      metricVerb: 'Campaigns',
      logos: [],
      cta: DISCOVERY_CTA,
      clip: {
        src: '/assets/img/video-assets/pexels-32399073.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: HERO_BAND_POSTER,
      },
    },
    overviewBand: {
      eyebrow: 'What do we do',
      statement:
        'We provide AI Marketing Solutions to get better audience insight and optimize your media campaigns',
      body: 'Unlock deeper audience insights and optimize every step of your media strategy with AI-driven marketing.',
      cta: DISCOVERY_CTA,
    },
    brandBand: {
      eyebrow: 'Trusted by Leading Brands',
      statement: "Proud to Work with the World's Most Recognized Brands",
      body: 'Our AI-powered solutions address critical pain points that global brands face today.',
      closing: 'Want to be one of of our successful client? lets begin.',
      cta: DISCOVERY_CTA,
      brands: SHARED_CLIENT_BRANDS,
      clip: {
        src: '/assets/img/video-assets/pexels-28425784.mp4',
        type: HERO_BAND_CLIP_TYPE,
        poster: '/assets/img/bg/brand-bg.jpg',
      },
    },
  },
};

/**
 * The eight services as an ordered list.
 *
 * Order comes from {@link SERVICE_DETAIL_SLUGS} rather than from object key
 * order, which is an implementation detail no code should depend on.
 */
export const serviceDetails: readonly ServiceDetail[] = SERVICE_DETAIL_SLUGS.map(
  (slug) => serviceDetailsBySlug[slug],
);

/**
 * Looks up one service by URL segment.
 *
 * @param slug - The `[slug]` segment, already decoded by Next.
 * @returns The matching service, or `undefined` so the route can call
 *   `notFound()` rather than rendering a page with holes in it.
 */
export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return isServiceSlug(slug) ? serviceDetailsBySlug[slug] : undefined;
}

/**
 * Development-time check that the navigation and this module agree.
 *
 * The mega-menu publishes a href for every service; if one of those has no
 * record here it becomes a 404 that nothing in the type system catches — the
 * two lists are related only by convention. Comparing them at module load
 * surfaces the mismatch the first time a page renders, rather than the first
 * time somebody clicks the link.
 *
 * Warns rather than throws, and only outside production: an inconsistency in
 * marketing copy is a bug worth shouting about in development, but not a reason
 * to take the live site down.
 */
function warnOnNavigationDrift(): void {
  if (process.env.NODE_ENV === 'production') return;

  const shipped = new Set(serviceDetailPaths);
  const missing = serviceMenuItems
    .map((item) => item.href)
    // "View All Services" points at the hub, which is a real page but not a
    // detail record — excluding it by path keeps the check meaningful.
    .filter((href) => href !== '/services' && !shipped.has(href));

  if (missing.length > 0) {
    console.warn(
      `[service-details] Navigation links to ${missing.length} service page(s) with no detail record: ${missing.join(', ')}`,
    );
  }
}

warnOnNavigationDrift();
