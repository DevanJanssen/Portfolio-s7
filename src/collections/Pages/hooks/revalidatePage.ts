import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '@/payload-types'

const SITEMAP_PATH = '/sitemap.xml'

/**
 * Leegt de routecache voor een pad en voor de sitemap.
 *
 * Let op de aanroepcontext: `revalidatePath` bestaat alleen binnen een
 * Next-request. Een script dat via de Local API schrijft, moet daarom
 * `context: { disableRevalidate: true }` meegeven — anders faalt de schrijfactie
 * met "Invariant: static generation store missing". Zie `scripts/seed.ts`.
 */
const revalidate = (path: string) => {
  revalidatePath(path)
  revalidatePath(SITEMAP_PATH)
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' && doc.path) {
    payload.logger.info(`Revalidating ${doc.path}`)
    revalidate(doc.path)
  }

  // Depubliceren of verplaatsen: het oude pad moet ook uit de cache, anders
  // blijft de verdwenen pagina daar staan tot de cache vanzelf verloopt.
  const oldPath = previousDoc?.path
  if (oldPath && oldPath !== doc.path) {
    payload.logger.info(`Revalidating oude pad ${oldPath}`)
    revalidate(oldPath)
  }

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.path) {
    revalidate(doc.path)
  }

  return doc
}
