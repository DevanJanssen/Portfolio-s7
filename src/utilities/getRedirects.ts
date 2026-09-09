import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'
import type { Redirect } from '@/payload-types'

/**
 * Alle redirects uit het CMS.
 *
 * Eén keer alles ophalen in plaats van per request op `from` filteren: de lijst
 * is klein en wordt alleen geraadpleegd op paden die anders een 404 zouden
 * geven, dus dit is één query op de zeldzame route in plaats van een query per
 * request.
 */
export const getRedirects = cache(async (): Promise<Redirect[]> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'redirects',
    depth: 1,
    limit: 0,
    pagination: false,
    overrideAccess: true,
  })

  return docs
})
