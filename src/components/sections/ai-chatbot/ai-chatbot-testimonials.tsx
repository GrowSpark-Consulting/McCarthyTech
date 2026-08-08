import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { aiChatbotPageContent } from '@/lib/ai-chatbot-page';

export function AiChatbotTestimonials() {
  const { eyebrow, items } = aiChatbotPageContent.testimonials;

  return (
    <section className="relative z-10 bg-[url('/assets/img/bg/testimonial-bg02.png')] bg-cover bg-center py-24">
      <Container>
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <Image
              src="/assets/img/icon/sub_left-_white_icon.png"
              alt="icon"
              width={16}
              height={16}
            />
            {eyebrow}
            <Image
              src="/assets/img/icon/sub_right-_white_icon.png"
              alt="icon"
              width={16}
              height={16}
            />
          </span>
          <h2 className="mb-8 flex items-center justify-center gap-4 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Hear from our
            <Image src="/assets/img/icon/animated-gif03.gif" alt="gif" width={60} height={60} />
            happy customers
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-lime/50"
            >
              <div className="mb-8">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="mb-6 rounded-full"
                />
                <p className="text-xl italic text-white/90">
                  &quot;{testimonial.content.replace(/^"|"$/g, '')}&quot;
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-subtle">{testimonial.designation}</p>
                </div>
                <Image
                  src="/assets/img/testimonial/quote.png"
                  alt="quote"
                  width={40}
                  height={40}
                  className="opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
