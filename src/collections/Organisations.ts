import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

export const ORGANISATION_TYPE_OPTIONS = [
  { label: 'Employer', value: 'employer' },
  { label: 'Client', value: 'client' },
  { label: 'School', value: 'school' },
] as const

export const Organisations: CollectionConfig<'organisations'> = {
  slug: 'organisations',
  labels: {
    singular: 'Organisation',
    plural: 'Organisations',
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
    type: true,
    logo: true,
  },
  admin: {
    group: 'Taxonomy',
    defaultColumns: ['name', 'type', 'updatedAt'],
    useAsTitle: 'name',
    description: 'Employers, clients and schools you can attach to a project.',
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
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      defaultValue: 'client',
      options: [...ORGANISATION_TYPE_OPTIONS],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website',
    },
    slugField({ useAsSlug: 'name', position: 'sidebar' }),
  ],
}
