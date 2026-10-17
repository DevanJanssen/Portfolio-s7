'use client'

import { useEffect, useRef, useState } from 'react'

import { ImageFrame } from '@/components/ImageFrame'
import type { Chapter, Project } from '@/content/types'
import { MOTION_CONDITIONS, ScrollTrigger, gsap, refreshWhenSettled } from '@/lib/gsap'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

/**
 * Scroll-gestuurde case study (MASTER.md → Scroll-Triggered Storytelling).
 *
 * De HTML staat altijd volledig en leesbaar in de DOM; GSAP voegt alleen
 * beweging toe. Onder prefers-reduced-motion draait er niets behalve de
 * voortgangsbalk, en staat elk hoofdstuk direct in zijn eindstand.
 *
 * Desktop: scrub-reveals, parallax op beelden, één vastgepinde intro.
 * Mobiel: alleen korte fade-ins, geen scrub, geen parallax, geen pin.
 */
export const CaseStudy = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = ref.current
    const bar = progressRef.current
    if (!root || !bar) return

    const chapterEls = gsap.utils.toArray<HTMLElement>('[data-chapter]', root)

    const mm = gsap.matchMedia(root)

    mm.add(MOTION_CONDITIONS.desktop, () => {
      // Pin 1/1: de intro blijft staan terwijl de kop groeit en het beeld omhoog schuift.
      const hook = root.querySelector<HTMLElement>('[data-chapter="hook"]')
      if (hook) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hook,
              start: 'top top',
              end: '+=70%',
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
            },
          })
          .fromTo('[data-hook-title]', { scale: 0.92 }, { scale: 1, ease: 'none' }, 0)
          .fromTo('[data-hook-media]', { yPercent: 18 }, { yPercent: 0, ease: 'none' }, 0)
      }

      chapterEls
        .filter((el) => el.dataset.chapter !== 'hook')
        .forEach((el) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: 0.6 },
            })
            .from(el.querySelector('[data-chapter-number]'), { xPercent: -30, opacity: 0 }, 0)
            .from(el.querySelector('[data-chapter-heading]'), { y: 80, opacity: 0 }, 0)
            .from(
              el.querySelectorAll('[data-chapter-text]'),
              { y: 40, opacity: 0, stagger: 0.12 },
              0.15,
            )
        })

      gsap.utils.toArray<HTMLElement>('[data-step]', root).forEach((step) => {
        gsap.from(step, {
          y: 60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 90%', end: 'top 60%', scrub: 0.6 },
        })
      })

      // Parallax alleen op beelden, nooit op tekst.
      gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: layer.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    })

    mm.add(MOTION_CONDITIONS.mobile, () => {
      gsap.utils
        .toArray<HTMLElement>('[data-chapter-heading], [data-chapter-text], [data-step]', root)
        .forEach((el) => {
          gsap.from(el, {
            y: 20,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
    })

    // Voortgang + actief hoofdstuk: altijd, ook bij reduced motion (geen beweging, wel
    // oriëntatie). Ná de pin aangemaakt, zodat hun posities de pin-ruimte meetellen.
    // Hoofdstuk-triggers dienen alleen als meetlat; het actieve hoofdstuk is het laatste
    // waarvan het begin gepasseerd is. Zo klopt het ook na een sprong (anker, End-toets).
    const chapterTriggers = chapterEls.map((el) =>
      ScrollTrigger.create({ trigger: el, start: 'top 50%', refreshPriority: -1 }),
    )

    const progress = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      refreshPriority: -1,
      onRefresh: (self) => update(self.scroll(), self.progress),
      onUpdate: (self) => update(self.scroll(), self.progress),
    })

    function update(scroll: number, value: number) {
      bar!.style.setProperty('--progress', value.toFixed(4))
      const index = chapterTriggers.reduce((last, t, i) => (scroll >= t.start ? i : last), 0)
      setActive(index)
    }

    const stop = refreshWhenSettled(root)

    return () => {
      stop()
      mm.revert()
      progress.kill()
      chapterTriggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  const activeChapter = project.chapters[active]

  return (
    <article ref={ref} className={styles.article} aria-labelledby="case-title">
      <nav
        ref={progressRef}
        className={styles.progress}
        data-tone={activeChapter?.tone}
        aria-label="Chapters"
      >
        <div className={styles.progressBar} aria-hidden="true" />
        <ol className={styles.progressChapters}>
          {project.chapters.map((chapter, index) => (
            <li key={chapter.kind} data-active={index === active}>
              <a href={`#${chapter.kind}`} aria-current={index === active ? 'step' : undefined}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.progressLabel}>{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {project.chapters.map((chapter, index) =>
        chapter.kind === 'hook' ? (
          <Hook key={chapter.kind} chapter={chapter} project={project} />
        ) : (
          <ChapterSection key={chapter.kind} chapter={chapter} index={index} />
        ),
      )}
    </article>
  )
}

const Hook = ({ chapter, project }: { chapter: Chapter; project: Project }) => (
  <section id={chapter.kind} className={styles.hook} data-chapter="hook" data-tone={chapter.tone}>
    <div className={`container ${styles.hookInner}`}>
      <div className={styles.hookTop}>
        <p className={styles.kicker}>Case study · {chapter.label}</p>
        <h1 id="case-title" className={styles.hookTitle} data-hook-title>
          {project.title}
        </h1>
        <p className={phClass(chapter.heading, styles.hookHeading)}>{chapter.heading}</p>
      </div>

      <dl className={styles.meta}>
        {project.meta.map((item) => (
          <div key={item.label} className={styles.metaItem}>
            <dt>{item.label}</dt>
            <dd className={phClass(item.value)}>{item.value}</dd>
          </div>
        ))}
      </dl>

      {chapter.body.map((paragraph) => (
        <p key={paragraph} className={phClass(paragraph, styles.hookBody)}>
          {paragraph}
        </p>
      ))}

      {chapter.images?.[0] && (
        <div className={styles.hookMedia} data-hook-media>
          <ImageFrame image={chapter.images[0]} priority />
        </div>
      )}
    </div>
  </section>
)

const ChapterSection = ({ chapter, index }: { chapter: Chapter; index: number }) => (
  <section
    id={chapter.kind}
    className={styles.chapter}
    data-chapter={chapter.kind}
    data-tone={chapter.tone}
    aria-labelledby={`${chapter.kind}-heading`}
  >
    <div className={`container ${styles.chapterGrid}`}>
      <header className={styles.chapterHead}>
        <span className={styles.chapterNumber} data-chapter-number aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className={styles.kicker}>{chapter.label}</p>
      </header>

      <div className={styles.chapterBody}>
        <h2
          id={`${chapter.kind}-heading`}
          className={phClass(chapter.heading, styles.chapterHeading)}
          data-chapter-heading
        >
          {chapter.heading}
        </h2>

        {chapter.body.map((paragraph) => (
          <p key={paragraph} className={phClass(paragraph, styles.text)} data-chapter-text>
            {paragraph}
          </p>
        ))}

        {chapter.quote && (
          <blockquote className={phClass(chapter.quote, styles.quote)} data-chapter-text>
            <p>{chapter.quote}</p>
          </blockquote>
        )}
      </div>
    </div>

    {chapter.steps && (
      <div className="container">
        <ol className={styles.steps}>
          {chapter.steps.map((step, stepIndex) => (
            <li key={stepIndex} className={styles.step} data-step>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(stepIndex + 1).padStart(2, '0')}
              </span>
              <h3 className={phClass(step.title, styles.stepTitle)}>{step.title}</h3>
              <p className={phClass(step.text)}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    )}

    {chapter.images && chapter.images.length > 0 && (
      <div className={`container ${styles.media}`} data-count={chapter.images.length}>
        {chapter.images.map((image, imageIndex) => (
          <ImageFrame key={imageIndex} image={image} parallax />
        ))}
      </div>
    )}
  </section>
)
