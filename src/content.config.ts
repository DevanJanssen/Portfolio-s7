import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({ pattern: '*/index.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shown under the title on the list: "Development & Design / 2026". */
      category: z.string(),
      year: z.number().int(),
      /** Lower comes first on the list. */
      order: z.number().default(0),
      intro: z.string(),
      role: z.string(),
      context: z.string(),
      focus: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** Logos on white look best contained on a solid background; screenshots use 'cover'. */
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      coverBackground: z.string().optional(),
      /** Optional short muted loop for the hover preview, path under /public. */
      previewVideo: z.string().optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { projects }
