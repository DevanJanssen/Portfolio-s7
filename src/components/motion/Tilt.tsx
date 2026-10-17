'use client'

// Naar 21st.dev "Optimized Tilt Card" (@sh20raj): 3D-kanteling op de cursor,
// een lichtvlek die meebeweegt, en lagen met `data-depth` die dieper liggen.
// Zelf gebouwd op GSAP; de 21st-code lag achter de dagelijkse limiet.
import { useEffect, useRef, type ReactNode } from 'react'

import { MOTION_CONDITIONS, gsap } from '@/lib/gsap'

import styles from './Tilt.module.scss'

interface Props {
  children: ReactNode
  className?: string
  /** Maximale kanteling in graden. */
  max?: number
  glare?: boolean
  /** Doorgegeven aan het element zelf (bv. data-reveal, data-cursor). */
  [key: `data-${string}`]: string | undefined
}

export const Tilt = ({ children, className, max = 7, glare = true, ...data }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia(el)
    mm.add(MOTION_CONDITIONS.pointer, () => {
      gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' })
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
      const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map((layer) => ({
        depth: Number(layer.dataset.depth) || 1,
        x: gsap.quickTo(layer, 'x', { duration: 0.8, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 0.8, ease: 'power3.out' }),
      }))

      const onMove = (event: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const px = (event.clientX - r.left) / r.width - 0.5
        const py = (event.clientY - r.top) / r.height - 0.5
        rx(-py * max)
        ry(px * max * 1.2)
        layers.forEach((layer) => {
          layer.x(px * layer.depth * 18)
          layer.y(py * layer.depth * 18)
        })
        el.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
        el.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
      }

      const onEnter = () => el.setAttribute('data-hover', '')
      const onLeave = () => {
        el.removeAttribute('data-hover')
        rx(0)
        ry(0)
        layers.forEach((layer) => {
          layer.x(0)
          layer.y(0)
        })
      }

      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerenter', onEnter)
      el.addEventListener('pointerleave', onLeave)

      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerenter', onEnter)
        el.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => mm.revert()
  }, [max])

  return (
    <div ref={ref} className={[styles.tilt, className].filter(Boolean).join(' ')} {...data}>
      {children}
      {glare && <span className={styles.glare} aria-hidden="true" />}
    </div>
  )
}
