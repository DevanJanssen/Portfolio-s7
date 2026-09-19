import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { canEditContent, isAdmin } from '@/access/roles'
import { pageBlocks } from '@/blocks'
import { assignmentPath } from '@/utilities/assignmentPath'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateAssignment, revalidateAssignmentDelete } from './hooks/revalidateAssignment'
import { ASSIGNMENT_COURSE_OPTIONS, ASSIGNMENT_KIND_OPTIONS } from './options'

export const Assignments: CollectionConfig<'assignments'> = {
  slug: 'assignments',
  labels: {
    singular: 'Opdracht',
    plural: 'Opdrachten',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: authenticatedOrPublished,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    kind: true,
    course: true,
    period: true,
    summary: true,
    cover: true,
  },
  admin: {
    group: 'Inhoud',
    defaultColumns: ['title', 'kind', 'course', 'period', '_status', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'Eén document per project (school, werk of side). Het overzicht staat op /opdrachten; elk project krijgt /opdrachten/<slug>.',
    pagination: { defaultLimit: 25 },
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          collection: 'assignments',
          path: assignmentPath(data?.slug as string),
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        collection: 'assignments',
        path: assignmentPath(data?.slug as string),
      }),
  },
  hooks: {
    afterChange: [revalidateAssignment],
    afterDelete: [revalidateAssignmentDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Opdracht',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Soort project',
                  required: true,
                  defaultValue: 'school',
                  options: [...ASSIGNMENT_KIND_OPTIONS],
                  admin: {
                    width: '50%',
                    description: 'School, werk of side project — bepaalt de sectie op /opdrachten.',
                  },
                },
                {
                  name: 'course',
                  type: 'select',
                  label: 'Vak / module',
                  options: [...ASSIGNMENT_COURSE_OPTIONS],
                  admin: {
                    width: '50%',
                    description: 'Alleen relevant voor schoolprojecten. Lijst aanpassen in Assignments/options.ts.',
                    condition: (_, siblingData) => siblingData?.kind === 'school',
                  },
                },
              ],
            },
            {
              name: 'period',
              type: 'text',
              label: 'Periode',
              admin: {
                description: 'Bijvoorbeeld "Semester 2, 2026" of "2024 – 2025".',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'Samenvatting',
              admin: {
                description: 'Korte beschrijving op het overzicht en bovenaan de opdrachtpagina.',
              },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              label: 'Coverbeeld',
            },
            {
              name: 'competencies',
              type: 'array',
              label: 'Leeruitkomsten',
              labels: { singular: 'Leeruitkomst', plural: 'Leeruitkomsten' },
              admin: {
                description: 'Wat je met deze opdracht aantoont. Komt als lijst op de pagina.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Naam',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Toelichting',
                },
              ],
            },
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              labels: { singular: 'Link', plural: 'Links' },
              admin: {
                description: 'GitHub, live demo, Figma, rapport — wat bij de opdracht hoort.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Inhoud',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Blokken',
              blocks: pageBlocks,
              admin: {
                description:
                  'Het verhaal van de opdracht: proces, screenshots, reflectie. Leeg laten mag; de velden onder Opdracht staan dan alleen.',
                initCollapsed: true,
                disableListColumn: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({ hasGenerateFn: true }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Uitsluiten van zoekmachines (noindex)',
            },
          ],
        },
      ],
    },
    slugField({ useAsSlug: 'title', position: 'sidebar' }),
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Gepubliceerd op',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date()

            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
