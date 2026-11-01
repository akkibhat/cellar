import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { CHAPTER_COUNT } from '@/lib/content/course';
import { GRAPES } from '@/lib/grapes';
import { GLOSSARY } from '@/lib/glossary';

/**
 * The front door, set as a poster.
 *
 * Whole fields of flat wine colour (garnet, straw, blush), the heaviest
 * type the site has, and the bottle photographs cut out and stood on the
 * colour, tilted a few degrees. The colour is the idea: every other page
 * tints itself by the wine it is about, and this one lays the three
 * colours side by side.
 *
 * It replaces a centred lockup over two identical cards. There is one
 * statement, one action, and then the two halves as two fields of colour
 * each carrying its own sentence, so the choice between them is made by
 * reading, not by comparing two panels.
 *
 * The figures come from the data, so they cannot drift from what is on
 * the site. There is deliberately no count of bottles anywhere on this
 * page: the front door used to avoid it on the grounds that reporting how
 * many bottles are left makes a doorway into a dashboard, and that still
 * holds. Chapters, grapes and glossary terms are things to read, so they
 * can be counted.
 *
 * The bottle photographs are the same files the cellar grid shows, named
 * here so the poster does not depend on which wines happen to be first in
 * the list. It renders without the sidebar (`Shell` steps aside on this
 * route) and carries its own plain header: the name, the two halves, the
 * theme switch. No script of its own beyond the switch.
 */

const BOTTLES = '/bottles/';

export default function Home() {
  const stats = [
    { n: CHAPTER_COUNT, label: 'chapters' },
    { n: GRAPES.length, label: 'grape varieties' },
    { n: GLOSSARY.length, label: 'terms in the glossary' },
  ];

  return (
    <div className="poster">
      {/* ---- The statement ------------------------------------- */}
      <section className="poster-hero">
        <header className="poster-bar">
          <span className="poster-name">Akki&rsquo;s Cellar</span>
          <nav aria-label="Sections">
            <Link href="/course">Cellarbook</Link>
            <Link href="/cellar">Cellardoor</Link>
            <ThemeToggle className="poster-toggle" />
          </nav>
        </header>

        <h1 className="poster-h1">
          Learned.
          <br />
          Poured.
        </h1>
        <p className="poster-lead">
          Twenty-five chapters on wine, written as I learned them, and the
          bottles I have tasted, with a note on each.
        </p>
        <Link href="/course" className="poster-btn poster-btn--straw">
          Start with the book
        </Link>

        {/* Decorative: the names are on the labels, and the cellar page
            has each bottle properly. */}
        {/* eslint-disable @next/next/no-img-element */}
        <img
          className="poster-bottle poster-bottle--1"
          src={`${BOTTLES}mas-saint-louis-chateauneuf-du-pape.webp`}
          alt=""
        />
        <img
          className="poster-bottle poster-bottle--2"
          src={`${BOTTLES}hawkshead-first-vines-pinot-noir.webp`}
          alt=""
        />
        <img
          className="poster-bottle poster-bottle--3"
          src={`${BOTTLES}beaurenard-chateauneuf-du-pape.webp`}
          alt=""
        />
      </section>

      {/* ---- The two halves ------------------------------------ */}
      <section className="poster-halves">
        <div className="poster-half poster-half--book">
          <h2 className="poster-h2">What I learned</h2>
          <p>
            I went looking for what was actually true about wine and wrote
            down what I found. Some of it corrected things I had believed
            for years.
          </p>
          <Link href="/course" className="poster-btn poster-btn--garnet">
            Read Cellarbook
          </Link>
          <span className="poster-figure" aria-hidden="true">
            {CHAPTER_COUNT}
          </span>
        </div>

        <div className="poster-half poster-half--door">
          <h2 className="poster-h2">What I poured</h2>
          <p>
            What I bought, what I was poured, and what I wrote down before
            I forgot it.
          </p>
          <Link href="/cellar" className="poster-btn poster-btn--garnet">
            Open Cellardoor
          </Link>
          <img
            className="poster-bottle poster-bottle--rose"
            src={`${BOTTLES}kinross-luminaire-pinot-noir-rose.webp`}
            alt=""
          />
          <img
            className="poster-bottle poster-bottle--white"
            src={`${BOTTLES}chateau-lauduc-classic-blanc.webp`}
            alt=""
          />
        </div>
      </section>

      {/* ---- The figures --------------------------------------- */}
      <section className="poster-stats" aria-label="The site in numbers">
        <dl>
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="poster-foot" aria-hidden="true">
        Cellar
      </footer>
    </div>
  );
}
