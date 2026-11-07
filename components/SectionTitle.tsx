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
 * The name is set as the logo lockup, matching everywhere else the brand
 * appears; the handwritten face is kept for ordinary headings.
 *
 * Two sizes because a lockup can't reflow: its width is fixed by the mark
 * height, and the large one is too wide for a phone. Each is hidden by a
 * wrapper span, since `Logo` sets its own `display` inline and would beat
 * a Tailwind class put on it directly.
 *
 * If `SECTION_NAMING` (lib/config.ts) isn't 'suffix', there's no per-half
 * wordmark, so the title falls back to plain handwritten text.
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
     the name via aria-label. Without this the pair was announced as
     "CellardoorCellardoor" even with one at display: none. */
  return (
    <h1
      className="mb-1"
      aria-label={sectionName(section)}
      /* The mark's page and the wordmark's suffix take the half's accent,
         as in the shell's sidebar. Without this they fall back to the root
         default, which is wrong for the door. */
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
