import { isPlaceholder } from '@/content/types'

/** Voegt de `.ph`-markering toe aan elementen met nog niet ingevulde tekst. */
export const phClass = (value: string | undefined, className?: string) =>
  [className, isPlaceholder(value) ? 'ph' : undefined].filter(Boolean).join(' ') || undefined
