import path from 'path'
import { fileURLToPath } from 'url'

import type { NextConfig } from 'next'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Volledig statisch: `pnpm build` schrijft de site naar `out/`, klaar voor elke
// statische host op devanjanssen.com (zie CNAME). Geen server, geen database.
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Statische export heeft geen image-optimizer; afbeeldingen gaan zoals ze zijn.
  images: { unoptimized: true },
  // Elke route wordt `/pad/index.html`, zodat ook hosts zonder rewrites werken.
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(dirname, 'src')],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
