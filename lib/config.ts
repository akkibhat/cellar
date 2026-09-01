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
 * live on the chapters in `lib/content/chapters/` - 99 of them across the
 * 33 chapters, so turning this back on is the whole job.
 *
 * Typed as `boolean` rather than left to infer the literal `false`, so
 * the guarded branches do not read as statically dead code.
 */
export const QUIZZES_ENABLED: boolean = false;

/**
 * Whether to track and show reading progress.
 *
 * Off for now. Progress is a completion mechanic, and a course that
 * counts how much of itself you have finished asks to be finished rather
 * than consulted - which is the wrong posture for something meant to be
 * dipped into. The sidebar meter, the contents counters and the "mark
 * complete" control at the foot of each chapter all disappear behind
 * this.
 *
 * Nothing is deleted. `useProgress` still works, anything already stored
 * under `wine.progress.v1` in localStorage is left untouched, and turning
 * this back on restores the existing state rather than starting from
 * zero.
 */
export const PROGRESS_ENABLED: boolean = false;

/* ===================================================================== *
 * The two halves
 * ===================================================================== */

/**
 * How the Course and the Cellar are named.
 *
 * Two options are live because the decision is genuinely open, and this
 * is the single place it gets made:
 *
 *   'sections'  One brand, two sections. The wordmark always reads
 *               Cellarbook; the halves are "The Course" and "The Cellar".
 *
 *   'suffix'    The suffix swaps. Cellar is the constant root, so the
 *               course is Cellarbook and the tracker is Cellardoor. Pairs
 *               with routes at /book and /door, where the address bar
 *               ends up spelling the wordmark.
 *
 * See `_previews/naming-accent.html` and `_previews/cellar-domain.html`
 * for both rendered. Flipping this constant changes every label; the
 * route rename is a separate job.
 */
export type SectionNaming = 'sections' | 'suffix';
export const SECTION_NAMING: SectionNaming = 'suffix';

export type SectionKey = 'course' | 'cellar';

/**
 * Everything that differs between the two halves, in one table.
 *
 * `accent` is a CSS custom property rather than a colour, so a section can
 * be recoloured by editing this line alone. The Cellar currently carries
 * pounamu so you can tell which half you are in before reading a word - if
 * that is reverted to garnet, the drink-window "ready" badge can go back
 * to green, since the two currently compete for the same meaning.
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
    accent: 'var(--pounamu)',
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
 * Which half a path belongs to.
 *
 * Only the cellar's own routes count. The guided tasting and the journal
 * used to be listed here as well, on the grounds that you use them with a
 * glass in front of you - but they are standalone tools sitting at top
 * level alongside the glossary, the grapes and the aroma wheel, and they
 * wear the course's sidebar. Counting them as cellar meant the masthead
 * read Cellardoor over a page carrying the course's furniture, which is
 * the shell contradicting itself.
 */
export function sectionFor(pathname: string): SectionKey {
  return pathname.startsWith('/cellar') ? 'cellar' : 'course';
}

/**
 * Whose cellar this is.
 *
 * Rendered as a handwritten kicker above the masthead lockup - a signed
 * name over a printed wordmark, which is what a bookplate is, and the
 * reason a personal project can carry a designed mark without looking
 * like a company.
 *
 * It belongs to the masthead and the about page only. At favicon and
 * sidebar sizes it is dropped rather than shrunk, since the mark alone
 * already carries the identity there.
 */
export const OWNER = 'Akki';
