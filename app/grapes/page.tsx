import type { Metadata } from 'next';
import GrapeExplorer from '@/components/GrapeExplorer';
import PageHeader from '@/components/PageHeader';
import { GRAPES, WHITE_GRAPES, RED_GRAPES } from '@/lib/grapes';

export const metadata: Metadata = {
  title: 'Grape explorer',
  description:
    'Filter and sort the grape varieties by colour, climate, body, acidity and tannin.',
};

export default function GrapesPage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <span
        className="stain-ring"
        style={{ width: 190, height: 190, top: 20, right: 8 }}
        aria-hidden="true"
      />
      <PageHeader
        eyebrow={`${GRAPES.length} varieties · ${WHITE_GRAPES.length} white, ${RED_GRAPES.length} red`}
        title="The grapes"
        standfirst="Sort the whites by acidity and you get, near enough, the order of how long they live and how well they handle food."
        ruleWidth={230}
      />
      <GrapeExplorer />
    </div>
  );
}
