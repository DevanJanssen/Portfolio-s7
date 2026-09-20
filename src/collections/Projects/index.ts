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
import { PROFICIENCY_LEVEL_OPTIONS } from '@/collections/LearningOutcomes'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { projectPath } from '@/utilities/projectPath'
import { revalidateProject, revalidateProjectDelete } from './hooks/revalidateProject'
import {
  PROJECT_KIND_OPTIONS,
  PROJECT_LINK_TYPE_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_VISIBILITY_OPTIONS,
} from './options'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    read: authenticatedOrPublished,
  },
  // What gets loaded when another document links to a project. Without this,
  // every card in a listing drags the full block layout along with it.
  defaultPopulate: {
    title: true,
    slug: true,
    kind: true,
    tagline: true,
    cover: true,
    projectStatus: true,
    startDate: true,
    endDate: true,
    role: true,
    course: true,
    organisation: true,
    visibility: true,
    clientAlias: true,
    techStack: true,
    featured: true,
    sortOrder: true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'kind', 'projectStatus', 'startDate', '_status', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'One document per project, whether it is school, work or side. The overview lives at /projects; each project gets /projects/<slug>.',
    pagination: { defaultLimit: 25 },
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({
          collection: 'projects',
          path: projectPath(data?.slug as string),
        }),
    },
    preview: (data) =>
      generatePreviewPath({
        collection: 'projects',
        path: projectPath(data?.slug as string),
      }),
  },
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectDelete],
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
        // ------------------------------------------------------------------
        // Everything the overview cards need, plus the framing of the project.
        // ------------------------------------------------------------------
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  label: 'Kind of project',
                  required: true,
                  defaultValue: 'school',
                  options: [...PROJECT_KIND_OPTIONS],
                  admin: {
                    width: '50%',
                    description: 'Decides which section of /projects it lands in.',
                  },
                },
                {
                  // Not `status`: drafts already claim `_status`, and both would
                  // generate the same `enum_projects_status` type.
                  name: 'projectStatus',
                  type: 'select',
                  label: 'Status',
                  required: true,
                  defaultValue: 'completed',
                  options: [...PROJECT_STATUS_OPTIONS],
                  admin: {
                    width: '50%',
                    description: 'Tells a visitor whether the demo link is still worth clicking.',
                  },
                },
              ],
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              maxLength: 120,
              admin: {
                description:
                  'One line on the card. Keep it short so cards stay the same height — the longer version goes in the summary.',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'Summary',
              admin: {
                description: 'The opening paragraph of the project page.',
              },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              label: 'Cover image',
              admin: {
                description: 'Carries the card. A project without one looks unfinished.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  label: 'Start date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' },
                    description: 'Drives chronological sorting and the timeline.',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  label: 'End date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'monthOnly', displayFormat: 'MMMM yyyy' },
                    description: 'Leave empty if the project is still running.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'role',
                  type: 'text',
                  label: 'My role',
                  admin: {
                    width: '50%',
                    description: 'For example "Full-stack developer" or "Tech lead".',
                  },
                },
                {
                  name: 'teamSize',
                  type: 'number',
                  label: 'Team size',
                  min: 1,
                  admin: {
                    width: '50%',
                    description: 'Including yourself. 1 renders as "solo project".',
                  },
                },
              ],
            },
            {
              name: 'course',
              type: 'relationship',
              relationTo: 'courses',
              label: 'Course / module',
              admin: {
                condition: (_, siblingData) => siblingData?.kind === 'school',
              },
            },
            {
              name: 'organisation',
              type: 'relationship',
              relationTo: 'organisations',
              label: 'Organisation',
              admin: {
                condition: (_, siblingData) => siblingData?.kind !== 'side',
                description: 'The employer, client or school this project belongs to.',
              },
            },
            {
              name: 'techStack',
              type: 'relationship',
              relationTo: 'technologies',
              hasMany: true,
              label: 'Tech stack',
              admin: {
                description: 'Everything you actually worked with. Powers filtering by technology.',
              },
            },
          ],
        },
        // ------------------------------------------------------------------
        // The six questions every project should answer, in reading order.
        // ------------------------------------------------------------------
        {
          label: 'Story',
          fields: [
            {
              name: 'problem',
              type: 'richText',
              label: 'The problem',
              admin: {
                description:
                  'What needed solving, and for whom. Skipping straight to the tech loses the reader.',
              },
            },
            {
              name: 'approach',
              type: 'richText',
              label: 'Approach',
              admin: {
                description: 'How you tackled it: research, choices made, trade-offs.',
              },
            },
            {
              name: 'myContribution',
              type: 'richText',
              label: 'What I did',
              admin: {
                description:
                  'Your part, separate from the team\u2019s. Both assessors and recruiters ask this first on group work.',
              },
            },
            {
              name: 'outcome',
              type: 'richText',
              label: 'Outcome',
              admin: {
                description:
                  'What came of it — shipped, handed over, graded, abandoned. Honest beats impressive.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Extra sections',
              blocks: pageBlocks,
              admin: {
                description:
                  'Optional deep dive below the story: screenshots, diagrams, a long write-up.',
                initCollapsed: true,
                disableListColumn: true,
              },
            },
          ],
        },
        // ------------------------------------------------------------------
        // Artefacts. A claim with a link behind it counts; one without does not.
        // ------------------------------------------------------------------
        {
          label: 'Proof',
          fields: [
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              labels: { singular: 'Link', plural: 'Links' },
              admin: {
                description: 'Repository, live demo, report, design file.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'type',
                      type: 'select',
                      label: 'Type',
                      required: true,
                      defaultValue: 'repo',
                      options: [...PROJECT_LINK_TYPE_OPTIONS],
                      admin: { width: '60%' },
                    },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery',
              labels: { singular: 'Image', plural: 'Images' },
              admin: {
                description:
                  'Screenshots with captions. The caption is the argument — an uncaptioned screenshot proves nothing.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Caption',
                  admin: {
                    description: 'What this shows, and why it matters.',
                  },
                },
              ],
            },
            {
              name: 'documents',
              type: 'array',
              label: 'Documents',
              labels: { singular: 'Document', plural: 'Documents' },
              admin: {
                description: 'Reports, assessment forms, advisory documents.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'File',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                },
              ],
            },
          ],
        },
        // ------------------------------------------------------------------
        // The assessor-facing layer. Feeds the per-outcome view at
        // /learning-outcomes, which is why `outcome` is a relationship.
        // ------------------------------------------------------------------
        {
          label: 'Assessment',
          fields: [
            {
              name: 'learningOutcomes',
              type: 'array',
              label: 'Learning outcomes',
              labels: { singular: 'Learning outcome', plural: 'Learning outcomes' },
              admin: {
                description:
                  'What this project proves, and where. Each entry shows up under its outcome on /learning-outcomes.',
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'outcome',
                      type: 'relationship',
                      relationTo: 'learning-outcomes',
                      label: 'Outcome',
                      required: true,
                      admin: { width: '70%' },
                    },
                    {
                      name: 'level',
                      type: 'select',
                      label: 'Level',
                      options: [...PROFICIENCY_LEVEL_OPTIONS],
                      admin: { width: '30%' },
                    },
                  ],
                },
                {
                  name: 'evidence',
                  type: 'richText',
                  label: 'Evidence',
                  admin: {
                    description:
                      'Point at something concrete in this project. Link to the commit, the document, the decision.',
                  },
                },
              ],
            },
            {
              name: 'reflection',
              type: 'richText',
              label: 'Reflection',
              admin: {
                description: 'What went well, what you would do differently next time.',
              },
            },
            {
              name: 'feedback',
              type: 'array',
              label: 'Feedback received',
              labels: { singular: 'Feedback', plural: 'Feedback' },
              admin: {
                description:
                  'Quotes from a teacher, client or teammate. Far stronger evidence than self-assessment, and almost nobody includes it.',
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'source',
                      type: 'text',
                      label: 'From',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'sourceRole',
                      type: 'text',
                      label: 'Their role',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'quote',
                  type: 'textarea',
                  label: 'Quote',
                  required: true,
                },
                {
                  name: 'date',
                  type: 'date',
                  label: 'Date',
                  admin: {
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
                  },
                },
              ],
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
            },
          ],
        },
      ],
    },
    slugField({ useAsSlug: 'title', position: 'sidebar' }),
    {
      name: 'visibility',
      type: 'select',
      label: 'Visibility',
      required: true,
      defaultValue: 'public',
      options: [...PROJECT_VISIBILITY_OPTIONS],
      admin: {
        position: 'sidebar',
        description: 'Use this for work under an NDA.',
      },
    },
    {
      name: 'clientAlias',
      type: 'text',
      label: 'Client alias',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.visibility === 'anonymised',
        description: 'Shown instead of the organisation, for example "a logistics company".',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured projects lead the homepage.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lowest first within its section. Equal values fall back to newest first.',
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
        interval: 375,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
