import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { getServerSideURL } from './getURL'

type MetaImage = number | string | Media | null | undefined

type MetaDoc = {
  meta?: {
    title?: string | null
    description?: string | null
    image?: MetaImage
  } | null
  title?: string | null
}

/**
 * Een niet-ingevulde relatie komt terug als id (getal of string); alleen bij
 * `depth >= 1` is het een volledig Media-document met een `url`.
 */
const imageURL = (image: MetaImage): string | null => {
  if (!image || typeof image !== 'object') return null

  const { url } = image
  if (typeof url !== 'string' || url.length === 0) return null

  return url.startsWith('http') ? url : `${getServerSideURL()}${url}`
}

/**
 * Vertaalt de SEO-velden van een document naar Next-metadata.
 *
 * `metadataBase` staat in de root layout, zodat de relatieve `path` hier
 * absoluut wordt gemaakt zonder dat elke pagina dat zelf hoeft te doen.
 */
export const generateMeta = ({ doc, path }: { doc: MetaDoc | null; path: string }): Metadata => {
  const title = doc?.meta?.title || doc?.title || undefined
  const description = doc?.meta?.description || undefined
  const ogImage = imageURL(doc?.meta?.image)

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}
