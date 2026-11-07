import type { Metadata } from 'next';
import TemperatureGuide from '@/components/TemperatureGuide';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Serving temperature',
  description:
    'Every style on one scale, and why the fridge and a heated room are both wrong.',
};

/* The /temperature page: the serving-temperature scale and the 20 minute rule. */
export default function TemperaturePage() {
  return (
    <div className="relative mx-auto max-w-[50rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        eyebrow="Every style · one scale"
        title="Serving temperature"
        standfirst="The cheapest improvement available to any bottle you already own, and the one most people get wrong in both directions."
      />
      <TemperatureGuide />

      <div className="note-block px-5 py-4 mt-8 max-w-[36rem]">
        <p className="hand t-h3 mb-1" style={{ color: 'var(--wine)' }}>
          The 20 minute rule
        </p>
        <p className="!mb-0 t-ui">
          Both common mistakes have the same fix, 20 minutes before you pour:
          put the red somewhere cooler and the white somewhere warmer. A
          heated house sits near 22&nbsp;&deg;C and the fridge near 4, and
          almost nothing wants to be served at either.
        </p>
      </div>
    </div>
  );
}
