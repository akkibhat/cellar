/**
 * The Champagne sweetness scale, drawn on one g/L axis.
 *
 * A table makes the names look orderly, but they aren't: Extra Dry is
 * sweeter than Brut, and Sec means dry while tasting sweet. On one axis the
 * inversion is the first thing you see. It also shows the overlaps: Brut
 * (0-12) contains Extra Brut and Brut Nature, so a 2 g/L bottle may legally
 * carry any of the three names. No motion.
 */

/* The legal bands, in grams of residual sugar per litre. */
const BANDS = [
  { term: 'Brut Nature', from: 0, to: 3 },
  { term: 'Extra Brut', from: 0, to: 6 },
  { term: 'Brut', from: 0, to: 12 },
  { term: 'Extra Dry', from: 12, to: 17, odd: true },
  { term: 'Sec', from: 17, to: 32, odd: true },
  { term: 'Demi-Sec', from: 32, to: 50 },
];

const X0 = 132; // where the axis starts
const X1 = 418; // and ends, at 50 g/L, leaving room for its label
const MAX = 50;
const ROW = 21;
const TOP = 30;

/* Grams per litre to an x position on the axis. */
const x = (g: number) => X0 + (g / MAX) * (X1 - X0);
/* Band index to the y position of its row. */
const y = (i: number) => TOP + i * ROW;

/** The dosage figure: one row per sweetness term, over a shared g/L axis. */
export default function Dosage() {
  /* The axis line's y, just under the last band. */
  const floor = y(BANDS.length - 1) + 16;

  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">What the sweetness words mean</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        Sugar added after disgorging, in grams per litre. The names are not in
        order, and the dry end of the scale overlaps itself.
      </p>

      <svg
        viewBox={`0 0 480 ${floor + 46}`}
        className="w-full"
        style={{ display: 'block' }}
        role="img"
        aria-label={
          'Champagne dosage on a scale of nought to fifty grams of sugar per litre. ' +
          'Brut Nature nought to three, Extra Brut nought to six and Brut nought to twelve ' +
          'all overlap at the dry end. Extra Dry runs twelve to seventeen, so it is sweeter ' +
          'than Brut despite the name. Sec runs seventeen to thirty-two and Demi-Sec thirty-two to fifty.'
        }
      >
        {/* ---- the bands ------------------------------------------ */}
        {BANDS.map((b, i) => {
          const colour = b.odd ? 'var(--wine)' : 'var(--pounamu)';
          return (
            <g key={b.term}>
              <text
                x={X0 - 10}
                y={y(i) + 4}
                textAnchor="end"
                className="t-micro"
                fill={b.odd ? 'var(--wine)' : 'var(--ink-soft)'}
              >
                {b.term}
              </text>
              {/* The band itself. Rounded so a 3 g/L sliver still reads. */}
              <rect
                x={x(b.from)}
                y={y(i) - 6}
                width={Math.max(x(b.to) - x(b.from), 3)}
                height="12"
                rx="2"
                fill={colour}
                opacity={b.odd ? 0.3 : 0.19}
                stroke={colour}
                strokeWidth="1"
              />
              <text
                x={x(b.to) + 7}
                y={y(i) + 4}
                className="t-micro nums"
                fill="var(--ink-faint)"
              >
                {b.from}–{b.to}
              </text>
            </g>
          );
        })}

        {/* ---- the axis ------------------------------------------- */}
        <line
          x1={X0}
          y1={floor}
          x2={X1}
          y2={floor}
          stroke="var(--rule-strong)"
          strokeWidth="1"
        />
        {[0, 12, 17, 32, 50].map((g) => (
          <g key={g}>
            <line
              x1={x(g)}
              y1={floor}
              x2={x(g)}
              y2={floor + 5}
              stroke="var(--rule-strong)"
              strokeWidth="1"
            />
            <text
              x={x(g)}
              y={floor + 18}
              textAnchor="middle"
              className="t-micro nums"
              fill="var(--ink-faint)"
            >
              {g}
            </text>
          </g>
        ))}
        <text x={X1} y={floor + 34} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          grams of sugar per litre →
        </text>

        {/* ---- where the naming stops making sense ---------------- */}
        <line
          x1={x(12)}
          y1={TOP - 20}
          x2={x(12)}
          y2={floor}
          stroke="var(--wine)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.55"
        />
        <text x={x(12) + 6} y={TOP - 12} className="t-micro" fill="var(--wine)">
          everything right of here is sweeter than Brut
        </text>
      </svg>
    </figure>
  );
}
