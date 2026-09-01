

import type { Chapter } from '@/lib/types';

export const PRACTICE: Chapter[] = [
  {
    slug: 'serving',
    n: 22,
    part: 'practice',
    title: 'Serving',
    minutes: 2,
    standfirst:
      'Serving temperature is the easiest thing to fix, and most people get it wrong in both directions.',
    body: [
      {
        kind: 'p',
        text: 'The old rule - white chilled, red at room temperature - comes from a time when a room was about 16°C. A heated house today sits at 21-22°C, and at that temperature most reds taste flabby and alcoholic. The fridge runs at about 4°C, which mutes a white almost completely. So both halves of the rule are now wrong.',
      },
      {
        kind: 'p',
        text: 'Both errors have the same fix, 20 minutes before you pour: put the red somewhere cooler than the room, and take the white out of the fridge.',
      },
      { kind: 'tool', tool: 'temperature' },
      { kind: 'h', text: 'Why temperature does so much' },
      {
        kind: 'list',
        items: [
          '**Cold suppresses aroma** - volatile compounds need warmth to evaporate. Over-chilling makes any wine smell of less.',
          '**Cold accentuates tannin and acid** - a chilled red tastes harder and more astringent than the same wine warm.',
          '**Warmth accentuates alcohol** - above about 18°C, ethanol starts reading as heat and spirit rather than as body.',
        ],
      },
      {
        kind: 'p',
        text: 'This gives a general rule: the more tannic the wine, the warmer it wants to be, up to a ceiling of about 18°C. The more aromatic and delicate, the cooler - but never so cold that it stops smelling of anything.',
      },
      { kind: 'h', text: 'Glassware' },
      {
        kind: 'p',
        text: 'The industry sells a different glass for every appellation, and the evidence for most of those distinctions is thin. Three things do genuinely matter.',
      },
      {
        kind: 'list',
        items: [
          '**Size** - big enough to swirl a normal pour without spilling. This is the main one.',
          '**A tapered rim** - narrower than the bowl, so aroma concentrates rather than dispersing.',
          '**Thin, plain glass** - thick rims interfere with the flow of wine, and cut crystal patterns make it impossible to judge colour.',
        ],
      },
      {
        kind: 'p',
        text: 'One decent universal glass covers everything from Riesling to Barolo. The genuine exception is sparkling wine, where a flute preserves bubbles at the cost of aroma - which is why serious Champagne is increasingly served in a white wine glass instead.',
      },
      { kind: 'h', text: 'Decanting' },
      {
        kind: 'p',
        text: 'Two entirely different operations that share a name.',
      },
      {
        kind: 'table',
        head: [
          '',
          'For sediment',
          'For air',
        ],
        rows: [
          ['Applies to', 'Mature reds, vintage Port', 'Young tannic reds, reductive wines'],
          ['Method', 'Stand upright a day ahead, pour slowly and steadily, stop at the sediment', 'Pour hard and splash it about'],
          ['Goal', 'Clarity - minimise contact with air', 'Aeration - maximise contact with air'],
        ],
      },
      {
        kind: 'p',
        text: 'Note that the two goals are opposites, which is why doing the wrong one to an old wine can flatten it within the hour. When in doubt with something mature, open it and pour a glass; if it improves in the glass, it will improve in a decanter.',
      },
      {
        kind: 'note',
        title: 'Keeping an open bottle',
        text: 'Recork and refrigerate - including reds, which you then let warm before drinking. Cold slows oxidation. A vacuum pump helps marginally; inert gas helps more. Realistically most wines are fine on day two, noticeably tired on day three, and finished by day four. Sparkling wine keeps better than people expect with a proper stopper.',
      },
    ],
    quiz: [
      {
        q: 'Why does "room temperature" for reds mislead?',
        options: [
          'It was always wrong',
          'It dates from unheated rooms at around 16°C; a modern house at 21–22°C is too warm',
          'Reds should be served cold',
          'It refers to cellar temperature',
        ],
        answer: 1,
        because:
          'Above about 18°C alcohol starts reading as heat, and the wine tastes flabby and blurred. Twenty minutes out of the room fixes it.',
      },
      {
        q: 'What does over-chilling do to a white wine?',
        options: [
          'Increases its perceived sweetness',
          'Suppresses aroma, because volatile compounds need warmth to evaporate',
          'Makes it taste more alcoholic',
          'Nothing measurable',
        ],
        answer: 1,
        because:
          'Fridge temperature is around 4°C, cold enough to mute the wine almost completely. Twenty minutes out of the fridge is the fix.',
      },
      {
        q: 'How does decanting for sediment differ from decanting for air?',
        options: [
          'They are the same operation',
          'For sediment you pour slowly to minimise air contact; for aeration you pour hard to maximise it',
          'Only old wines are ever decanted',
          'Sediment decanting requires a wider vessel',
        ],
        answer: 1,
        because:
          'The two goals are opposites, which is why aggressively aerating a fragile old wine can flatten it within the hour.',
      },
    ],
  },
  {
    slug: 'food-and-wine',
    n: 23,
    part: 'practice',
    title: 'Food and wine',
    minutes: 2,
    standfirst:
      'A few pairing rules have real mechanisms behind them. Those are the ones I have found work.',
    body: [
      {
        kind: 'p',
        text: 'Pairing is less about matching flavours than about what the food does to the wine. Four interactions do nearly all the work.',
      },
      { kind: 'h', text: 'The four that actually work' },
      {
        kind: 'list',
        items: [
          '**Tannin binds protein.** A tannic red against a fatty steak: the tannin binds to the protein in the meat instead of to your saliva, so the wine tastes softer and the meat tastes cleaner. The oldest rule there is, and a chemical one.',
          '**Acid cuts fat, and has to match acid.** A high acid wine refreshes the palate through rich food. It also has to be at least as acidic as the dish, or it tastes flat next to it - a low acid wine beside a vinaigrette is the usual example.',
          '**Sweet has to beat sweet.** The wine must be sweeter than the pudding or it tastes sour and thin. It’s also why Sauternes works better with foie gras or blue cheese than with dessert.',
          '**Salt softens everything.** Salt suppresses bitterness and tannin and lifts fruit, which makes it the most forgiving thing on the table.',
        ],
      },
      { kind: 'h', text: 'The traps' },
      {
        kind: 'table',
        head: [
          'Problem',
          'Why',
          'Instead',
        ],
        rows: [
          ['Chilli with high alcohol red', 'Alcohol amplifies burn and capsaicin amplifies alcohol', 'Low-alcohol, off-dry, aromatic white - Riesling or Gewürztraminer'],
          ['Artichoke, asparagus', 'Cynarin and sulphur compounds make wine taste metallic or oddly sweet', 'High-acid, herbaceous Sauvignon Blanc'],
          ['Egg yolk', 'Coats the palate and flattens tannin and acid', 'Sparkling wine - the bubbles and acid scrub through'],
          ['Very sweet dessert with dry wine', 'Sugar makes any drier wine taste sour and hollow', 'A wine sweeter than the dish, or skip it'],
          ['Oily fish with tannic red', 'Tannin plus fish oil produces a distinct metallic taste', 'Crisp white, or a very light chilled red'],
        ],
      },
      { kind: 'h', text: 'The two heuristics worth keeping' },
      {
        kind: 'p',
        text: '**Match weight before flavour.** A delicate dish is flattened by a heavy wine and a rich dish makes a light wine disappear. Get the weight right and most pairings work adequately; get it wrong and no cleverness rescues it.',
      },
      {
        kind: 'p',
        text: '**What grows together goes together.** Sancerre with Loire goat’s cheese, Chianti with tomato and olive oil, Muscadet with Atlantic oysters, Marlborough Sauvignon Blanc with green lipped mussels. Local pairings have had a long time to be worked out, which makes this a reliable shortcut when you have no better idea.',
      },
      {
        kind: 'note',
        title: 'The rule that stopped being a rule',
        text: 'White with fish and red with meat is a default and nothing more. A light chilled Pinot Noir with salmon is excellent. An oaked Chardonnay with roast chicken beats most reds. Weight, acid and tannin are what actually matter; colour is just a rough stand-in for them.',
      },
    ],
    quiz: [
      {
        q: 'Why does a tannic red work with a fatty steak?',
        options: [
          'The flavours are similar',
          'Tannin binds to the meat’s protein instead of your saliva, softening the wine and cleaning the palate',
          'The fat dissolves the tannin',
          'It is purely traditional',
        ],
        answer: 1,
        because:
          'A genuine chemical mechanism - the same protein binding that makes tannin feel drying in the first place.',
      },
      {
        q: 'Why does dry wine taste sour alongside a sweet dessert?',
        options: [
          'The sugar reacts with the alcohol',
          'Sweetness in the food makes any less-sweet wine taste sour and hollow by comparison',
          'Desserts are usually acidic',
          'The wine is being served too cold',
        ],
        answer: 1,
        because:
          'The wine must be sweeter than the dish. This is why Sauternes shines with foie gras and blue cheese rather than with a sugary pudding.',
      },
      {
        q: 'What should you match before anything else?',
        options: [
          'Colour',
          'Weight',
          'Region',
          'Price',
        ],
        answer: 1,
        because:
          'A delicate dish is flattened by a heavy wine, and a rich dish erases a light one. Get weight right and most pairings work.',
      },
    ],
  },
  {
    slug: 'buying-wine',
    n: 24,
    part: 'practice',
    title: 'Buying wine',
    minutes: 4,
    standfirst:
      'How to sort what a label must tell you from what it is selling you, and what you are actually paying for.',
    body: [
      { kind: 'h', text: 'Reading a label' },
      {
        kind: 'p',
        text: 'Two labelling philosophies split the world, and knowing which one you’re holding tells you where to look.',
      },
      {
        kind: 'table',
        head: [
          '',
          'Old World',
          'New World',
        ],
        rows: [
          ['Headline', 'The place', 'The grape'],
          ['Grape', 'Usually absent - implied by the appellation', 'Front and centre'],
          ['Assumes', 'You know the system', 'You know the variety'],
          ['Typical', 'Chablis, Sancerre, Barolo, Rioja', 'Marlborough Sauvignon Blanc, Barossa Shiraz'],
        ],
      },
      { kind: 'h', text: 'What is actually informative' },
      {
        kind: 'list',
        items: [
          '**The smallest place named.** Region → village → single vineyard, in ascending order of specificity and usually of ambition. This is the most useful thing on any Old World label.',
          '**Alcohol.** A genuine style signal. 12% suggests cool climate and light; 15% suggests warm climate and full. It’s legally required and hard to fudge.',
          '**Vintage.** Matters most where weather is unreliable, which is to say Europe more than anywhere else.',
          '**The producer.** In Burgundy this outranks everything else on the label. Elsewhere it’s a reliability signal once you know a few names.',
          '**Estate-bottling.** *Mis en bouteille au château/domaine*, or "Estate Grown". The producer grew the fruit rather than buying it, which usually means more control and more accountability.',
        ],
      },
      { kind: 'h', text: 'What is mostly noise' },
      {
        kind: 'p',
        text: '"Reserve" is legally meaningless in most countries, including New Zealand, Australia and the United States - Spain and Italy are the notable exceptions, where it denotes defined ageing. "Old vines" is unregulated almost everywhere. Medals may be from a competition that awards them to a third of entrants. Heavy bottles and elaborate embossing correlate with marketing budget, not quality, and are increasingly an environmental liability.',
      },
      { kind: 'h', text: 'The back label' },
      {
        kind: 'p',
        text: 'The tasting note on the back is written by the marketing department and can be ignored. The technical data sometimes printed alongside it can’t: residual sugar, acidity, harvest date, oak regime. A producer who prints those numbers is telling you they have nothing to hide.',
      },
      {
        kind: 'note',
        title: 'Buying in a shop, quickly',
        text: 'Find the smallest named place you recognise, check the alcohol matches the style you want, prefer estate bottled, and ignore anything decorative. If the shop has staff who taste what they sell, tell them your budget and one wine you have enjoyed. That works better than everything else on this page.',
      },
      { kind: 'h', text: 'Where the money goes' },
      { kind: 'h', text: 'Where your money goes' },
      {
        kind: 'p',
        text: 'On a cheap bottle, most of the price is tax, packaging, freight and retail margin - the wine itself may be a very small fraction. Because those fixed costs stay roughly constant as the price rises, the proportion spent on actual wine climbs steeply at first.',
      },
      {
        kind: 'p',
        text: 'That gives the most useful buying rule there is: the jump in quality from the cheapest bottle to a mid priced one is enormous, and the jump from mid priced to expensive is much smaller. Doubling your spend at the bottom of the market transforms what you get. Doubling it at the top buys scarcity and reputation.',
      },
      { kind: 'h', text: 'Storage' },
      {
        kind: 'p',
        text: 'For anything you’ll drink within a year or two, almost nothing matters. For bottles you intend to keep, four things do, in this order.',
      },
      {
        kind: 'list',
        items: [
          '**Stable temperature** - more important than cold temperature. Repeated cycling expands and contracts the wine, pushing it past the closure. A steady 18°C beats a cupboard swinging between 10 and 25.',
          '**Darkness** - UV degrades wine, which is why bottles are green or brown in the first place. Clear-glass rosé is particularly vulnerable.',
          '**On its side, for cork** - keeps the cork wet and swollen. Irrelevant for screwcaps, which can stand upright indefinitely.',
          '**Stillness** - vibration is the least important factor and the one most often oversold by people selling storage.',
        ],
      },
      {
        kind: 'p',
        text: 'The worst place in most houses is the kitchen: warm, bright, and subject to daily temperature swings. An interior wardrobe on the ground floor is usually better than any wine rack on display.',
      },
      { kind: 'h', text: 'Should you cellar anything' },
      {
        kind: 'p',
        text: 'Probably less than you think. Around 90 percent of wine is made to drink young, and keeping it achieves nothing. Cellaring is worth it for wines with the structure to reward it - high acid, firm tannin, real concentration - and for the specific pleasure of watching a wine change.',
      },
      {
        kind: 'p',
        text: 'If you do want to, buy several of one wine rather than one each of several. Six bottles opened over a decade teach you how that wine changes. Six different bottles teach you nothing, because you never find out whether you opened any of them at the right moment.',
      },
      {
        kind: 'note',
        title: 'On buying in New Zealand',
        text: 'Local wine is priced well domestically, and imported wine carries freight and excise from the other side of the world, which shows up hardest at the cheap end. Under about $25, buy local: the same money buys considerably more quality. Above that, imported wine becomes competitive, and Portuguese, Spanish and southern French reds offer the best value on the shelf.',
      },
    ],
    quiz: [
      {
        q: 'What does "Reserve" guarantee on a New Zealand label?',
        options: [
          'Minimum two years’ ageing',
          'Nothing - the term is legally unregulated there',
          'Single-vineyard fruit',
          'A minimum alcohol level',
        ],
        answer: 1,
        because:
          'Spain and Italy define it by ageing time. In most other countries, including New Zealand, anyone may print it on anything.',
      },
      {
        q: 'What does the stated alcohol tell you?',
        options: [
          'Nothing useful',
          'A genuine style signal - 12% suggests cool-climate and light, 15% warm-climate and full',
          'The quality tier',
          'How long it will age',
        ],
        answer: 1,
        because:
          'It is legally required, hard to fudge, and directly reflects ripeness at harvest, so it is one of the more honest numbers on a bottle.',
      },
      {
        q: 'Why does doubling your spend on a cheap bottle improve it so much more than doubling an expensive one?',
        options: [
          'Expensive wine is overpriced by definition',
          'Fixed costs - tax, packaging, freight, margin - stay roughly constant, so the share spent on wine climbs steeply at first',
          'Cheap wine is always faulty',
          'Retailers discount expensive wine more',
        ],
        answer: 1,
        because:
          'At the bottom of the market the wine itself is a small fraction of the price. Higher up, you are increasingly paying for scarcity and reputation.',
      },
      {
        q: 'What matters most in wine storage?',
        options: [
          'Very cold temperature',
          'Stable temperature, rather than cold',
          'Absence of vibration',
          'Storing bottles upright',
        ],
        answer: 1,
        because:
          'Cycling expands and contracts the wine and pushes it past the closure. A steady 18°C beats a cupboard swinging between 10 and 25.',
      },
    ],
  },
];
