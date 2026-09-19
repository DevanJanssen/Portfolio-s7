import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import BlockRenderer from '@/components/BlockRenderer'
import LivePreviewListener from '@/components/LivePreviewListener'
import Media from '@/components/Media'
import PayloadRedirects from '@/components/PayloadRedirects'
import { assignmentKindLabel } from '@/collections/Assignments/options'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import { assignmentPath } from '@/utilities/assignmentPath'
import { queryAssignmentBySlug } from '@/utilities/queryAssignmentBySlug'
import styles from './index.module.scss'

type Args = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'assignments',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })

  return docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params
  const assignment = await queryAssignmentBySlug(slug)
  const path = assignmentPath(slug)

  return {
    ...generateMeta({ doc: assignment, path }),
    ...(assignment?.meta?.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

const AssignmentPage = async ({ params }: Args) => {
  const { slug } = await params
  const assignment = await queryAssignmentBySlug(slug)
  const path = assignmentPath(slug)

  if (!assignment) {
    return <PayloadRedirects url={path} />
  }

  const { isEnabled: isDraft } = await draftMode()
  const meta = [
    assignmentKindLabel(assignment.kind),
    assignment.kind === 'school' ? assignment.course : null,
    assignment.period,
  ]
    .filter(Boolean)
    .join(' · ')
  const competencies = assignment.competencies ?? []
  const links = assignment.links ?? []

  return (
    <article>
      {isDraft ? <LivePreviewListener serverURL={getServerSideURL()} /> : null}

      <header className={styles.hero}>
        <div className="container">
          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <h1>{assignment.title}</h1>
          {assignment.summary ? <p className={styles.summary}>{assignment.summary}</p> : null}

          {links.length > 0 ? (
            <ul className={styles.links}>
              {links.map((item) => (
                <li key={item.id ?? item.url}>
                  <a href={item.url} rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {assignment.cover && typeof assignment.cover === 'object' ? (
        <div className={`container ${styles.cover}`}>
          <Media resource={assignment.cover} sizes="(min-width: 1200px) 1200px, 100vw" />
        </div>
      ) : null}

      {competencies.length > 0 ? (
        <section className={styles.competencies}>
          <div className="container">
            <h2>Leeruitkomsten</h2>
            <ul className={styles.competencyList}>
              {competencies.map((item) => (
                <li className={styles.competency} key={item.id ?? item.title}>
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <BlockRenderer blocks={assignment.layout} />
    </article>
  )
}

export default AssignmentPage
