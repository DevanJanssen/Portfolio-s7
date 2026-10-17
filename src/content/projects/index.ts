import type { Project } from '../types'
import { brandAFriend } from './brand-a-friend'
import { feedback } from './feedback'
import { vendingMachine } from './vending-machine'

/** Volgorde hier = volgorde op de homepage en in de vorige/volgende-navigatie. */
export const projects: Project[] = [brandAFriend, vendingMachine, feedback]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)

export const getNeighbours = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug)
  const count = projects.length

  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  }
}
