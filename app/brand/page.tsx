import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Swatches from '@/components/Swatches';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Brand',
  description:
    'The wordmark, the palette and the type scale, rendered from the same tokens the site uses.',
};

/**
 * The brand guidelines, as a page rather than a document.
 *
 * The swatches read the live custom properties out of the page they are
 * rendered on, so hand-typed hexes can never drift from the real tokens.
 * Change `--garnet` in globals.css and this page changes with it, including
 * the contrast figures, which are measured rather than remembered.
 */

/* Token names for each swatch group, read live by <Swatches>. */
const GROUND = ['--limestone', '--limestone-raised', '--limestone-sunk'];
const INK = ['--schist', '--schist-soft', '--scree'];
const ACCENT = ['--garnet', '--pounamu', '--tussock', '--tussock-deep'];
const RULE = ['--pumice', '--pumice-strong'];
const SEMANTIC = ['--ok', '--caution', '--alert', '--info'];
const AROMA = [
  '--aroma-fruity',
  '--aroma-vegetal',
  '--aroma-woody',
  '--aroma-mineral',
  '--aroma-smoky',
  '--aroma-balsamic',
];

/* The type scale, smallest to largest, with what each step is for. */
const SCALE = [
  ['--t-micro', 'Small-caps labels, eyebrows'],
  ['--t-caption', 'Captions, chips, aliases'],
  ['--t-ui', 'Buttons, navigation'],
  ['--t-base', 'Dense body - cards and notes'],
  ['--t-body', 'Chapter prose. The default.'],
  ['--t-lead', 'Standfirsts and pull quotes'],
  ['--t-h3', 'Section headings'],
  ['--t-h2', 'Chapter headings'],
  ['--t-h1', 'Page headings'],
  ['--t-display', 'Page titles'],
];

/* One bullet in a list of usage rules, set in the soft ink. */
function Rule({ children }: { children: React.ReactNode }) {
  return (
    <li className="t-base mb-2" style={{ color: 'var(--ink-soft)' }}>
      {children}
    </li>
  );
}

/* The /brand page: wordmark, colour, type scale and motion tokens. */
export default function BrandPage() {
  return (
    <div className="relative mx-auto max-w-[52rem] px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
      <PageHeader
        title="Brand"
        standfirst="The wordmark, the palette and the type scale - read from the same tokens the rest of the site uses, so this page cannot drift away from it."
      />

      {/* ---- The wordmark ---------------------------------------- */}
      <section className="mb-14">
        <h2 className="hand t-h2 mb-1">The wordmark</h2>
        <p className="t-base mb-6" style={{ color: 'var(--ink-soft)' }}>
          Two names, one mark, drawn twice. The book shows a cover and an open
          page, so it carries both accents - pounamu for the cover, garnet for
          the page. The door is one shape and takes garnet alone. Green is
          therefore the thing only the book has, which is what tells the two
          apart at sidebar size, where the shapes themselves are nearly the
          same silhouette.
        </p>
        <div className="card px-6 py-6 flex flex-wrap items-end gap-x-12 gap-y-6">
          <Logo size={46} suffix="book" />
          <Logo size={46} suffix="door" />
          <Logo size={26} suffix="book" />
          <Logo size={26} suffix="door" />
          <Logo size={32} wordmark={false} suffix="book" />
          <Logo size={32} wordmark={false} suffix="door" />
        </div>
        <ul className="mt-6 pl-5" style={{ listStyle: 'disc' }}>
          <Rule>
            Wherever either name is written as a name, it is set in the mark
            rather than in body type.
          </Rule>
          <Rule>
            The suffix is bound to the mark and never set separately - it is
            one word with two weights, not two words.
          </Rule>
          <Rule>
            Below about 22px the mark redraws its geometry rather than scaling,
            so it is never simply shrunk past that.
          </Rule>
        </ul>
      </section>

      {/* ---- Colour ---------------------------------------------- */}
      <section className="mb-14">
        <h2 className="hand t-h2 mb-1">Colour</h2>
        <p className="t-base mb-6" style={{ color: 'var(--ink-soft)' }}>
          Named for the ground it came from. Contrast is measured against the
          page beneath each swatch, live, so a token that stops clearing its
          threshold says so here first.
        </p>

        <Swatches title="Ground" tokens={GROUND} against="--schist" />
        <Swatches title="Ink" tokens={INK} />
        <Swatches title="Accents" tokens={ACCENT} />
        <Swatches title="Hairlines" tokens={RULE} against="--schist" />
        <Swatches
          title="Semantic"
          note="Kept separate from the accents on purpose. Garnet is the primary and sets headings, links and the mark, so it cannot also mean error - the two readings would collide on every page."
          tokens={SEMANTIC}
        />
        <Swatches
          title="Aroma families"
          note="One hue per family, tuned to sit at the same contrast so no family reads as more important than another."
          tokens={AROMA}
        />
      </section>

      {/* ---- Type ------------------------------------------------ */}
      <section className="mb-14">
        <h2 className="hand t-h2 mb-1">Type</h2>
        <p className="t-base mb-6" style={{ color: 'var(--ink-soft)' }}>
          Three faces doing three jobs: a serif for reading, a sans for
          interface furniture, and a hand for anything the site says in its own
          voice rather than as a label.
        </p>
        <div className="card px-5 py-4">
          {SCALE.map(([token, use]) => (
            <div
              key={token}
              className="flex items-baseline gap-4 py-1.5 border-b last:border-0"
              style={{ borderColor: 'var(--rule)' }}
            >
              <span
                className="nums shrink-0"
                style={{ fontSize: `var(${token})`, minWidth: '9rem' }}
              >
                Aa
              </span>
              <code className="t-micro shrink-0" style={{ color: 'var(--wine)' }}>
                {token}
              </code>
              <span className="t-caption" style={{ color: 'var(--ink-faint)' }}>
                {use}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Motion ---------------------------------------------- */}
      <section>
        <h2 className="hand t-h2 mb-1">Motion</h2>
        <p className="t-base mb-4" style={{ color: 'var(--ink-soft)' }}>
          Four durations, and one rule. Every animation on the site is
          decoration: the page is complete standing still, because
          <code className="t-micro mx-1">prefers-reduced-motion</code>
          collapses all of them to nothing. Anything load-bearing that moved
          would simply be lost for those readers.
        </p>
        <div className="card px-5 py-4">
          {[
            ['--m-instant', 'Hover, focus, chips - must feel free'],
            ['--m-quick', 'Buttons and small state changes'],
            ['--m-settle', 'Panels opening, pages arriving'],
            ['--m-slow', 'Progress bars, values counting up'],
          ].map(([token, use]) => (
            <div
              key={token}
              className="flex items-baseline gap-4 py-1.5 border-b last:border-0"
              style={{ borderColor: 'var(--rule)' }}
            >
              <code className="t-micro shrink-0" style={{ color: 'var(--wine)', minWidth: '7rem' }}>
                {token}
              </code>
              <span className="t-caption" style={{ color: 'var(--ink-faint)' }}>
                {use}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
