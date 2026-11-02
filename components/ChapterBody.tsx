import type { Block } from '@/lib/types';
import { inline } from '@/lib/markup';
import EmbeddedTool from './EmbeddedTool';
import Link from 'next/link';
import { GLOSSARY } from '@/lib/glossary';
import { headingsOf } from '@/lib/headings';

/**
 * Renders a chapter's body: an ordered list of blocks, each mapped to its
 * own presentation. Keeping this in one place means the authoring format
 * stays small and every chapter looks consistent.
 */
/** The glossary entry a bold phrase names, if it names one. */
function termFor(phrase: string) {
  const k = phrase.trim().toLowerCase();
  return GLOSSARY.find((t) => t.term.toLowerCase() === k);
}

/**
 * For each paragraph, the one glossary term to set in the margin beside
 * it: the first bold phrase that is a glossary entry and has not already
 * had a note earlier in the chapter. One note per paragraph and one per
 * term keeps the margin a few quiet asides rather than a second text.
 */
function marginNotes(body: Block[]): Map<number, ReturnType<typeof termFor>> {
  const used = new Set<string>();
  const out = new Map<number, ReturnType<typeof termFor>>();
  body.forEach((block, i) => {
    if (block.kind !== 'p') return;
    for (const m of block.text.matchAll(/\*\*(.+?)\*\*/g)) {
      const t = termFor(m[1]);
      if (t && !used.has(t.slug)) {
        used.add(t.slug);
        out.set(i, t);
        break;
      }
    }
  });
  return out;
}

export default function ChapterBody({ body }: { body: Block[] }) {
  const ids = headingsOf(body);
  const notes = marginNotes(body);

  /* The id each heading block carries, by the block's position. The nth
     heading takes the nth id, counted from the blocks themselves rather
     than in a variable reassigned while rendering. */
  const headingAt = new Map<number, string>();
  body.forEach((block, i) => {
    if (block.kind !== 'h') return;
    const n = body.slice(0, i).filter((b) => b.kind === 'h').length;
    if (ids[n]) headingAt.set(i, ids[n].id);
  });

  return (
    <div className="prose-paper chapter-prose">
      {body.map((block, i) => (
        <BlockView
          key={i}
          block={block}
          headingId={headingAt.get(i)}
          note={notes.get(i)}
        />
      ))}
    </div>
  );
}

function BlockView({
  block,
  headingId,
  note,
}: {
  block: Block;
  headingId?: string;
  note?: ReturnType<typeof termFor>;
}) {
  switch (block.kind) {
    /* -------------------------------------------------------------- */
    case 'p':
      if (note) {
        return (
          <div className="chap-row">
            <p>{inline(block.text)}</p>
            <aside className="margin-note">
              <strong>{note.term}</strong>
              {note.definition}{' '}
              <Link href={`/glossary#${note.slug}`}>In the glossary</Link>
            </aside>
          </div>
        );
      }
      return <p>{inline(block.text)}</p>;

    /* -------------------------------------------------------------- */
    case 'h':
      return (
        <div className="mt-8 mb-3">
          <h2 id={headingId} className="hand t-h2 mb-1 scroll-mt-24">{block.text}</h2>
          {/* Alternate the rule shape so repeated headings do not look stamped. */}
        </div>
      );

    /* -------------------------------------------------------------- */
    case 'descriptors':
      return (
        <p className="italic" style={{ color: 'var(--ink-soft)' }}>
          {inline(block.text)}
        </p>
      );

    /* -------------------------------------------------------------- */
    case 'list':
      return (
        <ul className="my-5 space-y-2.5 max-w-[34rem]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              {/* An ink dot rather than a bullet glyph. */}
              <span
                className="shrink-0 rounded-full mt-[0.62rem]"
                style={{ width: 5, height: 5, background: 'var(--wine)' }}
                aria-hidden="true"
              />
              <span>{inline(item)}</span>
            </li>
          ))}
        </ul>
      );

    /* -------------------------------------------------------------- */
    case 'steps':
      return (
        <ol className="my-5 space-y-3 max-w-[34rem]">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              <span
                className="hand shrink-0 t-h3 leading-none pt-0.5"
                style={{ color: 'var(--wine)', minWidth: '1.4rem' }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{inline(item)}</span>
            </li>
          ))}
        </ol>
      );

    /* -------------------------------------------------------------- */
    case 'note':
      return (
        <aside className="note-block chap-wide my-6 px-5 py-4">
          {block.title && (
            <p className="hand t-h3 mb-1" style={{ color: 'var(--wine)' }}>
              {block.title}
            </p>
          )}
          <p className="!mb-0 t-ui">{inline(block.text)}</p>
        </aside>
      );

    /* -------------------------------------------------------------- */
    case 'unsure':
      return (
        <aside className="unsure-block chap-wide my-6 px-5 py-4">
          {/* The marker is always shown, with any title appended, so the
              signal cannot be lost behind a specific heading. */}
          <p className="label-ui mb-2" style={{ color: 'var(--caution)' }}>
            Still working this out
            {block.title ? ` - ${block.title}` : ''}
          </p>
          <p className="!mb-0 t-ui" style={{ color: 'var(--ink)' }}>
            {inline(block.text)}
          </p>
        </aside>
      );

    /* -------------------------------------------------------------- */
    case 'quote':
      return (
        <blockquote
          className="my-8 pl-5 max-w-[36rem]"
          style={{ borderLeft: '2px solid var(--wine)' }}
        >
          <p
            className="hand t-h3 leading-snug !mb-2"
            style={{ color: 'var(--wine)' }}
          >
            {block.text}
          </p>
          <cite className="label-ui not-italic">{block.cite}</cite>
        </blockquote>
      );

    /* -------------------------------------------------------------- */
    case 'table':
      return (
        <div className="chap-wide my-6 overflow-x-auto">
          <table className="ledger">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    /* -------------------------------------------------------------- */
    case 'tool':
      return (
        <div className="chap-wide">
          <EmbeddedTool tool={block.tool} only={block.only} />
        </div>
      );

    /* -------------------------------------------------------------- */
    default:
      return null;
  }
}
