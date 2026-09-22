'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/utilities/cn'
import styles from './index.module.scss'

/**
 * Seconds it takes one logo to travel past. The duration scales with the number
 * of logos in a row, so the strip keeps the same pace whether an editor picks
 * five or fifteen — and also when the row repeats itself.
 */
const SECONDS_PER_LOGO = 3.5

export type LogoStripItem = {
  /** The logo itself, already drawn by the caller. */
  content: ReactNode
  /** Unique within the series; the series is placed more than once. */
  id: string
}

type Props = {
  className?: string
  items: LogoStripItem[]
}

/**
 * A ribbon of logos sliding endlessly to the left.
 *
 * The track is exactly two identical rows and shifts by one row, so `-50%`. The
 * moment the first row has passed, the second sits exactly where the first
 * began and the animation jumps back invisibly. That those two rows together
 * are always wider than the strip is the whole trick: a row therefore repeats
 * the series of logos as often as it needs to be wider than the strip itself.
 *
 * If an editor picks four, that series stands a few times in a row rather than
 * an empty stretch travelling along. How often depends on how wide those four
 * turn out — and that is the stylesheet's doing, a fixed height times the ratio
 * of the file. Hence this component measuring: recomputing it here would put the
 * same measurement in two places.
 *
 * The caller supplies the logos ready-made, so different strips can share one
 * track without this component needing to know about the libraries behind them.
 * A block with different spacing sets `--strip-gap`.
 *
 * The edges fade with a mask rather than a coloured overlay, so the strip is
 * correct on any section background.
 */
export const LogoStrip = ({ className, items }: Props) => {
  const [repeats, setRepeats] = useState(1)
  const stripRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const strip = stripRef.current
    const row = rowRef.current
    if (!strip || !row) return

    const measure = () => {
      // The row is a multiple of one series of logos, so to know the width of
      // that series the measurement has to know how often it currently sits in
      // there. That value comes from the updater itself: this way it need not be
      // a dependency, and re-measuring does not re-create the observer.
      setRepeats((current) => {
        const unit = row.offsetWidth / current
        if (unit <= 0) return current

        return Math.max(1, Math.ceil(strip.offsetWidth / unit))
      })
    }

    measure()

    // The strip changes width with the window, and a row changes as soon as the
    // editor picks different logos. One more series does make the row wider, but
    // not the outcome above — the division absorbs that — so this does not loop.
    const observer = new ResizeObserver(measure)
    observer.observe(strip)
    observer.observe(row)

    return () => observer.disconnect()
  }, [items.length])

  if (items.length === 0) return null

  const style = {
    '--strip-duration': `${items.length * repeats * SECONDS_PER_LOGO}s`,
  } as CSSProperties

  const row = Array.from({ length: repeats }, (_, repeat) =>
    items.map((logo) => (
      <li className={styles.item} key={`${repeat}-${logo.id}`}>
        {logo.content}
      </li>
    )),
  )

  return (
    // Decorative: the logos tell a screen reader nothing extra, and a row that
    // repeats itself would be read out several times.
    <div aria-hidden className={cn(styles.strip, className)} ref={stripRef} style={style}>
      <div className={styles.track}>
        <ul className={styles.row} ref={rowRef}>
          {row}
        </ul>
        <ul className={styles.row}>{row}</ul>
      </div>
    </div>
  )
}

export default LogoStrip
