import NextImage from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  className?: string
  /** Voor de grootste afbeelding boven de vouw; laat de rest lui laden. */
  priority?: boolean
  resource?: number | string | MediaDoc | null
  /**
   * Hoe breed de afbeelding op de pagina wordt. Zonder dit gaat de browser uit
   * van 100vw en haalt hij op een breed scherm het grootste bestand op, ook
   * voor een kaartje van 300px.
   */
  sizes?: string
}

const FALLBACK_SIZE = 1200

/**
 * De enige plek die een Media-document naar een `<img>` of `<video>` vertaalt.
 *
 * Een niet-gepopuleerde relatie (alleen een id, bij `depth: 0`) rendert niets:
 * er is dan geen url en geen alt-tekst, en een placeholder zou een ontbrekende
 * afbeelding verbergen in plaats van hem zichtbaar te maken.
 */
export const Media = ({ className, priority, resource, sizes = '100vw' }: Props) => {
  if (!resource || typeof resource !== 'object') return null

  const { alt, height, mimeType, url, width } = resource
  const src = getMediaUrl(url)

  if (!src) return null

  if (typeof mimeType === 'string' && mimeType.startsWith('video/')) {
    return (
      <video
        autoPlay
        className={cn(className)}
        controls={false}
        loop
        muted
        playsInline
        src={src}
      />
    )
  }

  return (
    <NextImage
      alt={alt ?? ''}
      className={cn(className)}
      height={typeof height === 'number' ? height : FALLBACK_SIZE}
      priority={priority}
      // `priority` en `loading` sluiten elkaar uit in next/image.
      {...(priority ? {} : { loading: 'lazy' as const })}
      sizes={sizes}
      src={src}
      width={typeof width === 'number' ? width : FALLBACK_SIZE}
    />
  )
}

export default Media
