import type { Metadata } from 'next';
import Contents from '@/components/Contents';
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
    <Contents glossaryCount={GLOSSARY.length} grapeCount={GRAPES.length} />
  );
}
