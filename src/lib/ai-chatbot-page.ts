import type { NavLink } from '@/types/navigation';

export const aiChatbotPageContent = {
  hero: {
    title: 'Save your time chat smarter with AI chatbot',
    subtitle:
      'Automate your repetitive support, and let AI assist you when you need to jump in. Reply faster, stay personal, and automate the rest.',
    button: { label: "build your ai chatbot - it's free", href: '/contact' } satisfies NavLink,
  },

  dashboard: {
    marquee: ['24/7 instant support', 'No-code chatbot builder'],
    tabs: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '/assets/img/icon/dash_board_icon.svg',
        image: '/assets/img/video/img01.jpg',
      },
      {
        id: 'document',
        label: 'Document',
        icon: '/assets/img/icon/document_icon.svg',
        image: '/assets/img/video/img02.jpg',
      },
      {
        id: 'sheet',
        label: 'Sheet',
        icon: '/assets/img/icon/sheet_icon.svg',
        image: '/assets/img/video/img03.jpg',
      },
      {
        id: 'whiteboard',
        label: 'Whiteboard',
        icon: '/assets/img/icon/sheet_icon.svg',
        image: '/assets/img/video/img04.jpg',
      },
    ],
  },

  features: {
    eyebrow: 'McCarthy Tech AI chatbot Features',
    title: 'Build the perfect customer-facing AI agent',
    button: { label: "build your ai chatbot - it's free", href: '/contact' } satisfies NavLink,
    items: [
      {
        id: 'automate',
        title: 'Automate with smart chatbot',
        content:
          'Handle customer queries instantly, reduce repetitive manual tasks, and boost customer satisfaction with our 24/7 AI-powered chatbot automation designed to streamline your support.',
        image: '/assets/img/feature/feature-img03.png',
      },
      {
        id: 'sync',
        title: 'Sync with real-time data',
        content:
          'Make faster, data-driven decisions powered by real-time AI analysis and prediction.',
        image: '/assets/img/feature/feature-img02.png',
      },
      {
        id: 'multilingual',
        title: 'Multilingual support',
        content:
          'Multilingual support lets you connect with customers worldwide by removing language.',
        image: '/assets/img/feature/feature-img04.png',
      },
      {
        id: 'reporting',
        title: 'Advanced reporting',
        content: 'Advanced reporting provides detailed insights and data to help you make smarter.',
        image: '/assets/img/feature/feature-img05.png',
      },
      {
        id: 'privacy',
        title: 'Data privacy & security',
        content:
          'Data privacy & security protect your information, ensuring it stays safe all times.',
        image: '/assets/img/feature/feature-img06.png',
      },
    ],
  },

  brands: {
    title: 'Trusted by 9000+ AI Assistants created',
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

  process: {
    eyebrow: 'How It Works',
    title: 'Launch your chat bot in 3 steps',
    button: { label: 'start for free', href: '/contact' } satisfies NavLink,
    steps: [
      { number: '01', title: 'Sign Up & Build' },
      { number: '02', title: 'Connect Channels' },
      { number: '03', title: 'Analyze & Optimize' },
    ],
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Hear from our happy customers',
    items: [
      {
        id: 1,
        content:
          '"McCarthy Tech now automates over 70% of our customer queries, saving hours of manual work daily. It\'s improved both our response time and overall customer satisfaction."',
        author: 'Priya Ramirez',
        designation: 'Manager - SwiftLogix',
        avatar: '/assets/img/avatar/author_01.png',
      },
      {
        id: 2,
        content:
          '"We launched McCarthy Tech in just minutes, and the impact was immediate. Our support costs dropped by 50%, and customers receive answers instantly, 24/7."',
        author: 'Sebastian Clark',
        designation: 'CEO & Founder - DocFlow',
        avatar: '/assets/img/avatar/author_02.png',
      },
    ],
  },

  integrations: {
    logos: [
      '/assets/img/integration/microsoft.png',
      '/assets/img/integration/telegram.png',
      '/assets/img/integration/slack.png',
      '/assets/img/integration/line.png',
      '/assets/img/integration/mailchimp.png',
      '/assets/img/integration/apple.png',
      '/assets/img/integration/messenger.png',
      '/assets/img/integration/linkedin.png',
      '/assets/img/integration/google-meet.png',
      '/assets/img/integration/paypal.png',
      '/assets/img/integration/plateform.png',
      '/assets/img/integration/airtable.png',
      '/assets/img/integration/whatsapp.png',
      '/assets/img/integration/android.png',
      '/assets/img/integration/instagram.png',
      '/assets/img/integration/shazam.png',
      '/assets/img/integration/shopify.png',
      '/assets/img/integration/loom.png',
      '/assets/img/integration/snapchat.png',
      '/assets/img/integration/discord.png',
    ],
  },
} as const;
