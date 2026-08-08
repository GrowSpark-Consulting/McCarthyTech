'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { AgencyButton } from '@/components/ui/agency-button';
import { jobListings, type JobListing } from '@/lib/careers-page';
import { cn } from '@/lib/utils';

type FilterType = 'All' | 'Technical' | 'Design' | 'Marketing';

export function OpenPositions() {
  const [filter, setFilter] = useState<FilterType>('All');

  const filterButtons: readonly { label: FilterType; dataFilter: string }[] = [
    { label: 'All', dataFilter: '*' },
    { label: 'Technical', dataFilter: '.cat1' },
    { label: 'Design', dataFilter: '.cat2' },
    { label: 'Marketing', dataFilter: '.cat3' },
  ];

  const filteredJobs = jobListings.filter((job) => {
    if (filter === 'All') return true;
    return job.department === filter;
  });

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-[120px] max-bs-md:py-[80px]"
      style={{ backgroundImage: "url('/assets/img/bg/job-bg.png')" }}
    >
      <Container>
        {/* Title */}
        <div className="mb-[40px] text-center">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[2px] text-mint">
            Open Positions
          </span>
          <h2 className="max-bs-xs:text-[25px] m-0 inline-flex items-center justify-center gap-3 font-heading text-[45px] font-bold leading-[1.3] tracking-[-0.05em] text-white max-bs-md:text-[33px]">
            Be part of{' '}
            <span className="inline-flex items-center">
              <Image
                src="/assets/img/icon/diamond-icon02.gif"
                alt="diamond icon"
                width={30}
                height={30}
                className="size-[30px]"
                unoptimized
              />
            </span>{' '}
            the team
          </h2>
        </div>

        {/* Filters Menu */}
        <div className="mb-12 flex flex-wrap justify-center gap-3.5">
          {filterButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => setFilter(btn.label)}
              className={cn(
                'select-none rounded-cta border px-6 py-2.5 text-xs font-semibold uppercase tracking-[1px] transition-all duration-300',
                filter === btn.label
                  ? 'border-mint bg-mint text-ink shadow-[0_0_15px_rgba(0,255,151,0.25)]'
                  : 'border-white/[0.08] bg-transparent text-white hover:border-mint/50 hover:text-mint',
              )}
            >
              {btn.label === 'All' ? 'View all' : btn.label}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <motion.div
          layout
          className="grid grid-cols-3 gap-6 max-bs-lg:grid-cols-2 max-bs-md:grid-cols-1"
        >
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job: JobListing) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={job.id}
                className={cn(
                  'flex flex-col justify-between rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-8',
                  'transition-all duration-300 hover:border-mint/30 hover:bg-white/[0.04]',
                )}
              >
                <div>
                  <h3 className="max-bs-xs:text-xl mb-4 font-heading text-2xl font-bold text-white transition-colors duration-300 hover:text-mint">
                    <a href={`/careers/${job.slug}`}>{job.title}</a>
                  </h3>
                  <ul className="mb-8 flex list-none flex-wrap items-center gap-5 p-0 text-sm text-subtle">
                    <li className="flex items-center gap-1.5">
                      <Image
                        src="/assets/img/icon/location-icon02.svg"
                        alt="Location"
                        width={14}
                        height={14}
                        className="opacity-80"
                      />
                      {job.location}
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Image
                        src="/assets/img/icon/clock-icon.svg"
                        alt="Clock"
                        width={14}
                        height={14}
                        className="opacity-80"
                      />
                      {job.type}
                    </li>
                  </ul>
                </div>

                <div>
                  <AgencyButton
                    href={`/careers/${job.slug}`}
                    label="view job"
                    size="compact"
                    className="w-fit"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
