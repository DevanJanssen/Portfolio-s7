'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utilities/cn'
import styles from './index.module.scss'

export type HeaderNavItem = {
  href: string
  key: string
  label: string
  newTab?: boolean | null
}

/**
 * Of dit menu-item de pagina is waar de bezoeker nu staat.
 *
 * Een onderliggende pagina telt mee (`/diensten/ai` markeert `/diensten`), maar
 * alleen op een echte padgrens — anders zou `/diensten` ook `/dienstenweek`
 * oplichten. De homepage is de uitzondering: die is een voorvoegsel van álles.
 */
const isCurrent = (pathname: string, href: string): boolean => {
  if (!href.startsWith('/')) return false

  const target = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const current = pathname.replace(/\/+$/, '') || '/'

  if (target === '/') return current === '/'

  return current === target || current.startsWith(`${target}/`)
}

/**
 * Client component omdat het actieve item uit de huidige route volgt; de rest
 * van de header blijft server-side. Er komen alleen kant-en-klare hrefs mee,
 * geen CMS-documenten.
 */
export const HeaderNav = ({ items }: { items: HeaderNavItem[] }) => {
  const pathname = usePathname()

  if (items.length === 0) return null

  return (
    <nav aria-label="Main menu" className={styles.navWrapper}>
      <ul className={styles.nav}>
        {items.map((item) => {
          const current = isCurrent(pathname, item.href)

          return (
            <li key={item.key}>
              <Link
                aria-current={current ? 'page' : undefined}
                className={cn(styles.navLink, current && styles.navLinkActive)}
                href={item.href}
                {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default HeaderNav
