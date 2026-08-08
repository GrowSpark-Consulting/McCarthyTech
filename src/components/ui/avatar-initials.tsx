import { cn } from '@/lib/utils';

/** Palette the generated monograms cycle through, drawn from the site's accents. */
const AVATAR_TINTS = [
  'bg-[radial-gradient(circle_at_30%_25%,#2c32fe_0%,#00020f_75%)]',
  'bg-[radial-gradient(circle_at_30%_25%,#00a4af_0%,#00020f_75%)]',
  'bg-[radial-gradient(circle_at_30%_25%,#00ff97_0%,#00020f_75%)]',
] as const;

/**
 * Derives up to two initials from a display name.
 *
 * Takes the first letter of the first and last word, so "Hyfa Muhammed Sha"
 * reads "HS" rather than "HM" — the surname is the more identifying half.
 *
 * @param name - The reviewer's display name.
 */
function toInitials(name: string): string {
  const words = name
    .split(/[\s.]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0);

  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';

  return `${first}${last}`.toUpperCase();
}

/**
 * Picks a stable tint for a name.
 *
 * Hashing the name (rather than using the list index) means a reviewer keeps the
 * same colour if the list is reordered or filtered.
 */
function tintForName(name: string): string {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_TINTS[hash % AVATAR_TINTS.length] ?? AVATAR_TINTS[0];
}

export interface AvatarInitialsProps {
  /** Name to derive the monogram from. */
  readonly name: string;
  /** Extra classes — pass a `size-*` utility to change the diameter. */
  readonly className?: string;
}

/**
 * A generated monogram avatar.
 *
 * Stands in for the reference's reviewer photos, which 404 on the live site.
 * Generating a monogram from the name is preferable to sourcing stock
 * portraits: it never misrepresents a real person's likeness, needs no asset
 * pipeline, and cannot break.
 *
 * Marked `aria-hidden` — the reviewer's name is already rendered beside it.
 *
 * @param props - See {@link AvatarInitialsProps}.
 */
export function AvatarInitials({ name, className }: AvatarInitialsProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full',
        'border border-white/15 font-heading text-lg text-white',
        tintForName(name),
        className,
      )}
    >
      {toInitials(name)}
    </span>
  );
}
