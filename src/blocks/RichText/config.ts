import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: 'Tekst',
    plural: 'Tekstblokken',
  },
  fields: [
    sectionTabs([
      {
        name: 'content',
        type: 'richText',
        label: 'Tekst',
        required: true,
      },
    ]),
  ],
}
