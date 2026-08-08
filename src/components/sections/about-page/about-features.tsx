import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

export function AboutFeatures() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-[120px] max-bs-md:py-20"
      style={{ backgroundImage: `url(${aboutPageContent.whyChooseUs.bg})` }}
    >
      <Container>
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Heading */}
          <div className="mb-12 w-full md:mb-0 md:w-1/3">
            <div className="max-w-[400px]">
              <div className="mb-5">
                <SectionEyebrow>{aboutPageContent.whyChooseUs.eyebrow}</SectionEyebrow>
              </div>
              <h2
                className={cn(
                  'font-heading text-[52px] font-normal leading-[1.2] text-white',
                  'max-bs-lg:text-[42px] max-bs-md:text-[32px]',
                )}
              >
                {aboutPageContent.whyChooseUs.title}
              </h2>
            </div>
          </div>

          {/* Right Column: 2x2 Grid */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 gap-[30px] max-bs-md:grid-cols-1">
              {aboutPageContent.whyChooseUs.features.map((feature) => (
                <div
                  key={feature.id}
                  className={cn(
                    'group flex items-center gap-6 rounded-[20px] border border-white/[0.08]',
                    'bg-white/[0.03] p-8 transition-colors duration-300 hover:border-mint/30 hover:bg-white/[0.05]',
                  )}
                >
                  <div className="shrink-0">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={40}
                      height={40}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="m-0 font-heading text-[22px] font-medium leading-[1.4] text-white">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
