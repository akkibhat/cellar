import type { Metadata } from 'next';
import TastingTool from '@/components/TastingTool';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Guided tasting',
  description:
    'Walk the three stages of tasting with a real glass. Your note assembles itself as you go.',
};

export default function TastePage() {
  return (
    <div className="relative mx-auto max-w-[48rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <span
        className="stain-ring"
        style={{ width: 180, height: 180, top: 18, right: 10 }}
        aria-hidden="true"
      />
      <PageHeader
        eyebrow="Tool"
        title="Guided tasting"
        standfirst="Pour something and work through it. Structure first, flavour second, and count the seconds at the end."
        ruleWidth={320}
      />
      <TastingTool />
    </div>
  );
}
