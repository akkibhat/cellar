'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from './Logo';
import ThemeToggle from './ThemeToggle';
import { LOCKUP } from '@/lib/mark';
import { isToolRoute } from '@/lib/tools';

/**
 * The top navigation bar: Home, Cellarbook and Cellardoor, plus the theme
 * switch.
 *
 * Deliberately just three links. The course's chapter list has nothing to
 * do with a rack of bottles, and wrapping the cellar in it made the cellar
 * read as a subsection of the course instead of the other half of the site.
 */

/* Nav glyph size. The lift below is derived from it, so they cannot
   disagree the way two hardcoded 17s eventually would. */
const GLYPH = 19;

/**
 * Home, as a glyph.
 *
 * Deliberately a pitched roof rather than an arch. The other two links
 * wear arch marks, and an arch here would read as a third brand sitting
 * next to the two real ones - worse, as a second door. A plain house is
 * interface furniture, which is what this link is.
 *
 * Same 24 box, 1.7 stroke and round caps as the theme switch, so the two
 * drawn things in the bar are drawn the same way.
 */
function HomeIcon({ size = GLYPH }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      {/* Roof, eaves overhanging the walls by a little so it reads as a
          roof and not as a triangle balanced on a box. */}
      <path d="M3.1 10.9 12 3.6l8.9 7.3" />
      {/* Walls, stopping under the eaves. */}
      <path d="M5.4 9.1v11.3h13.2V9.1" />
      {/* The door. Squared off, again to stay clear of the arch. */}
      <path d="M9.9 20.4v-5.1h4.2v5.1" />
    </svg>
  );
}

/* Book before door, matching the front door, where Cellarbook is the
   left-hand card. The two orders disagreeing made the pair feel like two
   lists rather than one. */
const LINKS = [
  { href: '/', label: 'Home', variant: null },
  { href: '/course', label: 'Cellarbook', variant: 'book' as const },
  { href: '/cellar', label: 'Cellardoor', variant: 'door' as const },
];

/** The sticky bar itself, lighting the link for the section you're in. */
export default function CellarNav() {
  const pathname = usePathname();
  /* trailingSlash: true means this arrives as '/course/', which would never
     equal '/course'. Strip the trailing slash once, here. */
  const route = pathname.replace(/\/+$/, '') || '/';

  /* Inside a chapter, the Cellarbook link goes back to that chapter's row
     in the index and not to the top of it, the same as "All chapters" in
     the chapter's own rail. */
  const chapter = /^\/course\/([^/]+)$/.exec(route)?.[1];

  return (
    <nav
      aria-label="Sections"
      className="sunk border-b sticky top-0 z-30"
      style={{ borderColor: 'var(--rule)', height: 'var(--nav-h)' }}
    >
      <div className="nav-frame h-full flex items-center gap-1">
        {LINKS.map((l) => {
          /* The cellar's own link stays lit anywhere inside it, so you can
             always see which half you are in. Cellarbook does the same for
             its index, every chapter and the tool pages, which all belong
             to the book. Home only lights on an exact match. */
          const active =
            l.href === '/cellar'
              ? route.startsWith('/cellar')
              : l.href === '/course'
                ? route.startsWith('/course') || isToolRoute(route)
                : route === l.href;

          /* The mark colours itself from its variant, so the bar only
             needs the accent for the word beside it. */
          const accent =
            l.variant === 'door' ? 'var(--logo-door)' : 'var(--wine)';

          return (
            <Link
              key={l.href}
              href={l.href === '/course' && chapter ? `/course/#${chapter}` : l.href}
              aria-current={active ? 'page' : undefined}
              className="tap flex items-center gap-2 px-3 py-1.5 rounded"
              style={{
                background: active ? 'var(--paper-raised)' : undefined,
                color: active ? 'var(--ink)' : 'var(--ink-soft)',
              }}
            >
              {l.variant ? (
                <LogoMark
                  size={GLYPH}
                  variant={l.variant}
                  decorative
                  style={{ transform: `translateY(${-GLYPH * LOCKUP.lift}px)` }}
                />
              ) : (
                <HomeIcon />
              )}
              {/* The two halves wear their wordmark here as everywhere
                  else; Home is interface, so it stays in the UI face.
                  `color: inherit` because `.wordmark` sets its own ink,
                  which would light the inactive links as brightly as the
                  active one. */}
              <span
                className={l.variant ? 'wordmark' : 't-ui'}
                style={{
                  fontSize: 'var(--t-ui)',
                  fontWeight: active ? 600 : 400,
                  color: 'inherit',
                }}
              >
                {l.variant ? (
                  <>
                    Cellar
                    <span style={{ color: accent }}>{l.variant}</span>
                  </>
                ) : (
                  l.label
                )}
              </span>
            </Link>
          );
        })}

        {/* Must sit inside the flex row, not beside it: as a sibling of the
            row it gets no flex context, ml-auto does nothing and the switch
            drops onto its own line at the far left. */}
        <ThemeToggle className="ml-auto" />
      </div>
    </nav>
  );
}
