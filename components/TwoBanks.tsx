/**
 * Why Bordeaux plants what it plants, on a schematic map.
 *
 * The region is one Y of water: the Gironde running north-west to the
 * Atlantic, splitting at Bec d'Ambès into the Garonne (south past the city)
 * and the Dordogne (east). Left and Right Bank are the banks of that Y.
 * Rivers are straightened and regions are blocks, but the arrangement is real.
 *
 * The soils are pattern fills, not hand-placed shapes: a pattern covers its
 * whole region, tells the banks apart without relying on colour, and sits
 * under every label so text can't collide with it. The legend names the
 * autumn rain, because that's what makes "Cabernet ripens late" matter.
 */

/* The water, as three straight runs meeting at the confluence. */
const MOUTH = [100, 36]; // where the Gironde reaches the sea
const JOIN = [248, 168]; // Bec d'Ambès
const GARONNE = [286, 250]; // upstream, heading south past the city
const DORDOGNE = [432, 120]; // upstream, heading east

/* SVG path for a straight river run from point a to point b. */
const run = (a: number[], b: number[]) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;

/** A vine: a trunk with two arms trained off it. */
const vine = (x: number, base: number, h = 20) =>
  `M${x} ${base} V${base - h} M${x} ${base - h} l -7 -7 M${x} ${base - h} l 7 -7`;

/** The Bordeaux map figure: banks, rivers, labels and the legend. */
export default function TwoBanks() {
  return (
    <figure className="card px-5 py-5 my-6 max-w-[40rem]">
      <h3 className="hand t-h3 leading-none mb-1">Why the two banks plant different grapes</h3>
      <p className="t-caption mb-4" style={{ color: 'var(--ink-soft)' }}>
        Schematic, not surveyed - but the arrangement is the real one, and the
        soil on each side decides what has time to ripen on it.
      </p>

      <svg
        viewBox="0 0 480 350"
        className="w-full"
        style={{ display: 'block' }}
        role="img"
        aria-label={
          'A schematic map of Bordeaux. The Gironde estuary runs north-west to the Atlantic ' +
          'and splits into the Garonne, running south past the city, and the Dordogne, running ' +
          'east. West of that water is the Left Bank - the Médoc, then Graves and Sauternes ' +
          'south of the city - on gravel, planted with Cabernet Sauvignon. North and east of ' +
          'it is the Right Bank, Saint-Émilion and Pomerol, on clay and limestone, planted ' +
          'with Merlot. Entre-Deux-Mers lies in the wedge between the two rivers. Gravel drains ' +
          'hard and holds warmth, so Cabernet Sauvignon can ripen fully; cold wet clay cannot, ' +
          'so the Right Bank plants Merlot, which ripens weeks earlier. Both are racing the ' +
          'Atlantic autumn rain, which ends the season either way.'
        }
      >
        <defs>
          {/* Gravel: loose, round, and full of the air that drains it. */}
          <pattern id="bx-gravel" width="23" height="23" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2.6" fill="none" stroke="var(--tussock-deep)" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.9" fill="none" stroke="var(--tussock-deep)" strokeWidth="1" />
            <circle cx="6" cy="13" r="1.3" fill="none" stroke="var(--tussock-deep)" strokeWidth="1" />
          </pattern>
          {/* Clay: flat, dense, layered, holding its water. */}
          <pattern id="bx-clay" width="14" height="9" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="14" y2="4" stroke="var(--straw)" strokeWidth="1.3" />
          </pattern>
        </defs>

        {/* ---- the two banks, and the wedge between the rivers ---- */}
        {(
          [
            [
              `M18 22 L${MOUTH[0]} ${MOUTH[1]} L${JOIN[0]} ${JOIN[1]} L${GARONNE[0]} ${GARONNE[1]} L18 250 Z`,
              'var(--tussock)',
              0.3,
              'url(#bx-gravel)',
              0.3,
            ],
            [
              `M${MOUTH[0]} 22 L${MOUTH[0]} ${MOUTH[1]} L${JOIN[0]} ${JOIN[1]} L${DORDOGNE[0]} ${DORDOGNE[1]} L462 22 Z`,
              'var(--straw)',
              0.32,
              'url(#bx-clay)',
              0.3,
            ],
            [
              `M${JOIN[0]} ${JOIN[1]} L${DORDOGNE[0]} ${DORDOGNE[1]} L462 250 L${GARONNE[0]} ${GARONNE[1]} Z`,
              'var(--ink-faint)',
              0.1,
              null,
              0,
            ],
          ] as [string, string, number, string | null, number][]
        ).map(([d, fill, o, texture, to], i) => (
          <g key={i}>
            <path d={d} fill={fill} opacity={o} />
            {texture && <path d={d} fill={texture} opacity={to} />}
          </g>
        ))}

        {/* ---- vines, in the clear ground on each side ------------ */}
        <path
          d={[110, 140, 170].map((x) => vine(x, 246)).join(' ')}
          stroke="var(--tussock-deep)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />
        <path
          d={[250, 282, 314].map((x) => vine(x, 110)).join(' ')}
          stroke="var(--straw)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />

        {/* ---- the water ------------------------------------------ */}
        {/* Out to sea first, so the estuary widens rather than stops. */}
        <path
          d={`M${MOUTH[0]} ${MOUTH[1]} L52 10`}
          stroke="var(--info)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          opacity="0.26"
        />
        {(
          [
            [run(MOUTH, JOIN), 11],
            [run(JOIN, GARONNE), 7],
            [run(JOIN, DORDOGNE), 7],
          ] as [string, number][]
        ).map(([d, w], i) => (
          <path
            key={i}
            d={d}
            stroke="var(--info)"
            strokeWidth={w}
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        ))}

        {/* Labels carry a paper halo (paint-order: stroke), which keeps
            them legible over the soil textures without a box. */}
        <g
          paintOrder="stroke"
          stroke="var(--paper)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        >
        <text x="18" y="16" className="t-micro" fill="var(--info)">
          Atlantic
        </text>
        <text x="150" y="80" className="t-micro" fill="var(--info)" transform="rotate(41 150 80)">
          Gironde
        </text>
        <text x="256" y="190" className="t-micro" fill="var(--info)" transform="rotate(64 256 190)">
          Garonne
        </text>
        <text x="332" y="136" className="t-micro" fill="var(--info)" transform="rotate(-15 332 136)">
          Dordogne
        </text>

        {/* ---- the city the whole trade was built on -------------- */}
        <circle cx="256" cy="212" r="3.5" fill="var(--ink)" />
        <text x="248" y="216" textAnchor="end" className="t-micro" fill="var(--ink)">
          Bordeaux
        </text>

        {/* ---- Left Bank: gravel, down the west side -------------- */}
        <text x="24" y="44" className="t-micro" fill="var(--tussock-deep)">
          LEFT BANK · GRAVEL
        </text>
        <text x="24" y="76" className="t-micro" fill="var(--ink)">
          Médoc
        </text>
        <text x="24" y="92" className="t-micro" fill="var(--ink-soft)">
          Margaux, Saint-Julien,
        </text>
        <text x="24" y="106" className="t-micro" fill="var(--ink-soft)">
          Pauillac, Saint-Estèphe
        </text>
        <text x="24" y="164" className="t-micro" fill="var(--ink)">
          Graves
        </text>
        <text x="24" y="180" className="t-micro" fill="var(--ink-soft)">
          Pessac-Léognan
        </text>
        <text x="24" y="230" className="t-micro" fill="var(--ink)">
          Sauternes
        </text>

        {/* ---- Right Bank: clay, north of the Dordogne ------------ */}
        <text x="456" y="44" textAnchor="end" className="t-micro" fill="var(--straw)">
          RIGHT BANK · CLAY
        </text>
        <text x="456" y="76" textAnchor="end" className="t-micro" fill="var(--ink)">
          Saint-Émilion
        </text>
        <text x="456" y="92" textAnchor="end" className="t-micro" fill="var(--ink)">
          Pomerol
        </text>

        {/* ---- and the wedge whose name says where it is ---------- */}
        <text x="440" y="176" textAnchor="end" className="t-micro" fill="var(--ink-faint)">
          Entre-Deux-Mers
        </text>
        </g>

        {/* ---- what the soil buys, and what it is racing ---------- */}
        <line x1="18" y1="268" x2="462" y2="268" stroke="var(--rule)" strokeWidth="1" />
        <rect x="18" y="281" width="10" height="10" rx="2" fill="var(--tussock)" opacity="0.55" />
        <text x="36" y="290" className="t-micro" fill="var(--ink)">
          Gravel drains hard and holds warmth, so Cabernet Sauvignon can ripen fully
        </text>
        <rect x="18" y="299" width="10" height="10" rx="2" fill="var(--straw)" opacity="0.55" />
        <text x="36" y="308" className="t-micro" fill="var(--ink)">
          Cold wet clay cannot, so it plants Merlot, which ripens weeks earlier
        </text>
        <text x="36" y="330" className="t-micro" fill="var(--ink-faint)">
          Both are racing the Atlantic autumn rain, which ends the season either way
        </text>
      </svg>
    </figure>
  );
}
