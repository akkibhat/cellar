import type { Chapter } from '../../types';

/**
 * Part I - Foundations.
 *
 * Three chapters that install the vocabulary everything later depends on:
 * what fermentation is, what the categories of wine are, and how strong
 * wine is relative to everything else on a drinks list.
 */
export const FOUNDATIONS: Chapter[] = [
  /* ================================================================== */
  {
    slug: 'what-wine-is',
    part: 'foundations',
    n: 1,
    title: 'What wine actually is',
    minutes: 3,
    standfirst:
      'What fermentation actually does, and the four things in every glass once it has.',
    body: [
      {
        kind: 'p',
        text: 'Wine is the product of **fermentation**: yeast consumes the sugar in grape juice and gives off ethanol and carbon dioxide. Left alone in a warm room, a bucket of crushed grapes will make wine by itself, because the yeast is already on the skins and in the air. Winemaking guides what happens rather than starting it.',
      },
      { kind: 'tool', tool: 'fermentation' },
      {
        kind: 'p',
        text: 'Almost every question you’ll ask later (trust me, I did!) - why is this red wine pale, why is this white wine oily, why does this one cost $40 and that one $12 - comes back to a decision somebody made about how to guide the ferment, or where the fruit was grown before it got there.',
      },
      { kind: 'h', text: 'Why grapes' },
      {
        kind: 'p',
        text: 'You can ferment almost anything with sugar in it, and people do. Grapes won because *Vitis vinifera* happens to have an almost perfect balance without help: enough sugar to reach a stable alcohol level, enough acid to keep the result fresh and slow to spoil, enough tannin in the skins to give structure, and enough water to be drinkable. Cider needs help to get there and mead needs diluting; all grapes need is a container.',
      },
      {
        kind: 'p',
        text: 'The other reason is aroma. A wine grape carries hundreds of aromatic precursor compounds that don’t smell on the vine, but transform into aromatics during fermentation and ageing. Wine smells of things that were never in the vineyard - leather, tar, brioche, petrol - and needed a vocabulary made up to describe it.',
      },
      { kind: 'h', text: 'How strong wine is, and why' },
      {
        kind: 'p',
        text: 'The strength of the finished wine is decided almost entirely by how much sugar was in the grapes when they were picked. Riper fruit means more sugar and more alcohol, so warm regions produce stronger wine than cool ones, and climate change has pushed average alcohol up by more than a full percent over the last 30 years.',
      },
      {
        kind: 'p',
        text: 'There’s no single legal definition of wine, only national ones that disagree. The United States classifies 7% to 24% as wine for tax purposes. EU rules set a minimum nearer 8.5% for most still wine, and lets certain regions go lower still. New Zealand frames it differently again.(describe how NZ frames it, and put NZ first, then EU, then US framing it differently) The 7-24% span is still the one worth remembering: below it’s something else, and above it somebody has added fortifying spirit. Classical table wine sits low in that band at 11-15%, and fortified wines like Port climb toward the top.',
      },
      {
        kind: 'p',
        text: 'The yeast itself sets the natural ceiling. Most wine yeasts die at around 15-16% alcohol, poisoned by the alcohol they have made. Anything stronger than that had spirit added to it, which is what "fortified" means.',
      },
      { kind: 'h', text: 'The four things in every glass' },
      {
        kind: 'p',
        text: 'Whatever the wine, you’re tasting some combination of four things, and learning to separate them is most of the skill.',
      },
      {
        kind: 'list',
        items: [
          '**Acid** - the freshness, the thing that makes your mouth water. Falls as grapes ripen, so cooler climates keep more of it.',
          '**Alcohol** - warmth and weight. Rises as grapes ripen, which is the direct trade off against acid.',
          '**Tannin** - the dry, furry feeling that grips the inside of your mouth, drawn from skins, pips, stems and oak barrels. Reds have it; whites almost never do.',
          '**Sugar** - whatever the yeast didn’t finish. Most wine is dry, meaning effectively none.',
        ],
      },
      { kind: 'tool', tool: 'ripeness' },
      {
        kind: 'note',
        title: 'The single most useful habit',
        text: 'When you next drink a glass, don’t try to name fruits. Ask instead: is the acid high or low, does it feel light or warming in your chest, is there grip, is there sweetness. That’s a real tasting note, and more useful than guessing at blackcurrant.',
      },
    ],
    quiz: [
      {
        q: 'What sets the alcohol level of a finished dry wine?',
        options: [
          'How long it spent in barrel',
          'How much sugar was in the grapes at harvest',
          'The yeast strain the winemaker chose',
          'The thickness of the grape skins',
        ],
        answer: 1,
        because:
          'Yeast converts sugar to alcohol, so the sugar present at harvest sets the ceiling. Riper fruit, more sugar, more alcohol, which is why warm regions make stronger wine.',
      },
      {
        q: 'Why can no unfortified wine reach 20% alcohol?',
        options: [
          'Regulations cap it at 15%',
          'The grapes cannot get sweet enough anywhere on earth',
          'Wine yeast dies at around 15–16% alcohol',
          'The acid neutralises the alcohol above that point',
        ],
        answer: 2,
        because:
          'Yeast is poisoned by its own ethanol at roughly 15–16%. Anything stronger has had spirit added, which is the definition of fortified.',
      },
      {
        q: 'As grapes ripen, what happens to acid and alcohol potential?',
        options: [
          'Both rise together',
          'Both fall together',
          'Acid falls, alcohol potential rises',
          'Acid rises, alcohol potential falls',
        ],
        answer: 2,
        because:
          'This trade-off is the central tension of grape growing, and the reason cool-climate wine tastes fresher and warm-climate wine tastes riper and stronger.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'styles-of-wine',
    part: 'foundations',
    n: 2,
    title: 'The styles of wine',
    minutes: 3,
    standfirst:
      'Six categories cover almost everything sold, and which one you’re holding tells you more than the grape does.',
    body: [
      {
        kind: 'p',
        text: 'Wine lists are organised badly almost everywhere - by colour, then by country, then by price. A more useful map sorts by what was done to the wine, because that’s what determines how it will behave in your glass and at your table.',
      },
      { kind: 'h', text: 'Still white' },
      {
        kind: 'p',
        text: 'Juice pressed off the skins immediately and fermented clean. Because the skins leave straight away, there’s no colour and effectively no tannins, so the wine stands on acid and aroma alone. The range runs from feather light and plain through to broad, oaky and honeyed - Pinot Grigio to white Burgundy is a wider gap than most reds manage.',
      },
      { kind: 'h', text: 'Still red' },
      {
        kind: 'p',
        text: 'Fermented **with** the skins in the tank, which is where colour, tannin and much of the flavour come from. The length of that contact - the maceration - is the main dial. A few days gives something pale and soft; three weeks gives something dark and gripping.',
      },
      { kind: 'h', text: 'Rosé' },
      {
        kind: 'p',
        text: 'Red grapes with the skins pulled out early, usually within hours. The good stuff is made purposefully, picked early for acidity, and is one of the most food flexible wines there is. Almost none of it is made by mixing red and white, which is banned in most of Europe - the notable exception being Champagne, where it’s standard practice.',
      },
      { kind: 'tool', tool: 'skinContact' },
      { kind: 'h', text: 'Sparkling' },
      {
        kind: 'p',
        text: 'A second fermentation sealed in, so the carbon dioxide dissolves instead of escaping. Do it inside the bottle and you get the traditional method (méthode traditionnelle): fine persistent bubbles and a bready, yeasty complexity from the time spent on the dead yeast cells. Champagne is made this way. Do it in a pressurised tank and you get the tank method: cheaper, faster, and better at preserving fresh fruit aromatics. This is prosecco. Neither is a mistake.',
      },
      { kind: 'h', text: 'Fortified' },
      {
        kind: 'p',
        text: 'Grape spirit added, taking the wine to 15-22%. The timing of the addition is the whole trick. Add it partway through fermentation and you kill the yeast while sugar remains, leaving a sweet wine - that’s Port. Add it after fermentation finishes and the wine stays dry - that’s Fino Sherry.',
      },
      { kind: 'tool', tool: 'fortification' },
      { kind: 'h', text: 'Sweet' },
      {
        kind: 'p',
        text: 'Unfortified wines with sugar still left in them. The trick is always the same one: concentrate the sugar in the grape so far that the yeast hits its alcohol ceiling and dies before it has eaten all of it, and what it leaves behind is sweetness. There are three ways to do the concentrating. **Noble rot** is a fungus that shrivels the grapes on the vine and draws the water out of them (Sauternes, Tokaji). **Freezing** uses cold, the grapes pressed while still frozen so the water stays behind as ice (Eiswein). **Drying** does it slowly, the bunches laid out on mats or hung up for months (Vin Santo, Recioto della Valpolicella).',
      },
      {
        kind: 'table',
        head: ['Style', 'Skin contact', 'Typical ABV', 'A French benchmark', 'A New Zealand one'],
        rows: [
          ['Still white', 'None', '11–14%', 'Chablis', 'Marlborough Sauvignon Blanc'],
          ['Still red', 'Days to weeks', '12–15%', 'Saint-Émilion', 'Central Otago Pinot Noir'],
          ['Rosé', 'Hours', '11–13%', 'Bandol rosé', 'Central Otago Pinot Noir rosé'],
          ['Sparkling', 'Usually none', '11–12.5%', 'Champagne', 'Marlborough méthode traditionnelle'],
          ['Fortified', 'Varies', '15–22%', 'Banyuls', 'Almost none made now'],
          ['Sweet', 'Usually none', '7–14%', 'Sauternes', 'Botrytised Riesling'],
        ],
      },
      {
        kind: 'note',
        title: 'The seventh category, if you want it',
        text: 'Orange wine - white grapes fermented on their skins like a red - is the one genuine addition to this list in modern times, though the technique is thousands of years old from Georgia. It gives white wine tannin and grip, which makes it behave at the table like a light red.',
      },
    ],
    quiz: [
      {
        q: 'What actually distinguishes red wine from white?',
        options: [
          'The colour of the grape',
          'Whether the juice ferments in contact with the skins',
          'How long it ages in oak',
          'The yeast used',
        ],
        answer: 1,
        because:
          'Almost all grapes have clear juice. Ferment on the skins and you get red; press them off first and you get white, which is how Champagne makes white wine from Pinot Noir.',
      },
      {
        q: 'Why is Port sweet and Fino Sherry dry, when both are fortified?',
        options: [
          'Port has sugar added at bottling',
          'Sherry is fermented for longer at higher temperature',
          'Port is fortified mid-ferment, killing the yeast while sugar remains',
          'Port uses a sweeter grape variety',
        ],
        answer: 2,
        because:
          'The timing of the spirit addition is the whole difference. Stop the ferment early and the unfermented sugar stays in the wine.',
      },
      {
        q: 'What gives traditional-method sparkling wine its bready character?',
        options: [
          'Oak barrels',
          'Time spent resting on dead yeast cells after the second fermentation',
          'Added sugar at disgorgement',
          'The chalk in the soil',
        ],
        answer: 1,
        because:
          'The second fermentation happens in the bottle, and the wine then rests on the spent yeast (the lees), which breaks down and contributes brioche and biscuit notes.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'wine-among-drinks',
    part: 'foundations',
    n: 3,
    title: 'Wine among the drinks',
    minutes: 2,
    standfirst:
      'How strong wine is next to beer and spirits, and why counting glasses doesn’t work.',
    body: [
      {
        kind: 'p',
        text: 'People compare drinks by the glass, which is the wrong unit, because the glasses are different sizes and the liquids are different strengths. The only comparison that works is by how much pure alcohol is in front of you.',
      },
      {
        kind: 'table',
        head: ['', 'Range', 'Where most of it sits'],
        rows: [
          ['Ciders and beers', '1-15%', 'Almost all at 4-6%'],
          ['Wine', '7-24%', 'Table wine 11-15%; fortified climbs past 20%'],
          ['Spirits', '37.5-95%', '37.5% is the EU floor, and the US sets 40% for many categories'],
        ],
      },
      {
        kind: 'p',
        text: 'Note how much of that range wine covers on its own. A light German Riesling at 8% and a Vintage Port at 20% are both wine, and one is two and a half times the other. Treating "a glass of wine" as a fixed quantity is the single most common mistake people make about their own drinking.',
      },
      { kind: 'h', text: 'The unit, and why it exists' },
      {
        kind: 'p',
        text: 'A standard unit exists to make different drinks comparable. The volumes below all land within about a gram of each other, at close to 10 grams of pure alcohol, which is why they count as one standard drink each.',
      },
      {
        kind: 'list',
        items: [
          '250 ml of 5% beer',
          '100 ml of 12% wine',
          '30 ml of 40% whisky',
          '30 ml of 45% pastis',
          '250 ml of 5% cider',
        ],
      },
      {
        kind: 'p',
        text: 'The catch is that 100 ml is a small pour. A generous restaurant glass of red is often 175 ml or more, which at 14% is closer to two units than one. If you’re counting, count millilitres and percentages, not glasses.',
      },
      { kind: 'tool', tool: 'units' },
      {
        kind: 'note',
        title: 'A note on the numbers',
        text: 'Different countries define a "standard drink" differently - New Zealand and Australia use 10 g of alcohol, as does France; the UK unit is 8 g and the United States uses 14 g. The figures above follow the French and New Zealand convention of 10 g. The calculator lets you switch between them, because the same glass of wine is a different number of drinks depending on which country you’re counting in.',
      },
    ],
    quiz: [
      {
        q: 'Roughly how many units are in a 175 ml restaurant pour of 14% red?',
        options: ['About one', 'About two and a half', 'About five', 'About one and a half'],
        answer: 1,
        because:
          '175 ml at 14% contains about 2.45 times the alcohol of the 100 ml / 12% reference pour, so a single generous glass is closer to two and a half units than one.',
      },
      {
        q: 'Why is "a glass of wine" a poor unit of measurement?',
        options: [
          'Glasses vary in size and wines vary from 7% to 24% alcohol',
          'Wine is absorbed differently from other drinks',
          'Glass shape changes the alcohol content',
          'It is a perfectly good unit',
        ],
        answer: 0,
        because:
          'Two variables move at once - pour size and strength, so two "glasses of wine" can differ by a factor of three or more.',
      },
    ],
  },
];
