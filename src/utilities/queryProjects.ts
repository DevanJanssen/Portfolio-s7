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

/**
 * Published projects for a list of ids, in the order the ids were given.
 *
 * A block that points at projects gets them populated to the depth of its own
 * page query, and that is one level short: it reaches a technology but not the
 * logo hanging off it. Asking here instead puts `projects` at the root of the
 * query, so `techStack.logo` lands within depth 2 — and it keeps the page query
 * light for every block that does not need this.
 *
 * Payload returns rows in its own order, so the ids do the sorting: the editor
 * dragged them into place and that order is the one that should show.
 */
export const queryProjectsByIds = cache(async (ids: number[]): Promise<Project[]> => {
  if (ids.length === 0) return []

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: ids.length,
    pagination: false,
    overrideAccess: false,
    where: {
      and: [{ id: { in: ids } }, { _status: { equals: 'published' } }],
    },
  })

  const byId = new Map(docs.map((doc) => [doc.id, doc]))

  return ids.flatMap((id) => {
    const doc = byId.get(id)

    return doc ? [doc] : []
  })
})
