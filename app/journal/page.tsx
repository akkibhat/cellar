import type { Metadata } from 'next';
import Journal from '@/components/Journal';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Tasting journal',
  description:
    'Every tasting note you have saved, kept in this browser, with side-by-side comparison.',
};

/* The /journal page: saved tasting notes, plus a note that they stay in this browser. */
export default function JournalPage() {
  return (
    <div className="relative mx-auto max-w-[48rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        title="Tasting journal"
        standfirst="Select two or three notes to line them up against each other. Structured notes compare; free text does not."
      />
      <Journal />

      <p className="t-caption mt-8" style={{ color: 'var(--ink-soft)' }}>
        Notes are stored in this browser only. Nothing is uploaded anywhere,
        and clearing your site data will clear them.
      </p>
    </div>
  );
}
