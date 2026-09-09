import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'
import type { Config } from '@/payload-types'

type GlobalSlug = keyof Config['globals']

/**
 * Header en footer worden in elke render van de layout opgevraagd. `cache()`
 * ontdubbelt dat binnen één request; over requests heen zorgt de statische
 * route-cache voor de rest, die door `revalidateGlobal` wordt geleegd zodra een
 * redacteur opslaat.
 */
export const getGlobal = cache(
  async <T extends GlobalSlug>(slug: T, depth = 1): Promise<Config['globals'][T]> => {
    const payload = await getPayload({ config: configPromise })

    return payload.findGlobal({
      slug,
      depth,
    }) as Promise<Config['globals'][T]>
  },
)
