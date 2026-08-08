import { Container } from '@/components/ui/container';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

export function AboutStats() {
  return (
    <section className="pb-[150px] max-bs-md:pb-[100px]">
      <Container>
        <div className="mb-10 text-center">
          <p className="font-heading text-[24px] font-normal tracking-[-0.02em] text-white">
            {aboutPageContent.stats.subtitle}
          </p>
        </div>
      </Container>

      <div className="py-[60px]">
        <Container>
          <div className="grid grid-cols-3 gap-[30px] max-bs-md:grid-cols-1">
            {aboutPageContent.stats.items.map((stat) => (
              <div key={stat.id} className="text-center">
                <h2
                  className={cn(
                    'mb-2 font-heading text-[48px] font-bold text-white',
                    'max-bs-lg:text-[40px] max-bs-md:text-[36px]',
                  )}
                >
                  {stat.value}
                </h2>
                <p className="m-0 text-lg text-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
