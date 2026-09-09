import type { Field } from 'payload'

/**
 * `anchor` is de tegenhanger van het `anchor`-veld op een link: een redacteur
 * zet hier een id op een blok en kan er daarna vanuit elke link naartoe
 * springen.
 */
export const anchorField: Field = {
  name: 'anchor',
  type: 'text',
  label: 'Anker',
  admin: {
    description:
      'Optioneel. Alleen letters, cijfers en streepjes. Een link kan hiernaartoe springen met #anker.',
  },
  validate: (value: string | null | undefined) => {
    if (!value) return true

    return /^[a-z0-9][a-z0-9-]*$/.test(value)
      ? true
      : 'Gebruik alleen kleine letters, cijfers en streepjes, beginnend met een letter of cijfer.'
  },
}

/** De achtergrond die `components/Section` op het blok zet. */
export const backgroundField: Field = {
  name: 'background',
  type: 'select',
  label: 'Achtergrond',
  defaultValue: 'none',
  options: [
    { label: 'Geen', value: 'none' },
    { label: 'Licht', value: 'light' },
    { label: 'Donker', value: 'dark' },
  ],
}

type SectionTabsOptions = {
  /**
   * `false` laat de achtergrondkeuze weg — voor een blok dat zijn eigen
   * achtergrond meebrengt, zoals een hero met een foto.
   */
  background?: boolean
  /** Layoutvelden van dit blok zelf; komen bovenaan het tabblad Layout. */
  layout?: Field[]
}

/**
 * De veldindeling die élk blok krijgt: twee tabbladen bovenaan, Inhoud en
 * Layout.
 *
 * De tabbladen hebben geen `name`, en dat is het hele punt: een naamloos tabblad
 * bestaat alleen in de admin en laat de velden eronder gewoon op hun plek in het
 * document staan. Deze indeling kost dus geen migratie, en velden verplaatsen
 * tussen de twee tabbladen ook niet.
 *
 * Wat waar hoort: alles waar een bezoeker naar kijkt of op klikt in Inhoud, en
 * de knoppen die bepalen hóe het blok op de pagina staat in Layout.
 */
export const sectionTabs = (
  content: Field[],
  { background = true, layout = [] }: SectionTabsOptions = {},
): Field => ({
  type: 'tabs',
  tabs: [
    {
      label: 'Inhoud',
      fields: content,
    },
    {
      label: 'Layout',
      fields: [...layout, anchorField, ...(background ? [backgroundField] : [])],
    },
  ],
})
