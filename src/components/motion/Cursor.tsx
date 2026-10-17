'use client'

import { useEffect, useRef } from 'react'

import { MOTION_CONDITIONS, gsap } from '@/lib/gsap'

import styles from './Cursor.module.scss'

/**
 * Een ring die de muis volgt. Boven een element met `data-cursor="Label"` groeit
 * hij uit tot een lichte schijf met dat label. Alleen voor muis/trackpad en zonder
 * reduced motion; de gewone cursor blijft altijd zichtbaar.
 */
export const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const label = labelRef.current
    if (!el || !label) return

    const mm = gsap.matchMedia()
    mm.add(MOTION_CONDITIONS.pointer, () => {
      const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

      const onMove = (event: PointerEvent) => {
        el.dataset.visible = 'true'
        x(event.clientX)
        y(event.clientY)
      }
      const onOver = (event: PointerEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
        if (target) {
          label.textContent = target.dataset.cursor ?? ''
          el.dataset.state = 'label'
        } else if ((event.target as HTMLElement).closest('a, button')) {
          el.dataset.state = 'link'
        } else {
          el.dataset.state = ''
        }
      }
      const onLeave = () => (el.dataset.visible = 'false')

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerover', onOver, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)

      return () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        el.dataset.visible = 'false'
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={ref} className={styles.cursor} data-visible="false" aria-hidden="true">
      <span ref={labelRef} className={styles.label} />
    </div>
  )
}
