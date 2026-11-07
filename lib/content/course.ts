import type { Chapter } from '../types';
import { FOUNDATIONS } from './chapters/foundations';
import { GRAPE_CHAPTERS } from './chapters/grapes';
import { FRANCE } from './chapters/france';
import { NEW_ZEALAND } from './chapters/newzealand';
import { WORLD } from './chapters/world';
import { MAKING } from './chapters/making';
import { TASTING } from './chapters/tasting';
import { PRACTICE } from './chapters/practice';
import { BODY } from './chapters/body';

/**
 * The assembled course, in reading order.
 *
 * Chapter files are kept separate (mostly one per part; body.ts belongs to
 * the practice part) so each stays editable on its own. This file is the
 * only place that knows about all of them, and the spread order below is
 * what scripts/reading-order.mjs reads as the reading order.
 */
export const CHAPTERS: Chapter[] = [
  ...FOUNDATIONS,
  ...GRAPE_CHAPTERS,
  ...TASTING,
  ...MAKING,
  ...FRANCE,
  ...NEW_ZEALAND,
  ...WORLD,
  ...PRACTICE,
  ...BODY,
];
/** Total number of chapters, used for progress display. */
export const CHAPTER_COUNT = CHAPTERS.length;

/** Every chapter belonging to one part, in order. */
export function chaptersInPart(partSlug: string): Chapter[] {
  return CHAPTERS.filter((m) => m.part === partSlug);
}

/** Look up a single chapter by slug. */
export function findChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((m) => m.slug === slug);
}

/**
 * The chapters immediately before and after a given one, for the
 * previous/next footer links. Either may be undefined at the ends.
 */
export function neighbours(slug: string): { prev?: Chapter; next?: Chapter } {
  const i = CHAPTERS.findIndex((m) => m.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? CHAPTERS[i - 1] : undefined,
    next: i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : undefined,
  };
}

