

import type { Chapter } from '@/lib/types';

export const FRANCE: Chapter[] = [
  {
    slug: 'how-france-thinks',
    n: 12,
    part: 'france',
    title: 'How France thinks about wine',
    minutes: 3,
    standfirst:
      'French labels mostly don’t tell you the grape. Worth understanding before going region by region.',
    body: [
      {
        kind: 'p',
        text: 'Pick up a bottle of Chablis and you won’t find the word Chardonnay anywhere on it. Pick up a Sancerre and Sauvignon Blanc is absent. This confuses people raised on New World labelling, where the grape is the headline. The French position is straightforward: if you know the place, you already know the grape, because the place decides which grape is allowed.',
      },
      { kind: 'h', text: 'The appellation system' },
      {
        kind: 'p',
        text: 'The **AOC** - Appellation d’Origine Contrôlée - was formalised in 1935, largely in response to widespread fraud after phylloxera - a root feeding aphid accidentally imported from America - destroyed most of the vineyards in Europe. It defines a boundary on a map and then attaches rules to everything inside it: which varieties may be planted, maximum yields, minimum ripeness, sometimes even pruning method and ageing time.',
      },
      {
        kind: 'p',
        text: 'The trade off is real and worth naming. You get a guarantee of style and a defence of local tradition. You also get a system that can make genuine innovation illegal, and that can leave a name protected long after the wine behind it has stopped being good.',
      },
      { kind: 'h', text: 'The hierarchy of specificity' },
      {
        kind: 'p',
        text: 'The general principle across France: the smaller the named area, the higher the claim. A wine labelled with a whole region is the base; a village is better; a single vineyard is the top.',
      },
      {
        kind: 'table',
        head: [
          'Level',
          'Bordeaux example',
          'What it means',
        ],
        rows: [
          ['Regional', 'Bordeaux, Bordeaux Supérieur', 'Grapes from anywhere in the region'],
          ['District', 'Médoc, Entre-Deux-Mers', 'One district inside it'],
          ['Commune', 'Margaux, Pauillac, Pomerol', 'Grapes from within one village'],
          ['Classified estate', 'Château Margaux, Premier Cru Classé', 'A ranked château, not a ranked vineyard'],
        ],
      },
      {
        kind: 'p',
        text: 'That last row is where Bordeaux stops behaving like the rest of France. The appellations run out at the commune, and the ranking above that’s of châteaux rather than of land - which is a different thing, and the source of the most common trap on a Bordeaux label. Saint-Émilion is the one to watch. **Saint-Émilion Grand Cru** is an appellation: any grower in the commune can use it by accepting slightly lower yields and a little more ageing. **Grand Cru Classé** is a classification, a separate ranking of estates revised roughly every decade. The words are nearly identical and the wines need not be. Two bottles can both say Grand Cru on the label, and only one of them has been ranked at all.',
      },
      { kind: 'h', text: 'What "cru" actually guarantees' },
      {
        kind: 'p',
        text: 'Nothing consistent, which is the honest answer. In Bordeaux the 1855 classification ranked **châteaux** - businesses - and those businesses have bought and sold vineyards ever since, so the rank travels with the name rather than with the ground. In Burgundy a cru is a ranked patch of ground, and it stays ranked whoever farms it. In Alsace a grand cru is a site. In Beaujolais a cru is a whole village. The word travels; its meaning doesn’t.',
      },
      {
        kind: 'note',
        title: 'The practical shortcut',
        text: 'When a French label confuses you, ask two questions: what is the smallest place named on it, and what does that place legally require? Those two answers give you the grape, the style and roughly the ambition. Everything else on the label is decoration.',
      },
    ],
    quiz: [
      {
        q: 'Why do French labels usually omit the grape variety?',
        options: [
          'To keep the recipe secret',
          'Because the appellation already dictates which grapes are permitted',
          'Because most French wines are blends of unknown grapes',
          'It is a recent marketing decision',
        ],
        answer: 1,
        because:
          'Naming the place names the grape by implication, since the AOC rules specify what may be planted. The label assumes you know the system.',
      },
      {
        q: 'In Burgundy, what is the difference between Gevrey-Chambertin and Chambertin?',
        options: [
          'Nothing, they are alternative names',
          'Chambertin is the grand cru vineyard; Gevrey-Chambertin is the village wine',
          'Gevrey-Chambertin is the older and more prestigious',
          'One is red and one is white',
        ],
        answer: 1,
        because:
          'The village appended its greatest vineyard’s name to its own. Grand crus are so highly regarded they drop the village name entirely.',
      },
      {
        q: 'What does "cru" reliably guarantee across France?',
        options: [
          'A single classified vineyard',
          'A minimum age before release',
          'Nothing consistent - its meaning changes by region',
          'A specific grape variety',
        ],
        answer: 2,
        because:
          'In Burgundy it ranks land, in Bordeaux it ranked châteaux, in Beaujolais it names a village. Same word, different systems.',
      },
    ],
  },
  {
    slug: 'bordeaux',
    n: 13,
    part: 'france',
    title: 'Bordeaux',
    minutes: 6,
    standfirst:
      'Why the two banks plant different grapes, and why a ranking written in 1855 still sets the prices.',
    body: [
      {
        kind: 'p',
        text: 'Bordeaux is a port city, and that’s the key to the whole region. It made its fortune shipping wine to England and the Netherlands, and its wines were shaped by what travelled well and what the British aristocracy would pay for. The word "claret" is English, not French.',
      },
      { kind: 'h', text: 'The geography: two banks' },
      {
        kind: 'p',
        text: 'The Gironde estuary and the two rivers feeding it - the Garonne and the Dordogne - split the region in two, and the soil on either side is different enough to demand different grapes.',
      },
      {
        kind: 'table',
        head: [
          '',
          'Left Bank',
          'Right Bank',
        ],
        rows: [
          ['Soil', 'Gravel', 'Clay and limestone'],
          ['Dominant grape', 'Cabernet Sauvignon', 'Merlot'],
          ['Key appellations', 'Margaux, Pauillac, Saint-Julien, Saint-Estèphe, Pessac-Léognan', 'Saint-Émilion, Pomerol'],
          ['Character', 'Firm, structured, cedar and graphite', 'Plusher, rounder, plum and chocolate'],
          ['Estate size', 'Large châteaux', 'Small, often family run'],
        ],
      },
      {
        kind: 'p',
        text: 'The reason is drainage and heat. Gravel holds warmth and drains hard, which suits late ripening Cabernet Sauvignon. Cold, wet clay doesn’t, so the Right Bank plants Merlot, which ripens weeks earlier. This isn’t a matter of taste. It’s what will actually ripen where, and it explains the whole map.',
      },
      { kind: 'tool', tool: 'twoBanks' },
      { kind: 'h', text: 'Entre-Deux-Mers' },
      {
        kind: 'p',
        text: 'The wedge between the two rivers has the strangest name in Bordeaux and the strangest rule. "Between two seas" only looks like a mistake: they’re rivers, the Garonne and the Dordogne. They got called seas because the Atlantic tide runs a long way up both, so the water on either side of the region rises and falls twice a day - and on a big tide the Dordogne carries a tidal bore, the *mascaret*, upstream as a wave that people paddle out and surf.',
      },
      {
        kind: 'p',
        text: 'The rule is stranger. Entre-Deux-Mers is the largest stretch of vineyard land in Bordeaux, and its appellation is white only: dry Sauvignon Blanc, Sémillon and Muscadelle. Most of what actually grows between the rivers is red, and none of it may use the name - it is sold as Bordeaux or Bordeaux Supérieur instead. So the biggest subdivision of the region is, on the label, a white appellation, and almost everything planted in it is disqualified from saying where it came from.',
      },
      {
        kind: 'p',
        text: 'It’s the part of Bordeaux to look in first for a white worth more than it costs, precisely because the name on it isn’t one anybody is bidding for.',
      },
      { kind: 'h', text: 'The blend' },
      {
        kind: 'p',
        text: 'Almost no Bordeaux is a single variety. Six red grapes are permitted - **Cabernet Sauvignon**, **Merlot**, **Cabernet Franc**, **Petit Verdot**, **Malbec** and **Carménère** - though the last two are now rare there. The blend is settled months after harvest, by tasting through the separate batches and deciding how much of each goes in. It’s the biggest decision a château makes all year.',
      },
      {
        kind: 'p',
        text: 'Each grape has a job. Cabernet Sauvignon supplies structure, tannin and blackcurrant. Merlot supplies softness and weight through the middle of the mouthful. Cabernet Franc supplies aromatic lift and a leafy edge. Petit Verdot, at a few percent, supplies colour and a floral, violet like scent.',
      },
      { kind: 'h', text: 'The 1855 classification' },
      {
        kind: 'p',
        text: 'Napoleon III wanted a ranking of Bordeaux for the Paris Exposition Universelle. The brokers produced one in a matter of weeks, and rather than tasting anything they simply sorted the châteaux by the prices their wines had been fetching. 58 estates (61 today, after splits) were sorted into five growths, from **Premier Cru Classé** down to **Cinquième**.',
      },
      {
        kind: 'p',
        text: 'It has been amended twice in nearly two centuries: Cantemerle was added a year later, and Mouton Rothschild was promoted from second to first growth in 1973, after decades of lobbying and an order signed by the agriculture minister of the day, Jacques Chirac. Its motto had been, wonderfully, "First I cannot be, second I do not deign to be, Mouton I am." Afterwards it became "First I am, second I was, Mouton does not change."',
      },
      {
        kind: 'note',
        title: 'What the classification is worth today',
        text: 'As a guide to quality in 2026, less than you would hope - it ranks estates on their 1855 market position, and both ownership and vineyard boundaries have moved since. As a guide to price it remains devastatingly accurate, because the market still pays for the label. It has been no use to me at all: the unclassified Bordeaux I have enjoyed most were better than classified bottles costing more, which is about what you should expect from a ranking that is really a price list from 1855.',
      },
      {
        kind: 'p',
        text: 'Note also what it excludes. The 1855 list covers only the Médoc, with a single exception. Haut-Brion, which is in Graves rather than the Médoc, went in anyway because its name and its prices were already long established - Samuel Pepys was drinking it, and writing the name in his diary, in 1663. The entire Right Bank is absent, which is why Pomerol - home to Pétrus, one of the most expensive wines on earth - has no classification at all. Saint-Émilion runs its own classification, and the revisions keep going badly. Estates demoted in the 2012 ranking took it to court. In 2021 the owner of Château Angélus was convicted of unlawful interference in that same ranking: he had chaired both the regional appellation body overseeing it and the growers’ organisation, while consulting for châteaux that were promoted - his own among them, to the top tier. By 2022 three of the four estates at that tier, Cheval Blanc, Ausone and Angélus itself, had withdrawn from the classification altogether.',
      },
      {
        kind: 'note',
        title: 'A rabbit hole, if you have the time',
        text: 'Saint-Émilion’s classification is the most entertaining mess in wine, and worth an evening of reading on its own. It’s the clearest illustration I have found of what happens when a ranking becomes valuable enough to be worth rigging.',
      },
      { kind: 'h', text: 'The whites, and the sweet wines' },
      {
        kind: 'p',
        text: 'Dry white Bordeaux is **Sauvignon Blanc** and **Sémillon**, at its best in Pessac-Léognan, where barrel fermentation gives it a waxy, smoky depth that ages for decades. It’s consistently one of the least fashionable great white wines in the world, which makes it good value.',
      },
      {
        kind: 'p',
        text: 'South of the city, where the cold Ciron river meets the warmer Garonne, autumn mornings produce a mist that burns off by afternoon. That cycle is exactly what **noble rot** needs. The result is **Sauternes**: grapes picked berry by berry over several passes, sometimes yielding a single glass of wine per vine.',
      },
      {
        kind: 'p',
        text: 'The name I kept running into here is Émile Peynaud, the same Peynaud quoted on spitting in chapter six. Working at the University of Bordeaux from the 1940s, he reshaped modern winemaking practice - harvesting later, strict selection, control of malolactic conversion - and is, as far as I can tell, the single person most responsible for how a good red wine tastes today.',
      },
    ],
    quiz: [
      {
        q: 'Why does the Left Bank plant Cabernet Sauvignon and the Right Bank plant Merlot?',
        options: [
          'Tradition and family preference',
          'Gravel drains and holds heat, suiting late-ripening Cabernet; cold clay suits early-ripening Merlot',
          'The appellation rules were drawn arbitrarily',
          'Merlot cannot legally be planted on the Left Bank',
        ],
        answer: 1,
        because:
          'It is agronomy, not taste. Warm free-draining gravel gets Cabernet across the ripeness line; cold clay would leave it green.',
      },
      {
        q: 'How many times has the 1855 classification been amended?',
        options: [
          'Never',
          'Once',
          'Roughly every decade',
          'Three times',
        ],
        answer: 1,
        because:
          'Only Mouton Rothschild’s 1973 promotion from second to first growth. Saint-Émilion, by contrast, revises its separate classification about every ten years.',
      },
      {
        q: 'Why is Pétrus not a classified growth?',
        options: [
          'It was ranked too low to list',
          'It is in Pomerol, and the 1855 classification covered only the Médoc and Haut-Brion',
          'It declined to participate',
          'It did not exist in 1855',
        ],
        answer: 1,
        because:
          'The entire Right Bank sits outside the 1855 list. Pomerol has never had a classification of any kind.',
      },
      {
        q: 'What weather pattern makes Sauternes possible?',
        options: [
          'Consistent dry heat through autumn',
          'Cold Ciron water meeting the warmer Garonne, giving misty mornings that burn off by afternoon',
          'Early frost',
          'High rainfall through harvest',
        ],
        answer: 1,
        because:
          'Botrytis needs damp to take hold and dry to concentrate rather than rot the fruit. That daily mist-then-sun cycle is the whole basis of the wine.',
      },
    ],
  },
  {
    slug: 'burgundy',
    n: 14,
    part: 'france',
    title: 'Burgundy and Beaujolais',
    minutes: 2,
    standfirst:
      'Two grapes and hundreds of vineyards, where the producer matters more than the name on the label.',
    body: [
      {
        kind: 'p',
        text: 'Where Bordeaux blends grapes across large estates, Burgundy does the opposite: one grape per wine, and vineyards divided into plots sometimes smaller than a suburban section. **Pinot Noir** for the reds, **Chardonnay** for the whites, and essentially nothing else across the heart of the region.',
      },
      {
        kind: 'p',
        text: 'The premise is that if you hold the grape constant, the differences you taste must come from the ground. Burgundy has spent roughly 1,000 years - much of it monastic - mapping which patches of a single hillside produce better wine, and the resulting map is the most detailed expression of terroir anywhere.',
      },
      {
        kind: 'p',
        text: 'Chablis sits far to the north on limestone full of fossilised oysters, and makes steely, high acid Chardonnay with little or no oak. The Côte d’Or is the famous strip, and the ground every other Pinot Noir on earth gets compared to, Central Otago included. Beaujolais, at the southern end, is really its own region: granite instead of limestone, and Gamay. Chablis aside, I haven’t explored Burgundy properly yet, so treat that as a map rather than a recommendation.',
      },
      {
        kind: 'p',
        text: 'Burgundy is expensive because of scarcity and a legal accident. Napoleonic inheritance law required estates to be split equally between heirs at every generation, and two centuries of that has fragmented the vineyards into thousands of tiny holdings - the 50 hectare grand cru Clos de Vougeot has around 80 different owners, some working rows you could measure in metres. So the vineyard name on the label tells you less than you would like: 80 growers on one site make 80 different wines of wildly varying quality. In Burgundy **the producer matters more than the appellation**, which is the exact inverse of the rule that works everywhere else in France.',
      },
      { kind: 'h', text: 'Beaujolais' },
      {
        kind: 'p',
        text: 'In 1395 Philip the Bold banned Gamay from Burgundy proper, calling it "a very bad and disloyal plant". It went south to the granite of Beaujolais and turned out to be ideally suited.',
      },
      {
        kind: 'p',
        text: 'The region’s reputation was then wrecked by its own marketing success. **Beaujolais Nouveau**, released weeks after harvest and made by carbonic maceration, became a global novelty in the 1980s and taught a generation that Beaujolais meant thin wine tasting of banana and bubblegum. Meanwhile the named **cru** villages were making serious Gamay that ages a decade at a fraction of Burgundy prices. Not explored yet.',
      },
    ],
    quiz: [
      {
        q: 'Why does the producer matter more than the vineyard in Burgundy?',
        options: [
          'Burgundian vineyards are of uniform quality',
          'Napoleonic inheritance law fragmented vineyards among many owners, so one site yields many different wines',
          'The appellation system does not apply there',
          'Producers blend across appellations',
        ],
        answer: 1,
        because:
          'Clos de Vougeot alone has around eighty owners. The name on the label identifies the ground, not the skill of whoever farmed those particular rows.',
      },
      {
        q: 'What distinguishes Chablis from Côte de Beaune whites?',
        options: [
          'A different grape variety',
          'Chablis is further north on fossil-rich limestone, giving steelier, higher-acid, usually unoaked wine',
          'Chablis is always sweet',
          'Chablis is made from red grapes',
        ],
        answer: 1,
        because:
          'Both are Chardonnay. Chablis’s northern latitude and Kimmeridgian limestone produce a leaner, sharper, more mineral style.',
      },
    ],
  },
  {
    slug: 'rhone-loire-south',
    n: 15,
    part: 'france',
    title: 'The Rhône, the Loire, Alsace and the South',
    minutes: 5,
    standfirst:
      'One river with two unrelated halves, a thousand kilometres of Loire, and the parts of France that are still cheap.',
    body: [
      { kind: 'h', text: 'The Rhône' },
      {
        kind: 'p',
        text: 'The Rhône valley runs roughly 200 kilometres south from Lyon to Avignon, and splits cleanly into a northern and a southern half with a substantial gap of nothing much in between. Treating them as one region is a mapping convenience that misleads almost everybody.',
      },
      {
        kind: 'p',
        text: 'Every red in the north is **Syrah**, and only Syrah. The vineyards are terraced onto granite slopes so steep that machinery is impossible and the terraces have to be rebuilt by hand after heavy rain. Production is tiny - the whole north makes less wine than a handful of large Bordeaux estates. The name worth knowing is **Côte-Rôtie**, the "roasted slope", because it is what Hawke’s Bay Syrah gets measured against. Not explored yet.',
      },
      {
        kind: 'p',
        text: 'The signature here is black pepper. That’s the compound rotundone, and it’s far more pronounced in cool climate Syrah than in warm - which is why Northern Rhône and Hawke’s Bay Syrah smell like each other and neither smells much like Barossa Shiraz.',
      },
      {
        kind: 'p',
        text: 'The south is Mediterranean, flat, hot and windy, and it blends. **Grenache** leads, supported by Syrah and Mourvèdre - the trio abbreviated everywhere as GSM. The most famous appellation, **Châteauneuf-du-Pape**, permits 13 varieties (18, counting colour variants), though most wines use far fewer.',
      },
      {
        kind: 'p',
        text: 'Châteauneuf’s vineyards are covered in *galets* - large stones from the Alps, rolled smooth and carried down by the Rhône - which store the day’s heat and radiate it back overnight. It’s also the birthplace of the AOC system: Baron Le Roy drew up its rules in 1923, and they became the template France adopted nationally 12 years later.',
      },
      {
        kind: 'p',
        text: 'The appellations below it offer much the same thing for less money, and **Côtes du Rhône** covers the everyday tier - reliably one of the best value red categories in France.',
      },
      {
        kind: 'note',
        title: 'The mistral',
        text: 'A cold dry wind that funnels down the valley for well over 100 days a year, hard enough to bend trees permanently. It’s a nuisance to work in and a genuine asset: it dries the vines after rain, suppressing rot, and lets growers farm organically far more easily than the damp Atlantic regions can.',
      },
      { kind: 'h', text: 'The Loire' },
      {
        kind: 'p',
        text: 'France’s longest river, with vines along 1,000 kilometres of it, so it has no single identity. Two parts of it matter most. **Muscadet**, at the Atlantic end, is bone dry and saline and aged on its lees - the classic oyster wine, and absurdly cheap for what it is. **Sancerre**, a long way inland, is the flinty benchmark for Sauvignon Blanc against which Marlborough is always measured. In between is Chenin Blanc in every register from bone dry to dessert, and Cabernet Franc. Not explored yet.',
      },
      {
        kind: 'p',
        text: 'The Loire is also the spiritual home of the natural wine movement, for better and worse. It produces both the most exciting and the most faulty wine in France, sometimes from adjacent cellars.',
      },
      { kind: 'h', text: 'Alsace' },
      {
        kind: 'p',
        text: 'The one French region that labels by grape, because it spent much of its modern history as part of Germany and kept German habits along with German varieties. Tall green bottles, Riesling and Gewürztraminer and Pinot Gris, and a dry sunny climate sheltered by the Vosges. The persistent problem is sweetness: Alsace doesn’t reliably say whether a wine is dry or off-dry, and the same producer’s Pinot Gris may be either from one year to the next.',
      },
      { kind: 'h', text: 'The South' },
      {
        kind: 'p',
        text: '**Languedoc-Roussillon** is the largest vineyard area in the world by planted hectares, and spent most of the twentieth century producing industrial quantities of poor wine for the French domestic market. Since the 1980s it has been reinventing itself, and it’s now where the country’s most interesting value is - old vine Carignan, Grenache and Syrah, at prices the quality hasn’t caught up with.',
      },
      {
        kind: 'p',
        text: '**Provence** is the one major region where rosé is the main product rather than a sideline - around nine bottles in ten - and the pale dry style it settled on has been copied everywhere. The colour is a decision, not a by-product. The grapes are mostly Grenache, Cinsault and Syrah, picked early to keep the acid and pressed almost straight away, so the juice sees a few hours of skin contact at most. Less contact means less colour, and also less fruit and less grip: the style is defined as much by what it leaves out as by what it keeps.',
      },
      {
        kind: 'p',
        text: 'That colour then became a marketing signal, which is worth knowing when you buy one. Pale doesn’t mean dry and it doesn’t mean good - it means the fruit was pressed early, which nearly everyone now does because the market pays for it. Most of it is built to drink inside a year or two of the vintage. The exception is **Bandol**, where Mourvèdre makes rosé with the structure to age, and reds among the most serious in southern France, routinely overlooked because of the region’s pink reputation. Not explored yet.',
      },
      {
        kind: 'p',
        text: 'The **South West**, inland from Bordeaux, is where the Bordeaux varieties come from and where they’re still made without the Bordeaux markup. **Cahors** makes dark, firm Malbec, which the Argentines took and made famous, and **Madiran** makes Tannat, possibly the most tannic wine on earth. Not explored yet.',
      },
      {
        kind: 'note',
        title: 'Where to spend your money in France',
        text: 'Cru Beaujolais, Muscadet on lees, Loire Cabernet Franc, Languedoc old vine reds, and dry white Bordeaux. Five categories making genuinely good wine at prices that haven’t caught up with the quality, largely because none of them are fashionable.',
      },
    ],
    quiz: [
      {
        q: 'Which grape makes all the red wine of the Northern Rhône?',
        options: [
          'Grenache',
          'Syrah',
          'Mourvèdre',
          'A blend of all three',
        ],
        answer: 1,
        because:
          'The north is Syrah alone. Blending - the GSM trio - is a southern practice.',
      },
      {
        q: 'Why does Alsace label by grape variety when the rest of France does not?',
        options: [
          'It has no appellation system',
          'Its long periods under German rule left German labelling habits and grape varieties',
          'The grapes are too obscure to identify by place',
          'A modern marketing decision',
        ],
        answer: 1,
        because:
          'Alsace changed hands between France and Germany repeatedly. The tall green bottles, the varietal labelling and the Riesling all came with that history.',
      },
    ],
  },
  {
    slug: 'champagne',
    n: 16,
    part: 'france',
    title: 'Champagne',
    minutes: 3,
    standfirst:
      'Too cold to ripen grapes reliably. The bubbles began as a fault.',
    body: [
      {
        kind: 'p',
        text: 'Champagne sits at the northern edge of where grapes ripen at all, and for most of its history that was a problem: the wine was thin and sharp. The bubbles started as a fault. Fermentation stalled in the cold winter and restarted in spring, by which time the wine was in bottle, and the bottles sometimes exploded - often enough that cellar workers wore masks.',
      },
      {
        kind: 'p',
        text: 'The English had both a taste for the fizz and stronger coal fired glass that could hold the pressure, so they were the first to sell it deliberately. The French spent the next two centuries working out how to produce it reliably.',
      },
      { kind: 'h', text: 'The method' },
      {
        kind: 'steps',
        items: [
          'Make a thin, high acid base wine. On its own it’s unpleasant to drink, and that’s correct.',
          'Blend - across plots, across varieties, and usually across years. This blend, the assemblage, is where a house’s style actually lives.',
          'Bottle with a little sugar and yeast, and seal. A second fermentation happens inside the bottle, trapping the carbon dioxide.',
          'Leave the wine resting on the dead yeast cells for years. This is where the brioche, biscuit and toast notes come from.',
          'Riddle: gradually tilt and turn the bottle until the sediment collects in the neck.',
          'Disgorge: freeze the neck, pop out the plug of sediment, top up with a dosage of wine and sugar that sets the final sweetness.',
        ],
      },
      {
        kind: 'p',
        text: 'The whole sequence takes a minimum of 15 months by law and often 5 to 10 years in practice. That time is most of the cost.',
      },
      { kind: 'h', text: 'The three grapes' },
      {
        kind: 'p',
        text: '**Chardonnay** brings acid, citrus and the capacity to age. **Pinot Noir** brings body and red fruit weight. **Pinot Meunier** brings early drinking fruitiness and reliability in frost prone sites. Two of the three are red grapes, pressed gently and quickly so no colour is extracted - which is how a white wine is made from black fruit.',
      },
      {
        kind: 'p',
        text: 'A **blanc de blancs** is all Chardonnay: lean, precise, long lived. A **blanc de noirs** is all black grapes: broader and richer. And rosé Champagne is the one place in France where blending red wine into white isn’t only legal but standard.',
      },
      { kind: 'h', text: 'Reading the label' },
      {
        kind: 'table',
        head: [
          'Term',
          'Sugar (g/L)',
          'Tastes',
        ],
        rows: [
          ['Brut Nature / Zéro', '0–3', 'Sharp and bone dry'],
          ['Extra Brut', '0–6', 'Very dry'],
          ['Brut', '0–12', 'Dry - the default, and most of the market'],
          ['Extra Dry', '12–17', 'Off-dry, confusingly'],
          ['Sec', '17–32', 'Noticeably sweet, despite meaning "dry"'],
          ['Demi-Sec', '32–50', 'Dessert sweetness'],
        ],
      },
      { kind: 'tool', tool: 'dosage' },
      {
        kind: 'p',
        text: 'The names are in that order because the scale was never renamed. They date from an era when Champagne was drunk far sweeter than it is now, and each one has stayed attached to its band of sugar while the wine around it got drier.',
      },
      {
        kind: 'note',
        title: 'Grower Champagne',
        text: 'Look for the tiny letters RM (récoltant-manipulant) on the label - a grower who makes wine from their own fruit, as opposed to NM (négociant-manipulant), a house buying grapes in. Grower Champagne is usually more site specific, less consistent, and considerably better value than the big brands.',
      },
    ],
    quiz: [
      {
        q: 'Where do Champagne’s brioche and biscuit aromas come from?',
        options: [
          'Oak barrels',
          'The dosage added at disgorgement',
          'Extended ageing on the spent yeast lees after the second fermentation',
          'The chalk soil',
        ],
        answer: 2,
        because:
          'Autolysis - the breakdown of dead yeast cells - generates those notes. It is why time on lees is the main driver of both quality and cost.',
      },
      {
        q: 'Which is drier, Extra Dry or Brut?',
        options: [
          'Extra Dry',
          'Brut',
          'They are identical',
          'It varies by producer',
        ],
        answer: 1,
        because:
          'Brut allows 0–12 g/L, Extra Dry 12–17 g/L. The scale is a historical leftover from when Champagne was drunk much sweeter, and it has confused buyers ever since.',
      },
      {
        q: 'How is white Champagne made from Pinot Noir?',
        options: [
          'The grapes are peeled',
          'The juice is pressed off the skins quickly and gently, so no colour is extracted',
          'The colour is filtered out afterwards',
          'Only white mutations of Pinot Noir are used',
        ],
        answer: 1,
        because:
          'Grape juice is clear regardless of skin colour. Press fast and gently and you get white wine from black fruit.',
      },
    ],
  },
];
