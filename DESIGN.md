# Design decisions

Every visual decision on this site was made by rendering the options and
looking at them, usually at the size that actually decides it rather than at
a comfortable one. This is the record of what was tried and what won, so the
reasoning survives the thirty preview documents it came from.

Where a decision was later reversed, the reversal is here too.

---

## Direction

Three whole-site directions were built as working tasting tools, so they
could be judged on the same content rather than as mood boards.

| | |
|---|---|
| **A — Notebook** | Handwritten, informal, close to a paper journal. |
| **B — Editorial** | Clean, staged, magazine-like. |
| **C — App** | Interactive-first: pick families, rate what you find. |

**Settled:** B's structure with A's voice. The site is set in a serif at a
reading measure and staged in three parts, but the writing is first person
and admits what it does not know. C's interactivity survives as the tools
rather than as the frame — the guided tasting sheet is direction C, contained.

---

## The mark

Nine marks were drawn on one shared arch — outer springing at 65 with a 45
radius, inner at 35, so the frame is a constant 10 and they read as a family.
Each was shown large and at 22px, **because the small one decides it.**

> The vault · Bottles in the doorway · Arch as C · The book · Keystone ·
> Bin rack · Filled to a level · The drop · Light only

That narrowed to two, each with a different weakness:

- **2 — Bottles.** Loses its bottles below about 24px; three necks merge into
  a blur.
- **4 — The book.** May not read as a book at all; a half-and-half arch can
  just read as a two-tone arch.

Three refinements of each were drawn (`2a/2b/2c`, `4a/4b/4c`) and tested at
every size that matters, in both themes, in a header and in a browser tab —
"the context that actually settles it, rather than a swatch on a card."

**Settled: both, one per half.** The finding that resolved it was that the
two marks are the same arch. The book is that arch split into halves swung
apart; the door is the arch whole with bottles punched through it. So
Cellarbook took **4b** (spine and uneven pages) and Cellardoor took **2b**
(two bottles, fatter) — and 2b's verdict was the reason it could carry the
half that needs to survive small: *"holds all the way down. Two dark shapes
stay separable at 14px."*

4b alone was judged to fail: *"by 22px the spine has closed and it is a
two-tone arch — handsome, and saying nothing about books or wine."* It works
because it never appears without the wordmark.

**Later corrections:**

- The first Cellardoor drawings were "a bit dark" — a near-solid arch with
  small bottles cut in, against a book mark that is roughly half and half.
  Rebalanced to match.
- Black was dropped from both. Every alternative colour for the dark half
  failed contrast, so the second colour became the paper itself: a knockout.
  Same arch, same treatment, different content punched through — pages for
  one, bottles for the other. *"Dropping black makes them more of a pair than
  they were, because now the only thing that differs is what the hole is
  shaped like."*
- The door's inner leaf was too pointed. It had been a scaled copy of the
  frame, and squeezing the frame's arch narrower pushed an already
  taller-than-semicircular curve past what looked right. Given its own apex.

---

## Colour

**Garnet or gold** for the wordmark's suffix. Settled by rasterising each
mark at its real size and magnifying ten times with smoothing off — *"literally
what a browser draws, not a scaled screenshot"* — to see whether the gap
between the halves survived. It did. **Garnet.**

**How dark garnet can go on the dark theme** was tested as steps, each shown
both as the lockup and as a line of body text, because a fill and a text
weight have different requirements.

**The cellar's accent** — daylight against lamplight, with every mark drawn
at its real geometry and the mock driven by a single `--accent` token so
nothing else varied. Pounamu for Cellardoor, garnet for Cellarbook.

The palette is named for the ground it came from: limestone, schist, scree,
garnet, pounamu, tussock, pumice. Live swatches are at `/brand`, read from
the tokens themselves so the reference cannot drift from the site.

**Reversed since:** the Cellardoor mark was garnet everywhere except the nav,
which overrode it inline. It now colours itself from its own variant.

---

## Naming

**Cellarbook / Cellardoor**, with *Cellar* as the constant root and the
suffix saying which room you are in.

Two alternatives were argued with a for-and-against each, then rendered:
the section name set beside an unchanging wordmark in the interface face,
versus the suffix swap. The suffix won partly on cost — *"the wordmark is
already built as root plus coloured suffix, so only the last four letters
change"* — and partly on a legibility test where the options were shown
sharp on top and **blurred underneath**, "which is roughly how a word is read
in peripheral vision, the way anyone actually reads a header they have seen a
hundred times."

`SECTION_NAMING` still carries both modes.

**The possessive.** "Akki's" sits *above* the lockup rather than replacing it,
so the person, the suffix swap and the morph all survive together. Cellar
appears twice at different sizes — *"which is hierarchy rather than
repetition."* Three things: whose it is, what it is, which half you are in.

**The address.** `cellar.pi.co.nz` — the subdomain carries the root and the
first path segment carries the suffix, so the address bar spells the
wordmark.

---

## Type

Three faces, three jobs: a serif to read in, a sans for interface furniture,
a hand for anything the site says in its own voice.

The interface face had been left at `system-ui`. Candidates were set doing
the four jobs it actually has, at real sizes. **Archivo.** The others are
Crimson Pro for prose, Caveat for the hand, and the wordmark face for the
mark.

---

## The landing page

**Headings.** Five were written and shown in situ at real type sizes with the
top of the two cards beneath, *"because what decides a heading here is what
sits below it."*

**Settled:** "One half is what I have learned. The other is what I have
tasted."

**The two cards.** The Cellarbook card originally read as a course to enrol
in, and the tell was the bullets: *33 modules, 4 hours, 27 varieties, 40
terms* — "four numbers that size a product. A journey is described by its
shape, not its dimensions." The counts came out.

**Layout.** The page was a 58rem container holding a 36rem measure, so a
third of the width was empty and the stain ring was the only thing in it,
which made the decoration read as an accident.

**The morph.** Because the two marks are the same arch, the lockup can
animate between them rather than showing both. Kept, with the suffixes
sharing one grid cell so the root word does not slide as the widths differ.

---

## Voice

Three framings were tested on identical corpus passages, so the only variable
was who was speaking.

**Settled: first person, a personal project that also works as a resource.**
Not institutional, not a course. The site says what it has not drunk rather
than covering for it, and the regional chapters name which places are
first-hand.

This decision is the one that has done the most work since. It is why the
survey chapters are short and say so, why the drinking guidance chapter was
cut, and why the tasting profiles no longer carry a provenance line the site
cannot stand behind.

---

## Facts

Sources disagree more than expected and several widely circulated figures are
wrong. The one worth naming: a liver-metabolism rate that appears in careful
places with its units dropped, describing a liver that would need about eight
months to clear one glass of wine.
