// Gebaseerd op 21st.dev "Minimal Two-Column Footer" (@ln-dev7): merkregel
// links, compacte navigatie rechts, copyrightbalk eronder. Omgezet naar tokens,
// op een roze vlak, met een groot woordmerk dat op de cursor reageert.
import Link from 'next/link'

import { ProximityText } from '@/components/motion/ProximityText'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

const navLinks = [
  { label: 'Work', href: '/#work' },
  ...projects.map((project) => ({ label: project.title, href: `/projects/${project.slug}/` })),
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} data-tone="pink">
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <p className={phClass(site.footer.motto, styles.motto)}>{site.footer.motto}</p>

          <nav className={styles.nav} aria-label="Footer">
            <h2 className={styles.navHeading}>Navigate</h2>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className={styles.navLink} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          <ProximityText
            lines={[site.name]}
            className={styles.wordmarkText}
            rest={WORDMARK_REST}
            near={WORDMARK_NEAR}
            radius={320}
          />
        </div>

        <div className={styles.legal}>
          <p>
            &copy; {year} {site.name}
          </p>
          <p>Fontys ICT</p>
        </div>
      </div>
    </footer>
  )
}

const WORDMARK_REST = { wght: 900, wdth: 75 }
const WORDMARK_NEAR = { wght: 200, wdth: 110 }
