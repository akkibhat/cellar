import Logo from './Logo';
import {
  SECTION_NAMING,
  SECTIONS,
  sectionName,
  type SectionKey,
} from '@/lib/config';

/**
 * The masthead title on a half's own landing page.
 *
 * The name is set as the wordmark rather than in the hand. Everything else
 * on the site that says Cellarbook or Cellardoor already does this - the
 * front door's two cards, the shell's masthead, the section nav - and
 * these two pages were the last places writing the name out in Caveat, so
 * the brand was rendered in two different faces depending on where you
 * happened to be standing. The hand keeps every other heading; it is the
 * voice of the writing, and the wordmark is the name of the thing.
 *
 * Two sizes because a lockup cannot reflow: the mark is a fixed height in
 * pixels and the word is sized from it, so at 54px the pair runs about
 * 333px wide and a 375px phone has 327px to give it. Hidden by a wrapper
 * rather than a class on the lockup itself, since `Logo` sets its own
 * `display` inline and would win against Tailwind's.
 *
 * Under `SECTION_NAMING = 'sections'` there is no per-half wordmark to
 * set - both halves are Cellarbook and the titles are "The Course" and
 * "The Cellar" - so the hand comes back. That flag is live in
 * `lib/config.ts`; this reads it rather than assuming today's answer.
 */
export default function SectionTitle({ section }: { section: SectionKey }) {
  if (SECTION_NAMING !== 'suffix') {
    return (
      <h1 className="hand t-display leading-[0.98] mb-1">
        {sectionName(section)}
      </h1>
    );
  }

  const { suffix, accent } = SECTIONS[section];

  /* Both lockups are hidden from assistive tech and the heading carries
     the name itself. `display: none` should keep the off-size one out of
     the accessibility tree on its own, but the two together were being
     announced as "CellardoorCellardoor", and a title read twice is worse
     than one that is labelled. */
  return (
    <h1
      className="mb-1"
      aria-label={sectionName(section)}
      /* Both the mark's page and the wordmark's suffix take the half's
         accent, the way the shell's masthead does. Without this they fall
         back to the root default, which is garnet - right for the book by
         coincidence and wrong for the door, whose mark is pounamu alone. */
      style={{
        ['--logo-page' as string]: accent,
        ['--logo-word' as string]: accent,
      }}
    >
      <span className="sm:hidden" aria-hidden="true">
        <Logo size={46} suffix={suffix} />
      </span>
      <span className="hidden sm:block" aria-hidden="true">
        <Logo size={68} suffix={suffix} />
      </span>
    </h1>
  );
}
