'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PARTS } from '@/lib/content/parts';
import { PART_COLOURS, FALLBACK } from '@/lib/content/partColours';
import { CHAPTERS, CHAPTER_COUNT, chaptersInPart } from '@/lib/content/course';
import { useProgress } from '@/lib/storage';
import { PROGRESS_ENABLED } from '@/lib/config';

/**
 * The Cellarbook index: the whole book on one page, set as eight bands.
 *
 * Each part is a band in the colour its chapters open in, with the part's
 * numeral, title and blurb on the coloured side and its chapters, with
 * read times, on the paper beside it. Reading it top to bottom is reading
 * the shape of the book; and because a chapter opens in the same colour
 * as its band, going in and coming back out feels like one place.
 *
 * Every chapter row carries its slug as an id. A chapter's "All chapters"
 * link points at `/course/#<slug>`, so it lands on that chapter's own row
 * and the browser's :target highlight marks it, instead of dropping you at
 * the top of the page to hunt for where you were.
 *
 * Progress (completion ticks and a "continue" button that resumes at the
 * first unfinished chapter) is kept for when PROGRESS_ENABLED is turned
 * on; with it off, `done` is empty and everything reads as unstarted.
 */
export default function Contents({
  glossaryCount,
  grapeCount,
}: {
  glossaryCount: number;
  grapeCount: number;
}) {
  const { progress, ready, resetProgress } = useProgress();

  /* The chapter the reader arrived from, taken from the address (#slug).
     The browser's own :target does not update when Next changes the page
     without a full load, so the row is marked from state instead. */
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const read = () => setCurrent(window.location.hash.replace(/^#/, '') || null);
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const done = PROGRESS_ENABLED && ready ? progress.done : [];
  const resume = CHAPTERS.find((m) => !done.includes(m.slug)) ?? CHAPTERS[0];
  const started = done.length > 0;
  const startHref = `/course/${started ? resume.slug : CHAPTERS[0].slug}`;

  return (
    <>
      {/* ---- The head ------------------------------------------- */}
      <header className="index-head">
        <h1 className="index-title">
          Cellar<span style={{ color: 'var(--wine)' }}>book</span>
        </h1>
        <div className="index-intro">
          <p>
            Everything from what fermentation is to how to spit without
            embarrassing yourself, weighted toward France and New Zealand,
            because that is what I am interested in so far.
          </p>
          <p className="index-sub" suppressHydrationWarning>
            {CHAPTER_COUNT} chapters, written in the order it made sense to
            learn, but you can start anywhere.
            {started && ` You have finished ${done.length}.`}
          </p>
          <div className="index-actions">
            <Link href={startHref} className="btn btn-primary" suppressHydrationWarning>
              {started ? `Continue with ${resume.title}` : `Start with ${CHAPTERS[0].title.toLowerCase()}`}
            </Link>
            <Link href="/glossary" className="index-tool">
              Glossary <span>{glossaryCount}</span>
            </Link>
            <Link href="/grapes" className="index-tool">
              Grape explorer <span>{grapeCount}</span>
            </Link>
            <Link href="/aromas" className="index-tool">
              Aroma wheel
            </Link>
            {started && (
              <button
                className="index-tool"
                onClick={() => {
                  if (confirm('Clear your reading progress?')) resetProgress();
                }}
              >
                Reset progress
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ---- The parts ------------------------------------------ */}
      {PARTS.map((part) => {
        const mods = chaptersInPart(part.slug);
        const { main } = PART_COLOURS[part.slug] ?? FALLBACK;
        const partDone = mods.filter((m) => done.includes(m.slug)).length;

        return (
          <section key={part.slug} className="band" aria-labelledby={`part-${part.slug}`}>
            <div className="band__head" style={{ background: main.bg, color: main.ink }}>
              <span className="band__numeral" aria-hidden="true">
                {part.numeral}
              </span>
              <h2 id={`part-${part.slug}`} className="band__title">
                {part.title}
              </h2>
              <p className="band__blurb">{part.blurb}</p>
              {PROGRESS_ENABLED && (
                <p className="band__count" suppressHydrationWarning>
                  {partDone}/{mods.length} read
                </p>
              )}
            </div>

            <ol className="band__list">
              {mods.map((m) => {
                const isDone = done.includes(m.slug);
                return (
                  <li
                    key={m.slug}
                    id={m.slug}
                    className="band__item"
                    data-current={current === m.slug ? 'true' : undefined}
                  >
                    <Link href={`/course/${m.slug}`} className="band__row">
                      <span className="band__n" suppressHydrationWarning>
                        {isDone ? '\u2713' : m.n}
                      </span>
                      <span className="band__name">{m.title}</span>
                      <span className="band__min">{m.minutes} min</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </>
  );
}
