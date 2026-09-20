import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import BlockRenderer from '@/components/BlockRenderer'
import LivePreviewListener from '@/components/LivePreviewListener'
import Media from '@/components/Media'
import PayloadRedirects from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { PROJECT_LINK_TYPE_OPTIONS } from '@/collections/Projects/options'
import type { Project } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerSideURL } from '@/utilities/getURL'
import {
  formatProjectPeriod,
  projectContextLabel,
  projectStatusLabel,
  projectTeamLabel,
  projectTechnologies,
} from '@/utilities/projectMeta'
import { projectPath } from '@/utilities/projectPath'
import { queryProjectBySlug } from '@/utilities/queryProjects'
import styles from './index.module.scss'

type Args = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
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
  const project = await queryProjectBySlug(slug)
  const path = projectPath(slug)

  return {
    ...generateMeta({ doc: project, path }),
    ...(project?.meta?.noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

const linkTypeLabel = (type: string | null | undefined): string | null =>
  PROJECT_LINK_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? null

/**
 * The short fact list beside the title. Only rows with a value are rendered, so
 * a side project without a client does not leave an empty label behind.
 */
const factRows = (project: Project): { label: string; value: string }[] => {
  const rows: { label: string; value: string }[] = []
  const period = formatProjectPeriod(project)
  const team = projectTeamLabel(project)
  const status = projectStatusLabel(project)

  if (project.role) rows.push({ label: 'Role', value: project.role })
  if (team) rows.push({ label: 'Team', value: team })
  if (period) rows.push({ label: 'Period', value: period })
  if (status) rows.push({ label: 'Status', value: status })

  return rows
}

const ProjectPage = async ({ params }: Args) => {
  const { slug } = await params
  const project = await queryProjectBySlug(slug)
  const path = projectPath(slug)

  if (!project) {
    return <PayloadRedirects url={path} />
  }

  const { isEnabled: isDraft } = await draftMode()
  const meta = projectContextLabel(project)
  const facts = factRows(project)
  const technologies = projectTechnologies(project)
  const links = project.links ?? []
  const gallery = project.gallery ?? []
  const documents = project.documents ?? []
  const feedback = project.feedback ?? []
  const hasStory = Boolean(
    project.problem || project.approach || project.myContribution || project.outcome,
  )

  return (
    <article>
      {isDraft ? <LivePreviewListener serverURL={getServerSideURL()} /> : null}

      <header className={styles.hero}>
        <div className="container">
          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <h1>{project.title}</h1>
          {project.summary ? <p className={styles.summary}>{project.summary}</p> : null}

          {facts.length > 0 ? (
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div className={styles.fact} key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {technologies.length > 0 ? (
            <ul className={styles.stack}>
              {technologies.map((technology) => (
                <li className={styles.chip} key={technology.id}>
                  {technology.name}
                </li>
              ))}
            </ul>
          ) : null}

          {links.length > 0 ? (
            <ul className={styles.links}>
              {links.map((item) => (
                <li key={item.id ?? item.url}>
                  <a href={item.url} rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                  {linkTypeLabel(item.type) ? (
                    <span className={styles.linkType}> — {linkTypeLabel(item.type)}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      {project.cover && typeof project.cover === 'object' ? (
        <div className={`container ${styles.cover}`}>
          <Media resource={project.cover} sizes="(min-width: 1200px) 1200px, 100vw" />
        </div>
      ) : null}

      {hasStory ? (
        <section className={styles.story}>
          <div className="container container--narrow">
            {project.problem ? (
              <div className={styles.storyPart}>
                <h2>The problem</h2>
                <RichText data={project.problem} />
              </div>
            ) : null}

            {project.approach ? (
              <div className={styles.storyPart}>
                <h2>Approach</h2>
                <RichText data={project.approach} />
              </div>
            ) : null}

            {project.myContribution ? (
              <div className={styles.storyPart}>
                <h2>What I did</h2>
                <RichText data={project.myContribution} />
              </div>
            ) : null}

            {project.outcome ? (
              <div className={styles.storyPart}>
                <h2>Outcome</h2>
                <RichText data={project.outcome} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <BlockRenderer blocks={project.layout} />

      {gallery.length > 0 ? (
        <section className={styles.gallery}>
          <div className="container">
            <h2>Gallery</h2>
            <ul className={styles.galleryList}>
              {gallery.map((item) => (
                <li className={styles.galleryItem} key={item.id ?? item.caption}>
                  {item.image && typeof item.image === 'object' ? (
                    <Media resource={item.image} sizes="(min-width: 768px) 50vw, 100vw" />
                  ) : null}
                  {item.caption ? <p className={styles.caption}>{item.caption}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {project.reflection ? (
        <section className={styles.reflection}>
          <div className="container container--narrow">
            <h2>Reflection</h2>
            <RichText data={project.reflection} />
          </div>
        </section>
      ) : null}

      {feedback.length > 0 ? (
        <section className={styles.feedback}>
          <div className="container container--narrow">
            <h2>Feedback</h2>
            {feedback.map((item) => (
              <figure className={styles.quote} key={item.id ?? item.quote}>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  {item.source}
                  {item.sourceRole ? `, ${item.sourceRole}` : ''}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {documents.length > 0 ? (
        <section className={styles.documents}>
          <div className="container container--narrow">
            <h2>Documents</h2>
            <ul>
              {documents.map((item) => {
                const file = item.file && typeof item.file === 'object' ? item.file : null

                return (
                  <li key={item.id ?? item.label}>
                    {file?.url ? (
                      <a href={file.url} rel="noreferrer" target="_blank">
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  )
}

export default ProjectPage
