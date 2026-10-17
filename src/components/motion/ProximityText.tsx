'use client'

// Naar 21st.dev "Variable Font Proximity Hero" (@cnippet-dev): letters reageren
// op de afstand tot de cursor via de variabele assen van Archivo (gewicht en
// breedte). Zelf gebouwd op GSAP; de 21st-code lag achter de dagelijkse limiet.
import { useEffect, useRef } from 'react'

import { MOTION_CONDITIONS, gsap } from '@/lib/gsap'

import styles from './ProximityText.module.scss'

interface Axis {
  wght: number
  wdth: number
}

interface Props {
  lines: string[]
  className?: string
  /** Rust: zwaar en iets smal. */
  rest?: Axis
  /** Vlak bij de cursor. */
  near?: Axis
  /** Bereik in px waarbinnen letters reageren. */
  radius?: number
  /** Letters bouwen zich op bij laden. */
  intro?: boolean
  as?: 'h1' | 'h2' | 'p'
  id?: string
}

const REST: Axis = { wght: 900, wdth: 88 }
const NEAR: Axis = { wght: 250, wdth: 125 }

const fvs = ({ wght, wdth }: Axis) => `'wght' ${wght.toFixed(0)}, 'wdth' ${wdth.toFixed(1)}`

export const ProximityText = ({
  lines,
  className,
  rest = REST,
  near = NEAR,
  radius = 260,
  intro = false,
  as: Tag = 'p',
  id,
}: Props) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const letters = Array.from(root.querySelectorAll<HTMLElement>('[data-letter]'))
    const mm = gsap.matchMedia(root)

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        pointer: MOTION_CONDITIONS.pointer,
      },
      (context) => {
        const { motion, pointer } = context.conditions as { motion: boolean; pointer: boolean }
        if (!motion) return

        // Huidige waarde per letter; we interpoleren elke tick richting het doel.
        const state = letters.map(() => ({ t: 0 }))

        if (intro) {
          // Letters groeien van dun en smal naar hun rustvorm terwijl ze omhoog komen.
          const from = { wght: 100, wdth: 62 }
          const tl = gsap.timeline()
          tl.fromTo(
            letters,
            { opacity: 0, yPercent: 40 },
            { opacity: 1, yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.045 },
            0,
          )
          letters.forEach((el, i) => {
            const proxy = { ...from }
            el.style.fontVariationSettings = fvs(from)
            tl.to(
              proxy,
              {
                ...rest,
                duration: 1.4,
                ease: 'expo.out',
                onUpdate: () => (el.style.fontVariationSettings = fvs(proxy)),
              },
              i * 0.045,
            )
          })
        }

        if (!pointer) return

        let mouse = { x: -9999, y: -9999 }

        const onMove = (event: PointerEvent) => (mouse = { x: event.clientX, y: event.clientY })
        const onLeave = () => (mouse = { x: -9999, y: -9999 })

        const tick = () => {
          if (mouse.x < -9000 && state.every((s) => s.t === 0)) return
          // Breedteveranderingen verschuiven de letters; meet daarom elke tick opnieuw.
          const centres = letters.map((el) => {
            const r = el.getBoundingClientRect()
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
          })
          letters.forEach((el, i) => {
            const c = centres[i]
            const d = Math.hypot(mouse.x - c.x, mouse.y - c.y)
            const target = Math.max(0, 1 - d / radius) ** 2
            const s = state[i]
            if (target === 0 && s.t < 0.002) {
              if (s.t !== 0) {
                s.t = 0
                el.style.fontVariationSettings = fvs(rest)
              }
              return
            }
            s.t += (target - s.t) * 0.14
            el.style.fontVariationSettings = fvs({
              wght: rest.wght + (near.wght - rest.wght) * s.t,
              wdth: rest.wdth + (near.wdth - rest.wdth) * s.t,
            })
          })
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        document.documentElement.addEventListener('pointerleave', onLeave)
        gsap.ticker.add(tick)

        return () => {
          window.removeEventListener('pointermove', onMove)
          document.documentElement.removeEventListener('pointerleave', onLeave)
          gsap.ticker.remove(tick)
          letters.forEach((el) => (el.style.fontVariationSettings = ''))
        }
      },
    )

    return () => mm.revert()
  }, [intro, radius, rest, near])

  return (
    <Tag ref={ref} id={id} className={[styles.text, className].filter(Boolean).join(' ')}>
      <span className="visually-hidden">{lines.join(' ')}</span>
      {lines.map((line) => (
        <span key={line} className={styles.line} aria-hidden="true">
          {line.split(' ').map((word, w) => (
            <span key={w}>
              {w > 0 && ' '}
              <span className={styles.word}>
                {Array.from(word).map((char, i) => (
                  <span key={i} className={styles.letter} data-letter>
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
