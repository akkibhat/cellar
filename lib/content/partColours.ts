/**
 * The two colours each part of the book opens in.
 *
 * Colour here means a place. The three parts about somewhere (France, New
 * Zealand, the wider world) each take a colour of wine; every other part is
 * about a subject, so it gets the same dark neutral. A coloured band on the
 * contents page therefore says "this is a country".
 *
 * Text on each is chosen against that field, not against the page, so
 * these are fixed values and do not follow the theme.
 */
export type Field = { bg: string; ink: string };

const GARNET: Field = { bg: '#5b1a2a', ink: '#e6d79a' };
const STRAW: Field = { bg: '#e6d79a', ink: '#5b1a2a' };
const BLUSH: Field = { bg: '#e8b7ae', ink: '#5b1a2a' };

/** A subject part: dark and quiet, so the places stand out against it. */
const SUBJECT: Field = { bg: '#2a2024', ink: '#efe6d2' };
const SUBJECT_SIDE: Field = { bg: '#ebe6da', ink: '#2a2024' };

/** Main and side colours for each part, keyed by part slug. */
export const PART_COLOURS: Record<string, { main: Field; side: Field }> = {
  foundations: { main: SUBJECT, side: SUBJECT_SIDE },
  grapes: { main: SUBJECT, side: SUBJECT_SIDE },
  tasting: { main: SUBJECT, side: SUBJECT_SIDE },
  making: { main: SUBJECT, side: SUBJECT_SIDE },
  france: { main: GARNET, side: BLUSH },
  'new-zealand': { main: STRAW, side: GARNET },
  world: { main: BLUSH, side: GARNET },
  practice: { main: SUBJECT, side: SUBJECT_SIDE },
};

/** Used for any part slug missing from the map above. */
export const FALLBACK = { main: SUBJECT, side: SUBJECT_SIDE };
