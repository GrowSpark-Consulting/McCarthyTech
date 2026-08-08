export interface HiringStep {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface JobDetail {
  readonly responsibilities: readonly string[];
  readonly requirements: readonly string[];
  readonly salaryRange: string;
}

export interface JobListing {
  readonly id: string;
  readonly title: string;
  readonly department: 'Technical' | 'Design' | 'Marketing';
  readonly categoryClass: 'cat1' | 'cat2' | 'cat3';
  readonly location: string;
  readonly type: string;
  readonly slug: string;
  readonly description: string;
  readonly details: JobDetail;
}

export const hiringSteps: readonly HiringStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Send your CV',
    description:
      'Apply for a position by sending us your CV or providing a link to your LinkedIn profile, and take the first step toward joining our team.',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Initial screening',
    description:
      'The first evaluation step in a selection or hiring process, used to quickly decide whether a candidate (or application) meets the basic requirements before moving to the next stage.',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Job interview',
    description:
      'Formal conversation between a candidate and an employer to evaluate whether the candidate is suitable for a specific role.',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Test task',
    description:
      'Practical assignment given to a candidate during the hiring process to evaluate their real skills and problem-solving ability.',
  },
  {
    id: 'step-5',
    number: '05',
    title: "You're hired!",
    description: 'The company has decided to offer you the position.',
  },
];

export const commonBenefits: readonly string[] = [
  'Competitive salary package matching industry standards.',
  'Fully remote work policy with flexible working hours.',
  'Modern work equipment budget (MacBook, monitor, accessories).',
  'Annual learning and development allowance (courses, conferences, books).',
  'Comprehensive health insurance plans.',
  'Regular team retreats, hackathons, and virtual social events.',
];

export const jobListings: readonly JobListing[] = [
  {
    id: 'job-1',
    title: 'Flutter Developer',
    department: 'Technical',
    categoryClass: 'cat1',
    location: 'Remote',
    type: 'Full time',
    slug: 'flutter-developer',
    description:
      'We are looking for a skilled Flutter Developer to build high-performance, visually stunning cross-platform mobile apps for iOS and Android.',
    details: {
      responsibilities: [
        'Design and build complex, responsive cross-platform applications using Flutter and Dart.',
        'Collaborate with UI/UX designers to implement high-fidelity design mockups and animations.',
        'Write clean, readable, well-documented, and testable code.',
        'Optimize app performance, startup times, and smooth rendering (60fps+).',
        'Integrate RESTful APIs, third-party libraries, and native device capabilities.',
        'Participate in code reviews, design discussions, and Agile sprint planning sessions.',
      ],
      requirements: [
        '3+ years of professional software development experience.',
        '2+ years of hands-on experience building production mobile apps using Flutter & Dart.',
        'Strong understanding of state management patterns (BloC, Provider, Riverpod).',
        'Familiarity with native iOS/Android development (Swift, Kotlin) is a plus.',
        'Experience with CI/CD tools for mobile deployment (Fastlane, Codemagic, GitHub Actions).',
        'Excellent problem-solving skills and a passion for crafting premium user interfaces.',
      ],
      salaryRange: '$40,000 - $70,000 / year',
    },
  },
  {
    id: 'job-2',
    title: 'Full Stack Developer',
    department: 'Technical',
    categoryClass: 'cat1',
    location: 'Remote',
    type: 'Full time',
    slug: 'fullstack-developer',
    description:
      'Join us as a Full Stack Developer to build, maintain, and scale robust web applications using React, Next.js, and modern backend frameworks.',
    details: {
      responsibilities: [
        'Develop scalable, responsive, and secure web applications using Next.js/React and Node.js.',
        'Design database schemas and optimize query performance (PostgreSQL, MongoDB).',
        'Build and maintain robust RESTful and GraphQL API endpoints.',
        'Ensure clean separation of concerns and write high-quality reusable components.',
        'Collaborate with developers, designers, and project managers to deliver polished features.',
        'Maintain system uptime, monitor server performance, and troubleshoot production issues.',
      ],
      requirements: [
        '4+ years of experience as a Full Stack Developer working in production environments.',
        'Expertise in JavaScript/TypeScript, React/Next.js, Tailwind CSS, and Node.js.',
        'Experience with database engines, ORMs (Prisma, Mongoose), and caching layers (Redis).',
        'Familiarity with containerization (Docker), AWS deployment, and serverless architectures.',
        'Strong knowledge of Git workflow, automated testing, and security best practices.',
        'Strong communication skills and experience working in fully remote agile teams.',
      ],
      salaryRange: '$50,000 - $85,000 / year',
    },
  },
  {
    id: 'job-3',
    title: 'Laravel Developer',
    department: 'Technical',
    categoryClass: 'cat1',
    location: 'Remote',
    type: 'Full time',
    slug: 'laravel-developer',
    description:
      'We are searching for a Laravel Developer to architect and build high-quality backends, APIs, and SaaS systems using PHP and the Laravel ecosystem.',
    details: {
      responsibilities: [
        'Architect, develop, and maintain secure backend services and API structures using Laravel.',
        'Optimize application queries, caching, and database relationships (MySQL/PostgreSQL).',
        'Implement background queues, job scheduling, and third-party API integrations.',
        'Write clean PHP code conforming to modern standards (PSR, OOP patterns).',
        'Collaborate with frontend developers to integrate Next.js/React interfaces with Laravel APIs.',
        'Implement automated tests (PHPUnit) to verify reliability and security.',
      ],
      requirements: [
        '3+ years of professional PHP development experience.',
        'Deep expertise in the Laravel framework (ORM, Queues, Service Providers, Middleware).',
        'Solid database knowledge, query optimization, and architectural patterns.',
        'Familiarity with Vue.js/React and modern frontend build tools is a strong plus.',
        'Experience with Redis, WebSockets, and SaaS billing integrations (Stripe).',
        'Ability to write structured, self-documenting code with clear design choices.',
      ],
      salaryRange: '$35,000 - $60,000 / year',
    },
  },
  {
    id: 'job-4',
    title: 'App Developer',
    department: 'Technical',
    categoryClass: 'cat1',
    location: 'Remote',
    type: 'Full time',
    slug: 'app-developer',
    description:
      'Looking for a mobile engineer experienced in Swift, Kotlin, or React Native to expand our core native app capabilities.',
    details: {
      responsibilities: [
        'Develop native or React Native applications with clean visual layout and smooth transitions.',
        'Interface with hardware sensors, push notifications, and offline caching layers.',
        'Optimize memory usage, rendering speed, and battery consumption on mobile devices.',
        'Write native bridges for React Native modules where native integration is required.',
        'Keep up-to-date with Apple/Google guidelines and submission processes.',
      ],
      requirements: [
        '3+ years of native mobile development (iOS/Swift or Android/Kotlin) or React Native.',
        'Experience publishing multiple applications to App Store and Play Store.',
        'Solid grasp of mobile UX/UI guidelines and platform-specific behaviors.',
        'Strong knowledge of asynchronous programming and local data storage frameworks.',
        'Excellent teamwork skills in a decentralized startup environment.',
      ],
      salaryRange: '$45,000 - $75,000 / year',
    },
  },
  {
    id: 'job-5',
    title: 'Front-end Developer',
    department: 'Technical',
    categoryClass: 'cat1',
    location: 'Remote',
    type: 'Full time',
    slug: 'frontend-developer',
    description:
      'We want a Front-end Developer who is passionate about animations, micro-interactions, responsive layouts, and modern React environments.',
    details: {
      responsibilities: [
        'Translate Figma designs into pixel-perfect responsive React/Next.js interfaces.',
        'Write clean, accessible semantic HTML5, CSS3, and utility Tailwind classes.',
        'Implement high-fidelity transitions and micro-animations using Framer Motion and GSAP.',
        'Optimize core web vitals, page load speeds, and SEO structured layouts.',
        'Collaborate with developers to hook up front-end pages to REST/GraphQL APIs.',
      ],
      requirements: [
        '3+ years of professional front-end web development experience.',
        'Advanced skills in React, TypeScript, Tailwind CSS, and Next.js.',
        'Demonstrable portfolio showing premium design sense, micro-interactions, and animations.',
        'Strong understanding of responsive layouts, flexbox, grid, and CSS architecture.',
        'Knowledge of web accessibility (WCAG) guidelines and cross-browser compatibility.',
      ],
      salaryRange: '$35,000 - $60,000 / year',
    },
  },
  {
    id: 'job-6',
    title: 'UI/UX Designer',
    department: 'Design',
    categoryClass: 'cat2',
    location: 'Remote',
    type: 'Full time',
    slug: 'uiux-designer',
    description:
      'We are looking for a UI/UX Designer to create stunning, modern, and intuitive user experiences for our client and internal applications.',
    details: {
      responsibilities: [
        'Design complete user interfaces, user flows, and wireframes for web and mobile platforms.',
        'Build and maintain cohesive design systems, component libraries, and style guides in Figma.',
        'Perform user research, usability testing, and translate user feedback into design decisions.',
        'Collaborate directly with frontend engineers to ensure high-fidelity implementation of designs.',
        'Pitch ideas, present design choices, and align design strategies with business goals.',
      ],
      requirements: [
        '3+ years of experience as a UI/UX Designer with a strong portfolio of live web/mobile apps.',
        'Expert-level mastery of Figma (auto-layout, components, variants, prototyping).',
        'Deep understanding of user-centered design principles, typography, grid layouts, and color theory.',
        'Experience designing dark-themed, glassmorphic, and high-premium corporate dashboards.',
        'Basic understanding of frontend frameworks (React/CSS/Tailwind) is a major advantage.',
      ],
      salaryRange: '$40,000 - $65,000 / year',
    },
  },
  {
    id: 'job-7',
    title: 'Creative Designers',
    department: 'Design',
    categoryClass: 'cat2',
    location: 'Remote',
    type: 'Full time',
    slug: 'creative-designer',
    description:
      'Join our design team to craft premium marketing collateral, brand guidelines, illustrations, and digital visual assets.',
    details: {
      responsibilities: [
        'Create high-fidelity graphic assets, layouts, illustrations, and marketing collateral.',
        'Shape brand identity assets, guidelines, and corporate styling guidelines.',
        'Work closely with marketing and content teams to produce high-impact social media creatives.',
        'Review visual assets for styling consistency, quality, and resolution specs.',
        'Stay ahead of design trends and propose fresh creative ideas for brand promotion.',
      ],
      requirements: [
        '3+ years of experience in Graphic Design, Branding, or Creative agency roles.',
        'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, Indesign) and Figma.',
        'Outstanding visual sense: layout, typography, proportions, and visual storytelling.',
        'Experience with basic motion design or video editing tools (After Effects, Premiere) is a plus.',
        'A portfolio showing modern, sleek, and highly engaging marketing designs.',
      ],
      salaryRange: '$30,000 - $50,000 / year',
    },
  },
  {
    id: 'job-8',
    title: 'Digital Marketer',
    department: 'Marketing',
    categoryClass: 'cat3',
    location: 'Remote',
    type: 'Full time',
    slug: 'digital-marketer',
    description:
      'We are hiring a Digital Marketer to manage, optimize, and scale Growspark marketing campaigns, content strategies, and lead generation.',
    details: {
      responsibilities: [
        'Plan, launch, and optimize digital marketing campaigns across Meta, Google, and LinkedIn.',
        'Create and implement inbound marketing strategies, newsletters, and conversion funnels.',
        'Monitor, analyze, and report on key campaign metrics (ROAS, CPA, conversion rates).',
        'Write compelling ad copy, blog posts, and landing page content.',
        'Optimize conversion rate pathways (A/B testing, landing page reviews).',
      ],
      requirements: [
        '3+ years of digital marketing experience in a B2B, SaaS, or IT service environment.',
        'Proven track record of managing paid acquisition campaigns and budget optimization.',
        'Deep knowledge of web analytics platforms (Google Analytics, Hotjar, HubSpot).',
        'Strong copywriting skills and experience guiding design teams for ad creatives.',
        'Self-motivated, data-driven mindset with strong growth marketing instincts.',
      ],
      salaryRange: '$30,000 - $55,000 / year',
    },
  },
  {
    id: 'job-9',
    title: 'SEO Specialist',
    department: 'Marketing',
    categoryClass: 'cat3',
    location: 'Remote',
    type: 'Full time',
    slug: 'seo-specialist',
    description:
      'Looking for an SEO expert to drive organic traffic, manage domain authority, and implement high-yield keyword strategy.',
    details: {
      responsibilities: [
        'Develop and execute on-page, off-page, and technical SEO strategies.',
        'Perform search query and competitor analysis to discover ranking opportunities.',
        'Conduct website audits, resolve crawl errors, redirect loops, and speed bottlenecks.',
        'Collaborate with developers to optimize code structures and schema markup.',
        'Oversee link-building outreach campaigns and manage blog content publication calendars.',
      ],
      requirements: [
        '3+ years of experience as an SEO Specialist or Strategist with proven organic growth.',
        'Mastery of SEO analytical tools (Ahrefs, Semrush, Screaming Frog, GSC).',
        'Excellent understanding of search engine ranking algorithms and web crawler indexing.',
        'Familiarity with HTML, JSON-LD, and JS frameworks (Next.js/React rendering implications).',
        'A data-driven mindset with robust keyword mapping and analytical abilities.',
      ],
      salaryRange: '$30,000 - $52,000 / year',
    },
  },
];
