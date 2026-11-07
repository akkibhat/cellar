import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CHAPTERS, chaptersInPart, findChapter, neighbours } from '@/lib/content/course';
import { findPart } from '@/lib/content/parts';
import ChapterBody from '@/components/ChapterBody';
import ChapterFooter from '@/components/ChapterFooter';
import ChapterOpener from '@/components/ChapterOpener';
import ChapterRail from '@/components/ChapterRail';
import PlaceBottles from '@/components/PlaceBottles';
import { PART_COLOURS, FALLBACK } from '@/lib/content/partColours';
import { headingsOf } from '@/lib/headings';
import Quiz from '@/components/Quiz';
import { QUIZZES_ENABLED } from '@/lib/config';

/** Pre-render every chapter at build time. */
export function generateStaticParams() {
  return CHAPTERS.map((m) => ({ slug: m.slug }));
}

/** Page title and description for a chapter: its title and standfirst. */
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

/** A /course/[slug] chapter: opener, side rail, body, place bottles and footer. */
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

  const siblings = chaptersInPart(mod.part).map((c) => ({
    slug: c.slug,
    title: c.title,
  }));

  return (
    <article>
      {/* ---- Opener ---------------------------------------------- */}
      <ChapterOpener
        partSlug={mod.part}
        numeral={part?.numeral}
        partTitle={part?.title}
        title={mod.title}
        standfirst={mod.standfirst}
        minutes={mod.minutes}
      />

      <div className="chapter-grid">
        <ChapterRail
          headings={headingsOf(mod.body)}
          siblings={siblings}
          currentSlug={mod.slug}
          partTitle={part?.title}
        />

        <div className="chapter-main">
          {/* ---- Body ---------------------------------------------- */}
          <ChapterBody body={mod.body} />

          {/* ---- Questions, currently parked ----------------------- *
           * The questions are still authored on every chapter; they are
           * simply not shown while this is a reading resource rather than
           * a test. Flip QUIZZES_ENABLED in lib/config.ts to bring them
           * back.                                                        */}
          {QUIZZES_ENABLED && mod.quiz && mod.quiz.length > 0 && (
            <Quiz slug={mod.slug} questions={mod.quiz} />
          )}

          {/* ---- Bottles from this place ----------------------------- *
           * Only place chapters have any; the rest draw nothing.      */}
          <PlaceBottles
            slug={mod.slug}
            field={(PART_COLOURS[mod.part] ?? FALLBACK).main}
          />

          {/* ---- Footer -------------------------------------------- */}
          <div className="chapter-foot">
            <ChapterFooter slug={mod.slug} prev={prev} next={next} />
          </div>
        </div>
      </div>
    </article>
  );
}
