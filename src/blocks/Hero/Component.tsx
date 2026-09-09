import CMSLink from '@/components/CMSLink'
import Media from '@/components/Media'
import Section from '@/components/Section'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import styles from './index.module.scss'

export const HeroBlockComponent = ({
  anchor,
  background,
  heading,
  image,
  intro,
  links,
}: HeroBlockProps) => (
  <Section anchor={anchor} background={background}>
    <div className={`container ${styles.hero}`}>
      <div className={styles.body}>
        <h1>{heading}</h1>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
        {links?.length ? (
          <div className={styles.actions}>
            {links.map((item, index) => (
              <CMSLink key={item.id ?? index} link={item.link} />
            ))}
          </div>
        ) : null}
      </div>
      {image ? (
        <Media
          className={styles.image}
          // De hero staat boven de vouw: dit is de afbeelding die de LCP bepaalt.
          priority
          resource={image}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      ) : null}
    </div>
  </Section>
)
