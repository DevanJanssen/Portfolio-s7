import {
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * De editor die overal geldt tenzij een veld iets anders opgeeft.
 *
 * Bewust kort: elke feature die je hier aanzet, moet de frontend-converter
 * (`components/RichText`) ook kunnen renderen. Voeg er dus alleen iets aan toe
 * samen met de bijbehorende render-regel.
 */
export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    LinkFeature({
      enabledCollections: ['pages'],
    }),
  ],
})
