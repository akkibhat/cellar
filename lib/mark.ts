/**
 * The mark's geometry, in one place, so every drawing of it agrees.
 * `Logo` renders it at every size, and `CellarNav` borrows the lockup
 * ratios. Everything is expressed in the 120x160 viewBox.
 *
 * The two marks are the same arch:
 *
 *   the book   that arch split into halves that have swung apart
 *   the door   the arch whole, with bottles punched through
 *
 * so closing the book *is* the door. Both halves keep identical path
 * commands, which is what would let the two be animated into each other.
 */

/* ===================================================================== *
 * Size tiers
 * ===================================================================== */

/** Geometry for one size tier. */
export type Tier = {
  /** Right edge of the cover page. */
  coverTo: number;
  /** Left edge of the garnet page. */
  pageFrom: number;
  /** Spine width; 0 drops the spine entirely. */
  spine: number;
};

/**
 * What actually holds the split together, per tier.
 *
 * The mark is drawn with `height` set and its width left to the aspect
 * ratio, so one user unit is `size / 160`, not `size / 120`.
 *
 * The gaps either side of the spine are sub-pixel at every size (0.375px),
 * so they are shading, not structure. What carries the split is the spine,
 * or in the micro tier the single wide gap left when the spine is dropped.
 * Each clears one rendered pixel at its tier's lower bound:
 *
 *   micro    14-unit gap   @ 12px  =  1.05px   spine dropped
 *   compact   8-unit spine @ 20px  =  1.00px   gaps have gone sub-pixel
 *   full      5-unit spine @ 40px  =  1.25px
 */
export const TIERS: Record<'full' | 'compact' | 'micro', Tier> = {
  full: { coverTo: 56, pageFrom: 64, spine: 5 },
  compact: { coverTo: 53, pageFrom: 67, spine: 8 },
  micro: { coverTo: 52, pageFrom: 66, spine: 0 },
};

/** Pick a tier from the rendered height. */
export function tierFor(size: number): Tier {
  if (size < 20) return TIERS.micro;
  if (size < 40) return TIERS.compact;
  return TIERS.full;
}

/* ===================================================================== *
 * The lockup
 * ===================================================================== */

/**
 * The wordmark's proportions against the mark, as ratios of its rendered
 * height.
 *
 * They live here for the same reason the paths do: `Logo` and `CellarNav`
 * both build the lockup, and copied literals drift. Ratios rather than
 * sizes, because a lockup has to hold at every size the mark is used at.
 */
export const LOCKUP = {
  /** Gap between the mark and the word. */
  gap: 0.31,
  /** Wordmark font size. */
  word: 0.78,
  /**
   * How far to lift the mark so its ink sits level with the letterforms.
   * It is the sum of two downward offsets, both proportional, so one
   * constant holds at every size:
   *
   *   0.031  the art sits at y=20, height 130, in a 160-tall box, so
   *          centring the box leaves the ink 5/160 low.
   *   0.033  the words have ascenders but no descenders, so the letters
   *          sit 0.042 of the font size high in their line box (x 0.78).
   */
  lift: 0.064,
} as const;

/* ===================================================================== *
 * The book
 * ===================================================================== */

/**
 * The two halves. Their arcs have different radii and spring from
 * different heights, so the book sits slightly open rather than
 * symmetrical - that asymmetry is what stops it reading as a bisected
 * arch rather than a book.
 *
 * coverPath is the left half (the cover), cut off at the tier's `coverTo`.
 */
export function coverPath(t: Tier): string {
  return `M15,150 V65 A45,45 0 0 1 ${t.coverTo},20.4 V143 Z`;
}

/** The right half (the open page), starting at the tier's `pageFrom`. */
export function pagePath(t: Tier): string {
  return `M105,150 V72 A38,38 0 0 0 ${t.pageFrom},34 V150 Z`;
}

/* ===================================================================== *
 * The door
 * ===================================================================== */

/** The whole arch, undivided. */
export const ARCH = 'M15,150 V65 A45,45 0 0 1 105,65 V150 Z';

/**
 * One bottle silhouette, centred on `cx`, body `w` units wide.
 *
 * Proportions are fixed relative to the width, so a wider bottle is the
 * same bottle rather than a different one: the neck is 0.38 of the body,
 * the shoulder rises 13 units and the neck stands 13 above that.
 */
export function bottle(cx: number, w: number): string {
  const neck = w * 0.38;
  const nh = (w - neck) / 2;
  return `M${cx - w / 2},150 V100 q0,-9 ${nh},-13 v-13 h${neck} v13 q${nh},4 ${nh},13 V150 Z`;
}

/**
 * The bottles punched through the door, sized for the rendered height.
 *
 * They are identical rather than a Bordeaux beside an Alsace flute:
 * symmetry reads better, and it also removes the size problem, since two
 * distinct silhouettes stop being tellable apart below about 28px. Only
 * the width changes by tier, so nothing here is fragile.
 */
export function doorHoles(size: number): string {
  if (size < 24) return bottle(60, 30);
  const w = size < 40 ? 23 : 20;
  return `${bottle(49.5, w)} ${bottle(74.5, w)}`;
}
