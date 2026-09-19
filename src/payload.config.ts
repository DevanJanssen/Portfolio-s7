import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import { nl } from 'payload/i18n/nl'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Assignments } from './collections/Assignments'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { defaultLexical } from './fields/defaultLexical'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const databaseURL = process.env.DATABASE_URL || ''

// Een lokale database praat geen TLS; een beheerde database eist het juist.
// Zonder deze splitsing faalt of het een of het ander.
const isLocalDatabase = /@(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\//.test(databaseURL)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobiel', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    meta: {
      titleSuffix: ' — Portfolio',
    },
  },

  collections: [Pages, Assignments, Media, Users],
  globals: [Header, Footer],

  editor: defaultLexical,

  db: postgresAdapter({
    // Nooit schema pushen in CI/productie — alleen migraties (pnpm migrate / ci).
    push: false,
    pool: {
      connectionString: databaseURL,
      ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
      // De applicatieserver deelt de database met migraties en scripts. Een te
      // hoge max hier laat `max_connections` opraken zodra er een tweede proces
      // bijkomt.
      max: Number(process.env.DATABASE_POOL_MAX ?? 10),
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  // Beeldbewerking voor de upload-varianten in `collections/Media.ts`.
  sharp,

  plugins,

  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: getServerSideURL(),

  // Admin-interface in het Nederlands; `en` blijft beschikbaar als iemand hem
  // in zijn profiel omzet.
  i18n: {
    supportedLanguages: { en, nl },
    fallbackLanguage: 'nl',
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
