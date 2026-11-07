import type { Metadata } from 'next';
import GlossarySearch from '@/components/GlossarySearch';
import PageHeader from '@/components/PageHeader';
import { GLOSSARY } from '@/lib/glossary';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'The tasting vocabulary, searchable by meaning as well as by name.',
};

/* The /glossary page: header plus the searchable glossary. */
export default function GlossaryPage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        eyebrow={`${GLOSSARY.length} terms`}
        title="The vocabulary"
        standfirst="Search by the word or by what it means - looking for “tail” finds both caudalie and queue de paon."
      />
      <GlossarySearch />
    </div>
  );
}
