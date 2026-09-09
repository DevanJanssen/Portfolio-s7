import RichText from '@/components/RichText'
import Section from '@/components/Section'
import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlockComponent = ({ anchor, background, content }: RichTextBlockProps) => (
  <Section anchor={anchor} background={background}>
    <div className="container container--narrow">
      <RichText data={content} />
    </div>
  </Section>
)
