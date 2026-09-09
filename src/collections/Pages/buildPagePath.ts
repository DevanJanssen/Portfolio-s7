import type { PayloadRequest } from 'payload'

import { formatPath } from '@/utilities/formatPath'

type Args = {
  id?: number | string | null
  parent?: number | string | { id?: number | string } | null
  req: PayloadRequest
  slug?: string | null
}

const toID = (value: Args['parent']): number | string | null => {
  if (value === null || value === undefined) return null
  if (typeof value === 'object') return value.id ?? null

  return value
}

/**
 * Bouwt het volledige pad van een pagina door de ouderketen af te lopen.
 *
 * Het pad wordt opgeslagen in een geïndexeerde kolom in plaats van bij elke
 * request te worden afgeleid: de frontend zoekt een pagina op via precies dit
 * pad, en dat moet één indexlookup zijn en geen recursieve reeks queries.
 *
 * De `seen`-set is geen theoretische voorzichtigheid: als een lus ooit in de
 * data belandt (bijvoorbeeld door een import die de validatie omzeilt), loopt
 * deze functie zonder die guard oneindig door en blijft elke save hangen.
 */
export const buildPagePath = async ({ id, parent, req, slug }: Args): Promise<string> => {
  const segments: string[] = [typeof slug === 'string' ? slug : '']
  const seen = new Set<string>([String(id ?? '')])

  let currentParent = toID(parent)

  while (currentParent !== null) {
    const key = String(currentParent)
    if (seen.has(key)) break
    seen.add(key)

    const parentDoc = await req.payload.findByID({
      collection: 'pages',
      id: currentParent,
      depth: 0,
      overrideAccess: true,
      req,
      select: { slug: true, parent: true },
    })

    if (!parentDoc) break

    segments.unshift(typeof parentDoc.slug === 'string' ? parentDoc.slug : '')
    currentParent = toID(parentDoc.parent as Args['parent'])
  }

  return formatPath(segments)
}
