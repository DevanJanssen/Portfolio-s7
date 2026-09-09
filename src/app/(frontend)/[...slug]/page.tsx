import type { Metadata } from 'next'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { generatePageMetadata, renderPage } from '../renderPage'

type Args = {
  params: Promise<{ slug: string[] }>
}

const pathFromParams = async (params: Args['params']): Promise<string> => {
  const { slug } = await params

  return `/${slug.map((segment) => decodeURIComponent(segment)).join('/')}`
}

/**
 * Prerendert de gepubliceerde pagina's tijdens de build. Paden die hier niet in
 * staan worden alsnog op aanvraag gerenderd en daarna gecachet.
 */
export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    select: { path: true },
    where: { _status: { equals: 'published' } },
  })

  return docs
    .map((doc) => doc.path)
    .filter((path): path is string => typeof path === 'string' && path !== '/')
    .map((path) => ({ slug: path.replace(/^\//, '').split('/') }))
}

export const generateMetadata = async ({ params }: Args): Promise<Metadata> =>
  generatePageMetadata(await pathFromParams(params))

const Page = async ({ params }: Args) => renderPage(await pathFromParams(params))

export default Page
