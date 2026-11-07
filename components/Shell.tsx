'use client';

import { usePathname } from 'next/navigation';
import { isToolRoute } from '@/lib/tools';
import CellarNav from './CellarNav';
import ToolsRow from './ToolsRow';

/**
 * Wraps every page in the right navigation for its route: the top bar
 * (CellarNav) everywhere except the landing page, plus the tools row on
 * the tool pages.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  /* The landing page renders bare: its job is to show the two halves, so
     it shouldn't sit inside either one's navigation. */
  if (pathname === '/') return <>{children}</>;

  /* trailingSlash is on, so a route arrives as "/glossary/" and would
     never equal "/glossary". Compare on the trimmed path. */
  const route = pathname.replace(/\/+$/, '') || '/';

  return (
    <>
      <CellarNav />
      {isToolRoute(route) && <ToolsRow route={route} />}
      {/* Keyed on the path so each page replays the page-in fade. */}
      <main key={pathname} className="min-w-0 page-in">
        {children}
      </main>
    </>
  );
}
