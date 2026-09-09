import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'

import { cn } from '@/utilities/cn'
import styles from './index.module.scss'

/**
 * Interne links uit de editor wijzen naar een document, niet naar een URL. De
 * standaardconverter weet niet waar een pagina woont; deze functie vertaalt hem
 * naar het opgeslagen `path`.
 *
 * Het meeladen van dat pad gebeurt via `defaultPopulate` op de Pages-collectie —
 * anders komt hier alleen een id binnen.
 */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }): string => {
  const value = linkNode.fields?.doc?.value

  if (value && typeof value === 'object' && 'path' in value && typeof value.path === 'string') {
    return value.path
  }

  // Het doel is verwijderd of niet meegeladen. `/` is onbevredigend maar
  // klikbaar; een lege href zou de link stilletjes kapot maken.
  return '/'
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  className?: string
  data: SerializedEditorState | null | undefined
}

export const RichText = ({ className, data }: Props) => {
  if (!data) return null

  return (
    <LexicalRichText
      className={cn(styles.richText, className)}
      converters={converters}
      data={data}
    />
  )
}

export default RichText
