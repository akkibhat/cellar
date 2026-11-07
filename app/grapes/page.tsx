import type { Metadata } from 'next';
import GrapeExplorer from '@/components/GrapeExplorer';
import PageHeader from '@/components/PageHeader';
import { GRAPES, WHITE_GRAPES, RED_GRAPES } from '@/lib/grapes';

export const metadata: Metadata = {
  title: 'Grape explorer',
  description:
    'Filter and sort the grape varieties by colour, climate, body, acidity and tannin.',
};

/* The /grapes page: header plus the grape explorer. */
export default function GrapesPage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        eyebrow={`${GRAPES.length} varieties · ${WHITE_GRAPES.length} white, ${RED_GRAPES.length} red`}
        title="The grapes"
        standfirst="Sort the whites by acidity and you get, near enough, the order of how long they live and how well they handle food."
      />
      <GrapeExplorer />
    </div>
  );
}
