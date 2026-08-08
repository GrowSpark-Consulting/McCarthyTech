import Image from 'next/image';

import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotHero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-cover bg-center bg-no-repeat pb-[110px] pt-0 max-bs-md:pb-20"
      style={{ backgroundImage: 'url(/assets/img/bg/hero_bg02.jpg)' }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 11, 20, 0.55) 0%, rgba(10, 11, 20, 0.12) 32%, rgba(10, 11, 20, 0.78) 100%), radial-gradient(130% 95% at 12% 100%, rgba(10, 11, 20, 0.85) 0%, rgba(10, 11, 20, 0) 58%)',
        }}
      />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end">
          <div className="w-full md:w-1/2">
            <div className="max-w-[880px]">
              <h1 className="mb-6 font-heading text-[52px] font-bold leading-[1.2] text-white max-bs-lg:text-[42px] max-bs-md:text-[32px]">
                {aiChatbotPageContent.hero.title}
              </h1>
              <p className="mb-10 max-w-[500px] text-lg text-subtle">
                {aiChatbotPageContent.hero.subtitle}
              </p>
              <AgencyButton
                href={aiChatbotPageContent.hero.button.href}
                label={aiChatbotPageContent.hero.button.label}
              />
            </div>
          </div>
          <div className="mt-12 w-full md:mt-0 md:w-1/2">
            {/* The right side images overlapping effect can be placed here, using standard Image tag layout */}
            <div className="relative h-[400px] w-full">
              <Image
                src="/assets/img/hero/hero-img01.png"
                alt="Hero graphic"
                fill
                className="object-contain object-right-bottom"
              />
              <Image
                src="/assets/img/hero/glassy-effect-img.png"
                alt="Glassy effect"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-[30px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-[10px] max-bs-md:hidden">
        <div className="relative h-[46px] w-[1px] overflow-hidden bg-white/20">
          <div className="absolute left-0 top-0 h-1/2 w-full animate-bounce bg-white" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.28em] text-white/60">Scroll Down</span>
      </div>
    </section>
  );
}
