'use client'

// Hero: je naam als variabele letters die op de cursor reageren (ProximityText),
// boven zachte kleurvlekken in roze en dieproze die de muis volgen.
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { Magnetic } from '@/components/motion/Magnetic'
import { ProximityText } from '@/components/motion/ProximityText'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { MOTION_CONDITIONS, gsap, refreshWhenSettled } from '@/lib/gsap'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

export const Hero = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const blobs = gsap.utils.toArray<HTMLElement>('[data-blob]', root)
    const mm = gsap.matchMedia(root)

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: MOTION_CONDITIONS.desktop,
        pointer: MOTION_CONDITIONS.pointer,
      },
      (context) => {
        const { motion, desktop, pointer } = context.conditions as Record<string, boolean>
        if (!motion) return

        gsap.from('[data-hero-fade]', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          delay: 0.5,
        })
        gsap.from(blobs, { scale: 0, opacity: 0, duration: 1.6, ease: 'expo.out', stagger: 0.15 })

        if (pointer) {
          // Elke vlek volgt de muis met een eigen traagheid en afstand.
          const followers = blobs.map((blob, i) => ({
            x: gsap.quickTo(blob, 'x', { duration: 1.2 + i * 0.6, ease: 'power3.out' }),
            y: gsap.quickTo(blob, 'y', { duration: 1.2 + i * 0.6, ease: 'power3.out' }),
            pull: 0.35 - i * 0.1,
          }))
          const onMove = (event: PointerEvent) => {
            const r = root.getBoundingClientRect()
            const dx = event.clientX - (r.left + r.width / 2)
            const dy = event.clientY - (r.top + r.height / 2)
            followers.forEach((f) => {
              f.x(dx * f.pull)
              f.y(dy * f.pull)
            })
          }
          root.addEventListener('pointermove', onMove)
          return () => root.removeEventListener('pointermove', onMove)
        }

        // Touch: de vlekken drijven langzaam uit zichzelf.
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            x: i % 2 ? -40 : 50,
            y: i % 2 ? 30 : -40,
            duration: 6 + i * 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        })

        if (desktop) {
          gsap.to('[data-hero-scene]', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
          })
        }
      },
    )

    const stop = refreshWhenSettled(root)
    return () => {
      stop()
      mm.revert()
    }
  }, [])

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.scene} data-hero-scene aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobPink}`} data-blob />
        <span className={`${styles.blob} ${styles.blobDeep}`} data-blob />
        <span className={`${styles.blob} ${styles.blobTint}`} data-blob />
      </div>
      <div className={styles.grain} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow} data-hero-fade>
          <span className={styles.dot} aria-hidden="true" />
          {site.hero.eyebrow}
        </p>

        <ProximityText
          as="h1"
          id="hero-title"
          className={styles.title}
          lines={site.hero.lines}
          intro
        />

        <div className={styles.bottom}>
          <p className={phClass(site.hero.intro, styles.intro)} data-hero-fade>
            {site.hero.intro}
          </p>

          <nav className={styles.index} aria-label="Case studies" data-hero-fade>
            <p className={styles.indexHeading}>Selected work</p>
            <ol className={styles.indexList}>
              {projects.map((project, i) => (
                <li key={project.slug}>
                  <Magnetic strength={0.2}>
                    <Link className={styles.indexLink} href={`/projects/${project.slug}/`}>
                      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {project.title}
                    </Link>
                  </Magnetic>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <a className={styles.scroll} href="#work" data-hero-fade>
          <span>Scroll</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
