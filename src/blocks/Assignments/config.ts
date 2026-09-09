import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'

export const AssignmentsBlock: Block = {
  slug: 'assignments',
  interfaceName: 'AssignmentsBlock',
  labels: {
    singular: 'Opdrachtenoverzicht',
    plural: 'Opdrachtenoverzichten',
  },
  fields: [
    sectionTabs([
      {
        name: 'heading',
        type: 'text',
        label: 'Kop',
        defaultValue: 'Opdrachten',
      },
      {
        name: 'intro',
        type: 'textarea',
        label: 'Introductie',
      },
      {
        name: 'limit',
        type: 'number',
        label: 'Maximum aantal',
        min: 1,
        admin: {
          description: 'Leeg laten toont alle gepubliceerde opdrachten, nieuwste eerst.',
        },
      },
    ]),
  ],
}
