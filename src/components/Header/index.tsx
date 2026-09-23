import Link from 'next/link'

import { getGlobal } from '@/utilities/getGlobals'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'
import HeaderNav, { type HeaderNavItem } from './HeaderNav'
import styles from './index.module.scss'

export const Header = async () => {
  const header = await getGlobal('header')
  const title = header.siteTitle || 'Portfolio'

  const navItems: HeaderNavItem[] = (header.navItems ?? []).flatMap((item, index) => {
    const href = resolveLinkHref(item.link)
    if (!href || !item.link?.label) return []

    return [
      { href, key: item.id ?? String(index), label: item.link.label, newTab: item.link.newTab },
    ]
  })

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.logo} href="/">
          <span aria-hidden className={styles.prompt}>
            ~/
          </span>
          {title}
        </Link>
        <HeaderNav items={navItems} />
      </div>
    </header>
  )
}

export default Header
