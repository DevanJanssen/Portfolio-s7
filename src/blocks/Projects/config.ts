import type { Block } from 'payload'

import { sectionTabs } from '@/fields/sectionFields'
import { PROJECT_KIND_OPTIONS } from '@/collections/Projects/options'

export const ProjectsBlock: Block = {
  slug: 'projects',
  interfaceName: 'ProjectsBlock',
  labels: {
    singular: 'Project listing',
    plural: 'Project listings',
  },
  fields: [
    sectionTabs([
      {
        name: 'heading',
        type: 'text',
        label: 'Heading',
        defaultValue: 'Projects',
      },
      {
        name: 'intro',
        type: 'textarea',
        label: 'Introduction',
      },
      {
        name: 'source',
        type: 'select',
        label: 'Which projects',
        defaultValue: 'featured',
        options: [
          { label: 'Featured only', value: 'featured' },
          { label: 'All projects', value: 'all' },
          { label: 'One kind of project', value: 'kind' },
        ],
      },
      {
        name: 'kind',
        type: 'select',
        label: 'Kind of project',
        options: [...PROJECT_KIND_OPTIONS],
        admin: {
          condition: (_, siblingData) => siblingData?.source === 'kind',
        },
      },
      {
        name: 'limit',
        type: 'number',
        label: 'Maximum',
        min: 1,
        admin: {
          description: 'Leave empty to show everything that matches.',
        },
      },
      {
        name: 'showLinkToOverview',
        type: 'checkbox',
        label: 'Show a link to the full overview',
        defaultValue: true,
      },
    ]),
  ],
}
