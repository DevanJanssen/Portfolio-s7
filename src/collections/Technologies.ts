import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

export const TECHNOLOGY_CATEGORY_OPTIONS = [
  { label: 'Language', value: 'language' },
  { label: 'Framework', value: 'framework' },
  { label: 'Database', value: 'database' },
  { label: 'Infrastructure & cloud', value: 'infrastructure' },
  { label: 'Tooling', value: 'tooling' },
  { label: 'Design', value: 'design' },
] as const

export const Technologies: CollectionConfig<'technologies'> = {
  slug: 'technologies',
  labels: {
    singular: 'Technology',
    plural: 'Technologies',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: anyone,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    category: true,
    logo: true,
  },
  admin: {
    group: 'Taxonomy',
    defaultColumns: ['name', 'category', 'updatedAt'],
    useAsTitle: 'name',
    description:
      'The stack you pick per project. Keeping these as documents instead of free text is what makes "everything I built with React" possible.',
    pagination: { defaultLimit: 50 },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      defaultValue: 'framework',
      options: [...TECHNOLOGY_CATEGORY_OPTIONS],
      admin: {
        description: 'Groups the technology on the skills overview.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Optional. Square, transparent background works best.',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website',
    },
    slugField({ useAsSlug: 'name', position: 'sidebar' }),
  ],
}
