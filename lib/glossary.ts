import type { GlossaryTerm } from './types';

/**
 * The tasting vocabulary.
 *
 * The twelve terms marked `fromExhibit` are the ones recorded from the
 * the terms worth defining properly. The rest are the words you
 * need alongside them to actually describe a glass - added so the
 * glossary works as a reference rather than only as a souvenir.
 *
 * Terms are stored unsorted and alphabetised at render time, so new
 * entries can be appended next to related ones without breaking order.
 */
export const GLOSSARY: GlossaryTerm[] = [
  /* ---------------------------------------------------------------- *
   * Appearance
   * ---------------------------------------------------------------- */
  {
    slug: 'legs',
    term: 'Legs',
    category: 'appearance',
    etymology: 'also called tears, or in French les larmes',
    definition:
      'The streaks a wine leaves running back down the inside of the glass after you swirl it. They are a read on alcohol, not on quality or "body" as is often claimed: the higher the alcohol, the more pronounced the legs. A wine with dramatic legs is a strong wine, nothing more.',
    seeAlso: ['body'],
  },
  {
    slug: 'brick-colour',
    term: 'Brick colour',
    category: 'appearance',
    definition:
      'The orange-brown tint red wines take on as they age. Look for it at the very outer edge of the liquid where it meets the glass, tilting the glass over something white - the rim shows the change long before the core does. A brick rim means a wine with some years on it.',
    seeAlso: ['rim', 'maderised'],
  },
  {
    slug: 'rim',
    term: 'Rim',
    category: 'appearance',
    definition:
      'The thin outer edge of the wine where it thins against the glass. Because the liquid is shallowest there, the rim shows colour change first, which is why it is the part you read for age.',
    seeAlso: ['brick-colour'],
  },
  {
    slug: 'oeil-de-perdrix',
    term: 'Œil de perdrix',
    category: 'appearance',
    etymology: 'French, literally "partridge’s eye"',
    definition:
      'A pale coppery pink, used since the Middle Ages for certain roses and for the very light reds that were fashionable then. The name has survived largely because it sounds good in French, and not because many modern drinkers have looked a partridge in the eye.',
  },
  {
    slug: 'clarity',
    term: 'Clarity',
    category: 'appearance',
    definition:
      'Whether the wine is bright and transparent or hazy. Haze can mean an unfiltered natural wine, which is fine and intentional, or a wine that has gone wrong. Context tells you which.',
  },

  /* ---------------------------------------------------------------- *
   * Nose
   * ---------------------------------------------------------------- */
  {
    slug: 'bouquet',
    term: 'Bouquet',
    category: 'nose',
    definition:
      'The full scent a wine gives off, thought of as a combination the way a bouquet of flowers is a combination. The word tends to be reserved for older wines that have built rich, complex, secondary aromas with age, on top of the simple fruit and flower notes a young wine shows.',
    seeAlso: ['primary-aromas', 'tertiary-aromas'],
  },
  {
    slug: 'primary-aromas',
    term: 'Primary aromas',
    category: 'nose',
    definition:
      'Aromas that come from the grape itself: fruit, flowers, herbs, the green pepper of Cabernet Franc. They dominate young wine and fade with time.',
    seeAlso: ['tertiary-aromas', 'bouquet'],
  },
  {
    slug: 'tertiary-aromas',
    term: 'Tertiary aromas',
    category: 'nose',
    definition:
      'Aromas built by ageing rather than by the grape or the ferment: leather, forest floor, dried fig, tobacco, mushroom. Their arrival is what turns a wine’s scent into a bouquet.',
    seeAlso: ['bouquet', 'primary-aromas'],
  },
  {
    slug: 'closed',
    term: 'Closed',
    category: 'nose',
    definition:
      'A wine giving away almost nothing on the nose. Often a young wine in an awkward phase rather than a bad one - decanting or simply waiting can open it.',
    seeAlso: ['queue-de-paon', 'decanting'],
  },
  {
    slug: 'queue-de-paon',
    term: 'Queue de paon',
    category: 'nose',
    etymology: 'French, "peacock’s tail"',
    definition:
      'Said of a wine that opens as it goes, fanning out into more aromas and flavours rather than narrowing - the way a peacock unfurls its plumage. Only very good wines do this, which is rather the point of the phrase: the peacock is a noble beast.',
    seeAlso: ['closed', 'caudalie'],
  },

  /* ---------------------------------------------------------------- *
   * Palate and structure
   * ---------------------------------------------------------------- */
  {
    slug: 'tannic',
    term: 'Tannic',
    category: 'structure',
    definition:
      'Having a high concentration of tannins - molecules drawn from the solid parts of the grape (skins, pips, stems) or from the wooden barrels the wine aged in. Tannins are what give a red wine its frame. Too much, or too soon, and the wine reads as hard and rough instead of structured.',
    seeAlso: ['astringent', 'structured', 'silky'],
  },
  {
    slug: 'astringent',
    term: 'Astringent',
    category: 'structure',
    definition:
      'The drying, puckering sensation a very tannic wine leaves, as though the inside of your mouth has tightened and your saliva has been mopped up. Often a sign of a wine drunk too young: the fix is patience.',
    seeAlso: ['tannic'],
  },
  {
    slug: 'structured',
    term: 'Structured',
    category: 'structure',
    definition:
      'A powerful wine that gives the impression of having a perceptible framework of aromas and flavours - a solid build, like a house with walls and a roof rather than a heap of materials.',
    seeAlso: ['tannic', 'rounded', 'balance'],
  },
  {
    slug: 'rounded',
    term: 'Rounded',
    category: 'structure',
    definition:
      'Supple and well balanced; the wine fills your mouth and leaves a smooth, spherical impression with no rough edges anywhere.',
    seeAlso: ['silky', 'balance'],
  },
  {
    slug: 'silky',
    term: 'Silky',
    category: 'structure',
    definition:
      'So smooth across the palate that it reads as a texture rather than a taste - like brushing against silk. Silky wines are well balanced with relatively few tannins.',
    seeAlso: ['rounded', 'tannic'],
  },
  {
    slug: 'caudalie',
    term: 'Caudalie',
    category: 'palate',
    etymology: 'from the Latin cauda, meaning tail',
    definition:
      'The unit of length: one caudalie is one second that the wine’s flavours and sensations keep going on your palate after you swallow or spit. A simple wine is finished in three or four. A great one can run past fifteen, and counting it is the single fastest way to train your attention.',
    seeAlso: ['queue-de-paon', 'finish'],
  },
  {
    slug: 'finish',
    term: 'Finish',
    category: 'palate',
    definition:
      'Everything that happens after you swallow or spit: how long the flavour lasts, and what it turns into on the way out. Length is measured in caudalies; quality of finish is a separate judgement, since a wine can linger on something unpleasant.',
    seeAlso: ['caudalie'],
  },
  {
    slug: 'body',
    term: 'Body',
    category: 'palate',
    definition:
      'How heavy the wine feels in the mouth, on the skim-milk to full-cream scale. It comes mostly from alcohol and extract. Note that it is not what the legs are telling you, whatever you may have been told.',
    seeAlso: ['legs'],
  },
  {
    slug: 'balance',
    term: 'Balance',
    category: 'palate',
    definition:
      'Whether any one component - acid, alcohol, tannin, sweetness, oak - stands out ahead of the others. A balanced wine has nothing poking out. It is the single most useful judgement to make, and the hardest to fake.',
    seeAlso: ['rounded', 'structured'],
  },
  {
    slug: 'dry',
    term: 'Dry',
    category: 'palate',
    definition:
      'Containing no perceptible sugar. Dry is not the opposite of fruity: a wine can smell overwhelmingly of ripe peach and still be bone dry, which is the source of most confusion between drinkers ordering at a bar.',
    seeAlso: ['residual-sugar'],
  },
  {
    slug: 'residual-sugar',
    term: 'Residual sugar',
    category: 'palate',
    definition:
      'Grape sugar the yeast did not convert into alcohol, left behind in the finished wine. Measured in grams per litre; below about 4 g/L reads as dry to most people.',
    seeAlso: ['dry', 'fermentation'],
  },
  {
    slug: 'minerality',
    term: 'Minerality',
    category: 'palate',
    definition:
      'A widely used and much argued-over term for a wet-stone, chalk, flint or saline impression. There is no accepted mechanism by which rock in the soil arrives in the glass, so treat it as a description of sensation rather than an explanation of cause.',
  },

  /* ---------------------------------------------------------------- *
   * Faults
   * ---------------------------------------------------------------- */
  {
    slug: 'maderised',
    term: 'Maderised',
    category: 'fault',
    etymology: 'after the deliberately oxidised wines of Madeira',
    definition:
      'Oxidised through exposure to air: the colour goes brown, and the wine loses both freshness and alcohol. The Romans prized old maderised wine. In almost everything made today it is a defect linked to age or a failed seal - the exception being the fortified wines that are maderised on purpose.',
    seeAlso: ['oxidised', 'brick-colour'],
  },
  {
    slug: 'oxidised',
    term: 'Oxidised',
    category: 'fault',
    definition:
      'Damaged by contact with oxygen. Whites go deep gold and taste of bruised apple and nuts; reds go brown and flat. An open bottle left three days on the bench is the easiest way to learn what it smells like.',
    seeAlso: ['maderised'],
  },
  {
    slug: 'corked',
    term: 'Corked',
    category: 'fault',
    etymology: 'caused by the compound TCA, 2,4,6-trichloroanisole',
    definition:
      'Contaminated by a tainted cork. It smells of wet cardboard, damp cellar or a mouldy dishcloth, and it strips the fruit out rather than adding a smell of its own - mild cases just seem dull. It affects perhaps 1-3% of cork-sealed bottles and is nobody’s fault at the table: send it back.',
  },
  {
    slug: 'volatile-acidity',
    term: 'Volatile acidity',
    category: 'fault',
    definition:
      'Acetic acid and ethyl acetate, smelling of vinegar and nail polish remover. Every wine has a trace, and a little can add lift; past a threshold it takes over completely.',
  },
  {
    slug: 'brett',
    term: 'Brett',
    category: 'fault',
    etymology: 'short for the yeast Brettanomyces',
    definition:
      'A spoilage yeast giving farmyard, band-aid, horse-blanket and clove notes. Divisive rather than universally condemned - a whisper of it is part of the traditional character of some old-school reds, and a great deal of it is a spoiled wine.',
  },
  {
    slug: 'reduction',
    term: 'Reduction',
    category: 'fault',
    definition:
      'Sulphur compounds built up in the absence of oxygen: struck match, burnt rubber, boiled cabbage. Unlike most faults it is often reversible - swirl hard, or decant, and it can blow off within minutes.',
    seeAlso: ['decanting'],
  },

  /* ---------------------------------------------------------------- *
   * Winemaking
   * ---------------------------------------------------------------- */
  {
    slug: 'fermentation',
    term: 'Fermentation',
    category: 'making',
    definition:
      'The conversion of grape sugar into alcohol and carbon dioxide by yeast. It is the whole of winemaking in one sentence; everything else is a decision about how to steer it.',
    seeAlso: ['residual-sugar', 'malolactic'],
  },
  {
    slug: 'maceration',
    term: 'Maceration',
    category: 'making',
    definition:
      'Leaving the juice in contact with the grape skins to draw out colour, tannin and aroma. Length of maceration is the main reason one red is pale and delicate and another is opaque and grippy - and the reason rose exists at all.',
    seeAlso: ['tannic'],
  },
  {
    slug: 'malolactic',
    term: 'Malolactic conversion',
    category: 'making',
    definition:
      'A second, bacterial conversion that turns sharp malic acid (think green apple) into softer lactic acid (think cream). Standard for nearly all reds, optional for whites - it is why one Chardonnay is buttery and another is razor sharp.',
  },
  {
    slug: 'lees',
    term: 'Lees',
    category: 'making',
    definition:
      'The sediment of spent yeast left after fermentation. Leaving a wine on its lees, and stirring them, builds texture and a bready, savoury depth. Labels sometimes say sur lie.',
  },
  {
    slug: 'decanting',
    term: 'Decanting',
    category: 'making',
    definition:
      'Pouring wine off into another vessel, for either of two unrelated reasons: to separate a mature wine from its sediment, or to give a young tight wine a rush of air. The first calls for care and a steady hand, the second for a good splash.',
    seeAlso: ['closed', 'reduction'],
  },
  {
    slug: 'noble-rot',
    term: 'Noble rot',
    category: 'making',
    etymology: 'Botrytis cinerea; French pourriture noble',
    definition:
      'A fungus that, in the right damp-then-dry autumn, shrivels grapes on the vine and concentrates their sugar and acid instead of spoiling them. It is what makes Sauternes, an hour south of Bordeaux, and it is the difference between a great sweet wine and a ruined crop.',
  },

  /* ---------------------------------------------------------------- *
   * Labels
   * ---------------------------------------------------------------- */
  {
    slug: 'terroir',
    term: 'Terroir',
    category: 'label',
    definition:
      'The whole set of things about a place that show up in the wine: soil, slope, aspect, climate, and the local habits of the people farming it. Untranslatable by design - the French kept the word because no single English one carries the human part.',
  },
  {
    slug: 'appellation',
    term: 'Appellation',
    category: 'label',
    definition:
      'A legally defined growing area with rules attached - which grapes, what yields, sometimes what methods. In France, AOC. The logic is that the name of the place should mean something specific rather than being a marketing choice.',
    seeAlso: ['terroir', 'cru'],
  },
  {
    slug: 'cru',
    term: 'Cru',
    category: 'label',
    etymology: 'French, from croître, to grow',
    definition:
      'A named growth or vineyard site judged to have particular quality. What it guarantees depends entirely on where you are: a Bordeaux cru classe was ranked by chateau in 1855, while a Burgundy grand cru ranks the patch of ground itself.',
    seeAlso: ['appellation'],
  },
  {
    slug: 'assemblage',
    term: 'Assemblage',
    category: 'label',
    definition:
      'The blending of separate lots - different grapes, plots or barrels - into the final wine. In Bordeaux it is the central creative act of the year, not an afterthought.',
  },
  {
    slug: 'vintage',
    term: 'Vintage',
    category: 'label',
    definition:
      'The year the grapes were picked. It matters most where the weather is unreliable, which is why vintage charts are a European preoccupation and much less discussed in consistently sunny regions.',
  },
  {
    slug: 'sulphites',
    term: 'Sulphites',
    category: 'label',
    definition:
      'Sulphur dioxide, used since antiquity as a preservative and antioxidant. Declared on the label above 10 mg/L, which is nearly all wine, including almost every wine sold as natural. Genuine sulphite allergy is rare; it is not the cause of most wine headaches.',
  },
];

/** All glossary terms, alphabetised for display. */
export const GLOSSARY_SORTED = [...GLOSSARY].sort((a, b) =>
  a.term.localeCompare(b.term, 'en'),
);

/** Look a term up by its slug. Used for resolving `seeAlso` links. */
export function findTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}

/** Human-readable names for the category filter chips. */
export const CATEGORY_LABELS: Record<GlossaryTerm['category'], string> = {
  appearance: 'Appearance',
  nose: 'Nose',
  palate: 'Palate',
  structure: 'Structure',
  fault: 'Faults',
  making: 'Winemaking',
  label: 'Labels',
};
