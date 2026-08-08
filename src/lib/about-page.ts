import type { NavLink } from '@/types/navigation';

export const aboutPageContent = {
  breadcrumb: [
    { label: 'home', href: '/' },
    { label: 'About Grow Spark', href: '/about' },
  ],
  title: 'Engineering the Future',
  breadcrumbBg: '/assets/img/bg/bootcamp-bg.png',

  aboutFeatures: [
    {
      id: 'global-reach',
      title: 'Global Reach',
      description:
        'Delivering excellence across borders with a local touch, rooted in Chennai, Tamil Nadu.',
      icon: '/assets/img/icon/feature-icon01.svg',
    },
    {
      id: 'full-stack',
      title: 'Full-Stack Innovation',
      description: 'From backend logic to frontend magic, we handle it all with precision.',
      icon: '/assets/img/icon/feature-icon02.svg',
    },
    {
      id: 'agile',
      title: 'Agile & Adaptive',
      description: 'Rapid development cycles tailored to your business needs and market demands.',
      icon: '/assets/img/icon/feature-icon03.svg',
    },
  ],

  stats: {
    subtitle: 'Delivering Premium IT Solutions Globally',
    items: [
      { id: 'projects', value: '30+', label: 'Projects Delivered' },
      { id: 'countries', value: '12+', label: 'Countries Served' },
      { id: 'satisfaction', value: '100%', label: 'Client Satisfaction' },
    ],
  },

  whyChooseUs: {
    eyebrow: 'The Grow Spark Advantage',
    title: 'Why businesses choose us?',
    bg: '/assets/img/bg/feature-bg.jpg',
    features: [
      {
        id: 'secure-ai',
        title: 'Secure, ethical & scalable AI',
        icon: '/assets/img/icon/fea-small-icon01.svg',
      },
      {
        id: 'expert-team',
        title: 'Expert team of AI specialists',
        icon: '/assets/img/icon/fea-small-icon04.svg',
      },
      {
        id: 'custom-solutions',
        title: 'Custom-built solutions that fit you',
        icon: '/assets/img/icon/fea-small-icon02.svg',
      },
      {
        id: 'client-centric',
        title: 'Client-Centric Approach',
        icon: '/assets/img/icon/fea-small-icon06.svg',
      },
    ],
  },

  transform: {
    subtitle: 'Ready to Transform?',
    title: 'Initiate your strategic digital transformation',
    content:
      'We are a team of innovators dedicated to delivering cutting-edge solutions that help businesses achieve remarkable growth and success. Partner with Grow Spark today.',
    button: { label: 'Begin Today with us', href: '/contact' } satisfies NavLink,
    awards: [
      '/assets/img/award/img01.png',
      '/assets/img/award/img02.png',
      '/assets/img/award/img03.png',
      '/assets/img/award/img04.png',
      '/assets/img/award/img05.png',
      '/assets/img/award/img06.png',
      '/assets/img/award/img07.png',
      '/assets/img/award/img08.png',
    ],
  },
} as const;
