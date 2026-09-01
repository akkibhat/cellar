'use client';

import { useMemo, useState } from 'react';
import { GRAPES } from '@/lib/grapes';
import type { Grape } from '@/lib/types';

/**
 * The grape explorer.
 *
 * Filter by colour and climate, search by name or alias, and sort by any
 * of the three structural scales. The sorting is the pedagogically useful
 * part: ordering the whites by acidity produces almost exactly the order
 * of how well they handle food and how long they will live, which is a
 * point the grape chapters make in prose and this makes visible.
 */

type Sort = 'name' | 'body' | 'acidity' | 'tannin';

const SORTS: { id: Sort; label: string }[] = [
  { id: 'name', label: 'A–Z' },
  { id: 'body', label: 'Body' },
  { id: 'acidity', label: 'Acidity' },
  { id: 'tannin', label: 'Tannin' },
];

const CLIMATES = ['cool', 'moderate', 'warm'] as const;

export default function GrapeExplorer({
  compact = false,
  only,
}: {
  /** Embedded in a chapter rather than shown as the full page. */
  compact?: boolean;
  /**
   * Lock the explorer to one colour and hide the colour control. The grape
   * chapters embed it this way: the white chapter should not offer reds.
   */
  only?: 'white' | 'red';
}) {
  const [query, setQuery] = useState('');
  const [colour, setColour] = useState<'all' | 'white' | 'red'>(only ?? 'all');
  const [climates, setClimates] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('name');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = GRAPES.filter((g) => {
      if (colour !== 'all' && g.colour !== colour) return false;
      if (climates.length && !climates.includes(g.climate)) return false;
      if (!q) return true;
      // Search name, aliases, homes and aroma cues together.
      const hay = [g.name, ...(g.aliases ?? []), ...g.homes, ...g.aromas]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });

    // Structural sorts run highest-first, since "show me the most tannic"
    // is the question people actually have.
    return [...filtered].sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : b[sort] - a[sort],
    );
  }, [query, colour, climates, sort]);

  const toggleClimate = (c: string) =>
    setClimates((cur) =>
      cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c],
    );

  return (
    <div className={compact ? 'my-6' : ''}>
      {/* ---- Controls ------------------------------------------- */}
      <div className="card px-5 py-4 mb-5">
        <input
          className="ink-input mb-4"
          placeholder="Search a grape, a region, an aroma…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search grape varieties"
        />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {!only && (
            <Group label="Colour">
              {(['all', 'white', 'red'] as const).map((c) => (
                <button
                  key={c}
                  className="chip"
                  aria-pressed={colour === c}
                  onClick={() => setColour(c)}
                >
                  {c === 'all' ? 'All' : c === 'white' ? 'White' : 'Red'}
                </button>
              ))}
            </Group>
          )}

          <Group label="Climate">
            {CLIMATES.map((c) => (
              <button
                key={c}
                className="chip"
                aria-pressed={climates.includes(c)}
                onClick={() => toggleClimate(c)}
              >
                {c}
              </button>
            ))}
          </Group>

          <Group label="Sort by">
            {/* Every white carries the same tannin value, so that sort
                does nothing once the explorer is locked to them. */}
            {(only === 'white' ? SORTS.filter((s) => s.id !== 'tannin') : SORTS).map((s) => (
              <button
                key={s.id}
                className="chip"
                aria-pressed={sort === s.id}
                onClick={() => setSort(s.id)}
              >
                {s.label}
              </button>
            ))}
          </Group>
        </div>
      </div>

      <p className="label-ui mb-3">
        {results.length} {results.length === 1 ? 'variety' : 'varieties'}
        {sort !== 'name' && ` - most ${sort} first`}
      </p>

      {/* ---- Results -------------------------------------------- */}
      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((g) => (
          <GrapeCard
            key={g.slug}
            grape={g}
            open={openSlug === g.slug}
            onToggle={() => setOpenSlug(openSlug === g.slug ? null : g.slug)}
          />
        ))}
      </div>

      {results.length === 0 && (
        <p className="italic py-8" style={{ color: 'var(--ink-soft)' }}>
          Nothing matches. Try clearing a filter.
        </p>
      )}
    </div>
  );
}

/** A labelled cluster of filter chips. */
function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-ui">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/** One variety, expanding on click to show the full note. */
function GrapeCard({
  grape,
  open,
  onToggle,
}: {
  grape: Grape;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="card px-4 py-3.5"
      style={{ borderColor: open ? 'var(--wine)' : 'var(--rule)' }}
    >
      <button
        className="w-full text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="hand t-h3 leading-none">{grape.name}</h3>
          <span
            className="label-ui shrink-0"
            style={{
              color: grape.colour === 'red' ? 'var(--wine)' : 'var(--gold)',
            }}
          >
            {grape.climate}
          </span>
        </div>

        {grape.aliases && (
          <p
            className="t-caption italic mt-0.5"
            style={{ color: 'var(--ink-faint)' }}
          >
            also {grape.aliases.join(', ')}
          </p>
        )}

        <p
          className="t-caption mt-1.5"
          style={{ color: 'var(--ink-soft)' }}
        >
          {grape.homes.join(' · ')}
        </p>

        {/* Structure meters */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
          <Meter label="Body" value={grape.body} />
          <Meter label="Acid" value={grape.acidity} />
          {grape.colour === 'red' && <Meter label="Tannin" value={grape.tannin} />}
        </div>
      </button>

      {open && (
        <div
          className="mt-3.5 pt-3.5"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div className="flex flex-wrap gap-1.5 mb-3">
            {grape.aromas.map((a) => (
              <span
                key={a}
                className="chip"
                style={{ cursor: 'default', pointerEvents: 'none' }}
              >
                {a}
              </span>
            ))}
          </div>
          <p className="t-ui mb-3">{grape.note}</p>
          <p className="t-caption" style={{ color: 'var(--ink-soft)' }}>
            <strong style={{ color: 'var(--wine)' }}>Try this: </strong>
            {grape.tryThis}
          </p>
        </div>
      )}
    </div>
  );
}

/** A 1-5 bar meter with a label. */
function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-ui" style={{ letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span className="meter" role="img" aria-label={`${label} ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= value ? 'on' : ''} />
        ))}
      </span>
    </div>
  );
}
