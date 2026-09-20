import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import { LEARNING_OUTCOMES_PATH, learningOutcomePath } from '@/utilities/learningOutcomePath'
import { projectContextLabel } from '@/utilities/projectMeta'
import { projectPath } from '@/utilities/projectPath'
import { queryLearningOutcomeBySlug } from '@/utilities/queryProjects'
import styles from './index.module.scss'

type Args = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'learning-outcomes',
    depth: 0,
    limit: 100,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
  })

  return docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params
  const result = await queryLearningOutcomeBySlug(slug)

  if (!result) return {}

  return {
    title: `${result.outcome.code} — ${result.outcome.title}`,
    description: result.outcome.shortDescription ?? undefined,
    alternates: { canonical: learningOutcomePath(slug) },
  }
}

const LearningOutcomePage = async ({ params }: Args) => {
  const { slug } = await params
  const result = await queryLearningOutcomeBySlug(slug)

  if (!result) notFound()

  const { outcome, entries } = result
  const levels = outcome.levels ?? []

  return (
    <article className={styles.page}>
      <div className="container container--narrow">
        <header className={styles.header}>
          <p className={styles.back}>
            <Link href={LEARNING_OUTCOMES_PATH}>All learning outcomes</Link>
          </p>
          <p className={styles.code}>{outcome.code}</p>
          <h1>{outcome.title}</h1>
          {outcome.shortDescription ? (
            <p className={styles.intro}>{outcome.shortDescription}</p>
          ) : null}
          <RichText data={outcome.description} />
        </header>

        {levels.length > 0 ? (
          <section className={styles.levels}>
            <h2>Levels</h2>
            <dl>
              {levels.map((level) => (
                <div className={styles.level} key={level.id ?? level.level}>
                  <dt>Level {level.level}</dt>
                  <dd>{level.description}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className={styles.evidence}>
          <h2>Evidence</h2>

          {entries.length > 0 ? (
            <ul className={styles.entryList}>
              {entries.map(({ project, level, evidence }) => (
                <li className={styles.entry} key={project.id}>
                  <h3>
                    <Link href={projectPath(project.slug)}>{project.title}</Link>
                    {level ? <span className={styles.badge}>Level {level}</span> : null}
                  </h3>
                  <p className={styles.projectMeta}>{projectContextLabel(project)}</p>
                  {evidence ? (
                    <RichText data={evidence} />
                  ) : (
                    <p className={styles.missing}>
                      Claimed on this project, but no evidence written yet.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.missing}>
              Nothing linked to this outcome yet. Add it under Assessment on a project.
            </p>
          )}
        </section>
      </div>
    </article>
  )
}

export default LearningOutcomePage
