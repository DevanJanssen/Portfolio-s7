import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

/** The shape `components/TechLogo` needs in order to draw a mask. */
export type MaskLogo = {
  src: string
  width: number
  height: number
}

type LogoDoc = {
  id: number | string
  logo?: number | Media | null
}

/**
 * A relationship that was not populated is only an id — there is no logo to be
 * had from it. Those are skipped rather than rendering an empty box.
 */
export const isPopulatedDoc = <T extends object>(item: unknown): item is T =>
  typeof item === 'object' && item !== null

export const logoFromMedia = (
  resource: number | Media | null | undefined,
): MaskLogo | undefined => {
  if (!resource || typeof resource !== 'object') return undefined

  const src = getMediaUrl(resource.url)
  if (!src) return undefined

  return {
    src,
    width: typeof resource.width === 'number' && resource.width > 0 ? resource.width : 1,
    height: typeof resource.height === 'number' && resource.height > 0 ? resource.height : 1,
  }
}

/** Turns chosen library items into logos, dropping incomplete relationships. */
export const resolveLogoItems = (
  items?: (number | string | LogoDoc)[] | null,
): { id: string; logo: MaskLogo }[] =>
  (items ?? []).flatMap((item) => {
    if (!isPopulatedDoc<LogoDoc>(item)) return []

    const logo = logoFromMedia(item.logo)
    return logo ? [{ id: String(item.id), logo }] : []
  })
