import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'
import type { Page } from '@/payload-types'

/**
 * Zoekt de pagina die op dit pad hoort.
 *
 * `cache()` ontdubbelt de query binnen één request: `generateMetadata` en de
 * pagina zelf vragen allebei hetzelfde document op, en zonder dit zijn dat twee
 * queries per paginaweergave.
 *
 * In draft mode wordt de conceptversie gelezen én de toegangscontrole
 * overgeslagen — dat is veilig omdat `/next/preview` al heeft gecontroleerd dat
 * er een ingelogde gebruiker achter zit.
 */
export const queryPageByPath = cache(async (path: string): Promise<Page | null> => {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 2,
    draft: isDraft,
    limit: 1,
    pagination: false,
    overrideAccess: isDraft,
    where: {
      path: { equals: path },
    },
  })

  return docs[0] ?? null
})
