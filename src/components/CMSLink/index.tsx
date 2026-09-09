import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'
import { isExternalHref, resolveLinkHref, type LinkValue } from '@/utilities/resolveLinkHref'
import styles from './index.module.scss'

type Appearance = NonNullable<LinkValue['appearance']> | 'none'

type Props = {
  appearance?: Appearance
  children?: ReactNode
  className?: string
  link?: LinkValue | null
}

const APPEARANCE_CLASS: Record<Appearance, string | undefined> = {
  default: styles.default,
  outline: styles.outline,
  plain: styles.plain,
  none: undefined,
}

export const CMSLink = ({ appearance, children, className, link }: Props) => {
  const href = resolveLinkHref(link)

  if (!href) return null

  const label = children ?? link?.label
  if (!label) return null

  const variant = appearance ?? link?.appearance ?? 'default'
  const classes = cn(
    styles.cmsLink,
    variant !== 'none' && styles.button,
    APPEARANCE_CLASS[variant],
    className,
  )

  const targetProps = link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  if (isExternalHref(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a className={classes} href={href} {...targetProps}>
        {label}
      </a>
    )
  }

  return (
    <Link className={classes} href={href} {...targetProps}>
      {label}
    </Link>
  )
}

export default CMSLink
