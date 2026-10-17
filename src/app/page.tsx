import { Hero } from '@/components/Hero'
import { Magnetic } from '@/components/motion/Magnetic'
import { ProximityText } from '@/components/motion/ProximityText'
import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { phClass } from '@/lib/ph'

import styles from './page.module.scss'

const HomePage = () => (
  <>
    <Hero />

    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className="container">
        <header className={styles.sectionHead}>
          <span className={styles.sectionIndex} aria-hidden="true" />
          <h2 id="work-heading" className={styles.sectionTitle}>
            Selected work
          </h2>
          <p className={styles.sectionNote}>{projects.length} case studies</p>
        </header>

        <Reveal className={styles.cards}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Reveal>
      </div>
    </section>

    <section id="about" className={styles.about} data-tone="deep" aria-labelledby="about-heading">
      <Reveal className={`container ${styles.split}`}>
        <div data-reveal>
          <ProximityText
            as="h2"
            id="about-heading"
            className={styles.bigTitle}
            lines={[site.about.heading]}
          />
        </div>
        <div className={styles.prose}>
          {site.about.body.map((paragraph) => (
            <p key={paragraph} className={phClass(paragraph)} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </section>

    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <Reveal className={`container ${styles.split}`}>
        <div>
          <div data-reveal>
            <ProximityText
              as="h2"
              id="contact-heading"
              className={styles.bigTitle}
              lines={site.contact.heading.split(' ')}
            />
          </div>
          <p className={phClass(site.contact.intro, styles.contactIntro)} data-reveal>
            {site.contact.intro}
          </p>
        </div>
        <ul className={styles.contactList}>
          {site.contact.links.map((link) => (
            <li key={link.label} data-reveal>
              {link.href ? (
                <Magnetic strength={0.15} className={styles.magnet}>
                  <a className={styles.contactLink} href={link.href} data-cursor="Open">
                    <span className={styles.contactLabel}>{link.label}</span>
                    <span>{link.value}</span>
                  </a>
                </Magnetic>
              ) : (
                <span className={styles.contactLink}>
                  <span className={styles.contactLabel}>{link.label}</span>
                  <span className={phClass(link.value)}>{link.value}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  </>
)

export default HomePage
