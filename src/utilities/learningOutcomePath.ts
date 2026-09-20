export const LEARNING_OUTCOMES_PATH = '/learning-outcomes'

/** Public path of a learning outcome, or the overview when the slug is missing. */
export const learningOutcomePath = (slug: string | null | undefined): string => {
  if (!slug) return LEARNING_OUTCOMES_PATH

  return `${LEARNING_OUTCOMES_PATH}/${slug}`
}
