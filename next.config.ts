import type { NextConfig } from 'next';

/**
 * Static export.
 *
 * Every route prerenders (no API routes, no server actions), so
 * `output: 'export'` writes a plain `out/` directory instead of needing a
 * Node server. `npm run deploy` then serves that folder as a static-assets
 * Cloudflare Worker via `wrangler deploy` (see wrangler.jsonc).
 *
 * `trailingSlash` makes each route a directory with an index.html, so
 * /course/bordeaux resolves without rewrite rules.
 *
 * Images are unoptimised because the optimiser needs a running server. The
 * bottle shots are plain <img> tags pointing at WebP that
 * scripts/optimise-bottles.py already sized.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
