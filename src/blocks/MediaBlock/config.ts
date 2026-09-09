import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Afbeelding',
    plural: 'Afbeeldingen',
  },
  fields: [
    sectionTabs(
      [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Afbeelding',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Bijschrift',
          admin: {
            description: 'Laat leeg om het bijschrift van het mediabestand zelf te gebruiken.',
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
            label: 'Breedte',
            defaultValue: 'content',
            options: [
              { label: 'Tekstbreedte', value: 'content' },
              { label: 'Volle breedte', value: 'full' },
            ],
          },
        ],
      },
    ),
  ],
}
