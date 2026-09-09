import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { sectionTabs } from '@/fields/sectionFields'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: "Hero's",
  },
  fields: [
    sectionTabs([
      {
        name: 'heading',
        type: 'text',
        label: 'Kop',
        required: true,
      },
      {
        name: 'intro',
        type: 'textarea',
        label: 'Introductie',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Afbeelding',
      },
      linkGroup({
        overrides: {
          maxRows: 2,
          admin: {
            description: 'Maximaal twee knoppen; meer leest niet meer als een keuze.',
          },
        },
      }),
    ]),
  ],
}
