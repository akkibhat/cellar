'use client';

import { tintOf } from '@/lib/wineTint';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  photoFor,
  LEVEL_NOTE,
  STATUS_COLOUR,
  STATUS_LABEL,
  TYPE_LABEL,
  courseLinksFor,
  fullName,
  grapesFor,
  labelNote,
  placeOf,
  profileFor,
  stars,
  tastingNote,
  statusFor,
  windowFor,
  type CellarWine,
} from '@/lib/cellar';

/**
 * One wine, opened up.
 *
 * A panel rather than a page because a bottle is something you glance
 * into and close again, not somewhere you navigate to - and because 22
 * wines do not justify 22 routes.
 *
 * The organising rule here is attribution. Four different kinds of claim
 * appear in this panel and they are not equally reliable:
 *
 *   about this wine   Cellarion's registry, for the two wines that have it
 *   about the grape   true of the variety anywhere, not of this bottle
 *   off the label     what I read on the bottle
 *   mine              my rating, my note
 *
 * They get separate sections with their own headings, and the grape
 * section says out loud that it is not about the bottle. That is not
 * excessive caution: on the two wines where both levels exist, the grape
 * predicted only a third and a sixth of the actual flavours. Blending
 * them into one tidy list would be inventing a tasting note.
 */
export default function WineDetail({
  wine,
  drunk,
  onClose,
}: {
  wine: CellarWine;
  drunk: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  const year = new Date().getFullYear();
  const profile = profileFor(wine);
  const grapes = grapesFor(wine);
  const links = courseLinksFor(wine);
  const note = labelNote(wine);
  const mine = tastingNote(wine);
  const win = windowFor(wine);
  const status = statusFor(wine, year);

  /* Escape closes, and the panel takes focus on open so a keyboard user
     lands inside it rather than back at the top of the grid. */
  useEffect(() => {
    /* preventScroll, because focusing an element scrolls it into view and
       this one is a tall panel in a fixed overlay - the browser was
       scrolling the page behind it to reach something already on screen,
       so opening the first card jumped the grid to the middle. */
    panel.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* The page behind must not scroll while the panel is open, or a phone
     scrolls the grid instead of the panel's own overflow. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Rendered into <body> rather than where it sits in the tree.
     A `fixed` element resolves against the viewport only while no ancestor
     has a transform, filter, contain or translate - any of which silently
     makes itself the containing block. The page-arrival animation put a
     translate on <main>, and the overlay stopped being 100vh and started
     being the full height of the page, 8000px down. Portalling to body
     means no ancestor can do that again, whatever gets styled later. */
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(0, 0, 0, 0.45)' }}
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={fullName(wine)}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-[40rem] max-h-[92vh] overflow-y-auto outline-none"
      >
        {/* ---- Who it is ------------------------------------------- */}
        <header
          className="px-5 sm:px-7 pt-6 pb-5 flex items-start gap-4 wine-ground"
          data-wine={tintOf(wine.type)}
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          {photoFor(wine) && (
            <div
              className="wine-plate shrink-0 flex items-end justify-center"
              data-wine={tintOf(wine.type)}
              style={{ width: 'clamp(5.5rem, 22vw, 8.5rem)', height: 'clamp(8rem, 32vw, 12rem)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoFor(wine)}
                alt={`${fullName(wine)} bottle`}
                style={{ height: '92%', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="label-ui mb-1.5">
              {drunk ? 'Tasted' : 'Still here'}
            </p>
            <h2 className="hand t-h2 leading-[1.05]">
              {fullName(wine)}
              {wine.vintage && <span className="nums"> {wine.vintage}</span>}
            </h2>
            <p className="t-caption mt-2" style={{ color: 'var(--ink-soft)' }}>
              {[
                TYPE_LABEL[wine.type],
                placeOf(wine),
                wine.country,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="t-lead leading-none px-2 py-1 shrink-0"
            style={{ color: 'var(--ink-faint)' }}
          >
            &times;
          </button>
        </header>

        <div className="px-5 sm:px-7 py-6 flex flex-col gap-7">
          {/* ---- Mine ----------------------------------------------

              Only when there is something of mine to show. It used to
              render regardless and fill itself with "No tasting note yet",
              which put an absence at the top of every panel and pushed the
              wine's actual details below it. A heading over nothing is
              worse than no heading. */}
          {(wine.rating !== undefined || mine) && (
            <Section title="Mine" level="mine">
              {wine.rating !== undefined && (
                <p
                  className="t-lead nums"
                  style={{ color: 'var(--gold)', letterSpacing: '0.1em' }}
                >
                  {stars(wine.rating)}{' '}
                  <span className="t-caption" style={{ color: 'var(--ink-soft)' }}>
                    {wine.rating} out of 5
                  </span>
                </p>
              )}
              {mine && (
                <p
                  className={`t-base leading-relaxed${
                    wine.rating !== undefined ? ' mt-2' : ''
                  }`}
                >
                  {mine}
                </p>
              )}
            </Section>
          )}

          {/* ---- What was on the bottle ---------------------------- */}
          {note && (
            <Section title="Off the label" level="label">
              <p className="t-base leading-relaxed">{note}</p>
            </Section>
          )}

          {/* ---- When to drink it ---------------------------------- */}
          {!drunk && (
            <Section
              divider
              title="When to open it"
              level="estimate"
              note={win?.curated ? 'From the registry' : LEVEL_NOTE.estimate}
            >
              {/* The verdict is what this section is for, and as a line of
                  body text it read like a caption. Given the status colour
                  as a tinted field it carries the weight the section has. */}
              <div
                className="inline-flex items-baseline gap-2.5 rounded px-3 py-2"
                style={{
                  background: 'color-mix(in srgb, var(--status) 12%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--status) 35%, transparent)',
                  ['--status' as string]: STATUS_COLOUR[status],
                }}
              >
                <span
                  className="t-lead"
                  style={{ color: 'var(--status)', fontWeight: 600 }}
                >
                  {STATUS_LABEL[status]}
                </span>
                {win && (
                  <span className="nums t-ui" style={{ color: 'var(--ink-soft)' }}>
                    {win.from}&ndash;{win.to}
                  </span>
                )}
              </div>
              {/* A curated window is somebody's judgement; an inferred one
                  is arithmetic on an archetype. Saying which is which is the
                  difference between a reference and a guess. */}
              <p className="t-caption mt-1" style={{ color: 'var(--ink-faint)' }}>
                {win?.curated
                  ? null
                  : 'Worked out from the wine’s style and vintage rather than from a critic.'}
              </p>
              {win?.curated && wine.maturity?.note && (
                <p className="t-base mt-3">{wine.maturity.note}</p>
              )}
            </Section>
          )}

          {/* ---- The registry's own profile, where there is one ----- */}
          {profile && (
            <Section title="About this wine" level="wine">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-4">
                <Measure name="Body" value={profile.body} />
                <Measure name="Tannin" value={profile.tannin} />
                <Measure name="Acidity" value={profile.acidity} />
                <Measure name="Sweetness" value={profile.sweetness} />
              </div>

              <p className="t-base leading-relaxed mb-4">
                {profile.description}
              </p>

              <ChipRow label="Tastes of" items={profile.flavours} />
              <ChipRow label="Goes with" items={profile.foodPairings} />

            </Section>
          )}

          {/* ---- The grape, kept firmly separate ------------------- */}
          {grapes.length > 0 && (
            <Section
              title={grapes.length > 1 ? 'The grapes' : 'The grape'}
              level="grape"
            >
              {!profile && (
                <p
                  className="t-caption mb-4 leading-relaxed"
                  style={{ color: 'var(--ink-faint)' }}
                >
                  No profile for this wine yet, so this is the variety in
                  general.
                </p>
              )}

              <div className="flex flex-col gap-5">
                {grapes.map((g) => (
                  <div key={g.name}>
                    <p className="t-base">
                      <a
                        href={g.facts.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--pounamu)' }}
                      >
                        {g.name}
                      </a>
                      <span
                        className="t-caption"
                        style={{ color: 'var(--ink-faint)' }}
                      >
                        {' '}
                        &middot; {g.facts.origin}
                      </span>
                    </p>

                    <ChipRow label="" items={g.facts.characteristics} />

                    <p
                      className="t-caption mt-1.5"
                      style={{ color: 'var(--ink-soft)' }}
                    >
                      Ageing: {g.facts.ageing}
                      {g.facts.synonyms.length > 0 && (
                        <> &middot; also called {g.facts.synonyms.join(', ')}</>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ---- Back into the course ------------------------------ */}
          {links.length > 0 && (
            <Section title="Read about it" level="mine" note={null} divider>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((l) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    className="t-ui"
                    style={{
                      color: 'var(--wine)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ===================================================================== *
 * Pieces
 * ===================================================================== */

/**
 * A block of claims, headed by who is making them.
 *
 * The level caption is the point of the component - it is what stops a
 * fact about Pinot Noir reading as a fact about this Pinot Noir.
 */
function Section({
  title,
  level,
  note: noteOverride,
  divider = false,
  children,
}: {
  title: string;
  level: keyof typeof LEVEL_NOTE;
  /** Overrides the level's note, or drops it entirely with null. */
  note?: string | null;
  /** Starts a new band - see the panel's ordering note. */
  divider?: boolean;
  children: React.ReactNode;
}) {
  /* Every level already has a sentence saying where its content came from;
     only the grape one was ever shown. Showing them all is the whole
     hierarchy: the panel mixes what I thought, what is printed on the
     bottle, what the registry holds and what this site worked out, and
     read as one stack they all carry the same authority.

     Where the note would only repeat the heading - "Mine" under "Mine",
     "About this wine" under "About this wine" - it is left off. */
  const note = noteOverride === undefined ? LEVEL_NOTE[level] : noteOverride;
  const showNote = !!note && note.toLowerCase() !== title.toLowerCase();

  return (
    <section
      className={divider ? 'pt-7 border-t' : undefined}
      style={divider ? { borderColor: 'var(--rule)' } : undefined}
    >
      <div className="flex items-baseline justify-between gap-3 mb-2.5">
        <h3 className="label-ui" style={{ color: 'var(--ink)' }}>
          {title}
        </h3>
        {showNote && (
          <span className="t-micro italic" style={{ color: 'var(--ink-faint)' }}>
            {note}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

/** One structural reading - body, tannin, acidity, sweetness. */
/**
 * The steps each measure runs through, low end first.
 *
 * All four are ordinal, and printed as bare words they could only be read
 * one at a time - "medium, low, high, dry" tells you nothing about the
 * shape of the wine until you have parsed all four. Drawn on their scale
 * they can be taken in at a glance and compared against the next bottle.
 *
 * Sweetness is included even though it is not a quality: dry to sweet is
 * still an order, and it is the axis people most often want placed.
 */
const SCALES: Record<string, string[]> = {
  Body: ['light', 'medium', 'full'],
  Tannin: ['low', 'medium', 'high'],
  Acidity: ['low', 'medium', 'high'],
  Sweetness: ['dry', 'off-dry', 'medium', 'sweet'],
};

function Measure({ name, value }: { name: string; value: string | null }) {
  /* A measure the registry has not set is left out rather than shown
     empty: Paritua's Pinot Gris has no tannin figure, and a blank under a
     heading reads as a value of none. */
  if (!value) return null;

  const scale = SCALES[name] ?? [];
  /* An unrecognised wording still gets its word - the registry is free to
     say something this list has not met, and a missing pip row is better
     than a wrong one. */
  const at = scale.indexOf(value.trim().toLowerCase());

  return (
    <div>
      <p className="t-micro" style={{ color: 'var(--ink-faint)' }}>
        {name}
      </p>
      <p className="t-base capitalize leading-tight">{value}</p>
      {at >= 0 && (
        <span
          className="flex gap-0.5 mt-1.5"
          role="img"
          aria-label={`${value}, step ${at + 1} of ${scale.length}`}
        >
          {scale.map((_, i) => (
            <span
              key={i}
              style={{
                height: 3,
                flex: 1,
                borderRadius: 2,
                background: i <= at ? 'var(--wine)' : 'var(--rule)',
              }}
            />
          ))}
        </span>
      )}
    </div>
  );
}

/** A line of tags set as running text, optionally introduced by a word. */
function ChipRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <p className="t-ui leading-relaxed mt-2">
      {label && (
        <span className="mr-2" style={{ color: 'var(--ink-faint)' }}>
          {label}
        </span>
      )}
      {items.join(' \u00b7 ')}
    </p>
  );
}
