# Portfolio

Schoolportfolio op Next.js 16 + Payload 3 + Postgres. Gebouwd op dezelfde
stack en patronen als de stofloos-website-template: een redacteur (jij) bouwt
pagina's door blokken te stapelen, en elk project — school, werk of side — is
een eigen document in het CMS.

## Snelstart

```bash
pnpm install
cp env.example .env          # en vul PAYLOAD_SECRET en PREVIEW_SECRET in
pnpm db:up                   # Postgres in Docker, op poort 5434
pnpm migrate                 # schema aanmaken
pnpm seed                    # beheerder, homepage, taxonomie en één voorbeeldproject
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
| Vrije pagina's (home, about, …) | `src/collections/Pages` |
| Projecten (school, werk, side) | `src/collections/Projects` — `/projects/<slug>` |
| Leeruitkomsten | `src/collections/LearningOutcomes` — `/learning-outcomes` |
| Taxonomie | `Technologies`, `Courses`, `Organisations` |
| Blokken | Hero, tekst, media, kolommen, call-to-action, projectoverzicht |
| Header en footer | `src/globals` |
| Media, optioneel S3 | `src/collections/Media.ts`, `src/plugins` |
| Concepten en live preview | `versions` op Pages en Projects |
| SEO, sitemap, robots | SEO-tab, `src/app/sitemap.ts` |

De site is Engelstalig — zowel publiek als in de admin.

## Twee ingangen, één set data

Een portfolio heeft twee soorten lezers die het tegengesteld doorlopen:

- **Docenten en assessoren** kijken *per leeruitkomst*: waar bewijs je LO3, en
  op welk niveau? Dat is `/learning-outcomes`.
- **Stagebedrijven** kijken *per project*: wat heb je gebouwd, waarmee, en wat
  was jóuw aandeel? Dat is `/projects`.

Beide pagina's lezen dezelfde documenten. Je schrijft dus niets dubbel: zodra je
op een project onder **Assessment** een leeruitkomst aanvinkt met bewijs, staat
dat bewijs automatisch onder die leeruitkomst.

## Een project toevoegen

1. Open `/admin` → **Content** → **Projects** → Create New.
2. **Overview** — soort project, status, tagline, periode, rol, teamgrootte,
   tech stack. De tagline is de regel op de kaart; houd hem kort.
3. **Story** — het probleem, je aanpak, **wat jíj deed**, en de uitkomst. Dat
   vierde veld is het belangrijkste bij groepswerk en wordt het vaakst vergeten.
4. **Proof** — links (repo, demo, rapport), screenshots mét bijschrift, en
   eventuele pdf's. Een screenshot zonder bijschrift bewijst niets.
5. **Assessment** — leeruitkomsten met niveau en bewijs, je reflectie, en
   ontvangen feedback. Een citaat van een docent of opdrachtgever weegt zwaarder
   dan je eigen inschatting.
6. Publish. Het project staat op `/projects/<slug>`.

Werk onder een NDA? Zet **Visibility** in de zijbalk op *anonymised* en vul een
alias in ("een logistiek bedrijf"). De organisatienaam verdwijnt dan van de site.

Maak geen CMS-pagina met slug `projects` of `learning-outcomes`: die URL's zijn
gereserveerd voor de overzichten.

## Leeruitkomsten invullen

De collectie is leeg opgeleverd, omdat de formulering van je eigen
opleiding moet komen. Voeg ze toe onder **Taxonomy** → **Learning outcomes**:
code (`LO1`), titel, de officiële tekst, en eventueel wat elk niveau betekent.
`Order` bepaalt de volgorde op het overzicht.

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

- **Eén `DATABASE_URL` in `.env`, niet twee.** Bij dubbele sleutels wint de
  laatste regel. Staat de Neon-URL eronder, dan draaien `pnpm migrate` en
  `pnpm seed` ongemerkt op productie. Controleer dit vóór elke migratie.
- **Noem een veld nooit `status` op een collectie met drafts.** Payload maakt
  zelf `_status` en leidt daar `enum_<collectie>_status` uit af; een eigen
  `status`-veld botst op dezelfde enumnaam en de migratie faalt met
  "invalid input value for enum". Vandaar `projectStatus`.
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
