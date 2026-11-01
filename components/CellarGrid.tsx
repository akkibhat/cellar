'use client';

import { useMemo, useState } from 'react';
import WineDetail from './WineDetail';
import { tintOf } from '@/lib/wineTint';
import {
  CELLAR,
  TASTED,
  TYPE_LABEL,
  fullName,
  photoFor,
  placeOf,
  stars,
  statusFor,
  STATUS_SHORT,
  STATUS_COLOUR,
  type CellarWine,
} from '@/lib/cellar';

/* The year the windows are judged against. Read once so every card on the
   page agrees, rather than each asking the clock separately. */
const YEAR = new Date().getFullYear();

/**
 * The wines, as a grid of cards.
 *
 * An earlier version drew this as a wall of vaulted bins, which was the
 * wrong picture: it represented physical storage that does not exist, so
 * the bins could not mean anything and their numbering promised an order
 * there was none of. This is a collection rather than a cellar - what has
 * been drunk and what was thought of it - and a collection is looked at
 * rather than navigated.
 *
 * Owned and drunk are one list with a filter, because two bottles on
 * their own read as an empty page and "what have I had" is a single
 * question.
 *
 * The photograph is the card. An earlier version drew a filled silhouette
 * for a bottle still here and an outlined one for a bottle drunk, which
 * worked only for as long as there were no photographs: you cannot hollow
 * out a photograph. So it moved to a pill over the image.
 *
 * The pill says one thing: still here, or drunk. It used to carry the
 * drinking window instead - "drink up", "too young" - which is a lot of
 * state to read across a grid, applies to two of the twenty-three cards,
 * and competed with the section accent for the same green. A window is a
 * reason to open something rather than a fact about it, so it belongs in
 * the panel where that is being decided.
 */

type Filter = 'all' | 'cellar' | 'tasted';

/* Bottle glass, by wine. Deliberately outside the token set: these read
   as the colour of the liquid rather than as brand, and this is the only
   place in the app where that is true. */
const GLASS: Record<CellarWine['type'], string> = {
  red: '#6d1f2b',
  white: '#c8a33f',
  'rosé': '#d98a86',
  sparkling: '#d9c168',
  dessert: '#b3762a',
  fortified: '#5a2a20',
};

/** A Bordeaux silhouette in a 24x72 box: straight sides, sharp shoulder. */
const BOTTLE = 'M4,70 V30 C4,26 8,24 8,20 V6 h8 V20 C16,24 20,26 20,30 V70 Z';

type Entry = { wine: CellarWine; drunk: boolean };

export default function CellarGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Entry | null>(null);

  const all = useMemo<Entry[]>(
    () => [
      ...CELLAR.map((w) => ({ wine: w, drunk: false })),
      ...TASTED.map((w) => ({ wine: w, drunk: true })),
    ],
    [],
  );

  const shown = all.filter(
    (x) =>
      filter === 'all' ||
      (filter === 'cellar' && !x.drunk) ||
      (filter === 'tasted' && x.drunk),
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-5">
        <Chip on={filter === 'all'} onClick={() => setFilter('all')}>
          Everything &middot; {all.length}
        </Chip>
        <Chip on={filter === 'cellar'} onClick={() => setFilter('cellar')}>
          Still here &middot; {CELLAR.length}
        </Chip>
        <Chip on={filter === 'tasted'} onClick={() => setFilter('tasted')}>
          Tasted &middot; {TASTED.length}
        </Chip>
      </div>

      <ul className="grid grid-cols-1 min-[26rem]:grid-cols-2 lg:grid-cols-3 gap-3">
        {shown.map((x, i) => (
          <li key={`${fullName(x.wine)}-${x.wine.vintage}-${i}`}>
            <WineCard entry={x} onOpen={() => setOpen(x)} />
          </li>
        ))}
      </ul>

      {open && (
        <WineDetail
          wine={open.wine}
          drunk={open.drunk}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

/**
 * One wine.
 *
 * Where there is no photograph yet, the bottle silhouette stands in,
 * coloured by what was in it. That is not decoration filling a hole - it
 * still carries the one fact a glance should give you, which is what kind
 * of wine it was.
 */
function WineCard({ entry, onOpen }: { entry: Entry; onOpen: () => void }) {
  const { wine, drunk } = entry;
  const colour = GLASS[wine.type];
  const photo = photoFor(wine);

  /* For a bottle already drunk, the shelf fact is all there is to say. For
     one still here, where it sits in its drinking window is the more useful
     answer - it is the thing that should make you act, and it was only
     visible after opening the panel. */
  const status = drunk ? null : statusFor(wine, YEAR);
  const pill =
    drunk || !status || status === 'unknown'
      ? { text: drunk ? 'Tasted' : 'Still here', colour: drunk ? 'var(--ink-faint)' : 'var(--accent)' }
      : { text: STATUS_SHORT[status], colour: STATUS_COLOUR[status] };

  return (
    <button
      onClick={onOpen}
      className="card h-full w-full flex flex-col overflow-hidden text-left"
    >
      {/* ---- The picture -------------------------------------- */}
      <div
        className="relative w-full wine-plate"
        data-wine={tintOf(wine.type)}
        style={{
          aspectRatio: '3 / 4',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        {photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photo}
            alt={`${fullName(wine)} bottle`}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: 'contain', padding: '8%' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width={34}
              height={102}
              viewBox="0 0 24 72"
              aria-hidden="true"
              style={{ display: 'block', maxHeight: '70%' }}
            >
              <path d={BOTTLE} fill={colour} />
            </svg>
          </div>
        )}

        {/* It rides over the image, because the image is the card now and
            there is no longer a silhouette to hollow out. */}
        <span
          className="label-ui absolute top-2 left-2 px-2 py-0.5 rounded-full"
          style={{
            background: 'var(--paper-raised)',
            border: '1px solid var(--rule)',
            color: pill.colour,
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
          }}
        >
          {pill.text}
        </span>
      </div>

      {/* ---- The facts ---------------------------------------- */}
      <div className="px-3.5 py-3 flex flex-col flex-1">
        <p className="t-base leading-tight">
          {fullName(wine)}
          {wine.vintage && <span className="nums"> {wine.vintage}</span>}
        </p>

        {/* The type already had a colour - GLASS, which until now only
            tinted the silhouette drawn when a bottle has no photograph.
            Carried onto the card it sorts the grid by eye, and it sits on
            the type rather than on the whole card so a wall of reds does
            not turn into a wall of red. */}
        <p className="t-caption mt-1" style={{ color: 'var(--ink-soft)' }}>
          {/* Inline rather than a flex child: as a flex child it centred on
              the whole wrapped block and floated between lines. In the text
              flow it sits on the first line, where it belongs. */}
          <span
            aria-hidden="true"
            className="rounded-full"
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              marginRight: 6,
              verticalAlign: '0.08em',
              background: colour,
            }}
          />
          {[TYPE_LABEL[wine.type], placeOf(wine)].filter(Boolean).join(' · ')}
        </p>

        {wine.grapes?.length ? (
          <p className="t-caption" style={{ color: 'var(--ink-faint)' }}>
            {wine.grapes.join(', ')}
          </p>
        ) : null}

        {/* Pushed to the bottom so the cards' bottom lines agree even
            when names run to different depths. */}
        <div className="mt-auto pt-2.5">
          {/* An unrated wine gets blank space rather than five empty
              pips, which read as a score of nought out of five. The
              height is held so the cards' bottom lines still agree. */}
          {wine.rating !== undefined ? (
            <p
              className="t-caption nums"
              style={{ color: 'var(--gold)', letterSpacing: '0.08em' }}
              title={`${wine.rating} out of 5`}
            >
              {stars(wine.rating)}
            </p>
          ) : (
            <p className="t-caption" aria-hidden="true">
              &nbsp;
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className="t-caption px-3 py-1 rounded-full"
      style={{
        border: `1px solid ${on ? 'var(--pounamu)' : 'var(--rule-strong)'}`,
        background: on ? 'var(--pounamu)' : 'transparent',
        color: on ? 'var(--paper-raised)' : 'var(--ink-soft)',
      }}
    >
      {children}
    </button>
  );
}
