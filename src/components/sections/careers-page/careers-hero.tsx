import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function CareersHero() {
  const breadcrumbItems = [
    { label: 'home', href: '/' },
    { label: 'Careers', href: '/careers' },
  ] as const;

  return (
    <section
      className={cn(
        'relative bg-cover bg-center bg-no-repeat',
        'pb-[100px] pt-[180px] text-center',
        'max-bs-lg:pt-[150px] max-bs-md:pt-[120px]',
      )}
      style={{ backgroundImage: "url('/assets/img/bg/bootcamp-bg.png')" }}
    >
      <Container>
        <div className="mb-4 flex justify-center">
          <BreadcrumbTrail items={breadcrumbItems} />
        </div>
        <h1
          className={cn(
            'm-0 font-heading text-[52px] font-bold leading-[1.2] text-white',
            'max-bs-lg:text-[42px] max-bs-md:text-[32px]',
          )}
        >
          Careers
        </h1>
      </Container>
    </section>
  );
}
