import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    singular: 'Columns',
    plural: 'Column blocks',
  },
  fields: [
    sectionTabs([
      {
        name: 'columns',
        type: 'array',
        label: 'Columns',
        minRows: 2,
        maxRows: 4,
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading',
          },
          {
            name: 'content',
            type: 'richText',
            label: 'Text',
          },
        ],
      },
    ]),
  ],
}
