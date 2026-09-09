import type { Media, Page } from '@/payload-types'
import type { LinkAppearance } from '@/fields/link'

export type LinkValue = {
  type?: ('reference' | 'custom' | 'mailto' | 'tel' | 'download') | null
  reference?: number | string | Page | null
  url?: string | null
  mailto?: string | null
  tel?: string | null
  media?: number | string | Media | null
  anchor?: string | null
  newTab?: boolean | null
  label?: string | null
  appearance?: LinkAppearance | null
}

/**
 * Zet een opgeslagen link om in een href.
 *
 * Geeft `null` terug als het doel niet (meer) te bepalen is. De renderer laat
 * zo'n link weg in plaats van een kapotte `href=""` neer te zetten.
 */
export const resolveLinkHref = (value: LinkValue | null | undefined): string | null => {
  if (!value) return null

  const anchor = value.anchor ? `#${value.anchor}` : ''

  switch (value.type) {
    case 'reference': {
      const reference = value.reference
      if (!reference || typeof reference !== 'object') return null

      const path = reference.path
      return typeof path === 'string' && path.length > 0 ? `${path}${anchor}` : null
    }

    case 'custom': {
      const url = value.url?.trim()
      return url ? url : null
    }

    case 'mailto': {
      const mailto = value.mailto?.trim()
      return mailto ? `mailto:${mailto}` : null
    }

    case 'tel': {
      const tel = value.tel?.trim()
      return tel ? `tel:${tel.replace(/[^\d+]/g, '')}` : null
    }

    case 'download': {
      const media = value.media
      if (!media || typeof media !== 'object') return null

      return typeof media.url === 'string' && media.url.length > 0 ? media.url : null
    }

    default:
      return null
  }
}

export const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href)
