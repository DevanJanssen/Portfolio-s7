/**
 * Alle content van de site staat in getypte bestanden onder src/content.
 * Teksten die nog geschreven moeten worden beginnen met PLACEHOLDER (zie `ph`),
 * en worden op de site zichtbaar gemarkeerd.
 */

export type Tone = 'ink' | 'charcoal' | 'pink' | 'deep' | 'blush'

export type ChapterKind = 'hook' | 'problem' | 'process' | 'solution' | 'result'

export interface ImageSlot {
  /** Pad onder /public, bv. '/images/brand-a-friend/cover.jpg'. Leeg = placeholderblok. */
  src?: string
  alt: string
  caption?: string
  ratio?: '16/9' | '4/3' | '1/1' | '3/4'
}

export interface Step {
  title: string
  text: string
}

export interface Chapter {
  kind: ChapterKind
  /** Korte naam in de voortgangsbalk en boven de kop, bv. 'The problem'. */
  label: string
  tone: Tone
  heading: string
  body: string[]
  quote?: string
  steps?: Step[]
  images?: ImageSlot[]
}

export interface Project {
  slug: string
  title: string
  /** Eén regel op de kaart. */
  tagline: string
  /** Kleur van de kaart op de homepage. */
  tone: Tone
  meta: { label: string; value: string }[]
  tags: string[]
  cover: ImageSlot
  chapters: Chapter[]
}

const PLACEHOLDER = 'PLACEHOLDER'

/** Markeer tekst die Devan nog moet invullen. */
export const ph = (hint: string) => `${PLACEHOLDER}: ${hint}`

export const isPlaceholder = (value: string | undefined) =>
  typeof value === 'string' && value.startsWith(PLACEHOLDER)
