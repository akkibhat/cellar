/**
 * Write `_previews/chapters.md` back into the chapter files.
 *
 *   node scripts/import-chapters.mjs           # apply
 *   node scripts/import-chapters.mjs --dry-run # list what would change
 *
 * The other half of `scripts/export-chapters.mjs`. Edit the prose in the
 * Markdown, run this, and the strings in `lib/content/chapters/` are
 * updated in place. Nothing is retyped, so nothing is mistyped.
 *
 * HOW IT IS KEPT SAFE
 *
 * It never rewrites a file wholesale. For each block it builds the exact
 * string literal the source currently holds, checks that literal appears
 * once and only once in that file, and swaps it. A block whose text has
 * not changed is not touched at all, so the diff is only ever the edits.
 *
 * If an anchor has gone missing, or a literal is not found, or is found
 * twice, that block is reported and skipped rather than guessed at. The
 * failure mode is doing nothing, which is recoverable; writing a paragraph
 * into the wrong chapter is not.
 *
 * DELETING A BLOCK
 *
 * Write DELETE into a block's anchor - `<!-- what-wine-is:7:unsure DELETE -->`
 * - and the block is removed from the chapter rather than rewritten.
 * Deletions happen after every text swap and run from the last block
 * backwards, so removing one cannot shift the next out from under itself.
 *
 * A LIST THAT CHANGES LENGTH
 *
 * Item-by-item swapping cannot say "five bullets became four", so when the
 * count differs the whole items array is rewritten in place. The block
 * itself stays where it is; only its contents change.
 *
 * ADDING A BLOCK
 *
 * Give it an anchor whose index is `new` and say where it goes:
 *
 *     <!-- marlborough:new:note AFTER 12 -->
 *
 * and the block is built and inserted after block 12 of that chapter.
 * Several may share a chapter; they are placed from the bottom up so an
 * earlier insertion cannot move a later one.
 *
 * Both adding and deleting renumber every block after them, which the
 * Markdown does not know about, so either forces a re-export. The script
 * says so rather than letting the next run write a paragraph into the
 * wrong place.
 *
 * Straight apostrophes become typographic ones on the way in. The chapter
 * files are single-quoted strings that currently contain no escapes at all,
 * and keeping it that way means an apostrophe typed in the Markdown can
 * never break a build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');
const given = process.argv.slice(2).find((a) => !a.startsWith('--'));

/**
 * The Markdown to read back in.
 *
 * The export is one file per part, so the default is all of them together.
 * Anchors carry the chapter slug, so a block is found by name rather than
 * by position and it makes no difference which file it arrived in.
 *
 * Passing a path reads just that file, which is how you import one part
 * without touching the rest - or try a candidate without disturbing the
 * working copy.
 */
const SOURCES = (() => {
  if (given) return [path.resolve(given)];
  const dir = path.join(ROOT, '_previews', 'chapters');
  if (!fs.existsSync(dir)) {
    console.error(`no ${path.relative(ROOT, dir)} - run export-chapters first`);
    process.exit(1);
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => path.join(dir, f));
})();

const FILES = [
  'foundations', 'grapes', 'france', 'newzealand',
  'world', 'making', 'tasting', 'practice', 'body',
];

async function readChapters(name) {
  const src = fs
    .readFileSync(path.join(ROOT, 'lib', 'content', 'chapters', `${name}.ts`), 'utf8')
    .replace(/^import type .*$/gm, '')
    .replace(/:\s*Chapter\[\]/g, '');
  const tmp = path.join(ROOT, 'node_modules', `.chapters-in-${name}.mjs`);
  fs.writeFileSync(tmp, src, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
    return Object.values(mod).find(Array.isArray);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/** House style: no escapes in the source, so no straight apostrophes. */
const tidy = (s) => s.replace(/'/g, '’').trim();

/* ---- parse the Markdown into blocks, keyed by anchor ---------------- */

const ANCHOR = /^<!--\s+([a-z0-9-]+):([a-z0-9]+):([a-z]+)(?:\s+(.*?))?\s+-->$/;
const edited = new Map();
const inserts = [];
let current = null;

const lines = SOURCES.flatMap((f) => fs.readFileSync(f, 'utf8').split(/\r?\n/));

/** Chapter slugs this run's Markdown actually covers. */
const seen = new Set(
  lines.flatMap((l) => {
    const m = /^<!--\s*([a-z0-9-]+):/.exec(l.trim());
    return m ? [m[1]] : [];
  }),
);

for (const line of lines) {
  const m = line.match(ANCHOR);
  if (m) {
    const [, slug, idx, kind, extra] = m;
    if (idx === 'new') {
      const after = /AFTER\s+(\d+)/.exec(extra ?? '');
      current = { slug, kind, after: after ? Number(after[1]) : null, lines: [] };
      inserts.push(current);
      continue;
    }
    current = {
      slug,
      idx,
      kind,
      readOnly: /READ-ONLY/.test(extra ?? ''),
      remove: /\bDELETE\b/.test(extra ?? ''),
      lines: [],
    };
    edited.set(`${slug}:${idx}`, current);
    continue;
  }
  if (!current) continue;
  if (line.startsWith('### ') || line.startsWith('## ') || line === '---') {
    current = null;
    continue;
  }
  current.lines.push(line);
}

/** Turn the collected lines back into the shape the block had. */
function parse(b) {
  const lines = b.lines.map((l) => l.trimEnd());
  const text = () => tidy(lines.filter(Boolean).join(' '));

  switch (b.kind) {
    case 'p':
      return { text: text() };
    case 'h':
      return { text: tidy(lines.filter(Boolean).join(' ').replace(/^#+\s*/, '')) };
    case 'standfirst':
    case 'descriptors':
      return { text: tidy(lines.filter(Boolean).join(' ').replace(/^\*|\*$/g, '')) };
    case 'list':
    case 'steps':
      return {
        items: lines
          .filter((l) => /^\s*(?:-|\d+\.)\s+/.test(l))
          .map((l) => tidy(l.replace(/^\s*(?:-|\d+\.)\s+/, ''))),
      };
    case 'note':
    case 'unsure': {
      const q = lines.filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, ''));
      const title = q[0] && /^\*\*.*\*\*$/.test(q[0].trim())
        ? tidy(q[0].trim().replace(/^\*\*|\*\*$/g, ''))
        : undefined;
      const rest = (title ? q.slice(1) : q).filter(Boolean);
      return { title, text: tidy(rest.join(' ')) };
    }
    case 'table': {
      const rows = lines
        .filter((l) => l.trim().startsWith('|'))
        .map((l) =>
          l.trim().replace(/^\||\|$/g, '').split('|').map((c) => tidy(c)),
        );
      if (rows.length < 2) return null;
      const head = rows[0];
      const body = rows.slice(1).filter((r) => !r.every((c) => /^-{2,}$/.test(c)));
      return { head, rows: body };
    }
    case 'quote': {
      const q = lines.filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, ''));
      const citeAt = q.findIndex((l) => l.trimStart().startsWith('—'));
      return {
        text: tidy(q.slice(0, citeAt === -1 ? undefined : citeAt).filter(Boolean).join(' ')),
        cite: citeAt === -1 ? undefined : tidy(q[citeAt].replace(/^\s*—\s*/, '')),
      };
    }
    default:
      return null;
  }
}

/**
 * Replace a list block's items array wholesale, for when the number of
 * bullets has changed. Finds the block by a string it still owns, then
 * swaps everything between its brackets.
 */
function endOfArray(src, openAt) {
  let depth = 0;
  for (let i = openAt; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function rewriteItems(src, owned, items) {
  const at = src.indexOf(`'${owned}'`);
  if (at === -1) return null;
  const open = src.lastIndexOf('items: [', at);
  if (open === -1) return null;
  const close = endOfArray(src, src.indexOf('[', open));
  if (close === -1) return null;
  const body = items.map((i) => `          '${i}',`).join('\n');
  return src.slice(0, open) + 'items: [\n' + body + '\n        ' + src.slice(close);
}

/**
 * Build the TypeScript literal for a new block, in the file's own shape:
 * six spaces to the brace, eight to each field, trailing commas.
 */
function renderBlock(kind, parsed) {
  const q = (v) => `'${v}'`;
  const rows = [`        kind: ${q(kind)},`];
  if (parsed.title) rows.push(`        title: ${q(parsed.title)},`);
  if (parsed.items) {
    rows.push('        items: [');
    parsed.items.forEach((i) => rows.push(`          ${q(i)},`));
    rows.push('        ],');
  }
  if (parsed.text) rows.push(`        text: ${q(parsed.text)},`);
  if (parsed.cite) rows.push(`        cite: ${q(parsed.cite)},`);
  return ['      {', ...rows, '      },'].join('\n') + '\n';
}

/**
 * Where one block's object literal ends, so a new one can follow it.
 * Same brace walk as cutBlock, and safe for the same reason.
 */
function endOfBlock(src, owned) {
  if (!owned) return -1;
  const at = src.indexOf(`'${owned}'`);
  if (at === -1) return -1;
  let i = at;
  for (let depth = 0; i >= 0; i--) {
    if (src[i] === '}') depth++;
    else if (src[i] === '{') {
      if (depth === 0) break;
      depth--;
    }
  }
  let j = i;
  for (let depth = 0; j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  let end = j + 1;
  if (src[end] === ',') end++;
  if (src[end] === '\n') end++;
  return end;
}

/**
 * Replace a table's head and rows. Located like any other block, then
 * everything between `head: [` and the end of `rows` is rebuilt.
 *
 * The end of `rows` is found by matching brackets. Its rows are arrays, so
 * looking for the first `],` finds the end of the first row and leaves the
 * rest of the old table dangling after the new one.
 */
function rewriteTable(src, owned, head, rows) {
  const at = src.indexOf(`'${owned}'`);
  if (at === -1) return null;
  const open = src.lastIndexOf('head: [', at);
  if (open === -1) return null;
  const close = endOfArray(src, src.indexOf('[', src.indexOf('rows: [', open)));
  if (close === -1) return null;
  const cells = (r) => r.map((c) => `'${c}'`).join(', ');
  const out =
    `head: [${cells(head)}],` +
    `\n        rows: [\n` +
    rows.map((r) => `          [${cells(r)}],`).join('\n') +
    `\n        `;
  return src.slice(0, open) + out + src.slice(close);
}

/**
 * Cut one block's object literal out of a chapter file.
 *
 * Finds a string the block owns, walks back to the brace that opens the
 * object and forward to the one that closes it, then removes the whole
 * thing with its trailing comma and line. Safe because no authored string
 * in these files contains a brace - checked before this was written - so
 * prose cannot throw the depth count.
 */
function cutBlock(src, owned) {
  if (!owned) return null;
  const at = src.indexOf(`'${owned}'`);
  if (at === -1) return null;

  let i = at;
  for (let depth = 0; i >= 0; i--) {
    if (src[i] === '}') depth++;
    else if (src[i] === '{') {
      if (depth === 0) break;
      depth--;
    }
  }
  if (i < 0) return null;

  let j = i;
  for (let depth = 0; j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  let end = j + 1;
  if (src[end] === ',') end++;
  while (src[end] === ' ') end++;
  if (src[end] === '\n') end++;

  let start = i;
  while (start > 0 && src[start - 1] !== '\n') start--;
  if (src.slice(start, i).trim() !== '') start = i;

  return src.slice(0, start) + src.slice(end);
}

/* ---- swap the changed literals, one at a time ----------------------- */

let changed = 0;
let added = 0;
let removed = 0;
const problems = [];

for (const file of FILES) {
  const filePath = path.join(ROOT, 'lib', 'content', 'chapters', `${file}.ts`);
  let src = fs.readFileSync(filePath, 'utf8');
  const chapters = await readChapters(file);
  let touched = 0;

  /** Replace one string literal, refusing anything ambiguous. */
  const swap = (was, now, where) => {
    if (was === now) return;
    const literal = `'${was}'`;
    const hits = src.split(literal).length - 1;
    if (hits !== 1) {
      problems.push(`${where}: original literal ${hits === 0 ? 'not found' : `found ${hits} times`}`);
      return;
    }
    if (now.includes("'")) {
      problems.push(`${where}: replacement still contains a straight quote`);
      return;
    }
    src = src.replace(literal, `'${now}'`);
    touched++;
    changed++;
    if (DRY) console.log(`  ${where}\n    - ${was.slice(0, 90)}\n    + ${now.slice(0, 90)}`);
  };

  for (const c of chapters) {
    /* Importing a single part is a normal thing to do, and the chapters in
       every other part are then legitimately absent. Only a chapter the
       source actually mentions is checked; one it says nothing about is
       left alone rather than reported as twenty missing anchors. */
    if (!seen.has(c.slug)) continue;

    const sf = edited.get(`${c.slug}:standfirst`);
    if (sf) swap(c.standfirst, parse(sf).text, `${c.slug} standfirst`);
    else problems.push(`${c.slug}: standfirst anchor missing`);

    c.body.forEach((b, i) => {
      const e = edited.get(`${c.slug}:${i}`);
      if (!e) return problems.push(`${c.slug}:${i}: anchor missing`);
      if (b.kind === 'tool') return;
      if (b.kind === 'table') {
        const p = parse(e);
        if (!p || !p.head) return;
        const same =
          JSON.stringify([b.head, b.rows]) === JSON.stringify([p.head, p.rows]);
        if (same) return;
        if (p.rows.some((r) => r.length !== p.head.length)) {
          return problems.push(
            `${c.slug}:${i} (table): a row does not match the header width`,
          );
        }
        if ([p.head, ...p.rows].flat().some((v) => v.includes("'"))) {
          return problems.push(`${c.slug}:${i} (table): a cell has a straight quote`);
        }
        const next = rewriteTable(src, b.head[0], p.head, p.rows);
        if (!next) return problems.push(`${c.slug}:${i} (table): could not rewrite`);
        src = next;
        touched++;
        changed++;
        if (DRY) console.log(`  ${c.slug}:${i} (table): rewritten`);
        return;
      }
      if (e.readOnly) return;
      if (e.kind !== b.kind) {
        return problems.push(`${c.slug}:${i}: kind changed ${b.kind} -> ${e.kind}`);
      }
      const p = parse(e);
      if (!p) return;
      const where = `${c.slug}:${i} (${b.kind})`;
      if ('items' in p && b.items) {
        if (p.items.length !== b.items.length) {
          if (p.items.some((i) => i.includes("'"))) {
            return problems.push(`${where}: a bullet still has a straight quote`);
          }
          const next = rewriteItems(src, b.items[0], p.items);
          if (!next) {
            return problems.push(`${where}: could not rewrite the list`);
          }
          src = next;
          touched++;
          changed++;
          if (DRY) {
            console.log(`  ${where}: ${b.items.length} bullets -> ${p.items.length}`);
          }
          return;
        }
        b.items.forEach((it, n) => swap(it, p.items[n], `${where}[${n}]`));
      } else {
        if (p.title !== undefined && b.title !== undefined) swap(b.title, p.title, `${where} title`);
        if (p.cite !== undefined && b.cite !== undefined) swap(b.cite, p.cite, `${where} cite`);
        if (p.text !== undefined && b.text !== undefined) swap(b.text, p.text, `${where}`);
      }
    });
  }

  /**
   * What this block's literal says in `src` right now: the edited text if
   * the swap pass has already rewritten it, otherwise what it was.
   */
  const ownedNow = (c, i) => {
    const b = c.body[i];
    const e = edited.get(`${c.slug}:${i}`);
    const now = e && !e.readOnly ? parse(e) : null;
    return (
      now?.text ||
      now?.title ||
      now?.items?.[0] ||
      b.text ||
      b.title ||
      b.items?.[0] ||
      b.tool
    );
  };

  /* Bottom up, so an earlier insertion cannot move a later one. */
  const adding = inserts
    .filter((ins) => chapters.some((c) => c.slug === ins.slug))
    .sort((a, b) => (b.after ?? -1) - (a.after ?? -1));
  for (const ins of adding) {
    const chapter = chapters.find((c) => c.slug === ins.slug);
    const anchorBlock = chapter.body[ins.after];
    if (ins.after === null || !anchorBlock) {
      problems.push(`${ins.slug}: new ${ins.kind} has no usable AFTER`);
      continue;
    }
    const at = endOfBlock(src, ownedNow(chapter, ins.after));
    if (at === -1) {
      problems.push(`${ins.slug}: could not find block ${ins.after} to insert after`);
      continue;
    }
    const parsed = parse({ ...ins, lines: ins.lines });
    if (!parsed) {
      problems.push(`${ins.slug}: cannot build a ${ins.kind} block`);
      continue;
    }
    src = src.slice(0, at) + renderBlock(ins.kind, parsed) + src.slice(at);
    touched++;
    added++;
    if (DRY) console.log(`  ${ins.slug}: new ${ins.kind} after block ${ins.after}`);
  }

  /* Backwards, so an earlier removal cannot move a later one. */
  const doomed = [];
  for (const c of chapters) {
    c.body.forEach((b, i) => {
      if (edited.get(`${c.slug}:${i}`)?.remove) doomed.push({ c, b, i });
    });
  }
  for (const { c, b, i } of doomed.reverse()) {
    const next = cutBlock(src, ownedNow(c, i));
    if (!next) {
      problems.push(`${c.slug}:${i}: could not find the block to delete`);
      continue;
    }
    src = next;
    touched++;
    removed++;
    if (DRY) console.log(`  ${c.slug}:${i} (${b.kind}) would be REMOVED`);
  }

  if (touched && !DRY) fs.writeFileSync(filePath, src, 'utf8');
  if (touched) console.log(`${file}.ts: ${touched} string(s)${DRY ? ' would change' : ' changed'}`);
}

console.log(`\n${changed} string(s)${DRY ? ' would be' : ''} updated`);
if (added) console.log(`${added} block(s)${DRY ? ' would be' : ''} added`);
if (added || removed) {
  if (removed) console.log(`${removed} block(s)${DRY ? ' would be' : ''} removed`);
  console.log(
    'Adding or deleting renumbers the blocks after it, so the Markdown is' +
      ' stale.' +
      (DRY ? '' : ' Re-run scripts/export-chapters.mjs before editing again.'),
  );
}
if (problems.length) {
  console.log(`\n${problems.length} skipped:`);
  problems.forEach((p) => console.log('  ' + p));
  process.exitCode = 1;
}
