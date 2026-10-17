'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { MOTION_CONDITIONS, ScrollTrigger, gsap, refreshWhenSettled } from '@/lib/gsap'

interface Props {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'ul'
}

/**
 * Laat elk `[data-reveal]`-kind gestaffeld binnenkomen zodra het in beeld
 * scrollt (MASTER.md → Stagger List). Zonder JS of met reduced motion staat
 * alles meteen in zijn eindstand.
 */
export const Reveal = ({ children, className, as: Tag = 'div' }: Props) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const mm = gsap.matchMedia(root)
    mm.add({ desktop: MOTION_CONDITIONS.desktop, mobile: MOTION_CONDITIONS.mobile }, (context) => {
      const { desktop } = context.conditions as { desktop: boolean }
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)

      // Per batch: wat tegelijk in beeld komt, staffelt samen in (MASTER.md → Stagger List).
      gsap.set(items, { opacity: 0, y: desktop ? 48 : 20 })
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: desktop ? 0.6 : 0.4,
            ease: 'back.out(1.4)',
            stagger: 0.08,
          }),
      })
    })

    const stop = refreshWhenSettled(root)

    return () => {
      stop()
      mm.revert()
    }
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  )
}
