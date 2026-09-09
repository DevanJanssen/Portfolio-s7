import CMSLink from '@/components/CMSLink'
import { getGlobal } from '@/utilities/getGlobals'
import styles from './index.module.scss'

export const Footer = async () => {
  const footer = await getGlobal('footer')
  const navItems = footer.navItems ?? []

  if (!footer.note && navItems.length === 0) return null

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {footer.note ? <p className={styles.note}>{footer.note}</p> : null}

        {navItems.length > 0 ? (
          <ul className={styles.nav}>
            {navItems.map((item, index) => (
              <li key={item.id ?? index}>
                <CMSLink appearance="none" className={styles.link} link={item.link} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  )
}

export default Footer
