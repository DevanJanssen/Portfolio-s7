export const ASSIGNMENTS_PATH = '/opdrachten'

/** Publiek pad van een opdracht, of het overzicht als de slug ontbreekt. */
export const assignmentPath = (slug: string | null | undefined): string => {
  if (!slug) return ASSIGNMENTS_PATH

  return `${ASSIGNMENTS_PATH}/${slug}`
}
