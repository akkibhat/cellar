/**
 * Port and Fino, drawn as one ferment with two interruptions.
 *
 * A single falling sugar line with two "spirit in" arrows: Port early,
 * Fino at the end. The height of the line where each arrow lands is the
 * sweetness of the finished wine, because whatever sugar the yeast hasn't
 * eaten yet is what you taste. No motion: it's about two instants.
 */

const X0 = 74; // start of the ferment
const X1 = 404; // and its natural end
const TOP = 52; // sugar at its highest, low enough to label above
const BASE = 140; // and at nothing

/* Where the spirit goes in for Port, as a fraction of the way through. */
const CUT = 0.42;

/**
 * Sugar remaining, as a y coordinate. Roughly exponential: yeast is quick
 * while there is plenty to eat and slows as it poisons itself.
 */
const sugarY = (t: number) => TOP + (BASE - TOP) * Math.pow(t, 0.72);
/* Fraction of the way through the ferment to an x coordinate. */
const sugarX = (t: number) => X0 + (X1 - X0) * t;

/** SVG path for the sugar line between two fractions, sampled in 24 steps. */
const curve = (from: number, to: number) => {
  const steps = 24;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = from + ((to - from) * i) / steps;
    return `${i ? 'L' : 'M'}${sugarX(t).toFixed(1)} ${sugarY(t).toFixed(1)}`;
  }).join(' ');
};

/** The fortification figure, with Port's cut point worked out from CUT. */
export default function Fortification() {
  const cutX = sugarX(CUT);
  const cutY = sugarY(CUT);

  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">When the spirit goes in</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        Port and Fino Sherry are the same idea interrupted at two different
        moments. Whatever sugar the yeast has not reached yet is what you taste.
      </p>

      <svg
        viewBox="0 0 480 240"
        className="w-full"
        style={{ display: 'block' }}
        role="img"
        aria-label={
          'Sugar falls as fermentation proceeds. Add grape spirit partway through and the ' +
          'yeast is killed with sugar still remaining, giving Port, sweet and about twenty ' +
          'percent alcohol. Add it after the sugar is gone and the wine stays dry, giving ' +
          'Fino Sherry at about fifteen percent.'
        }
      >
        <defs>
          <marker id="fort-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 z" fill="var(--wine)" />
          </marker>
        </defs>

        {/* ---- axes ----------------------------------------------- */}
        <line x1={X0} y1={TOP - 14} x2={X0} y2={BASE} stroke="var(--rule-strong)" strokeWidth="1" />
        <line x1={X0} y1={BASE} x2={X1 + 34} y2={BASE} stroke="var(--rule-strong)" strokeWidth="1" />
        <text x={X0 - 8} y={TOP - 4} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          sugar
        </text>
        <text x={X0 - 8} y={BASE + 4} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          none
        </text>
        <text x={X1 + 34} y={BASE + 17} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          fermentation →
        </text>

        {/* ---- the ferment, and the part of it Port never gets ---- */}
        <path d={curve(0, CUT)} fill="none" stroke="var(--tussock-deep)" strokeWidth="2.5" />
        <path
          d={curve(CUT, 1)}
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* ---- Port: stopped early, sugar left ------------------- */}
        <line
          x1={cutX}
          y1={TOP - 24}
          x2={cutX}
          y2={cutY - 7}
          stroke="var(--wine)"
          strokeWidth="1.5"
          markerEnd="url(#fort-arrow)"
        />
        <text x={cutX} y={TOP - 30} textAnchor="middle" className="t-micro" fill="var(--wine)">
          spirit in
        </text>
        <circle cx={cutX} cy={cutY} r="4" fill="var(--wine)" />
        {/* The sugar still standing at that moment is the sweetness. */}
        <line
          x1={cutX}
          y1={cutY}
          x2={cutX}
          y2={BASE}
          stroke="var(--wine)"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        <text x={cutX + 8} y={(cutY + BASE) / 2 + 4} className="t-micro" fill="var(--wine)">
          sugar left
        </text>

        {/* ---- Fino: nothing left to kill ------------------------ */}
        <line
          x1={X1}
          y1={TOP - 24}
          x2={X1}
          y2={BASE - 9}
          stroke="var(--wine)"
          strokeWidth="1.5"
          markerEnd="url(#fort-arrow)"
        />
        <text x={X1} y={TOP - 30} textAnchor="middle" className="t-micro" fill="var(--wine)">
          spirit in
        </text>
        <circle cx={X1} cy={BASE} r="4" fill="var(--wine)" />

        {/* ---- what each one is ---------------------------------- */}
        <g>
          <text x={cutX} y={BASE + 40} textAnchor="middle" className="t-micro" fill="var(--ink)">
            yeast killed early
          </text>
          <text x={cutX} y={BASE + 56} textAnchor="middle" className="t-micro" fill="var(--wine)">
            Port
          </text>
          <text x={cutX} y={BASE + 72} textAnchor="middle" className="t-micro nums" fill="var(--ink-faint)">
            sweet · about 20%
          </text>
        </g>
        <g>
          <text x={X1} y={BASE + 40} textAnchor="middle" className="t-micro" fill="var(--ink)">
            nothing left to eat
          </text>
          <text x={X1} y={BASE + 56} textAnchor="middle" className="t-micro" fill="var(--wine)">
            Fino Sherry
          </text>
          <text x={X1} y={BASE + 72} textAnchor="middle" className="t-micro nums" fill="var(--ink-faint)">
            dry · about 15%
          </text>
        </g>
      </svg>
    </figure>
  );
}
