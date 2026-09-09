import type { ArrayField, Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { link, type LinkAppearance } from './link'

type LinkGroupOptions = {
  appearances?: LinkAppearance[] | false
  overrides?: Partial<ArrayField>
}

/** Een rij links, bijvoorbeeld de knoppen onder een hero. */
export const linkGroup = ({ appearances, overrides = {} }: LinkGroupOptions = {}): Field => {
  const field: ArrayField = {
    name: 'links',
    type: 'array',
    label: 'Links',
    fields: [link({ appearances })],
    admin: {
      components: {
        RowLabel: '@/fields/LinkRowLabel#LinkRowLabel',
      },
    },
  }

  return deepMerge(field, overrides)
}
