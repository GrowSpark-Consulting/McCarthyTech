import type { ServiceSubDetail } from '@/types/service-detail';

/**
 * The four sub-pages App Development's offering cards actually link to.
 *
 * App Development is the only one of the eight services whose offering-card
 * arrows resolve to real pages on the reference site — every other service's
 * cards link back to their own parent page. Discovered when those four arrows
 * were found returning 404 here: the reference itself answers `200` on all
 * four, so the fix is to port the pages that were missing rather than to point
 * the arrows somewhere else.
 *
 * Keyed by `slug` so `getServiceSubDetail` is a lookup rather than a scan.
 */
const serviceSubDetailsBySlug: Record<string, ServiceSubDetail> = {
  ios: {
    slug: 'ios',
    parentSlug: 'app-development',
    seo: {
      title: 'iOS App Development — Native Swift & SwiftUI | Grow Spark',
      description:
        'Native iOS applications built with Swift and SwiftUI, engineered for the full Apple ecosystem — iPhone, iPad and Apple Watch.',
    },
    title: 'iOS App Development',
    heroImage: '/assets/img/service/app-dev/ios-app-development.png',
    subtitle: 'Native Swift & SwiftUI Solutions',
    description: [
      'Scale your business with premium iOS applications. We leverage the full power of the Apple ecosystem, including Swift, SwiftUI, and the latest iOS SDKs, to build secure, high-performance, and visually stunning apps that run flawlessly on iPhone, iPad, and Apple Watch.',
      "Our iOS development team specializes in creating native applications that offer superior performance and a seamless user experience. We meticulously adhere to Apple's Human Interface Guidelines to ensure your app feels right at home on any Apple device. From complex enterprise solutions to engaging consumer apps, we handle the entire lifecycle from concept to App Store deployment.",
    ],
    process: [
      {
        id: 'discovery',
        title: 'Strategy & Discovery',
        description:
          'We start by understanding your business goals and user needs to define a roadmap for success.',
      },
      {
        id: 'design',
        title: 'UI/UX Design',
        description:
          'Our designers create intuitive and beautiful interfaces tailored for the iOS experience.',
      },
      {
        id: 'development',
        title: 'Development',
        description:
          'Using the latest Apple technologies, we build robust and scalable native applications.',
      },
      {
        id: 'launch',
        title: 'QA & Launch',
        description:
          'Rigorous testing ensures a bug-free experience before we handle the App Store submission.',
      },
    ],
    outcomeHeading: 'Services outcome',
    outcomes: [
      'Native Swift & SwiftUI Development',
      'Apple Watch & iPad Adaptation',
      'Core ML & ARKit Integration',
      'App Store Optimization (ASO)',
      'Secure Cloud Integration',
    ],
  },
  android: {
    slug: 'android',
    parentSlug: 'app-development',
    seo: {
      title: 'Android App Development — Kotlin & Jetpack Compose | Grow Spark',
      description:
        'Custom Android applications built with Kotlin and Jetpack Compose, tuned for consistency across a fragmented device landscape.',
    },
    title: 'Android App Development',
    heroImage: '/assets/img/service/app-dev/android-app-development.png',
    subtitle: 'Kotlin & Jetpack Compose Apps',
    description: [
      'Reach the widest global audience with custom Android applications. Our team of expert developers utilizes Kotlin and Jetpack Compose to build modern, responsive, and stable apps that perform beautifully across the fragmented Android device landscape.',
      'We build Android apps that are not only functional but also delightful to use. By leveraging modern Android development standards, we ensure compatibility, security, and performance. Whether you need an app for smartphones, tablets, or wearables, we deliver solutions that drive engagement and business growth.',
    ],
    process: [
      {
        id: 'analysis',
        title: 'Requirement Analysis',
        description:
          'We analyze your requirements to determine the best technical approach for the diverse Android ecosystem.',
      },
      {
        id: 'material-design',
        title: 'Material Design',
        description:
          "We craft interfaces that follow Google's Material Design principles for a familiar user feel.",
      },
      {
        id: 'agile',
        title: 'Agile Development',
        description:
          'Iterative development ensures you see progress and can provide feedback at every stage.',
      },
      {
        id: 'deployment',
        title: 'Testing & Deployment',
        description:
          'We test across multiple devices and screen sizes to guarantee consistency before launch.',
      },
    ],
    outcomeHeading: 'Services outcome',
    outcomes: [
      'Native Kotlin Development',
      'Jetpack Compose UI',
      'Material Design 3 Implementation',
      'Android Wear OS Support',
      'Google Play Store Deployment',
    ],
  },
  'cross-platform': {
    slug: 'cross-platform',
    parentSlug: 'app-development',
    seo: {
      title: 'Cross-Platform App Development — Flutter & React Native | Grow Spark',
      description:
        'One codebase, both platforms. Flutter and React Native apps with near-native performance and a shorter path to launch.',
    },
    title: 'Cross-Platform Development',
    heroImage: '/assets/img/service/app-dev/cross-platform application.png',
    subtitle: 'Flutter & React Native',
    description: [
      'Launch on both iOS and Android simultaneously with our cross-platform solutions. Using industry-leading frameworks like Flutter and React Native, we deliver near-native performance while significantly reducing development time and cost.',
      "Cross-platform development doesn't mean compromising on quality. Our expertise in Flutter and React Native allows us to create beautiful, high-performance apps that share a single codebase. This approach ensures consistent branding and functionality across all platforms while speeding up your time-to-market.",
    ],
    process: [
      {
        id: 'architecture',
        title: 'Architecture Planning',
        description:
          'We plan a scalable architecture that maximizes code reuse without sacrificing performance.',
      },
      {
        id: 'design-system',
        title: 'Unified Design System',
        description:
          'Creating a design system that adapts gracefully to both iOS Human Interface and Material Design.',
      },
      {
        id: 'hybrid-dev',
        title: 'Hybrid Development',
        description:
          'Writing efficient code that powers both platforms using Flutter or React Native.',
      },
      {
        id: 'multi-platform-testing',
        title: 'Multi-Platform Testing',
        description:
          'Simultaneous testing on both platforms to ensure a bug-free uniform experience.',
      },
    ],
    outcomeHeading: 'Services outcome',
    outcomes: [
      'React Native & Flutter Development',
      'Single Codebase for iOS & Android',
      'Near-Native Performance',
      'Cost-Effective Solution',
      'Accelerated Time-to-Market',
    ],
  },
  'ui-ux': {
    slug: 'ui-ux',
    parentSlug: 'app-development',
    seo: {
      title: 'UI/UX Design for Mobile — Research to High-Fidelity | Grow Spark',
      description:
        'User research, wireframing and interactive prototyping for mobile apps — interfaces that are accessible, intuitive and on-brand.',
    },
    title: 'UI/UX Design for Mobile',
    heroImage: '/assets/img/service/app-dev/ui-ux-app.png',
    subtitle: 'User-Centric Interfaces',
    description: [
      'Design that drives engagement. We create intuitive, user-centric mobile interfaces that delight users and achieve business objectives. Our design process combines research, creativity, and psychology to build apps people love to use.',
      "Great apps start with great design. Our UI/UX team doesn't just make things look good; we make them work beautifully. Through user research, wireframing, and interactive prototyping, we eliminate friction and create seamless journeys. We ensure your app is accessible, intuitive, and visually captivating.",
    ],
    process: [
      {
        id: 'empathize',
        title: 'Empathize & Define',
        description: "We conduct research to understand your users' pain points and motivations.",
      },
      {
        id: 'ideate',
        title: 'Ideate & Wireframe',
        description: 'Sketching out solutions and structuring the information architecture.',
      },
      {
        id: 'prototype',
        title: 'Prototype & Test',
        description: 'Building interactive prototypes to validate flows and gather user feedback.',
      },
      {
        id: 'visual-design',
        title: 'Visual Design',
        description:
          'Applying your brand identity to create a polished, high-fidelity user interface.',
      },
    ],
    outcomeHeading: 'Services outcome',
    outcomes: [
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Interactive Mockups',
      'Design Systems & Style Guides',
      'Usability Testing',
    ],
  },
};

/** Every sub-page, as a flat list — used by `generateStaticParams`. */
export const serviceSubDetails: readonly ServiceSubDetail[] =
  Object.values(serviceSubDetailsBySlug);

/**
 * Looks up one sub-page by its parent and its own slug.
 *
 * Both are checked rather than just the leaf slug: `slug` values are not
 * globally unique across services (a ninth service could add its own `ios`),
 * so the pair is what actually identifies the page.
 *
 * @param parentSlug - The owning service's slug, e.g. `app-development`.
 * @param slug - The sub-page's own slug, e.g. `ios`.
 */
export function getServiceSubDetail(
  parentSlug: string,
  slug: string,
): ServiceSubDetail | undefined {
  const detail = serviceSubDetailsBySlug[slug];
  return detail?.parentSlug === parentSlug ? detail : undefined;
}
