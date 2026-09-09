import { notFound, redirect } from 'next/navigation'

import { getRedirects } from '@/utilities/getRedirects'

type Props = {
  /** Zet dit aan als de aanroeper zelf bepaalt wat er bij "niets gevonden" gebeurt. */
  disableNotFound?: boolean
  url: string
}

/**
 * Redirects die een redacteur in het CMS beheert, afgehandeld tijdens de render.
 *
 * Dit staat bewust aan het eind van de pagina-route en niet in een middleware:
 * de middleware heeft geen databaseverbinding, en een redirect opzoeken hoort
 * pas te gebeuren als vaststaat dat er geen pagina op dit pad ligt. Het
 * alternatief — elke request door een redirect-lookup heen — kost een query op
 * elk verzoek voor iets dat zelden voorkomt.
 */
export const PayloadRedirects = async ({ disableNotFound, url }: Props) => {
  const redirects = await getRedirects()
  const match = redirects.find((item) => item.from === url)

  if (match) {
    const to = match.to

    if (to?.type === 'custom' && to.url) {
      redirect(to.url)
    }

    const reference = to?.reference
    if (reference && typeof reference.value === 'object' && 'path' in reference.value) {
      const path = reference.value.path
      if (typeof path === 'string' && path.length > 0) redirect(path)
    }

    // Een redirect waarvan het doel verdwenen is: liever naar de homepage dan
    // een 404, want de redirect bestaat juist omdat deze URL nog gedeeld wordt.
    redirect('/')
  }

  if (disableNotFound) return null

  notFound()
}

export default PayloadRedirects
