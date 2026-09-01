import {
  ARCH,
  coverPath,
  doorHoles,
  LOCKUP,
  pagePath,
  tierFor,
} from '@/lib/mark';

/**
 * The Cellarbook mark: an arch split down a spine, so it reads as both a
 * cellar doorway and an open book.
 *
 * The mark is *responsive*, which is the whole trick. Drawn at one fixed
 * geometry it fails below about 22px: the gaps either side of the spine
 * are 1.5 units in a 120-unit viewBox, so at 14px they land on roughly a
 * sixth of a pixel and disappear, welding the spine to the left page and
 * collapsing the whole thing into a two-tone arch.
 *
 * So there are three tiers. As the mark shrinks the pages draw apart and
 * the spine thickens, until at the smallest size the spine is dropped
 * entirely and the split is carried by a single wide gap. Each tier is
 * tuned so its narrowest feature stays above one rendered pixel.
 *
 * Colours come from theme tokens rather than fixed values, so the mark
 * inverts with the rest of the interface, and the gaps are transparent so
 * it sits on any surface.
 */

export function LogoMark({
  size = 32,
  variant = 'book',
  decorative = false,
  className = '',
  style,
}: {
  /** Rendered height in pixels. Drives which tier is used. */
  size?: number;
  /** Which half's mark to draw. */
  variant?: 'book' | 'door';
  /** Passed through so a lockup can apply its optical lift. */
  style?: React.CSSProperties;
  /**
   * True when the mark sits beside the wordmark. The word is real text,
   * so labelling the drawing as well makes a screen reader announce the
   * name twice.
   */
  decorative?: boolean;
  className?: string;
}) {
  const t = tierFor(size);
  const cover = coverPath(t);
  const page = pagePath(t);

  return (
    <svg
      height={size}
      viewBox="0 0 120 160"
      className={className}
      {...(decorative
        ? { 'aria-hidden': true as const }
        : {
            role: 'img',
            'aria-label': variant === 'door' ? 'Cellardoor' : 'Cellarbook',
          })}
      style={{ display: 'block', flex: 'none', ...style }}
    >
      {variant === 'door' ? (
        /* One path, even-odd filled, so the bottles are genuine holes
           and take the surface behind them rather than a fixed colour. */
        <path
          fillRule="evenodd"
          fill="var(--logo-door)"
          d={`${ARCH} ${doorHoles(size)}`}
        />
      ) : (
        <>
          <path d={cover} fill="var(--logo-cover)" />
          <path d={page} fill="var(--logo-page)" />
          {t.spine > 0 && (
            <rect
              x={60 - t.spine / 2}
              y={30}
              width={t.spine}
              height={120}
              fill="var(--logo-cover)"
            />
          )}
        </>
      )}
    </svg>
  );
}

/**
 * The mark locked up with the wordmark.
 *
 * The suffix takes the accent colour, so the word acts as a key to the
 * drawing: the dark half is Cellar, the coloured half is the suffix. And
 * because the accent differs per section, the same lockup says which half
 * of the site you are in twice over - by the word and by the colour.
 *
 * It cannot be the *same* gold in daylight. Tussock fails WCAG at 2.84:1
 * on limestone, so text uses the deeper weight at 4.51:1 while the mark's
 * page keeps the bright one - a fill carries no contrast requirement. On
 * dark the two match exactly, since the lifted gold already passes.
 */
export default function Logo({
  size = 32,
  wordmark = true,
  suffix = 'book',
  className = '',
}: {
  size?: number;
  wordmark?: boolean;
  /**
   * The half of the word that changes. `book` is the course, `door` is
   * the cellar - Cellar is the constant root, and the suffix says which
   * room you are in. The mark itself never changes, which is the point:
   * it already reads as both a book and a doorway.
   */
  suffix?: 'book' | 'door';
  className?: string;
}) {
  if (!wordmark)
    return <LogoMark size={size} variant={suffix} className={className} />;

  /**
   * The wordmark is sized from the mark rather than from the type scale,
   * and the gap with it likewise. That is deliberate: this is a lockup,
   * so its proportions have to hold at any size the mark is used at. The
   * two ratios come from `LOCKUP` in lib/mark.ts, so the masthead - which
   * has to build its own lockup for the morph - cannot drift from this one.
   * Snapping the text to a scale step would break the relationship the
   * moment the mark changed size. It is the one sanctioned exception to
   * the scale, and the only off-scale size the app renders.
   */
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * LOCKUP.gap,
      }}
    >
      <LogoMark
        size={size}
        variant={suffix}
        decorative
        style={{ transform: `translateY(${-size * LOCKUP.lift}px)` }}
      />
      <span
        className="wordmark"
        style={{ fontSize: size * LOCKUP.word, lineHeight: 1 }}
      >
        Cellar
        <span
          style={{
            color: suffix === 'door' ? 'var(--logo-door)' : 'var(--logo-word)',
          }}
        >
          {suffix}
        </span>
      </span>
    </span>
  );
}
