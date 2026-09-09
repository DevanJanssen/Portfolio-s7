import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { sectionTabs } from '@/fields/sectionFields'

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: 'Call to action',
    plural: "Call to action's",
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
        name: 'text',
        type: 'textarea',
        label: 'Tekst',
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
