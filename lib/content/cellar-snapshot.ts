/**
 * The cellar, pulled from Cellarion.
 *
 * GENERATED FILE - do not edit by hand. Regenerate with:
 *   node scripts/pull-cellar.mjs <path-to-cellarion-export.json>
 *
 * Cellarion is the source of truth; this is a committed snapshot of it,
 * because the site is static and public and cannot carry a personal API
 * token. See scripts/pull-cellar.mjs for the reasoning and the refresh
 * steps.
 */

export type CellarWine = {
  producer: string;
  wine: string;
  /** Null for a non-vintage wine. */
  vintage: string | null;
  country: string;
  region?: string;
  appellation?: string;
  type: 'red' | 'white' | 'rosé' | 'sparkling' | 'dessert' | 'fortified';
  grapes?: string[];
  /** Out of five. Converted from other scales at pull time. */
  rating?: number;
  notes?: string;
  addedOn?: string;
  /** Present only on wines that have been drunk. */
  drunkOn?: string;
  drunkNote?: string;
  /**
   * Cellarion's own drinking window, where a sommelier has set one.
   *
   * Only the early band is always present. A wine with no peak or late
   * band is one the sommelier does not expect to improve - which is worth
   * knowing, so the absence is kept rather than filled in.
   */
  maturity?: {
    earlyFrom: number;
    earlyUntil: number;
    peakFrom?: number;
    peakUntil?: number;
    lateFrom?: number;
    lateUntil?: number;
    note?: string;
  };
};

/** When this snapshot was taken, shown so the page can admit its age. */
export const PULLED_AT = "2026-09-01T13:08:10.133Z";

/** Still in the cellar. */
export const CELLAR: CellarWine[] = [
  {
    "producer": "Mas Saint Louis",
    "wine": "Châteauneuf-du-Pape",
    "vintage": "2021",
    "country": "France",
    "region": "Châteauneuf-du-Pape",
    "appellation": "Châteauneuf-du-Pape",
    "type": "red",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "addedOn": "2026-08-30",
    "maturity": {
      "earlyFrom": 2024,
      "earlyUntil": 2026,
      "peakFrom": 2027,
      "peakUntil": 2032,
      "lateFrom": 2033,
      "lateUntil": 2035,
      "note": "A traditional, Grenache-led Châteauneuf in the lighter, cooler 2021 vintage — strawberry and red cherry, thyme and a twist of orange peel, with soft tannins that make it approachable straight away. Drinking well now, at its best from 2027 to the early 2030s as it turns savoury. Made to be enjoyed rather than hoarded."
    }
  },
  {
    "producer": "Domaine de Beaurenard",
    "wine": "Châteauneuf-du-Pape",
    "vintage": "2021",
    "country": "France",
    "region": "Châteauneuf-du-Pape",
    "appellation": "Châteauneuf-du-Pape",
    "type": "red",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "rating": 4,
    "addedOn": "2026-08-30",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2027,
      "peakFrom": 2028,
      "peakUntil": 2034,
      "lateFrom": 2035,
      "lateUntil": 2038,
      "note": "A cool, rainy 2021 made for a fresher, lower-alcohol Châteauneuf than the run of hot years before it, and Beaurenard's elegant, foudre-aged style suits that — perfumed raspberry and kirsch, garrigue and pepper, with fine tannins and real lift. Lovely now for its fragrance, better from 2028 as it gains leather and dried-herb depth, and good through the mid-2030s."
    }
  }
];

/** Drunk, newest first. */
export const TASTED: CellarWine[] = [
  {
    "producer": "Hawkshead",
    "wine": "First Vines Pinot Noir",
    "vintage": "2024",
    "country": "New Zealand",
    "region": "Central Otago",
    "appellation": "Gibbston",
    "type": "red",
    "grapes": [
      "Pinot Noir"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-31",
    "maturity": {
      "earlyFrom": 2026,
      "earlyUntil": 2028,
      "peakFrom": 2029,
      "peakUntil": 2033,
      "lateFrom": 2034,
      "lateUntil": 2038,
      "note": "Gibbston's cool, high sites give tight young wines that need a few years — best from the decade's end into the early 2030s."
    }
  },
  {
    "producer": "Valli",
    "wine": "Bannockburn Pinot Noir",
    "vintage": "2023",
    "country": "New Zealand",
    "region": "Central Otago",
    "appellation": "Bannockburn",
    "type": "red",
    "grapes": [
      "Pinot Noir"
    ],
    "rating": 5,
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2026,
      "earlyUntil": 2029,
      "peakFrom": 2030,
      "peakUntil": 2035,
      "lateFrom": 2036,
      "lateUntil": 2039,
      "note": "2023 was a warm, generous season in Central Otago after the cooler 2022, and Valli's Bannockburn — from the schisty, sun-trapped side of the region — has the dark cherry, thyme and structure to match. Savoury and firm rather than sweet-fruited, it needs a few years to unwind; expect its best from 2030 as it turns to forest floor and black tea, and the screw cap keeps it on a slow, even path."
    }
  },
  {
    "producer": "Château Petit-Serin",
    "wine": "Château Petit-Serin",
    "vintage": "2021",
    "country": "France",
    "region": "Margaux",
    "appellation": "Margaux",
    "type": "red",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2027,
      "peakFrom": 2028,
      "peakUntil": 2033,
      "lateFrom": 2034,
      "lateUntil": 2036,
      "note": "Pure old-vine Cabernet Sauvignon from a 0.7-hectare gravel plot — the smallest estate in Margaux — aged 18 months in barrel. 2021 was a cool, late year that favoured Cabernet's perfume over power, so expect blackcurrant, violet and white pepper on a medium frame with fine, fresh tannins. Drinking from now with air, at its best around 2028–2033."
    }
  },
  {
    "producer": "Château le Grand Verdus",
    "wine": "Vertige Solera",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Bordeaux",
    "type": "white",
    "grapes": [
      "Sémillon"
    ],
    "notes": "Label reads Solera 18-21, so a solera blend of the 2018 to 2021 vintages rather than a single year.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 0,
      "earlyUntil": 2,
      "peakFrom": 3,
      "peakUntil": 6,
      "note": "A solera-aged Sémillon, bottled from a perpetual blend whose youngest wine is already around three years old — so it arrives with its waxy, nutty patina in place and is ready to drink on release. The producer suggests four to eight years and that matches the style: the quince and toasted-almond character deepens with a few years in bottle. Windows count from when you acquire the bottle."
    },
    "vintage": null
  },
  {
    "producer": "François Chidaine",
    "wine": "Le Chenin d'Ici",
    "vintage": "2024",
    "country": "France",
    "region": "Loire Valley",
    "type": "white",
    "grapes": [
      "Chenin Blanc"
    ],
    "rating": 4,
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2027,
      "peakFrom": 2028,
      "peakUntil": 2030,
      "note": "Chidaine's bone-dry entry Chenin — green apple, quince and wet stone on a taut acid line. Lovely young for its clarity, and Chenin's acidity means it gains a little honeyed depth over three or four years without losing its edge. Drink through 2030."
    }
  },
  {
    "producer": "Montecampo",
    "wine": "Pinot Grigio delle Venezie",
    "vintage": "2024",
    "country": "Italy",
    "region": "Veneto",
    "appellation": "Delle Venezie",
    "type": "white",
    "grapes": [
      "Pinot Gris"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2026,
      "note": "Light, clean Pinot Grigio — pear, lemon and white flowers. Its charm is entirely in its youth: serve it cold and drink it by the end of 2026."
    }
  },
  {
    "producer": "Wild Irishman",
    "wine": "Macushla Pinot Noir",
    "vintage": "2024",
    "country": "New Zealand",
    "region": "Central Otago",
    "appellation": "Gibbston",
    "type": "red",
    "grapes": [
      "Pinot Noir"
    ],
    "rating": 4,
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2026,
      "earlyUntil": 2028,
      "peakFrom": 2029,
      "peakUntil": 2035,
      "lateFrom": 2036,
      "lateUntil": 2040,
      "note": "2024 is widely held to be the strongest set yet from this label, and this one was made to cellar — contemplative rather than giving now. Peak from the decade's end into the mid-2030s; the high, cool site keeps the acidity long."
    }
  },
  {
    "producer": "Kinross",
    "wine": "Growers Series Fumé Blanc",
    "vintage": "2024",
    "country": "New Zealand",
    "region": "Central Otago",
    "appellation": "Gibbston",
    "type": "white",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "notes": "Matapari Vineyard, Growers Series.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2026,
      "peakFrom": 2027,
      "peakUntil": 2030,
      "lateFrom": 2031,
      "lateUntil": 2033,
      "note": "Barrel work gives this more staying power than most New Zealand Sauvignon — best from 2027 through the turn of the decade rather than drunk on release."
    }
  },
  {
    "producer": "Château Marjosse",
    "wine": "Anthologie Cuvée Hirondelle",
    "vintage": "2020",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Vin de France",
    "type": "white",
    "grapes": [
      "Muscadelle"
    ],
    "notes": "Anthologie range. Label reads 100% Muscadelle, one of 1,505 bottles.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2022,
      "earlyUntil": 2024,
      "peakFrom": 2025,
      "peakUntil": 2028,
      "lateFrom": 2029,
      "lateUntil": 2031,
      "note": "Single-parcel Muscadelle from vines planted in 1944 — old-vine concentration gives this the texture to go further than most aromatic whites. Apricot, white peach and orange blossom on a rich, faintly waxy palate with a saline finish; it is entering its best phase now and the fruit will hold through 2028 before the aromatics start to fade. Not a wine for long cellaring, but a very good one for the next few years."
    }
  },
  {
    "producer": "Château Romer du Hayot",
    "wine": "Château Romer du Hayot",
    "vintage": "1990",
    "country": "France",
    "region": "Sauternes",
    "appellation": "Sauternes",
    "type": "dessert",
    "grapes": [
      "Sémillon",
      "Sauvignon Blanc",
      "Muscadelle"
    ],
    "notes": "Grand Cru Classé en 1855 (second growth Sauternes).",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 1994,
      "earlyUntil": 2000,
      "peakFrom": 2001,
      "peakUntil": 2022,
      "lateFrom": 2023,
      "lateUntil": 2035,
      "note": "1990 was one of the great botrytis years in Sauternes and even a lighter-styled classed growth like Romer du Hayot was given the concentration to run for decades — a Deuxième Cru Classé, and botrytised Sémillon's sugar and acidity are the most durable combination in wine. At 36 years it has moved past its long peak into its amber, late phase: honeyed apricot turning to marmalade, toasted nut and beeswax. Still delicious, but this is the decade to drink it rather than wait — open it with blue cheese or on its own after dinner."
    }
  },
  {
    "producer": "Château de Fontenille",
    "wine": "Les Demoiselles",
    "vintage": "2025",
    "country": "France",
    "region": "Entre-Deux-Mers",
    "appellation": "Entre-Deux-Mers",
    "type": "white",
    "grapes": [
      "Sauvignon Blanc",
      "Muscadelle",
      "Sauvignon Gris",
      "Sémillon"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2026,
      "earlyUntil": 2028,
      "note": "A young, zesty Entre-Deux-Mers built around Sauvignon Blanc — pink grapefruit, passion fruit and white flowers with a crisp finish. It is all about freshness, so drink it cold over the next two summers while the aromatics are at full volume."
    }
  },
  {
    "producer": "Produttori Vini Manduria",
    "wine": "Elegia Primitivo di Manduria Riserva",
    "vintage": "2019",
    "country": "Italy",
    "region": "Primitivo di Manduria",
    "appellation": "Primitivo di Manduria",
    "type": "red",
    "grapes": [
      "Zinfandel"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2022,
      "earlyUntil": 2024,
      "peakFrom": 2025,
      "peakUntil": 2028,
      "lateFrom": 2029,
      "lateUntil": 2031,
      "note": "Old-vine Primitivo Riserva from a ripe Puglian vintage — dried plum, blackberry jam, cocoa and carob, full-bodied and velvety. Primitivo is at its best while that opulent fruit is still in front, so this is in its peak now and through 2028; after that the sweetness of fruit gives way to raisin and spice. Serve a touch below room temperature."
    }
  },
  {
    "producer": "Kinross",
    "wine": "Luminaire Pinot Noir Rosé",
    "vintage": "2024",
    "country": "New Zealand",
    "region": "Central Otago",
    "appellation": "Gibbston",
    "type": "rosé",
    "grapes": [
      "Pinot Noir"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2024,
      "earlyUntil": 2025,
      "peakFrom": 2026,
      "peakUntil": 2028,
      "lateFrom": 2029,
      "lateUntil": 2030,
      "note": "In peak now — rosé is for its first years, though the cool-climate acidity here holds a little longer than most. Serve cold."
    }
  },
  {
    "producer": "Château de Fontenille",
    "wine": "Je suis gris",
    "vintage": "2023",
    "country": "France",
    "region": "Entre-Deux-Mers",
    "appellation": "Entre-Deux-Mers",
    "type": "white",
    "grapes": [
      "Sauvignon Gris"
    ],
    "notes": "La Coucoute range. Sauvignon Gris, a variety nearly lost to the 1956 frost.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2024,
      "earlyUntil": 2025,
      "peakFrom": 2026,
      "peakUntil": 2027,
      "note": "Sauvignon Gris is at its most charming young, when the white peach and lychee are vivid and the texture still has its soft bloom. This is drinking at its best right now and will stay there through 2027 — a wine to enjoy for its freshness rather than to lay down."
    }
  },
  {
    "producer": "Château Lauduc",
    "wine": "Classic Blanc",
    "vintage": "2024",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Bordeaux",
    "type": "white",
    "grapes": [
      "Sauvignon Blanc",
      "Sémillon"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar.",
    "maturity": {
      "earlyFrom": 2025,
      "earlyUntil": 2027,
      "note": "Crisp, unoaked Bordeaux blanc — grapefruit, gooseberry and lemon with a boxwood edge. Made for early, refreshing drinking: pour it young and cold, and don't hold it past 2027."
    }
  },
  {
    "producer": "Château Grand Mayne",
    "wine": "Château Grand Mayne",
    "vintage": "2017",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Saint-Émilion Grand Cru",
    "type": "red",
    "grapes": [
      "Merlot",
      "Cabernet Franc",
      "Cabernet Sauvignon"
    ],
    "rating": 4.5,
    "notes": "Rating carried across from my Vivino export.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar. Imported from Vivino.",
    "maturity": {
      "earlyFrom": 2022,
      "earlyUntil": 2025,
      "peakFrom": 2026,
      "peakUntil": 2032,
      "lateFrom": 2033,
      "lateUntil": 2036,
      "note": "The April frost of 2017 cut Grand Mayne's crop hard, and what was made is a leaner, more Cabernet-Franc-scented Saint-Émilion than the muscular 2016 or 2019 — fresh black cherry, graphite and cedar with fine, slightly firmer tannins. Coming into its peak now and holding through the early 2030s; it will not have the reach of the vintages either side of it, so enjoy it while the fruit is bright."
    }
  },
  {
    "producer": "Château Grand Mayne",
    "wine": "Château Grand Mayne",
    "vintage": "2021",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Saint-Émilion Grand Cru",
    "type": "red",
    "grapes": [
      "Merlot",
      "Cabernet Franc",
      "Cabernet Sauvignon"
    ],
    "rating": 3.8,
    "notes": "Rating carried across from my Vivino export.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar. Imported from Vivino.",
    "maturity": {
      "earlyFrom": 2026,
      "earlyUntil": 2028,
      "peakFrom": 2029,
      "peakUntil": 2035,
      "lateFrom": 2036,
      "lateUntil": 2038,
      "note": "A cool, late season in 2021 gave Grand Mayne a classically proportioned wine at 13.5% or so — fragrant black cherry and violet, graphite minerality and tannins that are fine rather than dense. Not a blockbuster, but the limestone terroir and the Cabernet Franc give it real shape. Approachable from now, best from the end of the decade through the mid-2030s, and comfortably inside the 2019 rather than beyond it."
    }
  },
  {
    "producer": "Maison Galhaud",
    "wine": "Moulin-Galhaud",
    "vintage": "2016",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Saint-Émilion Grand Cru",
    "type": "red",
    "grapes": [
      "Merlot",
      "Cabernet Franc"
    ],
    "rating": 4,
    "notes": "Rating carried across from my Vivino export.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar. Imported from Vivino.",
    "maturity": {
      "earlyFrom": 2020,
      "earlyUntil": 2023,
      "peakFrom": 2024,
      "peakUntil": 2030,
      "lateFrom": 2031,
      "lateUntil": 2034,
      "note": "2016 was a great year on the Right Bank and Moulin-Galhaud's almost-all-Merlot, 100%-new-oak style has the ripe black plum and cocoa to carry it. Ten years on the oak has folded in and the wine is in its peak — plush, dark and spicy with silky tannins — and will hold there to around 2030 before it starts drying out. A Saint-Émilion Grand Cru, not a classed growth, so it is at its best in the coming years rather than in the 2040s."
    }
  },
  {
    "producer": "Maison Galhaud",
    "wine": "Manoir Galhaud",
    "vintage": "2020",
    "country": "France",
    "region": "Bordeaux",
    "appellation": "Bordeaux",
    "type": "red",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "rating": 3.7,
    "notes": "Rating carried across from my Vivino export.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "drunkNote": "Tasted, not from my own cellar. Imported from Vivino.",
    "maturity": {
      "earlyFrom": 2022,
      "earlyUntil": 2024,
      "peakFrom": 2025,
      "peakUntil": 2028,
      "note": "The Galhaud family's generic Bordeaux from the ripe, generous 2020 vintage — supple red plum and blackcurrant with a touch of cedar, made for early, joyful drinking. In its sweet spot now and through 2028; a wine to enjoy for its fresh fruit rather than to lay down."
    }
  },
  {
    "producer": "Domaine de la Garrelière",
    "wine": "Marquis de C",
    "vintage": "2016",
    "country": "France",
    "region": "Touraine",
    "appellation": "Touraine",
    "type": "white",
    "grapes": [
      "Chardonnay"
    ],
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "maturity": {
      "earlyFrom": 2018,
      "earlyUntil": 2020,
      "peakFrom": 2021,
      "peakUntil": 2024,
      "lateFrom": 2025,
      "lateUntil": 2027,
      "note": "A lees-aged, sulphur-free Chardonnay from a single hectare of old vines — textured, nutty and flinty, and at its most complete a few years after the vintage. At ten years old the 2016 is in its late phase: expect a deep gold colour, baked apple and hazelnut shading into honey and dried fruit. Bottled without sulphites it has had no safety net in the cellar, so open it now rather than waiting, and give a slightly oxidative note the benefit of the doubt — it is part of the style."
    }
  },
  {
    "producer": "Paritua",
    "wine": "Stone Paddock Pinot Gris",
    "country": "New Zealand",
    "region": "Hawke's Bay",
    "appellation": "Hawke's Bay",
    "type": "white",
    "grapes": [
      "Pinot Gris"
    ],
    "notes": "Vivino recorded no vintage for this bottle.",
    "addedOn": "2026-08-30",
    "drunkOn": "2026-08-30",
    "maturity": {
      "earlyFrom": 0,
      "earlyUntil": 1,
      "peakFrom": 1,
      "peakUntil": 2,
      "lateFrom": 3,
      "lateUntil": 4,
      "note": "Pinot Gris is for early drinking — best within a couple of years of purchase, served cold. Window runs from purchase."
    },
    "vintage": null
  }
];
