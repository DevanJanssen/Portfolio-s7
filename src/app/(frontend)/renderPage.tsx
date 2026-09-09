import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import BlockRenderer from '@/components/BlockRenderer'
import LivePreviewListener from '@/components/LivePreviewListener'
import PayloadRedirects from '@/components/PayloadRedirects'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { queryPageByPath } from '@/utilities/queryPageByPath'

/**
 * Alles wat de homepage en de `[...slug]`-route delen.
 *
 * Twee routes in plaats van één optionele catch-all: `generateStaticParams` kan
 * de homepage niet als lege slug-array uitdrukken, en met een aparte
 * `page.tsx` blijft het prerenderen van beide voorspelbaar.
 */
export const renderPage = async (path: string) => {
  const page = await queryPageByPath(path)

  if (!page) {
    // Geen pagina: misschien is dit pad verhuisd. Deze component stuurt door of
    // geeft een 404.
    return <PayloadRedirects url={path} />
  }

  const { isEnabled: isDraft } = await draftMode()

  return (
    <article>
      {isDraft ? <LivePreviewListener serverURL={getServerSideURL()} /> : null}
      <BlockRenderer blocks={page.layout} />
    </article>
  )
}

export const generatePageMetadata = async (path: string): Promise<Metadata> => {
  const page = await queryPageByPath(path)

  return {
    ...generateMeta({ doc: page, path }),
    ...(page?.meta?.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
