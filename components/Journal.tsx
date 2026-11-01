'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useJournal, type TastingNote } from '@/lib/storage';

/**
 * The saved tasting journal.
 *
 * Notes are listed newest first. Two or more can be pinned side by side
 * for comparison, which is the whole reason for keeping structured notes
 * rather than free text - the numbers line up and the differences are
 * visible at a glance.
 */

const COLOUR_LABELS: Record<TastingNote['colour'], string> = {
  red: 'Red',
  white: 'White',
  rose: 'Rosé',
  sparkling: 'Sparkling',
};

/** The word scales, mirrored from the tasting tool for display. */
const SCALES = {
  intensity: ['Closed', 'Discreet', 'Open', 'Aromatic', 'Powerful'],
  tannin: ['Silky', 'Rounded', 'Firm', 'Structured', 'Astringent'],
  acidity: ['Soft', 'Rounded', 'Fresh', 'Crisp', 'Racy'],
  body: ['Light', 'Medium-light', 'Medium', 'Medium-full', 'Full'],
  sweetness: ['Bone dry', 'Dry', 'Off-dry', 'Medium sweet', 'Sweet'],
};

export default function Journal() {
  const { notes, ready, deleteNote } = useJournal();
  const [compare, setCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) =>
    setCompare((cur) =>
      cur.includes(id)
        ? cur.filter((x) => x !== id)
        : // Cap the comparison at three, beyond which the table stops
          // fitting on any reasonable screen.
          cur.length >= 3
          ? [...cur.slice(1), id]
          : [...cur, id],
    );

  const compared = notes.filter((n) => compare.includes(n.id));

  if (!ready) {
    return <p className="label-ui py-8">Loading your notes…</p>;
  }

  if (notes.length === 0) {
    return (
      <div className="card px-6 py-8 text-center">
        <p className="hand t-h2 mb-2">Nothing saved yet</p>
        <p className="mb-5 max-w-[26rem] mx-auto" style={{ color: 'var(--ink-soft)' }}>
          Notes you save from the guided tasting appear here, kept in this
          browser only.
        </p>
        <Link href="/taste" className="btn btn-primary">
          Taste something
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ---- Comparison table ----------------------------------- */}
      {compared.length >= 2 && (
        <div className="card px-5 py-4 mb-6 overflow-x-auto">
          <p className="hand t-h3 leading-none mb-3">Side by side</p>
          <table className="ledger" style={{ minWidth: '32rem' }}>
            <thead>
              <tr>
                <th>Measure</th>
                {compared.map((n) => (
                  <th key={n.id}>{n.wine || 'Untitled'}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Type" values={compared.map((n) => COLOUR_LABELS[n.colour])} />
              <Row label="Intensity" values={compared.map((n) => SCALES.intensity[n.intensity])} />
              <Row
                label="Tannin"
                values={compared.map((n) =>
                  n.colour === 'red' ? SCALES.tannin[n.tannin] : '—',
                )}
              />
              <Row label="Acidity" values={compared.map((n) => SCALES.acidity[n.acidity])} />
              <Row label="Body" values={compared.map((n) => SCALES.body[n.body])} />
              <Row label="Sweetness" values={compared.map((n) => SCALES.sweetness[n.sweetness])} />
              <Row label="Length" values={compared.map((n) => `${n.length} caudalies`)} />
              <Row label="Rating" values={compared.map((n) => '★'.repeat(n.rating))} />
            </tbody>
          </table>
        </div>
      )}

      <p className="label-ui mb-3">
        {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        {compare.length > 0 && ` · ${compare.length} selected to compare`}
        {compare.length === 1 && ' - pick one more'}
      </p>

      {/* ---- The notes ------------------------------------------ */}
      <div className="space-y-3">
        {notes.map((n) => {
          const selected = compare.includes(n.id);
          return (
            <article
              key={n.id}
              className="card px-5 py-4"
              style={{ borderColor: selected ? 'var(--wine)' : 'var(--rule)' }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                <h2 className="hand t-h2 leading-none">
                  {n.wine || 'Untitled glass'}
                </h2>
                <span className="label-ui shrink-0">
                  {COLOUR_LABELS[n.colour]} ·{' '}
                  {new Date(n.savedAt).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <p className="italic t-base mb-2">{n.prose}</p>

              {n.comment && (
                <p className="t-ui mb-2" style={{ color: 'var(--ink-soft)' }}>
                  {n.comment}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                <span className="hand t-h3" style={{ color: 'var(--gold)' }}>
                  {'★'.repeat(n.rating)}
                  <span style={{ color: 'var(--rule-strong)' }}>
                    {'★'.repeat(5 - n.rating)}
                  </span>
                </span>

                <button
                  className="chip chip--block"
                  aria-pressed={selected}
                  onClick={() => toggleCompare(n.id)}
                >
                  {selected ? 'Comparing' : 'Compare'}
                </button>

                <button
                  className="label-ui ml-auto"
                  style={{ color: 'var(--ink-faint)' }}
                  onClick={() => {
                    if (confirm('Delete this note?')) deleteNote(n.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/** One row of the comparison table. */
function Row({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td style={{ color: 'var(--ink-soft)' }}>{label}</td>
      {values.map((v, i) => (
        <td key={i}>{v}</td>
      ))}
    </tr>
  );
}
