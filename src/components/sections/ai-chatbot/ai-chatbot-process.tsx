import Image from 'next/image';

import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotProcess() {
  const { eyebrow, title, button, steps } = aiChatbotPageContent.process;

  return (
    <section className="relative z-10 py-32">
      <Container>
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="w-full md:w-5/12">
            <div className="sticky top-32">
              <span className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60">
                <Image src="/assets/img/icon/sub-left-icon.png" alt="icon" width={16} height={16} />
                {eyebrow}
              </span>
              <h2 className="mb-10 font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[50px]">
                {title}
              </h2>
              <AgencyButton href={button.href} label={button.label} />
            </div>
          </div>

          <div className="w-full md:w-7/12">
            <div className="flex flex-col gap-8 pb-[100px]">
              {/* Step 1 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50">
                <div className="flex items-center gap-6">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src="/assets/img/process/img01.png"
                      alt="Step icon"
                      fill
                      className="object-contain"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-white">
                      {steps[0].number}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{steps[0].title}</h3>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50">
                <div className="flex items-center gap-6">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src="/assets/img/process/img01.png"
                      alt="Step icon"
                      fill
                      className="object-contain"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-white">
                      {steps[1].number}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{steps[1].title}</h3>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50">
                <div className="flex items-center gap-6">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src="/assets/img/process/img01.png"
                      alt="Step icon"
                      fill
                      className="object-contain"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-bold text-white">
                      {steps[2].number}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{steps[2].title}</h3>
                </div>
              </div>
            </div>

            {/* The right side images in the original are absolutely positioned decor, let's stack them nicely below the steps on mobile, or alongside */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Image
                src="/assets/img/process/img02.png"
                alt="Process image"
                width={300}
                height={200}
                className="w-full rounded-xl"
              />
              <Image
                src="/assets/img/process/img03.png"
                alt="Process image"
                width={300}
                height={200}
                className="w-full rounded-xl"
              />
              <Image
                src="/assets/img/process/img04.png"
                alt="Process image"
                width={300}
                height={200}
                className="w-full rounded-xl md:col-span-2"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
