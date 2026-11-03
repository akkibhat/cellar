import { CELLAR, PULLED_AT, TASTED, type CellarWine } from './content/cellar-snapshot';
import {
  GRAPES,
  PROFILES,
  RED_GRAPES,
  type GrapeFacts,
  type TastingProfile,
} from './content/wine-reference';
import { PHOTOS } from './content/wine-photos';
import { estimateWindow, inferStyle, type AgeingStyle } from './wineref';

/**
 * Reading the cellar.
 *
 * This chapter used to be a localStorage CRUD app - add a bottle, edit it,
 * open it. That is gone. Cellarion holds the bottles now, the site shows
 * them, and a visitor has no edit controls at all: this is Akki's cellar
 * as content, not a tool for strangers to keep their own in.
 *
 * Which means everything here is pure derivation over a committed
 * snapshot, so the pages render statically with no client JavaScript.
 */

export { CELLAR, PULLED_AT, TASTED };
export type { CellarWine, GrapeFacts, TastingProfile };

/* ===================================================================== *
 * Drinking windows
 * ===================================================================== */

export type DrinkStatus =
  | 'young'
  | 'early'
  | 'ready'
  | 'closing'
  | 'past'
  | 'unknown';

export const STATUS_LABEL: Record<DrinkStatus, string> = {
  young: 'Too young',
  early: 'Drinkable, still improving',
  ready: 'At its best',
  closing: 'Drink up',
  past: 'Past its window',
  unknown: 'No window',
};

/** Semantic colours, not brand ones - these mean something. */
/**
 * The same five states, short enough for a pill.
 *
 * A card is read at a glance and has about two words of room; the panel
 * has a sentence. "Drinkable, still improving" is the right answer in the
 * panel and wraps to two lines on a card, which reads as a mistake.
 */
export const STATUS_SHORT: Record<DrinkStatus, string> = {
  young: 'Too young',
  early: 'Drinkable now',
  ready: 'At its best',
  closing: 'Drink up',
  past: 'Past it',
  unknown: 'No window',
};

export const STATUS_COLOUR: Record<DrinkStatus, string> = {
  /* Blue says wait, green says drink. `early` is drinkable, so it is green -
     a muted one, because `ready` is the wine at its best and should be the
     brighter of the two. */
  young: 'var(--info)',
  early: 'var(--pounamu)',
  ready: 'var(--ok)',
  closing: 'var(--caution)',
  past: 'var(--alert)',
  unknown: 'var(--ink-faint)',
};

export type Window = {
  from: number;
  to: number;
  /** Absent on a curated window, which needs no archetype behind it. */
  style?: AgeingStyle;
  /** True when this came from Cellarion rather than being inferred here. */
  curated?: boolean;
};

/**
 * A drinking window for a wine.
 *
 * Cellarion's own window wins where a sommelier has set one, which is now
 * every bottle here. Its windows come in three bands - early, peak, late -
 * and the span reported is the whole of it, from the first year the wine
 * is worth opening to the last year it is worth keeping.
 *
 * Where there is no registry window the site infers one from region,
 * grapes and vintage using the archetypes in `wineref.ts`, and says it is
 * an estimate wherever it appears.
 */
export function windowFor(w: CellarWine): Window | undefined {
  const style = inferStyle(w.appellation ?? w.region, w.grapes?.join(', '));

  const m = w.maturity;
  if (m) {
    return {
      from: m.earlyFrom,
      to: m.lateUntil ?? m.peakUntil ?? m.earlyUntil,
      style,
      curated: true,
    };
  }

  if (!w.vintage) return undefined; // non-vintage: nothing to count from
  const est = estimateWindow(Number(w.vintage), style);
  return est && style ? { ...est, style } : undefined;
}

/**
 * Where a wine sits in its window this year.
 *
 * `closing` is the state worth having: a window that merely says "ready"
 * for a decade tells you nothing about urgency, so the last quarter - or
 * the final two years, whichever is longer - is called out separately.
 */
export function statusFor(w: CellarWine, year: number): DrinkStatus {
  /* A curated window names its own bands, so use them rather than
     re-deriving the same distinction from the span. */
  const m = w.maturity;
  if (m) {
    if (year < m.earlyFrom) return 'young';
    if (m.lateUntil != null && year > m.lateUntil) return 'past';
    if (m.lateFrom != null && year >= m.lateFrom) return 'closing';
    if (m.peakFrom != null && year >= m.peakFrom) {
      return m.peakUntil != null && year > m.peakUntil ? 'closing' : 'ready';
    }
    return year <= m.earlyUntil ? 'early' : 'ready';
  }

  const win = windowFor(w);
  if (!win) return 'unknown';
  if (year < win.from) return 'young';
  if (year > win.to) return 'past';
  const tail = Math.max(2, Math.round((win.to - win.from) * 0.25));
  return year > win.to - tail ? 'closing' : 'ready';
}

/** Urgency order for sorting. Lower comes first. */
const URGENCY: Record<DrinkStatus, number> = {
  closing: 0,
  ready: 1,
  early: 2,
  unknown: 3,
  young: 4,
  past: 5,
};

/**
 * The cellar, sorted by what to open next rather than by name.
 *
 * A cellar sorted alphabetically is a spreadsheet; sorted by how close
 * each bottle is to the end of its window, it is a recommendation.
 */
export function cellarByUrgency(year: number): CellarWine[] {
  return [...CELLAR].sort((a, b) => {
    const ua = URGENCY[statusFor(a, year)];
    const ub = URGENCY[statusFor(b, year)];
    if (ua !== ub) return ua - ub;
    const ta = windowFor(a)?.to ?? Infinity;
    const tb = windowFor(b)?.to ?? Infinity;
    if (ta !== tb) return ta - tb;
    return label(a).localeCompare(label(b));
  });
}

/* ===================================================================== *
 * Display helpers
 * ===================================================================== */

export function label(w: CellarWine): string {
  return [w.producer, w.wine].filter(Boolean).join(' ').trim();
}

/**
 * A wine's full name, avoiding the doubling that Cellarion's registry
 * produces for Bordeaux châteaux, where the producer and the wine are
 * the same string - "Château Petit-Serin Château Petit-Serin".
 */
export function fullName(w: CellarWine): string {
  if (w.wine && w.producer && w.wine.trim() === w.producer.trim()) {
    return w.producer;
  }
  return label(w);
}

export const TYPE_LABEL: Record<CellarWine['type'], string> = {
  red: 'Red',
  white: 'White',
  'rosé': 'Rosé',
  sparkling: 'Sparkling',
  dessert: 'Sweet',
  fortified: 'Fortified',
};

/** The line of detail under a wine's name. */
export function detailLine(w: CellarWine): string {
  return [
    TYPE_LABEL[w.type],
    w.appellation ?? w.region,
    w.appellation && w.country !== 'France' ? w.country : undefined,
    w.grapes?.length ? w.grapes.join(', ') : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
}

/**
 * Star rating as a string of filled and empty pips, for a 5 scale.
 *
 * Rounded to the nearest half rather than the nearest whole. Rounding 4.5
 * up to five filled pips awards a perfect score the bottle did not get,
 * and on a list where only seven wines are rated at all, the difference
 * between "the best thing here" and "very good" is most of the signal.
 */
export function stars(rating: number): string {
  const halves = Math.round(rating * 2);
  const full = Math.floor(halves / 2);
  const half = halves % 2;
  return (
    '●'.repeat(full) +
    (half ? '◐' : '') +
    '○'.repeat(Math.max(0, 5 - full - half))
  );
}

/*
 * Appellations that are not places.
 *
 * "Vin de France" is the label you use when the wine does not qualify for,
 * or does not want, a geographic name - so printing it where a place goes
 * tells the reader the wine comes from somewhere called Vin de France.
 * These fall back to the region, which for Château Marjosse is Bordeaux,
 * and which is what a person would actually say.
 */
const NOT_A_PLACE = new Set(['Vin de France', 'Vino d’Italia', "Vino d'Italia"]);

/** Where a wine is from, in the terms a person would use out loud. */
export function placeOf(w: CellarWine): string | undefined {
  if (w.appellation && !NOT_A_PLACE.has(w.appellation)) return w.appellation;
  return w.region;
}

/* ===================================================================== *
 * Summary
 * ===================================================================== */

export type Counts = {
  cellar: number;
  tasted: number;
  countries: number;
  rated: number;
  byStatus: Record<DrinkStatus, number>;
};

export function counts(year: number): Counts {
  const byStatus: Record<DrinkStatus, number> = {
    young: 0, early: 0, ready: 0, closing: 0, past: 0, unknown: 0,
  };
  CELLAR.forEach((w) => { byStatus[statusFor(w, year)] += 1; });

  return {
    cellar: CELLAR.length,
    tasted: TASTED.length,
    countries: new Set([...CELLAR, ...TASTED].map((w) => w.country)).size,
    rated: TASTED.filter((w) => w.rating !== undefined).length,
    byStatus,
  };
}

/* ===================================================================== *
 * What we can say about a wine, and who is saying it
 * ===================================================================== */

/*
 * Everything below exists to keep four very different kinds of statement
 * from being mistaken for each other on the page.
 *
 * The measurement that forced this: on the only two wines where both a
 * wine-level profile and a grape-level one exist, the grape predicted
 * just 33% and 17% of the wine's actual flavours, and 25% of its food
 * pairings. What it missed was not random - the grape gives you fruit and
 * structure, the site gives you the things that are not fruit (Grand
 * Mayne's chalky mineral, Valli's wild herbs and dried thyme) and the
 * cellar gives you the rest (cocoa, tobacco, black tea, spice). So a
 * grape descriptor is genuinely not a description of the bottle, and the
 * page must never let one stand where the other belongs.
 */

export type Level =
  | 'wine' /* Cellarion's registry, about this exact wine */
  | 'grape' /* about the variety anywhere in the world */
  | 'label' /* read off the bottle by me */
  | 'mine' /* my own rating or note */
  | 'estimate'; /* computed here, from style and vintage */

export const LEVEL_NOTE: Record<Level, string> = {
  wine: 'About this wine',
  grape: 'About the grape, not this bottle',
  label: 'Read off the label',
  mine: 'Mine',
  estimate: 'Estimated here',
};

/** Registry profiles are keyed on producer and wine together. */
function profileKey(w: CellarWine): string {
  return `${w.producer}|${w.wine}`;
}

/**
 * Cellarion's tasting profile for this wine, if one exists.
 *
 * Two of twenty-two do. Everything else returns undefined, and the page
 * falls back to the grape - clearly labelled as the grape.
 */
export function profileFor(w: CellarWine): TastingProfile | undefined {
  return PROFILES[profileKey(w)];
}

/** The varieties in a wine that we have reference facts for. */
export function grapesFor(w: CellarWine): { name: string; facts: GrapeFacts }[] {
  return (w.grapes ?? [])
    .map((name) => ({ name, facts: GRAPES[name] }))
    .filter((g): g is { name: string; facts: GrapeFacts } => Boolean(g.facts));
}

/**
 * Which course chapter covers where this wine grew.
 *
 * Ordered longest-key-first at lookup so "Loire Valley" does not lose to a
 * shorter accidental match. Appellations resolve up to their parent
 * because that is the level the course writes at - and, as it happens,
 * the only level Cellarion has anything to say about either.
 */
const REGION_CHAPTER: Record<string, string> = {
  'Châteauneuf-du-Pape': 'rhone-loire-south',
  'Rhône': 'rhone-loire-south',
  'Saint-Émilion': 'bordeaux',
  'Entre-Deux-Mers': 'bordeaux',
  'Sauternes': 'bordeaux',
  'Margaux': 'bordeaux',
  'Bordeaux': 'bordeaux',
  'Loire Valley': 'rhone-loire-south',
  'Touraine': 'rhone-loire-south',
  'Central Otago': 'central-otago',
  'Bannockburn': 'central-otago',
  'Gibbston': 'central-otago',
  "Hawke's Bay": 'hawkes-bay',
  'Hawke’s Bay': 'hawkes-bay',
  'Veneto': 'rest-of-the-world',
  'Delle Venezie': 'rest-of-the-world',
  'Primitivo di Manduria': 'rest-of-the-world',
};

export type CourseLink = { label: string; href: string };

/**
 * Links from a bottle into the half of the site that explains it.
 *
 * This is the whole thesis of the place made clickable: one half is what
 * I have learned, the other is what I have drunk, and a bottle from
 * Bannockburn should be one tap from the chapter about Bannockburn. It
 * also solves an attribution problem - Cellarion writes a good paragraph
 * about Central Otago, but it is theirs, and the course already has mine.
 */
export function courseLinksFor(w: CellarWine): CourseLink[] {
  const links: CourseLink[] = [];

  const place = w.appellation ?? w.region;
  const slug =
    REGION_CHAPTER[place ?? ''] ?? REGION_CHAPTER[w.region ?? ''] ?? undefined;
  if (slug && place) {
    links.push({ label: place, href: `/course/${slug}` });
  }

  /* Sweet wine gets a second door, because the interesting thing about a
     Sauternes is how it was made rather than where. */
  if (w.type === 'dessert' || w.type === 'sparkling' || w.type === 'fortified') {
    links.push({
      label: TYPE_LABEL[w.type].toLowerCase(),
      href: '/course/bubbles-fortified-sweet',
    });
  }

  /* The grape chapter, chosen by the grape's colour rather than the wine's:
     a rosé is made from a red grape. */
  const first = (w.grapes ?? [])[0];
  if (first) {
    links.push({
      label: first,
      href: RED_GRAPES.has(first) ? '/course/red-grapes' : '/course/white-grapes',
    });
  }

  return links;
}

/**
 * The bottles a chapter can point at: every wine whose link into the course
 * lands on that chapter. This is `courseLinksFor` read the other way round,
 * so the two cannot disagree about which wine belongs to which chapter.
 * A chapter with no bottle behind it returns an empty list, and the page
 * shows nothing for it rather than an empty shelf.
 */
export function bottlesFor(slug: string): { wine: CellarWine; drunk: boolean }[] {
  const mine = (w: CellarWine) =>
    courseLinksFor(w).some((l) => l.href === `/course/${slug}`);
  return [
    ...CELLAR.filter(mine).map((wine) => ({ wine, drunk: false })),
    ...TASTED.filter(mine).map((wine) => ({ wine, drunk: true })),
  ];
}

/**
 * Notes that are actually about the wine, not about the import.
 *
 * The bulk import on 30 August stamped a breadcrumb into every bottle's
 * notes field so the provenance of the data was recoverable. Useful then,
 * noise now - and actively misleading on a page whose whole point is "what
 * I thought of it". These get filtered; what survives is what I read off
 * the label, which is why it is attributed to the label and not to me.
 */
const IMPORT_BREADCRUMBS = [
  'Rating carried across from my Vivino export.',
  'Tasted, not from my own cellar.',
  'Tasted, not from my own cellar. Imported from Vivino.',
  'Vivino recorded no vintage for this bottle.',
];

export function labelNote(w: CellarWine): string | undefined {
  const n = w.notes?.trim();
  if (!n || IMPORT_BREADCRUMBS.includes(n)) return undefined;
  return n;
}

/**
 * What I actually thought, from the note recorded as the bottle was drunk.
 *
 * The same import stamped its breadcrumb here too, so it gets the same
 * filter. Eighteen of the twenty-one tasted bottles carry nothing but that
 * breadcrumb, and printing it under a heading reading "Mine" would be the
 * site inventing an opinion I never had.
 */
export function tastingNote(w: CellarWine): string | undefined {
  const n = w.drunkNote?.trim();
  if (!n || IMPORT_BREADCRUMBS.includes(n)) return undefined;
  return n;
}

/**
 * Whether there is enough here to be worth opening.
 *
 * Every wine has a grape and a region, so this is always true today. It
 * exists so the card can stop being clickable if that ever stops holding,
 * rather than opening an empty panel.
 */
export function hasDetail(w: CellarWine): boolean {
  return (
    Boolean(profileFor(w)) ||
    grapesFor(w).length > 0 ||
    courseLinksFor(w).length > 0 ||
    Boolean(labelNote(w)) ||
    w.rating !== undefined
  );
}

/**
 * The bottle photograph for a wine, if there is one.
 *
 * Vintage-blind on purpose: the label of a 2017 and a 2021 from the same
 * château differ by two digits, and one photograph is honest enough for
 * both. Cellarion takes the same view - a photo attaches to the wine, not
 * to the bottle.
 */
export function photoFor(w: CellarWine): string | undefined {
  return PHOTOS[`${w.producer}|${w.wine}`];
}
