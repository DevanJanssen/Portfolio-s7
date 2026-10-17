'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { MOTION_CONDITIONS, gsap } from '@/lib/gsap'

interface Props {
  children: ReactNode
  /** Hoe sterk het element naar de cursor trekt (0–1). */
  strength?: number
  className?: string
}

/** Trekt zijn inhoud naar de cursor en veert terug bij verlaten. Alleen met muis. */
export const Magnetic = ({ children, strength = 0.35, className }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia(el)
    mm.add(MOTION_CONDITIONS.pointer, () => {
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

      const onMove = (event: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((event.clientX - (r.left + r.width / 2)) * strength)
        y((event.clientY - (r.top + r.height / 2)) * strength)
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
      }

      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => mm.revert()
  }, [strength])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  )
}
