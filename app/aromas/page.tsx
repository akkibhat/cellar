import type { Metadata } from 'next';
import AromaWheel from '@/components/AromaWheel';
import PageHeader from '@/components/PageHeader';
import { AROMA_FAMILIES } from '@/lib/aromas';

export const metadata: Metadata = {
  title: 'Aroma wheel',
  description:
    'Six aroma families and the descriptors beneath them. Sort before you name.',
};

export default function AromasPage() {
  const total = AROMA_FAMILIES.reduce((n, f) => n + f.descriptors.length, 0);

  return (
    <div className="relative mx-auto max-w-[50rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        eyebrow={`Six families · ${total} descriptors`}
        title="The aroma wheel"
        standfirst="Narrow by family before reaching for a specific fruit. Recognition is easy; recall from nothing is not."
      />
      <AromaWheel />

      <div className="note-block px-5 py-4 mt-8 max-w-[36rem]">
        <p className="hand t-h3 mb-1" style={{ color: 'var(--wine)' }}>
          Training the vocabulary
        </p>
        <p className="!mb-0 t-ui">
          Smell things deliberately when you are not drinking. Open the spice
          drawer and go through it jar by jar. Smell wet stone after rain, cut
          grass, leather, a struck match. The bottleneck is almost never the
          nose - it is the absence of a labelled memory to match against.
        </p>
      </div>
    </div>
  );
}
