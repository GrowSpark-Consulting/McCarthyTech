import Image from 'next/image';

import { AchievementStats } from '@/components/sections/contact/achievement-stats';
import { ContactFormLoader } from '@/components/sections/contact/contact-form-loader';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { contactContent } from '@/lib/contact';
import { cn } from '@/lib/utils';

/**
 * Contact section — achievements on the left, enquiry form on the right.
 *
 * The two halves overlap by design: the form is pulled 30px left so it sits over
 * the gutter, and the stats card's decorative shapes float above its own top
 * edge. Both collapse to a single stacked column below 992px.
 *
 * A Server Component; the counters and the form hydrate independently, so a
 * visitor who never reaches the form still pays nothing for its validation code.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-contact-stage bg-cover bg-center bg-no-repeat pb-[140px] pt-[150px] max-bs-md:py-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-[50px] bs-lg:grid-cols-2">
          <div>
            <div className={cn('-mt-[5px] mr-[100px]', 'max-bs-xl:mr-[35px] max-bs-lg:mr-0')}>
              <div>
                <SectionEyebrow className="mb-[15px]">{contactContent.eyebrow}</SectionEyebrow>
                <h2
                  id="contact-heading"
                  className={cn(
                    'block font-heading text-[62px] font-normal leading-[1.3]',
                    'tracking-[-0.08em] text-white',
                    'max-bs-xl:text-[52px] max-bs-lg:text-[48px] max-bs-md:text-[32px]',
                  )}
                >
                  {contactContent.headingBefore}
                  <span
                    aria-hidden="true"
                    className="inline-block h-[50px] w-[165px] overflow-hidden rounded-full align-middle"
                  >
                    <Image
                      src={contactContent.headingOrnament.src}
                      alt={contactContent.headingOrnament.alt}
                      width={contactContent.headingOrnament.width}
                      height={contactContent.headingOrnament.height}
                      // Animated GIF: the optimiser would flatten it to one frame.
                      unoptimized
                      className="h-[50px] w-full object-cover"
                    />
                  </span>
                  {contactContent.headingAfter}
                </h2>
              </div>

              <AchievementStats />
            </div>
          </div>

          {/* The card chrome and its heading live here, in the Server
              Component, so they appear in the HTML. Only the form controls are
              code-split behind `ssr: false` — the audit caught that hoisting
              the whole card meant "Ready to collaborate with us?" and every
              field label were absent from the served markup entirely. */}
          <div
            className={cn(
              'relative isolate z-[1] -ml-[30px] rounded-[10px] px-10 py-[50px]',
              'bg-glass-sheen shadow-[0_4px_24px_-1px_rgba(28,9,61,0.2)]',
              'max-bs-lg:ml-0 max-bs-md:px-5',
            )}
          >
            {/* Grain — `.xb-contact-form::before`. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-contact-noise bg-cover bg-no-repeat"
            />
            {/* 1px gradient hairline — `.xb-border::after`. */}
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 -z-10 rounded-[10px] bg-hairline p-px',
                '[mask-composite:exclude] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
              )}
            />

            <div className="mb-[30px] text-center">
              <h3
                className={cn(
                  'mb-[5px] font-heading text-[32px] tracking-[-0.03em] text-white',
                  'max-bs-xl:text-[30px] max-bs-md:text-2xl',
                )}
              >
                {contactContent.formHeading}
              </h3>
              <p className="text-white">{contactContent.formSubheading}</p>
            </div>

            <ContactFormLoader />
          </div>
        </div>
      </Container>
    </section>
  );
}
