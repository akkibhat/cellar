'use client';

import { useState } from 'react';
import { AROMA_FAMILIES } from '@/lib/aromas';
import HandRule from './HandRule';

/**
 * The aroma wheel.
 *
 * Six family wedges drawn as an SVG annulus. Selecting one reveals its
 * descriptors beside the wheel rather than as a crowded second ring -
 * twenty-two fruit descriptors rendered around a circle would be
 * unreadable at any size that fits on a phone.
 *
 * The wheel is a real control: wedges are buttons, reachable by keyboard,
 * and labelled for screen readers.
 */

const SIZE = 320;
const CENTRE = SIZE / 2;
const OUTER = 150;
const INNER = 74;

/**
 * Convert a polar coordinate to cartesian, with 0° at twelve o'clock.
 *
 * Results are rounded to three decimal places, which matters more than it
 * looks: Math.sin and Math.cos are not required to be bit-identical
 * across JavaScript engines, so Node and the browser can disagree in the
 * final digit. Unrounded, that produces a React hydration mismatch on
 * every wedge. Three decimals is far finer than a pixel at this size.
 */
function polar(radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return {
    x: round(CENTRE + radius * Math.cos(radians)),
    y: round(CENTRE + radius * Math.sin(radians)),
  };
}

/** Build the SVG path for one wedge of the annulus. */
function wedgePath(startDeg: number, endDeg: number) {
  const outerStart = polar(OUTER, startDeg);
  const outerEnd = polar(OUTER, endDeg);
  const innerEnd = polar(INNER, endDeg);
  const innerStart = polar(INNER, startDeg);
  // Every wedge here is 60°, so the large-arc flag is always 0.
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER} ${OUTER} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER} ${INNER} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

export default function AromaWheel({
  onPick,
  selected = [],
}: {
  /** Optional: called when a descriptor chip is clicked. */
  onPick?: (descriptor: string) => void;
  /** Optional: descriptors to show as already chosen. */
  selected?: string[];
}) {
  const [active, setActive] = useState<string>(AROMA_FAMILIES[0].slug);
  const family = AROMA_FAMILIES.find((f) => f.slug === active)!;
  const step = 360 / AROMA_FAMILIES.length;

  return (
    <div className="grid gap-6 md:grid-cols-[320px_1fr] items-start my-6">
      {/* ---- The wheel ------------------------------------------ */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ width: '100%', maxWidth: SIZE, height: 'auto' }}
        role="group"
        aria-label="Aroma families"
      >
        {AROMA_FAMILIES.map((f, i) => {
          const start = i * step;
          const end = start + step;
          const isActive = f.slug === active;
          // Place the label at the midpoint of the wedge, mid-thickness.
          const label = polar((OUTER + INNER) / 2, start + step / 2);

          return (
            <g
              key={f.slug}
              className={`aroma-family${isActive ? ' is-active' : ''}`}
            >
              {/* Colour is set through the CSS `fill` property rather than
                  the SVG attribute, because attributes do not resolve
                  var(). And every wedge is drawn at full opacity: the
                  inactive state used to be 42%, which lightened the fill
                  far enough that the pale label on top of it stopped
                  clearing contrast. The active wedge is distinguished by a
                  wider separating stroke instead, which costs no
                  legibility. */}
              <path
                className="aroma-wedge"
                d={wedgePath(start, end)}
                stroke="var(--paper)"
                strokeWidth={isActive ? 6 : 2}
                style={{
                  fill: f.colour,
                  cursor: 'pointer',
                  transition:
                    'stroke-width var(--m-quick) var(--ease), opacity var(--m-quick) var(--ease)',
                }}
                onClick={() => setActive(f.slug)}
                tabIndex={0}
                role="button"
                aria-label={`${f.name} aromas`}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(f.slug);
                  }
                }}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--aroma-label)"
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: 19,
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                {f.name}
              </text>
            </g>
          );
        })}

        {/* Hub */}
        <circle
          cx={CENTRE}
          cy={CENTRE}
          r={INNER - 4}
          fill="var(--paper-raised)"
          stroke="var(--rule)"
        />
        <text
          x={CENTRE}
          y={CENTRE - 8}
          textAnchor="middle"
          fill="var(--wine)"
          style={{ fontFamily: 'var(--font-hand)', fontSize: 26, fontWeight: 700 }}
        >
          Aromas
        </text>
        <text
          x={CENTRE}
          y={CENTRE + 14}
          textAnchor="middle"
          fill="var(--ink-soft)"
          style={{
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          choose a family
        </text>
      </svg>

      {/* ---- The selected family -------------------------------- */}
      <div>
        <h3 className="hand t-h2 leading-none" style={{ color: family.colour }}>
          {family.name}
        </h3>
        <HandRule width={140} className="mt-1 mb-3" />

        <p className="t-ui mb-4" style={{ color: 'var(--ink-soft)' }}>
          {family.meaning}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {family.descriptors.map((d) => (
            <button
              key={d}
              className="chip"
              aria-pressed={selected.includes(d)}
              onClick={() => onPick?.(d)}
              // Without a picker attached the chips are reference only.
              style={{
                cursor: onPick ? 'pointer' : 'default',
                ...(selected.includes(d)
                  ? { background: family.colour, borderColor: family.colour }
                  : {}),
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
