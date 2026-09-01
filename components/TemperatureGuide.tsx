'use client';

import { useState } from 'react';

/**
 * Serving temperature reference.
 *
 * Styles are laid out along a shared 4-20 C scale so the relationships
 * are visible at a glance - in particular that the gap between a light
 * red and a full white is much smaller than most people assume, and that
 * the fridge and a heated room both sit outside the useful range.
 */

type Style = {
  name: string;
  /** Serving range in degrees Celsius. */
  min: number;
  max: number;
  note: string;
};

const STYLES: Style[] = [
  { name: 'Sparkling', min: 6, max: 8, note: 'Cold enough to hold the bead. Straight from the fridge is fine.' },
  { name: 'Sweet / dessert', min: 6, max: 9, note: 'Cold keeps the sugar from turning cloying.' },
  { name: 'Light, crisp white', min: 8, max: 10, note: 'Muscadet, Pinot Grigio, everyday Sauvignon Blanc.' },
  { name: 'Aromatic white', min: 9, max: 11, note: 'Riesling, Gewürztraminer. Too cold and the perfume disappears.' },
  { name: 'Full-bodied white', min: 11, max: 13, note: 'Oaked Chardonnay, white Bordeaux. Nearly as warm as a light red.' },
  { name: 'Rosé', min: 8, max: 11, note: 'Serious rosé rewards the warmer end of that.' },
  { name: 'Light red', min: 12, max: 14, note: 'Beaujolais, Loire Cabernet Franc, lighter Pinot Noir. Chill them.' },
  { name: 'Medium red', min: 14, max: 16, note: 'Most Pinot Noir, Sangiovese, Rhône blends.' },
  { name: 'Full red', min: 16, max: 18, note: 'Bordeaux, Barolo, Shiraz. 18°C is the ceiling, not the target.' },
  { name: 'Fortified', min: 12, max: 18, note: 'Fino cold, Port and Oloroso at the warm end.' },
];

/** The full span drawn on the scale. */
const SCALE_MIN = 4;
const SCALE_MAX = 22;

/** Convert a temperature into a percentage position along the scale. */
function pct(t: number) {
  return ((t - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
}

export default function TemperatureGuide() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div
      className="card px-5 py-5 my-6 max-w-[40rem]"
      /* The name and range columns are only as wide as their longest
         entry needs; everything else belongs to the scale, which is the
         part being read. */
      style={
        {
          '--temp-name': '8rem',
          '--temp-range': '3.6rem',
        } as React.CSSProperties
      }
    >
      <h3 className="hand t-h3 leading-none mb-1">Serving temperature</h3>
      <p className="t-caption mb-5" style={{ color: 'var(--ink-soft)' }}>
        Select a style for the reasoning. Note where the fridge and a heated
        room actually sit.
      </p>

      {/* Reference markers ---------------------------------------- */}
      {/* The rows below are `name | track | range`, and the scale belongs
          over the track alone - drawn across the whole card it ran past
          both ends of every bar it was supposed to be measuring. The two
          spacers hold the same widths the rows use. */}
      <div className="flex items-start gap-3">
        <span className="shrink-0" style={{ width: 'var(--temp-name)' }} />
        <div className="flex-1 min-w-0">
      <div className="relative h-5 mb-1">
        {/* Centring every label on its own temperature hangs the outer two
            half off the card, because 4 degrees is the left edge of the
            scale and 21 is the right. The ends anchor inward instead; only
            the middle one is centred. */}
        {[
          { t: 4, label: 'Fridge', anchor: 'start' },
          { t: 12, label: 'Cellar', anchor: 'middle' },
          { t: 21, label: 'Heated room', anchor: 'end' },
        ].map((m) => (
          <span
            key={m.label}
            className={`label-ui absolute whitespace-nowrap${
              m.anchor === 'middle' ? ' -translate-x-1/2' : ''
            }`}
            style={{
              ...(m.anchor === 'end'
                ? { right: `${100 - pct(m.t)}%` }
                : { left: `${pct(m.t)}%` }),
              color: 'var(--ink-faint)',
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div
        className="relative h-px mb-4"
        style={{ background: 'var(--rule-strong)' }}
      >
        {[4, 8, 12, 16, 20].map((t) => (
          <span
            key={t}
            className={`absolute t-micro${
              pct(t) > 0 ? ' -translate-x-1/2' : ''
            }`}
            style={{
              left: `${pct(t)}%`,
              top: 4,
              color: 'var(--ink-faint)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {t}°
          </span>
        ))}
      </div>
        </div>
        <span className="shrink-0" style={{ width: 'var(--temp-range)' }} />
      </div>

      {/* Style bars ----------------------------------------------- */}
      <div className="mt-6 space-y-1">
        {STYLES.map((s) => {
          const isOpen = open === s.name;
          return (
            <div key={s.name}>
              <button
                className="w-full text-left py-1.5 group"
                onClick={() => setOpen(isOpen ? null : s.name)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="t-ui shrink-0"
                    style={{
                      width: 'var(--temp-name)',
                      color: isOpen ? 'var(--wine)' : 'var(--ink)',
                      fontWeight: isOpen ? 600 : 400,
                    }}
                  >
                    {s.name}
                  </span>
                  <span className="relative flex-1 h-2.5">
                    <span
                      className="absolute inset-y-0 rounded-full"
                      style={{
                        left: `${pct(s.min)}%`,
                        width: `${pct(s.max) - pct(s.min)}%`,
                        background: isOpen ? 'var(--wine)' : 'var(--rule-strong)',
                        transition: 'background var(--m-quick) var(--ease)',
                      }}
                    />
                  </span>
                  <span
                    className="label-ui shrink-0 text-right"
                    style={{ width: 'var(--temp-range)', color: 'var(--gold)' }}
                  >
                    {s.min}–{s.max}°
                  </span>
                </div>
              </button>
              {isOpen && (
                <p
                  className="t-ui pl-[var(--temp-name)] pb-2 pr-2"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  {s.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="t-caption mt-5" style={{ color: 'var(--ink-soft)' }}>
        In practice: twenty minutes out of the fridge for a white, twenty
        minutes in it for a red. Both errors are the same size, and both are
        fixed by moving the bottle rather than by anything cleverer.
      </p>
    </div>
  );
}
