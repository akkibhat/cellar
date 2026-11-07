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
 * The geometry changes with size (three tiers, see tierFor in lib/mark).
 * At one fixed geometry the thin gaps beside the spine vanish below about
 * 22px and the mark collapses into a two-tone arch. So as it shrinks the
 * pages draw apart and the spine thickens, and at the smallest tier the
 * spine is dropped for a single wide gap. Each tier keeps its narrowest
 * feature above one rendered pixel.
 *
 * Colours are theme tokens, so it inverts with the theme; gaps are transparent.
 */

/** Just the drawn mark (book or door variant), sized by height. */
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
 * The suffix takes the section's accent colour, so the lockup says which
 * half of the site you're in by both word and colour.
 *
 * In light mode the suffix text uses a deeper gold (--logo-word) than the
 * mark's page: the bright tussock fails WCAG text contrast (2.84:1) on the
 * paper, while a fill has no contrast requirement. On dark the two match.
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
   * The half of the word that changes: `book` is the course, `door` is
   * the cellar. It also picks which mark variant is drawn.
   */
  suffix?: 'book' | 'door';
  className?: string;
}) {
  if (!wordmark)
    return <LogoMark size={size} variant={suffix} className={className} />;

  /**
   * The wordmark size and gap are ratios of the mark size, not type-scale
   * steps, so the lockup's proportions hold at any size. The ratios live in
   * `LOCKUP` (lib/mark.ts) so the masthead, which builds its own lockup for
   * the morph, can't drift from this one. This is the one deliberate
   * off-scale font size in the app.
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
