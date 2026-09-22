'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/utilities/cn'
import styles from './index.module.scss'

/**
 * The scroll distance of the phases, in screen heights.
 *
 * `SETTLE` is the run-up. Without that room the stack already falls apart the
 * moment it pins, and the visitor never sees it standing complete. After that
 * every card sliding away gets one screen height — the next only once the
 * previous is out of frame, never two at a time.
 *
 * `HOLD` is the rest after the last card slides away. Without it the journey
 * starts the moment the previous card has just passed the edge of the screen,
 * and the two run into each other. With `HOLD` the card that remains stands
 * alone in frame for half a screen height first: the sliding is visibly over
 * before the journey begins.
 *
 * Then that card spends `HANDOFF` travelling to its place in the layout, and the
 * heading and the list follow in `REVEAL`.
 */
const SETTLE = 0.6
const HOLD = 0.35
const HANDOFF = 1.2
const REVEAL = 0.8

/**
 * The scroll distance per project in the list, in screen heights.
 *
 * Once the heading and the list are there, the stage stays pinned and the
 * projects open one by one: every project gets `STEP` of scroll distance, the
 * progress bar on its line fills within it, and at the end of it the next one
 * opens. The last one gets its own `STEP` too — that bar fills while the visitor
 * leaves the block, so every project is in view equally long.
 *
 * Slightly shorter than a screen height: this is paging through a list, not a
 * card sliding away, and with six projects every tenth counts.
 */
const STEP = 0.8

/**
 * How long a project stays in view when the block plays itself, in seconds.
 *
 * Playing is nothing other than scrolling here: the bar, the open project and
 * the screenshot all hang off the scroll position, so let the player simply push
 * the page forward. One source for whose turn it is, whether the visitor scrolls
 * themselves or the block does it for them.
 */
const AUTOPLAY = 5

/**
 * How steeply a card slides away: how much it rises, as a fraction of the
 * distance it covers sideways. The cards therefore disappear towards the top
 * corners rather than straight out to the side.
 *
 * 0.45 is the ratio from the design this block started with: 160% of a card
 * width sideways against 120% of a card height upwards, on a card half again as
 * wide as it is tall. Because the rise follows from the sideways distance and
 * not from the card size, every card's path is equally steep — including that of
 * the smaller cards at the back.
 *
 * This applies only to the cards that slide away. The last one stays put and
 * then travels flat to the right, to the window in the layout.
 */
const RISE = 0.45

/**
 * How many degrees a card tilts on the way, away from the centre: the one going
 * right turns clockwise, the one going left against it. This too is the value
 * from the design this block started with.
 *
 * A tilted card covers more width than a straight one: at 12° roughly 15% of its
 * own width extra. That fits well within the quarter card `swipe()` adds on top
 * of the distance to the edge of the screen, so the tilt changes nothing about
 * the moment it is out of frame.
 *
 * And this too applies only to the cards that slide away: the last one travels
 * upright to the window.
 */
const TILT = 12

/**
 * When the choreography runs.
 *
 * What stands in frame at the end — heading, list and window — has to fit
 * together in one screen height. That is the only requirement, and it is about
 * height: on a phone those three stand below each other instead of beside each
 * other, but they still fit. Hence no lower bound on width; what does remain is
 * the measurement further down, which decides after measuring *these* projects.
 *
 * If it does not fit, the block falls back to the ordinary layout: no stack, no
 * pinning, just the heading with the projects below it. Without JavaScript the
 * same thing happens, and that is exactly what the server renders — the
 * stylesheet only switches the choreography on once `data-staged` is on the
 * track.
 *
 * That same fallback is the answer to `prefers-reduced-motion`. The layout with
 * the heading, the list and the window *is* the block, and the stack is the way
 * you enter it. Anyone asking for less motion therefore gets no pinned section
 * of five screen heights with cards flying past, but simply the projects.
 */
const STAGED = '(min-height: 700px)'

/**
 * Paging through the list, in screen heights. With one project it falls away:
 * there is nothing to page to, and a progress bar leading nowhere is only scroll
 * distance.
 */
const browseLength = (count: number): number => (count > 1 ? count * STEP : 0)

/**
 * The whole scroll distance of the stage, in screen heights: the run-up, one per
 * card sliding away, the rest after it, the journey, the reveal and the paging.
 * The stylesheet works out the height of the track with this and the timeline
 * runs exactly alongside it — one second per screen height — so they belong to
 * the same sum.
 */
const trackLength = (count: number): number =>
  count > 0
    ? // Rounded, or the track's `style` reads `7.3500000000000005`: adding tenths
      // in floating point comes out just short.
      Math.round((SETTLE + count - 1 + HOLD + HANDOFF + REVEAL + browseLength(count)) * 1000) / 1000
    : 0

type Props = {
  /** The cards of the stack, front to back; every card carries `data-project`. */
  cards: ReactNode
  /** The layout the stack dissolves into: the heading, the list and the window. */
  children: ReactNode
  count: number
}

/**
 * The stage on which the project stack turns into the project list.
 *
 * One movement in three phases. The stack is `position: sticky` in a tall track
 * — the browser handles the pinning — and ScrollTrigger puts the progress
 * through that track on a timeline. In it, all cards but one first slide
 * diagonally out of frame: the front one to the top right, the next to the top
 * left, and so on alternating. They go strictly in turn, and the cards still
 * lying there stay where they lie — none steps forward. They tilt a notch away
 * from the centre on the way. What remains is therefore always the stack minus
 * the card that just left. Once the last one is gone it stands still for a
 * moment (`HOLD`), so the sliding is visibly over. Only then does the card that
 * remains — the first project, the one at the back of the stack — leave, as the
 * only one not diagonally and not tilted but flat to the right, growing on the
 * way to the size of the window in the layout. Only when it is there do the
 * heading and the list come up.
 *
 * The journey is a FLIP: the end measurements are not in the code, the
 * difference between two measured boxes is, so the card lands exactly on the
 * window on every screen. The moment it does, the real window takes over and the
 * stage disappears — twice the same image in the same place, so that swap cannot
 * be seen. From then on the list is simply a list again.
 *
 * Because it is a `scrub` and not a played animation, everything runs back just
 * as readily when the visitor scrolls up.
 */
export const Stage = ({ cards, children, count }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    const backdrop = backdropRef.current
    const content = contentRef.current
    if (!track || !backdrop || !content || count < 1) return

    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()

    media.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        // The same breakpoint as in the stylesheet: above it the list stands
        // beside the window and the player is gone, below it one project shows
        // and the player controls the block. As a condition and not as a
        // separate measurement, so `matchMedia` rebuilds the choreography if you
        // cross the boundary.
        roomy: '(min-width: 1024px)',
        wide: STAGED,
      },
      (context) => {
        const { reduced, roomy, wide } = context.conditions as {
          reduced: boolean
          roomy: boolean
          wide: boolean
        }
        if (!wide || reduced) return

        const frames = gsap.utils.toArray<HTMLElement>('[data-project]', track)
        const reveal = gsap.utils.toArray<HTMLElement>('[data-reveal]', track)
        const screens = track.querySelector<HTMLElement>('[data-screens]')
        // The list: a progress bar per project on its line, and the radio button
        // saying which project is open.
        const bars = gsap.utils.toArray<HTMLElement>('[data-progress]', track)
        const toggles = gsap.utils.toArray<HTMLInputElement>('[data-toggle]', track)
        // The back card of the stack: the first project, and therefore the one
        // that stays put and later travels to the window.
        const hero = frames.at(-1)
        if (!hero || !screens) return

        // The media query above says whether the screen is roomy enough, but not
        // whether *these* projects fit in it: a long summary makes the list
        // taller than a screen height, and then the stage would cut it off.
        // Measuring can still be honest here, because `data-staged` is not on it
        // yet and heading, list and window are simply in the page.
        if (content.getBoundingClientRect().height > window.innerHeight) return

        // From here the block is in the choreography: the stylesheet gives the
        // track its height, pins the stage and takes heading, list and window
        // away. Straight onto the element and not through state, because
        // `data-landed` below changes while scrolling and the cards need not be
        // redrawn for it.
        track.dataset.staged = 'true'

        /**
         * The box a card lies in, and how much its place in the stack shrinks it.
         *
         * Measured on the `.slot` around it and on the card's own layout size,
         * because those are the two things GSAP does not touch: they therefore
         * still hold if something is recalculated mid-flight. GSAP writes in the
         * card's own scale and not in screen pixels, so everything measured in
         * pixels below has to go through `depth`.
         */
        const seat = (card: HTMLElement) => {
          const box = (card.parentElement ?? card).getBoundingClientRect()
          return { box, depth: box.width / card.offsetWidth }
        }

        /**
         * Where a card slides to in order to leave the frame: sideways past the
         * edge of the screen, and in the same movement `RISE` times that
         * distance upwards.
         *
         * The sideways distance is measured and not in percentages of the card:
         * the cards at the back stand smaller, and a percentage reckons in
         * *their* size — the back one would get stuck halfway across the screen.
         * A quarter card is added on top of the distance to the edge, so nothing
         * is left hanging even with a shadow or a rounded corner.
         *
         * It is the side that decides when the card is gone: the rise is too
         * small to lift it over the top edge. That way the diagonal path changes
         * nothing about the moment the next card's turn comes.
         */
        const swipe = (card: HTMLElement, toRight: boolean) => () => {
          const { box, depth } = seat(card)
          const distance =
            ((toRight ? window.innerWidth - box.left : box.right) + box.width / 4) / depth

          return { x: (toRight ? 1 : -1) * distance, y: -RISE * distance }
        }

        /**
         * The difference between where the last card lies and the window it has
         * to reach. All values are absolute, measured from the card without a
         * transform, so it does not matter where the timeline puts it meanwhile.
         */
        const toScreens = () => {
          const { box: from, depth } = seat(hero)
          const to = screens.getBoundingClientRect()
          // The card is as tall as the window inside it and not as tall as its
          // `.slot`; it makes a fraction of a difference, but exactly on landing.
          const height = hero.offsetHeight * depth

          return {
            scale: to.width / from.width,
            x: (to.left + to.width / 2 - (from.left + from.width / 2)) / depth,
            y: (to.top + to.height / 2 - (from.top + height / 2)) / depth,
          }
        }

        const total = trackLength(count)
        const handoff = SETTLE + count - 1 + HOLD
        const landing = (handoff + HANDOFF) / total
        // From here the layout is there and it is only about the list.
        const browse = handoff + HANDOFF + REVEAL

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            // The journeys are in measured pixels; at a different window width
            // that measurement no longer holds, so `swipe()` and `toScreens()`
            // recalculate.
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.progress >= landing) track.dataset.landed = 'true'
              else delete track.dataset.landed

              // Which project belongs to this scroll position? The radio button
              // stays the source of truth — ticking it opens the panel and
              // switches the screenshot, both through `:has()` in the
              // stylesheet. A radio button ticked in JavaScript fires no
              // `change`, so this does not bite the listener below.
              if (count < 2) return

              const step = Math.floor((self.progress * total - browse) / STEP)
              const open = toggles[gsap.utils.clamp(0, count - 1, step)]
              if (open && !open.checked) open.checked = true
            },
          },
        })

        // One second of timeline per unit of scroll distance, so that "a card"
        // and "a screen height" mean the same thing. Every card starts exactly
        // where the previous one stops: the visitor therefore sees them go one by
        // one and not as a group.
        frames.slice(0, -1).forEach((card, index) => {
          const toRight = index % 2 === 0
          const away = swipe(card, toRight)

          timeline.to(
            card,
            {
              // Diagonally out of the top corner: sideways and upwards, in one
              // straight line without a curve, tilting on the way. `power1.inOut`
              // sets the card in motion gently and lets it run out at the end;
              // because of that it has passed the edge of the screen at
              // three quarters of its screen height and the stack stands still
              // for the last quarter before the next card leaves.
              x: () => away().x,
              y: () => away().y,
              rotation: toRight ? TILT : -TILT,
              ease: 'power1.inOut',
              duration: 1,
            },
            SETTLE + index,
          )
        })

        // `autoAlpha` and not only `opacity`: as long as the heading and the list
        // are not there, they should not be clickable or readable either. As a
        // starting value and not as a `fromTo`, because a `fromTo` with `stagger`
        // only puts the first one at its starting position while the timeline has
        // not reached this part yet.
        gsap.set(reveal, { autoAlpha: 0, y: 32 })

        timeline
          .to(
            hero,
            {
              x: () => toScreens().x,
              y: () => toScreens().y,
              scale: () => toScreens().scale,
              ease: 'power2.inOut',
              duration: HANDOFF,
            },
            handoff,
          )
          // The tinted panel with the pill belongs to the stack, not to the
          // layout; it goes away as the card leaves.
          .to(backdrop, { autoAlpha: 0, ease: 'power2.inOut', duration: HANDOFF }, handoff)
          .to(
            reveal,
            {
              autoAlpha: 1,
              y: 0,
              ease: 'power2.out',
              duration: REVEAL * 0.7,
              stagger: REVEAL * 0.3,
            },
            handoff + HANDOFF,
          )

        // The paging: one bar filling per project. `none` as the ease, because a
        // progress bar that speeds up or slows down lies about how much is left.
        // They stay full once they are past — together they read as a measure
        // along the list.
        if (count > 1) {
          // From here the progress bar draws the lines in the list and the fixed
          // borders go off. Its own flag and not `data-staged`: with one project
          // the paging falls away, and then that list should simply keep its
          // lines instead of losing them to a bar that never comes.
          track.dataset.browse = 'true'

          gsap.set(bars, { scaleX: 0, transformOrigin: 'left center' })

          // There can be more than one bar per project: the line above the
          // project in the list, and the bead in the player. Which project a bar
          // belongs to is therefore on the element and does not follow from its
          // place in the row.
          bars.forEach((bar) => {
            const index = Number(bar.dataset.progress)
            if (!Number.isInteger(index)) return

            timeline.to(bar, { scaleX: 1, ease: 'none', duration: STEP }, browse + index * STEP)
          })
        }

        // The list stays clickable, and operable with the arrow keys. But the
        // scroll position decides which project is open, so a choice that does
        // not match it would be put back a frame later. Hence: whoever picks a
        // project is taken to that project's stretch of scroll distance. Just
        // past the start of it, so the bar there is still all but empty.
        const onPick = (event: Event) => {
          const trigger = timeline.scrollTrigger
          const index = toggles.indexOf(event.currentTarget as HTMLInputElement)
          if (!trigger || index < 0) return

          const at = (browse + (index + 0.05) * STEP) / total
          window.scrollTo({
            top: trigger.start + at * (trigger.end - trigger.start),
            behavior: 'smooth',
          })
        }

        if (count > 1) {
          toggles.forEach((toggle) => toggle.addEventListener('change', onPick))
        }

        /**
         * The block plays itself.
         *
         * Not with a clock of its own beside the timeline, but by pushing the
         * page forward: the bar, the open project and the screenshot all hang off
         * the scroll position, so this is exactly what the visitor would do with
         * their thumb — only evenly. One source for whose turn it is, and
         * therefore no two that can run against each other.
         *
         * Only in the narrow layout: there the player is in view and the visitor
         * can stop it. Beside the window the whole list already stands, and then
         * the page should not move of its own accord.
         */
        const player = track.querySelector<HTMLButtonElement>('[data-play]')
        const autoplays = Boolean(player) && !roomy && count > 1

        let frame = 0
        let previous = 0

        /** Is the paging running now? Only then does the player push the page. */
        const browsing = (): boolean => {
          const trigger = timeline.scrollTrigger
          if (!trigger) return false

          const at = trigger.progress * total

          return at >= browse && at < total
        }

        const advance = (now: number) => {
          frame = requestAnimationFrame(advance)

          const since = previous
          previous = now
          const trigger = timeline.scrollTrigger
          if (!since || !trigger || !browsing()) return

          // One project per `AUTOPLAY` seconds, converted to the scroll distance
          // one project takes up in this track.
          const perUnit = (trigger.end - trigger.start) / total
          window.scrollBy(0, ((now - since) / 1000) * (STEP / AUTOPLAY) * perUnit)
        }

        const run = () => {
          if (frame) return
          previous = 0
          frame = requestAnimationFrame(advance)
        }

        const halt = () => {
          if (frame) cancelAnimationFrame(frame)
          frame = 0
        }

        let playing = autoplays

        const setPlaying = (next: boolean) => {
          playing = next
          if (player) {
            player.dataset.playing = next ? 'true' : 'false'
            player.setAttribute(
              'aria-label',
              next ? 'Pause automatic browsing' : 'Browse automatically',
            )
          }

          if (next) run()
          else halt()
        }

        // If the visitor scrolls themselves, they take over. Our own `scrollBy`
        // fires no `wheel` or `touchstart`, so this is only about a real push —
        // and only during the paging, because the way there they scroll
        // themselves too.
        const interrupt = () => {
          if (playing && browsing()) setPlaying(false)
        }

        const onPlay = () => setPlaying(!playing)

        if (autoplays) {
          setPlaying(true)
          player?.addEventListener('click', onPlay)
          window.addEventListener('wheel', interrupt, { passive: true })
          window.addEventListener('touchstart', interrupt, { passive: true })
        }

        // ScrollTrigger measures the track the moment it is created, and at that
        // moment `data-staged` has not been on it for a single frame: the track
        // is then as tall as the layout instead of a number of screen heights.
        // On top of that `100svh` shifts as soon as a phone's browser bars slide
        // in or out, and the screenshots only arrive after that.
        requestAnimationFrame(() => ScrollTrigger.refresh())

        return () => {
          halt()
          player?.removeEventListener('click', onPlay)
          window.removeEventListener('wheel', interrupt)
          window.removeEventListener('touchstart', interrupt)
          toggles.forEach((toggle) => toggle.removeEventListener('change', onPick))
          delete track.dataset.staged
          delete track.dataset.landed
          delete track.dataset.browse
        }
      },
    )

    return () => media.revert()
  }, [count])

  return (
    <div
      className={styles.track}
      ref={trackRef}
      // How many screen heights the visitor scrolls through the stage; the height
      // of the track is worked out with it in the stylesheet.
      style={{ '--track': trackLength(count) } as CSSProperties}
    >
      <div className={styles.scene}>
        {/* The panel the stack lies on. It sits on the stage rather than on the
            section because the editor picks the background of the block, and
            that should come back into view once the stack has dissolved. */}
        <div aria-hidden className={styles.backdrop} ref={backdropRef}>
          <span className={styles.pill} />
        </div>

        {/* Decoration: these are the same projects as in the list below, and
            there they stand with their name and their link. A second set of
            images in between is only noise to a screen reader. */}
        <div aria-hidden className={styles.stage}>
          <div className={styles.stack}>{cards}</div>
        </div>

        <div className={cn('container', styles.reveal)} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Stage
