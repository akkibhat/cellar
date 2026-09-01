import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CHAPTERS, findChapter, neighbours } from '@/lib/content/course';
import { findPart } from '@/lib/content/parts';
import ChapterBody from '@/components/ChapterBody';
import ChapterFooter from '@/components/ChapterFooter';
import Quiz from '@/components/Quiz';
import { QUIZZES_ENABLED } from '@/lib/config';
import HandRule from '@/components/HandRule';

/** Pre-render every chapter at build time. */
export function generateStaticParams() {
  return CHAPTERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = findChapter(slug);
  if (!mod) return {};
  return { title: mod.title, description: mod.standfirst };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = findChapter(slug);
  if (!mod) notFound();

  const part = findPart(mod.part);
  const { prev, next } = neighbours(slug);

  return (
    <article className="relative mx-auto max-w-[46rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      {/* Decorative stains, positioned off the text column. */}
      <span
        className="stain-ring"
        style={{ width: 190, height: 190, top: 24, right: 8 }}
        aria-hidden="true"
      />

      {/* ---- Header --------------------------------------------- */}
      <header className="mb-8">
        {/* The reading time stays - it is a courtesy, and says what you
            are in for. The lesson number does not: "Chapter 12" made each
            one a scheduled unit of a syllabus rather than something
            written on a subject. */}
        <p className="label-ui mb-2">
          {part && `Part ${part.numeral} · ${part.title} · `}
          {mod.minutes} min
        </p>

        <h1 className="hand t-h1 sm:t-display leading-[1.02] mb-1">
          {mod.title}
        </h1>
        <HandRule width={340} variant={mod.n % 2 === 0 ? 1 : 0} />

        <p
          className="t-lead italic leading-relaxed mt-5 max-w-[33rem]"
          style={{ color: 'var(--ink-soft)' }}
        >
          {mod.standfirst}
        </p>
      </header>

      <hr className="rule-h" />

      {/* ---- Body ------------------------------------------------ */}
      <ChapterBody body={mod.body} />

      {/* ---- Questions, currently parked -------------------------- *
       * The questions are still authored on every chapter; they are
       * simply not shown while this is a reading resource rather than a
       * test. Flip QUIZZES_ENABLED in lib/config.ts to bring them back.  */}
      {QUIZZES_ENABLED && mod.quiz && mod.quiz.length > 0 && (
        <Quiz slug={mod.slug} questions={mod.quiz} />
      )}

      {/* ---- Footer ---------------------------------------------- */}
      <ChapterFooter slug={mod.slug} prev={prev} next={next} />
    </article>
  );
}
