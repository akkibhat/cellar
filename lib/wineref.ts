/**
 * The reference the bottle form types against.
 *
 * WHY THIS IS LOCAL DATA RATHER THAN AN API
 *
 * There is no free, legitimate source for "look up this wine and give me
 * its details and drinking window". Vivino publishes no API and scraping
 * it breaches their terms. Wine-Searcher's is paid and B2B. CellarTracker
 * needs the user's own credentials and restricts redistributing community
 * data. Critic drink windows - Vinous, Decanter, Jancis Robinson - are
 * all behind paywalls.
 *
 * So the useful move is not a lookup but a model. A drinking window is
 * largely predictable from what the wine *is*: Marlborough Sauvignon is
 * drunk inside three years and a classed-growth Bordeaux inside thirty,
 * and neither fact needs a network call. What follows is a table of
 * ageing archetypes, a set of appellations that map onto them, and enough
 * producers to make the form autocomplete usefully.
 *
 * Everything here is an estimate and is labelled as one in the UI. A
 * window is a starting point to correct, not an answer.
 */

/* ===================================================================== *
 * Ageing archetypes
 * ===================================================================== */

export type AgeingStyle = {
  key: string;
  label: string;
  /** Years after the vintage that the window opens. */
  from: number;
  /** Years after the vintage that it closes. */
  to: number;
  note: string;
};

/**
 * Ranges are deliberately generous at the top end, because the failure
 * mode this whole feature exists to prevent is opening a bottle too late.
 * A window that closes early nags; one that closes late lets a wine die
 * quietly. Erring long is the more expensive mistake.
 */
export const STYLES: AgeingStyle[] = [
  {
    key: 'crisp-white',
    label: 'Crisp white, drink young',
    from: 0,
    to: 3,
    note: 'Marlborough Sauvignon, Pinot Gris, Albariño, Vinho Verde. The aromatics are the point and they fade first.',
  },
  {
    key: 'aromatic-white',
    label: 'Aromatic white',
    from: 1,
    to: 6,
    note: 'Gewürztraminer, off-dry Riesling, Viognier. More flesh to lose, so a little longer.',
  },
  {
    key: 'riesling-serious',
    label: 'High-acid white, built to age',
    from: 2,
    to: 20,
    note: 'Riesling from the Mosel, Clare or Alsace, and age-worthy Chenin from Vouvray or Savennières. Acid preserves them far longer than people expect, and they go through a closed phase around years three to six.',
  },
  {
    key: 'oaked-white',
    label: 'Barrel-fermented white',
    from: 1,
    to: 8,
    note: 'Hawke’s Bay and Margaret River Chardonnay, Mâcon, white Rioja.',
  },
  {
    key: 'white-burgundy',
    label: 'White Burgundy, premier cru and up',
    from: 3,
    to: 15,
    note: 'Puligny, Chassagne, Meursault. Premature oxidation makes the top end less reliable than it used to be.',
  },
  {
    key: 'rose',
    label: 'Rosé',
    from: 0,
    to: 2,
    note: 'Almost always a wine of the year it was made. Very few improve.',
  },
  {
    key: 'light-red',
    label: 'Light red, drink young',
    from: 0,
    to: 5,
    note: 'Beaujolais, Valpolicella, young Grenache, entry-level Pinot.',
  },
  {
    key: 'pinot-serious',
    label: 'Pinot Noir, serious',
    from: 2,
    to: 12,
    note: 'Central Otago, Martinborough, Burgundy village. Often shuts down around year four and comes back.',
  },
  {
    key: 'burgundy-cru',
    label: 'Burgundy, premier and grand cru',
    from: 5,
    to: 25,
    note: 'The long end assumes cold, still storage. Warm storage halves it.',
  },
  {
    key: 'bordeaux-blend',
    label: 'Cabernet or Merlot blend',
    from: 3,
    to: 15,
    note: 'Hawke’s Bay, Margaret River, Bordeaux petit château, Chilean Cabernet.',
  },
  {
    key: 'bordeaux-classed',
    label: 'Bordeaux, classed growth',
    from: 8,
    to: 30,
    note: 'Structured for it, and genuinely unpleasant opened at five.',
  },
  {
    key: 'syrah-cool',
    label: 'Syrah, cool climate',
    from: 3,
    to: 18,
    note: 'Northern Rhône, Hawke’s Bay, Canterbury. Peppery when young, savoury with time.',
  },
  {
    key: 'shiraz-warm',
    label: 'Shiraz, warm climate',
    from: 2,
    to: 15,
    note: 'Barossa, McLaren Vale. Fruit-forward early, and the good ones hold.',
  },
  {
    key: 'rhone-blend',
    label: 'Southern Rhône blend',
    from: 2,
    to: 15,
    note: 'Châteauneuf, Gigondas, GSM. The Grenache softens first.',
  },
  {
    key: 'nebbiolo',
    label: 'Nebbiolo',
    from: 6,
    to: 25,
    note: 'Barolo and Barbaresco. Tannin and acid both high, and both need the time.',
  },
  {
    key: 'sangiovese',
    label: 'Sangiovese',
    from: 3,
    to: 18,
    note: 'Chianti Classico, Brunello. Riserva and Brunello sit at the long end.',
  },
  {
    key: 'tempranillo',
    label: 'Rioja and Ribera',
    from: 3,
    to: 20,
    note: 'Often released ready, since the ageing has been done for you. Gran Reserva holds longest.',
  },
  {
    key: 'champagne-nv',
    label: 'Champagne, non-vintage',
    from: 0,
    to: 4,
    note: 'Released ready. A year or two in your cellar does soften it.',
  },
  {
    key: 'champagne-vintage',
    label: 'Champagne, vintage',
    from: 4,
    to: 20,
    note: 'The reason to buy vintage at all is what happens after year ten.',
  },
  {
    key: 'sparkling-other',
    label: 'Other sparkling',
    from: 0,
    to: 3,
    note: 'Prosecco, most Crémant, traditional-method NV from elsewhere.',
  },
  {
    key: 'sweet',
    label: 'Sweet wine',
    from: 3,
    to: 40,
    note: 'Sauternes, Tokaji, botrytised Riesling. Sugar and acid together preserve almost indefinitely.',
  },
  {
    key: 'port-vintage',
    label: 'Vintage Port',
    from: 15,
    to: 50,
    note: 'Bottled young and unfiltered, and it needs every one of those years.',
  },
  {
    key: 'fortified-aged',
    label: 'Tawny, Sherry, Madeira',
    from: 0,
    to: 3,
    note: 'Aged before release, so ready when you buy it. Once open, Madeira lasts months and Fino does not.',
  },
];

export const STYLE_BY_KEY: Record<string, AgeingStyle> = Object.fromEntries(
  STYLES.map((s) => [s.key, s]),
);

/* ===================================================================== *
 * Appellations
 * ===================================================================== */

export type Appellation = {
  name: string;
  country: string;
  /** Typical grapes, used to prefill and to infer a style. */
  grapes: string;
  /** The archetype a wine from here usually follows. */
  style: string;
};

/**
 * Weighted toward New Zealand and France, matching the course. This is a
 * starting list rather than a gazetteer - it exists to save typing and to
 * propose a window, and anything missing can simply be typed.
 */
export const APPELLATIONS: Appellation[] = [
  /* --- New Zealand --- */
  { name: 'Marlborough', country: 'New Zealand', grapes: 'Sauvignon Blanc', style: 'crisp-white' },
  { name: 'Central Otago', country: 'New Zealand', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Hawke’s Bay', country: 'New Zealand', grapes: 'Cabernet, Merlot', style: 'bordeaux-blend' },
  { name: 'Gimblett Gravels', country: 'New Zealand', grapes: 'Syrah, Cabernet, Merlot', style: 'syrah-cool' },
  { name: 'Martinborough', country: 'New Zealand', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Wairarapa', country: 'New Zealand', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Nelson', country: 'New Zealand', grapes: 'Chardonnay, Pinot Noir', style: 'oaked-white' },
  { name: 'Waipara', country: 'New Zealand', grapes: 'Riesling, Pinot Noir', style: 'riesling-serious' },
  { name: 'Canterbury', country: 'New Zealand', grapes: 'Pinot Noir, Riesling', style: 'pinot-serious' },
  { name: 'Waiheke Island', country: 'New Zealand', grapes: 'Cabernet, Merlot, Syrah', style: 'bordeaux-blend' },
  { name: 'Gisborne', country: 'New Zealand', grapes: 'Chardonnay', style: 'oaked-white' },
  { name: 'Wairau Valley', country: 'New Zealand', grapes: 'Sauvignon Blanc', style: 'crisp-white' },
  { name: 'Awatere Valley', country: 'New Zealand', grapes: 'Sauvignon Blanc', style: 'crisp-white' },
  { name: 'Bannockburn', country: 'New Zealand', grapes: 'Pinot Noir', style: 'pinot-serious' },

  /* --- France --- */
  { name: 'Margaux', country: 'France', grapes: 'Cabernet Sauvignon, Merlot', style: 'bordeaux-classed' },
  { name: 'Pauillac', country: 'France', grapes: 'Cabernet Sauvignon', style: 'bordeaux-classed' },
  { name: 'Saint-Julien', country: 'France', grapes: 'Cabernet Sauvignon', style: 'bordeaux-classed' },
  { name: 'Saint-Estèphe', country: 'France', grapes: 'Cabernet Sauvignon', style: 'bordeaux-classed' },
  { name: 'Pessac-Léognan', country: 'France', grapes: 'Cabernet, Merlot', style: 'bordeaux-classed' },
  { name: 'Saint-Émilion', country: 'France', grapes: 'Merlot, Cabernet Franc', style: 'bordeaux-classed' },
  { name: 'Pomerol', country: 'France', grapes: 'Merlot', style: 'bordeaux-classed' },
  { name: 'Haut-Médoc', country: 'France', grapes: 'Cabernet, Merlot', style: 'bordeaux-blend' },
  { name: 'Bordeaux Supérieur', country: 'France', grapes: 'Merlot, Cabernet', style: 'bordeaux-blend' },
  { name: 'Sauternes', country: 'France', grapes: 'Sémillon, Sauvignon Blanc', style: 'sweet' },
  { name: 'Chablis', country: 'France', grapes: 'Chardonnay', style: 'oaked-white' },
  { name: 'Meursault', country: 'France', grapes: 'Chardonnay', style: 'white-burgundy' },
  { name: 'Puligny-Montrachet', country: 'France', grapes: 'Chardonnay', style: 'white-burgundy' },
  { name: 'Chassagne-Montrachet', country: 'France', grapes: 'Chardonnay', style: 'white-burgundy' },
  { name: 'Gevrey-Chambertin', country: 'France', grapes: 'Pinot Noir', style: 'burgundy-cru' },
  { name: 'Vosne-Romanée', country: 'France', grapes: 'Pinot Noir', style: 'burgundy-cru' },
  { name: 'Chambolle-Musigny', country: 'France', grapes: 'Pinot Noir', style: 'burgundy-cru' },
  { name: 'Nuits-Saint-Georges', country: 'France', grapes: 'Pinot Noir', style: 'burgundy-cru' },
  { name: 'Beaune', country: 'France', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Bourgogne', country: 'France', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Beaujolais', country: 'France', grapes: 'Gamay', style: 'light-red' },
  { name: 'Morgon', country: 'France', grapes: 'Gamay', style: 'light-red' },
  { name: 'Côte-Rôtie', country: 'France', grapes: 'Syrah', style: 'syrah-cool' },
  { name: 'Hermitage', country: 'France', grapes: 'Syrah', style: 'syrah-cool' },
  { name: 'Cornas', country: 'France', grapes: 'Syrah', style: 'syrah-cool' },
  { name: 'Crozes-Hermitage', country: 'France', grapes: 'Syrah', style: 'syrah-cool' },
  { name: 'Châteauneuf-du-Pape', country: 'France', grapes: 'Grenache, Syrah, Mourvèdre', style: 'rhone-blend' },
  { name: 'Gigondas', country: 'France', grapes: 'Grenache, Syrah', style: 'rhone-blend' },
  { name: 'Côtes du Rhône', country: 'France', grapes: 'Grenache, Syrah', style: 'light-red' },
  { name: 'Sancerre', country: 'France', grapes: 'Sauvignon Blanc', style: 'crisp-white' },
  { name: 'Pouilly-Fumé', country: 'France', grapes: 'Sauvignon Blanc', style: 'crisp-white' },
  { name: 'Vouvray', country: 'France', grapes: 'Chenin Blanc', style: 'riesling-serious' },
  { name: 'Chinon', country: 'France', grapes: 'Cabernet Franc', style: 'bordeaux-blend' },
  { name: 'Muscadet', country: 'France', grapes: 'Melon de Bourgogne', style: 'crisp-white' },
  { name: 'Alsace', country: 'France', grapes: 'Riesling, Gewürztraminer, Pinot Gris', style: 'aromatic-white' },
  { name: 'Champagne', country: 'France', grapes: 'Chardonnay, Pinot Noir, Meunier', style: 'champagne-nv' },
  { name: 'Bandol', country: 'France', grapes: 'Mourvèdre', style: 'rhone-blend' },
  { name: 'Provence', country: 'France', grapes: 'Grenache, Cinsault', style: 'rose' },
  { name: 'Cahors', country: 'France', grapes: 'Malbec', style: 'bordeaux-blend' },

  /* --- Elsewhere, lightly --- */
  { name: 'Barolo', country: 'Italy', grapes: 'Nebbiolo', style: 'nebbiolo' },
  { name: 'Barbaresco', country: 'Italy', grapes: 'Nebbiolo', style: 'nebbiolo' },
  { name: 'Chianti Classico', country: 'Italy', grapes: 'Sangiovese', style: 'sangiovese' },
  { name: 'Brunello di Montalcino', country: 'Italy', grapes: 'Sangiovese', style: 'sangiovese' },
  { name: 'Valpolicella', country: 'Italy', grapes: 'Corvina', style: 'light-red' },
  { name: 'Etna', country: 'Italy', grapes: 'Nerello Mascalese', style: 'pinot-serious' },
  { name: 'Rioja', country: 'Spain', grapes: 'Tempranillo', style: 'tempranillo' },
  { name: 'Ribera del Duero', country: 'Spain', grapes: 'Tempranillo', style: 'tempranillo' },
  { name: 'Rías Baixas', country: 'Spain', grapes: 'Albariño', style: 'crisp-white' },
  { name: 'Priorat', country: 'Spain', grapes: 'Garnacha, Cariñena', style: 'rhone-blend' },
  { name: 'Jerez', country: 'Spain', grapes: 'Palomino', style: 'fortified-aged' },
  { name: 'Douro', country: 'Portugal', grapes: 'Touriga Nacional', style: 'bordeaux-blend' },
  { name: 'Porto', country: 'Portugal', grapes: 'Touriga Nacional', style: 'port-vintage' },
  { name: 'Mosel', country: 'Germany', grapes: 'Riesling', style: 'riesling-serious' },
  { name: 'Rheingau', country: 'Germany', grapes: 'Riesling', style: 'riesling-serious' },
  { name: 'Barossa Valley', country: 'Australia', grapes: 'Shiraz', style: 'shiraz-warm' },
  { name: 'McLaren Vale', country: 'Australia', grapes: 'Shiraz, Grenache', style: 'shiraz-warm' },
  { name: 'Margaret River', country: 'Australia', grapes: 'Cabernet, Chardonnay', style: 'bordeaux-blend' },
  { name: 'Clare Valley', country: 'Australia', grapes: 'Riesling', style: 'riesling-serious' },
  { name: 'Yarra Valley', country: 'Australia', grapes: 'Pinot Noir, Chardonnay', style: 'pinot-serious' },
  { name: 'Napa Valley', country: 'United States', grapes: 'Cabernet Sauvignon', style: 'bordeaux-classed' },
  { name: 'Sonoma', country: 'United States', grapes: 'Pinot Noir, Chardonnay', style: 'pinot-serious' },
  { name: 'Willamette Valley', country: 'United States', grapes: 'Pinot Noir', style: 'pinot-serious' },
  { name: 'Mendoza', country: 'Argentina', grapes: 'Malbec', style: 'bordeaux-blend' },
  { name: 'Maipo Valley', country: 'Chile', grapes: 'Cabernet Sauvignon', style: 'bordeaux-blend' },
  { name: 'Colchagua', country: 'Chile', grapes: 'Carménère', style: 'bordeaux-blend' },
  { name: 'Stellenbosch', country: 'South Africa', grapes: 'Cabernet, Chenin Blanc', style: 'bordeaux-blend' },
  { name: 'Swartland', country: 'South Africa', grapes: 'Chenin Blanc, Syrah', style: 'syrah-cool' },
];

/* ===================================================================== *
 * Producers
 * ===================================================================== */

export type Producer = { name: string; appellation: string };

/**
 * Enough to make the form autocomplete useful, not a directory. Picking
 * one fills in its region, which in turn proposes grapes and a window -
 * so most bottles need a producer, a wine and a vintage typed and
 * nothing else.
 *
 * Anything not here is simply typed, and typing a region that *is* here
 * gets the same benefit.
 */
export const PRODUCERS: Producer[] = [
  /* New Zealand */
  { name: 'Te Mata Estate', appellation: 'Hawke’s Bay' },
  { name: 'Craggy Range', appellation: 'Hawke’s Bay' },
  { name: 'Trinity Hill', appellation: 'Gimblett Gravels' },
  { name: 'Elephant Hill', appellation: 'Hawke’s Bay' },
  { name: 'Sacred Hill', appellation: 'Hawke’s Bay' },
  { name: 'Cloudy Bay', appellation: 'Marlborough' },
  { name: 'Greywacke', appellation: 'Marlborough' },
  { name: 'Dog Point', appellation: 'Marlborough' },
  { name: 'Seresin', appellation: 'Marlborough' },
  { name: 'Framingham', appellation: 'Marlborough' },
  { name: 'Villa Maria', appellation: 'Marlborough' },
  { name: 'Astrolabe', appellation: 'Marlborough' },
  { name: 'Felton Road', appellation: 'Bannockburn' },
  { name: 'Rippon', appellation: 'Central Otago' },
  { name: 'Mount Difficulty', appellation: 'Bannockburn' },
  { name: 'Quartz Reef', appellation: 'Central Otago' },
  { name: 'Amisfield', appellation: 'Central Otago' },
  { name: 'Two Paddocks', appellation: 'Central Otago' },
  { name: 'Burn Cottage', appellation: 'Central Otago' },
  { name: 'Ata Rangi', appellation: 'Martinborough' },
  { name: 'Dry River', appellation: 'Martinborough' },
  { name: 'Kusuda', appellation: 'Martinborough' },
  { name: 'Escarpment', appellation: 'Martinborough' },
  { name: 'Kumeu River', appellation: 'Gisborne' },
  { name: 'Neudorf', appellation: 'Nelson' },
  { name: 'Pegasus Bay', appellation: 'Waipara' },
  { name: 'Bell Hill', appellation: 'Canterbury' },
  { name: 'Pyramid Valley', appellation: 'Canterbury' },
  { name: 'Man O’ War', appellation: 'Waiheke Island' },
  { name: 'Stonyridge', appellation: 'Waiheke Island' },
  { name: 'Te Whare Ra', appellation: 'Marlborough' },

  /* France */
  { name: 'Château Margaux', appellation: 'Margaux' },
  { name: 'Château Latour', appellation: 'Pauillac' },
  { name: 'Château Lafite Rothschild', appellation: 'Pauillac' },
  { name: 'Château Mouton Rothschild', appellation: 'Pauillac' },
  { name: 'Château Pichon Baron', appellation: 'Pauillac' },
  { name: 'Château Léoville Las Cases', appellation: 'Saint-Julien' },
  { name: 'Château Cos d’Estournel', appellation: 'Saint-Estèphe' },
  { name: 'Château Haut-Brion', appellation: 'Pessac-Léognan' },
  { name: 'Château Cheval Blanc', appellation: 'Saint-Émilion' },
  { name: 'Château Ausone', appellation: 'Saint-Émilion' },
  { name: 'Pétrus', appellation: 'Pomerol' },
  { name: 'Château d’Yquem', appellation: 'Sauternes' },
  { name: 'Domaine de la Romanée-Conti', appellation: 'Vosne-Romanée' },
  { name: 'Domaine Leflaive', appellation: 'Puligny-Montrachet' },
  { name: 'Domaine Coche-Dury', appellation: 'Meursault' },
  { name: 'Domaine Georges Roumier', appellation: 'Chambolle-Musigny' },
  { name: 'Domaine Armand Rousseau', appellation: 'Gevrey-Chambertin' },
  { name: 'Domaine William Fèvre', appellation: 'Chablis' },
  { name: 'Domaine Jean-Louis Chave', appellation: 'Hermitage' },
  { name: 'E. Guigal', appellation: 'Côte-Rôtie' },
  { name: 'Château de Beaucastel', appellation: 'Châteauneuf-du-Pape' },
  { name: 'Château Rayas', appellation: 'Châteauneuf-du-Pape' },
  { name: 'Trimbach', appellation: 'Alsace' },
  { name: 'Zind-Humbrecht', appellation: 'Alsace' },
  { name: 'Hugel', appellation: 'Alsace' },
  { name: 'Domaine Huet', appellation: 'Vouvray' },
  { name: 'Krug', appellation: 'Champagne' },
  { name: 'Bollinger', appellation: 'Champagne' },
  { name: 'Pol Roger', appellation: 'Champagne' },
  { name: 'Louis Roederer', appellation: 'Champagne' },
  { name: 'Domaine Tempier', appellation: 'Bandol' },

  /* Elsewhere */
  { name: 'Giacomo Conterno', appellation: 'Barolo' },
  { name: 'Gaja', appellation: 'Barbaresco' },
  { name: 'Biondi-Santi', appellation: 'Brunello di Montalcino' },
  { name: 'López de Heredia', appellation: 'Rioja' },
  { name: 'Vega Sicilia', appellation: 'Ribera del Duero' },
  { name: 'Taylor’s', appellation: 'Porto' },
  { name: 'Graham’s', appellation: 'Porto' },
  { name: 'Egon Müller', appellation: 'Mosel' },
  { name: 'Dr. Loosen', appellation: 'Mosel' },
  { name: 'Penfolds', appellation: 'Barossa Valley' },
  { name: 'Henschke', appellation: 'Barossa Valley' },
  { name: 'Cullen', appellation: 'Margaret River' },
  { name: 'Leeuwin Estate', appellation: 'Margaret River' },
  { name: 'Grosset', appellation: 'Clare Valley' },
  { name: 'Ridge', appellation: 'Sonoma' },
  { name: 'Opus One', appellation: 'Napa Valley' },
  { name: 'Catena Zapata', appellation: 'Mendoza' },
  { name: 'Concha y Toro', appellation: 'Maipo Valley' },
  { name: 'Kanonkop', appellation: 'Stellenbosch' },
];

/* ===================================================================== *
 * Lookup
 * ===================================================================== */

/** Fold accents and case, so "chateau" finds "Château". */
function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Matches on any word boundary rather than only the start, so "rothschild"
 * finds both Lafite and Mouton, and "otago" finds Central Otago.
 */
function matches(haystack: string, q: string): boolean {
  const h = fold(haystack);
  const n = fold(q);
  if (!n) return false;
  return h.startsWith(n) || h.includes(` ${n}`) || h.includes(`-${n}`);
}

export function searchProducers(q: string, limit = 6): Producer[] {
  if (fold(q).length < 2) return [];
  return PRODUCERS.filter((p) => matches(p.name, q)).slice(0, limit);
}

export function searchAppellations(q: string, limit = 6): Appellation[] {
  if (fold(q).length < 2) return [];
  return APPELLATIONS.filter((a) => matches(a.name, q)).slice(0, limit);
}

export function findAppellation(name: string): Appellation | undefined {
  return APPELLATIONS.find((a) => fold(a.name) === fold(name));
}

/* ===================================================================== *
 * The window
 * ===================================================================== */

/**
 * Guess an ageing archetype from whatever the form already knows.
 *
 * The appellation is trusted first, since it carries both grape and
 * climate. Grapes are the fallback, and are much weaker on their own: a
 * Pinot Noir could be Beaujolais-adjacent or grand cru, and the variety
 * alone cannot say which.
 */
export function inferStyle(
  region?: string,
  grapes?: string,
): AgeingStyle | undefined {
  if (region) {
    const app = findAppellation(region);
    if (app) return STYLE_BY_KEY[app.style];
  }
  if (!grapes) return undefined;

  const g = fold(grapes);
  const guess: [string, string][] = [
    ['sauvignon blanc', 'crisp-white'],
    ['pinot gris', 'crisp-white'],
    ['albarino', 'crisp-white'],
    ['gewurztraminer', 'aromatic-white'],
    ['riesling', 'riesling-serious'],
    ['chenin', 'riesling-serious'],
    ['chardonnay', 'oaked-white'],
    ['gamay', 'light-red'],
    ['pinot noir', 'pinot-serious'],
    ['nebbiolo', 'nebbiolo'],
    ['sangiovese', 'sangiovese'],
    ['tempranillo', 'tempranillo'],
    ['syrah', 'syrah-cool'],
    ['shiraz', 'shiraz-warm'],
    ['grenache', 'rhone-blend'],
    ['mourvedre', 'rhone-blend'],
    ['malbec', 'bordeaux-blend'],
    ['carmenere', 'bordeaux-blend'],
    ['cabernet', 'bordeaux-blend'],
    ['merlot', 'bordeaux-blend'],
    ['semillon', 'sweet'],
  ];
  /* Longest match wins, so "cabernet franc" is not caught by "cabernet"
     before a more specific rule has had a chance. */
  const hit = guess
    .filter(([needle]) => g.includes(needle))
    .sort((a, b) => b[0].length - a[0].length)[0];
  return hit ? STYLE_BY_KEY[hit[1]] : undefined;
}

/**
 * A drinking window from a vintage and a style.
 *
 * Non-vintage wines get no window: their whole point is being blended to
 * taste the same every year, so there is nothing to count from.
 */
export function estimateWindow(
  vintage: number | null,
  style: AgeingStyle | undefined,
): { from: number; to: number } | undefined {
  if (vintage === null || !style) return undefined;
  return { from: vintage + style.from, to: vintage + style.to };
}
