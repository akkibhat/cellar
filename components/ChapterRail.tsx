'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Heading } from '@/lib/headings';

/**
 * The left rail of a chapter: the sections of this chapter, the one you
 * are in marked, then the other chapters of the same part, then a way back
 * to the full contents.
 *
 * It replaces the permanent 25-chapter sidebar on chapter pages. That list
 * answered "what else is in the book" on every screen and left no answer
 * to the question a long chapter actually raises, which is "where am I in
 * this one". The whole book is still one click away through the contents.
 *
 * The marked section follows the scroll: the last heading that has passed
 * a line a little below the top of the screen.
 */
export default function ChapterRail({
  headings,
  siblings,
  currentSlug,
  partTitle,
}: {
  headings: Heading[];
  siblings: { slug: string; title: string }[];
  currentSlug: string;
  partTitle?: string;
}) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;

    const onScroll = () => {
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 140) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  return (
    <nav className="rail" aria-label="In this chapter">
      {headings.length > 0 && (
        <>
          <p className="rail__label">In this chapter</p>
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  aria-current={active === h.id ? 'location' : undefined}
                  className="rail__link"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {siblings.length > 1 && (
        <div className="rail__sibs">
          <p className="rail__label rail__label--gap">
            {partTitle ? `Also in ${partTitle}` : 'Also in this part'}
          </p>
          <ul>
            {siblings
              .filter((s) => s.slug !== currentSlug)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={`/course/${s.slug}`} className="rail__link rail__link--sib">
                    {s.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      <Link href="/course/#contents" className="rail__all">
        All chapters &rarr;
      </Link>
    </nav>
  );
}
