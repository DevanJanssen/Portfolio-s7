import Link from 'next/link'
import type { CSSProperties } from 'react'

import BrowserFrame from '@/components/BrowserFrame'
import CMSLink from '@/components/CMSLink'
import LogoStrip from '@/components/LogoStrip'
import Media from '@/components/Media'
import Section from '@/components/Section'
import TechLogo from '@/components/TechLogo'
import type { ImportantProjectsBlock as ImportantProjectsBlockProps, Project } from '@/payload-types'
import { resolveLogoItems } from '@/utilities/logoFromMedia'
import { projectPath } from '@/utilities/projectPath'
import { queryProjectsByIds } from '@/utilities/queryProjects'
import Stage from './Stage'
import styles from './index.module.scss'

/** The window is 1002px wide in a design of 1728px. */
const STACK_SIZES = '(min-width: 1728px) 1002px, 58vw'
/** The window on the right of the layout, 940px in that same design. */
const SCREEN_SIZES = '(min-width: 1024px) 60vw, 100vw'

/**
 * What the address bar of a project's window reads.
 *
 * The live demo is what the screenshot actually shows, so that link wins; if
 * there is none, the first link is still a better address than an empty bar.
 * `www.` comes off because a browser hides it too.
 */
const addressFor = (project: Project): string | undefined => {
  const links = project.links ?? []
  const target = links.find((entry) => entry.type === 'demo') ?? links[0]
  if (!target?.url) return undefined

  try {
    return new URL(target.url).hostname.replace(/^www\./, '')
  } catch {
    // Not an absolute URL — a relative path says nothing useful in an address
    // bar, so the bar stays empty rather than showing half of one.
    return undefined
  }
}

/** The ids behind the relationship, whether or not Payload populated it. */
const idsOf = (projects: ImportantProjectsBlockProps['projects']): number[] =>
  (projects ?? []).flatMap((entry) => {
    if (typeof entry === 'number') return [entry]

    return typeof entry?.id === 'number' ? [entry.id] : []
  })

/**
 * Important projects: the projects lie stacked as browser windows, tilt out of
 * frame one by one while scrolling — alternating to the top right and the top
 * left — and the last one left travels upright to the right and grows into the
 * window beside the project list. After that the block stands as designed: on
 * the left a list with one item open, on the right the screenshot of that
 * project, below it a ribbon of logos and finally the buttons.
 *
 * One list of projects feeds both: the same cover is the card in the stack and
 * the screenshot on the right. The stack draws them back to front, so the first
 * project lies at the back — that is the one that stays put, and also the one
 * that starts out open in the list.
 *
 * The content comes from the `projects` collection rather than from fields on
 * this block, so a project edited once is right everywhere. It is queried here
 * instead of read from the relationship: a block's own page query stops one
 * level short of the logo hanging off a technology — see `queryProjectsByIds`.
 *
 * Opening a list item runs through a group of radio buttons instead of
 * JavaScript. That buys three things at once: the list works without JS, the
 * browser handles the keyboard (arrow keys move between projects), and the block
 * stays a server component apart from these images. Which screenshot is visible
 * hangs off that same radio button through `:has()` — see `index.module.scss`.
 * The motion around it lives in `Stage.tsx`.
 *
 * When the stage runs, that radio button stays the source of truth: `Stage`
 * ticks it while scrolling, so the projects open one by one without a second
 * record of "which one is open" coming into being.
 */
export const ImportantProjectsBlockComponent = async ({
  anchor,
  background,
  heading,
  id,
  links,
  projects,
  tools,
}: ImportantProjectsBlockProps) => {
  const items = await queryProjectsByIds(idsOf(projects))

  // Every chosen project is unpublished or deleted: there is no block left to
  // render, and an empty stage would still cost its screen heights of scrolling.
  if (items.length === 0) return null

  const group = `important-projects-${id ?? anchor ?? 'block'}`
  const buttons = links ?? []

  // Back to front: the first project gets the greatest depth and so lies at the
  // back. `--depth` tells the stylesheet how far back a card sits: how much
  // smaller it stands, and how far it peeks out from under the card in front.
  const stack = items
    .map((item, index) => ({ index, item }))
    .reverse()
    .map(({ index, item }, depth) => (
      <div
        className={styles.slot}
        key={item.id ?? index}
        style={{ '--depth': depth } as CSSProperties}
      >
        {/* `data-project` is the handle `Stage` finds the cards by; the class
            name is hashed and therefore unusable. The motion sits on this layer
            and the stacking on the one around it, so GSAP and the stylesheet do
            not fight over the same `transform`. */}
        <div className={styles.card} data-project>
          <BrowserFrame url={addressFor(item)}>
            <Media className={styles.screenshot} resource={item.cover} sizes={STACK_SIZES} />
          </BrowserFrame>
        </div>
      </div>
    ))

  return (
    <Section anchor={anchor} background={background} className={styles.importantProjects}>
      <Stage cards={stack} count={items.length}>
        {heading ? (
          <h2 className={styles.heading} data-reveal>
            {heading}
          </h2>
        ) : null}

        <div className={styles.layout}>
          <ul className={styles.list} data-reveal>
            {items.map((item, index) => {
              const inputId = `${group}-${item.id ?? index}`
              const tech = resolveLogoItems(item.techStack)

              return (
                <li className={styles.item} key={item.id ?? index}>
                  {/* The line above this project, doubling as a progress bar. It
                      sits exactly on the border and fills as the visitor scrolls
                      on; `Stage` finds it by `data-progress` and leaves it alone
                      while the stage is not running. */}
                  <span aria-hidden className={styles.progress} data-progress={index} />

                  <input
                    className={styles.toggle}
                    data-toggle
                    defaultChecked={index === 0}
                    id={inputId}
                    name={group}
                    type="radio"
                  />
                  <label className={styles.summary} htmlFor={inputId}>
                    {item.title}
                  </label>

                  <div className={styles.panel}>
                    <div className={styles.body}>
                      <div className={styles.description}>
                        {item.tagline ? <p>{item.tagline}</p> : null}
                        {item.summary ? <p>{item.summary}</p> : null}
                      </div>

                      <Link className={styles.projectLink} href={projectPath(item.slug)}>
                        View project
                        <svg
                          aria-hidden
                          className={styles.projectLinkChevron}
                          fill="none"
                          viewBox="0 0 5 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1l3 3.5L1 8"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </Link>
                    </div>

                    {tech.length > 0 ? (
                      <div className={styles.techstack}>
                        <p className={styles.techstackLabel}>Tech stack</p>
                        <ul className={styles.chips}>
                          {tech.map((entry) => (
                            <li className={styles.chip} key={entry.id}>
                              <TechLogo className={styles.chipLogo} logo={entry.logo} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>

          {/* The player: on a phone it sits between the window and the project.
              There it is the control of the block — which project you see, how
              far along it is, and whether it advances by itself. On a wide
              screen the whole list is there and the line above each project
              already says as much; then the player stays away. */}
          <div className={styles.player}>
            <div className={styles.beads}>
              {items.map((item, index) => (
                <span className={styles.bead} key={item.id ?? index}>
                  <span className={styles.beadFill} data-progress={index} />
                </span>
              ))}
            </div>

            {/* The label and the state switch in `Stage`: that knows whether the
                block is advancing by itself at this moment. */}
            <button
              aria-label="Pause automatic browsing"
              className={styles.play}
              data-play
              type="button"
            />
          </div>

          {/* `data-screens` is the box the card from the stack flies to; `Stage`
              measures it to work out the journey. While that card is still lying
              over it, this list is set to invisible. */}
          <ul className={styles.screens} data-screens>
            {items.map((item, index) => (
              <li className={styles.screen} key={item.id ?? index}>
                <BrowserFrame url={addressFor(item)}>
                  <Media className={styles.screenshot} resource={item.cover} sizes={SCREEN_SIZES} />
                </BrowserFrame>
              </li>
            ))}
          </ul>
        </div>
      </Stage>

      <LogoStrip
        className={styles.strip}
        items={resolveLogoItems(tools).map((entry) => ({
          content: <TechLogo logo={entry.logo} strip />,
          id: entry.id,
        }))}
      />

      {buttons.length > 0 ? (
        <div className={`container ${styles.buttons}`}>
          {buttons.map((entry, index) => (
            <CMSLink className={styles.button} key={entry.id ?? index} link={entry.link} />
          ))}
        </div>
      ) : null}
    </Section>
  )
}

export default ImportantProjectsBlockComponent
