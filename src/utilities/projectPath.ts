export const PROJECTS_PATH = '/projects'

/** Public path of a project, or the overview when the slug is missing. */
export const projectPath = (slug: string | null | undefined): string => {
  if (!slug) return PROJECTS_PATH

  return `${PROJECTS_PATH}/${slug}`
}
