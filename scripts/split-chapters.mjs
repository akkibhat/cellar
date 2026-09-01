/**
 * Split a chapter in two, rewriting the file it lives in.
 *
 *   node scripts/split-chapters.mjs [--dry-run]
 *
 * The inverse of merge-chapters, and needed for the same reason: a merge
 * that looked right as a description can read badly as a chapter, and the
 * way to find out is to try it. The Rhône, the Loire and the South folded
 * into Burgundy came to 1,325 words with five region headings and no
 * hierarchy, which is a list rather than a chapter.
 *
 * Describe the split in SPLITS below. `at` is the text of the heading the
 * second chapter should begin with; everything from that block onwards goes
 * to it. `dropLeadingHeading` removes the first block of the first chapter,
 * for when it is a heading that now just repeats the chapter title.
 *
 * It does not renumber - renumber-chapters does that afterwards.
 */
import { emit, readChapters } from './reading-order.mjs';

const DRY = process.argv.includes('--dry-run');

const SPLITS = [
  {
    file: 'france',
    export: 'FRANCE',
    from: 'rest-of-france',
    at: 'The Rhône',
    quizToFirst: 2,
    first: {
      slug: 'burgundy',
      title: 'Burgundy and Beaujolais',
      minutes: 7,
      standfirst:
        'Two grapes and hundreds of vineyards, where the producer matters '
        + 'more than the name on the label.',
      dropLeadingHeading: true,
    },
    second: {
      slug: 'rhone-loire-south',
      title: 'The Rhône, the Loire and the South',
      minutes: 9,
      standfirst:
        'One river with two unrelated halves, a thousand kilometres of Loire, '
        + 'and the parts of France that are still cheap.',
    },
  },
];

for (const s of SPLITS) {
  const chapters = await readChapters(s.file);
  const at = chapters.findIndex((c) => c.slug === s.from);
  if (at === -1) throw new Error(`${s.file}.ts has no chapter ${s.from}`);
  const src = chapters[at];

  const cut = src.body.findIndex((b) => b.kind === 'h' && b.text === s.at);
  if (cut === -1) throw new Error(`no heading "${s.at}" in ${s.from}`);

  const head = src.body.slice(0, cut);
  const make = (spec, body) => ({
    slug: spec.slug,
    n: src.n,
    part: src.part,
    title: spec.title,
    minutes: spec.minutes,
    standfirst: spec.standfirst,
    body,
    quiz: [],
  });

  const a = make(
    s.first,
    s.first.dropLeadingHeading && head[0]?.kind === 'h' ? head.slice(1) : head,
  );
  const b = make(s.second, src.body.slice(cut));
  a.quiz = src.quiz.slice(0, s.quizToFirst);
  b.quiz = src.quiz.slice(s.quizToFirst);

  const next = [...chapters.slice(0, at), a, b, ...chapters.slice(at + 1)];
  const words = (c) =>
    c.body.reduce((n, x) => n + (x.text ?? x.items?.join(' ') ?? '').split(/\s+/).length, 0);
  console.log(
    `  ${s.file}.ts: ${chapters.length} -> ${next.length} chapters; `
    + `${a.slug} ${words(a)} w, ${b.slug} ${words(b)} w`);
  if (!DRY) emit(s.file, s.export, next);
}
