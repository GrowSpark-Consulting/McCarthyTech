import Image from 'next/image';

import { featuresContent } from '@/lib/features';
import { cn } from '@/lib/utils';

/** Native size of each dashed ring, and its responsive step-downs. */
const RING_SIZE_CLASS = cn(
  'h-[235px] w-[391px]',
  'max-bs-xl:h-[212px] max-bs-xl:w-[315px]',
  'max-lg:h-[207px] max-lg:w-[295px]',
  'max-bs-lg:h-[215px] max-bs-lg:w-[330px]',
);

/**
 * The centre ornament: three dashed elliptical rings stacked into a perspective
 * tunnel, with a gradient sphere sitting behind them.
 *
 * The rings overlap by 117px (`li:not(:first-child) { margin-top: -117px }`),
 * which is what turns three flat ellipses into something that reads as
 * receding depth.
 *
 * Each ring is a standalone SVG rather than inline markup — the three paths
 * total roughly 48,000 characters, and inlining them would put that in the JS
 * payload of every visitor. As separate files they are cached, served in
 * parallel, and never parsed by React. Their dash animation is defined *inside*
 * each file, because page CSS cannot style the contents of an `<img>`.
 *
 * Entirely decorative, so the whole block is hidden from assistive technology.
 */
export function FeatureOrbit() {
  return (
    <div
      aria-hidden="true"
      className="relative text-center max-bs-lg:mx-auto max-bs-lg:mt-[30px] max-bs-lg:max-w-[330px]"
    >
      <ul className="list-none p-0">
        {featuresContent.orbitRings.map((ringSrc, index) => (
          <li key={ringSrc} className={cn(index > 0 && 'mt-[-117px]')}>
            <Image
              src={ringSrc}
              alt=""
              width={391}
              height={235}
              // Standalone SVGs are already minimal; the optimiser would strip
              // the embedded <style> that drives the dash animation.
              unoptimized
              className={cn('mx-auto', RING_SIZE_CLASS)}
            />
          </li>
        ))}
      </ul>

      <span
        className={cn(
          'absolute left-0 top-px -z-10 block size-full',
          'max-bs-xl:top-3 max-lg:top-4 max-bs-lg:top-2',
        )}
      >
        <Image
          src={featuresContent.orbitImage.src}
          alt={featuresContent.orbitImage.alt}
          width={featuresContent.orbitImage.width}
          height={featuresContent.orbitImage.height}
          sizes="(max-width: 991px) 330px, 391px"
          className="mx-auto h-full w-auto object-contain"
        />
      </span>
    </div>
  );
}
