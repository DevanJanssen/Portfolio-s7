import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

// Staat in `app/` en niet in `app/(frontend)/`: vanuit een routegroep pikt Next
// dit bestand niet op, en dan levert de site stilzwijgend geen robots.txt.

const robots = (): MetadataRoute.Robots => {
  const baseURL = getServerSideURL()

  // Een acceptatie- of previewomgeving hoort niet in de index. Alles wat niet de
  // productie-URL is, wordt hier dichtgezet.
  const isProduction = process.env.ROBOTS_ALLOW_INDEXING === 'true'

  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${baseURL}/sitemap.xml`,
  }
}

export default robots
