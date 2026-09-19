import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

import type { NextConfig } from 'next'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * De image-allowlist wordt op buildtijd bevroren, ook met `output: 'standalone'`.
 * Een hostname die hier tijdens de build niet bekend is, komt er runtime niet
 * meer bij — vandaar dat de deploy deze twee waardes als build-arg moet meegeven
 * en niet alleen als runtime-env.
 */
const serverURL = process.env.SERVER_URL || 'http://localhost:3000'

const hostnamesFromEnv = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

const remotePatterns = [
  ...[serverURL, process.env.S3_ENDPOINT].filter(Boolean).map((entry) => {
    const url = new URL(entry as string)

    return {
      hostname: url.hostname,
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
    }
  }),
  ...hostnamesFromEnv(process.env.IMAGE_ALLOWED_REMOTE_HOSTS).map((hostname) => ({
    protocol: 'https' as const,
    hostname,
  })),
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Begin de ladder laag: kaarten in een grid vragen vaak om ~400px, en met
    // de Next-standaard (640 als kleinste) haalt zo'n kaart een veel te groot
    // bestand op.
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    remotePatterns,
  },
  sassOptions: {
    // Next 15: includePaths. (loadPaths is de nieuwere Sass-API / Next 16.)
    includePaths: [path.join(dirname, 'src')],
    loadPaths: [path.join(dirname, 'src')],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
