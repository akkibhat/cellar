'use client';

import Link from 'next/link';
import TastingTool from './TastingTool';
import AromaWheel from './AromaWheel';
import UnitsCalculator from './UnitsCalculator';
import TemperatureGuide from './TemperatureGuide';
import GrapeExplorer from './GrapeExplorer';
import Fermentation from './Fermentation';
import Dosage from './Dosage';
import Fortification from './Fortification';
import Ripeness from './Ripeness';
import SkinContact from './SkinContact';
import TwoBanks from './TwoBanks';

/**
 * Dispatches a `tool` block in chapter content to the matching component.
 *
 * Keeping the mapping here means chapter content only ever names a tool as
 * a string, and the content files stay free of imports and JSX.
 *
 * WHY THE FOOTER LINK
 *
 * Five of these are pages in their own right, and a reader who meets one
 * inside a chapter had no way of knowing that. The embedded copy is where
 * somebody is actually using the thing, which makes it the one place worth
 * telling them it has a permanent home - so each of those five carries a
 * line back to its own page.
 *
 * The diagrams do not, because they have nowhere to go. They illustrate the
 * paragraph above them and only make sense there.
 */

type Tool =
  | 'tasting'
  | 'aromaWheel'
  | 'units'
  | 'temperature'
  | 'grapeFilter'
  | 'fermentation'
  | 'dosage'
  | 'fortification'
  | 'ripeness'
  | 'skinContact'
  | 'twoBanks';

/** The tools that are also pages, and what to call the way back. */
const HOME: Partial<Record<Tool, { href: string; label: string }>> = {
  tasting: { href: '/taste', label: 'Open the full tasting sheet' },
  aromaWheel: { href: '/aromas', label: 'Open the aroma wheel on its own page' },
  units: { href: '/units', label: 'Open the standard drinks calculator' },
  temperature: { href: '/temperature', label: 'Open the temperature guide' },
  grapeFilter: { href: '/grapes', label: 'Open the full grape explorer' },
};

function render(tool: Tool, only?: 'white' | 'red') {
  switch (tool) {
    case 'tasting':
      return <TastingTool compact />;
    case 'aromaWheel':
      return <AromaWheel />;
    case 'units':
      return <UnitsCalculator />;
    case 'temperature':
      return <TemperatureGuide />;
    case 'grapeFilter':
      return <GrapeExplorer compact only={only} />;
    case 'fermentation':
      return <Fermentation />;
    case 'dosage':
      return <Dosage />;
    case 'fortification':
      return <Fortification />;
    case 'ripeness':
      return <Ripeness />;
    case 'skinContact':
      return <SkinContact />;
    case 'twoBanks':
      return <TwoBanks />;
    default:
      return null;
  }
}

export default function EmbeddedTool({
  tool,
  only,
}: {
  only?: 'white' | 'red';
  tool: Tool;
}) {
  const home = HOME[tool];
  const body = render(tool, only);
  if (!body) return null;

  return (
    <div>
      {body}
      {home && (
        <p className="t-caption mt-2 mb-6">
          <Link
            href={home.href}
            className="tool-home"
            style={{ color: 'var(--ink-faint)' }}
          >
            {home.label}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </p>
      )}
    </div>
  );
}
