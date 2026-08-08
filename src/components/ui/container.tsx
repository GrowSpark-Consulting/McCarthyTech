import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Horizontal layout container.
 *
 * Two widths exist in the reference and both are reproduced exactly:
 *
 * - `grid` mirrors Bootstrap 5's `.container`: fluid below 576px, then stepping
 *   through fixed max-widths at each breakpoint. The hero uses this, which is
 *   why its copy stays optically aligned with the sections beneath it.
 * - `shell` mirrors `.container.mxw-1650`: fluid up to a single 1650px ceiling.
 *   The header and mega-menu use this to span the full viewport width.
 * - `fluid` mirrors Bootstrap's `.container-fluid`: no ceiling at all, just the
 *   gutter. The service heroes use this and impose their own `max-width` on the
 *   content inside, which is why adding a second one here would fight them.
 */
const containerStyles = cva('mx-auto w-full px-3', {
  variants: {
    width: {
      grid: 'bs-sm:max-w-[540px] bs-md:max-w-[720px] bs-lg:max-w-[960px] bs-xl:max-w-[1140px] bs-xxl:max-w-[1320px]',
      shell: 'max-w-shell',
      /** The base class already carries everything `.container-fluid` is. */
      fluid: '',
    },
  },
  defaultVariants: { width: 'grid' },
});

export interface ContainerProps
  extends VariantProps<typeof containerStyles>,
    React.HTMLAttributes<HTMLDivElement> {
  /** Element to render as, for correct sectioning semantics. Defaults to `div`. */
  readonly as?: 'div' | 'section' | 'header' | 'nav' | 'footer';
  readonly children: React.ReactNode;
}

/**
 * Centred, padded layout container.
 *
 * @param props - See {@link ContainerProps}.
 */
export function Container({
  as: Component = 'div',
  width,
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Component className={cn(containerStyles({ width }), className)} {...rest}>
      {children}
    </Component>
  );
}
