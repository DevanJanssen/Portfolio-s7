import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    sectionTabs(
      [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
          admin: {
            description: 'Leave empty to use the caption from the media file itself.',
          },
        },
      ],
      {
        // De breedte bepaalt hoe het blok op de pagina staat, niet wát erin
        // staat; die hoort dus bij Layout.
        layout: [
          {
            name: 'width',
            type: 'select',
            label: 'Width',
            defaultValue: 'content',
            options: [
              { label: 'Text width', value: 'content' },
              { label: 'Full width', value: 'full' },
            ],
          },
        ],
      },
    ),
  ],
}
