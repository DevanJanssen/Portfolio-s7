import {
  PROJECT_STATUS_OPTIONS,
  projectKindLabel,
  type ProjectKind,
} from '@/collections/Projects/options'
import type { Course, Organisation, Project, Technology } from '@/payload-types'

const MONTH_YEAR = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' })

const formatMonth = (value: string): string | null => {
  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? null : MONTH_YEAR.format(date)
}

/**
 * "Sep 2025 – Jan 2026", or "Sep 2025 – present" while it is still running.
 * Collapses to a single label when start and end fall in the same month.
 */
export const formatProjectPeriod = (project: Project): string | null => {
  const start = project.startDate ? formatMonth(project.startDate) : null
  const end = project.endDate ? formatMonth(project.endDate) : null

  if (!start && !end) return null
  if (!start) return end
  if (!end) return `${start} – present`
  if (start === end) return start

  return `${start} – ${end}`
}

/**
 * The organisation as it may be shown. An NDA project keeps its alias, so the
 * work can still be described without naming the client.
 */
export const projectOrganisationName = (project: Project): string | null => {
  if (project.visibility === 'anonymised' || project.visibility === 'on-request') {
    return project.clientAlias?.trim() || 'Confidential client'
  }

  const organisation = project.organisation

  if (organisation && typeof organisation === 'object') {
    return (organisation as Organisation).name ?? null
  }

  return null
}

export const projectCourseTitle = (project: Project): string | null => {
  const course = project.course

  if (course && typeof course === 'object') {
    return (course as Course).title ?? null
  }

  return null
}

export const projectTechnologies = (project: Project): Technology[] => {
  const stack = project.techStack

  if (!Array.isArray(stack)) return []

  return stack.filter((item): item is Technology => typeof item === 'object' && item !== null)
}

export const projectStatusLabel = (project: Project): string | null =>
  PROJECT_STATUS_OPTIONS.find((option) => option.value === project.projectStatus)?.label ?? null

export const projectTeamLabel = (project: Project): string | null => {
  if (typeof project.teamSize !== 'number') return null

  return project.teamSize <= 1 ? 'Solo project' : `Team of ${project.teamSize}`
}

/**
 * The single meta line above a project title. Kept in one place so the card and
 * the detail page never drift apart.
 */
export const projectContextLabel = (project: Project): string =>
  [
    projectKindLabel(project.kind as ProjectKind),
    projectCourseTitle(project) ?? projectOrganisationName(project),
    formatProjectPeriod(project),
  ]
    .filter(Boolean)
    .join(' · ')
