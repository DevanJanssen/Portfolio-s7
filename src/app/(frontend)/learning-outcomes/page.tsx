import type { Metadata } from 'next'
import Link from 'next/link'

import { learningOutcomePath } from '@/utilities/learningOutcomePath'
import { PROJECTS_PATH } from '@/utilities/projectPath'
import { queryLearningOutcomesWithEvidence } from '@/utilities/queryProjects'
import styles from './index.module.scss'

export const generateMetadata = (): Metadata => ({
  title: 'Learning outcomes',
  description: 'My work indexed by learning outcome, with the evidence behind each claim.',
})

const LearningOutcomesPage = async () => {
  const outcomes = await queryLearningOutcomesWithEvidence()

  return (
    <article className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Learning outcomes</h1>
          <p className={styles.intro}>
            The same work as on <Link href={PROJECTS_PATH}>the projects page</Link>, indexed the way
            it is assessed: per outcome, with the evidence and the level I claim.
          </p>
        </header>

        {outcomes.length > 0 ? (
          <ul className={styles.list}>
            {outcomes.map(({ outcome, entries }) => {
              const levels = [
                ...new Set(entries.map((entry) => entry.level).filter(Boolean)),
              ].sort()

              return (
                <li className={styles.item} key={outcome.id}>
                  <p className={styles.code}>{outcome.code}</p>
                  <h2 className={styles.title}>
                    <Link href={learningOutcomePath(outcome.slug)}>{outcome.title}</Link>
                  </h2>
                  {outcome.shortDescription ? (
                    <p className={styles.description}>{outcome.shortDescription}</p>
                  ) : null}
                  <p className={styles.count}>
                    {entries.length === 0
                      ? 'No evidence yet'
                      : `${entries.length} ${entries.length === 1 ? 'project' : 'projects'}`}
                    {levels.length > 0 ? ` · up to level ${levels[levels.length - 1]}` : ''}
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className={styles.empty}>
            No learning outcomes defined yet. Add them under Taxonomy → Learning outcomes in the
            admin.
          </p>
        )}
      </div>
    </article>
  )
}

export default LearningOutcomesPage
