import type { Metadata } from 'next';
import { OWNER } from '@/lib/config';
import { Archivo, Crimson_Pro, Young_Serif } from 'next/font/google';
import Shell from '@/components/Shell';
import './globals.css';

/**
 * The three typefaces. Loaded through next/font so they are self-hosted
 * and do not block rendering on a third-party request.
 *
 * Young Serif sets the wordmark and every heading; Crimson Pro sets the
 * body; Archivo sets the interface and, at its heaviest, the front door.
 * There is deliberately no handwriting face: a whole site in a pen hand
 * reads as a theme, and the headings are better as type.
 */

/**
 * The heading and wordmark face: heavy, steady and warm, so the brand and
 * the chapter titles are the same voice.
 */
const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-wordmark',
  display: 'swap',
});

/**
 * The interface face: labels, chips, buttons, figures.
 *
 * Named explicitly so it does not fall back to the system stack and look
 * different on every platform. Archivo is a grotesque with tight uppercase
 * that suits small-caps labels, and it carries real tabular numerals, which
 * matters because the content is full of hectares, caudalies and
 * percentages sitting in aligned columns.
 */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

/** The body face for chapter prose, with italics for emphasis. */
const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

/* The default page title and description, reused for the social cards. */
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

/** The root layout: fonts, the theme script, and the Shell around every page. */
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
      className={`${crimson.variable} ${youngSerif.variable} ${archivo.variable}`}
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
