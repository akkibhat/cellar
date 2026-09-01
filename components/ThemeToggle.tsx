'use client';

import { useTheme } from '@/lib/storage';

/**
 * Light/dark switch. Writes the choice to localStorage and stamps it on
 * the root element; the inline script in the layout replays it on the next
 * load before paint.
 *
 * WHY AN ICON
 *
 * It used to read "Lamplight" and "Daylight", which is the book's voice
 * applied to a piece of interface furniture. Naming a control invites the
 * reader to work out what the name means, and there is nothing to work out
 * here - it is the switch every site has. So it shows the theme you would
 * get by pressing it, and says the rest to a screen reader.
 *
 * It lived inside the book's sidebar, which is why the cellar had no way
 * to change theme at all. It is a component now so both halves can carry
 * it: the book in its sidebar, the cellar in the bar across the top.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={toggle}
      className={`rounded p-1.5 ${className}`}
      style={{ color: 'var(--ink-faint)', lineHeight: 0 }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      suppressHydrationWarning
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {theme === 'dark' ? (
          /* In the dark: offer daylight. */
          <>
            <circle cx="12" cy="12" r="4.2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="12"
                y1="2.6"
                x2="12"
                y2="5"
                transform={`rotate(${deg} 12 12)`}
              />
            ))}
          </>
        ) : (
          /* In the light: offer the lamp. */
          <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2z" />
        )}
      </svg>
    </button>
  );
}
