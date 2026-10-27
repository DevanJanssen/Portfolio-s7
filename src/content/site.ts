import { ph } from './types'

export const site = {
  name: 'Devan Janssen',
  url: 'https://devanjanssen.com',
  description: ph('one-line site description for search engines'),
  hero: {
    eyebrow: 'Portfolio — Fontys ICT',
    lines: ['Devan', 'Janssen'],
    intro: ph('one or two sentences: who you are and what kind of work you do.'),
  },
  about: {
    heading: 'About',
    body: [
      ph('a short paragraph about you: study, interests, what drives you.'),
      ph('optional second paragraph: what you are looking for next.'),
    ],
  },
  footer: {
    motto: ph('a short closing line for the footer'),
  },
  contact: {
    heading: "Let's talk",
    intro: "I'm always looking for new opportunities to collaborate and learn. Feel free to reach out to me via email, LinkedIn, or GitHub.",
    links: [
      // Vul href in (bv. 'mailto:…' of 'https://linkedin.com/in/…'); zonder href
      // wordt het geen link.
      { label: 'Email', value: "devanjanssen@gmail.com", href: "mailto:devanjanssen@gmail.com" as string | undefined },
      { label: 'LinkedIn', value: "linkedin.com/in/devanjanssen/", href: "https://www.linkedin.com/in/devanjanssen/" as string | undefined },
      { label: 'GitHub', value: "github.com/devanjanssen", href: "https://github.com/devanjanssen" as string | undefined },
    ],
  },
}
