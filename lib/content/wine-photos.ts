/**
 * Bottle photographs, keyed by `producer|wine`.
 *
 * Kept apart from the generated snapshot on purpose. Cellarion is where the
 * photos are meant to live - they attach with `attach_bottle_image`, which
 * background-removes them and shows them on every bottle of that wine - but
 * the export only bundles images as a ZIP, and only once a week, which is a
 * poor thing for a build to depend on. So this map is the site's own index.
 *
 * Every value is a path under `public/`. The files there are built from the
 * hand-cut masters in `_bottles/` by `scripts/optimise-bottles.py`, and
 * `_bottles/SOURCES.md` records where each photograph came from and what is
 * still wrong with it.
 *
 * Keyed by wine and not by bottle, which is what makes the two Grand Maynes
 * one entry: the labels of a 2017 and a 2021 differ by two digits and one
 * photograph is honest enough for both.
 *
 * A wine missing from here falls back to a bottle silhouette coloured by
 * type, which is not a placeholder standing in for nothing: it still carries
 * the one fact a glance should give you. One wine is missing - Maison
 * Galhaud's Moulin-Galhaud 2016, whose producer has almost no web presence
 * and no bottle shot that could be found.
 */
export const PHOTOS: Record<string, string> = {
  /* Still here. */
  'Mas Saint Louis|Châteauneuf-du-Pape': '/bottles/mas-saint-louis-chateauneuf-du-pape.webp',
  'Domaine de Beaurenard|Châteauneuf-du-Pape': '/bottles/beaurenard-chateauneuf-du-pape.webp',

  /* Drunk. */
  'Valli|Bannockburn Pinot Noir': '/bottles/valli-bannockburn-pinot-noir.webp',
  'Château Petit-Serin|Château Petit-Serin': '/bottles/chateau-petit-serin.webp',
  'Château le Grand Verdus|Vertige Solera': '/bottles/grand-verdus-vertige-solera.webp',
  "François Chidaine|Le Chenin d'Ici": '/bottles/francois-chidaine-le-chenin-dici.webp',
  'Montecampo|Pinot Grigio delle Venezie': '/bottles/montecampo-pinot-grigio.webp',
  'Hawkshead|First Vines Pinot Noir': '/bottles/hawkshead-first-vines-pinot-noir.webp',
  'Wild Irishman|Macushla Pinot Noir': '/bottles/wild-irishman-macushla-pinot-noir.webp',
  'Kinross|Growers Series Fumé Blanc': '/bottles/kinross-growers-matapari-fume-blanc.webp',
  'Château Marjosse|Anthologie Cuvée Hirondelle': '/bottles/marjosse-anthologie-cuvee-hirondelle.webp',
  'Château Romer du Hayot|Château Romer du Hayot': '/bottles/chateau-romer-du-hayot.webp',
  'Château de Fontenille|Les Demoiselles': '/bottles/fontenille-les-demoiselles.webp',
  'Produttori Vini Manduria|Elegia Primitivo di Manduria Riserva': '/bottles/produttori-manduria-elegia-riserva.webp',
  'Kinross|Luminaire Pinot Noir Rosé': '/bottles/kinross-luminaire-pinot-noir-rose.webp',
  'Château de Fontenille|Je suis gris': '/bottles/fontenille-je-suis-gris.webp',
  'Château Lauduc|Classic Blanc': '/bottles/chateau-lauduc-classic-blanc.webp',
  'Château Grand Mayne|Château Grand Mayne': '/bottles/chateau-grand-mayne.webp',
  'Maison Galhaud|Manoir Galhaud': '/bottles/maison-galhaud-manoir-galhaud.webp',
  'Domaine de la Garrelière|Marquis de C': '/bottles/garreliere-marquis-de-c.webp',
  'Paritua|Stone Paddock Pinot Gris': '/bottles/paritua-stone-paddock-pinot-gris.webp',
};
