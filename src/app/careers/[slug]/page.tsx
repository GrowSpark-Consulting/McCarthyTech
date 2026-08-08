import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { BreadcrumbTrail } from '@/components/ui/breadcrumb-trail';
import { JobApplicationForm } from '@/components/sections/careers-page/job-application-form';
import { jobListings, commonBenefits } from '@/lib/careers-page';
import { cn } from '@/lib/utils';

interface JobDetailPageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return jobListings.map((job) => ({ slug: job.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobListings.find((j) => j.slug === slug);

  if (job === undefined) return {};

  const path = `/careers/${job.slug}`;

  return {
    title: `${job.title} — Careers at Grow Spark`,
    description: job.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${job.title} — Careers at Grow Spark`,
      description: job.description,
      url: path,
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = jobListings.find((j) => j.slug === slug);

  if (job === undefined) notFound();

  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: 'Careers', href: '/careers' },
    { label: job.title, href: `/careers/${job.slug}` },
  ] as const;

  return (
    <>
      {/* Hero Header */}
      <section
        className={cn(
          'relative bg-cover bg-center bg-no-repeat',
          'pb-[80px] pt-[180px]',
          'max-bs-lg:pt-[150px] max-bs-md:pt-[120px]',
        )}
        style={{ backgroundImage: "url('/assets/img/bg/bootcamp-bg.png')" }}
      >
        <Container>
          <div className="mb-5">
            <BreadcrumbTrail items={breadcrumb} />
          </div>
          <h1
            className={cn(
              'm-0 mb-6 font-heading text-[48px] font-bold leading-[1.2] text-white',
              'max-bs-lg:text-[38px] max-bs-md:text-[28px]',
            )}
          >
            {job.title}
          </h1>

          {/* Job Badges */}
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="rounded-cta border border-mint/20 bg-mint/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-mint">
              {job.department}
            </span>
            <span className="flex items-center gap-1.5 rounded-cta border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/90">
              <Image
                src="/assets/img/icon/location-icon02.svg"
                alt="Location"
                width={12}
                height={12}
                className="opacity-80"
              />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 rounded-cta border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/90">
              <Image
                src="/assets/img/icon/clock-icon.svg"
                alt="Type"
                width={12}
                height={12}
                className="opacity-80"
              />
              {job.type}
            </span>
            <span className="rounded-cta border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/90">
              {job.details.salaryRange}
            </span>
          </div>
        </Container>
      </section>

      {/* Details Grid */}
      <section className="bg-ink py-[120px] max-bs-md:py-[80px]">
        <Container>
          <div className="grid grid-cols-3 gap-12 max-bs-lg:grid-cols-1 max-bs-lg:gap-12">
            {/* Left Side: Descriptions */}
            <div className="col-span-2 max-bs-lg:col-span-1">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="mb-4 font-heading text-2xl font-bold text-white">Job Description</h2>
                <p className="text-lg leading-[1.8] text-subtle max-bs-md:text-base">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-12">
                <h2 className="mb-5 font-heading text-2xl font-bold text-white">
                  Key Responsibilities
                </h2>
                <ul className="flex list-none flex-col gap-4 p-0">
                  {job.details.responsibilities.map((resp, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-base leading-[1.7] text-subtle"
                    >
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-mint shadow-[0_0_8px_rgba(0,255,151,0.5)]" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-12">
                <h2 className="mb-5 font-heading text-2xl font-bold text-white">
                  Requirements & Qualifications
                </h2>
                <ul className="flex list-none flex-col gap-4 p-0">
                  {job.details.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-base leading-[1.7] text-subtle"
                    >
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-mint shadow-[0_0_8px_rgba(0,255,151,0.5)]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="mb-5 font-heading text-2xl font-bold text-white">
                  What We Offer / Benefits
                </h2>
                <ul className="flex list-none flex-col gap-4 p-0">
                  {commonBenefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-base leading-[1.7] text-subtle"
                    >
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-mint shadow-[0_0_8px_rgba(0,255,151,0.5)]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side: Apply Form */}
            <div className="col-span-1">
              <div className="sticky top-[100px] max-bs-lg:relative max-bs-lg:top-0">
                <JobApplicationForm jobTitle={job.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
