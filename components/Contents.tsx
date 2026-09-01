'use client';

import Link from 'next/link';
import { PARTS } from '@/lib/content/parts';
import { CHAPTERS, CHAPTER_COUNT, chaptersInPart } from '@/lib/content/course';
import { useProgress } from '@/lib/storage';
import { PROGRESS_ENABLED } from '@/lib/config';
import HandRule from './HandRule';

/**
 * The table of contents.
 *
 * Shows every part and chapter, and - while PROGRESS_ENABLED is on -
 * completion state plus a "continue" link that resumes at the first
 * unfinished chapter rather than making the reader remember where they
 * stopped. With progress off, `done` is held empty, which collapses every
 * completion affordance on the page to its unstarted state.
 *
 * The card at the top used to read "33 chapters · nine parts" over a
 * button saying "Start the course", which is how a thing you enrol in
 * introduces itself. It points at the same first piece, but as the place
 * the writing started rather than as lesson one.
 */
export default function Contents() {
  const { progress, ready, resetProgress } = useProgress();

  const done = PROGRESS_ENABLED && ready ? progress.done : [];
  const pct = Math.round((done.length / CHAPTER_COUNT) * 100);

  // The first chapter not yet marked complete. Falls back to the very
  // first chapter for a reader who has not started.
  const resume = CHAPTERS.find((m) => !done.includes(m.slug)) ?? CHAPTERS[0];
  const started = done.length > 0;

  return (
    <>
      {/* ---- Continue / start ----------------------------------- */}
      <div className="card px-5 py-4 mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="label-ui mb-1" suppressHydrationWarning>
            {started
              ? `${done.length} of ${CHAPTER_COUNT} complete · ${pct}%`
              : 'Where I started'}
          </p>
          <p className="hand t-h2 leading-none" suppressHydrationWarning>
            {started ? resume.title : 'What wine actually is'}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Link
            href={`/course/${started ? resume.slug : CHAPTERS[0].slug}`}
            className="btn btn-primary"
            suppressHydrationWarning
          >
            {started ? 'Continue' : 'Read it'}
          </Link>
          {started && (
            <button
              className="btn"
              onClick={() => {
                if (confirm('Clear your reading progress?')) {
                  resetProgress();
                }
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ---- The parts ------------------------------------------ */}
      {PARTS.map((part) => {
        const mods = chaptersInPart(part.slug);
        const partDone = mods.filter((m) => done.includes(m.slug)).length;

        return (
          <section key={part.slug} className="mb-12">
            <div className="flex items-baseline gap-3 mb-1">
              <span
                className="hand t-h1 leading-none"
                style={{ color: 'var(--wine)' }}
              >
                {part.numeral}
              </span>
              <h2 className="hand t-h2 leading-none">{part.title}</h2>
              {PROGRESS_ENABLED && (
                <span
                  className="label-ui ml-auto shrink-0"
                  style={{ color: 'var(--gold)' }}
                  suppressHydrationWarning
                >
                  {partDone}/{mods.length}
                </span>
              )}
            </div>
            <HandRule width={230} className="mb-3" />

            <p
              className="t-ui italic mb-4 max-w-[34rem]"
              style={{ color: 'var(--ink-soft)' }}
            >
              {part.blurb}
            </p>

            <ol className="grid gap-2 sm:grid-cols-2">
              {mods.map((m) => {
                const isDone = done.includes(m.slug);
                return (
                  <li key={m.slug}>
                    <Link
                      href={`/course/${m.slug}`}
                      className="card px-4 py-3 flex items-baseline gap-3 h-full"
                      style={{
                        borderColor: isDone ? 'var(--gold)' : 'var(--rule)',
                      }}
                    >
                      <span
                        className="hand t-h3 leading-none shrink-0"
                        style={{
                          color: isDone ? 'var(--gold)' : 'var(--ink-faint)',
                          minWidth: '1.6rem',
                        }}
                        suppressHydrationWarning
                      >
                        {isDone ? '✓' : m.n}
                      </span>
                      <span className="min-w-0">
                        <span className="block t-base leading-snug">
                          {m.title}
                        </span>
                        <span
                          className="label-ui"
                          style={{ letterSpacing: '0.08em' }}
                        >
                          {m.minutes} min
                        </span>
                      </span>
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
