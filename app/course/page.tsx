import Link from 'next/link';
import type { Metadata } from 'next';
import Contents from '@/components/Contents';
import SectionTitle from '@/components/SectionTitle';
import { CHAPTER_COUNT } from '@/lib/content/course';
import { GRAPES } from '@/lib/grapes';
import { GLOSSARY } from '@/lib/glossary';

export const metadata: Metadata = { title: 'Cellarbook' };

/**
 * The course: an opening statement, the reference tools, and the full
 * contents.
 *
 * This was the site's front page until the Cellar arrived. It moved down a
 * level so that landing on the site shows both halves rather than dropping
 * you straight into a table of contents - which made the second half
 * effectively invisible.
 *
 * The tools listed here are the ones that serve *reading*. Guided tasting
 * and the journal moved to the Cellar, because they are things you do with
 * a glass in front of you rather than things you look up.
 */
export default function CoursePage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      {/* Decorative stains */}

      {/* ---- Masthead -------------------------------------------- */}
      <header className="mb-12">

        <SectionTitle section="course" />

        <p className="t-lead leading-relaxed mt-6 max-w-[34rem]">
          Everything from what fermentation is to how to spit without
          embarrassing yourself, weighted toward France and New Zealand,
          because that is what I am interested in so far.
        </p>

        <p
          className="t-base mt-4 max-w-[34rem]"
          style={{ color: 'var(--ink-soft)' }}
        >
          Written in the order it made sense to learn it, but you can start
          anywhere. {CHAPTER_COUNT} chapters.
        </p>
      </header>

      {/* ---- Reference tools ------------------------------------- */}
      <section className="mb-12">
        <h2 className="hand t-h2 leading-none mb-1">The tools</h2>
        <div className="tool-list">
          <ToolCard
            href="/glossary"
            title="Glossary"
            body={`${GLOSSARY.length} terms, searchable by meaning as well as by name.`}
          />
          <ToolCard
            href="/grapes"
            title="Grape explorer"
            body={`${GRAPES.length} varieties, filterable by colour and climate, sortable by body, acid and tannin.`}
          />
          <ToolCard
            href="/aromas"
            title="Aroma wheel"
            body="Six families and the descriptors under them. Sort before you name."
          />
        </div>
      </section>

      {/* ---- Contents -------------------------------------------- */}
      <h2 className="hand t-h2 leading-none mb-1">Contents</h2>

      <Contents />
    </div>
  );
}

/** A link to one of the standalone tools. */
function ToolCard({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="tool-row">
      <span className="hand t-h2 leading-none">{title}</span>
      <span className="t-ui" style={{ color: 'var(--ink-soft)' }}>
        {body}
      </span>
    </Link>
  );
}
