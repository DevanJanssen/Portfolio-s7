import { getServerSideURL } from './getURL'

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

/**
 * Zet een Payload-media-URL om naar iets dat `next/image` veilig kan laden.
 *
 * Payload levert absolute URL's (`SERVER_URL` + pad). Op localhost weigert Next
 * 16 die te optimaliseren vanwege de private-IP/SSRF-guard, waardoor de
 * afbeelding als kapot icoontje ("?") verschijnt. Zelfde-origin URL's worden
 * daarom relatief gemaakt: dan gaat Next via `localPatterns` in plaats van een
 * remote fetch naar 127.0.0.1.
 */
export const getMediaUrl = (url: string | null | undefined): string => {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    const isLocalHost = LOCAL_HOSTNAMES.has(parsed.hostname.toLowerCase())

    let isKnownOrigin = false
    try {
      isKnownOrigin = parsed.origin === new URL(getServerSideURL()).origin
    } catch {
      // Malformed SERVER_URL — treat as remote and leave absolute.
    }

    if (isLocalHost || isKnownOrigin) {
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    // Already relative.
  }

  return url
}
