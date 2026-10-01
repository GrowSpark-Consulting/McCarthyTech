import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { ContactCard } from '@/components/sections/contact/contact-card';
import { ContactInquirySection } from '@/components/sections/contact-page/contact-inquiry-section';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us — McCarthy Tech',
  description:
    'Get in touch with McCarthy Tech. Reach out for custom software development, AI implementation, or partnership inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us — McCarthy Tech',
    description:
      'Get in touch with McCarthy Tech. Reach out for custom software development, AI implementation, or partnership inquiries.',
    url: '/contact',
  },
};

export default function ContactPage() {
  const breadcrumb = [
    { label: 'home', href: '/' },
    { label: 'Contact us', href: '/contact' },
  ] as const;

  return (
    <>
      {/* Hero Header */}
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
            <BreadcrumbTrail items={breadcrumb} />
          </div>
          <h1
            className={cn(
              'm-0 font-heading text-[52px] font-bold leading-[1.2] text-white',
              'max-bs-lg:text-[42px] max-bs-md:text-[32px]',
            )}
          >
            Contact us
          </h1>
        </Container>
      </section>

      {/* Contact Info Card */}
      <section className="bg-ink pb-[60px]">
        <Container>
          <ContactCard />
        </Container>
      </section>

      {/* Inquiry form — submits to Google Sheets via Apps Script */}
      <ContactInquirySection />
    </>
  );
}
