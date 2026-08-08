'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

/**
 * How far ahead of the viewport to start fetching the form's chunk. One
 * screen-height of lead time means the real form is almost always mounted before
 * the visitor can reach it, so the skeleton is rarely seen.
 */
const FORM_PREFETCH_MARGIN = '600px';

/**
 * The form is code-split and never server-rendered.
 *
 * React Hook Form, its Zod resolver, and the schema together are the single
 * largest client dependency on the page, and they exist for one section that
 * most visitors never scroll to. `ssr: false` keeps them out of the initial
 * payload entirely.
 *
 * A form carries no SEO value — there is no content here for a crawler to
 * index — so dropping it from the server-rendered HTML costs nothing, unlike the
 * testimonials, which stay server-rendered precisely because their text matters.
 */
const ContactForm = dynamic(
  () => import('@/components/sections/contact/contact-form').then((m) => m.ContactForm),
  { ssr: false, loading: () => <ContactFormSkeleton /> },
);

/**
 * Placeholder occupying the form's footprint.
 *
 * Sized to match the real card so the swap causes no layout shift: same padding,
 * same radius, same control heights, same two-column grid.
 */
function ContactFormSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-1 gap-5 bs-md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-[60px] animate-pulse rounded-[5px] bg-white/[0.06]" />
        ))}
        <div className="h-[60px] animate-pulse rounded-[5px] bg-white/[0.06] bs-md:col-span-2" />
        <div className="h-[120px] animate-pulse rounded-[5px] bg-white/[0.06] bs-md:col-span-2" />
        <div className="mt-[15px] h-[52px] animate-pulse rounded-cta bg-white/10 bs-md:col-span-2" />
      </div>
    </div>
  );
}

/**
 * Mounts the enquiry form once it approaches the viewport.
 *
 * Two-stage deferral: `next/dynamic` splits the code out of the initial bundle,
 * and this observer decides *when* to fetch that chunk. Without the observer the
 * chunk would still download during hydration, which defeats most of the point.
 */
export function ContactFormLoader() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: FORM_PREFETCH_MARGIN });

  return <div ref={ref}>{inView ? <ContactForm /> : <ContactFormSkeleton />}</div>;
}
