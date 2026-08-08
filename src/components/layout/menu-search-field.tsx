'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { z } from 'zod';

import { cn } from '@/lib/utils';

/**
 * Search input schema.
 *
 * Trimmed on parse so a whitespace-only query is treated as empty and clears the
 * filter rather than matching nothing.
 */
const searchSchema = z.object({
  query: z.string().trim().max(64, 'Keep your search under 64 characters.'),
});

/** Validated shape of the drawer search form. */
export type MenuSearchValues = z.infer<typeof searchSchema>;

export interface MenuSearchFieldProps {
  /** Receives the trimmed query on every keystroke. */
  readonly onQueryChange: (query: string) => void;
}

/**
 * The drawer's search field.
 *
 * Filters the drawer's own menu live as you type. The reference ships this input
 * wired to `action="#"`, so it does nothing there; rather than reproduce dead
 * markup — or point it at a results route that does not exist yet — it is
 * implemented as a client-side filter over the menu already on screen. Same
 * position, same styling, but it actually does something.
 *
 * Built on React Hook Form with a Zod resolver so the length bound is declared
 * once and enforced on both the value and the error message. Submission is
 * suppressed because filtering happens on change.
 *
 * @param props - See {@link MenuSearchFieldProps}.
 */
export function MenuSearchField({ onQueryChange }: MenuSearchFieldProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuSearchValues>({
    resolver: zodResolver(searchSchema),
    mode: 'onChange',
    defaultValues: { query: '' },
  });

  const query = watch('query');

  useEffect(() => {
    onQueryChange(query.trim().toLowerCase());
  }, [query, onQueryChange]);

  return (
    <div className="mb-5">
      <form role="search" onSubmit={handleSubmit(() => undefined)} className="relative">
        <label htmlFor="menu-search" className="sr-only">
          Filter navigation
        </label>
        <input
          id="menu-search"
          type="search"
          placeholder="Search..."
          autoComplete="off"
          aria-describedby={errors.query ? 'menu-search-error' : undefined}
          aria-invalid={errors.query ? true : undefined}
          {...register('query')}
          className={cn(
            'h-[50px] w-full rounded border-2 border-white/10 bg-transparent',
            'py-3 pl-[15px] pr-[35px] text-base text-white placeholder:text-white/40',
            'transition-colors duration-300 ease-out focus:border-lime focus:outline-none',
          )}
        />
        <button
          type="submit"
          aria-label="Search"
          className={cn(
            'absolute right-[10px] top-[5px] flex h-10 w-[30px] items-center justify-center',
            'rounded-none border-0 bg-transparent p-0 text-lime',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime',
          )}
        >
          <Search size={16} aria-hidden="true" />
        </button>
      </form>

      {errors.query ? (
        <p id="menu-search-error" role="alert" className="mt-2 text-sm text-lime">
          {errors.query.message}
        </p>
      ) : null}
    </div>
  );
}
