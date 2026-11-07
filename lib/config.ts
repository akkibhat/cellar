/**
 * Course-wide switches.
 *
 * Things that change what the course *is* rather than how it looks, kept
 * in one place so they can be found without grepping the components.
 */

/**
 * Whether to show the end-of-chapter questions.
 *
 * Off for now: this is a reading resource rather than something that
 * tests you, and a quiz at the foot of every chapter changes the character
 * of the thing. The questions themselves are still authored and still
 * live on the chapters in `lib/content/chapters/` (78 across the 25
 * chapters at last count), so turning this back on is the whole job.
 *
 * Typed as `boolean` rather than left to infer the literal `false`, so
 * the guarded branches do not read as statically dead code.
 */
export const QUIZZES_ENABLED: boolean = false;

/**
 * Whether to track and show reading progress.
 *
 * Off for now: a course that counts how much of itself you have finished
 * asks to be finished rather than dipped into. The contents counters and
 * the "mark complete" control at the foot of each chapter both hide behind
 * this.
 *
 * Nothing is deleted. `useProgress` still works, anything already stored
 * under `wine.progress.v1` in localStorage is left untouched, and turning
 * this back on restores the existing state.
 */
export const PROGRESS_ENABLED: boolean = false;

/* ===================================================================== *
 * The two halves
 * ===================================================================== */

/**
 * How the Course and the Cellar are named. This is the single switch:
 *
 *   'sections'  One brand, two sections. The wordmark always reads
 *               Cellarbook; the halves use their plain `label`s.
 *
 *   'suffix'    The suffix swaps. Cellar is the constant root, so the
 *               course is Cellarbook and the cellar is Cellardoor.
 *
 * Flipping this changes the labels only; the routes stay /course and
 * /cellar either way.
 */
export type SectionNaming = 'sections' | 'suffix';
export const SECTION_NAMING: SectionNaming = 'suffix';

/** The two halves of the site. */
export type SectionKey = 'course' | 'cellar';

/**
 * Everything that differs between the two halves, in one table.
 *
 * `accent` is a CSS custom property rather than a colour, so a section can
 * be recoloured by editing this line alone. The Cellar carries straw so
 * you can tell which half you are in before reading a word. Note the
 * drink-window `early` pill (STATUS_COLOUR in lib/cellar.ts) is straw
 * too, so the two currently share a colour.
 */
export const SECTIONS: Record<
  SectionKey,
  {
    href: string;
    accent: string;
    /** The half of the wordmark that changes. */
    suffix: 'book' | 'door';
    /** The name when the two halves are separately branded. */
    brand: string;
    /** The plain description, always usable regardless of naming. */
    label: string;
  }
> = {
  course: {
    href: '/course',
    accent: 'var(--wine)',
    suffix: 'book',
    brand: 'Cellarbook',
    label: 'The chapters',
  },
  cellar: {
    href: '/cellar',
    accent: 'var(--straw)',
    suffix: 'door',
    brand: 'Cellardoor',
    label: 'The cellar',
  },
};

/** The display name of one half, under whatever naming is in force. */
export function sectionName(key: SectionKey): string {
  return SECTION_NAMING === 'suffix' ? SECTIONS[key].brand : SECTIONS[key].label;
}

/**
 * Whose cellar this is. Currently used only as the page author in the
 * site metadata (app/layout.tsx).
 */
export const OWNER = 'Akki';
