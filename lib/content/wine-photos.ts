/**
 * Bottle photographs, keyed by `producer|wine`.
 *
 * Kept apart from the generated snapshot on purpose: Cellarion's export only
 * bundles images as a weekly ZIP, which is a poor thing for a build to
 * depend on, so this map is the site's own index.
 *
 * Every value is a path under `public/`, built from the hand-cut masters in
 * `_bottles/` by `scripts/optimise-bottles.py`. `_bottles/SOURCES.md` says
 * where each photograph came from.
 *
 * Keyed by wine, not bottle, so two vintages of one wine share a photo.
 * A wine missing here falls back to a bottle silhouette coloured by type.
 * Currently missing: Maison Galhaud's Moulin-Galhaud (no bottle shot found).
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
