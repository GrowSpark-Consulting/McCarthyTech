import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { Container } from '@/components/ui/container';
import { aboutPageContent } from '@/lib/about-page';
import { cn } from '@/lib/utils';

export function AboutHero() {
  return (
    <section
      className={cn(
        'relative bg-cover bg-center bg-no-repeat',
        'pb-[100px] pt-[180px] text-center',
        'max-bs-lg:pt-[150px] max-bs-md:pt-[120px]',
      )}
      style={{ backgroundImage: `url(${aboutPageContent.breadcrumbBg})` }}
    >
      <Container>
        <div className="mb-4 flex justify-center">
          <BreadcrumbTrail items={aboutPageContent.breadcrumb} />
        </div>
        <h1
          className={cn(
            'm-0 font-heading text-[52px] font-bold leading-[1.2] text-white',
            'max-bs-lg:text-[42px] max-bs-md:text-[32px]',
          )}
        >
          {aboutPageContent.title}
        </h1>
      </Container>
    </section>
  );
}
