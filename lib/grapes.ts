import type { Grape } from './types';

/**
 * The grape varieties worth knowing first.
 *
 * Chosen on two criteria: the ones you meet constantly on a wine list
 * anywhere in the world, and the eight that make Bordeaux - since that is
 * where this course started. New Zealand's signature varieties are all
 * here too.
 *
 * The 1-5 scales are deliberately coarse. They exist so the explorer can
 * filter and so the meters give a shape at a glance; they are not
 * measurements, and any individual bottle can sit a point either side of
 * its variety's typical value.
 */
export const GRAPES: Grape[] = [
  /* ================================================================ *
   * WHITE
   * ================================================================ */
  {
    slug: 'sauvignon-blanc',
    name: 'Sauvignon Blanc',
    colour: 'white',
    homes: ['Marlborough', 'Loire (Sancerre, Pouilly-Fume)', 'Bordeaux'],
    climate: 'cool',
    body: 2,
    acidity: 5,
    tannin: 1,
    aromas: ['gooseberry', 'passionfruit', 'cut grass', 'elderflower', 'flint'],
    note:
      'The grape New Zealand made its name on, and one of the few where a country genuinely redrew the world’s idea of a variety. Marlborough turned it explosive and tropical; the Loire keeps it flinty and restrained; Bordeaux blends it with Semillon and puts it in barrel. Same grape, three arguments.',
    tryThis:
      'Drink a Sancerre next to a Marlborough bottle. Nothing teaches the idea of terroir faster.',
  },
  {
    slug: 'chardonnay',
    name: 'Chardonnay',
    colour: 'white',
    homes: ['Burgundy', 'Champagne', 'Hawke’s Bay', 'Margaret River'],
    climate: 'moderate',
    body: 3,
    acidity: 3,
    tannin: 1,
    aromas: ['green apple', 'lemon curd', 'hazelnut', 'butter', 'wet stone'],
    note:
      'The most malleable white there is - it carries whatever the winemaker does to it, which is exactly why it swung from fashionable to reviled and back. Unoaked Chablis and a rich barrel-fermented Hawke’s Bay bottle taste almost unrelated, and both are honest Chardonnay.',
    tryThis:
      'Chablis for the mineral, taut version; anything from the Cote de Beaune for the benchmark of the rich one.',
  },
  {
    slug: 'riesling',
    name: 'Riesling',
    colour: 'white',
    homes: ['Mosel', 'Rheingau', 'Alsace', 'Clare Valley'],
    climate: 'cool',
    body: 2,
    acidity: 5,
    tannin: 1,
    aromas: ['lime', 'green apple', 'jasmine', 'honey', 'kerosene'],
    note:
      'The connoisseur’s white, and the hardest to sell, because nobody can tell from the label whether it will be bone dry or sweet. Its acidity lets it age extraordinarily - a mature Riesling develops a petrol note that sounds alarming and tastes wonderful.',
    tryThis:
      'A German Kabinett if you want to understand why sweetness and acidity are not opposites.',
  },
  {
    slug: 'semillon',
    name: 'Sémillon',
    colour: 'white',
    homes: ['Bordeaux (Graves, Sauternes)', 'Hunter Valley'],
    climate: 'moderate',
    body: 3,
    acidity: 3,
    tannin: 1,
    aromas: ['lanolin', 'lemon', 'beeswax', 'toast', 'honey'],
    note:
      'Bordeaux’s other white grape, and the one that matters most there. Its thin skins make it prone to noble rot, which is the whole basis of Sauternes. Dry, blended with Sauvignon Blanc and aged in barrel, it makes white Bordeaux that lasts decades.',
    tryThis:
      'A dry Pessac-Leognan blend, then a half-bottle of Sauternes - the same grape doing two opposite jobs.',
  },
  {
    slug: 'chenin-blanc',
    name: 'Chenin Blanc',
    colour: 'white',
    homes: ['Loire (Vouvray, Savennieres)', 'Stellenbosch'],
    climate: 'moderate',
    body: 3,
    acidity: 5,
    tannin: 1,
    aromas: ['quince', 'chamomile', 'wet wool', 'honey', 'bruised apple'],
    note:
      'The most versatile white grape in the world and consistently the most underpriced. It makes bone-dry, off-dry, sweet and sparkling wine in the same appellation, and its acidity means all four versions age well.',
    tryThis:
      'Vouvray sec. Then find out what South Africa charges for their old-vine bottlings.',
  },
  {
    slug: 'pinot-gris',
    name: 'Pinot Gris',
    colour: 'white',
    aliases: ['Pinot Grigio', 'Grauburgunder'],
    homes: ['Alsace', 'Veneto', 'Martinborough'],
    climate: 'cool',
    body: 3,
    acidity: 3,
    tannin: 1,
    aromas: ['pear', 'white peach', 'ginger', 'almond', 'honeysuckle'],
    note:
      'Two wines under two names from one grape. As Italian Pinot Grigio it is light, brisk and deliberately neutral. As Alsatian Pinot Gris it is broad, spicy and often faintly sweet. Neither is wrong; knowing which you are buying is the trick.',
    tryThis:
      'An Alsace bottle, to find out how much more the grape has than its Italian reputation suggests.',
  },
  {
    slug: 'gewurztraminer',
    name: 'Gewürztraminer',
    colour: 'white',
    homes: ['Alsace', 'Alto Adige', 'Gisborne'],
    climate: 'cool',
    body: 4,
    acidity: 2,
    tannin: 1,
    aromas: ['lychee', 'rose', 'turkish delight', 'ginger', 'orange peel'],
    note:
      'The most instantly identifiable white in existence - lychee and rose, unmistakably. Low acidity makes it broad and sometimes heavy, so the good ones are a balancing act. Its one great party trick is standing up to strongly spiced food.',
    tryThis: 'Alsace, with anything aromatic enough to flatten a Chardonnay.',
  },
  {
    slug: 'viognier',
    name: 'Viognier',
    colour: 'white',
    homes: ['Northern Rhone (Condrieu)', 'Languedoc'],
    climate: 'warm',
    body: 4,
    acidity: 2,
    tannin: 1,
    aromas: ['apricot', 'peach blossom', 'tangerine', 'cream'],
    note:
      'Rich, perfumed and low in acid, which makes it gorgeous young and short-lived after. Nearly extinct in the 1960s - a handful of hectares left in Condrieu - and now planted worldwide. A little is sometimes co-fermented with Syrah to lift its aromatics.',
    tryThis: 'Condrieu if the budget allows; otherwise a Languedoc bottling.',
  },
  {
    slug: 'albarino',
    name: 'Albariño',
    colour: 'white',
    homes: ['Rias Baixas', 'Vinho Verde (as Alvarinho)'],
    climate: 'cool',
    body: 2,
    acidity: 4,
    tannin: 1,
    aromas: ['grapefruit', 'nectarine', 'sea spray', 'lemon zest'],
    note:
      'Atlantic Spain in a glass: thick-skinned, saline, high-acid and built for shellfish. It grows on pergolas in one of the wettest corners of Iberia, trained high to keep the fruit away from damp ground.',
    tryThis: 'Anything from Rias Baixas, with a plate of something from the sea.',
  },
  {
    slug: 'gruner-veltliner',
    name: 'Grüner Veltliner',
    colour: 'white',
    homes: ['Wachau', 'Kamptal', 'Kremstal'],
    climate: 'cool',
    body: 3,
    acidity: 4,
    tannin: 1,
    aromas: ['white pepper', 'green lentil', 'lime', 'celery leaf'],
    note:
      'Austria’s flagship, and one of the very few whites with a genuine savoury, peppery streak. The lighter versions are among the best value white wine anywhere; the top Wachau bottlings age like fine Burgundy.',
    tryThis:
      'A litre bottle of the everyday style - Austria sells its cheerful version by the litre, and it is a good sign.',
  },
  {
    slug: 'muscat',
    name: 'Muscat',
    colour: 'white',
    aliases: ['Moscato', 'Muscat Blanc à Petits Grains'],
    homes: ['Alsace', 'Piedmont', 'Rutherglen', 'Southern Rhone'],
    climate: 'warm',
    body: 2,
    acidity: 2,
    tannin: 1,
    aromas: ['orange blossom', 'grape', 'musk', 'elderflower'],
    note:
      'One of the oldest cultivated varieties, and the only wine grape that genuinely smells like grapes. It runs from feather-light fizzy Moscato d’Asti to treacly Rutherglen stickies, all recognisably the same perfume.',
    tryThis: 'Moscato d’Asti - five and a half percent alcohol, and hard to dislike.',
  },
  {
    slug: 'muscadelle',
    name: 'Muscadelle',
    colour: 'white',
    homes: ['Bordeaux'],
    climate: 'moderate',
    body: 2,
    acidity: 3,
    tannin: 1,
    aromas: ['orange flower', 'grape', 'honeysuckle'],
    note:
      'The forgotten third grape of white Bordeaux, almost never seen alone and usually a few percent of a blend. Included here because knowing it exists is what separates someone who has read the appellation rules from someone who has not.',
    tryThis:
      'You will not find it solo. Look for it listed third on a white Bordeaux back label.',
  },

  /* ================================================================ *
   * RED
   * ================================================================ */
  {
    slug: 'cabernet-sauvignon',
    name: 'Cabernet Sauvignon',
    colour: 'red',
    homes: ['Medoc (Left Bank)', 'Napa Valley', 'Coonawarra', 'Maipo'],
    climate: 'warm',
    body: 5,
    acidity: 4,
    tannin: 5,
    aromas: ['blackcurrant', 'cedar', 'graphite', 'mint', 'tobacco'],
    note:
      'The world’s most planted red, and a natural accident: a seventeenth-century crossing of Cabernet Franc and Sauvignon Blanc in Bordeaux. Thick skins mean deep colour and formidable tannin, which is why it needs either time or a blending partner - usually both.',
    tryThis:
      'A Pauillac for the classic, cedar-and-graphite version; a Napa bottle for the fruit-forward one.',
  },
  {
    slug: 'merlot',
    name: 'Merlot',
    colour: 'red',
    homes: ['Saint-Emilion, Pomerol (Right Bank)', 'Hawke’s Bay', 'Tuscany'],
    climate: 'moderate',
    body: 4,
    acidity: 3,
    tannin: 3,
    aromas: ['plum', 'black cherry', 'chocolate', 'bay leaf', 'cedar'],
    note:
      'The most planted grape in Bordeaux by a wide margin, and badly served by its reputation as the soft option. It ripens earlier than Cabernet, which is why the cooler clay of the Right Bank is planted with it - and Petrus, one of the most expensive wines on earth, is essentially all Merlot.',
    tryThis:
      'A Saint-Emilion grand cru. It is the fastest cure for thinking Merlot is boring.',
  },
  {
    slug: 'cabernet-franc',
    name: 'Cabernet Franc',
    colour: 'red',
    homes: ['Loire (Chinon, Bourgueil)', 'Saint-Emilion', 'Hawke’s Bay'],
    climate: 'moderate',
    body: 3,
    acidity: 4,
    tannin: 3,
    aromas: ['raspberry', 'green pepper', 'pencil shavings', 'violet'],
    note:
      'Parent of Cabernet Sauvignon and Merlot both, and the source of the leafy, green-pepper note that runs through Bordeaux. In the Loire it stands alone and makes something lighter, sappier and more perfumed than either of its offspring.',
    tryThis: 'Chinon, served slightly cool.',
  },
  {
    slug: 'petit-verdot',
    name: 'Petit Verdot',
    colour: 'red',
    homes: ['Medoc', 'Spain', 'Australia'],
    climate: 'warm',
    body: 5,
    acidity: 4,
    tannin: 5,
    aromas: ['violet', 'blueberry', 'black pepper', 'leather'],
    note:
      'The seasoning of a Bordeaux blend - rarely more than a few percent, added for colour, tannin and a violet lift. It ripens so late that in cool Bordeaux years it does not ripen at all, which is why warmer countries now bottle it on its own.',
    tryThis:
      'A varietal bottling from Spain or Australia, to taste what those few percent are contributing.',
  },
  {
    slug: 'malbec',
    name: 'Malbec',
    colour: 'red',
    aliases: ['Cot', 'Auxerrois'],
    homes: ['Mendoza', 'Cahors', 'Bordeaux'],
    climate: 'warm',
    body: 4,
    acidity: 3,
    tannin: 4,
    aromas: ['blackberry', 'plum', 'violet', 'cocoa', 'tobacco'],
    note:
      'A Bordeaux grape that emigrated and became someone else. In Cahors it is dark, firm and austere. At altitude in Mendoza it turns plush and violet-scented, and it became the national wine of a country that did not originally grow it.',
    tryThis:
      'A high-altitude Uco Valley bottle against a Cahors. Same grape, opposite temperaments.',
  },
  {
    slug: 'carmenere',
    name: 'Carménère',
    colour: 'red',
    homes: ['Chile', 'Bordeaux (historically)'],
    climate: 'warm',
    body: 4,
    acidity: 3,
    tannin: 3,
    aromas: ['blackberry', 'green peppercorn', 'soy', 'red capsicum'],
    note:
      'The sixth Bordeaux red, wiped out there by phylloxera and presumed gone. Chile spent over a century growing it while believing it was Merlot; the mistake was only settled by DNA in 1994. Underripe it is aggressively green, properly ripe it is savoury and excellent.',
    tryThis: 'A Colchagua Valley bottle from a warm year.',
  },
  {
    slug: 'pinot-noir',
    name: 'Pinot Noir',
    colour: 'red',
    homes: ['Burgundy', 'Central Otago', 'Sonoma', 'Oregon'],
    climate: 'cool',
    body: 2,
    acidity: 4,
    tannin: 2,
    aromas: ['red cherry', 'raspberry', 'forest floor', 'rose', 'mushroom'],
    note:
      'Thin-skinned, disease-prone, fussy about site, and the source of more obsession than any other grape. It makes pale wine of extraordinary perfume and no weight at all, and it shows differences between neighbouring vineyards more clearly than anything else planted.',
    tryThis:
      'Central Otago is New Zealand’s answer and stands comparison with Burgundy at a third of the price.',
  },
  {
    slug: 'syrah',
    name: 'Syrah',
    colour: 'red',
    aliases: ['Shiraz'],
    homes: ['Northern Rhone (Hermitage, Cote-Rotie)', 'Barossa', 'Hawke’s Bay'],
    climate: 'moderate',
    body: 4,
    acidity: 3,
    tannin: 4,
    aromas: ['blackberry', 'black pepper', 'bacon fat', 'olive', 'violet'],
    note:
      'The name tells you the style. Syrah, in the Northern Rhone or Hawke’s Bay, is peppery, savoury and medium-bodied. Shiraz, in the Barossa, is opulent, sweet-fruited and huge. The convention is loose but remarkably reliable.',
    tryThis:
      'A Gimblett Gravels Syrah - New Zealand’s most underrated red, and firmly in the Rhone camp.',
  },
  {
    slug: 'grenache',
    name: 'Grenache',
    colour: 'red',
    aliases: ['Garnacha', 'Cannonau'],
    homes: ['Chateauneuf-du-Pape', 'Priorat', 'Barossa'],
    climate: 'warm',
    body: 4,
    acidity: 2,
    tannin: 2,
    aromas: ['strawberry', 'dried herb', 'white pepper', 'orange peel', 'leather'],
    note:
      'Pale, high in alcohol, low in acid and tannin, and the backbone of the Southern Rhone blend. It ripens so readily that it can hit fifteen percent without seeming heavy. Also the base of most serious dry rose.',
    tryThis:
      'Chateauneuf-du-Pape, or an old-vine Garnacha from Spain for a fraction of the money.',
  },
  {
    slug: 'mourvedre',
    name: 'Mourvèdre',
    colour: 'red',
    aliases: ['Monastrell', 'Mataro'],
    homes: ['Bandol', 'Jumilla', 'Southern Rhone'],
    climate: 'warm',
    body: 5,
    acidity: 3,
    tannin: 5,
    aromas: ['blackberry', 'game', 'thyme', 'black pepper', 'earth'],
    note:
      'The dark, meaty third of the GSM blend. It needs real heat to ripen and is tough and gamey when young, softening into something remarkable with a decade. Bandol is where it is taken most seriously.',
    tryThis: 'A Bandol red with ten years on it, if you can find one.',
  },
  {
    slug: 'sangiovese',
    name: 'Sangiovese',
    colour: 'red',
    homes: ['Chianti', 'Montalcino', 'Montepulciano'],
    climate: 'moderate',
    body: 3,
    acidity: 5,
    tannin: 4,
    aromas: ['sour cherry', 'tomato leaf', 'dried herb', 'leather', 'clay'],
    note:
      'Italy’s most planted grape and the one that explains why Italian wine tastes the way it does at a table. Very high acidity and firm tannin make it mediocre on its own and transformative with food - it is built for tomato, olive oil and salt.',
    tryThis: 'Brunello di Montalcino for the serious version; Chianti Classico for the weeknight one.',
  },
  {
    slug: 'nebbiolo',
    name: 'Nebbiolo',
    colour: 'red',
    homes: ['Barolo', 'Barbaresco', 'Valtellina'],
    climate: 'moderate',
    body: 3,
    acidity: 5,
    tannin: 5,
    aromas: ['tar', 'rose', 'sour cherry', 'liquorice', 'truffle'],
    note:
      'The great contradiction: pale, almost translucent, and yet more tannic and longer-lived than anything twice its colour. Tar and roses is the standard description and it is exactly right. It refuses to travel - almost nowhere outside Piedmont does it well.',
    tryThis:
      'Barbaresco, which arrives at drinkability a few years earlier than Barolo.',
  },
  {
    slug: 'tempranillo',
    name: 'Tempranillo',
    colour: 'red',
    aliases: ['Tinta Roriz', 'Aragonez'],
    homes: ['Rioja', 'Ribera del Duero', 'Douro'],
    climate: 'moderate',
    body: 4,
    acidity: 3,
    tannin: 4,
    aromas: ['red plum', 'dried fig', 'dill', 'vanilla', 'tobacco'],
    note:
      'Spain’s flagship, and the grape most shaped by its barrel. Traditional Rioja spends years in American oak, which supplies the coconut and dill note people often mistake for a quality of the fruit. Read the ageing tier on the label - crianza, reserva, gran reserva - and you know roughly what you are getting.',
    tryThis: 'A traditional gran reserva Rioja, then a modern Ribera. The gap is the argument.',
  },
  {
    slug: 'zinfandel',
    name: 'Zinfandel',
    colour: 'red',
    aliases: ['Primitivo', 'Tribidrag'],
    homes: ['California', 'Puglia'],
    climate: 'warm',
    body: 5,
    acidity: 3,
    tannin: 3,
    aromas: ['blackberry jam', 'raisin', 'sweet spice', 'liquorice'],
    note:
      'A Croatian grape that became Californian, ripening so unevenly that a single bunch can hold raisins and green berries at once. That is where the jammy, high-alcohol character comes from. Old-vine bottlings from century-old plantings are the ones worth chasing.',
    tryThis: 'An old-vine Zinfandel from Lodi or Sonoma.',
  },
  {
    slug: 'gamay',
    name: 'Gamay',
    colour: 'red',
    homes: ['Beaujolais', 'Loire'],
    climate: 'cool',
    body: 2,
    acidity: 4,
    tannin: 2,
    aromas: ['cranberry', 'banana', 'violet', 'black pepper'],
    note:
      'Banished from Burgundy by ducal decree in 1395 and exiled south, where it turned out to be perfect. Beaujolais is frequently made by carbonic maceration, which produces the banana and bubblegum note the region is teased for - the serious cru bottlings do not do that and age beautifully.',
    tryThis:
      'A cru Beaujolais - Morgon or Fleurie - lightly chilled. Nothing to do with Nouveau.',
  },
];

/** Convenience splits, used by the explorer's default groupings. */
export const WHITE_GRAPES = GRAPES.filter((g) => g.colour === 'white');
export const RED_GRAPES = GRAPES.filter((g) => g.colour === 'red');

/** Look up a single variety by slug. */
export function findGrape(slug: string): Grape | undefined {
  return GRAPES.find((g) => g.slug === slug);
}

/**
 * The eight varieties permitted in red and white Bordeaux, called out
 * separately because the Bordeaux chapter needs exactly this subset.
 */
export const BORDEAUX_GRAPES = [
  'cabernet-sauvignon',
  'merlot',
  'cabernet-franc',
  'petit-verdot',
  'malbec',
  'carmenere',
  'sauvignon-blanc',
  'semillon',
  'muscadelle',
];
