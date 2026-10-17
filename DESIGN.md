# Design system — Editorial Kinetic (zwart + roze)

De gegenereerde basis staat in
[`design-system/devan-janssen-portfolio/MASTER.md`](design-system/devan-janssen-portfolio/MASTER.md)
(ui-ux-pro-max: `"creative portfolio case study storytelling" --design-system --variance 7 --motion 6 --density 3`).
Dit bestand legt vast waar de site **bewust afwijkt** van MASTER.md; bij conflict wint dit bestand.

De tokens staan in [`src/styles/_tokens.scss`](src/styles/_tokens.scss), het enige bestand met hexwaardes.
Componenten gebruiken alleen CSS-variabelen.

## Richting

Donker en kinetisch: een zwarte basis met roze als enige kleur, grote variabele typografie die
op de cursor reageert, zachte afgeronde vlakken en kaarten die in 3D kantelen. Het eerste
"editorial brutalist"-ontwerp (dikke randen, harde schaduwen, cyaan) is losgelaten: te blokkerig.

|         | Keuze                                                                          |
| ------- | ------------------------------------------------------------------------------ |
| Koppen  | **Archivo** variabel (gewicht 100–900, breedte 62–125), uppercase voor display |
| Tekst   | **Space Grotesk** 400/500/700, 17px basis, regelhoogte 1.55–1.6                |
| Hoeken  | `--radius-sm` 12px, `--radius` 20px, `--radius-lg` 32px, pillen voor knoppen   |
| Lijnen  | 1px haarlijnen (`--hairline`, 14% van de tekstkleur), geen dikke randen        |
| Schaduw | Zacht en diep (`--shadow-soft`); bij hover een roze gloed (`--shadow-lift`)    |
| Glas    | Nav, intro en index: `--glass` + `backdrop-filter: blur`                       |
| Ruimte  | Density 3/10 uit MASTER.md (`--space-xs` t/m `--space-3xl`)                    |

### Afwijkingen van MASTER.md

- MASTER.md stelt een lichte roze achtergrond voor; wij draaien om naar **zwart** (`#0a0a0a`) met papier-wit (`#f5f2eb`) als tekst.
- Het cyaan accent (`#0891B2`) is **geschrapt**: alleen zwart en roze.
- MASTER.md's "Stagger List" (`back.out(1.4)`) blijft voor de kaarten; daarbovenop komen cursor-effecten (zie Beweging).

## Kleur

| Rol                       | Token                                    | Waarde                      |
| ------------------------- | ---------------------------------------- | --------------------------- |
| Achtergrond               | `--color-background`                     | ink `#0a0a0a`               |
| Oppervlak (kaarten)       | `--color-surface`                        | charcoal `#1a1718`          |
| Tekst / gedempt           | `--color-text` / `--color-text-muted`    | paper `#f5f2eb` / `#b3aaae` |
| Primair vlak + tekst erop | `--color-primary` / `--color-on-primary` | pink `#ec4899` / ink        |
| Roze tekst op zwart       | `--color-primary-text`                   | pink `#ec4899`              |
| Focus                     | `--color-focus`                          | per toon, zie hieronder     |

### Tonen per hoofdstuk

Elke sectie zet `data-tone`; dat bepaalt `--tone-bg`, `--tone-fg`, `--tone-accent` én de focuskleur.

| Tone       | Achtergrond         | Tekst  | Accent / focus     | Standaard voor   |
| ---------- | ------------------- | ------ | ------------------ | ---------------- |
| `ink`      | zwart               | papier | roze               | Intro (hook)     |
| `pink`     | roze                | zwart  | zwart              | Probleem, footer |
| `charcoal` | antraciet           | papier | fel roze `#f472b6` | Proces           |
| `deep`     | diep roze `#be185d` | papier | blush              | Oplossing, about |
| `blush`    | blush `#fce7f3`     | zwart  | diep roze          | Resultaat        |

In een case study (met beweging) **vloeit de achtergrond** van toon naar toon: het artikel neemt
de toon van het actieve hoofdstuk over (600ms overgang) en de hoofdstukken erven die. Onder reduced
motion heeft elk hoofdstuk zijn eigen vaste kleurvlak.

### Contrast (WCAG 2.1, minimaal 4.5:1)

| Voorgrond          | Achtergrond         | Ratio   |                        |
| ------------------ | ------------------- | ------- | ---------------------- |
| paper `#f5f2eb`    | ink `#0a0a0a`       | 17.71:1 | ✓                      |
| paper              | charcoal `#1a1718`  | 15.92:1 | ✓                      |
| muted `#b3aaae`    | ink                 | 8.75:1  | ✓                      |
| muted              | charcoal            | 7.86:1  | ✓                      |
| pink `#ec4899`     | ink                 | 5.61:1  | ✓                      |
| pink               | charcoal            | 5.05:1  | ✓                      |
| hot pink `#f472b6` | ink / charcoal      | ≥ 7.0:1 | ✓                      |
| ink                | pink                | 5.61:1  | ✓                      |
| paper              | deep pink `#be185d` | 5.40:1  | ✓                      |
| blush `#fce7f3`    | deep pink           | 5.14:1  | ✓                      |
| ink                | blush               | 16.84:1 | ✓                      |
| deep pink          | blush               | 5.14:1  | ✓                      |
| paper              | pink                | 3.15:1  | ✗ **nooit voor tekst** |

De kleurvlekken in de hero staan op 18–55% dekking, zodat papier-tekst erboven ruim boven 4.5:1
blijft. Tijdens de 600ms kleurovergang tussen hoofdstukken kan het contrast heel kort lager zijn.

## Beweging — "rich but calm", cursor-reactief

GSAP + ScrollTrigger, met condities in [`src/lib/gsap.ts`](src/lib/gsap.ts):
`desktop` (≥768px, geen reduced motion), `mobile`, `pointer` (muis/trackpad, geen reduced motion).
Bouwstenen in `src/components/motion/`:

| Bouwsteen       | Wat                                                                                                       | Alleen bij                              |
| --------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `ProximityText` | Letters worden dun en breed vlak bij de cursor (Archivo-assen); intro bouwt letters op van dun naar zwaar | cursor: `pointer`; intro: elke beweging |
| `Tilt`          | 3D-kanteling, meebewegende lichtvlek, lagen met `data-depth`                                              | `pointer`                               |
| `Magnetic`      | Trekt links/knoppen naar de cursor, veert elastisch terug                                                 | `pointer`                               |
| `Cursor`        | Ring die de muis volgt; boven `data-cursor="…"` een lichte schijf met label                               | `pointer`                               |

|              | Desktop                                                                   | Mobiel                             | Reduced motion     |
| ------------ | ------------------------------------------------------------------------- | ---------------------------------- | ------------------ |
| Hero         | letters bouwen op, vlekken volgen muis, scène parallax                    | letters bouwen op, vlekken drijven | niets              |
| Kaarten      | gestaffeld in, tilt + diepte + "View case"                                | gestaffeld in                      | niets              |
| Hoofdstukken | achtergrond vloeit, koppen woord-voor-woord, beelden openen met clip-path | korte fade-ins                     | vaste kleurvlakken |
| Beelden      | parallax ±6% + tilt                                                       | geen                               | geen               |
| Pin          | **1 per pagina**: de intro van een case study                             | geen                               | geen               |
| Voortgang    | ja                                                                        | ja                                 | ja                 |

- De HTML staat altijd volledig in de DOM; GSAP voegt alleen beweging toe.
- `ScrollTrigger.refresh()` na `document.fonts.ready`, na elke afbeelding en na `window.load`.
- De systeemcursor blijft altijd zichtbaar; de ring is versiering.

## Componenten

| Component                                                                                      | Bron                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Nav`                                                                                          | 21st.dev "Navbar 1" (@preetsuthar17): zwevende glazen pil, magnetische links      |
| `Footer`                                                                                       | 21st.dev "Minimal Two-Column Footer" (@ln-dev7), op roze, met proximity-woordmerk |
| `ProximityText`                                                                                | Zelf gebouwd naar 21st.dev "Variable Font Proximity Hero" (@cnippet-dev)          |
| `Tilt`                                                                                         | Zelf gebouwd naar 21st.dev "Optimized Tilt Card" (@sh20raj)                       |
| `Hero`, `ProjectCard`, `CaseStudy`, `ImageFrame`, `ProjectNav`, `Reveal`, `Magnetic`, `Cursor` | Eigen                                                                             |

(De 21st-code voor proximity en tilt lag achter de dagelijkse limiet van het gratis account.)

## Checklist vóór oplevering

- [ ] Geen hex buiten `_tokens.scss` (uitzondering: `themeColor` in `layout.tsx`, een meta-tag)
- [ ] Tekstcontrast ≥ 4.5:1 (tabel hierboven), ook in elk hoofdstuk
- [ ] Focus zichtbaar op elk interactief element
- [ ] Geen horizontale scroll op 375 / 768 / 1440
- [ ] Reduced motion: geen pin, scrub, parallax of cursor-effect
- [ ] Klikdoelen ≥ 44px
