import type { CollectionSlug } from 'payload'

const COLLECTION_PREFIX: Partial<Record<CollectionSlug, string>> = {
  // Projects build their own path via `projectPath`; no extra prefix needed here.
}

type Args = {
  collection: CollectionSlug
  /** Het pad waarop het document rendert, zonder collectieprefix. */
  path: string
}

/**
 * De URL achter de previewknop en de live preview in de admin.
 *
 * Wijst naar `/next/preview`, dat draft mode aanzet en dan doorstuurt. Het
 * `previewSecret` voorkomt dat een willekeurige bezoeker draft mode kan
 * inschakelen; `/next/preview` controleert daarnaast of er een ingelogde
 * gebruiker is.
 */
export const generatePreviewPath = ({ collection, path }: Args): string | null => {
  if (typeof path !== 'string') return null

  const prefix = COLLECTION_PREFIX[collection] ?? ''
  const target = `${prefix}${path === '/' ? '' : path}` || '/'

  const params = new URLSearchParams({
    collection,
    path: target,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
