import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

export const Logos: CollectionConfig<'logos'> = {
  slug: 'logos',
  labels: {
    singular: 'Logo',
    plural: 'Logos',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    read: anyone,
    update: canEditContent,
  },
  defaultPopulate: {
    name: true,
    logo: true,
  },
  admin: {
    group: 'Taxonomy',
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description:
      'The library for the sliding strip. Put them on a page with the "Important projects" block; the same logo may appear on several pages.',
    pagination: { defaultLimit: 50 },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'Such as "OpenAI" or "Vercel". This is what you see when picking it in a block.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description:
          'The wordmark or symbol in the strip. Use an SVG or PNG with a transparent background, preferably in one colour: the logo takes on the colour of the page.',
      },
    },
  ],
}

export default Logos
