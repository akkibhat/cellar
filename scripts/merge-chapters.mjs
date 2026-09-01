/**
 * Merge chapters together, rewriting the files they live in.
 *
 *   node scripts/merge-chapters.mjs [--dry-run]
 *
 * WHY A SCRIPT
 *
 * Merging by hand means splicing one `body: [...]` array into another
 * across a few hundred lines of formatted TypeScript, which is exactly the
 * kind of edit that silently truncates an array - it has already happened
 * twice in this project. So the chapters are read as data, merged as data,
 * and the file is written out fresh.
 *
 * HOW TO USE IT
 *
 * Describe each merge in MERGES below and run it once. `into` is the slug
 * that survives, and keeps its position in the file; `absorb` lists the
 * slugs folded into it, in order, each preceded by a heading if `headings`
 * names one. Notes listed in `drop` are removed, which is usually how you
 * deal with two chapters that each ended on the same admission.
 *
 * It does not renumber. `n` is corrected afterwards by renumber-chapters,
 * so the two concerns stay separable and a merge can be reverted on its own.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { emit } from './reading-order.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');

/* ------------------------------------------------------------------ */

const MERGES = [
  {
    file: 'foundations',
    export: 'FOUNDATIONS',
    into: 'what-wine-is',
    absorb: ['wine-among-drinks'],
    title: 'What wine actually is',
    minutes: 11,
    standfirst:
      'What fermentation actually does, the four things in every glass once '
      + 'it has, and where wine sits among everything else people drink.',
    headings: { 'wine-among-drinks': 'Wine among the drinks' },
    quiz: { 'what-wine-is': 3, 'wine-among-drinks': 2 },
  },
  {
    file: 'grapes',
    export: 'GRAPE_CHAPTERS',
    into: 'white-grapes',
    absorb: ['red-grapes'],
    slug: 'the-grapes',
    title: 'The grapes',
    minutes: 17,
    standfirst:
      'Two dozen varieties account for most of what you will ever be offered. '
      + 'The whites sorted by what they are for, the reds by how much they weigh.',
    headings: { 'white-grapes': 'The whites', 'red-grapes': 'The reds' },
    quiz: { 'white-grapes': 2, 'red-grapes': 2 },
  },
  {
    file: 'france',
    export: 'FRANCE',
    into: 'burgundy',
    absorb: ['rhone', 'loire-alsace-south'],
    slug: 'rest-of-france',
    title: 'The rest of France',
    minutes: 16,
    standfirst:
      'Burgundy, the Rhône, the Loire, Alsace and the South - and where '
      + 'France is still cheap.',
    headings: {
      burgundy: 'Burgundy and Beaujolais',
      rhone: 'The Rhône',
    },
    quiz: { burgundy: 2, rhone: 1, 'loire-alsace-south': 1 },
  },
  {
    file: 'making',
    export: 'MAKING',
    into: 'grape-to-glass',
    absorb: ['bubbles-fortified-sweet'],
    title: 'From grape to glass',
    minutes: 16,
    standfirst:
      'The same fruit, and the decisions that turn it into white, red, rosé, '
      + 'orange, sparkling, fortified or sweet.',
    headings: { 'bubbles-fortified-sweet': 'Bubbles, fortified and sweet' },
    quiz: { 'grape-to-glass': 2, 'bubbles-fortified-sweet': 2 },
  },
  {
    file: 'practice',
    export: 'PRACTICE',
    into: 'reading-a-label',
    absorb: ['buying-and-storing'],
    slug: 'buying-wine',
    title: 'Buying wine',
    minutes: 13,
    standfirst:
      'How to sort what a label must tell you from what it is selling you, '
      + 'and what you are actually paying for.',
    headings: { 'reading-a-label': 'Reading a label',
                'buying-and-storing': 'Where the money goes' },
    quiz: { 'reading-a-label': 2, 'buying-and-storing': 2 },
  },
];

/* ---- reading and re-emitting TypeScript -------------------------- */

async function read(name) {
  const src = fs
    .readFileSync(path.join(ROOT, 'lib', 'content', 'chapters', `${name}.ts`), 'utf8')
    .replace(/^import type .*$/gm, '')
    .replace(/:\s*Chapter\[\]/g, '');
  const tmp = path.join(ROOT, 'node_modules', `.merge-${name}.mjs`);
  fs.writeFileSync(tmp, src, 'utf8');
  try {
    const mod = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
    return Object.values(mod).find(Array.isArray);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/* ---- do it ------------------------------------------------------- */

for (const m of MERGES) {
  const chapters = await read(m.file);
  const find = (s) => {
    const c = chapters.find((x) => x.slug === s);
    if (!c) throw new Error(`${m.file}.ts has no chapter ${s}`);
    return c;
  };
  const base = find(m.into);
  const absorbed = m.absorb.map(find);

  const bodyOf = (c) => {
    const h = m.headings?.[c.slug];
    const kept = (c.body ?? []).filter(
      (b) => !(b.kind === 'note' && (m.drop ?? []).includes(b.title)),
    );
    return h ? [{ kind: 'h', text: h }, ...kept] : kept;
  };

  const merged = {
    slug: m.slug ?? base.slug,
    n: base.n,
    part: base.part,
    title: m.title,
    minutes: m.minutes,
    standfirst: m.standfirst,
    body: [bodyOf(base), ...absorbed.map(bodyOf)].flat(),
    quiz: [base, ...absorbed].flatMap((c) =>
      (c.quiz ?? []).slice(0, m.quiz?.[c.slug] ?? 2),
    ),
  };

  const gone = new Set(m.absorb);
  const next = chapters
    .filter((c) => !gone.has(c.slug))
    .map((c) => (c.slug === base.slug ? merged : c));

  const words = merged.body.reduce(
    (n, b) => n + (b.text ?? b.items?.join(' ') ?? '').split(/\s+/).length, 0);
  console.log(
    `  ${m.file}.ts: ${chapters.length} -> ${next.length} chapters; `
    + `${merged.slug} is ${words} words, ${merged.quiz.length} questions`);
  if (!DRY) emit(m.file, m.export, next);
}
