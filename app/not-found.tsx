import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

/**
 * The page for a URL that is not here.
 *
 * Next's own 404 carries none of the site's furniture - wrong type, no
 * masthead, no way back - which is a poor place to land somebody who
 * followed a link in good faith. This one is a page like any other, and
 * the shell wraps it as usual.
 *
 * It offers the two halves rather than a single "go home", because a
 * stranger arriving on a dead link has no idea there are two halves, and
 * that is the one thing the site wants to say first.
 */
export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-[40rem] px-6 sm:px-10 lg:px-12 py-16 lg:py-24">
      <PageHeader
        eyebrow="Not here"
        title="No such page"
        standfirst="The address does not match anything on this site. Some chapters were merged and renamed recently, so an older link may have gone with them."
        ruleWidth={260}
      />

      <div className="flex flex-wrap gap-3 mt-8">
        <Link className="btn" href="/course">
          The chapters
        </Link>
        <Link className="btn" href="/cellar">
          The bottles
        </Link>
        <Link className="btn" href="/">
          Start again
        </Link>
      </div>
    </div>
  );
}
