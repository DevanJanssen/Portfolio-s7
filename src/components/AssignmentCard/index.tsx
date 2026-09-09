import Link from 'next/link'

import Media from '@/components/Media'
import type { Assignment } from '@/payload-types'
import { assignmentPath } from '@/utilities/assignmentPath'
import styles from './index.module.scss'

type Props = {
  assignment: Assignment
}

export const AssignmentCard = ({ assignment }: Props) => {
  const href = assignmentPath(assignment.slug)
  const meta = [assignment.course, assignment.period].filter(Boolean).join(' · ')

  return (
    <article className={styles.card}>
      <Link className={styles.link} href={href}>
        {assignment.cover && typeof assignment.cover === 'object' ? (
          <Media className={styles.cover} resource={assignment.cover} sizes="(min-width: 1024px) 30vw, 100vw" />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.body}>
          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <h3 className={styles.title}>{assignment.title}</h3>
          {assignment.summary ? <p className={styles.summary}>{assignment.summary}</p> : null}
        </div>
      </Link>
    </article>
  )
}

export default AssignmentCard
