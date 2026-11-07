/**
 * The standalone tool pages, in two groups. Shared by the tools row on each
 * tool page and the tools list on the Cellarbook index, so the two can't
 * disagree about what the tools are or what order they come in.
 */
export const TOOL_GROUPS: {
  label: string;
  tools: { href: string; label: string }[];
}[] = [
  {
    /* Things you look something up in. */
    label: 'Reference',
    tools: [
      { href: '/glossary', label: 'Glossary' },
      { href: '/grapes', label: 'Grape explorer' },
      { href: '/aromas', label: 'Aroma wheel' },
      { href: '/temperature', label: 'Serving temperature' },
    ],
  },
  {
    /* Things you use with a glass in front of you. */
    label: 'With a glass',
    tools: [
      { href: '/taste', label: 'Guided tasting' },
      { href: '/journal', label: 'Tasting journal' },
      { href: '/units', label: 'Standard drinks' },
    ],
  },
];

const TOOL_HREFS = new Set(TOOL_GROUPS.flatMap((g) => g.tools.map((t) => t.href)));

/** True for a tool page's route (already trimmed of its trailing slash). */
export function isToolRoute(route: string): boolean {
  return TOOL_HREFS.has(route);
}
