import Link from 'next/link'

import Media from '@/components/Media'
import type { Project } from '@/payload-types'
import { projectContextLabel, projectTechnologies } from '@/utilities/projectMeta'
import { projectPath } from '@/utilities/projectPath'
import styles from './index.module.scss'

type Props = {
  project: Project
}

/** How many technologies fit on a card before it turns into a wall of chips. */
const MAX_VISIBLE_TECH = 4

export const ProjectCard = ({ project }: Props) => {
  const href = projectPath(project.slug)
  const meta = projectContextLabel(project)
  const technologies = projectTechnologies(project)
  const visibleTech = technologies.slice(0, MAX_VISIBLE_TECH)
  const hiddenTechCount = technologies.length - visibleTech.length

  return (
    <article className={styles.card}>
      <Link className={styles.link} href={href}>
        {project.cover && typeof project.cover === 'object' ? (
          <Media
            className={styles.cover}
            resource={project.cover}
            sizes="(min-width: 1024px) 30vw, 100vw"
          />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.body}>
          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <h3 className={styles.title}>{project.title}</h3>
          {project.tagline ? <p className={styles.summary}>{project.tagline}</p> : null}

          {visibleTech.length > 0 ? (
            <ul className={styles.stack}>
              {visibleTech.map((technology) => (
                <li className={styles.chip} key={technology.id}>
                  {technology.name}
                </li>
              ))}
              {hiddenTechCount > 0 ? <li className={styles.chip}>+{hiddenTechCount}</li> : null}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard
