import { SERVICE_ACCENT_CLASSES } from '@/lib/service-accents';
import { cn } from '@/lib/utils';
import type { ServiceAccent } from '@/types/service-detail';

/** Widths of the mock interface rows, as percentages of the screen. */
const MOCK_ROW_WIDTHS = ['w-[86%]', 'w-[64%]', 'w-[74%]', 'w-[52%]'] as const;

export interface ServiceShowcaseProps {
  /** Accent theme for the ring and screen. */
  readonly accent: ServiceAccent;
}

/**
 * The rotating showcase beneath the overview statement.
 *
 * An original device mock drawn in CSS — a rounded frame, a tinted screen and
 * four suggestion rows — sitting inside a dashed ring that turns once every 28
 * seconds. No artwork is fetched, so the section costs nothing on the network
 * and stays sharp at any pixel density.
 *
 * The ring's rotation is applied to a wrapper that contains only the ring, not
 * the device, so the frame stays upright while the ring drifts around it. The
 * alternative — rotating the whole group and counter-rotating the contents —
 * compounds two transforms every frame for the same visual result.
 *
 * Entirely decorative: `aria-hidden`, and the surrounding section's heading
 * already carries the meaning. Under reduced motion the ring simply stops.
 *
 * @param props - See {@link ServiceShowcaseProps}.
 */
export function ServiceShowcase({ accent }: ServiceShowcaseProps) {
  const accentClasses = SERVICE_ACCENT_CLASSES[accent];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-20 flex h-[420px] w-full max-w-[520px] items-center justify-center max-bs-md:mt-14 max-bs-md:h-[340px]"
    >
      {/* Accent wash behind the whole group. */}
      <span
        className={cn(
          'pointer-events-none absolute size-[380px] rounded-full opacity-70 max-bs-md:size-[280px]',
          accentClasses.bloom,
        )}
      />

      {/* The orbiting ring. */}
      <span
        className={cn(
          'pointer-events-none absolute size-[400px] rounded-full max-bs-md:size-[300px]',
          'border border-dashed border-white/[0.14]',
          'animate-svc-orbit motion-reduce:animate-none',
        )}
      >
        {/* A single bead on the ring, so the rotation is actually perceivable —
            a plain dashed circle turning looks static. */}
        <span
          className={cn(
            'absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full',
            accentClasses.dot,
          )}
        />
      </span>

      {/* Device frame. */}
      <span
        className={cn(
          'relative flex h-[300px] w-[152px] flex-col rounded-[26px] border border-white/[0.12]',
          'bg-svc-card p-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]',
          'max-bs-md:h-[240px] max-bs-md:w-[122px]',
        )}
      >
        {/* Speaker notch. */}
        <span className="mx-auto mb-2 h-1 w-9 rounded-full bg-white/20" />

        <span
          className={cn(
            'flex flex-1 flex-col gap-2.5 rounded-[18px] bg-svc-well p-3',
            'bg-gradient-to-b from-white/[0.06] to-transparent',
          )}
        >
          {/* Header block, in the accent. */}
          <span className={cn('block h-8 w-full rounded-lg opacity-90', accentClasses.dot)} />

          {MOCK_ROW_WIDTHS.map((width) => (
            <span key={width} className={cn('block h-2.5 rounded-full bg-white/15', width)} />
          ))}

          <span className="mt-auto block h-7 w-full rounded-lg border border-white/15 bg-white/[0.06]" />
        </span>
      </span>
    </div>
  );
}
