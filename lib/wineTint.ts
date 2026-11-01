import type { CellarWine } from './content/cellar-snapshot';

/**
 * Which tint a wine takes: the value of its `data-wine` attribute.
 *
 * Reds are garnet, whites straw and rosé blush. Sparkling, dessert and
 * fortified share the pale gold, since the data holds one of each at most
 * and a tint per style would be a palette of single wines.
 */
export type WineTint = 'red' | 'white' | 'rose' | 'gold';

export function tintOf(type: CellarWine['type']): WineTint {
  switch (type) {
    case 'red':
      return 'red';
    case 'white':
      return 'white';
    case 'rosé':
      return 'rose';
    default:
      return 'gold';
  }
}
