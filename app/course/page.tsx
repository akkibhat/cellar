import type { Metadata } from 'next';
import Contents from '@/components/Contents';
import { GRAPES } from '@/lib/grapes';
import { GLOSSARY } from '@/lib/glossary';

export const metadata: Metadata = { title: 'Cellarbook' };

/**
 * The /course page: an opening statement, the reference tools, and the full
 * contents. It sits a level down from `/` so the front page can show both
 * halves of the site.
 *
 * The tools listed here are the ones that serve *reading*. Guided tasting
 * and the journal are left off, because they are things you do with a glass
 * in front of you rather than things you look up.
 */
export default function CoursePage() {
  return (
    <Contents glossaryCount={GLOSSARY.length} grapeCount={GRAPES.length} />
  );
}
