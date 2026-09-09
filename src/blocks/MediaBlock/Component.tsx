import Media from '@/components/Media'
import Section from '@/components/Section'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import styles from './index.module.scss'

export const MediaBlockComponent = ({
  anchor,
  background,
  caption,
  media,
  width,
}: MediaBlockProps) => {
  const isFullWidth = width === 'full'
  // Valt terug op het bijschrift van het mediabestand zelf, zodat een
  // fotocredit niet bij elk gebruik opnieuw ingetypt hoeft te worden.
  const text = caption || (typeof media === 'object' && media ? media.caption : null)

  return (
    <Section anchor={anchor} background={background}>
      <figure className={`container ${isFullWidth ? '' : 'container--narrow'} ${styles.figure}`}>
        <Media
          resource={media}
          sizes={isFullWidth ? '100vw' : '(min-width: 768px) 720px, 100vw'}
        />
        {text ? <figcaption className={styles.caption}>{text}</figcaption> : null}
      </figure>
    </Section>
  )
}
