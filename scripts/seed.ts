import { getPayload } from 'payload'

import config from '../src/payload.config'

/**
 * Fills an empty database with enough to see the site work: an administrator, a
 * homepage, an about page, a few technologies, one course and one example
 * project.
 *
 * Only runs on an empty database — overwriting existing content is never what
 * you meant if you called this by accident.
 *
 * Note `disableRevalidate` on every write. Outside a Next request the cache
 * context does not exist, and `revalidatePath` then throws "Invariant: static
 * generation store missing". Every script writing through the Local API needs it.
 */
const seed = async () => {
  const payload = await getPayload({ config })

  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  const { totalDocs: pageCount } = await payload.count({ collection: 'pages' })

  if (userCount > 0 || pageCount > 0) {
    payload.logger.warn('The database is not empty. Seed skipped.')
    process.exit(0)
  }

  const email = process.env.SEED_EMAIL || 'devan@example.com'
  const password = process.env.SEED_PASSWORD || 'portfolio123'

  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Administrator', roles: ['admin'] },
    context: { disableRevalidate: true },
  })

  const paragraph = (text: string) => ({
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          children: [
            { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
          ],
        },
      ],
    },
  })

  const technologySeeds = [
    { name: 'TypeScript', slug: 'typescript', category: 'language' as const },
    { name: 'React', slug: 'react', category: 'framework' as const },
    { name: 'Next.js', slug: 'nextjs', category: 'framework' as const },
    { name: 'PostgreSQL', slug: 'postgresql', category: 'database' as const },
    { name: 'Payload CMS', slug: 'payload-cms', category: 'framework' as const },
  ]

  const technologies = []
  for (const technology of technologySeeds) {
    technologies.push(
      await payload.create({
        collection: 'technologies',
        data: technology,
        context: { disableRevalidate: true },
      }),
    )
  }

  const course = await payload.create({
    collection: 'courses',
    data: {
      title: 'Web Development',
      slug: 'web-development',
      semester: 'S7',
      institution: 'Fontys ICT',
    },
    context: { disableRevalidate: true },
  })

  const home = await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      layout: [
        {
          blockType: 'hero',
          heading: 'Devan Janssen',
          intro:
            'Software developer. School, work and side projects, with the story behind each one.',
          background: 'none',
        },
        {
          blockType: 'projects',
          heading: 'Selected work',
          intro: 'Mark a project as featured in the CMS to pin it here.',
          source: 'featured',
          limit: 3,
          showLinkToOverview: true,
          background: 'light',
        },
        {
          blockType: 'callToAction',
          heading: 'Want to know more?',
          text: 'Every project covers the problem, my own contribution and what came out of it.',
          background: 'dark',
          links: [
            {
              link: {
                type: 'custom',
                url: '/projects',
                label: 'All projects',
                appearance: 'default',
              },
            },
          ],
        },
      ],
    },
    context: { disableRevalidate: true },
  })

  const about = await payload.create({
    collection: 'pages',
    data: {
      title: 'About',
      slug: 'about',
      _status: 'published',
      layout: [
        {
          blockType: 'hero',
          heading: 'About me',
          intro: 'Short introduction. Replace this text in the CMS.',
          background: 'none',
        },
        {
          blockType: 'richText',
          content: paragraph(
            'This is an example page. Use blocks to lay out your background, your ambitions and how to reach you.',
          ),
          background: 'none',
        },
      ],
    },
    context: { disableRevalidate: true },
  })

  const project = await payload.create({
    collection: 'projects',
    data: {
      title: 'Example project',
      slug: 'example-project',
      kind: 'school',
      projectStatus: 'completed',
      course: course.id,
      startDate: new Date('2026-02-01').toISOString(),
      endDate: new Date('2026-06-30').toISOString(),
      role: 'Full-stack developer',
      teamSize: 1,
      visibility: 'public',
      featured: true,
      tagline: 'A worked example of how a project page is put together.',
      summary:
        'Duplicate this document or create a new project to see how the fields land on the page.',
      techStack: technologies.map((technology) => technology.id),
      problem: paragraph(
        'Describe what needed solving and for whom. Leading with the technology loses the reader.',
      ),
      approach: paragraph(
        'Describe how you tackled it: what you researched, which choices you made, what you traded away.',
      ),
      myContribution: paragraph(
        'Describe your own part, separate from the team. This is the first thing assessors and recruiters look for.',
      ),
      outcome: paragraph(
        'Describe what came of it: shipped, handed over, graded, abandoned. Be honest rather than impressive.',
      ),
      reflection: paragraph('What went well, and what you would do differently next time.'),
      links: [{ label: 'Source code', type: 'repo', url: 'https://github.com' }],
      _status: 'published',
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      siteTitle: 'Devan Janssen',
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        { link: { type: 'custom', url: '/projects', label: 'Projects' } },
        { link: { type: 'custom', url: '/about', label: 'About' } },
      ],
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Done. Sign in with ${email} / ${password}`)
  payload.logger.info(`Paths: ${home.path}, ${about.path}, /projects/${project.slug}`)
  process.exit(0)
}

void seed()
