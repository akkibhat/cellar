import type { AromaFamily } from './types';

/**
 * The six aroma families, each expanded with
 * the specific descriptors that sit under it.
 *
 * Colours are token references rather than literals. The values are
 * derived in globals.css at a single target luminance so the six differ
 * only in hue, and each clears 3:1 against both grounds while still
 * taking a readable label. The set that used to live here as hexes had
 * never been checked against the dark ground and two of the six failed
 * on it.
 */
export const AROMA_FAMILIES: AromaFamily[] = [
  {
    slug: 'fruity',
    name: 'Fruity',
    colour: 'var(--aroma-fruity)',
    meaning:
      'The grape and the climate. Red fruit points to a cooler site, black fruit to a warmer one, and tropical fruit to warmer still.',
    descriptors: [
      'raspberry',
      'red cherry',
      'strawberry',
      'cranberry',
      'blackcurrant',
      'blackberry',
      'plum',
      'blueberry',
      'lemon',
      'lime',
      'grapefruit',
      'green apple',
      'pear',
      'quince',
      'peach',
      'apricot',
      'passionfruit',
      'pineapple',
      'lychee',
      'dried fig',
      'raisin',
      'prune',
    ],
  },
  {
    slug: 'vegetal',
    name: 'Vegetal',
    colour: 'var(--aroma-vegetal)',
    meaning:
      'A cooler climate or an earlier pick. The capsicum note in Sauvignon Blanc and Cabernet Franc is methoxypyrazines, and it burns off in heat.',
    descriptors: [
      'cut grass',
      'green capsicum',
      'tomato leaf',
      'asparagus',
      'blackcurrant leaf',
      'mint',
      'eucalyptus',
      'fennel',
      'green olive',
      'hay',
      'mushroom',
      'forest floor',
      'wet leaves',
    ],
  },
  {
    slug: 'woody',
    name: 'Woody',
    colour: 'var(--aroma-woody)',
    meaning:
      'Oak, almost always. None of these compounds exist in grapes - if you smell them, you are smelling a winemaking decision.',
    descriptors: [
      'vanilla',
      'coconut',
      'clove',
      'cinnamon',
      'nutmeg',
      'toast',
      'cedar',
      'pencil shavings',
      'sandalwood',
      'coffee',
      'dark chocolate',
      'caramel',
    ],
  },
  {
    slug: 'mineral',
    name: 'Mineral',
    colour: 'var(--aroma-mineral)',
    meaning:
      'Contested but real as a sensation. There is no agreed mechanism by which rock in the soil reaches the glass, so treat it as description rather than explanation.',
    descriptors: [
      'wet stone',
      'flint',
      'chalk',
      'graphite',
      'saline',
      'sea spray',
      'oyster shell',
    ],
  },
  {
    slug: 'smoky',
    name: 'Smoky',
    colour: 'var(--aroma-smoky)',
    meaning:
      'Heavy barrel toast, some volcanic sites, or - if it tips toward struck match and rubber - reduction, which usually blows off.',
    descriptors: [
      'woodsmoke',
      'struck match',
      'bacon fat',
      'tar',
      'leather',
      'tobacco',
      'burnt toast',
    ],
  },
  {
    slug: 'balsamic',
    name: 'Balsamic',
    colour: 'var(--aroma-balsamic)',
    meaning:
      'Resinous and aromatic, generally a marker of warmth, age, or southern French and Mediterranean herbs.',
    descriptors: [
      'pine',
      'resin',
      'thyme',
      'rosemary',
      'lavender',
      'liquorice',
      'aniseed',
      'camphor',
      'incense',
    ],
  },
];

/** Look up one family by slug. */
export function findFamily(slug: string): AromaFamily | undefined {
  return AROMA_FAMILIES.find((f) => f.slug === slug);
}
