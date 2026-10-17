import Link from 'next/link'

import { getNeighbours } from '@/content/projects'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

export const ProjectNav = ({ slug }: { slug: string }) => {
  const { previous, next } = getNeighbours(slug)

  return (
    <nav className={styles.nav} aria-label="More case studies">
      {[
        { project: previous, direction: 'Previous', rel: 'prev' },
        { project: next, direction: 'Next', rel: 'next' },
      ].map(({ project, direction, rel }) => (
        <Link
          key={direction}
          className={styles.link}
          href={`/projects/${project.slug}/`}
          rel={rel}
          data-tone={project.tone}
          data-direction={direction.toLowerCase()}
        >
          <span className={styles.direction}>
            {direction === 'Previous' ? '← ' : ''}
            {direction} case
            {direction === 'Next' ? ' →' : ''}
          </span>
          <span className={styles.title}>{project.title}</span>
          <span className={phClass(project.tagline, styles.tagline)}>{project.tagline}</span>
        </Link>
      ))}
    </nav>
  )
}
