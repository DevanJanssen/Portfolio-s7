# Portfolio — Devan Janssen

Static [Astro](https://astro.build) site. No CMS and no database: every project is an MDX file
in `src/content/projects/`.

## Quick start

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # type-check + static build to dist/
pnpm preview   # serve dist/ locally
```

## Adding or editing a project

Each project is a folder with an `index.mdx` and its images:

```
src/content/projects/hydrowear/
  index.mdx
  cover.jpg
  screen-1.png
```

The frontmatter fills the fixed parts of the page (title, list subtitle, intro, Role / Context /
Focus, cover image, hover preview). The schema lives in `src/content.config.ts`.

| Field                      | Notes                                                            |
| -------------------------- | ---------------------------------------------------------------- |
| `title`                    | Project name                                                     |
| `category`                 | Shown under the title: `Development & Design / 2026`             |
| `year`                     | Number                                                           |
| `order`                    | Position on the list, lowest first                               |
| `intro`                    | Paragraph under the big title                                    |
| `role`, `context`, `focus` | The three meta fields next to the intro                          |
| `cover`, `coverAlt`        | Hero image and hover preview (relative path, e.g. `./cover.jpg`) |
| `coverFit`                 | `cover` (screenshots, default) or `contain` (logos)              |
| `coverBackground`          | Optional background behind a contained cover, e.g. `'#ffffff'`   |
| `previewVideo`             | Optional muted loop for the hover preview, path under `public/`  |
| `draft`                    | `true` hides the project in production builds                    |

Everything below the header is free-form. Use any of these blocks, in any order, with your own
headings. They are available in every project file without importing them:

```mdx
import sketch from './sketch.jpg'

<Section title="Any heading">Markdown text…</Section>

<Numbered items={[{ title: 'Point', text: 'Explanation' }]} />

<Callout>One big statement.</Callout>

<Figure src={sketch} alt="…" caption="…" />
<Figure alt="Planned image" /> {/* no src = placeholder box */}
<Figure video="/videos/demo.mp4" alt="…" />

<BeforeAfter before={old} after={next} beforeAlt="…" afterAlt="…">
  **What changed:** …
</BeforeAfter>

<Gallery
  columns={3}
  images={[
    { src: a, alt: '…' },
    { src: b, alt: '…' },
  ]}
/>
```

Text that still has to be written starts with `Placeholder:`. Find it with:

```bash
grep -rn "Placeholder" src
```

## Other content

- Name, role, nav and contact links: `src/site.ts`
- Home and Info page text: `src/pages/index.astro`, `src/pages/info.astro`

## Design

- Pink page with a rounded dark window (`.frame` in `src/layouts/Base.astro`). The
  `theme-color` meta tag tints Safari's toolbar the same pink.
- Grainy drifting background: a WebGL shader in `src/components/Grain.astro`
  (static frame with `prefers-reduced-motion`).
- Colours and spacing tokens: `src/styles/global.css`.
- Fonts: Inter Tight (text) and JetBrains Mono (labels), self-hosted via Fontsource.

## Deploy

Vercel (`vercel.json`), domain `devanjanssen.com` (`CNAME`). `pnpm build` outputs plain HTML to
`dist/`, so any static host works.
