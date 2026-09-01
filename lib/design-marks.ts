/**
 * The marks that were drawn and not chosen.
 *
 * Lifted out of the exploration documents rather than screenshotted, so the
 * record can draw them at any size - which matters, because the size is what
 * decided most of them. Every one is on the same 120x160 viewBox the shipped
 * mark uses, so the comparison is honest.
 *
 * Colours are the literal hexes they were drawn in, not tokens: these were
 * made against paper, and remapping them to follow the theme inverted the
 * light shapes into the dark ground and lost them.
 *
 * `clip` is the arch several of them fill against - without it the fill
 * spills past the shape it is supposed to be inside.
 *
 * GENERATED from the working documents in _previews/, which are git-ignored.
 * This is the part of them worth keeping.
 */

export type Shape = {
  tag: 'path' | 'rect' | 'circle' | 'ellipse';
  d?: string;
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  cx?: string;
  cy?: string;
  r?: string;
  rx?: string;
  ry?: string;
  fill?: string;
  opacity?: string;
  /** Clipped to the mark's `clip` path. */
  clip?: boolean;
};

export type Mark = { label: string; shapes: Shape[]; clip?: string };

/** Round one: nine ideas, all on one arch so they read as a family. */
export const NINE: Mark[] = [
  {"label": "1 - The vault", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#efeae0"}, {"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "2 - Bottles in the doorway", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M25,150 V65 A35,35 0 0 1 95,65 V150 Z", "fill": "#b3823a"}, {"tag": "path", "d": "M36,150 V102 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M53,150 V96 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M70,150 V102 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}]} as Mark,
  {"label": "3 - Arch as C", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z M25,140 V65 A35,35 0 0 1 95,65 V140 Z", "fill": "#22262b"}, {"tag": "rect", "x": "66", "y": "86", "width": "46", "height": "34", "fill": "#efeae0"}, {"tag": "rect", "x": "66", "y": "92", "width": "34", "height": "22", "fill": "#b3823a"}]} as Mark,
  {"label": "4 - The book", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 57,20.2 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M105,150 V65 A45,45 0 0 0 63,20.2 V150 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "5 - Keystone", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M52,20.6 h16 l7,30 h-30 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "6 - Bin rack", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M60,58 l20,20 -20,20 -20,-20 Z", "fill": "#b3823a", "clip": true}, {"tag": "path", "d": "M60,102 l20,20 -20,20 -20,-20 Z", "fill": "#b3823a", "clip": true}, {"tag": "path", "d": "M38,80 l20,20 -20,20 -20,-20 Z", "fill": "#b3823a", "clip": true}, {"tag": "path", "d": "M82,80 l20,20 -20,20 -20,-20 Z", "fill": "#b3823a", "clip": true}], "clip": "M25,150 V65 A35,35 0 0 1 95,65 V150 Z"} as Mark,
  {"label": "7 - Filled to a level", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "rect", "x": "20", "y": "30", "width": "80", "height": "70", "fill": "#efeae0", "clip": true}, {"tag": "rect", "x": "20", "y": "100", "width": "80", "height": "55", "fill": "#b3823a", "clip": true}], "clip": "M25,150 V65 A35,35 0 0 1 95,65 V150 Z"} as Mark,
  {"label": "8 - The drop", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M60,52 c14,22 20,32 20,42 a20,20 0 0 1 -40,0 c0,-10 6,-20 20,-42 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "9 - Light only", "shapes": [{"tag": "path", "d": "M68,10 H120 V150 H55 Z", "fill": "#b3823a", "clip": true}, {"tag": "path", "d": "M0,146 H120 V160 H0 Z", "fill": "#b3823a", "clip": true}], "clip": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z"} as Mark,
];

/** Round two: three refinements of each survivor. 2b and 4b shipped. */
export const REFINEMENTS: Mark[] = [
  {"label": "2a - three, as drawn", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M25,150 V65 A35,35 0 0 1 95,65 V150 Z", "fill": "#b3823a"}, {"tag": "path", "d": "M36,150 V102 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M53,150 V96 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M70,150 V102 q0,-7 4,-10 v-11 h5 v11 q4,3 4,10 V150 Z", "fill": "#22262b"}]} as Mark,
  {"label": "2b - two, fatter", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M25,150 V65 A35,35 0 0 1 95,65 V150 Z", "fill": "#b3823a"}, {"tag": "path", "d": "M40,150 V100 q0,-9 6,-13 v-13 h7 v13 q6,4 6,13 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M65,150 V100 q0,-9 6,-13 v-13 h7 v13 q6,4 6,13 V150 Z", "fill": "#22262b"}]} as Mark,
  {"label": "2c - inverted", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M40,150 V100 q0,-9 6,-13 v-13 h7 v13 q6,4 6,13 V150 Z", "fill": "#b3823a"}, {"tag": "path", "d": "M65,150 V100 q0,-9 6,-13 v-13 h7 v13 q6,4 6,13 V150 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "4a - as drawn", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 57,20.2 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M105,150 V65 A45,45 0 0 0 63,20.2 V150 Z", "fill": "#b3823a"}]} as Mark,
  {"label": "4b - spine and uneven pages", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 56,20.4 V143 Z", "fill": "#22262b"}, {"tag": "path", "d": "M105,150 V72 A38,38 0 0 0 64,34 V150 Z", "fill": "#b3823a"}, {"tag": "rect", "x": "57.5", "y": "30", "width": "5", "height": "120", "fill": "#22262b"}]} as Mark,
  {"label": "4c - book inside the arch", "shapes": [{"tag": "path", "d": "M15,150 V65 A45,45 0 0 1 105,65 V150 Z", "fill": "#22262b"}, {"tag": "path", "d": "M60,96 c-9,-7 -20,-9 -32,-8 v44 c12,-1 23,1 32,8 Z", "fill": "#b3823a"}, {"tag": "path", "d": "M60,96 c9,-7 20,-9 32,-8 v44 c-12,-1 -23,1 -32,8 Z", "fill": "#b3823a"}, {"tag": "rect", "x": "58.5", "y": "94", "width": "3", "height": "52", "fill": "#22262b"}]} as Mark,
];
