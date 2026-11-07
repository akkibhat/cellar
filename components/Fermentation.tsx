/**
 * What fermentation does, drawn.
 *
 * One glucose goes into a yeast cell; two ethanol and two carbon dioxide
 * come out. The two-for-one is the surprising part, and a drawing shows it
 * faster than prose.
 *
 * The motion is only decoration. globals.css freezes every animation under
 * prefers-reduced-motion, so the diagram must be complete standing still:
 * every labelled part is static, and the only thing that moves is a second
 * set of bubbles drifting up behind the static ones.
 */
export default function Fermentation() {
  /* Three drifting bubbles, staggered so the column never empties. */
  const drift = [
    { x: 300, delay: '0s' },
    { x: 316, delay: '1.1s' },
    { x: 288, delay: '2.2s' },
  ];

  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">What fermentation does</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        One sugar in, two alcohols and two gases out. The yeast is not making
        wine on purpose; it is eating, and ethanol is what it leaves behind.
      </p>

      <svg
        viewBox="0 0 470 150"
        className="w-full"
        style={{ display: 'block', maxHeight: 190 }}
        role="img"
        aria-label="One molecule of glucose enters a yeast cell; two molecules of ethanol and two of carbon dioxide leave it."
      >
        {/* ---- glucose ------------------------------------------- */}
        <g>
          <polygon
            points="46,54 66,42 86,54 86,78 66,90 46,78"
            fill="none"
            stroke="var(--tussock-deep)"
            strokeWidth="2"
          />
          <text x="66" y="70" textAnchor="middle" className="t-micro" fill="var(--tussock-deep)">
            sugar
          </text>
          <text x="66" y="112" textAnchor="middle" className="t-micro" fill="var(--ink-faint)">
            glucose
          </text>
        </g>

        {/* ---- into the cell ------------------------------------- */}
        <path
          d="M96 66 H140"
          stroke="var(--rule-strong)"
          strokeWidth="1.5"
          markerEnd="url(#ferment-arrow)"
        />
        <defs>
          <marker
            id="ferment-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0 0 L7 3.5 L0 7 z" fill="var(--rule-strong)" />
          </marker>
        </defs>

        {/* ---- the yeast, budding as yeast does ------------------ */}
        <g>
          <ellipse cx="182" cy="66" rx="30" ry="26" fill="none" stroke="var(--straw)" strokeWidth="2" />
          <ellipse cx="208" cy="44" rx="11" ry="10" fill="none" stroke="var(--straw)" strokeWidth="2" />
          <text x="182" y="70" textAnchor="middle" className="t-micro" fill="var(--straw)">
            yeast
          </text>
          <text x="182" y="112" textAnchor="middle" className="t-micro" fill="var(--ink-faint)">
            eats it
          </text>
        </g>

        <path
          d="M222 66 H262"
          stroke="var(--rule-strong)"
          strokeWidth="1.5"
          markerEnd="url(#ferment-arrow)"
        />

        {/* ---- carbon dioxide, going up and away ----------------- */}
        {drift.map((b, i) => (
          <circle
            key={i}
            className="ferment-drift"
            cx={b.x}
            cy="60"
            r="5"
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth="1.5"
            style={{ animationDelay: b.delay }}
          />
        ))}
        {/* Static pair, so the gas is still shown when nothing moves. */}
        <circle cx="300" cy="26" r="6" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" />
        <circle cx="318" cy="14" r="4" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" />
        <text x="356" y="24" className="t-micro" fill="var(--ink-faint)">
          2 × carbon dioxide
        </text>

        {/* ---- ethanol, staying in the glass --------------------- */}
        <g>
          <circle cx="300" cy="86" r="9" fill="none" stroke="var(--wine)" strokeWidth="2" />
          <circle cx="322" cy="86" r="9" fill="none" stroke="var(--wine)" strokeWidth="2" />
          <text x="342" y="90" className="t-micro" fill="var(--wine)">
            2 × ethanol
          </text>
          <text x="300" y="112" className="t-micro" fill="var(--ink-faint)">
            this is the wine
          </text>
        </g>

        {/* ---- the same thing, in the notation ------------------- */}
        <text x="235" y="140" textAnchor="middle" className="t-micro nums" fill="var(--ink-soft)">
          C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂
        </text>
      </svg>
    </figure>
  );
}
