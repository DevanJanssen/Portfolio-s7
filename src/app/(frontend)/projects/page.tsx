import type { Metadata } from 'next'

import ProjectCard from '@/components/ProjectCard'
import {
  PROJECT_KIND_ORDER,
  projectKindPluralLabel,
  type ProjectKind,
} from '@/collections/Projects/options'
import type { Project } from '@/payload-types'
import { queryPublishedProjects } from '@/utilities/queryProjects'
import styles from './index.module.scss'

export const generateMetadata = (): Metadata => ({
  title: 'Projects',
  description: 'School, work and side projects, with the story and the code behind each one.',
})

const groupByKind = (projects: Project[]) => {
  const groups = new Map<ProjectKind, Project[]>()

  for (const kind of PROJECT_KIND_ORDER) {
    groups.set(kind, [])
  }

  for (const project of projects) {
    const kind = (project.kind ?? 'school') as ProjectKind
    const list = groups.get(kind) ?? groups.get('school')!
    list.push(project)
  }

  return PROJECT_KIND_ORDER.map((kind) => ({
    kind,
    label: projectKindPluralLabel(kind),
    items: groups.get(kind) ?? [],
  })).filter((group) => group.items.length > 0)
}

const ProjectsPage = async () => {
  const projects = await queryPublishedProjects()
  const groups = groupByKind(projects)

  return (
    <article className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Projects</h1>
          <p className={styles.intro}>
            Everything I have built, at school, at work and in my own time. Each project covers the
            problem, what I did, and what came out of it.
          </p>
        </header>

        {groups.length > 0 ? (
          <div className={styles.groups}>
            {groups.map((group) => (
              <section key={group.kind}>
                <h2 className={styles.groupTitle}>{group.label}</h2>
                <ul className={styles.grid}>
                  {group.items.map((project) => (
                    <li key={project.id}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No published projects yet.</p>
        )}
      </div>
    </article>
  )
}

export default ProjectsPage
