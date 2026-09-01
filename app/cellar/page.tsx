import Link from 'next/link';
import type { Metadata } from 'next';
import HandRule from '@/components/HandRule';
import CellarGrid from '@/components/CellarGrid';
import SectionTitle from '@/components/SectionTitle';
import { sectionName, SECTIONS } from '@/lib/config';
import { CELLAR, PULLED_AT } from '@/lib/cellar';

export const metadata: Metadata = { title: sectionName('cellar') };

/**
 * The Cellar: the half of the site you use with a glass in front of you
 * rather than the half you read.
 *
 * The list is the page. There was a landing here whose entire body was a
 * single card pointing at /cellar/bottles - a hop with nothing to choose
 * between, which put the bottles two clicks from the nav instead of one.
 * The cellar has only ever held one thing, so the index and the thing it
 * indexed are the same route now.
 *
 * That is the same collapse as the one inside the list, a level up:
 * owned and drunk were separate routes and are one page with a filter
 * now, because two bottles on their own read as an empty site and "what
 * have I had" is a single question.
 *
 * The page carries the Cellar's accent as a local custom property, taken
 * from the section table, so recolouring this half is a one-line edit in
 * `lib/config.ts` rather than a sweep through the markup.
 */
export default function CellarPage() {
  return (
    <div
      className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16"
      style={{ ['--accent' as string]: SECTIONS.cellar.accent }}
    >
      <span
        className="stain-ring"
        style={{ width: 210, height: 210, top: 30, right: 0 }}
        aria-hidden="true"
      />

      {/* ---- Masthead -------------------------------------------- */}
      <header className="mb-8">
        <p className="label-ui mb-3" style={{ color: 'var(--accent)' }}>
          Your bottles, your notes
        </p>

        <SectionTitle section="cellar" />
        <HandRule width={340} accent />

        <p className="t-lead leading-relaxed mt-6 max-w-[34rem]">
          The wines I have tried, and the {CELLAR.length}{' '}
          {CELLAR.length === 1 ? 'bottle' : 'bottles'} still waiting. Open any
          of them for the grape, what it goes with, and what I made of it.
        </p>

        <p
          className="t-base mt-4 max-w-[34rem]"
          style={{ color: 'var(--ink-soft)' }}
        >
          This is new, so most of what I have tasted is missing. From here they
          go in as I taste them.
        </p>
      </header>

      <CellarGrid />

      <p className="t-caption mt-8" style={{ color: 'var(--ink-faint)' }}>
        Last updated{' '}
        <span className="nums">
          {new Date(PULLED_AT).toLocaleDateString('en-NZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </p>

      {/* ---- Cross-link ------------------------------------------ */}
      <p className="t-caption mt-10" style={{ color: 'var(--ink-soft)' }}>
        Not sure what you are tasting for?{' '}
        <Link href="/course" className="underline">
          {/* The other half is named, and a name is set in the wordmark.
              Size and ink are inherited so it sits inside this sentence
              rather than standing away from it. */}
          <span
            className="wordmark"
            style={{ fontSize: 'inherit', color: 'inherit' }}
          >
            Cellar
            <span style={{ color: SECTIONS.course.accent }}>book</span>
          </span>
        </Link>{' '}
        covers the method, the vocabulary and what the words actually mean.
      </p>
    </div>
  );
}
