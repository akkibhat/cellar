'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Heading } from '@/lib/headings';
import { LAST_CHAPTER_KEY } from '@/lib/storage';

/**
 * The left rail of a chapter: the sections of this chapter, the one you
 * are in marked, then the other chapters of the same part, then a way back
 * to the full contents. It answers "where am I in this chapter", which a
 * full book sidebar can't; the whole book is one click away.
 *
 * The marked section follows the scroll: the last heading that has passed
 * a line 140px below the top of the screen.
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

  /* Remember which chapter this is, so the index can mark it when the
     reader comes back by the browser's back button, which restores the
     scroll position but carries no #chapter in the address. Kept in
     sessionStorage: it is a note for this visit, not a preference. */
  useEffect(() => {
    try {
      sessionStorage.setItem(LAST_CHAPTER_KEY, currentSlug);
    } catch {
      /* private mode or storage blocked: the highlight is a nicety */
    }
  }, [currentSlug]);

  /* Track which heading is current as the page scrolls. */
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;

    /* Mark the last heading whose top has passed 140px from the top. */
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

      <Link href={`/course/#${currentSlug}`} className="rail__all">
        All chapters &rarr;
      </Link>
    </nav>
  );
}
