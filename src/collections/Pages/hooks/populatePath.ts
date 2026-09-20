import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'

import type { Page } from '@/payload-types'
import { buildPagePath } from '../buildPagePath'

/** Voorkomt dat het opnieuw opslaan van kinderen zichzelf blijft aanroepen. */
const RESAVING_CHILDREN = 'resavingChildren'

export const populatePath: CollectionBeforeChangeHook<Page> = async ({
  data,
  originalDoc,
  req,
}) => {
  const slug = data.slug ?? originalDoc?.slug
  const parent = data.parent !== undefined ? data.parent : originalDoc?.parent

  return {
    ...data,
    path: await buildPagePath({ id: originalDoc?.id, parent, req, slug }),
  }
}

/**
 * Een pagina hernoemen verandert het pad van al haar nakomelingen mee. Die paden
 * staan opgeslagen, dus zonder deze hook blijven ze op het oude pad staan en
 * geeft de site daar een 404 — terwijl de admin gewoon de nieuwe boom toont.
 *
 * Het opnieuw opslaan gebeurt alleen als het pad écht veranderde; anders zou
 * elke inhoudelijke wijziging de hele subboom herschrijven.
 */
export const resaveChildren: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
  context,
}) => {
  if (context[RESAVING_CHILDREN]) return doc
  if (previousDoc?.path === doc.path) return doc

  const { docs: children } = await req.payload.find({
    collection: 'pages',
    depth: 0,
    limit: 0,
    pagination: false,
    overrideAccess: true,
    req,
    where: { parent: { equals: doc.id } },
  })

  for (const child of children) {
    await req.payload.update({
      collection: 'pages',
      id: child.id,
      // Leeg: `populatePath` leidt het nieuwe pad af uit ouder en slug, dus er
      // hoeft geen veld mee. Payload vult weggelaten velden terug vanuit het
      // opgeslagen document, dus dit overschrijft niets.
      data: {},
      depth: 0,
      overrideAccess: true,
      req,
      // Niet publiceren wat nog concept is.
      draft: child._status !== 'published',
      context: { ...context, [RESAVING_CHILDREN]: true },
    })
  }

  return doc
}
