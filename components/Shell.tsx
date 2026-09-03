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
 * The application shell: a persistent sidebar carrying the whole course as
 * a progress checklist, plus the tools, wrapped around the page content.
 *
 * The sidebar is the main navigation on desktop and collapses behind a
 * button below 1024px, where it becomes an overlay drawer.
 */

/**
 * The standalone tools.
 *
 * These were split into "Course tools" and "The cellar" on the grounds
 * that one set is looked up while reading and the other is used with a
 * glass in front of you. That split has stopped earning its place: the
 * cellar has its own half of the site and its own navigation now, so the
 * sidebar no longer has to advertise it - and all seven of these are the
 * same kind of thing, a page you keep open beside whatever you are doing.
 *
 * They are course-side, which is what `sectionFor` says and what the
 * sidebar around them already was.
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
   * Which half of the site is on screen. The wordmark swaps its suffix and
   * its accent to match, so the shell itself tells you where you are -
   * which is the whole reason the two halves are separately named.
   */
  const here = SECTIONS[sectionFor(pathname)];

  const doneCount = ready ? progress.done.length : 0;
  const pct = Math.round((doneCount / CHAPTER_COUNT) * 100);

  /**
   * The landing page renders bare. It is the one route whose job is to
   * show that there are two halves, and wrapping it in one half's
   * navigation would answer the question before it was asked.
   *
   * This sits after every hook, so the hook order is identical on both
   * branches and React stays happy.
   */
  if (pathname === '/') return <>{children}</>;

  /* The cellar is the other half of the site, not a subsection of the
     course, so it does not get the course's sidebar. What it does share
     is the bar across the top: the three-link switcher is how you move
     between halves, and having it on only one of them meant the course
     could be left through the browser's back button alone.

     So CellarNav sits above both, and the course keeps its sidebar under
     it. The sidebar is sticky, and now sticks below the bar rather than
     under it. --nav-h is the bar's own height, set on :root in
     globals.css and used by CellarNav to size itself, so the offset here
     cannot drift away from the thing it is offsetting. */
  /* The brand page is a reference sheet rather than part of the reading,
     so the chapter sidebar beside it would be furniture belonging to
     something else. It keeps the bar across the top, which is how you
     leave. */
  /* trailingSlash is on, so a route arrives as "/brand/" and an equality
     test against "/brand" silently never matches. Compare on the trimmed
     path. */
  const route = pathname.replace(/\/+$/, '') || '/';
  if (route.startsWith('/cellar') || route === '/brand' || route === '/design') {
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
      <CellarNav />
      <div className="lg:grid lg:grid-cols-[16.5rem_1fr] lg:min-h-[calc(100vh_-_var(--nav-h))]">
      {/* ---- Mobile top bar -------------------------------------- */}
      <div
        className="lg:hidden flex items-center justify-end px-5 py-2 sunk border-b"
        style={{ borderColor: 'var(--rule)' }}
      >
        {/* The wordmark that used to sit here is in the bar above now,
            where it is also a link home. Two of them, one above the
            other, was the same thing said twice. */}
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
        {/* Wordmark, desktop only - mobile has it in the top bar.

            It goes to the book's own contents rather than to the front
            door: this is the book's sidebar, and a mark reading Cellarbook
            should land you in Cellarbook. The bar above already has Home
            for leaving entirely. */}
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
                  const active = pathname === `/course/${m.slug}`;
                  const done =
                    PROGRESS_ENABLED && ready && progress.done.includes(m.slug);
                  return (
                    <Link
                      key={m.slug}
                      href={`/course/${m.slug}`}
                      onClick={closeDrawer}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded transition-colors"
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
                          background: done
                            ? 'var(--gold)'
                            : active
                              ? 'var(--wine)'
                              : 'var(--rule-strong)',
                          boxShadow: active
                            ? '0 0 0 3px var(--stain)'
                            : undefined,
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

          {/* Tools, in two groups. Seven in one list read as a pile;
              split, the heading says which question each one answers -
              something to look up, or something to use with a glass. */}
          {TOOL_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <span
              className="label-ui block px-3 pb-1.5"
              style={{ color: SECTIONS.course.accent }}
            >
              {group.label}
            </span>
            {group.tools.map((t) => {
              const active = pathname === t.href;
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

