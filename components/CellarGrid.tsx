'use client';

import { useMemo, useState, type ReactNode } from 'react';
import WineDetail from './WineDetail';
import { SILHOUETTE_FILL as GLASS, SILHOUETTE_PATH as BOTTLE } from '@/lib/bottleSilhouette';
import {
  CELLAR,
  TASTED,
  TYPE_LABEL,
  fullName,
  photoFor,
  placeOf,
  stars,
  type CellarWine,
} from '@/lib/cellar';

/**
 * The cellar, set as a shelf.
 *
 * Every wine stands at full height on a band in the colour of what is in
 * it: reds on garnet, whites on straw, and the rosé and sweet wines on
 * blush. It reads like a wine rack, and the colour of the wine is the
 * structure of the page rather than a tint behind a card.
 *
 * An earlier version was a grid of identical cards, small photographs in a
 * narrow column. The photograph is the best thing here, so the card has
 * gone: the bottle stands on the band at a size you can read the label,
 * with its name, producer and vintage beneath it, and opens into the same
 * panel as before.
 *
 * The two bottles still in the cellar carry a "Still here" tag, and the
 * filter above narrows the shelf to them or to the tasted ones; a band
 * with nothing left in it is not drawn.
 *
 * Where there is no photograph yet, the bottle silhouette stands in at the
 * same height, coloured by what was in it. That is not decoration filling
 * a hole - it still carries the one fact a glance should give you.
 *
 * `children` is the page's own introduction, set beside the filter in the
 * head, so the filter and the words that explain it sit together.
 */

type Filter = 'all' | 'cellar' | 'tasted';

type Entry = { wine: CellarWine; drunk: boolean };

/**
 * The bands, in shelf order. Reds and whites are the two the cellar is
 * mostly made of and get a band each; everything else (rosé, sweet,
 * sparkling, fortified) shares the third, named from whatever is in it.
 * Colours are fixed on purpose: they are the wine, so they do not follow
 * the light or dark theme the way the paper does.
 */
const BANDS: {
  key: 'red' | 'white' | 'other';
  bg: string;
  ink: string;
  tint: 'red' | 'white' | 'rose';
  match: (t: CellarWine['type']) => boolean;
}[] = [
  { key: 'red', bg: '#5b1a2a', ink: '#e6d79a', tint: 'red', match: (t) => t === 'red' },
  { key: 'white', bg: '#e6d79a', ink: '#5b1a2a', tint: 'white', match: (t) => t === 'white' },
  { key: 'other', bg: '#e8b7ae', ink: '#5b1a2a', tint: 'rose', match: (t) => t !== 'red' && t !== 'white' },
];

/** "Rosé and sweet": the third band's name, from what is actually in it. */
function otherLabel(entries: Entry[]): string {
  const kinds = [...new Set(entries.map((e) => TYPE_LABEL[e.wine.type]))];
  return kinds.map((k, i) => (i === 0 ? k : k.toLowerCase())).join(' and ');
}

/** The places in a band, in order of first appearance, for its caption. */
function placesLine(entries: Entry[]): string {
  const places = [
    ...new Set(entries.map((e) => placeOf(e.wine)).filter((p): p is string => Boolean(p))),
  ];
  return places.slice(0, 5).join(', ');
}

export default function CellarGrid({ children }: { children?: ReactNode }) {
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
      {/* ---- The head ------------------------------------------- */}
      <header className="index-head">
        <h1 className="index-title">
          Cellar<span style={{ color: 'var(--logo-door)' }}>door</span>
        </h1>
        <div className="index-intro">
          {children}
          <div className="index-tools">
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
        </div>
      </header>

      {/* ---- The shelf ------------------------------------------ */}
      {BANDS.map((band) => {
        const here = shown.filter((x) => band.match(x.wine.type));
        if (here.length === 0) return null;
        const label =
          band.key === 'red' ? 'Reds' : band.key === 'white' ? 'Whites' : otherLabel(here);

        return (
          <section
            key={band.key}
            className="shelf"
            aria-labelledby={`shelf-${band.key}`}
            data-wine={band.tint}
          >
            <div className="shelf__head" style={{ background: band.bg, color: band.ink }}>
              <span className="shelf__numeral" aria-hidden="true">
                {here.length}
              </span>
              <h2 id={`shelf-${band.key}`} className="shelf__title">
                {label}
              </h2>
              <p className="shelf__blurb">{placesLine(here)}</p>
            </div>

            <ul className="shelf__row" style={{ borderBottomColor: band.bg }}>
              {here.map((x, i) => (
                <li key={`${fullName(x.wine)}-${x.wine.vintage}-${i}`}>
                  <Bottle entry={x} onOpen={() => setOpen(x)} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

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
 * One bottle on the shelf: the photograph, then what it is.
 *
 * The name is the wine's, with the producer and vintage under it, which is
 * the order a label reads in. The rating, where there is one, sits last
 * and an unrated wine simply has no line, since five empty pips read as a
 * score of nought.
 */
function Bottle({ entry, onOpen }: { entry: Entry; onOpen: () => void }) {
  const { wine, drunk } = entry;
  const photo = photoFor(wine);
  /* The wine's own name, not fullName: that prefixes the producer, which
     the line beneath already gives, so the two read as one repeated label.
     A wine named the same as its producer (a château's own wine) shows once. */
  const name = wine.wine;
  const byline = wine.producer !== wine.wine ? wine.producer : '';

  return (
    <button onClick={onOpen} className="bottle" aria-label={`${name}${wine.vintage ? ' ' + wine.vintage : ''}, open details`}>
      {photo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={photo} alt="" loading="lazy" className="bottle__img" />
      ) : (
        <svg
          className="bottle__img bottle__img--blank"
          viewBox="0 0 24 72"
          aria-hidden="true"
        >
          <path d={BOTTLE} fill={GLASS[wine.type]} />
        </svg>
      )}

      {!drunk && <span className="bottle__tag">Still here</span>}
      <span className="bottle__name">{name}</span>
      <span className="bottle__sub">
        {[byline, wine.vintage].filter(Boolean).join(' ')}
      </span>
      {wine.rating !== undefined && (
        <span className="bottle__stars nums" title={`${wine.rating} out of 5`}>
          {stars(wine.rating)}
        </span>
      )}
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
    <button onClick={onClick} aria-pressed={on} className="chip chip--tab">
      {children}
    </button>
  );
}
