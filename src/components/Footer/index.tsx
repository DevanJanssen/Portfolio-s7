// Gebaseerd op 21st.dev "Minimal Two-Column Footer" (@ln-dev7): merk + regel
// links, compacte navigatie rechts, copyrightbalk eronder. Omgezet naar tokens
// en uitgebreid met een groot woordmerk in de brutalistische stijl.
import Link from 'next/link'

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
    <footer className={styles.footer} data-tone="ink">
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <p className={phClass(site.footer.motto, styles.motto)}>{site.footer.motto}</p>
          </div>

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

        <p className={styles.wordmark} aria-hidden="true">
          {site.name}
        </p>

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
