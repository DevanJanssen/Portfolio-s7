import type { CSSProperties } from 'react'

import { cn } from '@/utilities/cn'
import type { MaskLogo } from '@/utilities/logoFromMedia'
import styles from './index.module.scss'

type Props = {
  className?: string
  /**
   * Draw the logo at a fixed height for the logo strip. Without this the logo
   * fills the box the caller puts around it — the mask scales along while
   * keeping its ratio, the way `object-fit: contain` does for an image.
   */
  strip?: boolean
  logo: MaskLogo
}

/**
 * One brand logo, drawn as a CSS mask so that it takes on `currentColor`.
 *
 * That way a single file works on a light section and on a dark one. A logo is
 * decorative — the name of the technology is already in the CMS as text — so it
 * gets `aria-hidden`.
 */
export const TechLogo = ({ className, logo, strip = false }: Props) => {
  const style: CSSProperties = {
    aspectRatio: `${logo.width} / ${logo.height}`,
    maskImage: `url(${logo.src})`,
    WebkitMaskImage: `url(${logo.src})`,
  }

  return (
    <span aria-hidden className={cn(styles.logo, strip && styles.strip, className)} style={style} />
  )
}

export default TechLogo
