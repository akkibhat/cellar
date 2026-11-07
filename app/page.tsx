import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { CHAPTER_COUNT } from '@/lib/content/course';

/**
 * The front door, set as a poster: flat fields of wine colour (garnet,
 * straw, blush), the heaviest type on the site, and cut-out bottle photos
 * tilted on the colour. One statement, one action, then the two halves as
 * two fields of colour, each with its own sentence.
 *
 * Deliberately no count of bottles: that would turn a doorway into a
 * dashboard. The photos are named here so the poster does not depend on
 * which wines come first in the list. `Shell` steps aside on this route,
 * so the page carries its own header (name, two halves, theme switch).
 */

/* Folder the cut-out bottle photographs are served from. */
const BOTTLES = '/bottles/';

/* The / page: the poster front door. */
export default function Home() {
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

    </div>
  );
}
