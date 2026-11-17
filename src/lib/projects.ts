import { getCollection, type CollectionEntry } from 'astro:content'

export type Project = CollectionEntry<'projects'>

/** Published projects in list order (lowest `order` first, then newest year). */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft)
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year)
}

export const subtitle = (p: Project) => `${p.data.category} / ${p.data.year}`
export const href = (p: Project) => `/projects/${p.id}/`
