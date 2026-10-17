import type { MetadataRoute } from 'next'

import { projects } from '@/content/projects'
import { site } from '@/content/site'

export const dynamic = 'force-static'

const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${site.url}/` },
  ...projects.map((project) => ({ url: `${site.url}/projects/${project.slug}/` })),
]

export default sitemap
