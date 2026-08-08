import type { Metadata } from 'next';

import { AiChatbotBrands } from '@/components/sections/ai-chatbot/ai-chatbot-brands';
import { AiChatbotDashboard } from '@/components/sections/ai-chatbot/ai-chatbot-dashboard';
import { AiChatbotFeatures } from '@/components/sections/ai-chatbot/ai-chatbot-features';
import { AiChatbotHero } from '@/components/sections/ai-chatbot/ai-chatbot-hero';
import { AiChatbotIntegration } from '@/components/sections/ai-chatbot/ai-chatbot-integration';
import { AiChatbotProcess } from '@/components/sections/ai-chatbot/ai-chatbot-process';
import { AiChatbotTestimonials } from '@/components/sections/ai-chatbot/ai-chatbot-testimonials';

export const metadata: Metadata = {
  title: { absolute: 'AI Chatbot | Grow Spark' },
  description:
    'Intelligent AI chatbot solutions from Grow Spark — automate support and engagement with natural, 24/7 conversations.',
  alternates: { canonical: '/services/ai-chatbot' },
  openGraph: {
    title: 'AI Chatbot | Grow Spark',
    description:
      'Intelligent AI chatbot solutions from Grow Spark — automate support and engagement with natural, 24/7 conversations.',
    url: '/services/ai-chatbot',
  },
};

export default function AiChatbotPage() {
  return (
    <>
      <AiChatbotHero />
      <AiChatbotDashboard />
      <AiChatbotFeatures />
      <AiChatbotBrands />
      <AiChatbotProcess />
      <AiChatbotTestimonials />
      <AiChatbotIntegration />
    </>
  );
}
