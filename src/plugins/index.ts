import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

import { canEditContent } from '@/access/roles'
import type { Assignment, Page } from '@/payload-types'
import { assignmentPath } from '@/utilities/assignmentPath'
import { getServerSideURL } from '@/utilities/getURL'

const hasS3 = Boolean(process.env.S3_BUCKET)

export const plugins: Plugin[] = [
  seoPlugin({
    // Geen `collections` hier: de SEO-velden staan expliciet in de SEO-tab van
    // de Pages-collectie. Zou de plugin ze ook toevoegen, dan kreeg elke pagina
    // twee meta-groepen.
    generateTitle: ({ doc }: { doc: Partial<Page | Assignment> }) =>
      doc?.title ? `${doc.title} | Portfolio` : 'Portfolio',
    generateURL: ({ doc }: { doc: Partial<Page | Assignment> }) => {
      if ('path' in doc && typeof doc.path === 'string') {
        return `${getServerSideURL()}${doc.path}`
      }

      if ('slug' in doc && typeof doc.slug === 'string') {
        return `${getServerSideURL()}${assignmentPath(doc.slug)}`
      }

      return getServerSideURL()
    },
    uploadsCollection: 'media',
  }),

  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      admin: {
        group: 'Site-instellingen',
        description:
          'Stuurt een oud pad door naar een nieuw. Wordt pas geraadpleegd als er geen pagina op het oude pad ligt.',
      },
      access: {
        create: canEditContent,
        update: canEditContent,
        delete: canEditContent,
      },
    },
  }),

  // Zonder S3-bucket blijven uploads op de lokale schijf staan (public/media).
  // Dat is prima voor lokaal werk, maar niet voor een deploy met meer dan één
  // instantie of een container zonder volume — daar moet S3 aan.
  ...(hasS3
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET as string,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            // Onze buckets draaien bij TransIP, niet bij AWS. De SDK eist een
            // region, maar de waarde speelt geen rol.
            region: process.env.S3_REGION || 'eu-west-1',
            // Path-style: TransIP serveert geen bucketnaam als subdomein.
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
          },
        }),
      ]
    : []),
]
