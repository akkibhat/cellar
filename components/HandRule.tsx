/**
 * The wobbly hand-drawn rule that sits under a heading.
 *
 * Two variants so that a page with several headings does not look
 * rubber-stamped - the path is picked from the variant rather than being
 * randomised, because a random path would change on every render and
 * differ between server and client.
 */
export default function HandRule({
  width = 380,
  variant = 0,
  accent = false,
  className = '',
}: {
  /** Rendered width in pixels; the viewBox scales to fit. */
  width?: number;
  /** 0 or 1 - selects which of the two hand-drawn paths to use. */
  variant?: 0 | 1;
  /** Draw in wine red rather than ink. */
  accent?: boolean;
  className?: string;
}) {
  const paths = [
    'M3 8 C 70 3, 118 10, 186 5 S 320 9, 427 4',
    'M3 6 C 88 11, 140 3, 214 8 S 330 4, 427 9',
  ];

  return (
    <svg
      className={`hand-rule ${accent ? 'accent' : ''} ${className}`}
      viewBox="0 0 430 12"
      style={{ width, maxWidth: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
    >
      <path d={paths[variant]} />
    </svg>
  );
}
