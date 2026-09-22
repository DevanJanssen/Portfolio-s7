import type { Block } from 'payload'

import { CallToActionBlock } from './CallToAction/config'
import { ColumnsBlock } from './Columns/config'
import { HeroBlock } from './Hero/config'
import { ImportantProjectsBlock } from './ImportantProjects/config'
import { MediaBlock } from './MediaBlock/config'
import { ProjectsBlock } from './Projects/config'
import { RichTextBlock } from './RichText/config'

/**
 * De blokken die een redacteur op een pagina of project kan zetten.
 *
 * Een nieuw blok toevoegen is drie stappen: config hier registreren, component
 * in `components/BlockRenderer` koppelen, en `pnpm generate:types` draaien.
 */
export const pageBlocks: Block[] = [
  HeroBlock,
  RichTextBlock,
  MediaBlock,
  ColumnsBlock,
  CallToActionBlock,
  ProjectsBlock,
  ImportantProjectsBlock,
]
