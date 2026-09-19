# Portfolio

Schoolportfolio op Next.js 16 + Payload 3 + Postgres. Gebouwd op dezelfde
stack en patronen als de stofloos-website-template: een redacteur (jij) bouwt
pagina's door blokken te stapelen, en elke schoolopdracht is een eigen
document in het CMS.

## Snelstart

```bash
pnpm install
cp env.example .env          # en vul PAYLOAD_SECRET en PREVIEW_SECRET in
pnpm db:up                   # Postgres in Docker, op poort 5434
pnpm migrate                 # schema aanmaken
pnpm seed                    # beheerder, homepage en een voorbeeldopdracht
pnpm dev
```

De site staat op http://localhost:3000, de admin op /admin. Inloggen met wat er
in `SEED_EMAIL` / `SEED_PASSWORD` staat.

Zonder seed maak je zelf de eerste gebruiker aan via /admin (geef die de rol
**Beheerder**) en daarna een pagina met slug `home` — die rendert op `/`.

Postgres draait hier op poort **5434**, zodat hij naast een lokale Postgres
(5432) of de stofloos-template (5433) kan staan.

## Wat zit erin

| Onderdeel | Waar |
| --- | --- |
| Vrije pagina's (home, over mij, …) | `src/collections/Pages` |
| Schoolopdrachten | `src/collections/Assignments` — `/opdrachten/<slug>` |
| Blokken | Hero, tekst, media, kolommen, call-to-action, opdrachtenoverzicht |
| Header en footer | `src/globals` |
| Media, optioneel S3 | `src/collections/Media.ts`, `src/plugins` |
| Concepten en live preview | `versions` op Pages en Assignments |
| SEO, sitemap, robots | SEO-tab, `src/app/sitemap.ts` |

## Een opdracht toevoegen

1. Open `/admin` → **Inhoud** → **Opdrachten** → Create New.
2. Vul titel, vak/module, periode en een korte samenvatting in.
3. Voeg leeruitkomsten en links (GitHub, demo) toe als je die hebt.
4. Onder **Inhoud** stapel je blokken: tekst, media, kolommen, enzovoort.
5. Publish. De opdracht staat op `/opdrachten/<slug>` en verschijnt op het
   overzicht en in het opdrachtenblok op de homepage.

Maak geen CMS-pagina met slug `opdrachten`: die URL is gereserveerd voor het
overzicht.

## Een blok toevoegen

Vier stappen. Blijf ze in deze volgorde doen, anders klopt de typing niet.

1. **Config** — `src/blocks/MijnBlok/config.ts`:

   ```ts
   import type { Block } from 'payload'
   import { sectionTabs } from '@/fields/sectionFields'

   export const MijnBlok: Block = {
     slug: 'mijnBlok',
     interfaceName: 'MijnBlok',
     labels: { singular: 'Mijn blok', plural: 'Mijn blokken' },
     fields: [
       sectionTabs([{ name: 'heading', type: 'text', required: true }]),
     ],
   }
   ```

   `sectionTabs` zet de velden van elk blok in twee tabbladen: **Inhoud** en
   **Layout**. Die tabbladen hebben geen `name` en bestaan dus alleen in de
   admin — de velden staan gewoon op hun plek in het document.

2. **Registreren** in `src/blocks/index.ts` (`pageBlocks`).

3. **Types genereren**: `pnpm generate:types`.

4. **Component** — `src/blocks/MijnBlok/Component.tsx`, en koppelen in
   `src/components/BlockRenderer/index.tsx`. De sleutel daar is de `slug` uit
   stap 1.

Wikkel de inhoud in `<Section>`; die regelt anker, achtergrond en de verticale
ruimte tussen blokken.

Zodra de databasestructuur verandert (dus bij elk nieuw veld):
`pnpm migrate:create <naam>` en daarna `pnpm migrate`.

## Preview

De previewknop in de admin gaat naar `/next/preview`, dat draft mode aanzet en
doorstuurt. Twee controles zitten erop: het `PREVIEW_SECRET` én een ingelogde
gebruiker. Uitzetten kan via `/next/exit-preview`.

## Dingen die je een keer misgaan

Overgenomen uit de stofloos-template; verwijder ze niet zonder te weten waarom
ze er stonden.

- **`NEXT_PUBLIC_*` bereikt de productiebuild niet.** Lees waardes server-side
  (`getServerSideURL()`) en geef ze als prop door. Vandaar `SERVER_URL`.
- **Geen `IF NOT EXISTS` in migraties.** Schrijf ze plain. Herschrijf nooit een
  migratie die al ergens is toegepast.
- **Postgres op 5434, niet 5432.** Controleer bij twijfel wélke server op
  welke poort luistert.
- **Schrijven vanuit een script? `context: { disableRevalidate: true }`.**
  `revalidatePath` bestaat alleen binnen een Next-request.
- **`robots.ts` moet in `src/app/` staan, niet in een routegroep.**

## Media en S3

Zonder `S3_BUCKET` blijven uploads op de lokale schijf staan (`public/media`).
Prima om mee te beginnen; op Vercel is de schijf efemeer — daar is S3 verplicht.

Voeg de hostname van je bucket toe aan `IMAGE_ALLOWED_REMOTE_HOSTS`, anders
weigert `next/image` de afbeelding. Die lijst wordt op **buildtijd** bevroren
(dus op Vercel als Environment Variable voor de build, niet alleen runtime).

## Deploy: Vercel + Neon + S3

Productiedomein: **https://devanjanssen.com**.

### 1. Neon

Gebruik de **pooled** connection string (hostname bevat `-pooler`) als
`DATABASE_URL`. Migraties draaien automatisch in de Vercel-build via
`pnpm run ci`.

Na de eerste geslaagde deploy: seed één keer tegen Neon (of maak de eerste
gebruiker via `/admin`):

```bash
# .env tijdelijk op de Neon-URL, of:
DATABASE_URL='postgres://…-pooler…/neondb?sslmode=require' pnpm seed
```

### 2. S3

Maak een S3-compatibele bucket (AWS, Cloudflare R2 of TransIP). Vul op Vercel
`S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`,
`S3_SECRET_ACCESS_KEY` en `IMAGE_ALLOWED_REMOTE_HOSTS` (publieke hostname van
bucket of CDN). De app gebruikt path-style (`forcePathStyle`) — past bij R2 en
TransIP.

### 3. Vercel-project

1. Importeer `DevanJanssen/Portfolio-s7` op [vercel.com](https://vercel.com).
2. Framework: Next.js. Install: `pnpm install`. **Build Command: `pnpm run ci`**
   (migreert Neon, daarna `next build`). Gebruik `pnpm run ci`, niet `pnpm ci`
   — dat laatste is pnpm’s frozen install.
3. Environment Variables (Production; Preview naar smaak):

| Variabele | Waarde |
| --- | --- |
| `DATABASE_URL` | Neon pooled URL |
| `DATABASE_POOL_MAX` | `3` |
| `PAYLOAD_SECRET` | lange random string (niet dezelfde als lokaal) |
| `PREVIEW_SECRET` | lange random string |
| `SERVER_URL` | `https://devanjanssen.com` |
| `ROBOTS_ALLOW_INDEXING` | `true` |
| `S3_BUCKET` / `S3_ENDPOINT` / `S3_REGION` | uit je bucket |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | uit je bucket |
| `IMAGE_ALLOWED_REMOTE_HOSTS` | S3/CDN-hostname |

`SERVER_URL` en `IMAGE_ALLOWED_REMOTE_HOSTS` moeten beschikbaar zijn tijdens de
**build** (zie `next.config.ts`).

4. Deploy. Los migrate/build-fouten op vóór je DNS omzet.

### 4. Domein `devanjanssen.com`

1. Vercel → Project → Domains → voeg `devanjanssen.com` en `www` toe
   (redirect www → apex of andersom).
2. Bij je DNS-provider: A/CNAME zoals Vercel toont. Het bestand `CNAME` in de
   repo wordt door Vercel niet gelezen — DNS bij de registrar telt.
3. Wacht op SSL; check `https://devanjanssen.com` en `/admin`.

### Na go-live

- Upload een testafbeelding in `/admin` — die moet in S3 belanden, niet in
  lokale `media/`.
- Header/Footer/home vullen als je niet geseed hebt.
- Preview: knop in de admin gebruikt `PREVIEW_SECRET` + ingelogde gebruiker.

## Commando's

| Commando | Wat het doet |
| --- | --- |
| `pnpm dev` | Ontwikkelserver op :3000 |
| `pnpm build` / `pnpm start` | Productiebuild draaien |
| `pnpm run ci` | Migraties + productiebuild (Vercel Build Command) |
| `pnpm typecheck` | TypeScript zonder output |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm generate:types` | `src/payload-types.ts` bijwerken |
| `pnpm generate:importmap` | Na het toevoegen van een eigen adminveld |
| `pnpm migrate:create <naam>` | Migratie schrijven uit het schemaverschil |
| `pnpm migrate` / `pnpm migrate:status` | Migraties uitvoeren / bekijken |
| `pnpm db:up` / `pnpm db:down` | Lokale Postgres starten/stoppen |
| `pnpm seed` | Voorbeeldcontent, alleen op een lege database |
