import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { sectionTabs } from '@/fields/sectionFields'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: "Heroes",
  },
  fields: [
    sectionTabs([
      {
        name: 'heading',
        type: 'text',
        label: 'Heading',
        required: true,
      },
      {
        name: 'intro',
        type: 'textarea',
        label: 'Introduction',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Image',
      },
      linkGroup({
        overrides: {
          maxRows: 2,
          admin: {
            description: 'Two buttons at most; more stops reading as a choice.',
          },
        },
      }),
    ]),
  ],
}
