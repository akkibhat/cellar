

import type { Chapter } from '@/lib/types';

export const TASTING: Chapter[] = [
  {
    slug: 'how-to-taste',
    n: 6,
    part: 'tasting',
    title: 'How to taste',
    minutes: 5,
    standfirst:
      'Look, smell, taste, in that order every time, so one glass can be compared to the next.',
    body: [
      {
        kind: 'p',
        text: 'A method makes your own impressions consistent. Two glasses assessed the same way can be compared; two glasses assessed however you felt at the time can’t.',
      },
      {
        kind: 'list',
        items: [
          '**Visual** - colour, clarity, shine, intensity, fluidity.',
          '**The nose** - how much it is giving you first, then what. A **closed** wine smells of almost nothing until it has had air; an **open** one gives everything up straight away. Then sort the aromas into families: fruity, vegetal, woody, mineral, smoky, balsamic.',
          '**The palate** - the flavours, the aromas that arrive from the back of the mouth, the balance between them, and the length.',
        ],
      },
      { kind: 'h', text: 'Stage one: visual' },
      {
        kind: 'p',
        text: 'Tilt the glass away from you at about 45 degrees over something white. You’re reading three things.',
      },
      {
        kind: 'list',
        items: [
          '**Depth** - how much light gets through. Deep and opaque suggests thick skins, long maceration, warm climate. Pale suggests the opposite.',
          '**Hue at the rim** - the outer edge where the liquid thins. Reds run purple → ruby → garnet → brick → tawny with age. Whites run pale green → straw → gold → amber.',
          '**Clarity** - bright or hazy. Haze can be a deliberate lack of filtration or a problem, and context tells you which.',
        ],
      },
      {
        kind: 'p',
        text: 'Swirling, at this stage, isn’t for show. It coats the glass and increases the surface area the aroma can evaporate from. It also produces the legs - the streaks that run back down the inside of the glass afterwards - which tell you about alcohol and nothing else.',
      },
      { kind: 'h', text: 'Stage two: the nose' },
      {
        kind: 'p',
        text: 'This is where most of the information is. The tongue detects five things - sweet, sour, salty, bitter, umami. The olfactory system distinguishes thousands. Almost everything you believe you’re tasting in wine, you’re in fact smelling, via the retronasal passage at the back of your throat.',
      },
      {
        kind: 'steps',
        items: [
          'Smell the wine still, before swirling. This gives the most volatile, most delicate aromas, and it is the reading most people skip.',
          'Swirl, then smell again. More has been released. The gap between the two readings is itself information.',
          'Judge how much it is giving you before naming anything - closed at one end, powerful at the other.',
          'Sort into families before reaching for specifics. Deciding "red fruit" is reliable; deciding which kind of cherry mostly isn’t.',
        ],
      },
      { kind: 'h', text: 'Stage three: the palate' },
      {
        kind: 'p',
        text: 'Take a decent mouthful, not a sip, and move it around. Some people draw air across it, which aerosolises the wine and pushes aroma up the retronasal passage. It makes an unattractive noise and it does work.',
      },
      {
        kind: 'p',
        text: 'Assess structure before flavour, because structure is objective and flavour isn’t. Is the acid high or low? Is there tannin, and is it fine or coarse? Is there sweetness? Is the alcohol warm? Only then ask what it tastes of.',
      },
      {
        kind: 'p',
        text: 'Then swallow or spit, and **count**. The number of seconds the flavour survives has a name and a unit, and measuring it is the single fastest way to train your attention.',
      },
      {
        kind: 'note',
        title: 'Caudalie',
        text: 'One caudalie is one second of flavour surviving after you swallow or spit. From the Latin *cauda*, a tail. It needs nothing but a watch and some attention, which makes it the quickest part of tasting to get good at.',
      },
      { kind: 'tool', tool: 'tasting' },
      {
        kind: 'note',
        title: 'On tasting notes that sound absurd',
        text: 'In company you’ll hear things like "it’s got a kick to it" or "you beauty". These aren’t worse than "graphite and cassis". They are doing a different job: one conveys enthusiasm, the other lets two people compare glasses. Both are worth having, and the only problem is reaching for one when you needed the other.',
      },
      { kind: 'h', text: 'Spitting' },
      {
        kind: 'p',
        text: 'If you taste more than three or four wines in a sitting you either spit or you stop being able to taste, and then stop being able to drive. Every professional does it and nobody enjoys learning it. It’s also not a big deal either way: if you’re having a glass with dinner, swallow it.',
      },
      {
        kind: 'steps',
        items: [
          'Dress like you might be photographed - you won’t be, but you commit harder when you aren’t worried about your shirt.',
          'Hold the glass properly, and taste the wine.',
          'Lower your head over the spittoon and let gravity do most of the work.',
          'Suck your cheeks in. Not hard - just enough to aim.',
          'Wipe your mouth.',
          'Don’t be shy about it. Everyone in the room has done it badly.',
        ],
      },
      {
        kind: 'p',
        text: 'Step three is the one that matters. Beginners keep their head up and try to project, which takes force and control they don’t have yet. Put your head over the spittoon and the wine mostly falls on its own. Your cheeks only need to aim it.',
      },
      { kind: 'h', text: 'The spittoon' },
      {
        kind: 'p',
        text: 'Lean over the bowl. Nobody needs to spit at distance. A few things I had to work out for myself: a spittoon with sawdust or a bit of water in the bottom won’t splash back, get close before you commit at a crowded tasting, and if you’re hosting, use something you can’t see through.',
      },
      {
        kind: 'quote',
        text: 'Understandably people are reticent when it comes to the art of spitting, and yet it’s an important professional skill. There’s an almost clean way to do it, with pursed lips, carefully controlling the speed at which you spit to hit the spittoon correctly, and avoiding spillage.',
        cite: 'Émile Peynaud, Le goût du vin',
      },
      { kind: 'h', text: 'Why it doesn’t cost you the tasting' },
      {
        kind: 'p',
        text: 'The obvious worry is that spitting loses you the finish. It doesn’t. Length is counted after the wine leaves your mouth either way, and the aromas behind it come from what is still coating your mouth and throat. The definition of a caudalie says "after swallowing or spitting" for exactly that reason.',
      },
      {
        kind: 'note',
        title: 'How to practise',
        text: 'Water, in the shower, where nothing is at stake and the evidence disappears. Head down, cheeks in, aim short. 10 minutes of that is worth more than any amount of reading.',
      },
    ],
    quiz: [
      {
        q: 'Why smell the wine before swirling as well as after?',
        options: [
          'To check for faults only',
          'The still glass releases the most volatile and delicate aromas, and the difference between the two readings is informative',
          'It is a formality with no practical purpose',
          'To warm the wine',
        ],
        answer: 1,
        because:
          'The lightest compounds come off first. Swirling then releases heavier ones, so two readings give more than one.',
      },
      {
        q: 'Where should you look to judge a red wine’s age?',
        options: [
          'The centre of the glass',
          'The rim, where the liquid thins against the glass',
          'The legs',
          'The colour of the sediment',
        ],
        answer: 1,
        because:
          'The rim is shallowest, so colour change shows there first - purple through ruby, garnet, brick and finally tawny.',
      },
      {
        q: 'What is a caudalie?',
        options: [
          'A measure of tannin',
          'One second of flavour persisting after swallowing or spitting',
          'A French vineyard classification',
          'The technical term for legs',
        ],
        answer: 1,
        because:
          'From Latin cauda, a tail. A simple wine finishes in three or four; a great one can run past fifteen.',
      },
      {
        q: 'What is the most important step in learning to spit wine?',
        options: [
          'Pursing the lips tightly',
          'Lowering your head over the spittoon so gravity does the work',
          'Spitting with force',
          'Taking a smaller mouthful',
        ],
        answer: 1,
        because:
          'Beginners keep their head up and try to project, which needs control they have not developed. Head down, and the wine essentially falls.',
      },
    ],
  },
  {
    slug: 'describing-wine',
    n: 7,
    part: 'tasting',
    title: 'Describing what you taste',
    minutes: 4,
    standfirst:
      'Sort before you name, and use the handful of words that actually mean something.',
    body: [
      {
        kind: 'p',
        text: 'Beginners try to name the fruit immediately, get it wrong, and conclude they have a bad nose. The nose is fine. The problem is that recognising a smell and naming it are different skills: you’ll know a smell the moment somebody tells you what it is, and still not be able to produce the word on your own.',
      },
      {
        kind: 'p',
        text: 'The fix is to narrow by category first. Six families, chosen because they’re broad enough to be reliably distinguishable.',
      },
      { kind: 'tool', tool: 'aromaWheel' },
      { kind: 'h', text: 'What each family tells you' },
      {
        kind: 'table',
        head: ['Family', 'Usually indicates'],
        rows: [
          ['Fruity', 'The grape and the climate. Red fruit means cooler, black fruit means warmer, tropical means warmer still.'],
          ['Vegetal / herbal', 'Cooler climate or earlier picking. Capsicum in Cabernet Franc and Sauvignon Blanc is methoxypyrazines.'],
          ['Woody', 'Oak. Vanilla, coconut, clove, toast, smoke - winemaking, not the vineyard.'],
          ['Mineral', 'A real sensation of wet stone, flint or salt, with no agreed explanation for where it comes from.'],
          ['Smoky', 'Oak toast, or a volcanic site. If it smells of a struck match it is reduction instead, which is a fault - see chapter eight.'],
          ['Balsamic', 'Age and warmth - resin, pine, dried herb, sometimes eucalyptus.'],
        ],
      },
      { kind: 'h', text: 'Primary, secondary, tertiary' },
      {
        kind: 'p',
        text: 'A second sorting axis, and the one that tells you a wine’s age.',
      },
      {
        kind: 'list',
        items: [
          '**Primary** - from the grape. Fruit, flowers, herbs, pepper. Dominates young wine.',
          '**Secondary** - from fermentation and its handling. Yeasty and bready from lees (the spent yeast), buttery from malolactic conversion, vanilla and toast from oak.',
          '**Tertiary** - from ageing. Leather, mushroom, forest floor, dried fig, tobacco, petrol in Riesling.',
        ],
      },
      {
        kind: 'p',
        text: 'A wine dominated by primary aromas is young. A wine where tertiary character has taken over is mature. A wine holding all three at once is usually a very good wine at its peak, and is where the word **bouquet** properly belongs.',
      },
      {
        kind: 'note',
        title: 'Training the vocabulary',
        text: 'Smell things deliberately when you aren’t drinking. Open the spice drawer and smell each jar. Smell wet stone after rain, cut grass, leather, a struck match. The bottleneck is almost never the nose - it’s the absence of a labelled memory to match against.',
      },
      { kind: 'h', text: 'The vocabulary' },
      {
        kind: 'p',
        text: 'Wine vocabulary has a bad reputation and most of it is deserved. But some of the terms are precise and can’t be swapped for ordinary words, because the sensations they describe have no everyday name.',
      },
      {
        kind: 'p',
        text: 'The full glossary is searchable elsewhere on this site. What follows is which terms describe what, and which ones actually earn their place.',
      },
      { kind: 'h', text: 'The four that carry the most weight' },
      {
        kind: 'list',
        items: [
          '**Balance** - whether any single component stands out ahead of the others. The most useful judgement available, and the hardest to fake.',
          '**Length** - how long the flavour lasts after you swallow or spit, counted in seconds. It tracks quality more reliably than anything else you can measure.',
          '**Tannin** - the drying grip, from skins, pips, stems or oak. A texture, not a taste.',
          '**Acidity** - the freshness that makes your mouth water. Predicts both food friendliness and ageing potential.',
        ],
      },
      {
        kind: 'p',
        text: 'You can produce a genuinely informative note using only those four. Everything else is refinement.',
      },
      { kind: 'h', text: 'The structural adjectives' },
      {
        kind: 'table',
        head: [
          'Term',
          'What it describes',
          'Grip',
        ],
        rows: [
          ['Astringent', 'Drying and rough, the inside of your mouth puckering. Often a wine opened too young.', 'Most'],
          ['Structured', 'Powerful, and holding a shape you can feel rather than sitting in a heap.', 'High'],
          ['Rounded', 'Supple and balanced, filling the mouth smoothly with no edges left sticking out.', 'Low'],
          ['Silky', 'Smooth, balanced, and with relatively little tannin.', 'Least'],
        ],
      },
      {
        kind: 'p',
        text: 'Those four sit on a single spectrum, from most grip to least: astringent → structured → rounded → silky. Placing a red wine on that line is a complete and useful description of its tannin, and I found it easier to learn as a set than as four unrelated words.',
      },
      { kind: 'h', text: 'The ones that are mostly decorative' },
      {
        kind: 'p',
        text: 'Some terms survive because they sound good rather than because they discriminate. Two are worth knowing about, for opposite reasons.',
      },
      {
        kind: 'p',
        text: '**Œil de perdrix** - literally "partridge’s eye" - has been used since the Middle Ages for the colour of certain rosés and of the very light reds people drank then. It survives mostly because it sounds good in French. It isn’t purely ornamental, though: in Neuchâtel it is a protected term for Pinot Noir rosé, so there it means something exact.',
      },
      {
        kind: 'p',
        text: '**Minerality** is in the same category and far more widely used. There’s no accepted mechanism by which rock in the soil ends up in your glass, and blind trials have repeatedly failed to show that tasters agree on what the word means. It names a real sensation without explaining it.',
      },
      {
        kind: 'note',
        title: 'The test for a useful word',
        text: 'Would two people tasting the same wine independently reach for it? "High acid" passes. "Structured" passes. "Brooding" and "feminine" don’t, and the second has thankfully been on its way out of professional use for a while.',
      },
    ],
    quiz: [
      {
        q: 'Why sort aromas into families before naming specifics?',
        options: [
          'It is the traditional order',
          'Olfactory memory recognises well but recalls poorly, so narrowing by category is more reliable',
          'Families are more precise than specifics',
          'It saves time',
        ],
        answer: 1,
        because:
          'You can identify a smell instantly when told what it is, and struggle to produce the word cold. Categories bridge that gap.',
      },
      {
        q: 'A wine smells strongly of leather, mushroom and dried fig. What does that tell you?',
        options: [
          'It is young',
          'It is faulty',
          'It is mature - these are tertiary aromas from ageing',
          'It was heavily oaked',
        ],
        answer: 2,
        because:
          'Tertiary character comes from time. Primary fruit fading and tertiary notes arriving is the signature of a mature wine.',
      },
      {
        q: 'Order these from most grip to least: rounded, astringent, silky, structured.',
        options: [
          'Silky → rounded → structured → astringent',
          'Astringent → structured → rounded → silky',
          'Structured → astringent → silky → rounded',
          'Rounded → silky → astringent → structured',
        ],
        answer: 1,
        because:
          'They form a single tannin spectrum. Placing a red on that line describes its tannin completely.',
      },
      {
        q: 'What is the honest status of "minerality"?',
        options: [
          'A proven transfer of minerals from soil to wine',
          'A real sensation with no established mechanism, on which tasters often disagree',
          'A synonym for high acidity',
          'A recognised wine fault',
        ],
        answer: 1,
        because:
          'It describes something people genuinely perceive. It does not explain it, and blind trials show poor agreement on what it means.',
      },
    ],
  },
  {
    slug: 'faults',
    n: 8,
    part: 'tasting',
    title: 'Faults',
    minutes: 3,
    standfirst:
      'How to tell a wine you dislike from a wine that is broken, and what to do about it in a restaurant.',
    body: [
      {
        kind: 'p',
        text: 'The distinction matters because one is a matter of taste and the other is a matter of fact. A wine you find too oaky isn’t faulty. A wine that smells of wet cardboard is, and you’re entitled to another bottle.',
      },
      { kind: 'h', text: 'Cork taint' },
      {
        kind: 'p',
        text: 'The most common fault, caused by **TCA** (2,4,6-trichloroanisole) forming in the cork. It smells of wet cardboard, damp basement or a mouldy dishcloth.',
      },
      {
        kind: 'p',
        text: 'The trap is that TCA doesn’t mainly add a smell - it *suppresses* fruit. Severe cases are obvious. Mild cases just taste muted and disappointing, and are routinely mistaken for a dull wine. Human detection thresholds vary enormously, so one person at a table may find a bottle undrinkable while another notices nothing.',
      },
      {
        kind: 'p',
        text: 'It affects a low single digit percentage of cork sealed bottles, and it’s the main reason New Zealand moved to screwcaps.',
      },
      { kind: 'h', text: 'Oxidation' },
      {
        kind: 'p',
        text: 'Too much air, through a failed seal, poor storage or simply age. Whites go deep gold and taste of bruised apple and nuts; reds go brown and lose their fruit. Leave an open bottle on the bench for three days and you’ll have made a perfect reference sample.',
      },
      {
        kind: 'p',
        text: '**Maderised** is the word for the far end of that: the colour goes brown, the fruit goes, and what is left tastes flat and slightly cooked. It’s named for Madeira, which is deliberately heated and deliberately dark. Anywhere it isn’t intended, it is a fault.',
      },
      { kind: 'h', text: 'The others' },
      {
        kind: 'table',
        head: [
          'Fault',
          'Smells of',
          'Verdict',
        ],
        rows: [
          ['Volatile acidity', 'Vinegar, nail polish remover', 'A trace is normal and makes the wine smell brighter. Past a point it takes over.'],
          ['Brettanomyces', 'Farmyard, bandaid, horse blanket', 'A little is character to some people. A lot is spoilage to everyone.'],
          ['Reduction', 'Struck match, burnt rubber, boiled cabbage', 'Often blows off - swirl hard or decant before rejecting'],
          ['Refermentation', 'Unexpected fizz in a still wine', 'Faulty, unless the wine is meant to be lightly spritzy'],
          ['Heat damage', 'Stewed, flat; often a pushed up cork', 'Ruined in transport or storage; not recoverable'],
        ],
      },
      {
        kind: 'p',
        text: 'Reduction is worth singling out because it’s the one fault that frequently fixes itself. Pour the wine hard into a decanter, wait 10 minutes, and smell again. A surprising number of "faulty" bottles are simply tight.',
      },
      { kind: 'h', text: 'Sending a bottle back' },
      {
        kind: 'p',
        text: 'You can return a faulty bottle. You can’t return a bottle you have decided you don’t like, and staff can tell the difference immediately.',
      },
      {
        kind: 'p',
        text: 'The form of words that works: "I think this might be corked - would you mind checking it?" It isn’t a complaint, it invites a second opinion, and any competent server will smell it and replace it. Restaurants can usually recover the cost from the supplier, so nobody is out of pocket. Say something the moment you suspect it, not after two glasses.',
      },
      {
        kind: 'note',
        title: 'Not faults',
        text: 'Tartrate crystals - the harmless white or red crystals sometimes found on a cork or at the bottom of a bottle - are precipitated tartaric acid, and a sign of minimal filtration rather than a problem. Sediment in an old red is expected. And a wine you simply don’t like isn’t a fault.',
      },
    ],
    quiz: [
      {
        q: 'Why are mild cases of cork taint so often missed?',
        options: [
          'They smell strongly of vinegar',
          'TCA mainly suppresses fruit rather than adding a smell, so the wine just seems dull',
          'They only affect white wine',
          'They disappear after decanting',
        ],
        answer: 1,
        because:
          'A slightly corked wine reads as disappointing rather than wrong, and detection thresholds vary hugely between people.',
      },
      {
        q: 'Which fault frequently resolves itself?',
        options: [
          'Cork taint',
          'Oxidation',
          'Reduction',
          'Heat damage',
        ],
        answer: 2,
        because:
          'Reduction is a sulphur compound build-up from lack of oxygen. Vigorous swirling or decanting often clears it within minutes.',
      },
      {
        q: 'You find white crystals on the cork. What are they?',
        options: [
          'Sugar crystals - a sign of a sweet wine',
          'Tartrate crystals - harmless precipitated tartaric acid',
          'Mould, indicating cork taint',
          'Added sulphites',
        ],
        answer: 1,
        because:
          'Sometimes called wine diamonds. They indicate minimal filtration and are entirely harmless.',
      },
    ],
  },
];
