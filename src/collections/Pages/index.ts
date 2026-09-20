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
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { populatePath, resaveChildren } from './hooks/populatePath'
import { revalidatePage, revalidatePageDelete } from './hooks/revalidatePage'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: authenticatedOrPublished,
  },
  // Wat er wordt meegeladen als een ander document naar een pagina verwijst.
  // Zonder dit trekt elke link in een menu de volledige layout van de doelpagina
  // mee — inclusief alle blokken.
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    useAsTitle: 'title',
    // Deze lijst draagt zware blok- en rich-text-velden; een grote pagina maakt
    // de lijstweergave anders traag.
    pagination: { defaultLimit: 25 },
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'pages', path: (data?.path as string) ?? '/' }),
    },
    preview: (data) =>
      generatePreviewPath({ collection: 'pages', path: (data?.path as string) ?? '/' }),
  },
  hooks: {
    beforeChange: [populatePath],
    afterChange: [resaveChildren, revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Blocks',
              blocks: pageBlocks,
              required: true,
              admin: {
                initCollapsed: true,
                // Houdt de blokconfiguratie uit de kolomstatus van de
                // lijstweergave. Bij een handvol blokken merk je dat niet; bij
                // enkele tientallen scheelt het honderden kilobytes per
                // lijstrender.
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
              label: 'Exclude from search engines (noindex)',
              admin: {
                description:
                  'The page stays reachable, but drops out of the sitemap and gets a noindex tag.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Parent page',
      admin: {
        position: 'sidebar',
        description: 'Decides where the page sits in the URL.',
      },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
      validate: (value: unknown, { id }: { id?: number | string }) => {
        if (value && id && String(value) === String(id)) {
          return 'A page cannot be its own parent.'
        }

        return true
      },
    },
    // `disableUnique`: de slug hoeft alleen binnen zijn ouder uniek te zijn, niet
    // over de hele site. De unieke index staat op `path`, dat de ouderketen al
    // in zich draagt.
    slugField({ useAsSlug: 'title', position: 'sidebar', disableUnique: true }),
    {
      name: 'path',
      type: 'text',
      label: 'Path',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Derived from the slug and the parent page.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published at',
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
        // Draft preview leunt hierop: zonder autosave ziet de live preview pas
        // iets nadat de redacteur handmatig opslaat.
        interval: 375,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
