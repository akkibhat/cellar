'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PARTS } from '@/lib/content/parts';
import { CHAPTER_COUNT, chaptersInPart } from '@/lib/content/course';
import { useProgress } from '@/lib/storage';
import { PROGRESS_ENABLED, SECTIONS, sectionFor } from '@/lib/config';
import Logo from './Logo';
import CellarNav from './CellarNav';

/**
 * The application shell: the top bar (CellarNav) on every page except the
 * landing page, plus, on the tool pages, a sidebar listing the course and
 * the tools.
 *
 * The sidebar is sticky on desktop and collapses behind a button below
 * 1024px, where it becomes an overlay drawer.
 */

/**
 * The standalone tool pages listed in the sidebar. They all count as
 * course-side, which is what `sectionFor` says too.
 */
const TOOL_GROUPS: {
  label: string;
  tools: { href: string; label: string }[];
}[] = [
  {
    /* Things you look something up in. */
    label: 'Reference',
    tools: [
      { href: '/glossary', label: 'Glossary' },
      { href: '/grapes', label: 'Grape explorer' },
      { href: '/aromas', label: 'Aroma wheel' },
      { href: '/temperature', label: 'Serving temperature' },
    ],
  },
  {
    /* Things you use with a glass in front of you. */
    label: 'With a glass',
    tools: [
      { href: '/taste', label: 'Guided tasting' },
      { href: '/journal', label: 'Tasting journal' },
      { href: '/units', label: 'Standard drinks' },
    ],
  },
];

/** Wraps every page in the right navigation for its route. */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress, ready } = useProgress();
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * Every navigation link closes the mobile drawer, so tapping a chapter
   * does not leave the overlay covering the page you just opened. Done on
   * click rather than by watching the pathname, because reacting to a
   * route change with setState causes a second render pass.
   */
  const closeDrawer = () => setDrawerOpen(false);

  /**
   * Which half of the site is on screen. The sidebar wordmark swaps its
   * suffix and accent to match, so the shell tells you where you are.
   */
  const here = SECTIONS[sectionFor(pathname)];

  /* Chapters finished, and that as a percentage for the progress bar. */
  const doneCount = ready ? progress.done.length : 0;
  const pct = Math.round((doneCount / CHAPTER_COUNT) * 100);

  /**
   * The landing page renders bare: its job is to show the two halves, so
   * it shouldn't sit inside either one's navigation.
   *
   * This must stay after every hook, so the hook order is the same on all
   * branches.
   */
  if (pathname === '/') return <>{children}</>;

  /* trailingSlash is on, so a route arrives as "/brand/" and would never
     equal "/brand". Compare on the trimmed path. */
  const route = pathname.replace(/\/+$/, '') || '/';

  /* These routes get the top bar only, no sidebar: a chapter has its own
     rail, the course index is the contents itself, the cellar is the other
     half of the site, and /brand and /design are reference sheets. */
  const isChapter = route.startsWith('/course/') || route === '/course';
  if (isChapter || route.startsWith('/cellar') || route === '/brand' || route === '/design') {
    return (
      <>
        <CellarNav />
        <main key={pathname} className="min-w-0 page-in">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      {/* The sidebar sticks below the bar: --nav-h is the bar's height, set
          on :root in globals.css and used by CellarNav too, so the offset
          can't drift from the bar it's offsetting. */}
      <CellarNav />
      <div className="lg:grid lg:grid-cols-[16.5rem_1fr] lg:min-h-[calc(100vh_-_var(--nav-h))]">
      {/* ---- Mobile top bar -------------------------------------- */}
      <div
        className="lg:hidden flex items-center justify-end px-5 py-2 sunk border-b"
        style={{ borderColor: 'var(--rule)' }}
      >
        <button
          className="btn"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-expanded={drawerOpen}
          aria-controls="course-nav"
        >
          {drawerOpen ? 'Close' : 'Contents'}
        </button>
      </div>

      {/* ---- Sidebar --------------------------------------------- */}
      <nav
        id="course-nav"
        aria-label="Course contents"
        className={[
          'sunk border-r overflow-y-auto',
          'lg:sticky lg:top-[var(--nav-h)] lg:h-[calc(100vh_-_var(--nav-h))] lg:block',
          drawerOpen ? 'block' : 'hidden',
        ].join(' ')}
        style={{ borderColor: 'var(--rule)' }}
      >
        {/* Wordmark, desktop only (on mobile the top bar already names the
            halves). It links to the book's contents, not the front door:
            a mark reading Cellarbook should land you in Cellarbook, and the
            bar above has Home for leaving. */}
        <div
          className="hidden lg:block px-6 pt-6 pb-4 border-b"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Link
            href="/course"
            className="block"
            aria-label="Cellarbook contents"
            style={{
              ['--logo-word' as string]: here.accent,
              ['--logo-page' as string]: here.accent,
            }}
          >
            <Logo size={30} suffix={here.suffix} />
          </Link>
          <p className="label-ui mt-2">{here.label}</p>
        </div>

        {/* Progress summary. Rendered only once storage has loaded, so
            the server and first client render agree. Hidden entirely
            while PROGRESS_ENABLED is off. */}
        {PROGRESS_ENABLED && (
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="label-ui">Progress</span>
            <span
              className="label-ui"
              style={{ color: 'var(--gold)' }}
              suppressHydrationWarning
            >
              {ready ? `${doneCount} / ${CHAPTER_COUNT}` : `— / ${CHAPTER_COUNT}`}
            </span>
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: 'var(--rule)' }}
          >
            <div
              className="h-full"
              style={{
                width: ready ? `${pct}%` : '0%',
                background: 'var(--wine)',
                /* Slow on purpose: the bar is the only thing on screen
                   that should draw the eye when it moves. */
                transition: 'width var(--m-slow) var(--ease)',
              }}
            />
          </div>
        </div>
        )}

        {/* The course, grouped by part. */}
        <div className="px-3 py-4">
          {PARTS.map((part) => {
            const mods = chaptersInPart(part.slug);
            return (
              <div key={part.slug} className="mb-5">
                <div className="px-3 pb-1.5 flex items-baseline gap-2">
                  <span
                    className="hand t-base leading-none"
                    style={{ color: 'var(--wine)' }}
                  >
                    {part.numeral}
                  </span>
                  <span className="label-ui">{part.title}</span>
                </div>
                {mods.map((m) => {
                  /* No "current chapter" highlight: on a chapter page the
                     sidebar isn't shown at all (see the early return above). */
                  const done =
                    PROGRESS_ENABLED && ready && progress.done.includes(m.slug);
                  return (
                    <Link
                      key={m.slug}
                      href={`/course/${m.slug}`}
                      onClick={closeDrawer}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded transition-colors"
                      style={{ color: 'var(--ink-soft)' }}
                    >
                      <span
                        className="shrink-0 rounded-full"
                        style={{
                          width: 7,
                          height: 7,
                          background: done ? 'var(--gold)' : 'var(--rule-strong)',
                        }}
                        suppressHydrationWarning
                      />
                      <span className="t-ui leading-snug">
                        {m.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}

          {/* Tools, in two groups: something to look up, or something to
              use with a glass. */}
          {TOOL_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <span
              className="label-ui block px-3 pb-1.5"
              style={{ color: SECTIONS.course.accent }}
            >
              {group.label}
            </span>
            {group.tools.map((t) => {
              const active = route === t.href;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={closeDrawer}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded"
                  style={{
                    background: active ? 'var(--paper-raised)' : undefined,
                    color: active ? 'var(--ink)' : 'var(--ink-soft)',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span
                    className="shrink-0 rounded-full"
                    style={{
                      width: 7,
                      height: 7,
                      background: active
                        ? SECTIONS.course.accent
                        : 'var(--rule-strong)',
                    }}
                  />
                  <span className="t-ui">{t.label}</span>
                </Link>
              );
            })}
          </div>
          ))}

        </div>
      </nav>

        {/* ---- Page content -------------------------------------- */}
        <main key={pathname} className="min-w-0 page-in">
          {children}
        </main>
      </div>
    </>
  );
}

