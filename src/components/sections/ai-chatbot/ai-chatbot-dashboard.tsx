'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';
import { cn } from '@/lib/utils';

export function AiChatbotDashboard() {
  const { marquee, tabs } = aiChatbotPageContent.dashboard;
  // The generic is explicit because `tabs` is `as const`: inferring from
  // `tabs[0].id` alone narrows the state to the literal `'dashboard'`, and every
  // other tab then fails to assign. Derived from the data rather than spelled
  // out, so adding a tab cannot put the two out of step.
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>(tabs[0].id);

  return (
    <section className="relative z-10 pb-20 pt-6">
      <Container>
        {/* Frame container */}
        <div className="relative mx-auto max-w-[1200px]">
          {/* Mac-like Window Frame Image */}
          <div className="relative w-full">
            <Image
              src="/assets/img/video/video-frame.png"
              alt="Browser Frame"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Video / Tab Content Area (overlaying the frame) */}
          <div className="absolute inset-0 flex flex-col px-[5%] pb-[3%] pt-[5%]">
            {/* Tabs */}
            <div className="mb-4 flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-lime text-ink'
                      : 'bg-white/10 text-white hover:bg-white/20',
                  )}
                >
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={20}
                    height={20}
                    className={activeTab === tab.id ? 'brightness-0' : ''}
                  />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Images */}
            <div className="relative w-full flex-grow overflow-hidden rounded-lg bg-ink/50">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    activeTab === tab.id ? 'z-10 opacity-100' : 'z-0 opacity-0',
                  )}
                >
                  <Image src={tab.image} alt={tab.label} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Floating Shapes */}
          <div className="absolute -left-10 top-10 -z-10 w-[150px] animate-bounce max-bs-md:hidden">
            <Image src="/assets/img/shape/video-shape01.png" alt="Shape" width={150} height={150} />
          </div>
          <div className="absolute -right-20 top-40 -z-10 w-[120px] animate-[pulse_3s_ease-in-out_infinite] max-bs-md:hidden">
            <Image src="/assets/img/shape/video-shape02.png" alt="Shape" width={120} height={120} />
          </div>
          <div className="absolute -bottom-10 left-20 -z-10 w-[100px] animate-[spin_10s_linear_infinite] max-bs-md:hidden">
            <Image src="/assets/img/shape/video-shape03.png" alt="Shape" width={100} height={100} />
          </div>
        </div>
      </Container>

      {/* Marquee Banner */}
      <div className="relative mt-20 overflow-hidden bg-lime py-4">
        <div className="flex w-full animate-[marquee_20s_linear_infinite] items-center whitespace-nowrap">
          {/* Double up for seamless looping */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {marquee.map((text, j) => (
                <div key={j} className="flex items-center">
                  <h2 className="mx-8 font-heading text-4xl font-bold uppercase text-ink max-bs-md:text-2xl">
                    {text}
                  </h2>
                  <Image
                    src="/assets/img/video/robot-img.png"
                    alt="Robot"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
