import type { Block } from './types';

/**
 * The sections of a chapter, with a stable id for each.
 *
 * The body stamps these ids onto its headings and the rail on the left of
 * the page links to them. Both read from this one function over the same
 * blocks, so the link and the heading cannot drift apart: computing the id
 * independently in two places is how a "jump to" link quietly stops
 * working.
 */
export type Heading = { id: string; text: string };

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/\*/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 'section'
  );
}

/** Every `h` block, in order. A repeated heading gets a numeric suffix. */
export function headingsOf(body: Block[]): Heading[] {
  const seen = new Map<string, number>();
  return body
    .filter((b): b is Extract<Block, { kind: 'h' }> => b.kind === 'h')
    .map((b) => {
      const base = slugify(b.text);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      return { id: n === 0 ? base : `${base}-${n + 1}`, text: b.text };
    });
}
