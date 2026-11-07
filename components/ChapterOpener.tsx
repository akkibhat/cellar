import { FALLBACK, PART_COLOURS } from '@/lib/content/partColours';

/**
 * The top of a chapter: a field of the part's colour with the title set
 * large on it, and a narrower block of a second colour carrying the part's
 * numeral, part name and read time. The colour says which part of the
 * book you're in.
 */
export default function ChapterOpener({
  partSlug,
  numeral,
  partTitle,
  title,
  standfirst,
  minutes,
}: {
  partSlug: string;
  numeral?: string;
  partTitle?: string;
  title: string;
  standfirst: string;
  minutes: number;
}) {
  const { main, side } = PART_COLOURS[partSlug] ?? FALLBACK;

  return (
    <header className="opener">
      <div className="opener__main" style={{ background: main.bg, color: main.ink }}>
        <h1 className="opener__title">{title}</h1>
        <p className="opener__stand">{standfirst}</p>
      </div>
      <div className="opener__side" style={{ background: side.bg, color: side.ink }}>
        {numeral && <span className="opener__numeral">{numeral}</span>}
        <span className="opener__part">{partTitle}</span>
        <span className="opener__min">{minutes} min read</span>
      </div>
    </header>
  );
}
