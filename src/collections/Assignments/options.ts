export type AssignmentKind = 'school' | 'work' | 'side'

export const ASSIGNMENT_KIND_OPTIONS: { label: string; value: AssignmentKind }[] = [
  { label: 'School Projects', value: 'school' },
  { label: 'Work Projects', value: 'work' },
  { label: 'Side Projects', value: 'side' },
]

/** Volgorde op het overzicht: School → Work → Side. */
export const ASSIGNMENT_KIND_ORDER: AssignmentKind[] = ['school', 'work', 'side']

/**
 * Vooraf gedefinieerde vakken/modules. Pas deze lijst aan als je studie
 * andere namen gebruikt — de CMS-dropdown leest hiervandaan.
 */
export const ASSIGNMENT_COURSE_OPTIONS: { label: string; value: string }[] = [
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Project', value: 'Project' },
  { label: 'User Experience', value: 'User Experience' },
  { label: 'Databases', value: 'Databases' },
  { label: 'Software Design', value: 'Software Design' },
  { label: 'Infrastructure', value: 'Infrastructure' },
  { label: 'Security', value: 'Security' },
  { label: 'Overig', value: 'Overig' },
]

export const assignmentKindLabel = (kind: string | null | undefined): string | null => {
  if (!kind) return null

  return ASSIGNMENT_KIND_OPTIONS.find((option) => option.value === kind)?.label ?? kind
}
