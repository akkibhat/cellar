/**
 * Renumber the chapters to their position in reading order.
 *
 *   node scripts/renumber-chapters.mjs [--dry-run]
 *
 * `n` is stored on each chapter rather than derived, because it appears in
 * the eyebrow, the contents and the next/previous links, and deriving it
 * everywhere would mean threading the whole assembled list into each of
 * them. The cost is that any merge, insert or reorder leaves the numbers
 * wrong, so this puts them back.
 *
 * Reading order is the order of PARTS, then the order chapters appear
 * within their file - the same order lib/content/course.ts assembles.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { files } from './reading-order.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');

async function read(name) {
  const src = fs
    .readFileSync(path.join(ROOT, 'lib', 'content', 'chapters', `${name}.ts`), 'utf8')
    .replace(/^import type .*$/gm, '')
    .replace(/:\s*Chapter\[\]/g, '');
  const tmp = path.join(ROOT, 'node_modules', `.renum-${name}.mjs`);
  fs.writeFileSync(tmp, src, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
    return Object.values(mod).find(Array.isArray);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

const FILES = files();

let n = 0;
const moves = [];
for (const f of FILES) {
  const chapters = await read(f);
  const file = path.join(ROOT, 'lib', 'content', 'chapters', `${f}.ts`);
  let src = fs.readFileSync(file, 'utf8');
  let touched = false;

  for (const c of chapters) {
    n++;
    if (c.n === n) continue;
    /* Anchor on the slug so the right chapter's number is replaced, then
       take the first `n:` after it. */
    const at = src.indexOf(`slug: '${c.slug}'`);
    if (at === -1) throw new Error(`no slug ${c.slug} in ${f}.ts`);
    const nAt = src.indexOf(`n: ${c.n},`, at);
    if (nAt === -1 || nAt - at > 200) throw new Error(`no n for ${c.slug}`);
    src = src.slice(0, nAt) + `n: ${n},` + src.slice(nAt + `n: ${c.n},`.length);
    moves.push(`  ${c.slug}: ${c.n} -> ${n}`);
    touched = true;
  }
  if (touched && !DRY) fs.writeFileSync(file, src, 'utf8');
}

console.log(moves.length ? moves.join('\n') : '  already in order');
console.log(`${moves.length} renumbered, ${n} chapters total`);
