import Image from 'next/image';

import { DecoratedHeading } from '@/components/sections/about/decorated-heading';
import { Container } from '@/components/ui/container';
import { aboutContent } from '@/lib/about';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

export function AboutOverview() {
  return (
    <section className="relative pb-[140px] pt-20 max-bs-md:pb-20 max-bs-md:pt-10">
      <Container>
        {/* Top Video Grid */}
        <div className="mb-12 grid grid-cols-4 items-start gap-4 max-bs-lg:grid-cols-2 max-bs-sm:grid-cols-1">
          <div className="h-[322px] overflow-hidden rounded-[20px] max-bs-lg:h-[250px]">
            <video
              loop
              muted
              playsInline
              autoPlay
              src="/assets/img/13149459_1920_1080_30fps.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[322px] overflow-hidden rounded-[20px] max-bs-lg:h-[250px]">
            <Image
              src="/assets/img/brain.gif"
              alt="Brain animation"
              width={400}
              height={322}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[322px] overflow-hidden rounded-[20px] max-bs-lg:h-[250px]">
            <video
              loop
              muted
              playsInline
              autoPlay
              src="/assets/img/video/home4.mp4"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[410px] overflow-hidden rounded-[20px] max-bs-lg:h-[250px]">
            <video
              loop
              muted
              playsInline
              autoPlay
              src="/assets/img/Futuristic_Code_Animation_Generation.mp4"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* About Heading & Body */}
        <div className="mb-12 text-center">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[2px] text-mint">
            Who We Are?
          </span>
          <div className="mx-auto max-w-[874px]">
            <DecoratedHeading
              id="about-heading"
              segments={aboutContent.headingSegments}
              className={cn(
                'mb-6 block font-heading text-[52px] font-normal leading-[1.5]',
                'tracking-[-0.08em] text-white',
                'max-bs-md:text-[36px]',
              )}
            />
            <p className="mx-auto max-w-[800px] text-lg text-subtle">{aboutContent.body}</p>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-3 gap-[30px] max-bs-lg:grid-cols-2 max-bs-md:grid-cols-1">
          {aboutPageContent.aboutFeatures.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                'group relative rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-8',
                'transition-all duration-300 hover:border-mint/30 hover:bg-white/[0.04]',
              )}
            >
              <div className="mb-6 flex size-[60px] items-center justify-center rounded-full bg-white/[0.05]">
                <Image src={feature.icon} alt={feature.title} width={30} height={30} />
              </div>
              <h3 className="mb-4 font-heading text-[24px] font-semibold text-white">
                {feature.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.7] text-subtle">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 -z-10 w-full opacity-30">
        <Image
          src="/assets/img/bg/about-bg02.png"
          alt=""
          width={1920}
          height={800}
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}
