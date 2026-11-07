/**
 * Shared type definitions for the whole course.
 *
 * Everything the site renders - chapters, grapes, glossary terms, aromas -
 * is plain structured data described here. Keeping the shapes in one file
 * means the content files stay readable (they are almost pure data) and the
 * components can rely on a single source of truth for what a "chapter" is.
 */

/* ------------------------------------------------------------------ *
 * Course structure
 * ------------------------------------------------------------------ */

/**
 * A part is a top-level grouping of chapters - "Foundations", "Tasting",
 * and so on. Parts exist purely for navigation and pacing; all the real
 * content lives on the chapters inside them.
 */
export type Part = {
  /** Roman-ish ordinal shown in the UI, e.g. "I", "II". */
  numeral: string;
  /** URL-safe identifier. */
  slug: string;
  title: string;
  /** One line explaining what this part is for, shown on the contents page. */
  blurb: string;
};

/**
 * A block is one piece of a chapter's body. Chapters are built from an
 * ordered list of these rather than from a single HTML string, so that
 * rich elements (tables, callouts, embedded tools) can sit inline with
 * prose without any HTML parsing.
 */
export type Block =
  /** A paragraph of body text. Supports the light markup described in `lib/markup.tsx`. */
  | { kind: 'p'; text: string }
  /** A sub-heading inside a chapter. */
  | { kind: 'h'; text: string }
  /** A short italic line under a heading, listing descriptors. */
  | { kind: 'descriptors'; text: string }
  /** An unordered list. */
  | { kind: 'list'; items: string[] }
  /** A numbered list, used for procedures like the spitting guide. */
  | { kind: 'steps'; items: string[] }
  /** A pulled-out aside on tinted paper. */
  | { kind: 'note'; title?: string; text: string }
  /**
   * Something not yet settled - a figure whose sources disagree, a claim
   * that has not been checked, a question still open.
   *
   * This is one person learning in public, which is allowed gaps provided
   * it marks them. Rendered with a dashed border, which reads as
   * provisional in a way `note`'s solid rule does not.
   */
  | { kind: 'unsure'; title?: string; text: string }
  /** A quotation with attribution. */
  | { kind: 'quote'; text: string; cite: string }
  /** A simple data table. */
  | { kind: 'table'; head: string[]; rows: string[][] }
  /**
   * An interactive tool embedded mid-chapter. The `tool` value selects
   * which component renders here - see `components/EmbeddedTool.tsx`.
   */
  | {
      kind: 'tool';
      tool:
        | 'tasting'
        | 'aromaWheel'
        | 'units'
        | 'temperature'
        | 'grapeFilter'
        | 'fermentation'
        | 'dosage'
        | 'fortification'
        | 'ripeness'
        | 'skinContact'
        | 'twoBanks';
      /** For `grapeFilter`: lock it to one colour, hiding the control. */
      only?: 'white' | 'red';
    };

/** A single multiple-choice question in a chapter's end-of-chapter check. */
export type Question = {
  q: string;
  /** Answer options in display order. */
  options: string[];
  /** Index into `options` of the correct answer. */
  answer: number;
  /** Shown after answering, whether right or wrong. */
  because: string;
};

/** One lesson. The unit the reader progresses through. */
export type Chapter = {
  slug: string;
  /** Slug of the part this chapter belongs to. */
  part: string;
  /** Display number within the whole course, 1-based. */
  n: number;
  title: string;
  /** Standfirst paragraph, set larger under the title. */
  standfirst: string;
  /** Rough reading time in minutes, shown in the contents. */
  minutes: number;
  body: Block[];
  quiz?: Question[];
};

/* ------------------------------------------------------------------ *
 * Grape varieties
 * ------------------------------------------------------------------ */

/**
 * Structural measurements are stored as 1-5 integers so the grape
 * explorer can filter and sort on them, and so the little bar meters in
 * the UI have a fixed scale.
 */
export type Scale = 1 | 2 | 3 | 4 | 5;

/** One grape variety, as shown in the grape explorer. */
export type Grape = {
  slug: string;
  name: string;
  colour: 'white' | 'red';
  /** Other names the same grape goes by, e.g. Syrah / Shiraz. */
  aliases?: string[];
  /** Where it is at its most characteristic. */
  homes: string[];
  /** Climate band it needs. Drives one of the explorer's filters. */
  climate: 'cool' | 'moderate' | 'warm';
  body: Scale;
  acidity: Scale;
  /** Whites are given tannin 1 unless they see serious skin contact or oak. */
  tannin: Scale;
  /** Three to five aroma cues, shown as chips. */
  aromas: string[];
  /** Two or three sentences with the character and why it matters. */
  note: string;
  /** A representative bottle style to look for when buying. */
  tryThis: string;
};

/* ------------------------------------------------------------------ *
 * Glossary
 * ------------------------------------------------------------------ */

/** The groups the glossary can be filtered by. */
export type GlossaryCategory =
  | 'appearance'
  | 'nose'
  | 'palate'
  | 'structure'
  | 'fault'
  | 'making'
  | 'label';

/** One glossary entry. */
export type GlossaryTerm = {
  slug: string;
  term: string;
  category: GlossaryCategory;
  /** Word origin, where it is interesting or clarifying. */
  etymology?: string;
  definition: string;
  /** Slugs of related terms, rendered as links. */
  seeAlso?: string[];
};

/* ------------------------------------------------------------------ *
 * Aromas
 * ------------------------------------------------------------------ */

/**
 * The aroma wheel is two levels deep: six families, each holding a
 * handful of specific descriptors. The six families are the standard set,
 * and the descriptors under them are the standard tasting vocabulary.
 */
export type AromaFamily = {
  slug: string;
  name: string;
  /** Hue used for this family's wedge on the wheel and its chips. */
  colour: string;
  /** What this family generally signals about the wine. */
  meaning: string;
  descriptors: string[];
};
