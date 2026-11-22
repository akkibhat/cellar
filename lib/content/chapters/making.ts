import type { Chapter } from '../../types';

/**
 * Part VI - How wine is made.
 *
 * Placed after the regional parts on purpose. Once you have met the wines,
 * the techniques stop being abstract: the reader already knows what
 * carbonic maceration is for because they have met Beaujolais.
 */
export const MAKING: Chapter[] = [
  /* ================================================================== */
  {
    slug: 'grape-to-glass',
    part: 'making',
    n: 9,
    title: 'From grape to glass',
    minutes: 2,
    standfirst:
      'The same fruit, and the decisions that turn it into white, red, rosé or orange.',
    body: [
      {
        kind: 'p',
        text: 'Nearly all wine grapes have clear juice. Colour, tannin and much of the flavour live in the skins. So the first and largest decision in any winery is: how long do the skins stay in contact with the juice, and at what temperature.',
      },
      { kind: 'h', text: 'White' },
      {
        kind: 'steps',
        items: [
          'Pick, usually at night in warm regions to keep the fruit cold and protect aromatics.',
          'Press immediately. The skins go straight out - this is the defining move.',
          'Settle the juice, then ferment cool (12–18°C) to preserve delicate aromas.',
          'Decide on malolactic conversion, which softens sharp malic acid into milder lactic acid: allow it for a creamy, buttery texture, block it for crisp and citric.',
          'Decide how long to leave the wine on the lees - the spent yeast that settles out after fermentation. Stirring it back through builds body and a savoury, bready depth.',
          'Decide on oak: barrel for texture and spice, or stainless steel for purity.',
        ],
      },
      { kind: 'h', text: 'Red' },
      {
        kind: 'steps',
        items: [
          'Pick and destem, wholly or partly. Keeping some stems adds tannin, structure and a green herbal lift.',
          'Ferment warm (25–30°C) **with the skins**. Heat extracts colour and tannin far more efficiently than cold.',
          'Manage the cap - the raft of skins pushed to the surface by carbon dioxide - by punching it down or pumping juice over it. How often and how hard this is done is what decides how much colour and tannin end up in the wine.',
          'Press off the skins when the extraction is judged right: days for a light red, weeks for a serious one.',
          'Malolactic conversion happens, essentially always. It turns sharp malic acid, the acid in a green apple, into softer lactic acid, the acid in milk. It’s why red wine rarely tastes tart the way a white can.',
          'Age in barrel or tank, then blend.',
        ],
      },
      { kind: 'h', text: 'Rosé' },
      {
        kind: 'p',
        text: 'Red grapes, skins removed within hours. There are two routes. **Direct press** treats red grapes like white ones, and the short contact during pressing supplies all the colour: this gives the palest Provençal style. **Saignée** bleeds juice off a red fermentation early, which concentrates the red wine left behind. The rosé is the by-product there, and usually tastes like one.',
      },
      { kind: 'h', text: 'Carbonic maceration' },
      {
        kind: 'p',
        text: 'The strangest method, and my favourite to have found out about. Whole uncrushed bunches go into a sealed tank filled with carbon dioxide. With no oxygen, the grapes start fermenting *inside their own skins* using their own enzymes, before yeast is involved at all.',
      },
      {
        kind: 'p',
        text: 'The result is bright colour, very low tannin, and a distinctive smell of banana, bubblegum and cherry. It’s the technique behind Beaujolais Nouveau, and used in part it is behind most of the light, juicy, chillable reds around now.',
      },
      {
        kind: 'note',
        title: 'The one thing to remember',
        text: 'Temperature is the hidden variable in nearly every winemaking decision. Cold preserves aroma and extracts little; warm develops complexity and extracts a lot. White fermentation is cold, red fermentation is warm, and almost everything follows from that.',
      },
    ],
    quiz: [
      {
        q: 'What single decision separates white winemaking from red?',
        options: [
          'The grape colour',
          'Whether the juice ferments in contact with the skins',
          'The yeast strain',
          'The fermentation vessel',
        ],
        answer: 1,
        because:
          'Whites are pressed off the skins immediately; reds ferment on them. Everything else - colour, tannin, structure - follows.',
      },
      {
        q: 'Why do red fermentations run warmer than white?',
        options: [
          'Red yeast needs more heat',
          'Heat extracts colour and tannin from the skins far more efficiently',
          'To speed up bottling',
          'To prevent malolactic conversion',
        ],
        answer: 1,
        because:
          'Whites are fermented cold to preserve aromatics; reds are fermented warm to pull compounds out of the skins.',
      },
      {
        q: 'What is distinctive about carbonic maceration?',
        options: [
          'Grapes ferment inside their own intact skins in an oxygen-free tank, before yeast is involved',
          'The wine is fermented twice in bottle',
          'Carbon dioxide is injected at bottling',
          'The skins are removed before fermentation',
        ],
        answer: 0,
        because:
          'Intracellular fermentation by the grape’s own enzymes produces the banana and bubblegum signature, plus bright colour and very low tannin.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'bubbles-fortified-sweet',
    part: 'making',
    n: 10,
    title: 'Bubbles, fortified and sweet',
    minutes: 2,
    standfirst:
      'Sparkling, fortified and sweet: three things you can do to a fermentation.',
    body: [
      { kind: 'h', text: 'Making bubbles' },
      {
        kind: 'p',
        text: 'Every sparkling wine is a wine that fermented twice, with the second fermentation’s carbon dioxide trapped instead of released. Where you trap it decides everything.',
      },
      {
        kind: 'table',
        head: ['Method', 'Second ferment in', 'Gives', 'Examples'],
        rows: [
          ['Traditional (méthode traditionnelle)', 'The bottle sold to you', 'Fine persistent bead, brioche, autolytic depth', 'Champagne, Cava, English sparkling, New Zealand'],
          ['Tank (Charmat)', 'A pressurised tank', 'Larger bubbles, fresh primary fruit, lower cost', 'Prosecco, Lambrusco'],
          ['Ancestral', 'The bottle, one unfinished ferment', 'Cloudy, unpredictable, low pressure', 'Pétillant naturel, or pét-nat: "naturally sparkling"'],
          ['Carbonation', 'Nowhere - gas injected', 'Coarse, short lived bubble', 'Cheap fizz'],
        ],
      },
      {
        kind: 'p',
        text: 'The traditional method is expensive because of time rather than ingredients. The bready complexity comes from years resting on dead yeast cells, and those are years the producer has paid for the stock and can’t sell it.',
      },
      { kind: 'h', text: 'Fortification' },
      {
        kind: 'p',
        text: 'Add neutral grape spirit and the alcohol jumps to 15-22%, past what yeast can survive. **When** you add it is the whole difference between the styles.',
      },
      {
        kind: 'list',
        items: [
          '**Mid-fermentation** - yeast dies while sugar remains, leaving a sweet, strong wine. This is Port, and the reason it’s both sweet and 20%.',
          '**After fermentation** - the wine is already dry and simply becomes stronger. This is Sherry.',
        ],
      },
      {
        kind: 'p',
        text: 'Sherry then divides again by whether it ages under **flor**, a living film of yeast that grows across the surface of the wine and keeps oxygen off it. Under flor you get **Fino** and **Manzanilla**: pale, bone dry, saline, tasting of almonds and sea air. Without it the oxygen gets in and you get **Oloroso**: dark, nutty, still dry. **Pedro Ximénez**, from sun dried grapes, is the sweet one, and is almost black.',
      },
      { kind: 'h', text: 'Sweetness without fortification' },
      {
        kind: 'p',
        text: 'To leave sugar in an unfortified wine you must concentrate it in the fruit until the yeast gives up. Three routes, all of them expensive.',
      },
      {
        kind: 'list',
        items: [
          '**Noble rot** - *Botrytis cinerea* punctures the skins and dehydrates the grape, concentrating sugar, acid and glycerol while adding a marmalade and saffron note. Sauternes, Tokaji, German Beerenauslese.',
          '**Freezing** - grapes are left until frozen solid and pressed while frozen, so the water stays behind as ice. Eiswein. Requires a hard frost after ripening, which doesn’t arrive every year.',
          '**Drying** - grapes are laid on mats or hung to raisin. Vin Santo, Recioto della Valpolicella, Commandaria.',
        ],
      },
      {
        kind: 'note',
        title: 'Why great sweet wine is expensive',
        text: 'Sauternes is picked berry by berry over several passes through the vineyard, because botrytis doesn’t arrive uniformly. Yields can fall to about a glass of wine per vine, against a bottle or more for dry white. You’re paying for labour and for the risk of losing the crop entirely.',
      },
    ],
    quiz: [
      {
        q: 'What separates Prosecco from Champagne in production?',
        options: [
          'Prosecco is carbonated by gas injection',
          'Prosecco’s second fermentation happens in a pressurised tank rather than in the bottle',
          'Prosecco uses no second fermentation',
          'Prosecco is fortified',
        ],
        answer: 1,
        because:
          'The tank method is faster and cheaper, and preserves fresh primary fruit, which suits Glera. It does not develop autolytic brioche character.',
      },
      {
        q: 'What is flor?',
        options: [
          'A grape variety',
          'A living film of yeast that grows over Sherry, protecting it from oxygen',
          'The sediment in a Port bottle',
          'A style of oak barrel',
        ],
        answer: 1,
        because:
          'Flor gives Fino and Manzanilla their pale colour and saline, almond character. Without it the wine oxidises into Oloroso.',
      },
      {
        q: 'How does Eiswein achieve its sweetness?',
        options: [
          'Sugar is added after fermentation',
          'Grapes are pressed while frozen, so the water stays behind as ice',
          'Fermentation is stopped with spirit',
          'Noble rot dehydrates the grapes',
        ],
        answer: 1,
        because:
          'Only the sugar-rich portion runs off. It needs a hard frost after full ripening, which does not happen every year.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'oak-tannin-time',
    part: 'making',
    n: 11,
    title: 'Oak, tannin and time',
    minutes: 3,
    standfirst:
      'What a barrel adds beyond storage, and how to tell whether a wine will improve if you wait.',
    body: [
      { kind: 'h', text: 'What oak does' },
      {
        kind: 'p',
        text: 'A barrel does three separate jobs, and people usually only notice the first.',
      },
      {
        kind: 'list',
        items: [
          '**It adds flavour** - vanillin (vanilla), lactones (coconut), furfural (toast, caramel), eugenol (clove). None of these exist in grapes.',
          '**It adds tannin** - oak tannin is structurally different from grape tannin and contributes grip and ageing capacity.',
          '**It admits a trickle of oxygen** - micro-oxygenation through the staves softens tannins and stabilises colour. I think this is the most important of the three, and it is certainly the least visible.',
        ],
      },
      {
        kind: 'table',
        head: ['Variable', 'Options', 'Effect'],
        rows: [
          ['Origin', 'French vs American oak', 'French is subtler and spicier; American is louder, sweeter, coconut and dill'],
          ['Age', 'New vs used', 'A new barrel gives strong flavour; by its third or fourth fill it’s mostly just a vessel'],
          ['Size', 'Barrique (225 L) vs foudre (1,000 L+)', 'Smaller means more surface area per litre, so more oak influence'],
          ['Toast', 'Light to heavy', 'How hard the staves were fired: light gives spice, heavy gives smoke and coffee'],
        ],
      },
      {
        kind: 'p',
        text: 'A new French barrique costs well over €1,000, which is around NZ$2,000, and is a real cost line in any wine that uses them. When a cheap wine tastes strongly of vanilla and toast, it usually met oak chips or staves in a tank rather than a barrel, which gives the flavour but none of the slow oxygen exchange.',
      },
      { kind: 'h', text: 'What tannin actually is' },
      {
        kind: 'p',
        text: 'Tannins are polyphenols, and they bind to proteins. The drying, gripping feeling is them binding to the proteins in your saliva and stripping the lubrication out of your mouth. That’s why tannin is a feeling rather than a flavour.',
      },
      {
        kind: 'p',
        text: 'It also explains the oldest pairing rule there is. Tannin binds to protein, so it binds to the protein in a steak instead of to your saliva. The wine tastes softer and the meat tastes less fatty. It’s one of the few pairing rules with a genuine mechanism behind it.',
      },
      { kind: 'h', text: 'Will this wine improve?' },
      {
        kind: 'p',
        text: 'Most wine won’t. Something like 90 percent of all wine made is intended to be drunk within a year or two, and putting it away does nothing but make it duller. Ageing potential needs a structure to preserve, and that means some combination of four things.',
      },
      {
        kind: 'list',
        items: [
          '**High acidity** - the single best predictor. It’s why Riesling and Nebbiolo outlive wines twice their weight.',
          '**Firm tannin** - a preservative and an antioxidant, which softens and integrates over years.',
          '**Concentration** - low yield, intensely flavoured fruit with something to give up slowly.',
          '**Residual sugar** - in the great sweet wines, another preservative entirely.',
        ],
      },
      {
        kind: 'p',
        text: 'What ageing actually does: primary fruit fades and tertiary character arrives - leather, mushroom, forest floor, dried fig, tobacco. Tannins polymerise into longer chains, which feel softer and eventually drop out as sediment. Colour shifts, reds toward brick, whites toward gold.',
      },
      {
        kind: 'note',
        title: 'The honest version',
        text: 'Almost everyone who cellars wine opens their good bottles too late rather than too early. If you love something, buy several and open one every couple of years. You learn where the curve is, and you don’t lose the whole case waiting for an occasion good enough.',
      },
    ],
    quiz: [
      {
        q: 'Which effect of oak barrels is most often overlooked?',
        options: [
          'The vanilla flavour it contributes',
          'The slow trickle of oxygen through the staves, which softens tannin and stabilises colour',
          'The tannin it adds',
          'The cost',
        ],
        answer: 1,
        because:
          'Micro-oxygenation is why a barrel is not just a flavouring device, and why oak chips in a tank give flavour without the structural benefit.',
      },
      {
        q: 'Why does tannin feel drying?',
        options: [
          'It is acidic',
          'It binds to proteins in your saliva, stripping the lubrication from your mouth',
          'It absorbs water',
          'It evaporates quickly',
        ],
        answer: 1,
        because:
          'The same mechanism explains the classic steak pairing: tannin binds to the protein in the meat instead of to your saliva.',
      },
      {
        q: 'What is the best single predictor of a wine’s ageing potential?',
        options: ['Alcohol level', 'High acidity', 'Deep colour', 'Price'],
        answer: 1,
        because:
          'Acidity is why light, pale, low-tannin Riesling and Nebbiolo outlive far heavier wines. Colour and weight are poor guides.',
      },
    ],
  },
];
