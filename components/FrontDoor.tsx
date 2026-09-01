'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import HandRule from './HandRule';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { OWNER, SECTIONS } from '@/lib/config';
import {
  BOOK_STATE,
  bottle,
  interpolate,
  LOCKUP,
  pathsFor,
} from '@/lib/mark';

/**
 * The landing page's masthead and its two doors.
 *
 * These live in one component because they are one mechanism: the mark
 * drifts slowly between the book and the door on its own, and the moment
 * the pointer lands on either card the loop yields and the masthead pins
 * to that half. So the mark advertises the system when nobody is doing
 * anything, and becomes a control the instant someone is.
 *
 * The animation runs on refs, not state. A tween at 60fps through
 * useState would re-render the whole subtree every frame for no benefit,
 * since the only things changing are four SVG attributes and two
 * opacities. The DOM is written directly instead.
 *
 * The first frame is the book state, rendered identically on the server,
 * so there is nothing to reconcile on hydration.
 */

/* Timings. The hover response is deliberately much faster than the
   drift - it is a reply to something the reader did, and matching it to
   the loop speed makes it feel broken rather than calm. */
/**
 * The masthead mark's rendered height. The lockup's gap and wordmark are
 * both derived from it through `LOCKUP`, so this is the only number to
 * change if the masthead grows.
 */
const MARK = 50;

const TWEEN = 1100; // travelling between the two states
const DWELL = 2800; // held at each end before drifting back
const GRAB = 420; // hover response
const GRACE = 1000; // stillness after the pointer leaves

export default function FrontDoor() {
  const coverRef = useRef<SVGPathElement>(null);
  const pageRef = useRef<SVGPathElement>(null);
  const spineRef = useRef<SVGRectElement>(null);
  const holesRef = useRef<SVGPathElement>(null);
  const bookRef = useRef<HTMLSpanElement>(null);
  const doorRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<SVGSVGElement>(null);

  /* Where the mark is, 0 = book, 1 = door. A ref rather than state
     because nothing in React's tree depends on it. */
  const at = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let raf = 0;
    let loopTimer: ReturnType<typeof setTimeout> | undefined;
    let graceTimer: ReturnType<typeof setTimeout> | undefined;
    let held = false; // pointer is on a card, the loop yields
    let onscreen = true;
    let target = 0; // where the loop is heading next

    /** Write one interpolated frame straight to the DOM. */
    function paint(t: number) {
      const s = interpolate(t);
      const { cover, page } = pathsFor(s);
      coverRef.current?.setAttribute('d', cover);
      pageRef.current?.setAttribute('d', page);
      spineRef.current?.setAttribute('opacity', String(s.spine));
      holesRef.current?.setAttribute('opacity', String(s.holes));
      /* The page half is garnet in the book and pounamu in the door, so
         it travels between the two accents as the book closes. */
      pageRef.current?.setAttribute(
        'fill',
        t < 0.5 ? 'var(--wine)' : 'var(--pounamu)',
      );
      if (bookRef.current) bookRef.current.style.opacity = String(1 - t);
      if (doorRef.current) doorRef.current.style.opacity = String(t);
      at.current = t;
    }

    function animateTo(to: number, ms: number, done?: () => void) {
      cancelAnimationFrame(raf);
      if (reduced) {
        paint(to);
        done?.();
        return;
      }
      const from = at.current;
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        paint(from + (to - from) * k);
        if (k < 1) raf = requestAnimationFrame(step);
        else done?.();
      };
      raf = requestAnimationFrame(step);
    }

    /* The loop is suppressed whenever animating would be rude or
       pointless: reduced motion, the reader is pointing at a card, the
       mark is scrolled away, or the tab is in the background. */
    const wanted = () =>
      !reduced && !held && onscreen && !document.hidden;

    function scheduleLoop() {
      clearTimeout(loopTimer);
      if (!wanted()) return;
      loopTimer = setTimeout(() => {
        if (!wanted()) return;
        target = target ? 0 : 1;
        animateTo(target, TWEEN, scheduleLoop);
      }, DWELL);
    }

    function hoverHalf(v: number) {
      held = true;
      clearTimeout(loopTimer);
      clearTimeout(graceTimer);
      animateTo(v, GRAB);
    }

    /* The pause before resuming matters. Without it the mark twitches
       every time the pointer crosses a card on its way somewhere else;
       a beat of stillness lets that read as passing through rather than
       as an instruction. It resumes from wherever the mark actually is,
       so the next move is away from the half just looked at. */
    function release() {
      clearTimeout(graceTimer);
      graceTimer = setTimeout(() => {
        held = false;
        target = at.current > 0.5 ? 1 : 0;
        scheduleLoop();
      }, GRACE);
    }

    const cards = document.querySelectorAll<HTMLElement>('[data-half]');
    const enter = (e: Event) => {
      const half = (e.currentTarget as HTMLElement).dataset.half;
      hoverHalf(half === 'door' ? 1 : 0);
    };
    cards.forEach((c) => {
      c.addEventListener('mouseenter', enter);
      c.addEventListener('focusin', enter);
      c.addEventListener('mouseleave', release);
      c.addEventListener('focusout', release);
    });

    const io = new IntersectionObserver(
      (entries) => {
        onscreen = entries[0].isIntersecting;
        if (onscreen) scheduleLoop();
        else clearTimeout(loopTimer);
      },
      { threshold: 0.2 },
    );
    if (markRef.current) io.observe(markRef.current);

    const onVisibility = () =>
      document.hidden ? clearTimeout(loopTimer) : scheduleLoop();
    document.addEventListener('visibilitychange', onVisibility);

    scheduleLoop();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(loopTimer);
      clearTimeout(graceTimer);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      cards.forEach((c) => {
        c.removeEventListener('mouseenter', enter);
        c.removeEventListener('focusin', enter);
        c.removeEventListener('mouseleave', release);
        c.removeEventListener('focusout', release);
      });
    };
  }, []);

  const first = pathsFor(BOOK_STATE);

  return (
    <>
      {/* The landing page carries no bar - it is the one route whose job is
          to show that there are two halves - so the switch is pinned to the
          page rather than to the centred column, which is where it sits on
          every other route. */}
      <ThemeToggle className="fixed top-3 right-4 z-30" />

      {/* ---- Masthead ------------------------------------------- */}
      <header className="flex flex-col items-center text-center mb-10">
        <span
          className="hand"
          style={{
            fontSize: 30,
            lineHeight: 1,
            color: 'var(--wine)',
            transform: 'rotate(-3deg)',
            marginBottom: -2,
          }}
        >
          {OWNER}&rsquo;s
        </span>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: MARK * LOCKUP.gap,
          }}
        >
          <svg
            ref={markRef}
            height={MARK}
            viewBox="0 0 120 160"
            role="img"
            aria-label="Cellar"
            /* The masthead builds its own lockup so the mark can morph
               between the two halves, which meant it missed the optical
               lift Logo applies - see LOCKUP.lift for what the two offsets
               are and why one constant covers both. */
            style={{
              display: 'block',
              flex: 'none',
              transform: `translateY(${-MARK * LOCKUP.lift}px)`,
            }}
          >
            <defs>
              {/* The bottles are a mask rather than shapes filled with the
                  page colour, so the holes stay real on any surface. */}
              <mask id="door-holes">
                <rect x="0" y="0" width="120" height="160" fill="#fff" />
                <path
                  ref={holesRef}
                  fill="#000"
                  opacity={0}
                  d={`${bottle(49.5, 20)} ${bottle(74.5, 20)}`}
                />
              </mask>
            </defs>
            <g mask="url(#door-holes)">
              <path ref={coverRef} d={first.cover} fill="var(--logo-cover)" />
              <path ref={pageRef} d={first.page} fill="var(--wine)" />
            </g>
            <rect
              ref={spineRef}
              x={57.5}
              y={30}
              width={5}
              height={120}
              fill="var(--logo-cover)"
            />
          </svg>

          {/* Both suffixes occupy one grid cell, so one fades into the
              other without the root word sliding sideways as the widths
              differ. */}
          <span
            className="wordmark"
            style={{ fontSize: MARK * LOCKUP.word, lineHeight: 1 }}
          >
            Cellar
            <span style={{ display: 'inline-grid' }}>
              <span
                ref={bookRef}
                style={{ gridArea: '1/1', color: 'var(--wine)' }}
              >
                book
              </span>
              <span
                ref={doorRef}
                style={{ gridArea: '1/1', color: 'var(--pounamu)', opacity: 0 }}
              >
                door
              </span>
            </span>
          </span>
        </span>

        <HandRule width={220} className="mt-3" />

        <h1 className="t-lead leading-relaxed mt-4 max-w-[34rem]">
          One half is what I have learned. The other is what I have tasted.
        </h1>

        {/* France and New Zealand belongs to the Cellarbook card now -
            saying it here too repeated the same claim in near-identical
            words about thirty pixels apart. This also drops "a wine
            course", which was the phrase that made the page read as
            something to enrol in. */}
        <p
          className="t-base mt-2.5 max-w-[34rem]"
          style={{ color: 'var(--ink-soft)' }}
        >
          What I have worked out about wine, and the bottles it came from.
        </p>
      </header>

      {/* ---- The two halves --------------------------------------

          Both cards are written in the first person. The earlier copy
          listed counts - 33 chapters, 4 hours, 27 varieties - which are
          the dimensions of a product rather than the shape of a journey,
          and made the course read as something to enrol in.

          No live figures here on purpose. The cellar's real numbers move
          every time a bottle is opened, and a front door that says
          "fifteen tasted" is a dashboard rather than an invitation. */}
      <div className="grid gap-4 md:grid-cols-2">
        <Half
          which="course"
          blurb="I went looking for what was actually true about wine and wrote down what I found. Some of it corrected things I had believed for years. It is all here in case it saves you the same detours."
          lines={[
            'Where I started, and what I got wrong',
            'France and New Zealand, more than anywhere else',
            'What I am still unsure about, marked as such',
          ]}
          cta="Come along"
        />
        <Half
          which="cellar"
          blurb="What I bought, what I was poured, and what I wrote down before I forgot it."
          lines={[
            'What is on the shelf right now',
            'Everything I have tasted, and whether I would again',
            'When each one is worth opening',
          ]}
          caveat="New, so most of what I have tasted is missing. From here they go in as I taste them."
          cta="Have a look"
        />
      </div>
    </>
  );
}

/**
 * One of the two doors.
 *
 * `data-half` is what the masthead listens for, so the card does not
 * need to know the animation exists.
 */
function Half({
  which,
  blurb,
  lines,
  caveat,
  cta,
}: {
  which: 'course' | 'cellar';
  blurb: string;
  lines: string[];
  /** An admission, shown under the bullets. Optional: only the cellar
      has one, because only the cellar claims to be a record of
      something and is therefore capable of being incomplete. */
  caveat?: string;
  cta: string;
}) {
  const section = SECTIONS[which];
  const suffix = which === 'course' ? 'book' : 'door';

  return (
    <Link
      href={section.href}
      data-half={suffix}
      className="card px-6 py-6 flex flex-col"
      style={{ ['--accent' as string]: section.accent }}
    >
      <span className="label-ui" style={{ color: 'var(--accent)' }}>
        {which === 'course' ? 'Read' : 'Keep'}
      </span>

      {/* 31 gives a 24px word through LOCKUP.word, which is the size this
          card used before the mark joined it. */}
      <Logo size={31} suffix={suffix} className="mt-1.5 mb-2" />
      <HandRule width={130} className="mb-4" />

      <span className="t-base leading-relaxed" style={{ color: 'var(--ink)' }}>
        {blurb}
      </span>

      <ul className="mt-4 mb-6 space-y-1.5">
        {lines.map((line) => (
          <li key={line} className="flex items-baseline gap-2.5">
            <span
              className="shrink-0 rounded-full"
              style={{ width: 6, height: 6, background: 'var(--accent)' }}
              aria-hidden="true"
            />
            <span className="t-caption" style={{ color: 'var(--ink-soft)' }}>
              {line}
            </span>
          </li>
        ))}
      </ul>

      {caveat && (
        <span
          className="t-caption italic block -mt-2 mb-5"
          style={{ color: 'var(--ink-faint)' }}
        >
          {caveat}
        </span>
      )}

      {/* Pushed to the bottom so both cards' calls to action line up even
          when the blurbs differ in length. */}
      <span className="label-ui mt-auto" style={{ color: 'var(--accent)' }}>
        {cta} →
      </span>
    </Link>
  );
}
