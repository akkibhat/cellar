# Roadmap

None of these are bugs. They are the things that would make the site better
than it is, roughly in the order I would do them.

## Next

It is live at cellar.pi.co.nz (Cloudflare Workers, static assets; a push to
`main` deploys it in about a minute).

**A read of the whole thing in its current order.** Tasting moved from the
seventh part to the third and several chapters merged, so the book has not
been read end to end in the shape it is now in.

## The cellar data

The snapshot in `lib/content/cellar-snapshot.ts` carries producer, wine,
vintage, place, type, grapes, rating, notes, the dates a bottle arrived and
was opened, and Cellarion's drinking window. A few more fields are queryable
and worth having.

**Alcohol.** `ABV` exists in Cellarion as an accepted registry field, but no
value is published against any of these wines and no suggestion is pending -
so there is nothing to pull yet. The figures need entering in Cellarion
first; `CellarWine` then needs a field and the panel a line.

**Classification.** Queryable, and null on all 23 bottles. Nothing to show
until it is filled in.

**What a bottle cost and where it came from.** `purchase.price`,
`purchase.date` and `purchase.location`, plus `bottle.size` for anything that
is not a 750. The buying chapter argues about where money goes; the cellar
could show it.

One bottle has no photograph - Maison Galhaud's Moulin-Galhaud (not to be
confused with Manoir Galhaud, which has one). Not urgent.

## Interface

**A responsive pass on a real phone.** The pages do not overflow at 375px
and the tables scroll inside their own container, but that is the absence
of a fault rather than a design. Nobody has read a chapter on a phone end
to end.

**Tap targets.** Thirteen links and chips on a chapter page are under 32px
high, against the 44px that a thumb wants - mostly the aroma descriptors
and inline links. Comfortable with a mouse, fiddly without one.

## Later

**The journal should know about the cellar.** The guided tasting saves a
structured note to `localStorage`, keyed by whatever you typed as the wine
name. It has no connection to the bottles in the snapshot and none to
Cellarion's own tasting notes, so a note about a wine you own does not attach
to it, and clearing site data loses the lot.

The fix is two steps that can happen separately: let the tasting tool pick a
bottle you already own, and push the finished note back to Cellarion so it
lives with the wine rather than in one browser. Worth doing because it is the
only place the two halves of this site would actually meet - at the moment
they share a masthead and nothing else.

Not urgent. The journal earns its place as it stands: it is the payoff of the
guided tasting, and pinning two notes side by side is the one place the book's
argument about method gets tested rather than asserted.

**Decide about the quizzes and the progress checklist.** Both are written and
both are switched off in `lib/config.ts`, on the grounds that this is meant to
be read and consulted rather than completed. That is a choice worth making
deliberately rather than leaving as a default.
