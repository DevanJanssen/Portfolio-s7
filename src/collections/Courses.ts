import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

export const Courses: CollectionConfig<'courses'> = {
  slug: 'courses',
  labels: {
    singular: 'Course',
    plural: 'Courses',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: anyone,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    semester: true,
  },
  admin: {
    group: 'Taxonomy',
    defaultColumns: ['title', 'semester', 'institution', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'Modules and semesters you can attach to a school project. Replaces the hard-coded dropdown, so adding one no longer needs a deploy.',
    pagination: { defaultLimit: 50 },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'semester',
          type: 'text',
          label: 'Semester',
          admin: {
            width: '50%',
            description: 'For example "S7". Used to order the study timeline.',
          },
        },
        {
          name: 'institution',
          type: 'text',
          label: 'Institution',
          defaultValue: 'Fontys ICT',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    slugField({ useAsSlug: 'title', position: 'sidebar' }),
  ],
}
