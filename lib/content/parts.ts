import type { Part } from '../types';

/**
 * The eight parts of the course, in reading order.
 *
 * Foundations, grapes, tasting and winemaking come first. Then two deep
 * regional parts, France and New Zealand, because those are the two places
 * worth knowing properly, and one part for the rest of the wine world.
 * In practice comes last, and its closing chapters (lib/content/chapters/
 * body.ts) cover what alcohol actually does to a body.
 *
 * scripts/reading-order.mjs reads this array to number and export parts.
 */
export const PARTS: Part[] = [
  {
    numeral: 'I',
    slug: 'foundations',
    title: 'Foundations',
    blurb:
      'What wine is, what the styles are, and where wine sits among everything else people drink.',
  },
  {
    numeral: 'II',
    slug: 'grapes',
    title: 'The grapes',
    blurb:
      'Two dozen varieties worth knowing, and how to read a grape you have never met from its structure alone.',
  },
  {
    numeral: 'III',
    slug: 'tasting',
    title: 'Tasting',
    blurb:
      'How to taste the same way twice, how to describe what you find, and how to tell a wine you dislike from a broken one.',
  },
  {
    numeral: 'IV',
    slug: 'making',
    title: 'How wine is made',
    blurb:
      'Fermentation, the decisions around it, and where bubbles, sweetness and oak actually come from.',
  },
  {
    numeral: 'V',
    slug: 'france',
    title: 'France',
    blurb:
      'The country that decided wine should be named after places rather than grapes, and the five regions that argue the case.',
  },
  {
    numeral: 'VI',
    slug: 'new-zealand',
    title: 'New Zealand',
    blurb:
      'A wine industry younger than most of the vines in Bordeaux, and how it got good so quickly.',
  },
  {
    numeral: 'VII',
    slug: 'world',
    title: 'The wider world',
    blurb:
      'Nine countries in one chapter, at the length I can honestly write about them.',
  },
  {
    numeral: 'VIII',
    slug: 'practice',
    title: 'In practice',
    blurb:
      'Serving, pairing, reading a label, and buying wine without being talked into anything.',
  },
];

/** Look up a part by slug. */
export function findPart(slug: string): Part | undefined {
  return PARTS.find((p) => p.slug === slug);
}
