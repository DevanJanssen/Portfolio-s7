import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { LEARNING_OUTCOMES_PATH } from '@/utilities/learningOutcomePath'
import type { Project } from '@/payload-types'
import { PROJECTS_PATH, projectPath } from '@/utilities/projectPath'

/**
 * Clears the route cache for the project, the overview, the learning-outcome
 * pages and the sitemap.
 *
 * The overview and every `projects` block elsewhere read the whole collection,
 * so the layout under `/` goes too. Without that a new project stays invisible
 * on the homepage until the cache expires on its own. The learning-outcome
 * pages are derived from project data, so they go as well.
 *
 * `revalidatePath` only exists inside a Next request. Scripts writing through
 * the Local API must pass `context: { disableRevalidate: true }`.
 */
const revalidate = (path: string) => {
  revalidatePath(path)
  revalidatePath(PROJECTS_PATH)
  revalidatePath(LEARNING_OUTCOMES_PATH, 'page')
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
}

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' && doc.slug) {
    const path = projectPath(doc.slug)
    payload.logger.info(`Revalidating ${path}`)
    revalidate(path)
  }

  const oldSlug = previousDoc?.slug
  if (oldSlug && oldSlug !== doc.slug) {
    const oldPath = projectPath(oldSlug)
    payload.logger.info(`Revalidating old path ${oldPath}`)
    revalidate(oldPath)
  }

  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidate(projectPath(doc.slug))
  }

  return doc
}
