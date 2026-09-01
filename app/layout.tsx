import type { Metadata } from 'next';
import { OWNER } from '@/lib/config';
import { Archivo, Caveat, Crimson_Pro, Young_Serif } from 'next/font/google';
import Shell from '@/components/Shell';
import './globals.css';

/**
 * The two typefaces. Loaded through next/font so they are self-hosted and
 * do not block rendering on a third-party request.
 *
 * Caveat carries the handwritten headings; Crimson Pro sets the body,
 * because a whole course in handwriting would be unreadable.
 */
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

/**
 * The wordmark face. Heavier and steadier than the handwriting, so the
 * brand holds its own beside a solid mark while the chapter headings stay
 * handwritten - the brand is steady, the content is a notebook.
 */
const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-wordmark',
  display: 'swap',
});

/**
 * The interface face - labels, chips, buttons, figures.
 *
 * Previously unspecified, so it resolved to the system stack and rendered
 * as a different typeface on every platform while the other three were
 * chosen deliberately.
 *
 * Archivo is a grotesque with more character than a neutral UI face - the
 * uppercase is tighter and the letterforms have some grip to them, which
 * suits small-caps labels sitting under handwritten headings. It carries
 * real tabular numerals, which matters here because the content is full
 * of hectares, caudalies and percentages sitting in aligned columns.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

const TITLE = "Akki's Cellar - what I have learned, and what I have tasted";
const DESCRIPTION =
  'What I have worked out about wine, and the bottles it came from. '
  + 'Twenty-five chapters, a guided tasting sheet, a searchable glossary '
  + 'and a grape explorer.';

/**
 * Where the site is served from, for absolute URLs in social cards.
 *
 * Relative paths are fine inside the site and useless to anything that
 * unfurls a link, since that fetches from somewhere else entirely.
 *
 * The real address is the default rather than something that has to be
 * configured, so a plain `next build` produces correct cards. Override
 * with NEXT_PUBLIC_SITE_URL for a preview deploy, where the canonical
 * host would be wrong.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cellar.pi.co.nz';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: '%s - Cellar' },
  description: DESCRIPTION,
  applicationName: 'Cellar',
  authors: [{ name: OWNER }],
  keywords: ['wine', 'tasting notes', 'New Zealand wine', 'cellar'],
  openGraph: {
    type: 'website',
    siteName: 'Cellar',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_NZ',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

/**
 * Runs before first paint to stamp the saved theme onto the root element,
 * so a reader who chose dark does not get a flash of paper-white first.
 * Written as a raw string because it must execute synchronously in head.
 */
const THEME_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('wine.theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* suppressHydrationWarning is required here, not merely tidy: the
       script above stamps data-theme onto this element before React
       hydrates, so the client DOM legitimately differs from the server
       HTML. It suppresses the warning for this element's attributes only. */
    <html
      lang="en"
      className={`${caveat.variable} ${crimson.variable} ${youngSerif.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
