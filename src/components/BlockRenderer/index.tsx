import { Fragment, type ReactNode } from 'react'

import { CallToActionBlockComponent } from '@/blocks/CallToAction/Component'
import { ColumnsBlockComponent } from '@/blocks/Columns/Component'
import { HeroBlockComponent } from '@/blocks/Hero/Component'
import { ImportantProjectsBlockComponent } from '@/blocks/ImportantProjects/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { ProjectsBlockComponent } from '@/blocks/Projects/Component'
import { RichTextBlockComponent } from '@/blocks/RichText/Component'
import type { Page, Project } from '@/payload-types'

type LayoutBlock = NonNullable<Page['layout']>[number] | NonNullable<Project['layout']>[number]

const BLOCK_COMPONENTS: Record<string, (props: any) => ReactNode> = {
  callToAction: CallToActionBlockComponent,
  columns: ColumnsBlockComponent,
  hero: HeroBlockComponent,
  importantProjects: ImportantProjectsBlockComponent,
  mediaBlock: MediaBlockComponent,
  projects: ProjectsBlockComponent,
  richText: RichTextBlockComponent,
}

export const BlockRenderer = ({ blocks }: { blocks?: LayoutBlock[] | null }) => {
  if (!blocks?.length) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const Component = BLOCK_COMPONENTS[block.blockType]

        if (!Component) {
          console.warn(`No component wired up for block "${block.blockType}".`)

          return null
        }

        return <Component key={block.id ?? `${block.blockType}-${index}`} {...block} />
      })}
    </Fragment>
  )
}

export default BlockRenderer
