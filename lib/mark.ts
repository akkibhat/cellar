/**
 * The mark's geometry, in one place.
 *
 * Two components draw it: `Logo` renders it statically at every size in
 * the app, and `FrontDoor` animates it between the two states on the
 * landing page. They have to agree exactly, or the masthead would settle
 * on a mark subtly different from the one in the sidebar - so the shapes
 * live here and neither component owns them.
 *
 * Everything is expressed in the 120x160 viewBox.
 *
 * The two marks are the same arch:
 *
 *   the book   that arch split into halves that have swung apart
 *   the door   the arch whole, with bottles punched through
 *
 * which is why closing the book *is* the door, and why the morph needs
 * no path-matching - both halves keep identical path commands and only
 * their numbers move.
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
 * ratio, so one user unit is `size / 160` - not `size / 120`. An earlier
 * version of this note divided by the width and overstated every figure
 * below by a third.
 *
 * Corrected, the gaps either side of the spine are sub-pixel at every
 * size the app uses - 0.375px in both the compact and the full tier.
 * They are shading, not structure. What carries the split is the spine,
 * and in the micro tier the single wide gap left when the spine is
 * dropped. Each clears one rendered pixel at its tier's lower bound:
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
 * They live here for the same reason the paths do: `Logo` and
 * `FrontDoor` both build the lockup, and while FrontDoor carried its own
 * literals it drifted to 0.30 and 0.74 - a wordmark 5% small on the
 * largest surface in the app. Ratios rather than sizes, because a lockup
 * has to hold at every size the mark is used at.
 */
export const LOCKUP = {
  /** Gap between the mark and the word. */
  gap: 0.31,
  /** Wordmark font size. */
  word: 0.78,
  /**
   * How far to lift the mark so its ink sits level with the letterforms.
   *
   * Two separate offsets, both downward, which is why the mark read low
   * even after the first was corrected.
   *
   * The art sits at y=20 with a height of 130 in a 160-tall viewBox, so
   * there is twice as much air above it as below, and centring the box
   * leaves the ink five units low: 5/160, or 0.031 of the mark.
   *
   * Then the word. "Cellarbook" and "Cellardoor" have ascenders and no
   * descender to speak of - measured, 29 units of ink above the baseline
   * and 1 below - so the visible letters sit high in a line box that
   * reserves descender space anyway. At line-height 1 the letterform
   * centre lands 0.042 of the font size above the box centre, which is
   * 0.033 of the mark once LOCKUP.word is applied.
   *
   * Both are proportional, so one constant holds at every size.
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
 */
export function coverPath(t: Tier): string {
  return `M15,150 V65 A45,45 0 0 1 ${t.coverTo},20.4 V143 Z`;
}

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

/* ===================================================================== *
 * The morph
 * ===================================================================== */

/**
 * Every state the mark can be in, as numbers.
 *
 * Both halves are rebuilt from these on each frame. Because the path
 * commands are identical in both states there is nothing to match up -
 * it is arithmetic:
 *
 *   cover   M15,150  V cy  A cr,cr 0 0 1  cx,cty  V cbot Z
 *   page    M105,150 V py  A pr,pr 0 0 0  px,pty  V 150  Z
 *
 * In the book the halves have swung apart: the cover stops short at
 * x=56 and the page springs from a shallower arc, leaving a gap down the
 * middle. In the door they meet at the apex (60,20) on one shared
 * radius, which closes the book into a single arch.
 */
export type MarkState = {
  cy: number; cr: number; cx: number; cty: number; cbot: number;
  py: number; pr: number; px: number; pty: number;
  /** Spine opacity: present in the book, gone once the book is shut. */
  spine: number;
  /** Bottle-hole opacity: absent in the book, punched through in the door. */
  holes: number;
};

/** Matches the `full` tier exactly, so the morph settles on the real mark. */
export const BOOK_STATE: MarkState = {
  cy: 65, cr: 45, cx: 56, cty: 20.4, cbot: 143,
  py: 72, pr: 38, px: 64, pty: 34,
  spine: 1, holes: 0,
};

export const DOOR_STATE: MarkState = {
  cy: 65, cr: 45, cx: 60, cty: 20, cbot: 150,
  py: 65, pr: 45, px: 60, pty: 20,
  spine: 0, holes: 1,
};

/** Build both halves from an interpolated state. */
export function pathsFor(s: MarkState): { cover: string; page: string } {
  return {
    cover: `M15,150 V${s.cy} A${s.cr},${s.cr} 0 0 1 ${s.cx},${s.cty} V${s.cbot} Z`,
    page: `M105,150 V${s.py} A${s.pr},${s.pr} 0 0 0 ${s.px},${s.pty} V150 Z`,
  };
}

/**
 * Interpolate the whole state.
 *
 * Eased cubic-out: quick to leave, slow to arrive, so the book looks
 * like it is settling shut rather than being snapped.
 */
export function interpolate(t: number): MarkState {
  const e = 1 - Math.pow(1 - t, 3);
  const out = {} as MarkState;
  (Object.keys(BOOK_STATE) as (keyof MarkState)[]).forEach((k) => {
    /* Rounded, because Math results differ in the last bits between Node
       and the browser and an unrounded path string would produce a
       hydration mismatch on the server-rendered first frame. */
    out[k] = Math.round((BOOK_STATE[k] + (DOOR_STATE[k] - BOOK_STATE[k]) * e) * 1000) / 1000;
  });
  return out;
}
