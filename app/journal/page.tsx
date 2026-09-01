import type { Metadata } from 'next';
import Journal from '@/components/Journal';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Tasting journal',
  description:
    'Every tasting note you have saved, kept in this browser, with side-by-side comparison.',
};

export default function JournalPage() {
  return (
    <div className="relative mx-auto max-w-[48rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <span
        className="stain-ring"
        style={{ width: 175, height: 175, top: 18, right: 10 }}
        aria-hidden="true"
      />
      <PageHeader
        eyebrow="Tool"
        title="Tasting journal"
        standfirst="Select two or three notes to line them up against each other. Structured notes compare; free text does not."
        ruleWidth={300}
      />
      <Journal />

      <p className="t-caption mt-8" style={{ color: 'var(--ink-soft)' }}>
        Notes are stored in this browser only. Nothing is uploaded anywhere,
        and clearing your site data will clear them.
      </p>
    </div>
  );
}
