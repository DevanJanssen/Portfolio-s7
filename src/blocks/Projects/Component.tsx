import Link from 'next/link'

import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import type { ProjectsBlock as ProjectsBlockProps } from '@/payload-types'
import { PROJECTS_PATH } from '@/utilities/projectPath'
import { queryPublishedProjects } from '@/utilities/queryProjects'
import styles from './index.module.scss'

export const ProjectsBlockComponent = async ({
  anchor,
  background,
  heading,
  intro,
  kind,
  limit,
  showLinkToOverview,
  source,
}: ProjectsBlockProps) => {
  const projects = await queryPublishedProjects()

  let selection = projects
  if (source === 'featured') {
    const featured = projects.filter((project) => project.featured)
    selection = featured.length > 0 ? featured : projects
  } else if (source === 'kind' && kind) {
    selection = projects.filter((project) => project.kind === kind)
  }

  const items = typeof limit === 'number' && limit > 0 ? selection.slice(0, limit) : selection

  if (items.length === 0) return null

  return (
    <Section anchor={anchor} background={background} className={styles.projects}>
      <div className="container">
        {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
        {intro ? <p className={styles.intro}>{intro}</p> : null}

        <ul className={styles.grid}>
          {items.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {showLinkToOverview ? (
          <p className={styles.more}>
            <Link href={PROJECTS_PATH}>All projects</Link>
          </p>
        ) : null}
      </div>
    </Section>
  )
}

export default ProjectsBlockComponent
