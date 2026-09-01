'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from './Logo';
import ThemeToggle from './ThemeToggle';
import { LOCKUP } from '@/lib/mark';

/**
 * The cellar's own navigation.
 *
 * The course sidebar is wrong here. It carries thirty-three chapters and
 * the reference tools, none of which have anything to do with a rack of
 * bottles - and wrapping the cellar in the course's furniture made it
 * read as a subsection of the course rather than the other half of the
 * site.
 *
 * So this half gets three ways out and nothing else: back to the front
 * door, to the top of this half, or across to the other one. That is the
 * whole map, because the whole site is only three places deep.
 */

/* Book before door, matching the front door, where Cellarbook is the
   left-hand card. The two orders disagreeing made the pair feel like two
   lists rather than one. */
const LINKS = [
  { href: '/', label: 'Home', variant: null },
  { href: '/course', label: 'Cellarbook', variant: 'book' as const },
  { href: '/cellar', label: 'Cellardoor', variant: 'door' as const },
];

export default function CellarNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sections"
      className="sunk border-b sticky top-0 z-30"
      style={{ borderColor: 'var(--rule)', height: 'var(--nav-h)' }}
    >
      <div className="mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 h-full flex items-center gap-1">
        {LINKS.map((l) => {
          /* The cellar's own link stays lit anywhere inside it, so you can
             always see which half you are in; the others only light on an
             exact match. */
          const active =
            l.href === '/cellar'
              ? pathname.startsWith('/cellar')
              : pathname === l.href;

          /* The mark colours itself from its variant, so the bar only
             needs the accent for the word beside it. */
          const accent =
            l.variant === 'door' ? 'var(--logo-door)' : 'var(--wine)';

          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? 'page' : undefined}
              className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{
                background: active ? 'var(--paper-raised)' : undefined,
                color: active ? 'var(--ink)' : 'var(--ink-soft)',
              }}
            >
              {l.variant && (
                <LogoMark
                  size={17}
                  variant={l.variant}
                  decorative
                  style={{ transform: `translateY(${-17 * LOCKUP.lift}px)` }}
                />
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

        {/* Inside the centred row, not beside it: the nav itself is a block,
            so a sibling here got no flex context, ml-auto did nothing and
            the switch dropped onto its own line at the far left. In the row
            it aligns right against the same column the links use. */}
        <ThemeToggle className="ml-auto" />
      </div>
    </nav>
  );
}
