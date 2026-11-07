'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TOOL_GROUPS } from '@/lib/tools';
import { PARTS } from '@/lib/content/parts';
import { PART_COLOURS, FALLBACK } from '@/lib/content/partColours';
import { CHAPTERS, CHAPTER_COUNT, chaptersInPart } from '@/lib/content/course';
import { LAST_CHAPTER_KEY, useProgress } from '@/lib/storage';
import { PROGRESS_ENABLED } from '@/lib/config';

/**
 * The Cellarbook index: the whole book on one page, one band per part.
 *
 * Each band is in the colour its chapters open in, with the part's numeral,
 * title and blurb on the coloured side and its chapters beside it. Every
 * chapter row carries its slug as an id, so a chapter's "All chapters" link
 * (`/course/#<slug>`) lands back on that row.
 *
 * Progress ticks and the "Continue here" marker only work when
 * PROGRESS_ENABLED is on; with it off, `done` is empty and all reads unstarted.
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
    /* The address wins ("All chapters" sets it). With no #chapter on it
       the reader may have come back by the browser's back button, so the
       last chapter they opened is used instead. */
    /* Work out which chapter row to mark, from the hash or session storage. */
    const read = () => {
      const fromHash = window.location.hash.replace(/^#/, '');
      let last: string | null = null;
      try {
        last = sessionStorage.getItem(LAST_CHAPTER_KEY);
      } catch {
        /* storage blocked: no highlight */
      }
      setCurrent(fromHash || last || null);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  /* Finished chapter slugs, the first unfinished chapter, and whether any are done. */
  const done = PROGRESS_ENABLED && ready ? progress.done : [];
  const resume = CHAPTERS.find((m) => !done.includes(m.slug)) ?? CHAPTERS[0];
  const started = done.length > 0;

  /* The item counts shown beside the tools that have them. */
  const counts: Record<string, number> = { '/glossary': glossaryCount, '/grapes': grapeCount };

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
          {/* Every tool, in the same two groups as the row on the tool
              pages. The two reference lists show how much is in them. */}
          {TOOL_GROUPS.map((group) => (
            <div key={group.label} className="index-tools index-tools--group">
              <span className="label-ui">{group.label}</span>
              <div className="index-tools__links">
                {group.tools.map((t) => {
                  const count = counts[t.href];
                  return (
                    <Link key={t.href} href={t.href} className="index-tool">
                      {t.label}
                      {count !== undefined && <span>{count}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          {started && (
            <div className="index-tools">
              <button
                className="index-tool"
                onClick={() => {
                  if (confirm('Clear your reading progress?')) resetProgress();
                }}
              >
                Reset progress
              </button>
            </div>
          )}
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
                    {/* Where to begin: a marker just above the first chapter,
                        or above the next unread one once progress is on and
                        started. */}
                    {m.slug === resume.slug && (
                      <span className="band__start" suppressHydrationWarning>
                        {started ? 'Continue here' : 'Start here'}
                      </span>
                    )}
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
