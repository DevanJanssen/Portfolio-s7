import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { sectionTabs } from '@/fields/sectionFields'

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: 'Call to action',
    plural: "Calls to action",
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
        name: 'text',
        type: 'textarea',
        label: 'Text',
      },
      linkGroup({
        overrides: {
          minRows: 1,
          maxRows: 2,
        },
      }),
    ]),
  ],
}
