import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

/** HBO-i skill levels. A project claims one of these per outcome. */
export const PROFICIENCY_LEVEL_OPTIONS = [
  { label: 'Level 1', value: '1' },
  { label: 'Level 2', value: '2' },
  { label: 'Level 3', value: '3' },
  { label: 'Level 4', value: '4' },
] as const

export const LearningOutcomes: CollectionConfig<'learning-outcomes'> = {
  slug: 'learning-outcomes',
  labels: {
    singular: 'Learning outcome',
    plural: 'Learning outcomes',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: anyone,
  },
  defaultPopulate: {
    code: true,
    title: true,
    slug: true,
    shortDescription: true,
  },
  admin: {
    group: 'Taxonomy',
    defaultColumns: ['code', 'title', 'sortOrder', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'The outcomes you are assessed on, in your programme\u2019s own wording. Projects link to these, which is what lets /learning-outcomes list the evidence per outcome.',
    pagination: { defaultLimit: 50 },
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'code',
          type: 'text',
          label: 'Code',
          required: true,
          unique: true,
          admin: {
            width: '30%',
            description: 'Short handle, for example "LO1".',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: { width: '70%' },
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short description',
      admin: {
        description: 'One or two lines, used on cards and the overview.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Official wording',
      admin: {
        description: 'Paste the exact text from your programme so assessors recognise it.',
      },
    },
    {
      name: 'levels',
      type: 'array',
      label: 'Level descriptors',
      labels: { singular: 'Level', plural: 'Levels' },
      admin: {
        description: 'Optional. What each level means for this outcome.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'level',
          type: 'select',
          label: 'Level',
          required: true,
          options: [...PROFICIENCY_LEVEL_OPTIONS],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
    slugField({ useAsSlug: 'title', position: 'sidebar' }),
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lowest first, so LO1 stays above LO2.',
      },
    },
  ],
}
