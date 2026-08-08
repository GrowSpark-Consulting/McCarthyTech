import { ContactFormLoader } from '@/components/sections/contact/contact-form-loader';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export function ContactFormSection() {
  return (
    <section className="bg-ink py-[120px] max-bs-md:py-[80px]">
      <Container>
        {/* Form and Map Wrapper */}
        <div
          className={cn(
            'relative overflow-hidden rounded-[20px] border border-white/[0.08] p-12 max-bs-md:p-6',
            'z-[1] flex items-stretch gap-12 bg-cover bg-center bg-no-repeat max-bs-lg:flex-col',
          )}
          style={{ backgroundImage: "url('/assets/img/bg/contact-bg02.png')" }}
        >
          {/* Decorative Grain and Hairlines */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-contact-noise bg-cover bg-no-repeat opacity-40"
          />

          {/* Left Column: Contact Form */}
          <div className="relative flex-1 rounded-[10px] border border-white/[0.04] bg-glass p-10 shadow-inner backdrop-blur-glass backdrop-saturate-glass max-bs-md:p-6">
            <div className="mb-[30px] text-center">
              <h3 className="mb-2 font-heading text-3xl font-bold tracking-[-0.03em] text-white max-bs-md:text-2xl">
                Ready to collaborate with us?
              </h3>
              <p className="text-sm leading-relaxed text-subtle">
                Who knows where a single message might lead you.
              </p>
            </div>
            <ContactFormLoader />
          </div>

          {/* Right Column: Google Maps Iframe */}
          <div className="min-h-[400px] w-[45%] shrink-0 overflow-hidden rounded-[10px] border border-white/[0.06] shadow-lg max-bs-lg:w-full max-bs-md:min-h-[300px]">
            <iframe
              title="Grow Spark Location Map"
              src="https://maps.google.com/maps?q=Chennai%2C%20Tamil%20Nadu%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-[400px] w-full border-0 max-bs-md:min-h-[300px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
