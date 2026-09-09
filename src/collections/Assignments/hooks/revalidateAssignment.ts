import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Assignment } from '@/payload-types'
import { ASSIGNMENTS_PATH, assignmentPath } from '@/utilities/assignmentPath'

/**
 * Leegt de routecache voor de opdracht, het overzicht en de sitemap.
 *
 * Het overzicht en elk `assignments`-blok op andere pagina's lezen de hele
 * collectie; daarom gaat ook de layout onder `/` mee. Zonder dat blijft een
 * nieuwe opdracht onzichtbaar op de homepage tot de cache vanzelf verloopt.
 *
 * `revalidatePath` bestaat alleen binnen een Next-request. Scripts die via de
 * Local API schrijven moeten `context: { disableRevalidate: true }` meegeven.
 */
const revalidate = (path: string) => {
  revalidatePath(path)
  revalidatePath(ASSIGNMENTS_PATH)
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
}

export const revalidateAssignment: CollectionAfterChangeHook<Assignment> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' && doc.slug) {
    const path = assignmentPath(doc.slug)
    payload.logger.info(`Revalidating ${path}`)
    revalidate(path)
  }

  const oldSlug = previousDoc?.slug
  if (oldSlug && oldSlug !== doc.slug) {
    const oldPath = assignmentPath(oldSlug)
    payload.logger.info(`Revalidating oud pad ${oldPath}`)
    revalidate(oldPath)
  }

  return doc
}

export const revalidateAssignmentDelete: CollectionAfterDeleteHook<Assignment> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidate(assignmentPath(doc.slug))
  }

  return doc
}
