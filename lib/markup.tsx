import { Fragment, type ReactNode } from 'react';

/**
 * A deliberately tiny inline markup parser.
 *
 * The course content is authored as plain strings, and only two kinds of
 * emphasis are ever needed: **bold** for terms being introduced, and
 * *italic* for foreign words and titles. Pulling in a full markdown
 * library for that would be disproportionate, and would also let authors
 * write things the design has no styling for.
 *
 * Anything not matching those two patterns is rendered literally, so a
 * stray asterisk in the prose is harmless rather than a parse error.
 */

/** Matches **bold** or *italic*, capturing which delimiter was used. */
const PATTERN = /(\*\*|\*)(?!\s)(.+?)(?<!\s)\1/g;

/**
 * Convert an authored string into React nodes, applying bold and italic.
 *
 * Returns an array of nodes rather than a single element so the caller
 * decides the wrapping element (paragraph, list item, table cell).
 */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Reset in case a previous call left the global regex mid-string.
  PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = PATTERN.exec(text)) !== null) {
    // Everything between the previous match and this one is plain text.
    if (match.index > lastIndex) {
      out.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }

    const [full, delimiter, content] = match;
    out.push(
      delimiter === '**' ? (
        <strong key={key++}>{content}</strong>
      ) : (
        <em key={key++}>{content}</em>
      ),
    );

    lastIndex = match.index + full.length;
  }

  // Whatever trails the final match.
  if (lastIndex < text.length) {
    out.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return out;
}
