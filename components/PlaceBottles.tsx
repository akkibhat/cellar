'use client';

import { useState } from 'react';
import WineDetail from './WineDetail';
import { SILHOUETTE_FILL, SILHOUETTE_PATH } from '@/lib/bottleSilhouette';
import { bottlesFor, photoFor, stars, type CellarWine } from '@/lib/cellar';

/**
 * The end of a place chapter: the bottles in the cellar from there.
 *
 * A wine already links to its chapter; this is the other direction, from
 * chapter to bottles. Opening one uses the same detail panel as the shelf,
 * and it's styled like a piece of the Cellardoor shelf, with the edge the
 * bottles stand on in the place's colour. Draws nothing when no bottle
 * belongs to the chapter.
 */
type Field = { bg: string; ink: string };

/** The "Bottles from here" row for chapter `slug`. */
export default function PlaceBottles({
  slug,
  field,
}: {
  slug: string;
  /** The colours of the chapter's part: a place takes a colour of wine. */
  field: Field;
}) {
  const [open, setOpen] = useState<{ wine: CellarWine; drunk: boolean } | null>(null);
  const bottles = bottlesFor(slug);
  if (bottles.length === 0) return null;

  return (
    <section
      className="place no-print"
      aria-labelledby="place-h"
      style={{ ['--place-bg' as string]: field.bg, ['--place-ink' as string]: field.ink }}
    >
      <header className="place__head">
        <p className="place__kicker">In the cellar</p>
        <h2 id="place-h" className="place__title">
          Bottles from here
        </h2>
        <p className="place__blurb">
          {bottles.length === 1
            ? 'One wine I have opened or still hold from this chapter. Open it for the grape, what it goes with, and what I made of it.'
            : `${bottles.length} wines I have opened or still hold from this chapter. Open one for the grape, what it goes with, and what I made of it.`}
        </p>
      </header>

      <ul className="place__row">
        {bottles.map((b, i) => {
          const { wine, drunk } = b;
          const photo = photoFor(wine);
          const byline = wine.producer !== wine.wine ? wine.producer : '';
          return (
            <li key={`${wine.producer}-${wine.wine}-${wine.vintage}-${i}`}>
              <button
                type="button"
                className="bottle"
                onClick={() => setOpen(b)}
                aria-label={`${wine.wine}${wine.vintage ? ' ' + wine.vintage : ''}, open details`}
              >
                {photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={photo} alt="" loading="lazy" className="bottle__img" />
                ) : (
                  /* No photograph yet: the silhouette the shelf uses, in the colour of the wine. */
                  <svg className="bottle__img bottle__img--blank" viewBox="0 0 24 72" aria-hidden="true">
                    <path d={SILHOUETTE_PATH} fill={SILHOUETTE_FILL[wine.type]} />
                  </svg>
                )}
                {!drunk && <span className="bottle__tag">Still here</span>}
                <span className="bottle__name">{wine.wine}</span>
                <span className="bottle__sub">
                  {[byline, wine.vintage].filter(Boolean).join(' ')}
                </span>
                {wine.rating !== undefined && (
                  <span className="bottle__stars nums" title={`${wine.rating} out of 5`}>
                    {stars(wine.rating)}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <WineDetail wine={open.wine} drunk={open.drunk} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
