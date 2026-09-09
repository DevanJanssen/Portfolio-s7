import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload, type PayloadRequest } from 'payload'

import configPromise from '@payload-config'

/**
 * Zet draft mode aan en stuurt door naar de te previewen pagina.
 *
 * Twee controles, allebei nodig. Het `previewSecret` voorkomt dat een
 * willekeurige bezoeker deze route kan aanroepen; de auth-check voorkomt dat
 * iemand die het secret te pakken krijgt daarmee alle concepten kan lezen.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Je mag deze pagina niet previewen.', { status: 403 })
  }

  if (!path) {
    return new Response('Geen pad opgegeven.', { status: 400 })
  }

  // Alleen relatieve paden: een absolute URL zou deze route in een open
  // redirect veranderen.
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Alleen relatieve paden zijn toegestaan.', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const draft = await draftMode()

  try {
    const { user } = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })

    if (!user) {
      draft.disable()
      return new Response('Je moet ingelogd zijn om te previewen.', { status: 403 })
    }
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Preview-token kon niet worden gecontroleerd' })
    draft.disable()
    return new Response('Je mag deze pagina niet previewen.', { status: 403 })
  }

  draft.enable()

  redirect(path)
}
