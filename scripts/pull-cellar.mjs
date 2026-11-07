/**
 * Turn a Cellarion export into the site's committed cellar snapshot.
 *
 * Why a snapshot: the site is static and public, so fetching live would
 * ship a personal API token to every visitor, and Cellarion's export links
 * expire in an hour so they cannot be baked into a build. Pulling and
 * committing also makes changes diffable in git.
 *
 * HOW TO REFRESH
 *
 *   1. In Cellarion, run an export of the cellar. You get a download link
 *      that is valid for 60 minutes.
 *   2. Download it, then:
 *
 *        node scripts/pull-cellar.mjs <path-to-export.json>
 *
 *   3. Commit the regenerated lib/content/cellar-snapshot.ts.
 *
 * The export schema is `cellarion-export@1`; the script refuses anything
 * else rather than silently producing a half-empty file.
 */

import fs from 'node:fs';
import path from 'node:path';

const SOURCE = process.argv[2];
const OUT = path.join('lib', 'content', 'cellar-snapshot.ts');

if (!SOURCE) {
  console.error('usage: node scripts/pull-cellar.mjs <path-to-cellarion-export.json>');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));

if (raw.schema !== 'cellarion-export@1') {
  console.error(
    `Unexpected export schema "${raw.schema}". This script was written against ` +
      '"cellarion-export@1"; check the field names before trusting the output.',
  );
  process.exit(1);
}

/** Cellarion writes "NV" for a non-vintage wine; the site prefers null. */
const vintageOf = (v) => (!v || v.toUpperCase() === 'NV' ? null : v);

/** Drop empty strings and empty arrays so the generated file stays terse. */
const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length),
    ),
  );

/**
 * A bottle's drinking window from Cellarion's sommelier notes, as three
 * bands (early, peak, late). Undefined when no sommelier has set one; the
 * site then infers a window instead (see `windowFor` in lib/cellar.ts).
 */
function maturityOf(b) {
  const m = b.maturity;
  if (!m || m.earlyFrom == null) return undefined;
  return clean({
    earlyFrom: m.earlyFrom,
    earlyUntil: m.earlyUntil,
    peakFrom: m.peakFrom,
    peakUntil: m.peakUntil,
    lateFrom: m.lateFrom,
    lateUntil: m.lateUntil,
    note: m.sommNotes,
  });
}

/**
 * A bottle's rating, out of five.
 *
 * Cellarion stores two: `rating` (an impression while you still had it,
 * e.g. a Coravin pour or a Vivino score) and `consumedRating` (the verdict
 * when you drank it). Both count, and the drinking verdict wins where both
 * exist. Reading only `rating` once lost a 5/5 that was recorded on drinking.
 *
 * Either can be on a 5, 20 or 100 point scale, so it is normalised here.
 */
function ratingOf(b) {
  const pick =
    b.consumedRating !== undefined && b.consumedRating !== null
      ? { value: b.consumedRating, scale: b.consumedRatingScale }
      : { value: b.rating, scale: b.ratingScale };

  if (pick.value === undefined || pick.value === null) return undefined;

  const outOfFive =
    pick.scale === '100'
      ? pick.value / 20
      : pick.scale === '20'
        ? pick.value / 4
        : pick.value;

  return Math.round(outOfFive * 10) / 10;
}

const bottles = raw.cellars.flatMap((c) => c.bottles ?? []);

const wines = bottles.map((b) =>
  clean({
    producer: b.producer,
    wine: b.wineName,
    vintage: vintageOf(b.vintage),
    country: b.country,
    region: b.region,
    appellation: b.appellation,
    type: b.type,
    grapes: b.grapes ?? [],
    rating: ratingOf(b),
    notes: b.notes,
    addedOn: b.dateAdded,
    drunkOn: b.consumedAt,
    drunkNote: b.consumedNote,
    maturity: maturityOf(b),
  }),
);

/* Vintage nulls are dropped by `clean`, so put them back explicitly -
   the difference between "no vintage" and "field missing" matters. */
wines.forEach((w, i) => {
  if (vintageOf(bottles[i].vintage) === null) w.vintage = null;
});

const active = wines.filter((w) => !w.drunkOn);
/* Newest first: the most recent thing tasted is the most interesting. */
const tasted = wines
  .filter((w) => w.drunkOn)
  .sort((a, b) => String(b.drunkOn).localeCompare(String(a.drunkOn)));

const body = `/**
 * The cellar, pulled from Cellarion.
 *
 * GENERATED FILE - do not edit by hand. Regenerate with:
 *   node scripts/pull-cellar.mjs <path-to-cellarion-export.json>
 *
 * Cellarion is the source of truth; this is a committed snapshot of it,
 * because the site is static and public and cannot carry a personal API
 * token. See scripts/pull-cellar.mjs for the reasoning and the refresh
 * steps.
 */

export type CellarWine = {
  producer: string;
  wine: string;
  /** Null for a non-vintage wine. */
  vintage: string | null;
  country: string;
  region?: string;
  appellation?: string;
  type: 'red' | 'white' | 'rosé' | 'sparkling' | 'dessert' | 'fortified';
  grapes?: string[];
  /** Out of five. Converted from other scales at pull time. */
  rating?: number;
  notes?: string;
  addedOn?: string;
  /** Present only on wines that have been drunk. */
  drunkOn?: string;
  drunkNote?: string;
  /**
   * Cellarion's own drinking window, where a sommelier has set one.
   *
   * Only the early band is always present. A wine with no peak or late
   * band is one the sommelier does not expect to improve - which is worth
   * knowing, so the absence is kept rather than filled in.
   */
  maturity?: {
    earlyFrom: number;
    earlyUntil: number;
    peakFrom?: number;
    peakUntil?: number;
    lateFrom?: number;
    lateUntil?: number;
    note?: string;
  };
};

/** When this snapshot was taken, shown so the page can admit its age. */
export const PULLED_AT = ${JSON.stringify(raw.exportedAt)};

/** Still in the cellar. */
export const CELLAR: CellarWine[] = ${JSON.stringify(active, null, 2)};

/** Drunk, newest first. */
export const TASTED: CellarWine[] = ${JSON.stringify(tasted, null, 2)};
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body, 'utf8');

console.log(`wrote ${OUT}`);
console.log(`  ${active.length} in the cellar, ${tasted.length} tasted`);
console.log(`  exported ${raw.exportedAt}`);
