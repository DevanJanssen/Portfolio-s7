import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'
import type { Assignment } from '@/payload-types'

/**
 * Zoekt de opdracht die op deze slug hoort.
 *
 * `cache()` ontdubbelt de query binnen één request: metadata en de pagina
 * vragen allebei hetzelfde document op.
 *
 * In draft mode wordt de conceptversie gelezen én de toegangscontrole
 * overgeslagen — veilig omdat `/next/preview` al een ingelogde gebruiker eist.
 */
export const queryAssignmentBySlug = cache(async (slug: string): Promise<Assignment | null> => {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'assignments',
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

export const queryPublishedAssignments = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'assignments',
    depth: 1,
    limit: 100,
    pagination: false,
    overrideAccess: false,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  return docs
})
