/** De slug die de homepage voorstelt. Zijn pad is `/`, niet `/home`. */
export const HOME_SLUG = 'home'

/**
 * Een pad zoals het in de database staat: altijd met een leidende slash, nooit
 * met een afsluitende. De homepage is `/`.
 *
 * De homepage-slug verdwijnt ook uit de paden van haar kinderen: een pagina
 * onder de homepage hangen is de gewone manier om de navigatie te ordenen, en
 * die pagina hoort dan op `/team` te staan en niet op `/home/team`.
 */
export const formatPath = (segments: (string | null | undefined)[]): string => {
  const cleaned = segments
    .map((segment) => (typeof segment === 'string' ? segment.trim() : ''))
    .filter((segment) => segment.length > 0)

  if (cleaned[0] === HOME_SLUG) cleaned.shift()

  return cleaned.length > 0 ? `/${cleaned.join('/')}` : '/'
}
