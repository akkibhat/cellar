import type { Metadata } from 'next';
import Logo from '@/components/Logo';
import MarkGrid from '@/components/MarkGrid';
import PageHeader from '@/components/PageHeader';
import Swatches from '@/components/Swatches';
import { NINE, REFINEMENTS } from '@/lib/design-marks';

export const metadata: Metadata = {
  title: 'Design',
  description:
    'What was drawn, what was rejected, and what shipped - round by round.',
};

/**
 * How each decision was reached, in the order it happened.
 *
 * This replaces thirty exploration documents. It is a page rather than a
 * written record because most of these were settled by looking: the marks
 * are drawn live from the geometry the explorations used, at the size that
 * decided them, so the comparison is the real one rather than a screenshot
 * of it.
 */

function Round({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <p className="label-ui mb-1" style={{ color: 'var(--ink-faint)' }}>
        {n}
      </p>
      <h3 className="hand t-h3 leading-none mb-2">{title}</h3>
      {children}
    </div>
  );
}

/** What came back, in the words it came back in. */
function Response({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-4 pl-4 t-base"
      style={{ borderLeft: '3px solid var(--wine)', color: 'var(--ink)' }}
    >
      {children}
    </blockquote>
  );
}

export default function DesignPage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        title="How it was decided"
        standfirst="What was drawn, what came back, and what survived - in the order it happened. The marks are drawn live rather than screenshotted, at the size that decided them."
      />

      {/* ================= THE MARK ================= */}
      <section className="mb-16">
        <h2 className="hand t-h2 mb-1">The mark</h2>
        <p className="t-base mb-8" style={{ color: 'var(--ink-soft)' }}>
          Every mark below sits on the same arch - outer springing at 65 with a
          45 radius, inner at 35, so the frame is a constant 10 and they read
          as a family. Each is shown large and at 22px, because the small one
          decides it: 22px is the sidebar and the browser tab.
        </p>

        <Round n="Round one" title="Nine ideas">
          <MarkGrid marks={NINE} chosen={['2 -', '4 -']} />
        </Round>

        <Response>
          Two and four. The bottles say wine immediately; the book says what
          the writing half is. Everything else is either a wine cliché or an
          arch with something in it.
        </Response>

        <Round n="Round two" title="Three refinements of each">
          <p className="t-base mb-1" style={{ color: 'var(--ink-soft)' }}>
            Each finalist had one weakness, and they were different weaknesses.
            Two lost its bottles below about 24px - three necks merged into a
            blur. Four might not read as a book at all, since a half-and-half
            arch can just read as a two-tone arch.
          </p>
          <MarkGrid marks={REFINEMENTS} chosen={['2b', '4b']} />
        </Round>

        <Response>
          2b and 4b. Fewer and fatter for the bottles; the spine and uneven
          pages for the book.
        </Response>

        <Round n="Round three" title="2b against 4b, head to head">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            Both at every size that matters, in both themes, in a header and
            in a browser tab - the context that settles it rather than a
            swatch on a card. <strong>2b held all the way down:</strong> two
            dark shapes stay separable at 14px, it says wine instantly, and
            the arch keeps it from being just another bottle logo.{' '}
            <strong>4b did not survive alone:</strong> by 22px the spine has
            closed and it is a two-tone arch - handsome, and saying nothing
            about books or wine.
          </p>
        </Round>

        <Response>
          Then use both. One each.
        </Response>

        <Round n="Round four" title="The finding that made that work">
          <p className="t-base mb-4" style={{ color: 'var(--ink-soft)' }}>
            The two marks are the same arch. The book is that arch split into
            halves swung apart; the door is the arch whole with bottles
            punched through it. That is why they can be a pair rather than two
            logos - and why the masthead can animate between them.
          </p>
          <div className="card px-6 py-6 flex flex-wrap items-end gap-x-10 gap-y-6">
            <Logo size={46} suffix="book" />
            <Logo size={46} suffix="door" />
            <Logo size={22} suffix="book" />
            <Logo size={22} suffix="door" />
          </div>
        </Round>

        <Response>
          The door is a bit dark. And why is there black in them - green arch
          and white space?
        </Response>

        <Round n="Round five" title="Both notes were right">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            The first door drawings were a near-solid arch with small bottles
            cut into it, against a book that is roughly half and half.
            Rebalanced. And every alternative colour for the dark half failed
            on contrast, so the only second colour that works is the paper
            itself - a knockout. Same arch, same treatment, different content
            punched through: pages for one, bottles for the other. Dropping
            black made them <em>more</em> of a pair, because the only thing
            that differs now is what shape the hole is.
          </p>
        </Round>
      </section>

      {/* ================= COLOUR ================= */}
      <section className="mb-16">
        <h2 className="hand t-h2 mb-1">Colour</h2>

        <Round n="The question" title="Gold or garnet for the suffix">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            The objection to garnet was that the gap between the two halves of
            the mark would close at small sizes. Settled by rasterising each
            at its real size and magnifying ten times with smoothing off -
            literally what a browser draws, not a scaled screenshot. The gap
            survived.
          </p>
        </Round>

        <Response>Garnet.</Response>

        <Round n="Then" title="Which accent belongs to which half">
          <p className="t-base mb-4" style={{ color: 'var(--ink-soft)' }}>
            Rendered as the same mock twice, differing in one token, so tab
            marker, primary button, active chip, numerals and badges all moved
            together. Garnet for the book, pounamu for the cellar.
          </p>
          <Swatches title="What shipped" tokens={['--garnet', '--pounamu', '--tussock-deep']} />
        </Round>
      </section>

      {/* ================= NAMING ================= */}
      <section className="mb-16">
        <h2 className="hand t-h2 mb-1">Naming</h2>

        <Round n="Round one" title="Two ways to name the halves">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            Either the wordmark never changes and the section name sits beside
            it in the interface face, reading as furniture - or{' '}
            <em>Cellar</em> stays constant and the suffix says which room you
            are in. Both were argued for and against, then drawn.
          </p>
        </Round>

        <Response>
          The suffix. It is nearly free - the wordmark is already a root plus
          a coloured suffix, so only four letters change.
        </Response>

        <Round n="Round two" title="The blur test">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            The options were shown sharp on top and blurred underneath, which
            is roughly how a word is read in peripheral vision - the way
            anyone actually reads a header they have seen a hundred times. The
            suffix swap stayed legible.
          </p>
        </Round>

        <Round n="Round three" title="Whose it is">
          <p className="t-base mb-4" style={{ color: 'var(--ink-soft)' }}>
            A possessive personal name usually implies plain typography, and
            this project has a two-mark system doing functional work. Resolved
            by putting the possessive <em>above</em> the lockup rather than in
            place of it: the person, the suffix and the morph all survive.
            Three fixed things and one that swaps - whose it is, what it is,
            which half you are in.
          </p>
        </Round>
      </section>

      {/* ================= VOICE ================= */}
      <section>
        <h2 className="hand t-h2 mb-1">Voice</h2>
        <Round n="The test" title="Three framings, one passage">
          <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
            The same corpus text framed three ways, so the only variable was
            who was speaking. The institutional voice was the problem rather
            than the third person as such.
          </p>
        </Round>
        <Response>
          A personal project that also works as a resource for someone else.
        </Response>
        <p className="t-base" style={{ color: 'var(--ink-soft)' }}>
          That decision has done more work than any other. It is why the survey
          chapters are short and say so, why each region names whether it is
          first-hand, why the drinking-guidance chapter was cut, and why the
          bottle panel no longer prints a verdict I never gave.
        </p>
      </section>
    </div>
  );
}
