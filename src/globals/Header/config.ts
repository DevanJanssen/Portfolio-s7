import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: anyone,
    update: canEditContent,
  },
  admin: {
    group: 'Site-instellingen',
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Sitenaam',
      defaultValue: 'Portfolio',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu-items',
      maxRows: 8,
      fields: [link({ appearances: false })],
      admin: {
        components: {
          RowLabel: '@/fields/LinkRowLabel#LinkRowLabel',
        },
      },
    },
  ],
}
