import type { Metadata } from 'next'

import AssignmentCard from '@/components/AssignmentCard'
import { queryPublishedAssignments } from '@/utilities/queryAssignmentBySlug'
import styles from './index.module.scss'

export const generateMetadata = (): Metadata => ({
  title: 'Opdrachten',
  description: 'Overzicht van schoolopdrachten.',
})

const AssignmentsPage = async () => {
  const assignments = await queryPublishedAssignments()

  return (
    <article className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Opdrachten</h1>
          <p className={styles.intro}>
            Elke opdracht is een pagina in het CMS. Voeg er een toe onder Inhoud → Opdrachten.
          </p>
        </header>

        {assignments.length > 0 ? (
          <ul className={styles.grid}>
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <AssignmentCard assignment={assignment} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Nog geen gepubliceerde opdrachten.</p>
        )}
      </div>
    </article>
  )
}

export default AssignmentsPage
