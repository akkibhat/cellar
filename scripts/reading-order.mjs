/**
 * Where the reading order lives, for the scripts that need it.
 *
 * The order is read from the two files that actually decide it (the spread
 * order in lib/content/course.ts, and PARTS in lib/content/parts.ts), so
 * the scripts never keep their own copy that could drift when parts move.
 *
 * It also holds the shared chapter loader and the emitter that writes a
 * chapter file back out. Nothing calls `emit` today; it is kept for the
 * next time chapters are merged or split (the one-off scripts that did the
 * last restructure are in git history).
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');

/** Chapter files, in the order course.ts assembles them. */
export function files() {
  const src = fs.readFileSync(path.join(ROOT, 'lib', 'content', 'course.ts'), 'utf8');
  const from = {};
  for (const m of src.matchAll(/import \{ (\w+) \} from '\.\/chapters\/(\w+)'/g)) {
    from[m[1]] = m[2];
  }
  const body = src.slice(src.indexOf('export const CHAPTERS'));
  return [...body.matchAll(/\.\.\.(\w+),/g)]
    .map((m) => from[m[1]])
    .filter(Boolean);
}

/** The parts, in display order, as [slug, numeral, title]. */
export async function parts() {
  /* Cut at the end of the array rather than stripping types: what follows
     it is a typed function, and the strip only knows about annotations. */
  const whole = fs.readFileSync(path.join(ROOT, 'lib', 'content', 'parts.ts'), 'utf8');
  const src = whole
    .slice(0, whole.indexOf('\n];') + 3)
    .replace(/^import type .*$/gm, '')
    .replace(/:\s*Part\[\]/g, '');
  const tmp = path.join(ROOT, 'node_modules', `.parts-${Date.now()}.mjs`);
  fs.writeFileSync(tmp, src, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmp).href);
    const list = Object.values(mod).find(Array.isArray);
    return list.map((p) => [p.slug, p.numeral, p.title]);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/**
 * One chapter file, read as data: the type import and annotation are
 * stripped and the rest imported as plain JavaScript from a temp file.
 */
export async function readChapters(name) {
  const src = fs
    .readFileSync(path.join(ROOT, 'lib', 'content', 'chapters', `${name}.ts`), 'utf8')
    .replace(/^import type .*$/gm, '')
    .replace(/:\s*Chapter\[\]/g, '');
  const tmp = path.join(ROOT, 'node_modules', `.read-${name}-${Date.now()}.mjs`);
  fs.writeFileSync(tmp, src, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmp).href);
    return Object.values(mod).find(Array.isArray);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/* ---- writing a chapter file back out ------------------------------ */

/** A value as a TS string literal: single-quoted, or JSON if it has a quote. */
const str = (v) =>
  v.includes("'") ? JSON.stringify(v) : `'${v.replace(/\\/g, '\\\\')}'`;

/** One body block as TypeScript source; headings and simple tools on one line. */
function block(b, pad = '      ') {
  const p = pad + '  ';
  if (b.kind === 'h' || (b.kind === 'tool' && !b.only)) {
    return `${pad}{ ${Object.entries(b).map(([k, v]) => `${k}: ${str(v)}`).join(', ')} },`;
  }
  const lines = [`${pad}{`];
  for (const [k, v] of Object.entries(b)) {
    if (Array.isArray(v) && Array.isArray(v[0])) {
      lines.push(`${p}${k}: [`);
      for (const row of v) lines.push(`${p}  [${row.map(str).join(', ')}],`);
      lines.push(`${p}],`);
    } else if (Array.isArray(v)) {
      lines.push(`${p}${k}: [`);
      for (const it of v) lines.push(`${p}  ${str(it)},`);
      lines.push(`${p}],`);
    } else {
      lines.push(`${p}${k}: ${str(v)},`);
    }
  }
  lines.push(`${pad}},`);
  return lines.join('\n');
}

/** One quiz question as TypeScript source. */
const question = (q) => [
  '      {',
  `        q: ${str(q.q)},`,
  '        options: [',
  ...q.options.map((o) => `          ${str(o)},`),
  '        ],',
  `        answer: ${q.answer},`,
  '        because:',
  `          ${str(q.because)},`,
  '      },',
].join('\n');

/** One whole chapter object as TypeScript source. */
const chapter = (c) => [
  '  {',
  `    slug: ${str(c.slug)},`,
  `    n: ${c.n},`,
  `    part: ${str(c.part)},`,
  `    title: ${str(c.title)},`,
  `    minutes: ${c.minutes},`,
  '    standfirst:',
  `      ${str(c.standfirst)},`,
  '    body: [',
  ...c.body.map((b) => block(b)),
  '    ],',
  '    quiz: [',
  ...c.quiz.map(question),
  '    ],',
  '  },',
].join('\n');

/** Write one chapter file, keeping whatever doc comment it opens with. */
export function emit(file, exportName, chapters) {
  const full = path.join(ROOT, 'lib', 'content', 'chapters', `${file}.ts`);
  const header = fs.readFileSync(full, 'utf8').split('import type')[0].trimEnd();
  fs.writeFileSync(full, [
    header,
    '',
    `import type { Chapter } from '@/lib/types';`,
    '',
    `export const ${exportName}: Chapter[] = [`,
    ...chapters.map(chapter),
    '];',
    '',
  ].join('\n'), 'utf8');
}
