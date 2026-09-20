import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: {
    singular: 'Text',
    plural: 'Text blocks',
  },
  fields: [
    sectionTabs([
      {
        name: 'content',
        type: 'richText',
        label: 'Text',
        required: true,
      },
    ]),
  ],
}
