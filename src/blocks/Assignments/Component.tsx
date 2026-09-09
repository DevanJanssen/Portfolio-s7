import AssignmentCard from '@/components/AssignmentCard'
import Section from '@/components/Section'
import type { AssignmentsBlock as AssignmentsBlockProps } from '@/payload-types'
import { queryPublishedAssignments } from '@/utilities/queryAssignmentBySlug'
import styles from './index.module.scss'

export const AssignmentsBlockComponent = async ({
  anchor,
  background,
  heading,
  intro,
  limit,
}: AssignmentsBlockProps) => {
  const assignments = await queryPublishedAssignments()
  const items = typeof limit === 'number' && limit > 0 ? assignments.slice(0, limit) : assignments

  if (items.length === 0) return null

  return (
    <Section anchor={anchor} background={background} className={styles.assignments}>
      <div className="container">
        {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
        {intro ? <p className={styles.intro}>{intro}</p> : null}

        <ul className={styles.grid}>
          {items.map((assignment) => (
            <li key={assignment.id}>
              <AssignmentCard assignment={assignment} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default AssignmentsBlockComponent
