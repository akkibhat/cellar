/**
 * Recompute each chapter's reading time from its own word count.
 *
 *   node scripts/reading-times.mjs [--dry-run]
 *
 * WHY
 *
 * `minutes` was set by feel, one chapter at a time, and drifted badly: the
 * figures implied anywhere from 45 to 130 words a minute, so two chapters
 * both claiming 8 minutes could differ by a factor of three in length. A
 * number that does not rank is worse than no number, because a reader uses
 * it to choose.
 *
 * THE RATE
 *
 * 200 words a minute, which is a normal pace for prose you are reading to
 * take something in rather than to skim. Everything a reader actually reads
 * counts - the standfirst, the paragraphs, list items and table cells.
 * Interactive tools do not, since the time those take is up to the reader
 * and would inflate a chapter that has one.
 *
 * The floor is two minutes. Below that the number stops being useful and
 * starts looking like a boast about brevity.
 */
import fs from 'node:fs';
import path from 'node:path';
import { files, readChapters } from './reading-order.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');
const WPM = 200;
const FLOOR = 2;

const words = (s) => (s ?? '').trim().split(/\s+/).filter(Boolean).length;

function countBlock(b) {
  switch (b.kind) {
    case 'table':
      return [...b.head, ...b.rows.flat()].reduce((n, c) => n + words(c), 0);
    case 'list':
    case 'steps':
      return b.items.reduce((n, i) => n + words(i), 0);
    case 'tool':
      return 0;
    case 'quote':
      return words(b.text) + words(b.cite);
    default:
      return words(b.title) + words(b.text);
  }
}

const rows = [];
for (const f of files()) {
  const chapters = await readChapters(f);
  const file = path.join(ROOT, 'lib', 'content', 'chapters', `${f}.ts`);
  let src = fs.readFileSync(file, 'utf8');
  let touched = false;

  for (const c of chapters) {
    const n = words(c.standfirst) + c.body.reduce((t, b) => t + countBlock(b), 0);
    const mins = Math.max(FLOOR, Math.round(n / WPM));
    rows.push([c.n, c.title, n, c.minutes, mins]);
    if (mins === c.minutes) continue;

    const at = src.indexOf(`slug: '${c.slug}'`);
    const mAt = src.indexOf(`minutes: ${c.minutes},`, at);
    if (mAt === -1 || mAt - at > 300) throw new Error(`no minutes for ${c.slug}`);
    src =
      src.slice(0, mAt)
      + `minutes: ${mins},`
      + src.slice(mAt + `minutes: ${c.minutes},`.length);
    touched = true;
  }
  if (touched && !DRY) fs.writeFileSync(file, src, 'utf8');
}

rows.sort((a, b) => a[0] - b[0]);
for (const [n, title, w, was, now] of rows) {
  const mark = was === now ? ' ' : '*';
  console.log(
    `${mark} ${String(n).padStart(2)}. ${title.slice(0, 36).padEnd(38)}`
    + `${String(w).padStart(5)} w   ${String(was).padStart(2)} -> ${now} min`,
  );
}
const total = rows.reduce((n, r) => n + r[4], 0);
console.log(
  `\n  ${rows.length} chapters, ${rows.reduce((n, r) => n + r[2], 0)} words, `
  + `${Math.floor(total / 60)}h ${total % 60}m end to end at ${WPM} wpm`,
);
