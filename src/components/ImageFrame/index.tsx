import type { ImageSlot } from '@/content/types'
import { phClass } from '@/lib/ph'

import styles from './index.module.scss'

interface Props {
  image: ImageSlot
  /** Zet `data-parallax` op het binnenste element; CaseStudy pakt het op. */
  parallax?: boolean
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Vaste beeldverhouding, zodat de layout niet verspringt (en ScrollTrigger
 * klopt). Zonder `src` een duidelijk gemarkeerd placeholderblok.
 */
export const ImageFrame = ({ image, parallax, priority, className }: Props) => {
  const ratio = image.ratio ?? '16/9'

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <div className={styles.frame} style={{ aspectRatio: ratio }} data-frame>
        <div className={styles.inner} data-parallax={parallax ? '' : undefined}>
          {image.src ? (
            // Statische export: geen image-optimizer, dus gewoon <img>.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.img}
              src={image.src}
              alt={image.alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          ) : (
            <div className={styles.placeholder} role="img" aria-label={image.alt}>
              <span className={styles.placeholderLabel}>Image placeholder · {ratio}</span>
              <span className={styles.placeholderHint}>{image.alt}</span>
            </div>
          )}
        </div>
      </div>
      {image.caption && (
        <figcaption className={phClass(image.caption, styles.caption)}>{image.caption}</figcaption>
      )}
    </figure>
  )
}
