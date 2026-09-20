import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidateGlobal'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: anyone,
    update: canEditContent,
  },
  admin: {
    group: 'Site settings',
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'note',
      type: 'text',
      label: 'Copyright line',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Links',
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
