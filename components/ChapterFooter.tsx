'use client';

import Link from 'next/link';
import type { Chapter } from '@/lib/types';
import { useProgress } from '@/lib/storage';
import { PROGRESS_ENABLED } from '@/lib/config';

/**
 * The end of a chapter: a control to mark it finished, and links to the
 * chapters either side of it.
 *
 * The completion control is deliberately manual rather than triggered by
 * scrolling to the bottom. Scroll-based completion marks things read that
 * were only scrolled past, which makes the progress figure meaningless.
 *
 * With PROGRESS_ENABLED off the control is not rendered at all, leaving
 * the footer as pure navigation.
 */
export default function ChapterFooter({
  slug,
  prev,
  next,
}: {
  slug: string;
  prev?: Chapter;
  next?: Chapter;
}) {
  const { progress, ready, toggleDone } = useProgress();
  const done = PROGRESS_ENABLED && ready && progress.done.includes(slug);

  return (
    <footer className="mt-12">
      {PROGRESS_ENABLED && (
      <div className="card px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="hand t-h3 leading-none mb-0.5">
            {done ? 'Finished' : 'Finished this one?'}
          </p>
          <p className="t-caption" style={{ color: 'var(--ink-soft)' }}>
            {done
              ? 'Marked complete in your progress.'
              : 'Marking it keeps your progress honest.'}
          </p>
        </div>
        <button
          className={done ? 'btn' : 'btn btn-primary'}
          onClick={() => toggleDone(slug)}
          suppressHydrationWarning
        >
          {done ? '✓ Complete - undo' : 'Mark complete'}
        </button>
      </div>
      )}

      <nav
        className="flex flex-wrap gap-3 justify-between"
        aria-label="Chapter navigation"
      >
        {prev ? (
          <Link
            href={`/course/${prev.slug}`}
            className="card px-4 py-3 flex-1 min-w-[14rem]"
          >
            <span className="label-ui">← Previous chapter</span>
            <span className="hand t-h3 block leading-tight mt-0.5">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1 min-w-[14rem]" />
        )}

        {next ? (
          <Link
            href={`/course/${next.slug}`}
            className="card px-4 py-3 flex-1 min-w-[14rem] text-right"
          >
            <span className="label-ui">Next chapter →</span>
            <span className="hand t-h3 block leading-tight mt-0.5">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="card px-4 py-3 flex-1 min-w-[14rem] text-right"
          >
            <span className="label-ui">The end →</span>
            <span className="hand t-h3 block leading-tight mt-0.5">
              Back to contents
            </span>
          </Link>
        )}
      </nav>
    </footer>
  );
}
