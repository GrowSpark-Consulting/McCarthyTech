import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotIntegration() {
  const { logos } = aiChatbotPageContent.integrations;

  return (
    <section className="bg-ink py-24">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Easily integrates with 50+ applications
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-subtle">
            Connect your AI chatbot seamlessly with the tools your team already uses. No complex
            setups required.
          </p>
        </div>
      </Container>

      {/* Integrations Marquee - Slow */}
      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          {/* Double up for seamless looping */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {logos.slice(0, 10).map((logo, j) => (
                <div
                  key={j}
                  className="relative h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-lime/50 hover:bg-white/10"
                >
                  <Image src={logo} alt="Integration Logo" fill className="object-contain p-4" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Marquee - Reverse */}
      <div className="relative mt-12 flex w-full overflow-hidden">
        <div className="flex animate-[marquee-reverse_40s_linear_infinite] whitespace-nowrap">
          {/* Double up for seamless looping */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {logos.slice(10, 20).map((logo, j) => (
                <div
                  key={j}
                  className="relative h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-lime/50 hover:bg-white/10"
                >
                  <Image src={logo} alt="Integration Logo" fill className="object-contain p-4" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
