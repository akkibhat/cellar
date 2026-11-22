import type { Chapter } from '../../types';

/**
 * Part IV - New Zealand.
 *
 * Given the same weight as France, on the grounds that it is the other
 * region worth knowing in detail rather than surveying - and that its
 * whole history is a compressed, legible version of how a modern wine
 * industry gets built.
 */
export const NEW_ZEALAND: Chapter[] = [
  /* ================================================================== */
  {
    slug: 'how-nz-thinks',
    part: 'new-zealand',
    n: 17,
    title: 'How New Zealand thinks about wine',
    minutes: 5,
    standfirst:
      'Almost nothing in 1970, and a reference point for two grape varieties now.',
    body: [
      {
        kind: 'p',
        text: 'Vines arrived early - Samuel Marsden planted some at Kerikeri in 1819, and James Busby was making wine at Waitangi in the 1830s, which the French explorer Dumont d’Urville tasted and politely approved. Then almost nothing happened for well over a century.',
      },
      { kind: 'h', text: 'Why the false start lasted so long' },
      {
        kind: 'p',
        text: 'Three obstacles, none of them agricultural. A powerful temperance movement - organised campaigning against alcohol altogether - kept licensing hostile for decades. **Six o’clock closing**, in force from 1917 to 1967, produced the "six o’clock swill" - an hour of frantic beer drinking after work - which isn’t a culture in which anyone develops an interest in Chardonnay. And phylloxera, the same root feeding aphid that wrecked Europe, plus a national preference for fortified wine, kept plantings small and quality low.',
      },
      {
        kind: 'p',
        text: 'What kept wine alive through all that was largely one immigrant community. Dalmatians from the Croatian coast arrived from the 1890s to dig kauri gum in Northland, and as the gumfields gave out they moved into growing and making wine, mostly in West Auckland. The founding names are theirs: Josip Babich, selling wine from 1916, then Nobilo, Selak, Delegat, and the Yukich family, whose company became Montana. When the industry finally moved, it was one of those firms that moved first. The turn came in the 1970s. Licensing liberalised, restaurants got wine, and growers started planting classic varieties in places nobody had tried. In **1973 Montana planted Marlborough**, a district then thought too cold and too windy for grapes, on land bought cheaply from sheep farmers. Within 15 years it had redefined a global variety.',
      },
      { kind: 'h', text: 'The shape of the industry now' },
      {
        kind: 'p',
        text: 'New Zealand makes a little over one percent of the world’s wine and is consistently among the highest earning per litre. That’s the whole strategy, stated plainly: it can’t compete on volume, so it doesn’t try.',
      },
      {
        kind: 'table',
        head: ['', 'Figure'],
        rows: [
          ['Area planted', '43,299 ha in 2026, up 1.8% on the year before'],
          ['Produced', 'About 317 million litres from the 2026 harvest'],
          ['Marlborough’s share of it', '32,191 ha, or 74% of everything planted'],
          ['Share of world production', 'Roughly 1%'],
        ],
      },
      {
        kind: 'p',
        text: 'Broken down by variety, the shape of it is the whole industry in a few rows.',
      },
      {
        kind: 'table',
        head: ['Variety', 'Hectares', 'Share of everything planted'],
        rows: [
          ['Sauvignon Blanc', 'Over 25,000', 'About 58%'],
          ['Pinot Noir', 'About 5,000', 'About 12%'],
          ['Chardonnay', 'About 3,000', 'About 7%'],
          ['Pinot Gris', 'About 2,500', 'About 6%'],
          ['Merlot', 'About 1,200', 'About 3%'],
          ['Riesling', 'Under 1,000', 'About 2%'],
          ['Syrah', 'Under 500', 'About 1%'],
          ['Gewürztraminer', 'A few hundred', 'Under 1%'],
        ],
      },
      {
        kind: 'p',
        text: 'Put another way: 82% of every white vine in the country is Sauvignon Blanc, and 75% of every red vine is Pinot Noir. Three quarters of the Sauvignon Blanc is in Marlborough alone. Syrah - the variety I would argue is New Zealand’s most underrated red - sits near the bottom on under 500 hectares. Only the first row is a figure the Register states directly; the rest are rounded, and the percentages are mine.',
      },
      {
        kind: 'table',
        head: ['', 'New Zealand', 'France'],
        rows: [
          ['Share of world production', '1.26%', 'Around 17%'],
          ['Labelling', 'By grape variety', 'By place'],
          ['Closure', 'Screwcap, over 90%', 'Cork, predominantly'],
          ['Oldest vines', 'Decades', 'Centuries'],
          ['Regulation', 'Light - geographical indications only', 'Heavy - AOC dictates variety, yield, method'],
        ],
      },
      { kind: 'h', text: 'Two decisions that defined the country' },
      {
        kind: 'p',
        text: 'The first was **screwcaps**. Frustrated by cork taint - the musty, wet cardboard smell a contaminated cork leaves in the wine - ruining wines built on clean aromatics, New Zealand producers formed the Screwcap Initiative in 2001 and moved almost the entire industry across within a few years. It was commercially risky - screwcaps signalled cheap wine at the time - and it turned out to be simply correct. Australia followed; much of the world eventually did. The evidence arrived afterwards and settled it. The Australian Wine Research Institute put thousands of bottles of a single 1999 Semillon under 14 different closures and tasted them for a decade. At 10 years the screwcapped wine was still fresh and drinking well; most of the bottles under cork had oxidised, several of them past drinking. The more useful finding wasn’t taint but variation: corks differ from each other in how much air they let through, so a case sealed with cork ages at a dozen different rates, and a case under screwcap ages at one. That’s the real argument. A screwcap doesn’t just avoid a fault - it makes the bottle in your rack behave like the bottle you tasted.',
      },
      {
        kind: 'p',
        text: 'The second was **sustainability certification**. Sustainable Winegrowing New Zealand covers almost every producing hectare in the country, and a grower outside it will struggle to export at all. People argue about whether the standard is strict enough. Nobody argues about how many growers are in it.',
      },
      { kind: 'h', text: 'The geography, in one idea' },
      {
        kind: 'p',
        text: 'A long thin country stretching roughly from 36°S to 45°S, never more than about 130 km from the sea, with a mountain range down the middle. That means maritime, cool and windy nearly everywhere, with long slow ripening seasons and enormous day to night temperature swings.',
      },
      {
        kind: 'p',
        text: 'Slow ripening builds aroma while holding acid, which is exactly the condition aromatic white varieties and Pinot Noir want. It’s the single fact that explains why New Zealand is good at what it’s good at, and why it has never made a convincing Grenache.',
      },
      {
        kind: 'note',
        title: 'The concentration risk',
        text: 'Marlborough accounts for roughly two thirds of national production, and Sauvignon Blanc for the large majority of exports by volume. One region, one grape. It has made the country rich and it’s the industry’s most discussed structural vulnerability - a run of bad Marlborough vintages would be a national economic event.',
      },
    ],
    quiz: [
      {
        q: 'Why did New Zealand adopt screwcaps so early and so completely?',
        options: [
          'They were cheaper than cork',
          'Cork taint was ruining wines whose entire appeal rested on aromatic purity',
          'Cork was unavailable in the Southern Hemisphere',
          'Export regulations required it',
        ],
        answer: 1,
        because:
          'A corked Marlborough Sauvignon Blanc loses precisely the thing it was bought for. The 2001 Screwcap Initiative traded a perception risk for a real quality gain.',
      },
      {
        q: 'What did Montana do in 1973 that changed the country’s wine industry?',
        options: [
          'Introduced screwcaps',
          'Planted Marlborough, a district previously thought too cold and windy for grapes',
          'Founded the sustainability scheme',
          'Exported the first New Zealand wine to Britain',
        ],
        answer: 1,
        because:
          'Marlborough went from sheep country to two-thirds of national production within a generation.',
      },
      {
        q: 'Why does New Zealand’s climate suit aromatic whites and Pinot Noir?',
        options: [
          'Consistent high heat ripens them fully',
          'Maritime cool and large day–night swings give slow ripening, building aroma while retaining acid',
          'The soils are unusually fertile',
          'Low rainfall concentrates the fruit',
        ],
        answer: 1,
        because:
          'Slow ripening is the mechanism. It develops aromatic compounds without burning off the acidity that keeps the wine fresh.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'marlborough',
    part: 'new-zealand',
    n: 18,
    title: 'Marlborough and the South Island whites',
    minutes: 3,
    standfirst:
      'Sauvignon Blanc that tastes nothing like the French original, and the valleys that make it.',
    body: [
      {
        kind: 'p',
        text: 'When Marlborough Sauvignon Blanc first reached British tastings in the mid-1980s, the reaction wasn’t universally admiring. It was too loud, too tropical, too obviously *something*. **Cloudy Bay**, founded in 1985, converted that shock into a cult, and within a decade the style had its own name and its own imitators in Chile, South Africa and the south of France.',
      },
      { kind: 'h', text: 'Why it tastes like that' },
      {
        kind: 'p',
        text: 'Two families of compounds, both amplified by the same conditions.',
      },
      {
        kind: 'list',
        items: [
          '**Methoxypyrazines** - the green side: capsicum, cut grass, tomato leaf. They come from the grape and degrade in sunlight and heat, so cool climates keep more of them.',
          '**Thiols** - the tropical side: passionfruit, grapefruit, and a green, sappy note usually described politely as "boxwood". These are almost odourless in the grape and released by yeast during fermentation.',
        ],
      },
      {
        kind: 'p',
        text: 'Marlborough gets an unusual combination: intense sunlight, cold nights, a long dry autumn and free draining stony soil. That preserves the green compounds while pushing thiol precursors unusually high. The result is a wine that’s simultaneously herbaceous and tropical, which almost nowhere else pulls off.',
      },
      { kind: 'h', text: 'The two valleys' },
      {
        kind: 'p',
        text: 'Marlborough isn’t one place, and the distinction is the first thing to learn if you drink it regularly.',
      },
      {
        kind: 'table',
        head: ['', 'Wairau Valley', 'Awatere Valley'],
        rows: [
          ['Position', 'The original, inland and warmer', 'South, higher, closer to the coast'],
          ['Character', 'Riper, tropical, passionfruit', 'Cooler, saline, herbaceous, more acid'],
          ['Soils', 'Deep gravels and silt', 'Stonier, drier, windier'],
          ['Ripens', 'Earlier', 'Up to two weeks later'],
        ],
      },
      {
        kind: 'p',
        text: 'Most commercial Marlborough is blended across both, which is deliberate: the Wairau supplies fruit weight and the Awatere supplies acid and cut. Single-valley bottlings are where you taste the difference clearly.',
      },
      { kind: 'h', text: 'What else Marlborough does' },
      {
        kind: 'p',
        text: 'Sauvignon Blanc dominates so completely that the rest is easy to miss. **Chardonnay** is increasingly good and increasingly restrained. **Pinot Gris** and **Riesling** both work well in the cool sites. **Pinot Noir** grown here is lighter and more red fruited than Central Otago’s, and a significant amount of it goes into méthode traditionnelle sparkling wine, which is one of New Zealand’s genuine bargains.',
      },
      { kind: 'h', text: 'The rest of the South Island' },
      {
        kind: 'list',
        items: [
          '**Nelson** - just over the hills from Marlborough, wetter and hillier. Excellent Chardonnay, Pinot Noir and aromatics from a small number of quality focused producers.',
          '**North Canterbury / Waipara** - limestone soils, a warm dry northwesterly wind, and the country’s most interesting Riesling and Pinot Noir. Small, and increasingly the region critics get excited about.',
          '**Waitaki Valley** - tiny, right on the edge of ripening, limestone. Difficult in most years and remarkable in the good ones.',
        ],
      },
      {
        kind: 'note',
        title: 'A tasting worth doing',
        text: 'Buy a Sancerre, a Wairau Sauvignon Blanc and an Awatere Sauvignon Blanc. One grape, three expressions. It’s the clearest demonstration available of what climate and site do to a variety, and it costs less than a single decent bottle of Burgundy.',
      },
      {
        kind: 'note',
        title: 'Producers worth knowing',
        text: 'The three names most often cited are one lineage. **Cloudy Bay** made the style famous; **Greywacke** is Kevin Judd, its founding winemaker; and **Dog Point** was started by two more of its alumni. For the more worked, textural end of Sauvignon Blanc, **Astrolabe** and **Mahi**; for Riesling, **Framingham**. Further south, **Neudorf** in Nelson is the Chardonnay, and in North Canterbury **Pyramid Valley**, **Bell Hill** and **Greystone** are the ones critics keep returning to.',
      },
    ],
    quiz: [
      {
        q: 'What gives Marlborough Sauvignon Blanc its passionfruit character?',
        options: [
          'Methoxypyrazines',
          'Thiols, released by yeast during fermentation',
          'Oak ageing',
          'Residual sugar',
        ],
        answer: 1,
        because:
          'Methoxypyrazines give the green, grassy side. Thiols - nearly odourless in the grape - are freed during fermentation and give the tropical side.',
      },
      {
        q: 'How does Awatere Valley fruit differ from Wairau?',
        options: [
          'Riper and more tropical',
          'Cooler, more saline and herbaceous, with higher acid and later ripening',
          'It is planted to different varieties entirely',
          'There is no meaningful difference',
        ],
        answer: 1,
        because:
          'The Awatere is higher, windier and closer to the coast. Blending the two is standard practice: Wairau for weight, Awatere for cut.',
      },
      {
        q: 'Why do methoxypyrazine levels stay high in Marlborough?',
        options: [
          'They are added during winemaking',
          'They degrade in heat and sunlight on the fruit, and Marlborough’s cool climate preserves them',
          'The soil is unusually rich in nitrogen',
          'Screwcaps prevent their loss',
        ],
        answer: 1,
        because:
          'Warm regions burn them off, which is why warm-climate Sauvignon Blanc loses the grassy note and tastes broader and softer.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'central-otago',
    part: 'new-zealand',
    n: 19,
    title: 'Central Otago and New Zealand Pinot Noir',
    minutes: 3,
    standfirst:
      'New Zealand’s only continental climate, and its best case for Pinot Noir.',
    body: [
      {
        kind: 'p',
        text: 'Everything about Central Otago is an exception to New Zealand. It sits inland behind the Southern Alps, so it’s dry rather than maritime. It has hot days and genuinely cold nights, a swing of 20 degrees or more. It’s at roughly 45°S, among the southernmost commercial vineyards in the world. And it grows almost exclusively **Pinot Noir**.',
      },
      { kind: 'h', text: 'Why Pinot Noir, and why here' },
      {
        kind: 'p',
        text: 'Pinot Noir is thin skinned, disease prone and desperately sensitive to where it’s planted: two neighbouring vineyards will give noticeably different wine. It needs a long cool ripening season without the damp that would rot it. Central Otago’s dry continental air supplies exactly that, and the big swing between day and night temperatures means the fruit accumulates sugar and aroma in the day and locks in acid overnight.',
      },
      {
        kind: 'p',
        text: 'The resulting style is distinct from Burgundy rather than derivative of it: darker fruited, more overtly ripe, higher in alcohol, and with a thyme and wild herb note locals call the "Central" character. Where good Burgundy is often about restraint and savour, good Central Otago is about intensity and clarity.',
      },
      { kind: 'h', text: 'The subregions' },
      {
        kind: 'list',
        items: [
          '**Bannockburn** - the warmest and most concentrated. Dense, structured, dark fruited Pinot. Felton Road is here.',
          '**Gibbston** - the coolest and highest, near Queenstown. Lighter, more floral, higher acid, and the last to ripen.',
          '**Bendigo** - north facing schist slopes, very warm by local standards. Powerful and ripe.',
          '**Wanaka and Alexandra** - the outer edges. Alexandra is the driest, with the widest swings, giving tight, high acid, red fruited wines.',
        ],
      },
      {
        kind: 'p',
        text: 'The unifying soil is **schist**, a hard glittering metamorphic rock, often with wind blown loess - a fine pale silt - over it. Water runs straight through it, which is part of why grapes here need irrigation in a way they don’t anywhere else in New Zealand.',
      },
      { kind: 'h', text: 'The other Pinot regions' },
      {
        kind: 'p',
        text: '**Martinborough**, at the southern tip of the North Island, was making serious Pinot Noir before Central Otago existed as a wine region. It’s small, gravelly, and its wines are more savoury and structured - closer to Burgundy in temperament than Central’s are. Ata Rangi and Dry River established the reputation in the 1980s.',
      },
      {
        kind: 'p',
        text: '**North Canterbury** brings limestone into the picture, which nowhere else in New Zealand Pinot country really has, and produces wines with a distinctly mineral, savoury edge. **Marlborough** makes the lightest and most red fruited, much of it excellent value.',
      },
      {
        kind: 'note',
        title: 'How to tell them apart',
        text: 'Pour four New Zealand Pinots blind and the reliable cues are: Central Otago is the darkest and ripest with wild herb; Martinborough is the most structured and savoury; North Canterbury has the mineral, almost salty edge; Marlborough is the lightest and most obviously cherry fruited. It’s one of the more satisfying blind exercises available domestically.',
      },
      {
        kind: 'note',
        title: 'The bottle to buy first',
        text: 'A **Valli** single sub-region Pinot Noir, or a **Felton Road** Bannockburn. Valli bottles Gibbston, Bannockburn and Waitaki separately from the same hand, so two bottles side by side show you the sub-region and nothing else - which is the argument this whole chapter is making, in a form you can drink.',
      },
      {
        kind: 'note',
        title: 'Producers worth knowing',
        text: '**Felton Road** at Bannockburn is the benchmark, and the wine usually produced when somebody argues Central Otago belongs in the same conversation as Burgundy. **Rippon**, on its slope above Lake Wanaka, planted early and makes the most singular wine in the region. **Burn Cottage**, **Quartz Reef**, **Prophet’s Rock**, **Two Paddocks** and **Mt Difficulty** are the others worth seeking out. Four of them - Felton Road, Rippon, Quartz Reef and Burn Cottage - are certified biodynamic, which is a striking concentration for a region this small.',
      },
    ],
    quiz: [
      {
        q: 'What makes Central Otago’s climate unusual for New Zealand?',
        options: [
          'It is maritime and mild',
          'It is continental - dry, with hot days and cold nights - because it sits inland behind the Alps',
          'It is subtropical',
          'It has the highest rainfall in the country',
        ],
        answer: 1,
        because:
          'Every other New Zealand wine region is maritime. The Southern Alps cut Central Otago off from the sea, giving it a genuinely continental climate.',
      },
      {
        q: 'What is the dominant soil of Central Otago?',
        options: ['Limestone', 'Volcanic ash', 'Schist, often under wind-blown loess', 'River gravel'],
        answer: 2,
        because:
          'Hard glittering schist, draining so freely that irrigation is effectively compulsory - unusual in New Zealand.',
      },
      {
        q: 'How does Martinborough Pinot Noir typically differ from Central Otago?',
        options: [
          'Riper and darker',
          'More savoury and structured, closer to Burgundy in temperament',
          'Sweeter',
          'Made from a different clone entirely',
        ],
        answer: 1,
        because:
          'Central Otago is the ripe, intense, dark-fruited end; Martinborough is the savoury, structured end. Both are excellent and neither is the other.',
      },
    ],
  },

  /* ================================================================== */
  {
    slug: 'hawkes-bay',
    part: 'new-zealand',
    n: 20,
    title: 'Hawke’s Bay and the North Island reds',
    minutes: 3,
    standfirst:
      'New Zealand’s oldest continuously producing wine region, and warm enough for Bordeaux blends and Syrah.',
    body: [
      {
        kind: 'p',
        text: 'Hawke’s Bay has been growing grapes since Marist missionaries planted at Mission Estate in the 1850s, making it the country’s oldest continuously producing region. It’s also the warmest region that matters, which means it can do the thing the rest of New Zealand can’t: ripen Cabernet Sauvignon.',
      },
      { kind: 'h', text: 'The Gimblett Gravels' },
      {
        kind: 'p',
        text: 'In 1867 a flood shifted the course of the Ngaruroro river, exposing a bed of deep greywacke gravel. For a century it was considered worthless land - too stony to farm, quarried for road metal. In the 1980s growers realised that stony, heat retaining, free draining ground is exactly what late ripening red varieties want.',
      },
      {
        kind: 'p',
        text: 'The **Gimblett Gravels** appellation, roughly 800 hectares, is defined by the soil map rather than by property lines or a political boundary - the edge of the appellation is the edge of the gravel. That’s unusual anywhere in the world, and closer to how Bordeaux actually behaves than how it’s legally written.',
      },
      {
        kind: 'p',
        text: 'The stones absorb heat during the day and release it overnight, adding the extra accumulated warmth that gets Cabernet Sauvignon and Merlot ripe in a climate that would otherwise leave them green. Neighbouring **Bridge Pa Triangle** does much the same thing over red volcanic gravel.',
      },
      { kind: 'h', text: 'What it makes' },
      {
        kind: 'list',
        items: [
          '**Bordeaux blends** - Merlot-led more often than Cabernet-led, reflecting the cooler seasons. Structured, cedary, and increasingly age worthy.',
          '**Syrah** - the region’s strongest claim. Peppery, floral, medium bodied and much closer to Northern Rhône Syrah than to Australian Shiraz. Arguably New Zealand’s most underrated wine.',
          '**Chardonnay** - rich, textured, barrel fermented. Hawke’s Bay Chardonnay is world class and consistently undersold.',
        ],
      },
      {
        kind: 'p',
        text: 'The Syrah deserves emphasis. Cool climate Syrah retains rotundone, the peppery compound, which warm regions burn off. Hawke’s Bay makes it at a fraction of Côte-Rôtie prices, and it holds up to the comparison.',
      },
      { kind: 'h', text: 'The rest of the North Island' },
      {
        kind: 'list',
        items: [
          '**Waiheke Island** - a warm maritime microclimate in the Hauraki Gulf, making dense, expensive, genuinely good Bordeaux blends and Syrah. Small production, high prices, heavy tourism.',
          '**Gisborne** - the country’s Chardonnay heartland by volume, warm and fertile, historically a bulk region now with a serious quality tier. Also good Gewürztraminer.',
          '**Auckland / Kumeu** - small and damp, but Kumeu River makes Chardonnay that has repeatedly beaten white Burgundy in blind tastings.',
          '**Wairarapa** - covered in the previous chapter; Martinborough is its core.',
          '**Northland** - the warmest and wettest, tiny, experimenting with varieties nowhere else in the country can ripen.',
        ],
      },
      {
        kind: 'note',
        title: 'The bottle to buy first',
        text: 'A Gimblett Gravels Syrah from a warm vintage. It’s the clearest single demonstration that New Zealand red wine isn’t only Pinot Noir, and the price gap against its Northern Rhône equivalent is the largest bargain in the country.',
      },
      {
        kind: 'note',
        title: 'Producers worth knowing',
        text: '**Te Mata** for the Bordeaux blend: Coleraine is the only New Zealand wine ever named a Decanter Wine Legend, and its Bullnose Syrah comes off the Bridge Pa Triangle. **Craggy Range** for single vineyard Gimblett Gravels - Le Sol for Syrah, Sophia for the Merlot blend, Les Beaux Cailloux for Chardonnay. **Trinity Hill**’s Homage is the other Syrah usually named as the region’s best, and **Sacred Hill**’s Riflemans is the Chardonnay.',
      },
    ],
    quiz: [
      {
        q: 'What defines the boundary of the Gimblett Gravels appellation?',
        options: [
          'Property lines agreed by growers',
          'A local council boundary',
          'The extent of the greywacke gravel soil itself, mapped from an 1867 river course change',
          'Elevation above sea level',
        ],
        answer: 2,
        because:
          'The appellation edge is the soil edge - unusually literal, and closer to the real logic of terroir than most legal appellations manage.',
      },
      {
        q: 'Why can Hawke’s Bay ripen Cabernet Sauvignon when most of New Zealand cannot?',
        options: [
          'It uses earlier-ripening clones',
          'It is the warmest significant region, and its stony soils store and radiate heat overnight',
          'It irrigates with warm water',
          'It harvests much later than other regions',
        ],
        answer: 1,
        because:
          'Cabernet Sauvignon is late-ripening and needs heat. The gravels add the degree-days that would otherwise be missing.',
      },
      {
        q: 'Hawke’s Bay Syrah resembles which style?',
        options: [
          'Barossa Shiraz - ripe and opulent',
          'Northern Rhône Syrah - peppery, floral, medium-bodied',
          'Bordeaux blends',
          'Central Otago Pinot Noir',
        ],
        answer: 1,
        because:
          'Cool-climate ripening retains rotundone, the peppery compound that warm regions lose. It sits firmly in the Rhône idiom.',
      },
    ],
  },
];
