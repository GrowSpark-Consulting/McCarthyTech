'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

/**
 * Opacity a word sits at before the reveal reaches it.
 *
 * Low enough to read as unlit, high enough that the full sentence is still
 * legible if a visitor lands mid-section and never scrolls — the effect should
 * decorate the copy, not withhold it.
 */
const DIM_OPACITY = 0.18;

/**
 * Scroll window the reveal is scrubbed across.
 *
 * Starts when the heading's top edge reaches 85% of the viewport height and
 * completes once it has risen to 45%, so the sentence finishes lighting well
 * before it leaves the reader's eye line rather than at the top of the screen.
 */
const SCROLL_OFFSET = ['start 0.85', 'start 0.45'] as const;

/**
 * How much of the travel one word occupies.
 *
 * Each word's fade overlaps its neighbours, which is what makes the sweep read
 * as a wash moving through the line instead of words switching on one at a time.
 */
const WORD_SPAN = 1.6;

interface RevealWordProps {
  readonly word: string;
  readonly index: number;
  readonly total: number;
  readonly progress: MotionValue<number>;
}

/**
 * One word, lit as the sweep passes it.
 *
 * Rendered as an `inline` span rather than `inline-block`: only `opacity`
 * changes, and leaving the element inline means the browser breaks lines exactly
 * where it would have without the split. An `inline-block` per word would make
 * each one an unbreakable atom and quietly change the ragged edge.
 */
function RevealWord({ word, index, total, progress }: RevealWordProps) {
  const start = index / total;
  const end = Math.min(1, start + WORD_SPAN / total);
  const opacity = useTransform(progress, [start, end], [DIM_OPACITY, 1]);

  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

export interface TextRevealProps {
  /** The sentence to reveal. Plain text — the component owns the word split. */
  readonly children: string;
  /** Element to render. Defaults to `h2`. */
  readonly as?: 'h2' | 'h3' | 'p';
  /** DOM id, so a section can label itself with this heading. */
  readonly id?: string;
  readonly className?: string;
}

/**
 * `.xb-text-reveal` — a sentence that lights word by word as it scrolls up.
 *
 * **On fidelity.** The reference drives this from its own JavaScript bundle,
 * which is not among the extracted assets — the capture covers HTML, CSS, fonts
 * and images, and the class carries no CSS at all. The behaviour here is the
 * standard scrubbed word-opacity reveal that class name denotes, rebuilt from
 * the site's existing motion vocabulary. It is the one part of this band that is
 * an informed reconstruction rather than a transcription, and it is worth
 * replacing if the original script ever turns up.
 *
 * Only `opacity` animates, so the whole sweep stays on the compositor. Words are
 * split on whitespace and re-joined with real space text nodes, so the element's
 * text content is byte-identical to the sentence passed in — the accessible name,
 * `innerText`, and anything a crawler reads are all unaffected by the split.
 *
 * Under reduced motion the sentence renders as one unsplit, fully-lit text node
 * with no scroll listener attached at all.
 *
 * @param props - See {@link TextRevealProps}.
 */
export function TextReveal({ children, as: Tag = 'h2', id, className }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSET as unknown as ['start end', 'start start'],
  });

  const words = children.split(' ');

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag id={id} ref={ref} className={cn(className, 'motion-reduce:[&>span]:!opacity-100')}>
      {words.map((word, index) => (
        <RevealWord
          // Words repeat within a sentence, so the word alone is not a key.
          key={`${word}-${index}`}
          word={index === words.length - 1 ? word : `${word} `}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </Tag>
  );
}
