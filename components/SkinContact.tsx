/**
 * Colour is time on the skins, drawn as one axis.
 *
 * White, rosé and red aren't three categories: they're points on one dial
 * of how long the juice sat with the skins. Orange wine is white grapes
 * given the red treatment, shown as a branch off the dial.
 *
 * The swatches are literal wine colours, not theme tokens, because they
 * depict the liquid. They read on both the light and dark theme. No motion.
 */

type Stop = {
  at: number; // fraction along the axis
  time: string;
  style: string;
  fill: string;
  note?: string;
};

const STOPS: Stop[] = [
  { at: 0, time: 'None', style: 'Still white', fill: '#e8d9a0', note: 'no colour, no tannin' },
  { at: 0.3, time: 'Hours', style: 'Rosé', fill: '#e39aa0' },
  { at: 0.62, time: 'Days', style: 'Lighter red', fill: '#a33a4e' },
  { at: 1, time: 'Weeks', style: 'Darker red', fill: '#5c1730', note: 'deep colour, firm grip' },
];

const X0 = 84;
const X1 = 404;
const AXIS = 118;

/* Fraction along the axis to an x coordinate. */
const at = (t: number) => X0 + (X1 - X0) * t;

/** The skin-contact figure: the colour dial, its four settings, and the orange-wine branch. */
export default function SkinContact() {
  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">Colour is just time on the skins</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        White, rosé and red are not three kinds of wine. They are one dial, set
        in three places.
      </p>

      <svg
        viewBox="0 0 480 226"
        className="w-full"
        style={{ display: 'block' }}
        role="img"
        aria-label={
          'Skin contact as a single scale. No contact gives still white wine; a few hours ' +
          'gives rosé; days give a lighter red; weeks give a dark, firmly tannic red. ' +
          'White grapes given days on their skins give orange wine.'
        }
      >
        <defs>
          {/* The dial itself, running the same way the swatches do. */}
          <linearGradient id="skin-run" x1="0" x2="1">
            <stop offset="0%" stopColor="#e8d9a0" />
            <stop offset="30%" stopColor="#e39aa0" />
            <stop offset="62%" stopColor="#a33a4e" />
            <stop offset="100%" stopColor="#5c1730" />
          </linearGradient>
        </defs>

        {/* ---- the dial ------------------------------------------- */}
        <rect x={X0} y={AXIS - 3} width={X1 - X0} height="6" rx="3" fill="url(#skin-run)" />

        {/* ---- the settings --------------------------------------- */}
        {STOPS.map((s) => (
          <g key={s.style}>
            <circle
              cx={at(s.at)}
              cy={AXIS - 40}
              r="18"
              fill={s.fill}
              stroke="var(--rule-strong)"
              strokeWidth="1"
            />
            <line
              x1={at(s.at)}
              y1={AXIS - 20}
              x2={at(s.at)}
              y2={AXIS - 8}
              stroke="var(--rule-strong)"
              strokeWidth="1"
            />
            <text
              x={at(s.at)}
              y={AXIS + 22}
              textAnchor="middle"
              className="t-micro"
              fill="var(--ink)"
            >
              {s.time}
            </text>
            <text
              x={at(s.at)}
              y={AXIS + 38}
              textAnchor="middle"
              className="t-micro"
              fill="var(--ink-soft)"
            >
              {s.style}
            </text>
            {s.note && (
              <text
                x={at(s.at)}
                y={AXIS + 54}
                textAnchor="middle"
                className="t-micro"
                fill="var(--ink-faint)"
              >
                {s.note}
              </text>
            )}
          </g>
        ))}

        <text x={X0} y={AXIS - 74} className="t-micro" fill="var(--ink-faint)">
          how long the juice sits with the skins →
        </text>

        {/* ---- and the same dial, on white grapes ----------------- */}
        {/* Down from the dial, then back left to where the label fits. */}
        <path
          d={`M${at(0.62)} ${AXIS + 68} V ${AXIS + 88} H 108`}
          fill="none"
          stroke="var(--tussock-deep)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle
          cx="96"
          cy={AXIS + 88}
          r="10"
          fill="#d98a4a"
          stroke="var(--rule-strong)"
          strokeWidth="1"
        />
        <text x="116" y={AXIS + 85} className="t-micro" fill="var(--tussock-deep)">
          Set the same dial on white grapes
        </text>
        <text x="116" y={AXIS + 99} className="t-micro" fill="var(--ink-faint)">
          and you get orange wine - white, with grip
        </text>
      </svg>
    </figure>
  );
}
