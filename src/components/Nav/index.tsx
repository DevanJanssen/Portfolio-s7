'use client'

// Gebaseerd op 21st.dev "Navbar 1" (@preetsuthar17): zwevende pil met logo,
// links en CTA, en op mobiel een menu dat over het hele scherm schuift. Omgezet
// naar SCSS-modules en design tokens, GSAP-magneet in plaats van motion, met
// toetsenbord- en focusafhandeling erbij.
import Link from 'next/link'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Magnetic } from '@/components/motion/Magnetic'

import styles from './index.module.scss'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
]

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setIsOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen, close])

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.logo} href="/" aria-label="Devan Janssen — home">
          <span aria-hidden="true">DJ</span>
        </Link>

        <nav className={styles.desktop} aria-label="Main">
          {links.map((link) => (
            <Magnetic key={link.href} strength={0.3}>
              <Link className={styles.link} href={link.href}>
                {link.label}
              </Link>
            </Magnetic>
          ))}
          <Magnetic strength={0.4}>
            <Link className={styles.cta} href="/#contact">
              Contact
            </Link>
          </Magnetic>
        </nav>

        <button
          ref={toggleRef}
          className={styles.toggle}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="visually-hidden">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
            {isOpen ? (
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.5" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" />
            )}
          </svg>
        </button>
      </div>

      <div
        ref={panelRef}
        id="mobile-menu"
        className={styles.panel}
        data-open={isOpen}
        data-tone="ink"
        hidden={!isOpen}
      >
        <nav aria-label="Mobile">
          <ul className={styles.panelList}>
            {[...links, { label: 'Contact', href: '/#contact' }].map((link, index) => (
              <li key={link.href} style={{ '--i': index } as React.CSSProperties}>
                <Link
                  className={styles.panelLink}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.panelIndex} aria-hidden="true">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
