'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TOOL_GROUPS } from '@/lib/tools';

/**
 * The row of tools under the top bar on every tool page, so you can hop
 * from one tool to the next without going back to the index. It starts
 * with a link back to the chapters. The page you're on is marked, and
 * announced as the current page.
 */
export default function ToolsRow({ route }: { route: string }) {
  const rowRef = useRef<HTMLDivElement>(null);

  /* On a phone the row scrolls sideways, so the current tool can start
     off-screen. Bring it into view by moving the row itself; scrollIntoView
     would also nudge the page. */
  useEffect(() => {
    const row = rowRef.current;
    const current = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!row || !current || row.scrollWidth <= row.clientWidth) return;
    row.scrollLeft = current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2;
  }, [route]);

  return (
    <nav aria-label="Tools" className="tools-row border-b" style={{ borderColor: 'var(--rule)' }}>
      <div ref={rowRef} className="nav-frame tools-row__inner">
        <Link href="/course" className="tools-row__link tools-row__back">
          &larr; All chapters
        </Link>
        {TOOL_GROUPS.map((group) => (
          <div key={group.label} className="tools-row__group">
            <span className="label-ui">{group.label}</span>
            {group.tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="tools-row__link"
                aria-current={route === t.href ? 'page' : undefined}
              >
                {t.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
