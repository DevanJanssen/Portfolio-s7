import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CaseStudy } from '@/components/CaseStudy'
import { ProjectNav } from '@/components/ProjectNav'
import { getProject, projects } from '@/content/projects'
import { isPlaceholder } from '@/content/types'

export const dynamicParams = false

export const generateStaticParams = () => projects.map((project) => ({ slug: project.slug }))

type Params = Promise<{ slug: string }>

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const project = getProject((await params).slug)
  if (!project) return {}

  return {
    title: project.title,
    description: isPlaceholder(project.tagline) ? undefined : project.tagline,
    alternates: { canonical: `/projects/${project.slug}/` },
  }
}

const ProjectPage = async ({ params }: { params: Params }) => {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <CaseStudy project={project} />
      <ProjectNav slug={project.slug} />
    </>
  )
}

export default ProjectPage
