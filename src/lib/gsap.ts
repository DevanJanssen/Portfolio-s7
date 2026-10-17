'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

/** Media-condities voor gsap.matchMedia(): één plek, zelfde namen overal. */
export const MOTION_CONDITIONS = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  /** Muis/trackpad: alleen dan cursor-effecten (tilt, magneet, proximity). */
  pointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
} as const

/**
 * Posities kloppen pas als fonts en afbeeldingen er zijn: Archivo is breder dan
 * de fallback en een afbeelding zonder vaste hoogte schuift alles op.
 */
export const refreshWhenSettled = (root: HTMLElement) => {
  const refresh = () => ScrollTrigger.refresh()
  let cancelled = false

  document.fonts?.ready.then(() => {
    if (!cancelled) refresh()
  })

  const images = Array.from(root.querySelectorAll('img')).filter((img) => !img.complete)
  images.forEach((img) => img.addEventListener('load', refresh, { once: true }))
  window.addEventListener('load', refresh, { once: true })

  return () => {
    cancelled = true
    images.forEach((img) => img.removeEventListener('load', refresh))
    window.removeEventListener('load', refresh)
  }
}
