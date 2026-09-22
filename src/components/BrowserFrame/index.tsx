import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'
import {
  BackGlyph,
  ChevronDownGlyph,
  DownloadGlyph,
  ForwardGlyph,
  PlusGlyph,
  ReaderGlyph,
  ReloadGlyph,
  ShareGlyph,
  SidebarGlyph,
  TabsGlyph,
} from './glyphs'
import styles from './index.module.scss'

type Props = {
  /** What goes inside the window: the screenshot or video. */
  children: ReactNode
  className?: string
  /** What the address bar reads. Text only — this is not a link. */
  url?: string | null
}

/**
 * A screenshot inside a Safari window.
 *
 * The whole title bar is decoration: buttons that do nothing are noise to a
 * screen reader, so it carries `aria-hidden`. Only the content below it stays
 * readable.
 *
 * The measurements come from a design 940px wide and are written here as
 * multiples of `--u`, one design pixel. That unit hangs off the width of the
 * window (`cqw`), so the bar scales in proportion instead of needing each
 * element adjusted separately.
 */
export const BrowserFrame = ({ children, className, url }: Props) => (
  <div className={cn(styles.browser, className)}>
    <div className={styles.window}>
      <div aria-hidden className={styles.bar}>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>

        <span className={cn(styles.pill, styles.sidebar)}>
          <SidebarGlyph className={styles.buttonIcon} />
          <ChevronDownGlyph className={styles.buttonIcon} />
        </span>

        <span className={cn(styles.pill, styles.history)}>
          <span className={styles.button}>
            <BackGlyph className={styles.buttonIcon} />
          </span>
          <span className={styles.separator} />
          <span className={cn(styles.button, styles.disabled)}>
            <ForwardGlyph className={styles.buttonIcon} />
          </span>
        </span>

        <span className={cn(styles.pill, styles.address)}>
          <ReaderGlyph className={styles.addressIcon} />
          <span className={styles.url}>{url}</span>
          <ReloadGlyph className={styles.addressIcon} />
        </span>

        <span className={cn(styles.pill, styles.actions)}>
          <span className={styles.button}>
            <DownloadGlyph className={styles.buttonIcon} />
          </span>
          <span className={styles.button}>
            <ShareGlyph className={styles.buttonIcon} />
          </span>
          <span className={styles.button}>
            <PlusGlyph className={styles.buttonIcon} />
          </span>
          <span className={styles.button}>
            <TabsGlyph className={styles.buttonIcon} />
          </span>
        </span>
      </div>

      {children}
    </div>
  </div>
)

export default BrowserFrame
