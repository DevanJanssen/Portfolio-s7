import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { assignmentPath } from '@/utilities/assignmentPath'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Alleen gepubliceerde pagina's zonder noindex. Een pagina die uit zoekmachines
 * geweerd wordt en tóch in de sitemap staat, is een tegenstrijdig signaal
 * waarover Search Console klaagt.
 *
 * Deze route wordt op buildtijd geprerenderd; `revalidatePage` trekt hem daarna
 * in via `revalidatePath('/sitemap.xml')` zodra een pagina wordt gepubliceerd of
 * verdwijnt. Bewust geen `unstable_cache`: die schrijft zijn resultaat naar
 * `.next/cache`, en dat overleeft een volgende build — waardoor je lokaal een
 * lege sitemap blijft zien lang nadat er content bij is gekomen.
 */
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseURL = getServerSideURL()
  const payload = await getPayload({ config: configPromise })

  const [{ docs: pages }, { docs: assignments }] = await Promise.all([
    payload.find({
      collection: 'pages',
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: false,
      select: { path: true, updatedAt: true, meta: true },
      where: {
        _status: { equals: 'published' },
        'meta.noindex': { not_equals: true },
      },
    }),
    payload.find({
      collection: 'assignments',
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: false,
      select: { slug: true, updatedAt: true, meta: true },
      where: {
        _status: { equals: 'published' },
        'meta.noindex': { not_equals: true },
      },
    }),
  ])

  const pageEntries = pages.map((doc) => ({
    url: `${baseURL}${doc.path === '/' ? '' : (doc.path ?? '')}`,
    lastModified: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
  }))

  const assignmentEntries = assignments.flatMap((doc) => {
    if (typeof doc.slug !== 'string' || doc.slug.length === 0) return []

    return [
      {
        url: `${baseURL}${assignmentPath(doc.slug)}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
      },
    ]
  })

  return [
    ...pageEntries,
    {
      url: `${baseURL}/opdrachten`,
      lastModified: assignmentEntries[0]?.lastModified,
    },
    ...assignmentEntries,
  ]
}

export default sitemap
