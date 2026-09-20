import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'
import type { Project } from '@/payload-types'

/**
 * Finds the project behind this slug.
 *
 * `cache()` deduplicates the query within a single request: metadata and the
 * page itself both ask for the same document.
 *
 * In draft mode the draft version is read and access control is skipped — safe
 * because `/next/preview` already requires a logged-in user.
 */
export const queryProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 2,
    draft: isDraft,
    limit: 1,
    pagination: false,
    overrideAccess: isDraft,
    where: {
      slug: { equals: slug },
    },
  })

  return docs[0] ?? null
})

/**
 * All published projects, curated order first.
 *
 * `sortOrder` lets you pin a project to the top of its section; everything left
 * at the default 0 falls back to newest start date.
 */
export const queryPublishedProjects = cache(async (): Promise<Project[]> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 200,
    pagination: false,
    overrideAccess: false,
    sort: ['sortOrder', '-startDate', '-publishedAt'],
    where: { _status: { equals: 'published' } },
  })

  return docs
})

export const queryFeaturedProjects = cache(async (limit?: number): Promise<Project[]> => {
  const projects = await queryPublishedProjects()
  const featured = projects.filter((project) => project.featured)
  const pool = featured.length > 0 ? featured : projects

  return typeof limit === 'number' && limit > 0 ? pool.slice(0, limit) : pool
})
