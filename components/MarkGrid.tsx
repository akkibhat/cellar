import type { Mark } from '@/lib/design-marks';

/**
 * A row of marks, drawn twice: large enough to judge, and at the size that
 * actually decided them.
 *
 * Every exploration document showed each mark at both, because a mark that
 * works on a card and dies in a browser tab has not worked. 22px is the
 * sidebar and favicon size, and it is where most of these lost.
 */

/**
 * The marks keep the colours they were drawn in, and sit on a fixed light
 * ground rather than the page's.
 *
 * Mapping their fills onto tokens looked tidier and was wrong: these were
 * drawn against paper, so on the dark theme every light shape inverted and
 * disappeared into the card behind it - the vault lost its interior and
 * read as a plain arch. A record of what was drawn has to show what was
 * drawn, in both themes.
 */
const GROUND = '#efeae0';

function Draw({
  mark,
  size,
  uid,
}: {
  mark: Mark;
  size: number;
  /** Each mark is drawn twice, so the clip needs an id of its own. */
  uid: string;
}) {
  const shapes = mark.shapes;
  const clipId = 'clip-' + uid;
  return (
    <svg
      viewBox="0 0 120 160"
      height={size}
      style={{ display: 'block', flex: 'none' }}
      aria-hidden="true"
    >
      {mark.clip && (
        <defs>
          <clipPath id={clipId}>
            <path d={mark.clip} />
          </clipPath>
        </defs>
      )}
      {shapes.map((s, i) => {
        const common = {
          fill: s.fill,
          opacity: s.opacity,
          clipPath: s.clip ? `url(#${clipId})` : undefined,
        };
        if (s.tag === 'rect')
          return (
            <rect key={i} {...common} x={s.x} y={s.y} width={s.width} height={s.height} />
          );
        if (s.tag === 'circle')
          return <circle key={i} {...common} cx={s.cx} cy={s.cy} r={s.r} />;
        if (s.tag === 'ellipse')
          return <ellipse key={i} {...common} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />;
        return <path key={i} {...common} d={s.d} />;
      })}
    </svg>
  );
}

export default function MarkGrid({
  marks,
  large = 70,
  chosen,
}: {
  marks: Mark[];
  large?: number;
  /** Labels that survived this round, marked so the page reads as a story. */
  chosen?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-x-7 gap-y-6 my-6">
      {marks.map((m) => {
        const kept = chosen?.some((c) => m.label.startsWith(c));
        return (
          <figure key={m.label} style={{ width: '7.5rem' }}>
            <div
              className="rounded flex items-end justify-center gap-2 px-3 py-3"
              style={{
                background: GROUND,
                border: kept
                  ? '2px solid var(--wine)'
                  : '1px solid var(--rule)',
                minHeight: large + 24,
              }}
            >
              <Draw mark={m} size={large} uid={`${m.label}-lg`} />
              <Draw mark={m} size={22} uid={`${m.label}-sm`} />
            </div>
            <figcaption
              className="t-micro mt-1.5"
              style={{ color: kept ? 'var(--wine)' : 'var(--ink-faint)' }}
            >
              {m.label}
              {kept && ' ·  kept'}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
