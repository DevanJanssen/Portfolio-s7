export type ProjectKind = 'school' | 'work' | 'side'

export const PROJECT_KIND_OPTIONS: { label: string; value: ProjectKind }[] = [
  { label: 'School project', value: 'school' },
  { label: 'Work project', value: 'work' },
  { label: 'Side project', value: 'side' },
]

/** Section order on the overview: School → Work → Side. */
export const PROJECT_KIND_ORDER: ProjectKind[] = ['school', 'work', 'side']

export const PROJECT_KIND_PLURAL_LABELS: Record<ProjectKind, string> = {
  school: 'School projects',
  work: 'Work projects',
  side: 'Side projects',
}

/** Where the project stands today, so nobody clicks a demo that died last year. */
export const PROJECT_STATUS_OPTIONS = [
  { label: 'In progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Shipped and live', value: 'shipped' },
  { label: 'Archived', value: 'archived' },
] as const

/**
 * How openly the project may be described. Work projects are often covered by
 * an NDA; without this the choice becomes "overshare" or "leave out my best
 * work", and both are bad.
 */
export const PROJECT_VISIBILITY_OPTIONS = [
  { label: 'Public — name the client and show the work', value: 'public' },
  { label: 'Anonymised — describe the client generically', value: 'anonymised' },
  { label: 'On request — summary only', value: 'on-request' },
] as const

/** Drives the icon and grouping of a link, so they are not one flat list. */
export const PROJECT_LINK_TYPE_OPTIONS = [
  { label: 'Repository', value: 'repo' },
  { label: 'Live demo', value: 'demo' },
  { label: 'Report or documentation', value: 'report' },
  { label: 'Design file', value: 'design' },
  { label: 'Video', value: 'video' },
  { label: 'Package', value: 'package' },
  { label: 'Article', value: 'article' },
  { label: 'Other', value: 'other' },
] as const

export const projectKindLabel = (kind: string | null | undefined): string | null => {
  if (!kind) return null

  return PROJECT_KIND_OPTIONS.find((option) => option.value === kind)?.label ?? kind
}

export const projectKindPluralLabel = (kind: ProjectKind): string =>
  PROJECT_KIND_PLURAL_LABELS[kind] ?? kind
