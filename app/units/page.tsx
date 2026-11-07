import type { Metadata } from 'next';
import UnitsCalculator from '@/components/UnitsCalculator';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Standard drinks',
  description:
    'What a pour actually comes to, in the units of four different countries.',
};

/* The /units page: the standard-drinks calculator and why countries disagree. */
export default function UnitsPage() {
  return (
    <div className="relative mx-auto max-w-[50rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        eyebrow="Four countries · one pour"
        title="Standard drinks"
        standfirst="A unit is a fixed dose of alcohol. A glass is whatever the person pouring felt like. This converts between the two."
      />
      <UnitsCalculator />

      <div className="note-block px-5 py-4 mt-8 max-w-[36rem]">
        <p className="hand t-h3 mb-1" style={{ color: 'var(--wine)' }}>
          Why the number moves
        </p>
        <p className="!mb-0 t-ui">
          New Zealand, Australia and France count 10 grams of pure alcohol as
          one standard drink. The United Kingdom uses 8 and the United States
          14, so the same glass is a different number of drinks depending on
          who is counting. Nothing about the wine changes.
        </p>
      </div>
    </div>
  );
}
