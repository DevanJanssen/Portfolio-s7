import Link from 'next/link'

import { Tilt } from '@/components/motion/Tilt'
import { getNeighbours } from '@/content/projects'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

export const ProjectNav = ({ slug }: { slug: string }) => {
  const { previous, next } = getNeighbours(slug)

  return (
    <nav className={`container ${styles.nav}`} aria-label="More case studies">
      {[
        { project: previous, direction: 'Previous', rel: 'prev' },
        { project: next, direction: 'Next', rel: 'next' },
      ].map(({ project, direction, rel }) => (
        <Tilt
          key={direction}
          className={styles.card}
          max={6}
          data-tone={project.tone}
          data-direction={direction.toLowerCase()}
          data-cursor={direction === 'Next' ? 'Next →' : '← Prev'}
        >
          <Link className={styles.link} href={`/projects/${project.slug}/`} rel={rel}>
            <span className={styles.direction}>{direction} case</span>
            <span className={styles.title} data-depth="1.5">
              {project.title}
            </span>
          </Link>
          <span className={phClass(project.tagline, styles.tagline)}>{project.tagline}</span>
        </Tilt>
      ))}
    </nav>
  )
}
