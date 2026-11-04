import type { CellarWine } from './cellar';

/** What the bottle silhouette is filled with when there is no photograph: the colour of what was in it. */
export const SILHOUETTE_FILL: Record<CellarWine['type'], string> = {
  red: '#6d1f2b',
  white: '#c8a33f',
  'rosé': '#d98a86',
  sparkling: '#d9c168',
  dessert: '#b3762a',
  fortified: '#5a2a20',
};

/** A Bordeaux silhouette in a 24x72 box: straight sides, sharp shoulder. */
export const SILHOUETTE_PATH = 'M4,70 V30 C4,26 8,24 8,20 V6 h8 V20 C16,24 20,26 20,30 V70 Z';
