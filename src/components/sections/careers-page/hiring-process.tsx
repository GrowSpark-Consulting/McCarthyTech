'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { hiringSteps } from '@/lib/careers-page';
import { cn } from '@/lib/utils';

export function HiringProcess() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section className="bg-ink py-[140px] max-bs-md:py-[80px]">
      <Container>
        <div className="grid grid-cols-2 items-center gap-[60px] max-bs-lg:grid-cols-1 max-bs-lg:gap-12">
          {/* Left Column - Accordion */}
          <div>
            <div className="mb-[35px] text-left">
              <span className="mb-2.5 block text-sm font-semibold uppercase tracking-[2px] text-mint">
                Hiring Process
              </span>
              <h2 className="max-bs-xs:text-[25px] m-0 font-heading text-[45px] font-bold leading-[1.3] tracking-[-0.05em] text-white max-bs-md:text-[33px]">
                Our hiring process
              </h2>
            </div>

            <ul className="m-0 flex list-none flex-col p-0">
              {hiringSteps.map((step, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <li key={step.id} className="border-b border-white/[0.08]">
                    <button
                      onClick={() => setActiveIdx(isActive ? -1 : idx)}
                      className={cn(
                        'group flex w-full items-center justify-between py-6 text-left focus:outline-none',
                      )}
                      aria-expanded={isActive}
                      aria-controls={`step-content-${step.id}`}
                    >
                      <div className="flex items-center">
                        <span className="mr-5 font-heading text-lg font-bold leading-none text-mint">
                          {step.number}
                        </span>
                        <span
                          className={cn(
                            'font-heading text-xl font-medium text-white transition-colors duration-300',
                            'group-hover:text-mint',
                            isActive && 'text-mint',
                            'max-bs-xs:text-lg',
                          )}
                        >
                          _{step.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'size-5 text-subtle transition-transform duration-300',
                          isActive && 'rotate-180 text-mint',
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`step-content-${step.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="max-bs-xs:pl-8 pb-6 pl-10 pr-4 text-base leading-[1.7] text-subtle">
                            <p>{step.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className="mx-auto flex w-full max-w-[570px] justify-center lg:max-w-none">
            <div className="relative flex aspect-[570/450] w-full items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.04] bg-white/[0.02] p-4">
              <Image
                src="/assets/img/career/process-img.png"
                alt="Our hiring process graphic"
                width={570}
                height={450}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
