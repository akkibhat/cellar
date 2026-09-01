

import type { Chapter } from '@/lib/types';

export const WORLD: Chapter[] = [
  {
    slug: 'rest-of-the-world',
    n: 21,
    part: 'world',
    title: 'Everywhere else',
    minutes: 4,
    standfirst:
      'Nine countries at the length I can honestly write about them. Short, because I am still working through it.',
    body: [
      {
        kind: 'note',
        title: 'How much of this part is first hand',
        text: 'Not much. Some Italian and Spanish wine, a bit of Australian, and very little of anything else below. What follows is the shape of each country rather than a report on it, and I will fill it in as I go rather than pretend to have got there already.',
      },
      { kind: 'h', text: 'Italy' },
      {
        kind: 'p',
        text: 'Wine is made in all 20 Italian regions from something like 400 commercially grown varieties, so any summary is a distortion. The generalisation that holds is that Italian wine is built for the table: high acidity and firm tannin make many Italian reds awkward on their own and very good with food. On the label, **DOCG** outranks **DOC** outranks **IGT**.',
      },
      { kind: 'h', text: 'Spain' },
      {
        kind: 'p',
        text: 'Spain has more land under vine than any other country and makes less wine than France or Italy, because much of it is old, dry farmed, low yielding bush vine - which is also why Spanish old vine reds are good value. The organising idea is **time in barrel**, stated on the label, which tells you more about the style than the region does.',
      },
      {
        kind: 'table',
        head: [
          'Tier',
          'Minimum ageing',
          'Character',
        ],
        rows: [
          ['Joven', 'None', 'Fresh, fruity, drink now'],
          ['Crianza', '2 years, 1 in oak', 'Light oak influence'],
          ['Reserva', '3 years, 1 in oak', 'Savoury, developing'],
          ['Gran Reserva', '5 years, 2 in oak', 'Tertiary - leather, dried fruit, dill'],
        ],
      },
      {
        kind: 'p',
        text: '**Rioja** is the classic, traditionally aged in American oak, which is where its coconut and dill signature comes from. Not explored yet.',
      },
      { kind: 'h', text: 'Portugal' },
      {
        kind: 'p',
        text: 'Portugal kept hundreds of indigenous varieties that never travelled, so its wines taste like nowhere else - **Vinho Verde**, the **Douro** for Port and increasingly for dry reds, and **Madeira**, deliberately heated and oxidised and effectively indestructible. Not explored yet.',
      },
      { kind: 'h', text: 'Germany' },
      {
        kind: 'p',
        text: 'German vineyards sit at the northern limit of viticulture, which is why the best of them are on steep south facing slopes above rivers - the water reflects light back onto the vines and moderates the temperature. **Riesling** is the point. Grown here it makes wine of unusual aromatic precision and acidity, at alcohol levels as low as 7-8%, that ages for decades.',
      },
      {
        kind: 'p',
        text: 'The labels are the barrier. The **Prädikat** system ranks by sugar in the grapes at harvest rather than sweetness in the bottle, so a Kabinett can be dry or off-dry depending on what the winemaker did next. It runs Kabinett, Spätlese, Auslese, and then the rare dessert levels - Beerenauslese, Eiswein, Trockenbeerenauslese - in ascending order of how ripe the fruit was when picked.',
      },
      {
        kind: 'p',
        text: 'The word that settles it is **trocken**, meaning dry: if it is on the label the wine is dry whatever the Prädikat says. Germany also makes a lot of Pinot Noir, as **Spätburgunder**, which almost nobody outside Germany expects.',
      },
      { kind: 'h', text: 'Austria' },
      {
        kind: 'p',
        text: 'Drier and warmer than Germany, and organised around **Grüner Veltliner**, a white with a savoury, white peppery character that has no real equivalent elsewhere. Not explored yet.',
      },
      { kind: 'h', text: 'Further east' },
      {
        kind: 'p',
        text: 'Hungary has Tokaji, Greece has Assyrtiko from the volcanic ash of Santorini, and Georgia is arguably where wine began - still fermenting in buried clay qvevri, which is where orange wine comes from. Not explored yet.',
      },
      { kind: 'h', text: 'Australia' },
      {
        kind: 'p',
        text: 'Home to some of the oldest producing vines anywhere. Because phylloxera never reached South Australia, Barossa vineyards planted in the 1840s are still cropping on their original roots, which barely exists in Europe.',
      },
      {
        kind: 'list',
        items: [
          '**Barossa Valley** - warm, powerful Shiraz, and the wine that shaped the world’s image of Australia.',
          '**Clare and Eden Valleys** - dry Riesling with lime, chalk and bracing acid, ageing for decades.',
          '**Margaret River and the Yarra** - maritime and cool climate respectively, making Bordeaux blends, Chardonnay and Pinot Noir.',
        ],
      },
      { kind: 'h', text: 'The United States' },
      {
        kind: 'p',
        text: 'California makes the overwhelming majority, **Napa** for Cabernet Sauvignon and **Sonoma**, cooler, for Pinot Noir and Chardonnay. The 1976 **Judgement of Paris**, where Californian wines beat French ones in a blind tasting judged by French experts, is the event most often credited with legitimising New World wine. Not explored yet.',
      },
      { kind: 'h', text: 'South America' },
      {
        kind: 'p',
        text: '**Argentina** is altitude: Mendoza sits between 900 and 1,500 metres, where strong sun ripens the fruit and cold nights keep the acid, and **Malbec** became the national wine. **Chile** is isolation, which has kept phylloxera out entirely, and is the home of **Carménère**, which it grew for a century believing it was Merlot. Not explored yet.',
      },
      { kind: 'h', text: 'South Africa' },
      {
        kind: 'p',
        text: '**Chenin Blanc**, of which South Africa has more than the Loire, much on old bush vines, and **Pinotage**, a 1925 crossing of Pinot Noir and Cinsaut that is genuinely divisive. Not explored yet.',
      },
      {
        kind: 'note',
        title: 'The New World’s real innovation',
        text: 'Not a technique - it was labelling by grape variety. It made wine legible to people who had not memorised European geography, and it’s the single largest reason wine consumption spread beyond countries that grow it. France now labels for export the same way, quietly, on the back.',
      },
    ],
    quiz: [
      {
        q: 'What does "Gran Reserva" on a Rioja label tell you?',
        options: [
          'It came from a single vineyard',
          'It was aged at least five years, two of them in oak',
          'It is the producer’s best parcel',
          'It is sweet',
        ],
        answer: 1,
        because:
          'Spain’s tiers are defined by ageing time, not by site. It tells you the style you will get, not where the grapes grew.',
      },
      {
        q: 'Why were the original Super Tuscans classified as basic table wine?',
        options: [
          'They were considered poor quality',
          'They used Bordeaux varieties not permitted under the local rules',
          'They were unaged',
          'They were made outside Italy',
        ],
        answer: 1,
        because:
          'The classification could only measure rule compliance, not quality, and these wines then sold for more than the DOCGs above them.',
      },
      {
        q: 'What does the German Prädikat system actually measure?',
        options: [
          'Sweetness in the finished wine',
          'Sugar levels in the grapes at harvest',
          'Time spent in barrel',
          'Vineyard classification',
        ],
        answer: 1,
        because:
          'It measures ripeness at picking, not sweetness in the bottle. A Kabinett may be fermented dry, which is why "trocken" on the label is the word that matters.',
      },
      {
        q: 'Why do pre-phylloxera vines survive in South Australia?',
        options: [
          'They were replanted from cuttings',
          'Phylloxera never reached the region',
          'They are grafted onto resistant rootstock',
          'They were treated chemically',
        ],
        answer: 1,
        because:
          'Strict quarantine kept the louse out. Barossa vines planted in the 1840s still crop on their own roots - nearly impossible in Europe.',
      },
    ],
  },
];
