import { Fragment, type ReactNode } from 'react'

import { AssignmentsBlockComponent } from '@/blocks/Assignments/Component'
import { CallToActionBlockComponent } from '@/blocks/CallToAction/Component'
import { ColumnsBlockComponent } from '@/blocks/Columns/Component'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { RichTextBlockComponent } from '@/blocks/RichText/Component'
import type { Assignment, Page } from '@/payload-types'

type LayoutBlock =
  | NonNullable<Page['layout']>[number]
  | NonNullable<Assignment['layout']>[number]

const BLOCK_COMPONENTS: Record<string, (props: any) => ReactNode> = {
  assignments: AssignmentsBlockComponent,
  callToAction: CallToActionBlockComponent,
  columns: ColumnsBlockComponent,
  hero: HeroBlockComponent,
  mediaBlock: MediaBlockComponent,
  richText: RichTextBlockComponent,
}

export const BlockRenderer = ({ blocks }: { blocks?: LayoutBlock[] | null }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const Component = BLOCK_COMPONENTS[block.blockType]

        if (!Component) {
          console.warn(`Geen component gekoppeld aan blok "${block.blockType}".`)

          return null
        }

        return <Component key={block.id ?? `${block.blockType}-${index}`} {...block} />
      })}
    </Fragment>
  )
}

export default BlockRenderer
