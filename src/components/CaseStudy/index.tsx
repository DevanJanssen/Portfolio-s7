'use client'

import { useEffect, useRef, useState } from 'react'

import { ImageFrame } from '@/components/ImageFrame'
import { Magnetic } from '@/components/motion/Magnetic'
import { ProximityText } from '@/components/motion/ProximityText'
import { Tilt } from '@/components/motion/Tilt'
import type { Chapter, Project } from '@/content/types'
import { MOTION_CONDITIONS, ScrollTrigger, gsap, refreshWhenSettled } from '@/lib/gsap'
import { isPlaceholder } from '@/content/types'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

/**
 * Scroll-gestuurde case study (MASTER.md → Scroll-Triggered Storytelling).
 *
 * De HTML staat altijd volledig en leesbaar in de DOM; GSAP voegt alleen
 * beweging toe.
 *
 * - Met beweging: de achtergrond vloeit van hoofdstukkleur naar hoofdstukkleur
 *   (`fluid`), koppen lichten woord voor woord op, beelden openen met een
 *   clip-path en kantelen onder de cursor, de intro staat even vast (1 pin).
 * - Mobiel: korte fade-ins, geen scrub, parallax of pin.
 * - Reduced motion: elk hoofdstuk een eigen vast kleurvlak in eindstand; alleen
 *   de voortgang werkt.
 */
export const CaseStudy = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [fluid, setFluid] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const sync = () => setFluid(motion.matches)
    sync()
    motion.addEventListener('change', sync)
    return () => motion.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const root = ref.current
    const bar = progressRef.current
    if (!root || !bar) return

    const chapterEls = gsap.utils.toArray<HTMLElement>('[data-chapter]', root)
    const mm = gsap.matchMedia(root)

    mm.add(MOTION_CONDITIONS.desktop, () => {
      // Pin 1/1: de titel krimpt en het beeld schuift omhoog terwijl de intro vaststaat.
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
          .to('[data-hook-title]', { scale: 0.86, yPercent: -10, ease: 'none' }, 0)
          .fromTo(
            '[data-hook-media]',
            { yPercent: 22, clipPath: 'inset(12% 10% 0% 10% round 2rem)' },
            { yPercent: 0, clipPath: 'inset(0% 0% 0% 0% round 2rem)', ease: 'none' },
            0,
          )
      }

      chapterEls
        .filter((el) => el.dataset.chapter !== 'hook')
        .forEach((el) => {
          const words = el.querySelectorAll('[data-word]')
          gsap
            .timeline({
              scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 25%', scrub: 0.6 },
            })
            .from(
              el.querySelector('[data-chapter-number]'),
              { yPercent: 40, rotate: -8, ease: 'none' },
              0,
            )
            .fromTo(
              words,
              { opacity: 0.12, yPercent: 30 },
              { opacity: 1, yPercent: 0, stagger: 0.06, ease: 'none' },
              0,
            )
            .from(
              el.querySelectorAll('[data-chapter-text]'),
              { y: 40, opacity: 0, stagger: 0.12 },
              0.2,
            )
        })

      gsap.utils.toArray<HTMLElement>('[data-step]', root).forEach((step, i) => {
        gsap.from(step, {
          y: 80,
          rotate: i % 2 ? 3 : -3,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 95%', end: 'top 60%', scrub: 0.6 },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-frame]', root).forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(18% 14% 18% 14% round 2rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top 95%', end: 'top 40%', scrub: 0.6 },
          },
        )
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
        .toArray<HTMLElement>(
          '[data-chapter-heading], [data-chapter-text], [data-step], [data-reveal-frame]',
          root,
        )
        .forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
    })

    // Voortgang + actief hoofdstuk: altijd, ook bij reduced motion. Ná de pin
    // aangemaakt, zodat de posities de pin-ruimte meetellen. Het actieve
    // hoofdstuk is het laatste waarvan het begin gepasseerd is, zodat het ook
    // klopt na een sprong (anker, End-toets).
    const chapterTriggers = chapterEls.map((el) =>
      ScrollTrigger.create({ trigger: el, start: 'top 50%', refreshPriority: -1 }),
    )

    const update = (scroll: number, value: number) => {
      bar.style.setProperty('--progress', value.toFixed(4))
      setActive(chapterTriggers.reduce((last, t, i) => (scroll >= t.start ? i : last), 0))
    }

    const progress = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      refreshPriority: -1,
      onRefresh: (self) => update(self.scroll(), self.progress),
      onUpdate: (self) => update(self.scroll(), self.progress),
    })

    const stop = refreshWhenSettled(root)

    return () => {
      stop()
      mm.revert()
      progress.kill()
      chapterTriggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  // Een tone-wissel verandert hoogtes niet, maar `fluid` wel (randen/padding):
  // laat ScrollTrigger dan opnieuw meten.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [fluid])

  const activeTone = project.chapters[active]?.tone

  return (
    <article
      ref={ref}
      className={styles.article}
      aria-labelledby="case-title"
      data-fluid={fluid || undefined}
      data-tone={fluid ? activeTone : undefined}
    >
      <nav
        ref={progressRef}
        className={styles.progress}
        data-tone={activeTone}
        aria-label="Chapters"
      >
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
        <div className={styles.progressBar} aria-hidden="true" />
      </nav>

      {project.chapters.map((chapter, index) =>
        chapter.kind === 'hook' ? (
          <Hook key={chapter.kind} chapter={chapter} project={project} fluid={fluid} />
        ) : (
          <ChapterSection key={chapter.kind} chapter={chapter} index={index} fluid={fluid} />
        ),
      )}
    </article>
  )
}

/** Splitst een kop in woorden voor de scrub-reveal; screenreaders lezen de hele zin. */
const Words = ({ text }: { text: string }) => (
  <>
    <span className="visually-hidden">{text}</span>
    <span aria-hidden="true">
      {text.split(' ').map((word, i) => (
        <span key={i} className={styles.word}>
          <span data-word>{word}</span>{' '}
        </span>
      ))}
    </span>
  </>
)

const Hook = ({
  chapter,
  project,
  fluid,
}: {
  chapter: Chapter
  project: Project
  fluid: boolean
}) => (
  <section
    id={chapter.kind}
    className={styles.hook}
    data-chapter="hook"
    data-tone={fluid ? undefined : chapter.tone}
  >
    <div className={`container ${styles.hookInner}`}>
      <div className={styles.hookTop}>
        <p className={styles.kicker}>
          <span className={styles.kickerDot} aria-hidden="true" />
          Case study · {chapter.label}
        </p>
        <div data-hook-title className={styles.hookTitleWrap}>
          <ProximityText
            as="h1"
            id="case-title"
            className={styles.hookTitle}
            lines={[project.title]}
            intro
          />
        </div>
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

const ChapterSection = ({
  chapter,
  index,
  fluid,
}: {
  chapter: Chapter
  index: number
  fluid: boolean
}) => (
  <section
    id={chapter.kind}
    className={styles.chapter}
    data-chapter={chapter.kind}
    data-tone={fluid ? undefined : chapter.tone}
    aria-labelledby={`${chapter.kind}-heading`}
  >
    <div className={`container ${styles.chapterGrid}`}>
      <header className={styles.chapterHead}>
        <span className={styles.chapterNumber} data-chapter-number aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className={styles.kicker}>
          <span className={styles.kickerDot} aria-hidden="true" />
          {chapter.label}
        </p>
      </header>

      <div className={styles.chapterBody}>
        <h2
          id={`${chapter.kind}-heading`}
          className={phClass(chapter.heading, styles.chapterHeading)}
          data-chapter-heading
        >
          {isPlaceholder(chapter.heading) ? chapter.heading : <Words text={chapter.heading} />}
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
            <li key={stepIndex} className={styles.stepItem} data-step>
              <Tilt className={styles.step} max={8}>
                <span className={styles.stepNumber} aria-hidden="true" data-depth="1.5">
                  {String(stepIndex + 1).padStart(2, '0')}
                </span>
                <h3 className={phClass(step.title, styles.stepTitle)}>{step.title}</h3>
                <p className={phClass(step.text)}>{step.text}</p>
              </Tilt>
            </li>
          ))}
        </ol>
      </div>
    )}

    {chapter.images && chapter.images.length > 0 && (
      <div className={`container ${styles.media}`} data-count={chapter.images.length}>
        {chapter.images.map((image, imageIndex) => (
          <div key={imageIndex} data-reveal-frame className={styles.mediaItem}>
            <Tilt max={4} className={styles.mediaTilt}>
              <ImageFrame image={image} parallax />
            </Tilt>
          </div>
        ))}
      </div>
    )}

    {index === 4 && (
      <div className={`container ${styles.end}`}>
        <Magnetic strength={0.3}>
          <a className={styles.top} href="#hook">
            Back to the start ↑
          </a>
        </Magnetic>
      </div>
    )}
  </section>
)
