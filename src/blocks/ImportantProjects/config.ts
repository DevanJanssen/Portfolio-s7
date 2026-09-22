import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { sectionTabs } from '@/fields/sectionFields'

/**
 * The maximum number of projects in one block.
 *
 * This limit is technical rather than editorial: opening a project happens
 * without JavaScript, with one CSS rule per position in the list. Those rules
 * live in `index.module.scss` as a loop up to `$max-projects` — change the two
 * together.
 *
 * There is an editorial side to it too: every extra project is another screen
 * height of scrolling through the stack before the list comes into view.
 */
export const MAX_IMPORTANT_PROJECTS = 6

export const ImportantProjectsBlock: Block = {
  slug: 'importantProjects',
  interfaceName: 'ImportantProjectsBlock',
  /**
   * Postgres cuts table and enum names off at 63 characters, and the longest one
   * this block generates runs over: the appearance of a button in the version
   * history comes out as `enum__projects_v_blocks_important_projects_links_link_appearance`,
   * one character too long. So the block gets a shorter name in the database;
   * `importantProjects` stays the slug, and nothing an editor sees changes.
   *
   * As a function and not as a string, and that matters: a string replaces the
   * *whole* table name, prefix and all, so both `pages` and `projects` would
   * want one and the same table. The argument is the name of the parent table,
   * which keeps them apart the way the default does.
   */
  dbName: ({ tableName }) => `${tableName}_blocks_key_projects`,
  labels: {
    singular: 'Important projects',
    plural: 'Important project blocks',
  },
  fields: [
    sectionTabs([
      {
        name: 'heading',
        type: 'textarea',
        label: 'Heading',
        required: true,
        admin: {
          description: 'The line above the stack, for example "The work I am most proud of."',
        },
      },
      {
        name: 'projects',
        type: 'relationship',
        relationTo: 'projects',
        hasMany: true,
        required: true,
        minRows: 1,
        maxRows: MAX_IMPORTANT_PROJECTS,
        label: 'Projects',
        admin: {
          description:
            'The projects arrive as a stack of browser windows that slide away one by one as you scroll; the first stays put and travels to the window beside the list. After that they open one by one — the line above a project shows how much scrolling that still takes — and a visitor can also click one open. Drag to set the order: every extra project is nearly two screen heights of extra scrolling. Title, tagline, summary, cover and tech stack all come from the project itself, so editing the project updates this block.',
        },
      },
      {
        name: 'tools',
        type: 'relationship',
        relationTo: 'logos',
        hasMany: true,
        label: 'Logo strip',
        admin: {
          description:
            'The logos sliding past below the projects. Pick from the library under Taxonomy → Logos. Pick enough to fill the strip; drag to set the order.',
        },
      },
      linkGroup({
        appearances: ['default', 'outline', 'plain'],
        overrides: {
          label: 'Buttons',
          maxRows: 2,
          admin: {
            description: 'The buttons at the bottom of the block.',
          },
        },
      }),
    ]),
  ],
}

export default ImportantProjectsBlock
