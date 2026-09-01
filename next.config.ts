import type { NextConfig } from 'next';

/**
 * Static export.
 *
 * Every route here prerenders already - there are no API routes, no server
 * actions and nothing rendered per request - so the Node server a default
 * build expects would sit there doing nothing. `output: 'export'` emits a
 * plain `out/` directory instead, which any static host will serve and
 * which can be handed to Cloudflare Pages without a build container.
 *
 * `trailingSlash` makes each route a directory with an index.html, so a
 * static host resolves /course/bordeaux without needing rewrite rules.
 *
 * Images are unoptimised because the optimiser needs a running server, and
 * nothing here uses next/image anyway: the bottle shots are plain <img>
 * tags pointing at WebP that scripts/optimise-bottles.py already sized.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
