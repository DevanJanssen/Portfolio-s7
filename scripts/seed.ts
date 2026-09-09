import { getPayload } from 'payload'

import config from '../src/payload.config'

/**
 * Vult een lege database met genoeg om de site te zien werken: een beheerder,
 * een homepage, een over-mij-pagina en een voorbeeldopdracht.
 *
 * Draait alleen op een lege database — bestaande content overschrijven is nooit
 * wat je bedoelde als je dit per ongeluk aanroept.
 *
 * Let op `disableRevalidate` bij elke schrijfactie. Buiten een Next-request
 * bestaat de cachecontext niet, en `revalidatePath` gooit dan "Invariant: static
 * generation store missing". Elk script dat via de Local API schrijft heeft dit
 * nodig.
 */
const seed = async () => {
  const payload = await getPayload({ config })

  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  const { totalDocs: pageCount } = await payload.count({ collection: 'pages' })

  if (userCount > 0 || pageCount > 0) {
    payload.logger.warn('De database is niet leeg. Seed overgeslagen.')
    process.exit(0)
  }

  const email = process.env.SEED_EMAIL || 'devan@example.com'
  const password = process.env.SEED_PASSWORD || 'portfolio123'

  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Beheerder', roles: ['admin'] },
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

  const home = await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      layout: [
        {
          blockType: 'hero',
          heading: 'Portfolio',
          intro: 'Schoolopdrachten, gebouwd als pagina’s in het CMS. Pas deze tekst aan in /admin.',
          background: 'none',
        },
        {
          blockType: 'assignments',
          heading: 'Opdrachten',
          intro: 'Nieuwe opdrachten verschijnen hier automatisch zodra je ze publiceert.',
          background: 'light',
        },
        {
          blockType: 'callToAction',
          heading: 'Over dit portfolio',
          text: 'Elke opdracht is een eigen pagina: samenvatting, leeruitkomsten, links en vrije blokken.',
          background: 'dark',
          links: [
            {
              link: {
                type: 'custom',
                url: '/over-mij',
                label: 'Over mij',
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
      title: 'Over mij',
      slug: 'over-mij',
      _status: 'published',
      layout: [
        {
          blockType: 'hero',
          heading: 'Over mij',
          intro: 'Korte introductie. Vervang deze tekst in het CMS.',
          background: 'none',
        },
        {
          blockType: 'richText',
          content: paragraph(
            'Dit is een voorbeeldpagina. Gebruik blokken om je achtergrond, leerdoelen of contactgegevens neer te zetten.',
          ),
          background: 'none',
        },
      ],
    },
    context: { disableRevalidate: true },
  })

  const assignment = await payload.create({
    collection: 'assignments',
    data: {
      title: 'Voorbeeldopdracht',
      slug: 'voorbeeldopdracht',
      course: 'Web development',
      period: 'Semester 1, 2026',
      summary:
        'Een voorbeeld van hoe een schoolopdracht eruitziet. Dupliceer dit document of maak een nieuwe opdracht aan.',
      competencies: [
        {
          title: 'Realiseren',
          description: 'Een werkende pagina bouwen met Next.js en content uit het CMS.',
        },
        {
          title: 'Analyseren',
          description: 'De opdracht vertalen naar velden en blokken die je later opnieuw kunt gebruiken.',
        },
      ],
      links: [
        { label: 'Broncode', url: 'https://github.com' },
      ],
      _status: 'published',
      layout: [
        {
          blockType: 'richText',
          content: paragraph(
            'Hier beschrijf je het proces: wat de opdracht was, wat je hebt gemaakt, en wat je ervan leerde. Voeg blokken toe voor screenshots, extra tekst of een call-to-action.',
          ),
          background: 'none',
        },
      ],
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      siteTitle: 'Portfolio',
      navItems: [
        { link: { type: 'custom', url: '/', label: 'Home' } },
        { link: { type: 'custom', url: '/opdrachten', label: 'Opdrachten' } },
        { link: { type: 'custom', url: '/over-mij', label: 'Over mij' } },
      ],
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Klaar. Inloggen met ${email} / ${password}`)
  payload.logger.info(`Paden: ${home.path}, ${about.path}, /opdrachten/${assignment.slug}`)
  process.exit(0)
}

void seed()
