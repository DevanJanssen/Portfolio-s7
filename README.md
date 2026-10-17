# Portfolio — Devan Janssen

Statische Next.js 15-site met drie scroll-gestuurde case studies en cursor-reactieve animaties. Geen CMS en geen
database: alle content staat in getypte bestanden onder `src/content`.

## Snelstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # statische export naar out/
```

Controle: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

## Deploy

`next.config.ts` staat op `output: 'export'` met `trailingSlash: true`: `pnpm build` levert
een map `out/` met gewone HTML-bestanden (`/projects/feedback/index.html`). Die kan op elke
statische host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Het domein is
`devanjanssen.com` (zie `CNAME`). Er zijn geen environment variables nodig.

## Content invullen

Alles wat nog geschreven moet worden is `ph('…')` en staat op de site zichtbaar
gestreept en met het woord **PLACEHOLDER**. Zoek ze zo op:

```bash
grep -rn "ph(" src/content
```

| Wat                              | Waar                             |
| -------------------------------- | -------------------------------- |
| Hero, about, contact, footer     | `src/content/site.ts`            |
| Projecten (volgorde = homepage)  | `src/content/projects/index.ts`  |
| Eén case study                   | `src/content/projects/<slug>.ts` |
| Types (hoofdstukken, beeldslots) | `src/content/types.ts`           |

Elke case study heeft vijf hoofdstukken: **intro (hook) → probleem → proces → oplossing →
resultaat**, elk met een eigen kleur (`tone`). Afbeeldingen: zet ze in
`public/images/<slug>/` en vul `src` in bij het beeldslot (`cover` of `images`). Zonder `src`
toont de site een placeholderblok met de beschrijving uit `alt`. Kies `ratio` passend bij de
foto, anders wordt hij bijgesneden.

Een nieuw project: kopieer een bestand in `src/content/projects/`, pas `slug` aan, en voeg
het toe aan de lijst in `index.ts`. De pagina `/projects/<slug>/` wordt automatisch gebouwd.

## Ontwerp

Zie [DESIGN.md](DESIGN.md) (editorial kinetic: zwart + roze, variabele Archivo-koppen die
op de cursor reageren, kantelende kaarten) en de gegenereerde basis in
[`design-system/devan-janssen-portfolio/MASTER.md`](design-system/devan-janssen-portfolio/MASTER.md).
Tokens: `src/styles/_tokens.scss`. Beweging: GSAP ScrollTrigger, met een volledig statische
weergave onder `prefers-reduced-motion`.
