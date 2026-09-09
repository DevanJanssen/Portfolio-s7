import type { CSSProperties } from 'react'

import RichText from '@/components/RichText'
import Section from '@/components/Section'
import type { ColumnsBlock as ColumnsBlockProps } from '@/payload-types'
import styles from './index.module.scss'

export const ColumnsBlockComponent = ({ anchor, background, columns }: ColumnsBlockProps) => (
  <Section anchor={anchor} background={background}>
    <div
      className={`container ${styles.columns}`}
      // Het aantal kolommen is redactionele data, geen klasse-explosie: één
      // custom property scheelt een variant per mogelijk aantal.
      style={{ '--columns': columns?.length ?? 1 } as CSSProperties}
    >
      {columns?.map((column, index) => (
        <div key={column.id ?? index}>
          {column.heading ? <h2>{column.heading}</h2> : null}
          <RichText data={column.content} />
        </div>
      ))}
    </div>
  </Section>
)
