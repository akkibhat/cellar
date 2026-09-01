/**
 * Reference facts about grapes, and the registry's tasting profiles.
 *
 * GENERATED-ISH - gathered from Cellarion over MCP on 2026-08-31, by hand
 * rather than by script. That is not laziness, it is a limitation worth
 * writing down: `scripts/pull-cellar.mjs` reads Cellarion's *export*, and
 * the export only carries your own data - bottles, ratings, notes. The
 * tasting profile and the grape reference belong to Cellarion's shared
 * registry, which the export does not include at all. So this file is
 * refreshed by asking Cellarion's MCP tools directly:
 *
 *   describe_grape   -> GRAPES
 *   get_bottle       -> PROFILES (wine.tasting_profile)
 *
 * WHAT IS DELIBERATELY MISSING: Cellarion also returns a written paragraph
 * for each grape and region. It is good writing, and it is theirs. Pasting
 * it here would repeat the mistake this site spent a fortnight undoing
 * with the museum text, so only the *facts* are kept - a characteristic is
 * a fact, a well-turned sentence about it is not - and each entry carries
 * the public URL so the prose can be linked to rather than absorbed.
 *
 * Region prose is missing for a second reason: Cellarion returns nothing
 * structured for a region (`styles`, `typical_grapes` and `classification`
 * all come back empty), so there were no facts to keep. The course covers
 * these places already, so a wine links to the chapter about where it grew
 * instead. See `courseLinksFor` in lib/cellar.ts.
 */

/* ===================================================================== *
 * Grapes
 * ===================================================================== */

export type GrapeFacts = {
  /** Where the variety comes from, not where this bottle grew. */
  origin: string;
  /** Cellarion's short descriptors. Rendered as chips. */
  characteristics: string[];
  /** How long the variety generally lasts, in Cellarion's words. */
  ageing: string;
  /** Other names for the same grape, which is often the useful fact. */
  synonyms: string[];
  /** How many registry wines use it - a rough measure of how common it is. */
  wineCount: number;
  /** Cellarion's page, so the prose is a link rather than a paste. */
  url: string;
};

/**
 * The fourteen varieties in the cellar.
 *
 * Sauvignon Gris is absent on purpose: Cellarion knows the name and three
 * wines, but has no description, no characteristics and no ageing note for
 * it. An empty entry would be worse than none, because the page can fall
 * back to the region when a grape is unknown but cannot tell the
 * difference between "unknown" and "known to be blank".
 */
export const GRAPES: Record<string, GrapeFacts> = {
  'Pinot Noir': {
    origin: 'France (Burgundy)',
    characteristics: ['red cherry', 'rose', 'forest floor', 'silky'],
    ageing: 'Very good - grand cru Burgundy ages 20+ years',
    synonyms: ['Pinot Nero'],
    wineCount: 968,
    url: 'https://cellarion.app/grapes/pinot-noir',
  },
  Grenache: {
    origin: 'Spain (Aragón)',
    characteristics: ['strawberry', 'cherry', 'garrigue', 'warm'],
    ageing: 'Good - top cuvées 15+ years',
    synonyms: ['Garnacha', 'Cannonau', 'Garnacho'],
    wineCount: 595,
    url: 'https://cellarion.app/grapes/grenache',
  },
  Syrah: {
    origin: 'France (Northern Rhône)',
    characteristics: ['black pepper', 'blackberry', 'olive', 'full-bodied'],
    ageing: 'Excellent - 15 to 30 years for top bottlings',
    synonyms: ['Shiraz'],
    wineCount: 1051,
    url: 'https://cellarion.app/grapes/syrah',
  },
  Mourvèdre: {
    origin: 'Spain (Valencia and Murcia)',
    characteristics: ['dark fruit', 'meaty', 'wild herbs', 'tannic'],
    ageing: 'Excellent - Bandol ages 20+ years',
    synonyms: ['Monastrell', 'Mataro'],
    wineCount: 312,
    url: 'https://cellarion.app/grapes/mourvedre',
  },
  'Cabernet Sauvignon': {
    origin: 'France (Bordeaux)',
    characteristics: ['high tannin', 'blackcurrant', 'cedar'],
    ageing: 'Long',
    synonyms: [],
    wineCount: 1120,
    url: 'https://cellarion.app/grapes/cabernet-sauvignon',
  },
  Merlot: {
    origin: 'France (Bordeaux)',
    characteristics: ['plush', 'plum', 'chocolate'],
    ageing: 'Medium to long',
    synonyms: [],
    wineCount: 777,
    url: 'https://cellarion.app/grapes/merlot',
  },
  'Cabernet Franc': {
    origin: 'France (Bordeaux and the Loire)',
    characteristics: ['raspberry', 'violet', 'leafy', 'medium body'],
    ageing: 'Good - 10 to 20 years for top wines',
    synonyms: [],
    wineCount: 566,
    url: 'https://cellarion.app/grapes/cabernet-franc',
  },
  Sémillon: {
    origin: 'France (Bordeaux)',
    characteristics: ['lemon', 'lanolin', 'waxy', 'ages to honey and toast'],
    ageing: 'Exceptional - Sauternes and Hunter Sémillon age decades',
    synonyms: [],
    wineCount: 118,
    url: 'https://cellarion.app/grapes/semillon',
  },
  'Sauvignon Blanc': {
    origin: 'France (Loire Valley)',
    characteristics: ['gooseberry', 'citrus', 'herbaceous', 'high acidity'],
    ageing: 'Mostly drink young; top Loire ages',
    synonyms: [],
    wineCount: 272,
    url: 'https://cellarion.app/grapes/sauvignon-blanc',
  },
  Muscadelle: {
    origin: 'France (Bordeaux)',
    characteristics: ['grapey', 'floral'],
    ageing: 'In sweet blends, very good',
    synonyms: [],
    wineCount: 50,
    url: 'https://cellarion.app/grapes/muscadelle',
  },
  'Pinot Gris': {
    origin: 'France (Alsace)',
    characteristics: ['pear', 'smoke', 'spice', 'textural'],
    ageing: 'Moderate',
    synonyms: ['Pinot Grigio', 'Grauburgunder'],
    wineCount: 107,
    url: 'https://cellarion.app/grapes/pinot-gris',
  },
  'Chenin Blanc': {
    origin: 'France (Loire Valley)',
    characteristics: ['quince', 'honey', 'high acidity', 'all styles'],
    ageing: 'Exceptional in off-dry and sweet styles',
    synonyms: ['Chenin', 'Steen'],
    wineCount: 106,
    url: 'https://cellarion.app/grapes/chenin-blanc',
  },
  Zinfandel: {
    origin: 'Croatia (as Tribidrag)',
    characteristics: ['bramble', 'jammy berries', 'peppery', 'high alcohol'],
    ageing: 'Moderate - best within 10 years',
    synonyms: ['Primitivo', 'Crljenak'],
    wineCount: 91,
    url: 'https://cellarion.app/grapes/zinfandel',
  },
};

/* ===================================================================== *
 * Tasting profiles
 * ===================================================================== */

/**
 * A wine's measured structure, as Cellarion's registry holds it.
 *
 * All 22 wines have one. That was not true when this file was first
 * written, and the reason is timing: the snapshot in `cellar-snapshot.ts`
 * was pulled at 00:22 on 31 August 2026, and a curator went through the
 * registry between 04:46 and 06:04 the same morning. So the site spent a
 * few days showing two profiles and a blank for the other twenty while
 * Cellarion held the lot. These were read back out on 1 September 2026.
 *
 * The wording is the registry's, copied rather than rewritten: the panel
 * attributes this section to Cellarion, and a paraphrase under that
 * heading would be putting words in someone else's mouth. Only the
 * apostrophes were changed, to the typographic ones this file uses.
 */
export type TastingProfile = {
  body: string;
  /** Null where the registry has not set one. */
  tannin: string | null;
  acidity: string;
  sweetness: string;
  flavours: string[];
  foodPairings: string[];
  description: string;
};

/** Keyed by `producer|wine`, matching `profileKey` in lib/cellar.ts. */
export const PROFILES: Record<string, TastingProfile> = {
  'Mas Saint Louis|Châteauneuf-du-Pape': {
    body: 'full',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'strawberry',
      'red cherry',
      'thyme',
      'orange peel',
      'white pepper',
    ],
    foodPairings: [
      'roast lamb with herbs',
      'grilled sausages',
      'ratatouille',
      'aged tomme',
    ],
    description:
      'A traditional, Grenache-dominant Châteauneuf from a small ' +
      'family estate, raised in old foudres and released with the ' +
      'fruit forward and the tannins already soft. Strawberry and red ' +
      'cherry with thyme, a twist of orange peel and gentle pepper — ' +
      'an approachable, warm-hearted style built for the table rather ' +
      'than long cellaring, though it gains savoury depth over its ' +
      'first decade.',
  },
  'Domaine de Beaurenard|Châteauneuf-du-Pape': {
    body: 'full',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'raspberry',
      'cherry',
      'garrigue',
      'black pepper',
      'liquorice',
      'warm stone',
    ],
    foodPairings: [
      'braised lamb',
      'daube provençale',
      'grilled game birds',
      'hard sheep cheese',
    ],
    description:
      'Biodynamic Châteauneuf from the Coulon family, a blend led by ' +
      'Grenache with Syrah, Mourvèdre and the full spread of the ' +
      'appellation’s permitted varieties, aged mostly in large old ' +
      'foudres so the fruit stays in front. Perfumed raspberry and ' +
      'cherry over garrigue, black pepper and liquorice, with ' +
      'fine-grained tannins and a stony, savoury finish rather than ' +
      'raw power. One of the more elegant houses in the appellation, ' +
      'and it ages gracefully into leather and dried herbs.',
  },
  'Valli|Bannockburn Pinot Noir': {
    body: 'medium',
    tannin: 'medium',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'dark cherry',
      'wild herbs',
      'dried thyme',
      'black tea',
      'forest floor',
      'subtle spice',
    ],
    foodPairings: [
      'duck breast',
      'venison',
      'mushroom risotto',
      'grilled salmon',
    ],
    description:
      'Valli’s Bannockburn Pinot Noir is a savoury, structured ' +
      'expression from one of Central Otago’s warmer, more schisty ' +
      'sub-zones, typically showing dark cherry and earthy, herbal ' +
      'complexity alongside firm tannin and bright acidity. It’s a ' +
      'wine built for the table, with a savoury edge rather than pure ' +
      'fruit sweetness, and the ability to age gracefully over ' +
      'several years. Valli is a highly respected, terroir-focused ' +
      'producer known for restrained, site-specific Pinot Noir.',
  },
  'Château Petit-Serin|Château Petit-Serin': {
    body: 'medium',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: ['blackcurrant', 'white pepper', 'graphite', 'violet', 'cedar'],
    foodPairings: [
      'roast lamb',
      'beef fillet',
      'duck breast',
      'hard cheeses',
    ],
    description:
      'The smallest estate in Margaux — 0.7 hectares of old-vine ' +
      'Cabernet Sauvignon on sandy gravel over clay, farmed ' +
      'organically by Yohan Juste and aged 18 months in French oak. A ' +
      'pure Cabernet expression of the appellation: blackcurrant and ' +
      'white pepper over graphite, with the fine, perfumed tannins ' +
      'Margaux is known for rather than Pauillac weight. Elegant, ' +
      'medium-weight claret built for a decade.',
  },
  'Château le Grand Verdus|Vertige Solera': {
    body: 'medium',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'quince',
      'beeswax',
      'toasted almond',
      'chamomile',
      'sea salt',
    ],
    foodPairings: [
      'oysters and shellfish',
      'roast chicken',
      'mushroom dishes',
      'aged hard cheese',
    ],
    description:
      'A 100% Sémillon from 80-year-old vines on a steep south-facing ' +
      'slope, aged as a solera in underground concrete tanks — the ' +
      'youngest wine in the blend is around three years old, topped ' +
      'with older reserves. The result is unlike a standard Bordeaux ' +
      'white: velvety, waxy texture, quince and toasted almond, a ' +
      'chamomile lift and a saline, lingering finish. The ' +
      'sherry-inspired patina is the point.',
  },
  "François Chidaine|Le Chenin d'Ici": {
    body: 'medium',
    tannin: 'low',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'green apple',
      'quince',
      'pear',
      'chamomile',
      'wet stone',
      'lemon',
    ],
    foodPairings: [
      'goat cheese',
      'river fish',
      'pork with apples',
      'Asian vegetable dishes',
    ],
    description:
      'François Chidaine’s entry Chenin, made from purchased organic ' +
      'fruit around Montlouis in the same hands-off, dry style as his ' +
      'estate wines. Green apple, quince and pear with chamomile and ' +
      'a wet-stone minerality, taut acidity and a clean, bone-dry ' +
      'finish. A straight-talking introduction to Loire Chenin, at ' +
      'its best young with a few years of leeway.',
  },
  'Montecampo|Pinot Grigio delle Venezie': {
    body: 'light',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'green pear',
      'lemon',
      'white flowers',
      'green apple',
      'almond',
    ],
    foodPairings: ['light seafood', 'risotto', 'antipasti', 'aperitif'],
    description:
      'A straightforward Pinot Grigio from the Delle Venezie DOC, ' +
      'made in stainless steel for freshness. Light-bodied and clean ' +
      '— pear, lemon and a hint of white flowers with a soft, ' +
      'slightly almondy finish. Its whole appeal is youth and ' +
      'simplicity: serve it cold and drink it within a couple of ' +
      'years.',
  },
  'Hawkshead|First Vines Pinot Noir': {
    body: 'medium',
    tannin: 'medium',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'red cherry',
      'cranberry',
      'wild thyme',
      'stony spice',
      'violet',
    ],
    foodPairings: ['duck', 'venison', 'mushroom dishes', 'soft cheese'],
    description:
      'First Vines — Hawkshead’s Pinot Noir from the estate’s ' +
      'original Gibbston plantings, in Central Otago’s coolest and ' +
      'highest sub-region: red cherry and cranberry over wild thyme, ' +
      'stony spice and fine, taut tannin. Gibbston Pinot is leaner ' +
      'and more perfumed than the Cromwell Basin’s, and takes longer ' +
      'to open.',
  },
  'Wild Irishman|Macushla Pinot Noir': {
    body: 'medium',
    tannin: 'medium',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'raspberry',
      'red cherry',
      'dark cherry',
      'wet stone',
      'mountain thyme',
      'violet',
    ],
    foodPairings: ['duck', 'venison', 'mushroom dishes', 'soft cheese'],
    description:
      'Macushla — Gaelic for “my darling”, or more literally “my ' +
      'pulse”. Alan Brady planted Central Otago’s first commercial ' +
      'vines in Gibbston in the early 1980s and made the region’s ' +
      'first commercial wine in 1987; this is the wine from his Wild ' +
      'Irishman label, made with Brian Shaw from high Gibbston fruit ' +
      'at around 470 metres, among the highest vineyard land in New ' +
      'Zealand. Lifted florals and raspberry over red and dark ' +
      'cherry, wet stone and a touch of charred oak, with bright ' +
      'acidity and fine, persistent tannin. Cool-climate Pinot with ' +
      'real structure beneath the perfume.',
  },
  'Kinross|Growers Series Fumé Blanc': {
    body: 'medium',
    tannin: 'low',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'grapefruit',
      'white peach',
      'smoke',
      'flint',
      'fresh herbs',
      'beeswax',
    ],
    foodPairings: [
      'grilled fish',
      'roast poultry',
      'goat cheese',
      'asparagus',
    ],
    description:
      'Growers Series Fumé Blanc — Kinross’ barrel-fermented ' +
      'Sauvignon Blanc from Gibbston: citrus and white peach over ' +
      'smoky, flinty oak and a textural, saline palate. The fumé ' +
      'treatment gives weight and savour rather than the grassy ' +
      'pungency Sauvignon usually shows in New Zealand.',
  },
  'Château Marjosse|Anthologie Cuvée Hirondelle': {
    body: 'medium',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'apricot',
      'white peach',
      'orange blossom',
      'lemon curd',
      'bread dough',
      'sea salt',
    ],
    foodPairings: [
      'scallops',
      'roast poultry',
      'Asian-spiced fish',
      'soft-rind cheeses',
    ],
    description:
      'Pierre Lurton’s single-parcel, single-variety Muscadelle from ' +
      'vines planted in 1944 on the clay-limestone of Marjosse, ' +
      'bottled as Vin de France. Muscadelle is normally the seasoning ' +
      'in a Bordeaux blend; here it stands alone — apricot, white ' +
      'peach and orange blossom over a textured, faintly viscous ' +
      'palate with a saline, bread-dough finish. Rich and aromatic ' +
      'rather than crisp, and best with some texture on the plate.',
  },
  'Château Romer du Hayot|Château Romer du Hayot': {
    body: 'full',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'sweet',
    flavours: [
      'apricot',
      'honey',
      'orange marmalade',
      'saffron',
      'toasted nuts',
      'beeswax',
    ],
    foodPairings: ['Roquefort', 'foie gras', 'tarte tatin', 'crème brûlée'],
    description:
      'Deuxième Cru Classé Sauternes in Fargues, made from the ' +
      'classic Sémillon-led blend with Sauvignon Blanc and ' +
      'Muscadelle. Romer du Hayot sits at the lighter, more elegant ' +
      'end of the classed growths — botrytised apricot and honey with ' +
      'orange marmalade and a saffron edge, lifted by good acidity ' +
      'rather than sheer weight. With decades in bottle it deepens to ' +
      'amber, toasted nut and beeswax.',
  },
  'Château de Fontenille|Les Demoiselles': {
    body: 'light',
    tannin: 'low',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'pink grapefruit',
      'pineapple',
      'passion fruit',
      'white flowers',
      'citrus zest',
    ],
    foodPairings: [
      'oysters',
      'grilled white fish',
      'goat cheese salad',
      'aperitif',
    ],
    description:
      'Fontenille’s organic Entre-Deux-Mers blend — around 60% ' +
      'Sauvignon Blanc with Muscadelle, Sauvignon Gris and a little ' +
      'Sémillon. Bright and exotic: pink grapefruit, pineapple and ' +
      'passion fruit with a floral lift from the Muscadelle, a fine, ' +
      'silky texture and a crisp, faintly bitter finish. A wine for ' +
      'freshness — pour it young and cold.',
  },
  'Produttori Vini Manduria|Elegia Primitivo di Manduria Riserva': {
    body: 'full',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'dried plum',
      'blackberry jam',
      'cocoa',
      'carob',
      'vanilla',
      'Mediterranean herbs',
    ],
    foodPairings: [
      'braised beef',
      'lamb with rosemary',
      'aged caciocavallo',
      'grilled sausages',
    ],
    description:
      'The Riserva from Produttori Vini Manduria, the historic ' +
      'cooperative at the heart of the Primitivo di Manduria DOP — ' +
      'old bush-vine Primitivo on the red soils near the coast, aged ' +
      'at least two years with a spell in wood. Warm and generous: ' +
      'dried plum and blackberry jam with cocoa, carob and vanilla, ' +
      'full-bodied and velvety, with the appellation’s typical ripe ' +
      'sweetness on the finish balanced by a savoury herbal edge. ' +
      'Best over its first decade while the fruit is opulent.',
  },
  'Kinross|Luminaire Pinot Noir Rosé': {
    body: 'light',
    tannin: 'low',
    acidity: 'high',
    sweetness: 'dry',
    flavours: [
      'red cherry',
      'wild strawberry',
      'citrus',
      'wild herbs',
      'rose petal',
    ],
    foodPairings: ['salmon', 'salads', 'grilled fish', 'fresh cheese'],
    description:
      'Luminaire — Kinross’ Pinot Noir rosé from Gibbston, Central ' +
      'Otago’s coolest sub-region: pale and dry, with red cherry and ' +
      'wild strawberry over citrus, herbs and a taut, mineral finish. ' +
      'Cool-climate rosé with more acidity and less weight than most.',
  },
  'Château de Fontenille|Je suis gris': {
    body: 'medium',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'white peach',
      'lychee',
      'citrus',
      'white flowers',
      'ripe apple',
    ],
    foodPairings: [
      'shellfish',
      'tapas and pintxos',
      'grilled fish',
      'fresh goat cheese',
    ],
    description:
      'A dry white from a single hectare of Sauvignon Gris on the ' +
      'silt-and-gravel soils of La Sauve, made with a short skin ' +
      'contact and lees ageing. Rounder and more exotic than ' +
      'Sauvignon Blanc — white peach, lychee and citrus over a soft, ' +
      'fleshy texture — with enough freshness to keep it lively. Made ' +
      'to be enjoyed young for its fruit.',
  },
  'Château Lauduc|Classic Blanc': {
    body: 'light',
    tannin: 'low',
    acidity: 'high',
    sweetness: 'dry',
    flavours: ['grapefruit', 'gooseberry', 'lemon', 'boxwood', 'white peach'],
    foodPairings: [
      'seafood platter',
      'grilled fish',
      'goat cheese',
      'aperitif',
    ],
    description:
      'A classic dry Bordeaux blanc from Château Lauduc in the ' +
      'Entre-Deux-Mers hills, Sauvignon Blanc-led with Sémillon for ' +
      'roundness and vinified in stainless steel to keep it zesty. ' +
      'Grapefruit, gooseberry and lemon with a boxwood edge, ' +
      'light-bodied and crisp. Made for early, refreshing drinking.',
  },
  'Château Grand Mayne|Château Grand Mayne': {
    body: 'full',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'black cherry',
      'plum',
      'mocha',
      'cedar',
      'graphite',
      'tobacco leaf',
    ],
    foodPairings: [
      'roast lamb',
      'beef bourguignon',
      'duck confit',
      'mature hard cheese',
    ],
    description:
      'Grand Cru Classé on the clay-limestone slope west of the town ' +
      'of Saint-Émilion, Merlot-led with a serious Cabernet Franc ' +
      'component. Dense black cherry and plum with mocha and cedar ' +
      'from the barrel ageing, and a firm, mineral, graphite spine ' +
      'that keeps the richness in check. With age it turns to ' +
      'tobacco, truffle and dried fruit. A classic mid-weight ' +
      'Saint-Émilion that rewards eight to fifteen years in a good ' +
      'vintage.',
  },
  'Maison Galhaud|Moulin-Galhaud': {
    body: 'full',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'black plum',
      'blackberry',
      'vanilla',
      'toasted oak',
      'cocoa',
      'sweet spice',
    ],
    foodPairings: ['rib of beef', 'roast duck', 'lamb shank', 'aged cheeses'],
    description:
      'The Galhaud family’s small Saint-Émilion Grand Cru — two ' +
      'hectares, almost entirely Merlot, hand-picked and aged 18 ' +
      'months in 100% new French oak in the family’s monolithic ' +
      'cellars beneath the town. Plush and generously oaked in its ' +
      'youth: black plum and blackberry wrapped in vanilla, cocoa and ' +
      'sweet spice, with round, silky tannins. The oak folds in with ' +
      'a few years and the fruit turns to dried plum and tobacco.',
  },
  'Maison Galhaud|Manoir Galhaud': {
    body: 'medium',
    tannin: 'medium',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: [
      'red plum',
      'blackcurrant',
      'cedar',
      'dried herbs',
      'soft spice',
    ],
    foodPairings: [
      'steak frites',
      'roast chicken',
      'charcuterie',
      'hard cheeses',
    ],
    description:
      'The Galhaud family’s Bordeaux AOC, a Merlot–Cabernet Sauvignon ' +
      'blend made in the same Saint-Émilion cellars as their grand ' +
      'cru but for earlier drinking. Fresh red plum and blackcurrant ' +
      'with a touch of cedar and dried herbs, supple tannins and a ' +
      'clean, medium-weight finish. Honest claret to enjoy in its ' +
      'first years while the fruit is bright.',
  },
  'Domaine de la Garrelière|Marquis de C': {
    body: 'medium',
    tannin: 'low',
    acidity: 'medium',
    sweetness: 'dry',
    flavours: ['baked apple', 'hazelnut', 'beeswax', 'lemon curd', 'flint'],
    foodPairings: [
      'roast chicken',
      'mushroom dishes',
      'aged Comté',
      'river fish in butter sauce',
    ],
    description:
      'The Plouzeau family’s biodynamic Chardonnay from a single ' +
      'hectare of thirty-year-old vines on flint and clay over ' +
      'limestone — a rarity in Touraine. Fermented and aged a year on ' +
      'lees in 500-litre casks, bottled without added sulphites, it ' +
      'is textured and nutty rather than crisp: baked apple, hazelnut ' +
      'and beeswax with a flinty edge. Being sulphur-free it is less ' +
      'forgiving of a warm cellar and shows its best with a few ' +
      'years, not many.',
  },
  'Paritua|Stone Paddock Pinot Gris': {
    body: 'medium',
    tannin: null,
    acidity: 'medium',
    sweetness: 'off-dry',
    flavours: [
      'pear',
      'white peach',
      'honeysuckle',
      'citrus',
      'baking spice',
    ],
    foodPairings: ['roast pork', 'Asian food', 'poultry', 'fresh cheese'],
    description:
      'Stone Paddock — Paritua’s Hawke’s Bay Pinot Gris: ripe pear ' +
      'and white peach over honeysuckle and a gently textural, ' +
      'off-dry palate. Warmer-climate Pinot Gris in the richer New ' +
      'Zealand style rather than the crisp Alsatian one.',
  },
};

/**
 * Which of the varieties above are red.
 *
 * Only used to send a wine to the right grape chapter in the course, which
 * is why it is a flat set rather than a field on every entry: a rosé is
 * made from a red grape, so the wine's own type cannot answer this.
 */
export const RED_GRAPES = new Set([
  'Pinot Noir',
  'Grenache',
  'Syrah',
  'Mourvèdre',
  'Cabernet Sauvignon',
  'Merlot',
  'Cabernet Franc',
  'Zinfandel',
]);
