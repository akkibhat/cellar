/**
 * The ripeness trade-off the whole book keeps returning to.
 *
 * As grapes ripen, acid falls and sugar (so alcohol) rises. Drawn as two
 * lines going opposite ways, that's one fact instead of two. The shaded band
 * is the picking window: there's no single right moment, only a range where
 * both numbers are still acceptable. No motion.
 */

const X0 = 76;
const X1 = 424;
const TOP = 38;
const BASE = 132;

/* The picking window, as fractions along the ripeness axis. */
const PICK = [0.42, 0.68];

/* Fraction along the ripeness axis to an x coordinate. */
const at = (t: number) => X0 + (X1 - X0) * t;

/** The ripeness figure: acid and sugar curves, picking window, and what each end tastes like. */
export default function Ripeness() {
  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">The trade-off</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        Sugar climbs as the grapes ripen and acid falls away. Everything else
        in the glass follows from where on this line somebody decided to pick.
      </p>

      <svg
        viewBox="0 0 480 220"
        className="w-full"
        style={{ display: 'block' }}
        role="img"
        aria-label={
          'As grapes ripen, sugar and therefore alcohol rise while acid falls. ' +
          'Picking early gives a lighter, sharper wine; picking late gives a stronger, ' +
          'softer one. The two lines cross in the middle, where most wine is picked.'
        }
      >
        {/* ---- the window somebody picks inside -------------------- */}
        <rect
          x={at(PICK[0])}
          y={TOP - 16}
          width={at(PICK[1]) - at(PICK[0])}
          height={BASE - TOP + 16}
          fill="var(--tussock)"
          opacity="0.12"
        />
        <text
          x={(at(PICK[0]) + at(PICK[1])) / 2}
          y={TOP - 22}
          textAnchor="middle"
          className="t-micro"
          fill="var(--tussock-deep)"
        >
          where most wine is picked
        </text>

        {/* ---- axes ------------------------------------------------ */}
        <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke="var(--rule-strong)" strokeWidth="1" />
        <text x={X0} y={BASE + 20} className="t-micro" fill="var(--ink-faint)">
          less ripe
        </text>
        <text x={X1} y={BASE + 20} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          more ripe →
        </text>

        {/* ---- acid, falling -------------------------------------- */}
        <path
          d={`M${X0} ${TOP} C ${at(0.35)} ${TOP + 18}, ${at(0.6)} ${BASE - 26}, ${X1} ${BASE - 6}`}
          fill="none"
          stroke="var(--straw)"
          strokeWidth="2.5"
        />
        <text x={X0 + 6} y={TOP - 6} className="t-micro" fill="var(--straw)">
          acid
        </text>

        {/* ---- sugar, and therefore alcohol, rising --------------- */}
        <path
          d={`M${X0} ${BASE - 6} C ${at(0.4)} ${BASE - 26}, ${at(0.65)} ${TOP + 18}, ${X1} ${TOP}`}
          fill="none"
          stroke="var(--wine)"
          strokeWidth="2.5"
        />
        <text x={X1} y={TOP - 6} textAnchor="end" className="t-micro" fill="var(--wine)">
          sugar → alcohol
        </text>

        {/* ---- what each end actually tastes like ----------------- */}
        <g>
          <text x={X0} y={BASE + 46} className="t-micro" fill="var(--ink)">
            Picked early
          </text>
          <text x={X0} y={BASE + 62} className="t-micro" fill="var(--ink-faint)">
            sharp, light, lower alcohol
          </text>
          <text x={X0} y={BASE + 78} className="t-micro" fill="var(--ink-faint)">
            tart red fruit, citrus, herbal
          </text>
        </g>
        <g>
          <text x={X1} y={BASE + 46} textAnchor="end" className="t-micro" fill="var(--ink)">
            Picked late
          </text>
          <text x={X1} y={BASE + 62} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
            soft, full, higher alcohol
          </text>
          <text x={X1} y={BASE + 78} textAnchor="end" className="t-micro" fill="var(--ink-faint)">
            ripe black fruit, tropical, jam like
          </text>
        </g>
      </svg>
    </figure>
  );
}
