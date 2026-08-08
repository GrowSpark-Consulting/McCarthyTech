import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotBrands() {
  const { title, logos } = aiChatbotPageContent.brands;

  return (
    <section className="bg-ink pb-20 pt-10">
      <Container>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-white/60">
            <Image src="/assets/img/icon/sub-left-icon.png" alt="icon" width={16} height={16} />
            {title}
            <Image src="/assets/img/icon/sub-right-icon.png" alt="icon" width={16} height={16} />
          </span>
        </div>
      </Container>

      {/* Brands Marquee */}
      <div className="relative flex w-full overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {/* Double up for seamless looping */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {logos.map((logo, j) => (
                <div
                  key={j}
                  className="relative h-12 w-[120px] shrink-0 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  <Image src={logo} alt="Brand Logo" fill className="object-contain" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
