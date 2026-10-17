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
    intro: ph('one line inviting people to get in touch.'),
    links: [
      // Vul href in (bv. 'mailto:…' of 'https://linkedin.com/in/…'); zonder href
      // wordt het geen link.
      { label: 'Email', value: ph('your email address'), href: undefined as string | undefined },
      { label: 'LinkedIn', value: ph('your LinkedIn URL'), href: undefined as string | undefined },
      { label: 'GitHub', value: ph('your GitHub URL'), href: undefined as string | undefined },
    ],
  },
}
