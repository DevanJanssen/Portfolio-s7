'use client'

// Hero in de geest van 21st.dev "Minimalist Hero" (@ravikatiyar162): enorme,
// minimale typografie met één fel kleurvlak als focuspunt. Zelf gebouwd op de
// design tokens (de broncode lag achter de dagelijkse 21st-limiet).
import Link from 'next/link'
import { useEffect, useRef } from 'react'

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

    const mm = gsap.matchMedia(root)
    mm.add({ desktop: MOTION_CONDITIONS.desktop, mobile: MOTION_CONDITIONS.mobile }, (context) => {
      const { desktop } = context.conditions as { desktop: boolean }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-line]', { yPercent: 105, duration: desktop ? 0.9 : 0.6, stagger: 0.1 })
        .from('[data-hero-fade]', { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 }, '-=0.4')
        .from('[data-hero-block]', { scaleY: 0, transformOrigin: 'bottom', duration: 0.7 }, 0.2)

      if (desktop) {
        gsap.to('[data-hero-block]', {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    })

    const stop = refreshWhenSettled(root)
    return () => {
      stop()
      mm.revert()
    }
  }, [])

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.block} data-hero-block aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow} data-hero-fade>
          {site.hero.eyebrow}
        </p>

        <h1 id="hero-title" className={styles.title}>
          {site.hero.lines.map((line) => (
            <span key={line} className={styles.mask}>
              <span className={styles.line} data-hero-line>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className={styles.bottom}>
          <p className={phClass(site.hero.intro, styles.intro)} data-hero-fade>
            {site.hero.intro}
          </p>

          <nav className={styles.index} aria-label="Case studies" data-hero-fade>
            <p className={styles.indexHeading}>Selected work</p>
            <ol className={styles.indexList}>
              {projects.map((project, i) => (
                <li key={project.slug}>
                  <Link className={styles.indexLink} href={`/projects/${project.slug}/`}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
