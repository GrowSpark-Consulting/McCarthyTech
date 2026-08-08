import Image from 'next/image';

import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotFeatures() {
  const { eyebrow, title, button, items } = aiChatbotPageContent.features;

  return (
    <section className="relative bg-[url('/assets/img/bg/custom-bg.jpg')] bg-cover bg-center py-24">
      <Container>
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
            <Image src="/assets/img/icon/sub-left-icon.png" alt="icon" width={16} height={16} />
            {eyebrow}
          </span>
          <h2 className="mb-8 flex flex-wrap items-center justify-center gap-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <span>
              <Image
                src="/assets/img/icon/artificial-intelligence-11761.gif"
                alt="AI Icon"
                width={60}
                height={60}
                className="inline-block"
              />
            </span>
            {title}
          </h2>
          <div className="inline-block">
            <AgencyButton href={button.href} label={button.label} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main big feature item */}
          <div className="group col-span-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50 md:col-span-2 lg:col-span-2">
            <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-xl">
              <Image
                src={items[0].image}
                alt={items[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-bold text-white">{items[0].title}</h3>
            <p className="text-lg text-subtle">{items[0].content}</p>
          </div>

          {/* Secondary feature item */}
          <div className="group col-span-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50">
            <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-xl">
              <Image
                src={items[1].image}
                alt={items[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex animate-[bounce_3s_ease-in-out_infinite] items-center justify-center">
                <Image src="/assets/img/feature/scan.png" alt="Scan" width={100} height={100} />
              </div>
            </div>
            <h3 className="mb-4 font-heading text-xl font-bold text-white">{items[1].title}</h3>
            <p className="text-subtle">{items[1].content}</p>
          </div>

          {/* Remaining feature items */}
          {items.slice(2).map((item) => (
            <div
              key={item.id}
              className="group col-span-1 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50"
            >
              <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold text-white">{item.title}</h3>
              <p className="text-subtle">{item.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
