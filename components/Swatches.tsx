'use client';

import { useEffect, useState } from 'react';

/**
 * A row of colour swatches, read from the page they are rendered on.
 *
 * The point is that nothing here is typed twice. The hex and the contrast
 * ratio are measured from the live custom property at runtime, so the
 * guidelines cannot describe a palette the site has stopped using - which
 * is the failure mode of every colour reference kept as a static document.
 *
 * It measures on the client because the values only exist once the
 * stylesheet has applied, and re-measures when the theme changes, since
 * half of these tokens have a different value in the dark theme.
 */

type Read = { token: string; hex: string; ratio: number };

/** sRGB relative luminance, per WCAG. */
function luminance([r, g, b]: number[]): number {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/**
 * Resolve a token to rgb, by asking the browser rather than parsing.
 *
 * `getPropertyValue` hands back the literal text a custom property was
 * declared with - `#efeae0`, or `var(--limestone)` for an alias - so there
 * is nothing reliable to parse. Setting it as a colour on a throwaway
 * element and reading the computed value back makes the browser do the
 * work, including following alias chains.
 */
function parse(token: string): number[] | null {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const m = resolved.match(/[\d.]+/g);
  return m && m.length >= 3 ? m.slice(0, 3).map(Number) : null;
}

const hexOf = ([r, g, b]: number[]) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

export default function Swatches({
  title,
  tokens,
  note,
  against = '--paper',
}: {
  title: string;
  tokens: string[];
  note?: string;
  /** What each swatch is measured against. Defaults to the page. */
  against?: string;
}) {
  const [reads, setReads] = useState<Read[]>([]);

  useEffect(() => {
    const measure = () => {
      const bg = parse(against);
      setReads(
        tokens.map((token) => {
          const rgb = parse(token);
          if (!rgb || !bg) return { token, hex: '', ratio: 0 };
          const [a, b] = [luminance(rgb), luminance(bg)].sort((x, y) => y - x);
          return {
            token,
            hex: hexOf(rgb),
            ratio: Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100,
          };
        }),
      );
    };
    measure();

    /* The tokens change with the theme, so re-measure when it does. */
    const obs = new MutationObserver(measure);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', measure);
    return () => {
      obs.disconnect();
      mq.removeEventListener('change', measure);
    };
  }, [tokens, against]);

  return (
    <div className="mb-8">
      <p className="label-ui mb-1">{title}</p>
      {note && (
        <p className="t-caption mb-3 max-w-[38rem]" style={{ color: 'var(--ink-faint)' }}>
          {note}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        {reads.map((r) => (
          <div key={r.token} style={{ width: '10.5rem' }}>
            <div
              className="rounded"
              style={{
                height: 56,
                background: `var(${r.token})`,
                border: '1px solid var(--rule)',
              }}
            />
            <code className="t-micro block mt-1.5" style={{ color: 'var(--ink)' }}>
              {r.token}
            </code>
            <span className="t-micro nums" style={{ color: 'var(--ink-faint)' }}>
              {r.hex}
              {r.ratio > 0 && ` · ${r.ratio.toFixed(2)}:1`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
