import CMSLink from '@/components/CMSLink'
import Section from '@/components/Section'
import type { CallToActionBlock as CallToActionBlockProps } from '@/payload-types'
import styles from './index.module.scss'

export const CallToActionBlockComponent = ({
  anchor,
  background,
  heading,
  links,
  text,
}: CallToActionBlockProps) => (
  <Section anchor={anchor} background={background}>
    <div className="container">
      <div className={styles.card}>
        <div>
          <h2>{heading}</h2>
          {text ? <p className={styles.text}>{text}</p> : null}
        </div>
        {links?.length ? (
          <div className={styles.actions}>
            {links.map((item, index) => (
              <CMSLink key={item.id ?? index} link={item.link} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  </Section>
)
