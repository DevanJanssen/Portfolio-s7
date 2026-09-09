import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'
import styles from './index.module.scss'

export type SectionProps = {
  anchor?: string | null
  background?: ('none' | 'light' | 'dark') | null
  children: ReactNode
  className?: string
}

const BACKGROUND_CLASS = {
  none: undefined,
  light: styles.light,
  dark: styles.dark,
} as const

/**
 * De buitenrand die élk blok deelt: verticale ruimte, achtergrond en het anker
 * waar een link naartoe kan springen. Blokken regelen dit niet zelf, zodat de
 * ruimte tussen twee blokken overal hetzelfde is.
 */
export const Section = ({ anchor, background, children, className }: SectionProps) => (
  <section
    className={cn(styles.section, BACKGROUND_CLASS[background ?? 'none'], className)}
    id={anchor ?? undefined}
  >
    {children}
  </section>
)

export default Section
