import type { Metadata } from 'next'

import AssignmentCard from '@/components/AssignmentCard'
import {
  ASSIGNMENT_KIND_ORDER,
  assignmentKindLabel,
  type AssignmentKind,
} from '@/collections/Assignments/options'
import type { Assignment } from '@/payload-types'
import { queryPublishedAssignments } from '@/utilities/queryAssignmentBySlug'
import styles from './index.module.scss'

export const generateMetadata = (): Metadata => ({
  title: 'Opdrachten',
  description: 'Overzicht van school-, werk- en side projects.',
})

const groupByKind = (assignments: Assignment[]) => {
  const groups = new Map<AssignmentKind, Assignment[]>()

  for (const kind of ASSIGNMENT_KIND_ORDER) {
    groups.set(kind, [])
  }

  for (const assignment of assignments) {
    const kind = (assignment.kind ?? 'school') as AssignmentKind
    const list = groups.get(kind) ?? groups.get('school')!
    list.push(assignment)
  }

  return ASSIGNMENT_KIND_ORDER.map((kind) => ({
    kind,
    label: assignmentKindLabel(kind) ?? kind,
    items: groups.get(kind) ?? [],
  })).filter((group) => group.items.length > 0)
}

const AssignmentsPage = async () => {
  const assignments = await queryPublishedAssignments()
  const groups = groupByKind(assignments)

  return (
    <article className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Opdrachten</h1>
          <p className={styles.intro}>
            School-, werk- en side projects. Voeg er een toe onder Inhoud → Opdrachten en kies het
            soort project.
          </p>
        </header>

        {groups.length > 0 ? (
          <div className={styles.groups}>
            {groups.map((group) => (
              <section key={group.kind}>
                <h2 className={styles.groupTitle}>{group.label}</h2>
                <ul className={styles.grid}>
                  {group.items.map((assignment) => (
                    <li key={assignment.id}>
                      <AssignmentCard assignment={assignment} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nog geen gepubliceerde opdrachten.</p>
        )}
      </div>
    </article>
  )
}

export default AssignmentsPage
