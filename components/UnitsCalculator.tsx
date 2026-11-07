'use client';

import { useState } from 'react';

/**
 * Standard drinks calculator.
 *
 * Converts a pour - volume and strength - into the number of standard
 * drinks it represents in each of four countries, because the same glass
 * of wine is a different number depending on who is counting.
 *
 * The point it exists to make: a generous restaurant pour of a strong red
 * is roughly two and a half times the 10 g reference unit,
 * which is why counting glasses is misleading.
 */

/** Grams of pure alcohol in one standard drink, by country. */
const STANDARDS = [
  { id: 'nz', label: 'New Zealand / Australia', grams: 10 },
  { id: 'fr', label: 'France', grams: 10 },
  { id: 'uk', label: 'United Kingdom', grams: 8 },
  { id: 'us', label: 'United States', grams: 14 },
];

/** Common pours, offered as shortcuts. */
const PRESETS = [
  { label: 'Tasting pour', ml: 100, abv: 12 },
  { label: 'Small glass', ml: 125, abv: 13 },
  { label: 'Restaurant pour', ml: 175, abv: 14 },
  { label: 'Large glass', ml: 250, abv: 14 },
  { label: 'Full bottle', ml: 750, abv: 13.5 },
  { label: 'Glass of Port', ml: 75, abv: 20 },
];

/** The density of ethanol, needed to convert millilitres to grams. */
const ETHANOL_DENSITY = 0.789;

export default function UnitsCalculator() {
  const [ml, setMl] = useState(175);
  const [abv, setAbv] = useState(14);

  // Grams of pure alcohol = volume x strength x density.
  const grams = ml * (abv / 100) * ETHANOL_DENSITY;

  return (
    <div className="card px-5 py-5 my-6 max-w-[38rem]">
      <h3 className="hand t-h3 leading-none mb-1">How much is that, really?</h3>
      <p className="t-caption mb-5" style={{ color: 'var(--ink-soft)' }}>
        Set a pour and see what it actually amounts to.
      </p>

      {/* Presets ------------------------------------------------- */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className="chip"
            aria-pressed={ml === p.ml && abv === p.abv}
            onClick={() => {
              setMl(p.ml);
              setAbv(p.abv);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Inputs -------------------------------------------------- */}
      <div className="grid gap-x-8 sm:grid-cols-2 mb-5">
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1.5">
            <label htmlFor="units-ml" className="t-ui">
              Volume
            </label>
            <span className="label-ui" style={{ color: 'var(--gold)' }}>
              {ml} ml
            </span>
          </div>
          <input
            id="units-ml"
            type="range"
            className="ink-range"
            min={25}
            max={750}
            step={5}
            value={ml}
            onChange={(e) => setMl(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1.5">
            <label htmlFor="units-abv" className="t-ui">
              Strength
            </label>
            <span className="label-ui" style={{ color: 'var(--gold)' }}>
              {abv.toFixed(1)}%
            </span>
          </div>
          <input
            id="units-abv"
            type="range"
            className="ink-range"
            min={4}
            max={24}
            step={0.5}
            value={abv}
            onChange={(e) => setAbv(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Result -------------------------------------------------- */}
      <div
        className="px-4 py-3 mb-4"
        style={{
          background: 'color-mix(in srgb, var(--wine) 7%, transparent)',
          borderLeft: '3px solid var(--wine)',
        }}
      >
        <p className="!mb-0 t-base">
          That is{' '}
          <strong className="hand t-h2" style={{ color: 'var(--wine)' }}>
            {grams.toFixed(1)} g
          </strong>{' '}
          of pure alcohol.
        </p>
      </div>

      <table className="ledger">
        <thead>
          <tr>
            <th>Counted in</th>
            <th>One drink is</th>
            <th>This pour is</th>
          </tr>
        </thead>
        <tbody>
          {STANDARDS.map((s) => (
            <tr key={s.id}>
              <td>{s.label}</td>
              <td style={{ color: 'var(--ink-soft)' }}>{s.grams} g</td>
              <td>
                <strong style={{ color: 'var(--gold)' }}>
                  {(grams / s.grams).toFixed(1)}
                </strong>{' '}
                <span style={{ color: 'var(--ink-soft)' }}>
                  {grams / s.grams === 1 ? 'drink' : 'drinks'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* This used to print the New Zealand weekly and per-occasion limits.
          Converting a pour into units is arithmetic; telling somebody how
          many they should have is not the job of this site. */}
      <p className="t-caption mt-4" style={{ color: 'var(--ink-soft)' }}>
        The same pour is a different number of drinks in each row. Nothing
        about the wine changes - only who is counting.
      </p>
    </div>
  );
}
