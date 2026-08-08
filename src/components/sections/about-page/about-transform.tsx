import Image from 'next/image';

import { AgencyButton } from '@/components/ui/agency-button';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

export function AboutTransform() {
  return (
    <section className="relative overflow-hidden py-[120px] max-bs-md:py-20">
      <Container>
        <div className="flex items-center gap-[60px] max-bs-lg:flex-col">
          {/* Left Column: Content */}
          <div className="w-1/2 max-bs-lg:w-full">
            <div className="mb-8">
              <SectionEyebrow>{aboutPageContent.transform.subtitle}</SectionEyebrow>
            </div>
            <h2
              className={cn(
                'mb-6 font-heading text-[52px] font-normal leading-[1.2] text-white',
                'max-bs-lg:text-[42px] max-bs-md:text-[32px]',
              )}
            >
              {aboutPageContent.transform.title}
            </h2>
            <p className="mb-10 max-w-[540px] text-lg text-subtle">
              {aboutPageContent.transform.content}
            </p>
            <AgencyButton
              href={aboutPageContent.transform.button.href}
              label={aboutPageContent.transform.button.label}
            />
          </div>

          {/* Right Column: Awards Marquee */}
          <div className="relative w-1/2 overflow-hidden max-bs-lg:w-full">
            {/* We'll use two rows, one moving left, one right. */}
            <div className="flex flex-col gap-6">
              {/* Row 1 */}
              <div className="flex w-max animate-marquee-x gap-6 opacity-60 hover:opacity-100 motion-reduce:animate-none">
                {[...aboutPageContent.transform.awards, ...aboutPageContent.transform.awards].map(
                  (award, i) => (
                    <div
                      key={`row1-${i}`}
                      className="flex h-[100px] w-[180px] shrink-0 items-center justify-center rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6"
                    >
                      <Image
                        src={award}
                        alt="Award logo"
                        width={120}
                        height={50}
                        className="object-contain opacity-70 transition-opacity hover:opacity-100"
                      />
                    </div>
                  ),
                )}
              </div>

              {/* Row 2 (Reverse) */}
              <div className="animate-marquee-x-reverse flex w-max gap-6 opacity-60 hover:opacity-100 motion-reduce:animate-none">
                {[
                  ...aboutPageContent.transform.awards.slice().reverse(),
                  ...aboutPageContent.transform.awards.slice().reverse(),
                ].map((award, i) => (
                  <div
                    key={`row2-${i}`}
                    className="flex h-[100px] w-[180px] shrink-0 items-center justify-center rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-6"
                  >
                    <Image
                      src={award}
                      alt="Award logo"
                      width={120}
                      height={50}
                      className="object-contain opacity-70 transition-opacity hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
