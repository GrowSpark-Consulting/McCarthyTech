import { ContactInquiryForm } from '@/components/sections/contact-page/contact-inquiry-form';
import { Container } from '@/components/ui/container';
import { SectionEyebrow } from '@/components/ui/section-eyebrow';
import { contactInquiryContent } from '@/lib/contact-inquiry';
import { cn } from '@/lib/utils';

/** Nodes of the decorative network, in the 400×240 viewBox. */
const NODES = [
  [30, 190],
  [110, 120],
  [200, 170],
  [250, 70],
  [330, 140],
  [375, 40],
] as const;

/** Which nodes are joined. */
const LINKS = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
] as const;

/**
 * A small circuit-style network under the copy — the site's mint traces and
 * lime nodes, breathing out of phase. Purely decorative.
 */
function NetworkOrnament() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 240"
      fill="none"
      className="mt-12 w-full max-w-[420px] max-bs-lg:mt-10 max-bs-md:hidden"
    >
      {LINKS.map(([a, b]) => {
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        const midX = (x1 + x2) / 2;
        return (
          <path
            key={`${a}-${b}`}
            d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
            stroke="#00ff97"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
        );
      })}
      {NODES.map(([x, y], index) => (
        <g
          key={`${x}-${y}`}
          className={cn(
            'animate-indus-twinkle motion-reduce:animate-none',
            index % 3 === 1 && '[animation-delay:1.2s]',
            index % 3 === 2 && '[animation-delay:2.4s]',
          )}
        >
          <circle cx={x} cy={y} r="11" fill="#c4f012" fillOpacity="0.12" />
          <circle cx={x} cy={y} r="4" fill="#c4f012" />
        </g>
      ))}
    </svg>
  );
}

/**
 * The Contact page inquiry band: who to contact us about on the left, the
 * inquiry form on the right, stacked on narrower screens.
 *
 * Sits in the same framed panel the page's previous form used — the
 * `contact-bg02` backdrop, grain and hairline border — so it reads as part of
 * the existing page.
 */
export function ContactInquirySection() {
  const content = contactInquiryContent;

  return (
    <section
      aria-labelledby="contact-inquiry-heading"
      className="bg-ink py-[120px] max-bs-md:py-20"
    >
      <Container>
        <div
          className={cn(
            'relative z-[1] grid grid-cols-1 gap-12 overflow-hidden rounded-[20px] border border-white/[0.08]',
            'bg-[url(/assets/img/bg/contact-bg02.png)] bg-cover bg-center bg-no-repeat p-12',
            'max-bs-lg:gap-10 max-bs-md:p-3 bs-lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]',
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-contact-noise bg-cover bg-no-repeat opacity-40"
          />

          <div className="flex flex-col bs-lg:pt-4">
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2
              id="contact-inquiry-heading"
              className={cn(
                'mt-5 font-heading font-normal tracking-[-0.04em] text-white',
                'text-[48px] max-bs-xl:text-[42px] max-bs-lg:text-[40px] max-bs-md:text-[32px]',
                'leading-[1.12]',
              )}
            >
              {content.heading}
            </h2>
            <p className="mt-5 max-w-[480px] text-[17px] leading-[1.7] text-white/75">
              {content.lead}
            </p>

            <ul className="mt-8 grid list-none grid-cols-2 gap-x-6 gap-y-3.5 p-0 max-[400px]:grid-cols-1">
              {content.offerings.map((offering) => (
                <li key={offering} className="flex items-center gap-3 text-[15px] text-white">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-lime shadow-[0_0_10px_rgba(196,240,18,0.7)]"
                  />
                  {offering}
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-center gap-2.5 text-sm text-white/60">
              <span
                aria-hidden="true"
                className="size-2 animate-live-pulse rounded-full bg-mint motion-reduce:animate-none"
              />
              {content.responseNote}
            </p>

            <NetworkOrnament />
          </div>

          <div
            className={cn(
              'relative rounded-[16px] border border-white/[0.08] bg-glass/[0.55] p-10 backdrop-blur-glass backdrop-saturate-glass',
              'shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] max-bs-md:p-4',
            )}
          >
            <h3 className="mb-7 font-heading text-[26px] tracking-[-0.03em] text-white max-bs-md:text-[22px]">
              {content.formHeading}
            </h3>
            <ContactInquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
