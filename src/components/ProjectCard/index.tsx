// Projectkaart in de geest van 21st.dev "Image Card" (neobrutalism, @ekmas):
// dikke rand, harde offset-schaduw, beeld boven/naast een tekstblok. Zelf
// gebouwd op de tokens (de broncode lag achter de dagelijkse 21st-limiet).
import Link from 'next/link'

import type { Project } from '@/content/types'
import { ImageFrame } from '@/components/ImageFrame'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

interface Props {
  project: Project
  index: number
}

export const ProjectCard = ({ project, index }: Props) => {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className={styles.card} data-reveal data-flip={index % 2 === 1 ? '' : undefined}>
      <div className={styles.media} data-tone={project.tone}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <ImageFrame image={project.cover} className={styles.image} />
      </div>

      <div className={styles.body}>
        <ul className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className={phClass(tag, styles.tag)}>
              {tag}
            </li>
          ))}
        </ul>

        <h3 className={styles.title}>
          <Link className={styles.link} href={`/projects/${project.slug}/`}>
            {project.title}
          </Link>
        </h3>

        <p className={phClass(project.tagline, styles.tagline)}>{project.tagline}</p>

        <span className={styles.more} aria-hidden="true">
          Read the case
          <svg width="28" height="16" viewBox="0 0 28 16">
            <path d="M0 8h25M18 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </span>
      </div>
    </article>
  )
}
