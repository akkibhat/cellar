

import type { Chapter } from '@/lib/types';

export const GRAPE_CHAPTERS: Chapter[] = [
  {
    slug: 'the-grapes',
    n: 4,
    part: 'grapes',
    title: 'The grapes',
    minutes: 4,
    standfirst:
      'Two dozen varieties account for most of what you will ever be offered. The whites sorted by what they are for, the reds by how much they weigh.',
    body: [
      { kind: 'h', text: 'The whites' },
      {
        kind: 'p',
        text: 'White wine has no tannin to hide behind. Strip that away and what is left is acid, aroma and texture - which means white varieties differ from one another more nakedly than reds do, and are easier to learn as a result.',
      },
      {
        kind: 'p',
        text: 'It helps to sort them into three groups by what they’re trying to do.',
      },
      { kind: 'h', text: 'The aromatics' },
      {
        kind: 'p',
        text: 'Varieties whose whole proposition is smell: **Sauvignon Blanc**, **Riesling**, **Gewürztraminer**, **Muscat**, **Viognier**. You can identify these blind by nose alone with a little practice, because each carries a signature compound. Sauvignon Blanc has methoxypyrazines, giving the green capsicum and cut grass note. Gewürztraminer has cis-rose oxide, which is lychee. These aren’t metaphors; they’re molecules - mostly the precursor compounds from chapter one, released during fermentation.',
      },
      { kind: 'h', text: 'The neutrals' },
      {
        kind: 'p',
        text: '**Chardonnay**, **Pinot Gris**, **Sémillon**. Little aroma of their own, which sounds like a fault but isn’t. A neutral grape is a blank canvas that shows the site, the vintage and the winemaking - which is why Chardonnay is planted in every serious wine region on earth and why it can taste like almost anything.',
      },
      { kind: 'h', text: 'The high acid specialists' },
      {
        kind: 'p',
        text: '**Chenin Blanc**, **Albariño**, **Grüner Veltliner**, and Riesling again. Built around acidity, which does three things: it keeps the wine refreshing, it lets the wine age for decades, and it holds sweetness in balance so a sweet wine tastes vivid rather than sickly.',
      },
      {
        kind: 'tool',
        tool: 'grapeFilter',
        only: 'white',
      },
      {
        kind: 'note',
        title: 'How to use the explorer above',
        text: 'Sort by acidity. The order you get is roughly the order of how long those wines will live, and almost exactly the order of how well they handle food. Acid is the most useful single thing to know about a white wine.',
      },
      { kind: 'h', text: 'The two that make white Bordeaux' },
      {
        kind: 'p',
        text: 'Worth calling out because they explain a whole region. **Sauvignon Blanc** brings acid and aromatic lift; **Sémillon** brings weight, texture and the thin skins that let in noble rot. Blended and barrel aged they make dry white Bordeaux that can age 20 years. Left to rot on the vine, they make Sauternes. One pair of grapes, two of the most distinctive white wines in the world.',
      },
      { kind: 'h', text: 'The reds' },
      {
        kind: 'p',
        text: 'Reds add tannin to the picture, and tannin is what makes red wine confusing for beginners: it’s a texture rather than a taste, and it doesn’t correspond to anything in ordinary food except a strong tea. Sorting reds by weight and grip is more useful than sorting them by origin.',
      },
      { kind: 'h', text: 'Light and perfumed' },
      {
        kind: 'p',
        text: '**Pinot Noir**, Loire **Cabernet Franc**, and **Gamay**. Pale, low in tannin, high in acid, and built on aroma rather than force. These are better for 20 minutes in the fridge, and are the reds that behave most like whites at the table. Pinot Noir is the one people become obsessive about, because it tastes more of where it was grown than any other red: the same grape from two neighbouring vineyards makes two recognisably different wines.',
      },
      { kind: 'h', text: 'Medium and savoury' },
      {
        kind: 'p',
        text: '**Sangiovese**, **Nebbiolo**, **Syrah**, **Tempranillo**. Not heavy, but firm, sharp and often savoury rather than fruity - tar, herbs, leather, pepper. Nebbiolo is the odd one out: it looks almost see through in the glass, and yet it grips harder and lasts longer than wines twice as dark.',
      },
      { kind: 'h', text: 'Full and firm' },
      {
        kind: 'p',
        text: '**Cabernet Sauvignon**, **Petit Verdot**, **Malbec**, and **Mourvèdre**. Thick skins, deep colour, substantial tannin, and the varieties most likely to need either time in a cellar or a blending partner to soften them. Cabernet Sauvignon is the one the others get measured against and the world’s most planted red.',
      },
      { kind: 'h', text: 'Full and soft' },
      {
        kind: 'p',
        text: '**Merlot**, **Grenache**, and **Zinfandel**. Weight without grip - generous, warming, and easy to like immediately. Merlot suffers from being cast as the undemanding option, which ignores that the Right Bank of Bordeaux is planted with it and that Pétrus, among the most expensive wines in the world, is almost entirely Merlot.',
      },
      {
        kind: 'tool',
        tool: 'grapeFilter',
        only: 'red',
      },
      { kind: 'h', text: 'Why Bordeaux blends and Burgundy doesn’t' },
      {
        kind: 'p',
        text: 'Bordeaux is Atlantic, and its weather is unreliable. Planting several varieties that ripen at different times is insurance: in a cold, wet year the Merlot comes in and the Cabernet doesn’t, and the blend is adjusted accordingly. Burgundy is continental and plants a single variety per wine, betting everything on one grape and one patch of ground.',
      },
      {
        kind: 'p',
        text: 'Neither approach is superior. They are different answers to different weather, and between them they explain how most of the wine world is laid out.',
      },
      {
        kind: 'note',
        title: 'The one to taste next to itself',
        text: 'Syrah and Shiraz are the same grape, and the name tells you which style to expect. Syrah, on a cool climate label, means medium weight, black pepper, olive and violets, with firm acid. Shiraz, on a warm climate label, means fuller, softer and sweeter fruited - blackberry and plum, chocolate, often noticeably higher in alcohol. Open a Northern Rhône Syrah beside a Barossa Shiraz and the gap is entirely climate.',
      },
    ],
    quiz: [
      {
        q: 'Why is a "neutral" grape like Chardonnay useful rather than boring?',
        options: [
          'It is cheaper to grow',
          'It shows site and winemaking clearly, because it adds little of its own',
          'It has higher acidity than aromatic varieties',
          'It resists disease better',
        ],
        answer: 1,
        because:
          'Low intrinsic aroma makes the grape a transmitter rather than a broadcaster, which is exactly why Chablis and an oaked Hawke’s Bay Chardonnay taste unrelated.',
      },
      {
        q: 'Which compound gives Sauvignon Blanc its green, grassy character?',
        options: [
          'Rose oxide',
          'Methoxypyrazines',
          'Diacetyl',
          'Terpenes',
        ],
        answer: 1,
        because:
          'Methoxypyrazines also appear in Cabernet Franc and underripe Cabernet Sauvignon, which is why all three can show a green-pepper note.',
      },
      {
        q: 'Nebbiolo is famously pale. What does that tell you about its tannin?',
        options: [
          'Nothing - colour and tannin are unrelated',
          'It must be low in tannin too',
          'It will be soft and early-drinking',
          'It has no skin contact',
        ],
        answer: 0,
        because:
          'Colour and tannin come from different compounds in the skin. Nebbiolo is among the most tannic and longest-lived reds in the world despite being almost translucent.',
      },
      {
        q: 'Why does Bordeaux blend several varieties while Burgundy uses one?',
        options: [
          'Bordeaux law requires blending',
          'Blending is cheaper',
          'Bordeaux’s unreliable Atlantic weather makes varieties that ripen at different times a hedge',
          'Burgundy’s grapes cannot be blended',
        ],
        answer: 2,
        because:
          'In a cold wet year the early-ripening Merlot delivers and the late Cabernet does not. The blend absorbs the variation - insurance written into the vineyard.',
      },
    ],
  },
  {
    slug: 'reading-a-variety',
    n: 5,
    part: 'grapes',
    title: 'Reading a variety you have never met',
    minutes: 2,
    standfirst:
      'There are 10,000 wine grapes. Three things on the label get you most of the way with any of them.',
    body: [
      {
        kind: 'p',
        text: 'The useful skill isn’t memorising varieties. It’s being handed an unfamiliar bottle and working out roughly what is inside from the information on the label. Three pieces of information get you most of the way.',
      },
      { kind: 'h', text: 'One: how warm was it' },
      {
        kind: 'p',
        text: 'Latitude, altitude and distance from a cold ocean tell you the ripeness, and ripeness dictates almost everything else.',
      },
      {
        kind: 'table',
        head: [
          '',
          'Cool climate',
          'Warm climate',
        ],
        rows: [
          ['Acidity', 'High', 'Low'],
          ['Alcohol', 'Lower, 11–13%', 'Higher, 14%+'],
          ['Fruit character', 'Tart, red, citrus, herbal', 'Ripe, black, tropical, jam like'],
          ['Tannin (reds)', 'Firmer, sometimes green', 'Riper, rounder'],
          ['Body', 'Lighter', 'Fuller'],
        ],
      },
      {
        kind: 'p',
        text: 'This one table explains most blind tasting deductions. A red that’s tart, light and herbal came from somewhere cold. A white that’s soft, broad and tropical came from somewhere hot.',
      },
      { kind: 'h', text: 'Two: how thick were the skins' },
      {
        kind: 'p',
        text: 'You can often tell by looking. Deep opaque colour means thick skins, which means substantial tannin and a wine built to age - Cabernet Sauvignon, Petit Verdot, Malbec. Pale colour means thin skins, low tannin and a wine to drink sooner - Pinot Noir, Grenache. Nebbiolo is the exception that proves you should check the other clues too.',
      },
      { kind: 'h', text: 'Three: what did the winemaker add' },
      {
        kind: 'p',
        text: 'Two winemaking choices leave obvious fingerprints. **Oak** contributes vanilla, coconut, clove, toast and smoke - none of which come from grapes. **Malolactic conversion** contributes a buttery, creamy note, particularly obvious in Chardonnay. If you smell either, you’re smelling a decision rather than a place.',
      },
      {
        kind: 'note',
        title: 'The deduction, in order',
        text: 'Colour depth → skin thickness and likely tannin. Acidity → climate. Alcohol, meaning the warming feeling it leaves in your chest → climate again, confirming. Vanilla or butter → winemaking. Only after all four should you start guessing at the variety. Most people do it in exactly the opposite order and get it wrong.',
      },
      { kind: 'tool', tool: 'grapeFilter' },
    ],
    quiz: [
      {
        q: 'A red arrives that is pale, tart, light-bodied and smells of sour cherry and herbs. Where is it most likely from?',
        options: [
          'A hot region',
          'A cool region',
          'A high-yielding warm valley floor',
          'It is impossible to say',
        ],
        answer: 1,
        because:
          'High acid, low alcohol, tart red fruit and light body is the cool-climate signature. Warm regions ripen acid away and build body.',
      },
      {
        q: 'You smell vanilla and coconut in a red. What are you smelling?',
        options: [
          'The grape variety',
          'The soil',
          'Oak - most likely American oak',
          'A fault',
        ],
        answer: 2,
        because:
          'Vanillin and lactones come from the barrel, not the vine. American oak is especially generous with coconut, which is why traditional Rioja smells the way it does.',
      },
      {
        q: 'In what order should you assess an unknown wine?',
        options: [
          'Guess the grape, then check whether the structure fits',
          'Colour, acid, alcohol, winemaking signals - then the grape',
          'Read the label first',
          'Smell for fruit, then name the country',
        ],
        answer: 1,
        because:
          'Structure is reliable and narrows the field; fruit descriptors are subjective and vary between tasters. Deduce the frame first, name the grape last.',
      },
    ],
  },
];
