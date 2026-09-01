'use client';

import { useMemo, useState } from 'react';
import {
  GLOSSARY_SORTED,
  CATEGORY_LABELS,
  findTerm,
} from '@/lib/glossary';
import type { GlossaryCategory } from '@/lib/types';

/**
 * The searchable glossary.
 *
 * Filters live on term, definition and etymology together, so searching
 * "tail" finds both caudalie and queue de paon even though neither
 * contains the word in its name. Cross-references resolve to a jump link
 * that scrolls and briefly highlights the target.
 */
export default function GlossarySearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategory | 'all'>('all');
  const [flash, setFlash] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_SORTED.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (!q) return true;
      const hay = [t.term, t.definition, t.etymology ?? '']
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, category]);

  /** Scroll to a cross-referenced term and flash it so it is findable. */
  const jumpTo = (slug: string) => {
    // Clear filters first, or the target may not be rendered at all.
    setQuery('');
    setCategory('all');
    setFlash(slug);
    // Wait a frame for the filtered list to re-render before scrolling.
    requestAnimationFrame(() => {
      document
        .getElementById(`term-${slug}`)
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      setTimeout(() => setFlash(null), 1600);
    });
  };

  const categories = Object.keys(CATEGORY_LABELS) as GlossaryCategory[];

  return (
    <div>
      {/* ---- Controls ------------------------------------------- */}
      <div className="card px-5 py-4 mb-5">
        <input
          className="ink-input mb-4"
          placeholder="Search a term, or what it means…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the glossary"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            className="chip"
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(category === c ? 'all' : c)}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <p className="label-ui mb-3">
        {results.length} {results.length === 1 ? 'term' : 'terms'}
      </p>

      {/* ---- Terms ---------------------------------------------- */}
      <div className="grid gap-3 md:grid-cols-2">
        {results.map((t) => (
          <div
            key={t.slug}
            id={`term-${t.slug}`}
            className="card px-4 py-4 transition-colors"
            style={{
              borderColor: flash === t.slug ? 'var(--wine)' : 'var(--rule)',
              background:
                flash === t.slug
                  ? 'color-mix(in srgb, var(--wine) 8%, var(--paper-raised))'
                  : undefined,
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="hand t-h3 leading-none">{t.term}</h3>
              <span
                className="label-ui shrink-0"
                style={{ color: 'var(--ink-faint)' }}
              >
                {CATEGORY_LABELS[t.category]}
              </span>
            </div>

            {t.etymology && (
              <p
                className="t-caption italic mt-1"
                style={{ color: 'var(--ink-faint)' }}
              >
                {t.etymology}
              </p>
            )}

            <p className="t-ui mt-2">{t.definition}</p>

            {t.seeAlso && t.seeAlso.length > 0 && (
              <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="label-ui">See also</span>
                {t.seeAlso.map((slug) => {
                  const target = findTerm(slug);
                  if (!target) return null;
                  return (
                    <button
                      key={slug}
                      onClick={() => jumpTo(slug)}
                      className="t-caption underline underline-offset-2"
                      style={{ color: 'var(--wine)' }}
                    >
                      {target.term}
                    </button>
                  );
                })}
              </p>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <p className="italic py-8" style={{ color: 'var(--ink-soft)' }}>
          No terms match that. Try a broader search.
        </p>
      )}
    </div>
  );
}
