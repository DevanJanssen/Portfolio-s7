import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearance = 'default' | 'outline' | 'plain'
export type LinkTargetType = 'reference' | 'custom' | 'mailto' | 'tel' | 'download'

const TARGET_FIELD_BY_TYPE: Record<
  LinkTargetType,
  'reference' | 'url' | 'mailto' | 'tel' | 'media'
> = {
  reference: 'reference',
  custom: 'url',
  mailto: 'mailto',
  tel: 'tel',
  download: 'media',
}

const ALL_TARGET_FIELDS = ['reference', 'url', 'mailto', 'tel', 'media'] as const

const appearanceOptions: Record<LinkAppearance, { label: string; value: LinkAppearance }> = {
  default: { label: 'Knop', value: 'default' },
  outline: { label: 'Omlijnd', value: 'outline' },
  plain: { label: 'Tekstlink', value: 'plain' },
}

const targetOptions: Record<LinkTargetType, { label: string; value: LinkTargetType }> = {
  reference: { label: 'Interne pagina', value: 'reference' },
  custom: { label: 'Aangepaste URL', value: 'custom' },
  mailto: { label: 'E-maillink (mailto)', value: 'mailto' },
  tel: { label: 'Telefoonlink (tel)', value: 'tel' },
  download: { label: 'Bestand downloaden', value: 'download' },
}

type LinkValue = {
  type?: LinkTargetType | null
  reference?: unknown
  url?: unknown
  mailto?: unknown
  tel?: unknown
  media?: unknown
}

const clearUnusedTargets = (value: unknown): unknown => {
  if (!value || typeof value !== 'object') return value

  const link = value as LinkValue
  const selected = link.type
  if (!selected || !(selected in TARGET_FIELD_BY_TYPE)) return value

  const keep = TARGET_FIELD_BY_TYPE[selected]
  let changed = false
  const next: LinkValue = { ...link }

  for (const field of ALL_TARGET_FIELDS) {
    if (field !== keep && next[field] != null) {
      next[field] = null
      changed = true
    }
  }

  return changed ? next : value
}

const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isValidPhone = (value: string): boolean => /^\+?[\d\s()-]{6,}$/.test(value)
const isValidURL = (value: string): boolean =>
  value.startsWith('/') || value.startsWith('#') || /^https?:\/\//.test(value)

type LinkOptions = {
  appearances?: LinkAppearance[] | false
  disableLabel?: boolean
  targetTypes?: LinkTargetType[]
  overrides?: Partial<GroupField>
}

export const link = ({
  appearances,
  disableLabel = false,
  targetTypes = ['reference', 'custom', 'mailto', 'tel', 'download'],
  overrides = {},
}: LinkOptions = {}): Field => {
  const available = Array.from(new Set(targetTypes))

  const linkField: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    hooks: {
      beforeValidate: [({ value }) => clearUnusedTargets(value)],
    },
    validate: (value) => {
      if (!value || typeof value !== 'object') return true

      const current = value as LinkValue
      const type = current.type

      if (!type) return true
      if (!available.includes(type)) return 'Dit linktype is hier niet beschikbaar.'

      if (type === 'custom') {
        const url = typeof current.url === 'string' ? current.url.trim() : ''
        if (!url) return 'Geef een URL op.'
        if (!isValidURL(url)) {
          return 'Geef een geldige URL op (bijvoorbeeld /contact, #sectie of https://example.com).'
        }
      }

      if (type === 'mailto') {
        const mailto = typeof current.mailto === 'string' ? current.mailto.trim() : ''
        if (!mailto) return 'Geef een e-mailadres op.'
        if (!isValidEmail(mailto)) return 'Geef een geldig e-mailadres op.'
      }

      if (type === 'tel') {
        const tel = typeof current.tel === 'string' ? current.tel.trim() : ''
        if (!tel) return 'Geef een telefoonnummer op.'
        if (!isValidPhone(tel)) return 'Geef een geldig telefoonnummer op.'
      }

      return true
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: available[0],
        options: available.map((type) => targetOptions[type]),
      },
      {
        type: 'row',
        fields: [
          {
            name: 'reference',
            type: 'relationship',
            relationTo: 'pages',
            label: 'Pagina',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'reference',
            },
          },
          {
            name: 'url',
            type: 'text',
            label: 'URL',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'custom',
              placeholder: 'https://example.com',
            },
          },
          {
            name: 'mailto',
            type: 'text',
            label: 'E-mailadres',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'mailto',
              placeholder: 'naam@example.com',
            },
          },
          {
            name: 'tel',
            type: 'text',
            label: 'Telefoonnummer',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'tel',
              placeholder: '+31 6 1234 5678',
            },
          },
          {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            label: 'Bestand',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'download',
            },
          },
        ],
      },
      {
        name: 'anchor',
        type: 'text',
        label: 'Anker op de pagina',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
          description:
            'Optioneel. Laat de link naar een sectie springen; een blok krijgt een anker via Layout → Anker.',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Openen in een nieuw tabblad',
      },
    ],
  }

  if (!disableLabel) {
    linkField.fields.push({
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
    })
  }

  if (appearances !== false) {
    const options = (appearances ?? ['default', 'outline', 'plain']).map(
      (appearance) => appearanceOptions[appearance],
    )

    linkField.fields.push({
      name: 'appearance',
      type: 'select',
      label: 'Weergave',
      defaultValue: options[0]?.value,
      options,
    })
  }

  return deepMerge(linkField, overrides)
}
