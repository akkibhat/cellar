/**
 * The two colours each part of the book opens in.
 *
 * Every chapter opens on a field of flat wine colour, and the colour is the
 * part's: the book is read in eight stretches and each has its own. The
 * main field carries the title; the narrow block beside it carries the
 * part's numeral. Text on each is chosen against that field, not against
 * the page, so these are fixed values and do not follow the theme.
 *
 * Set per part, not per chapter, so a new chapter needs no colour decision.
 */
export type Field = { bg: string; ink: string };

const GARNET: Field = { bg: '#5b1a2a', ink: '#e6d79a' };
const STRAW: Field = { bg: '#e6d79a', ink: '#5b1a2a' };
const BLUSH: Field = { bg: '#e8b7ae', ink: '#5b1a2a' };
const GOLD: Field = { bg: '#efe3b0', ink: '#5b1a2a' };

export const PART_COLOURS: Record<string, { main: Field; side: Field }> = {
  foundations: { main: GARNET, side: STRAW },
  grapes: { main: STRAW, side: GARNET },
  tasting: { main: BLUSH, side: GARNET },
  making: { main: GOLD, side: BLUSH },
  france: { main: GARNET, side: BLUSH },
  'new-zealand': { main: BLUSH, side: STRAW },
  world: { main: GARNET, side: GOLD },
  practice: { main: STRAW, side: GOLD },
};

export const FALLBACK = { main: GARNET, side: STRAW };
