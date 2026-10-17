import { ph, type Project } from '../types'

// Alles met ph(...) moet nog door Devan worden ingevuld. Afbeeldingen: zet ze in
// public/images/feedback/ en vul `src` in; zonder src toont de site een placeholderblok.
export const feedback: Project = {
  slug: 'feedback',
  title: 'Feedback',
  tagline: ph('one-line hook for the project card'),
  tone: 'charcoal',
  meta: [
    { label: 'Course', value: 'Semester 7 — Human Centered Design' },
    { label: 'Role', value: ph('your role') },
    { label: 'Period', value: ph('e.g. Feb – Jun 2026') },
    { label: 'Team', value: ph('solo / team size') },
  ],
  tags: ['HCD'],
  cover: {
    src: '/images/feedback/cover.webp',
    alt: "Camera-based survey asking how strongly you agree with 'I prefer structured routines over spontaneous plans', answered by holding up five fingers while hand tracking highlights the hand.",
    ratio: '16/9',
  },
  chapters: [
    {
      kind: 'hook',
      label: 'Intro',
      tone: 'ink',
      heading: ph('a one-sentence hook that makes people want to read on'),
      body: [ph('two or three sentences that set the scene: who, what, why it mattered.')],
      images: [{ alt: ph('hero image of the end result'), ratio: '16/9' }],
    },
    {
      kind: 'problem',
      label: 'The problem',
      tone: 'pink',
      heading: ph('what was wrong or missing?'),
      body: [
        ph('describe the brief or the problem in your own words.'),
        ph('who had the problem, and how did you find out?'),
      ],
      quote: ph('a quote from a user, client or teacher that captures the problem'),
    },
    {
      kind: 'process',
      label: 'The journey',
      tone: 'charcoal',
      heading: ph('how did you get from problem to solution?'),
      body: [ph('a short overview of your approach.')],
      steps: [
        { title: ph('step 1'), text: ph('what you did and what you learned') },
        { title: ph('step 2'), text: ph('what you did and what you learned') },
        { title: ph('step 3'), text: ph('what you did and what you learned') },
      ],
      images: [
        { alt: ph('sketch, research or workshop photo'), ratio: '4/3' },
        { alt: ph('iteration or prototype'), ratio: '4/3' },
      ],
    },
    {
      kind: 'solution',
      label: 'The solution',
      tone: 'deep',
      heading: ph('what did you make?'),
      body: [
        ph('describe the final design and the key decisions behind it.'),
        ph('what did YOU do, specifically, if this was group work?'),
      ],
      images: [{ alt: ph('final design'), ratio: '16/9' }],
    },
    {
      kind: 'result',
      label: 'The result',
      tone: 'blush',
      heading: ph('what happened, and what did you learn?'),
      body: [
        ph('outcome: feedback, test results, grade or impact.'),
        ph('reflection: what would you do differently next time?'),
      ],
    },
  ],
}
