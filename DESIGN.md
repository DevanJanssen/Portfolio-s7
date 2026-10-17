# Design system — Editorial Brutalist

Vervangt het oude "Graphite Shell". De gegenereerde basis staat in
[`design-system/devan-janssen-portfolio/MASTER.md`](design-system/devan-janssen-portfolio/MASTER.md)
(ui-ux-pro-max: `"creative portfolio case study storytelling" --design-system --variance 7 --motion 6 --density 3`).
Dit bestand legt vast waar de site **bewust afwijkt** van MASTER.md; bij conflict wint dit bestand.

De tokens zelf staan in [`src/styles/_tokens.scss`](src/styles/_tokens.scss), het enige bestand met hexwaardes.
Componenten gebruiken alleen CSS-variabelen.

## Richting

Brutalistisch maar redactioneel: grote blokken, zichtbare lijnen, harde contrasten, niets afgerond.
Het werk staat centraal; de vorm is luid, de tekst blijft rustig leesbaar.

|         | Keuze                                                                 |
| ------- | --------------------------------------------------------------------- |
| Koppen  | **Archivo** 700–900, uppercase voor display, strakke letterspatiëring |
| Tekst   | **Space Grotesk** 400/500/700, 17px basis, regelhoogte 1.55–1.6       |
| Hoeken  | `0px` overal (`--radius`)                                             |
| Lijnen  | 2px (`--line`), 4px voor nadruk (`--line-bold`), altijd volle kleur   |
| Schaduw | Harde offset zonder blur (`--shadow-block`), geen zachte schaduwen    |
| Grid    | Zichtbaar kolommengrid in de hero (4 kolommen mobiel, 12 vanaf 768px) |
| Ruimte  | Density 3/10 uit MASTER.md (`--space-xs` t/m `--space-3xl`)           |

### Afwijkingen van MASTER.md

- MASTER.md geeft voor knoppen/kaarten radii (8–16px) en zachte schaduwen: **vervallen**, botst met de brutalistische stijl.
- MASTER.md noemt "no smooth transitions" én "always use transitions": we houden **korte** transities (150–220ms) op hover/focus, geen trage fades.
- Achtergrond is **papier** (`#f5f2eb`) met **inkt** (`#0a0a0a`), niet het roze-op-roze van MASTER.md (de foreground `#831843` op `#FDF2F8` leest te zacht voor dit idioom).

## Kleur

Roze `#EC4899` is primair, cyaan `#0891B2` het accent. Beide zijn **vlakken**, nooit tekst op licht:
voor tekst op papier gebruiken we de diepe varianten.

| Rol                          | Token                                              |
| ---------------------------- | -------------------------------------------------- |
| Achtergrond / tekst          | `--color-background` / `--color-text`              |
| Primair vlak + tekst erop    | `--color-primary` / `--color-on-primary` (inkt)    |
| Primaire tekst op licht      | `--color-primary-text` (`#be185d`)                 |
| Accentvlak + tekst erop      | `--color-accent` / `--color-on-accent` (inkt)      |
| Accenttekst op licht / focus | `--color-accent-text`, `--color-focus` (`#0e7490`) |

### Tonen per hoofdstuk

Elke sectie zet `data-tone`; dat bepaalt `--tone-bg`, `--tone-fg`, `--tone-accent` én de focuskleur.
In een case study heeft elk hoofdstuk een eigen toon, en de voortgangsbalk neemt de toon van het actieve hoofdstuk over.

| Tone    | Achtergrond | Tekst  | Accent     | Standaard voor |
| ------- | ----------- | ------ | ---------- | -------------- |
| `ink`   | inkt        | papier | roze       | Intro (hook)   |
| `pink`  | roze        | inkt   | inkt       | Probleem       |
| `paper` | papier      | inkt   | diep roze  | Proces         |
| `cyan`  | cyaan       | inkt   | inkt       | Oplossing      |
| `tint`  | roze tint   | inkt   | diep cyaan | Resultaat      |

### Contrast (WCAG 2.1, minimaal 4.5:1)

| Voorgrond                   | Achtergrond         | Ratio       |                                |
| --------------------------- | ------------------- | ----------- | ------------------------------ |
| ink `#0a0a0a`               | paper `#f5f2eb`     | 17.71:1     | ✓                              |
| ink                         | white `#ffffff`     | 19.80:1     | ✓                              |
| graphite `#4a4744`          | paper               | 8.25:1      | ✓                              |
| pink-deep `#be185d`         | paper               | 5.40:1      | ✓                              |
| pink-deep                   | white               | 6.04:1      | ✓                              |
| cyan-deep `#0e7490`         | paper               | 4.79:1      | ✓                              |
| ink                         | pink `#ec4899`      | 5.61:1      | ✓                              |
| ink                         | cyan `#0891b2`      | 5.38:1      | ✓                              |
| paper                       | ink                 | 17.71:1     | ✓                              |
| pink                        | ink                 | 5.61:1      | ✓                              |
| cyan-tint `#cffafe` (focus) | ink                 | 17.68:1     | ✓                              |
| ink                         | pink-tint `#fce7f3` | 16.84:1     | ✓                              |
| cyan-deep                   | pink-tint           | 4.56:1      | ✓ (krap: alleen kicker-labels) |
| white/paper                 | pink of cyan        | 3.15–3.68:1 | ✗ **nooit voor tekst**         |

Focusringen die binnen een element vallen (nav, voortgangsbalk) gebruiken `currentColor`,
zodat ze altijd contrasteren met hun eigen vlak.

## Beweging — "rich but calm"

GSAP + ScrollTrigger, ingesteld in [`src/lib/gsap.ts`](src/lib/gsap.ts) met drie `matchMedia`-condities:

|              | Desktop (≥768px)                               | Mobiel                    | `prefers-reduced-motion: reduce` |
| ------------ | ---------------------------------------------- | ------------------------- | -------------------------------- |
| Hero         | lijnen schuiven uit masker, roze blok parallax | lijnen uit masker         | niets                            |
| Kaarten      | gestaffeld (`back.out(1.4)`) per batch         | korter, kleinere afstand  | niets                            |
| Hoofdstukken | scrub-reveal van nummer, kop en tekst          | korte fade-in, geen scrub | niets                            |
| Beelden      | parallax ±6% (alleen beeld, nooit tekst)       | geen                      | geen                             |
| Pin          | **1 per pagina**: de intro van een case study  | geen                      | geen                             |
| Voortgang    | ja                                             | ja                        | ja (oriëntatie, geen beweging)   |

- De HTML staat altijd volledig in de DOM; GSAP voegt alleen beweging toe. Zonder JS of met reduced motion staat alles in zijn eindstand.
- `ScrollTrigger.refresh()` na `document.fonts.ready`, na elke afbeelding die laadt, en na `window.load`.
- Beelden hebben een vaste `aspect-ratio`, zodat triggers niet verschuiven.

## Componenten

| Component                                         | Bron                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Nav`                                             | 21st.dev "Navbar 1" (@preetsuthar17), omgezet naar tokens + toegankelijk mobiel menu     |
| `Footer`                                          | 21st.dev "Minimal Two-Column Footer" (@ln-dev7), met groot woordmerk                     |
| `Hero`                                            | Zelf gebouwd naar 21st.dev "Minimalist Hero" (code lag achter de dagelijkse 21st-limiet) |
| `ProjectCard`                                     | Zelf gebouwd naar 21st.dev "Image Card" (neobrutalism, idem)                             |
| `CaseStudy`, `ImageFrame`, `ProjectNav`, `Reveal` | Eigen                                                                                    |

## Checklist vóór oplevering

- [ ] Geen hex buiten `_tokens.scss`
- [ ] Tekstcontrast ≥ 4.5:1 (tabel hierboven)
- [ ] Focus zichtbaar op elk interactief element
- [ ] Geen horizontale scroll op 375 / 768 / 1440
- [ ] Reduced motion: geen pin, scrub of parallax
- [ ] Klikdoelen ≥ 44px
