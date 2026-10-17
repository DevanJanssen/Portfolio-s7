// Projectkaart: kantelt in 3D op de cursor (Tilt, naar 21st.dev "Optimized
// Tilt Card"), het beeld ligt dieper en schuift tegen de beweging in, en de
// cursor wordt een "View case"-schijf. Op touch en bij reduced motion: stil.
import Link from 'next/link'

import { ImageFrame } from '@/components/ImageFrame'
import { Tilt } from '@/components/motion/Tilt'
import type { Project } from '@/content/types'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

interface Props {
  project: Project
  index: number
}

export const ProjectCard = ({ project, index }: Props) => {
  const number = String(index + 1).padStart(2, '0')

  return (
    <Tilt
      className={styles.card}
      max={5}
      data-reveal=""
      data-cursor="View case"
      data-flip={index % 2 === 1 ? '' : undefined}
    >
      <div className={styles.media} data-tone={project.tone}>
        <span className={styles.number} aria-hidden="true" data-depth="2.5">
          {number}
        </span>
        <div className={styles.depth} data-depth="-1.2">
          <ImageFrame image={project.cover} className={styles.image} />
        </div>
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
          <span className={styles.arrow}>
            <svg width="20" height="14" viewBox="0 0 20 14">
              <path d="M0 7h17M11 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </span>
      </div>
    </Tilt>
  )
}
