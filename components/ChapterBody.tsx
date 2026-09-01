import type { Block } from '@/lib/types';
import { inline } from '@/lib/markup';
import HandRule from './HandRule';
import EmbeddedTool from './EmbeddedTool';

/**
 * Renders a chapter's body: an ordered list of blocks, each mapped to its
 * own presentation. Keeping this in one place means the authoring format
 * stays small and every chapter looks consistent.
 */
export default function ChapterBody({ body }: { body: Block[] }) {
  return (
    <div className="prose-paper">
      {body.map((block, i) => (
        <BlockView key={i} block={block} index={i} />
      ))}
    </div>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  switch (block.kind) {
    /* -------------------------------------------------------------- */
    case 'p':
      return <p>{inline(block.text)}</p>;

    /* -------------------------------------------------------------- */
    case 'h':
      return (
        <div className="mt-8 mb-3">
          <h2 className="hand t-h2 mb-1">{block.text}</h2>
          {/* Alternate the rule shape so repeated headings do not look stamped. */}
          <HandRule width={200} variant={index % 2 === 0 ? 0 : 1} />
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
        <aside className="note-block my-6 px-5 py-4 max-w-[36rem]">
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
        <aside className="unsure-block my-6 px-5 py-4 max-w-[36rem]">
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
        <div className="my-6 max-w-[40rem] overflow-x-auto">
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
      return <EmbeddedTool tool={block.tool} only={block.only} />;

    /* -------------------------------------------------------------- */
    default:
      return null;
  }
}
