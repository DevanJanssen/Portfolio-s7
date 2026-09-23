---
name: "Graphite Shell"
description: "A developer tool that finally feels warm. Graphite surfaces (never black, never grey), JetBrains Mono for everything technical, Inter for prose, a single light-pink accent reserved for the active state. Built for CLIs, infra dashboards, and dev portals that want to look serious without looking like a 90s terminal."
tags: [developer, dark, minimal, modern, technical]
colors:
  primary:   "#e8e6df"
  secondary: "#8a8780"
  tertiary:  "#e8e6df"
  neutral:   "#1f1e1b"
  surface:   "#161513"
typography:
  display: Inter
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "3.25rem / 1.06 / 600 / -0.025em"
    h1:   "2.125rem / 1.16 / 600 / -0.02em"
    h2:   "1.4375rem / 1.3 / 600 / -0.012em"
    body: "0.9375rem / 1.6 / 400 / 0"
radius:
  sm: 3px
  md: 5px
  lg: 8px
  pill: 9999px
shadows:
  card:   "rgba(0,0,0,0.35) 0 1px 0 inset, rgba(0,0,0,0.4) 0 1px 2px"
  button: none
borders:
  card:    "1px solid rgba(232,230,223,0.08)"
  divider: rgba(232,230,223,0.10)
buttons:
  primary:
    background: #f0b8ca
    color: #161513
    border: none
    shape: rounded
    padding: 9px 18px
    font: mono / 600 / 0.8125rem
  secondary:
    background: #262420
    color: #e8e6df
    border: 1px solid rgba(232,230,223,0.10)
    shape: rounded
    padding: 9px 18px
    font: mono / 500 / 0.8125rem
  outline:
    background: transparent
    color: #e8e6df
    border: 1px solid rgba(232,230,223,0.16)
    shape: rounded
    padding: 9px 18px
    font: mono / 500 / 0.8125rem
  ghost:
    background: transparent
    color: #8a8780
    border: none
    shape: rounded
    padding: 9px 14px
    font: mono / 500 / 0.8125rem
charts:
  variant: "thin-bars"
  stroke_width: 1.5
  fill_opacity: 0.08
  gridlines: true
  bar_gap: 10px
  highlight: single
  dot_marker: true
fonts_url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
dependencies: ["lucide-react"]
---

# Graphite Shell

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Graphite Shell** as its
design system. Treat `DESIGN.md` as the single source of truth.
Your job is to translate the user's product requirements into
components and pages that look like they were designed by the same
person who authored this file.

### 2 · Token compliance

- Pull every color, font family, radius, shadow, and spacing value
  from the frontmatter at the top of this file.
- Use semantic roles (e.g. `primary`, `accent`, `muted`) — never
  hard-code hex values that bypass the system.
- When a token can be expressed as a CSS variable, declare it once
  in your global stylesheet and reference it everywhere downstream.
- The Google Fonts `<link>` is provided in the Typography section.
  Add it to `<head>` before any component renders.

### 3 · Component recipes

Use these recipes verbatim when building the corresponding component.

#### Buttons

Four variants are defined. Pick one — never blend variants or invent a fifth.

- **Primary** — rounded shape, bg `#f0b8ca`, text `#161513`, padding `9px 18px`, weight `600`.
- **Secondary** — rounded shape, bg `#262420`, text `#e8e6df`, border `1px solid rgba(232,230,223,0.10)`, padding `9px 18px`, weight `500`.
- **Outline** — rounded shape, text `#e8e6df`, border `1px solid rgba(232,230,223,0.16)`, padding `9px 18px`, weight `500`.
- **Ghost** — rounded shape, text `#8a8780`, padding `9px 14px`, weight `500`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#161513`
- Border: `1px solid rgba(232,230,223,0.08)`
- Shadow: `rgba(0,0,0,0.35) 0 1px 0 inset, rgba(0,0,0,0.4) 0 1px 2px`
- Radius: `radius.lg` (`8px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `boxed`. Each tab is a bordered card. Active tab gets the accent border and a subtle fill.

#### Charts

- Bar/line variant: `thin-bars`
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Inter`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Inter`)** — paragraphs, labels, button text, form inputs.
- **Mono (`JetBrains Mono`)** — code, eyebrows, metadata, numerals in tables.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add motion that exceeds the system's restraint — keep transitions short (≤200ms) and subtle.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## 1. Atmosphere

Graphite Shell is a dev tool that refuses to look like a 90s terminal. Surfaces are warm graphite — `#161513` page, `#1f1e1b` cards, `#262420` lifted — never pure black, never cool grey. JetBrains Mono carries every technical label, button, and metric. Inter takes prose only — descriptions, doc body, marketing copy. The single accent is a soft blush pink `#f0b8ca` — light and warm, never hot pink, used only on primary CTAs and the active tab indicator.

The discipline is in the warmth: graphite over black, blush over hot pink, mono on buttons. It feels like a serious CLI built by people who care.

**Signature moves**
- Warm graphite surfaces `#161513 / #1f1e1b / #262420` — never black, never cool grey
- JetBrains Mono on every button label — buttons read as commands
- Blush accent `#f0b8ca` (light, never neon) — primary CTA + active tab only
- Boxed tabs that read like a tmux pane selector
- 1px black inset highlight on every card — dark-mode catch-light

## 2. Palette

### Surfaces
- **Shell** `#161513` — page background (warm graphite, brown-leaning)
- **Pane** `#1f1e1b` — primary card surface
- **Pane Lift** `#262420` — secondary button, hovered card
- **Hairline** `rgba(232,230,223,0.08)` — every divider

### Ink (light on dark)
- **Bone** `#e8e6df` — text, headings (warm, ivory)
- **Bone 55** `#8a8780` — secondary text, ghost buttons, mono labels

### Accent
- **Blush** `#f0b8ca` — primary CTA fill, active tab border, chart highlight
- **Blush Soft** `rgba(240,184,202,0.14)` — focus ring, hovered tab

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Hero | Inter | 52px | 600 | 1.06 | -0.025em |
| H1 | Inter | 34px | 600 | 1.16 | -0.02em |
| H2 | Inter | 23px | 600 | 1.3 | -0.012em |
| Body | Inter | 15px | 400 | 1.6 | 0 |
| UI / Button | JetBrains Mono | 13px | 500 | 1.4 | 0 |
| Label | JetBrains Mono | 11px | 500 | 1.0 | 0.04em uppercase |
| Code | JetBrains Mono | 13px | 400 | 1.55 | 0 |

Inter handles ALL display + prose. JetBrains Mono handles every interactive label and every technical readout. The split is strict — never use mono for prose, never use Inter on a button.

## 4. Buttons

### Primary (Blush Cursor)
```css
background: #f0b8ca;
color: #161513;
padding: 9px 18px;
border-radius: 5px;
font-family: "JetBrains Mono";
font-weight: 600;
```

Mono on the button label is the entire signature — it reads as if you're invoking a command.

### Secondary (Pane Lift)
- `#262420` background, 1px hairline at 10% bone, bone text in mono 500

### Outline & Ghost
- Outline: transparent, 1px hairline at 16% bone
- Ghost: no border, bone-55 mono, hover lifts to bone

## 5. Cards

```css
background: #1f1e1b;
border: 1px solid rgba(232,230,223,0.08);
border-radius: 8px;
box-shadow:
  rgba(0,0,0,0.35) 0 1px 0 inset,
  rgba(0,0,0,0.4) 0 1px 2px;
```

The 1px black inset highlight at the top edge is the dark catch-light — without it the card reads as flat brown.

Featured cards add a 2px blush left border — that is the active-pane indicator, borrowed from tmux/zellij.

## 6. Charts

Thin precise bars (4px wide, 10px gap) with dashed gridlines at 8% bone. One bar in blush, others in 22% bone. Line charts at 1.5px bone with an 8% blush fill, ending in a blush dot marker. Y-axis labels in JetBrains Mono uppercase 11px.

## 7. Tabs

Boxed tabs with 5px radius and 1px hairline at 10% bone. Active = pane-lift background, 1px blush border, blush text in mono 600. Inactive = transparent, bone-55 mono. Reads like a tmux pane selector.

## 8. Spacing

- Base 4px
- Scale: `4, 8, 12, 16, 20, 24, 32, 48, 64, 80`
- Section padding: 80px desktop, 40px mobile

## 9. Do's & don'ts

✅ **Do**
- Hold the warm graphite surfaces — pure black or cool grey kills the warmth
- Put JetBrains Mono on every button — that's the command-line voice
- Use blush at light saturation `#f0b8ca` — never hot pink or magenta
- Keep the 1px black inset highlight on every card — dark catch-light

❌ **Don't**
- Use pure black `#000` or cool grey — graphite `#161513` is the only correct base
- Use hot pink or magenta (`#ff00aa`, etc.) — blush is soft on purpose
- Put Inter on buttons — mono carries every interactive label
- Add a second accent — blush alone, full stop

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#e8e6df` |
| secondary | `#8a8780` |
| tertiary  | `#e8e6df` |
| neutral   | `#1f1e1b` |
| surface   | `#161513` |

### Typography

- **Display:** Inter
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 3.25rem / 1.06 / 600 / -0.025em |
| H1   | 2.125rem / 1.16 / 600 / -0.02em |
| H2   | 1.4375rem / 1.3 / 600 / -0.012em |
| Body | 0.9375rem / 1.6 / 400 / 0 |

### Radius

- sm: `3px`
- md: `5px`
- lg: `8px`
- pill: `9999px`

### Shadows

- **card:** `rgba(0,0,0,0.35) 0 1px 0 inset, rgba(0,0,0,0.4) 0 1px 2px`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(232,230,223,0.08)`
- **divider:** `rgba(232,230,223,0.10)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#f0b8ca` |
| color | `#161513` |
| border | `none` |
| padding | `9px 18px` |
| fontFamily | `mono` |
| fontWeight | `600` |
| fontSize | `0.8125rem` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `#262420` |
| color | `#e8e6df` |
| border | `1px solid rgba(232,230,223,0.10)` |
| padding | `9px 18px` |
| fontFamily | `mono` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `transparent` |
| color | `#e8e6df` |
| border | `1px solid rgba(232,230,223,0.16)` |
| padding | `9px 18px` |
| fontFamily | `mono` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `rounded` |
| background | `transparent` |
| color | `#8a8780` |
| border | `none` |
| padding | `9px 14px` |
| fontFamily | `mono` |
| fontWeight | `500` |
| fontSize | `0.8125rem` |

### Charts

| Property | Value |
|----------|-------|
| variant | `thin-bars` |
| strokeWidth | `1.5` |
| fillOpacity | `0.08` |
| gridlines | `true` |
| barGap | `10px` |
| highlight | `single` |
| dotMarker | `true` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(232, 230, 223, 0.15)`, color: `#e8e6df`, border: `1px solid #e8e6df`
- **focus** — outline: `1px dashed #e8e6df`, outline-offset: `2px`
- **active** — bg: `#e8e6df`, color: `#161513`
- **disabled** — opacity: `0.35`
- **loading** — opacity: `0.6`
- **selected** — bg: `#e8e6df`, color: `#161513`

#### Input

- **hover** — border: `1px solid rgba(232, 230, 223, 0.5)`
- **focus** — bg: `rgba(232, 230, 223, 0.05)`, border: `1px solid #e8e6df`
- **disabled** — opacity: `0.35`
- **error** — bg: `rgba(239,68,68,0.05)`, border: `1px solid #EF4444`

#### Card

- **hover** — border: `1px solid #e8e6df`
- **selected** — bg: `rgba(232, 230, 223, 0.05)`, border: `1px solid #e8e6df`
- **dragging** — opacity: `0.7`

#### Tab

- **hover** — color: `#e8e6df`
- **focus** — outline: `1px dashed #e8e6df`, outline-offset: `1px`
- **selected** — bg: `rgba(232, 230, 223, 0.1)`, color: `#e8e6df`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Cursor blink.** Discrete, often stepped transitions. Like a terminal cursor: on or off. Response under 120 ms.

```css
transition: all 120ms linear;
```

| Token | Value |
|-------|-------|
| duration.instant | `0ms` |
| duration.fast | `60ms` |
| duration.base | `120ms` |
| duration.slow | `200ms` |
| easing.standard | `linear` |
| easing.decelerate | `linear` |
| easing.accelerate | `linear` |
| easing.spring | `steps(2, end)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Flat — the stroke carries the hierarchy. |
| level1 | `none` | Border tone lifts the surface. |
| level2 | `0 0 0 1px rgba(232, 230, 223, 0.5)` | Ring outline — popover. |
| level3 | `0 0 0 1px #e8e6df, 0 12px 32px -16px rgba(232, 230, 223, 0.4)` | Sheet with accent ring + glow. |
| level4 | `0 0 0 1px #e8e6df, 0 24px 64px -20px rgba(232, 230, 223, 0.5)` | Modal with accent ring + glow. |

### Content

- **measure:** `78ch` (max line length for body prose)
- **paragraph spacing:** `1em`
- **list indent:** `1.25em`
- **list gap:** `0.35em`
- **link:** color `#e8e6df`, underline `always`
- **blockquote:** border `1px solid rgba(232, 230, 223, 0.5)`, padding `0.7em 1em`
- **code:** background `rgba(232, 230, 223, 0.12)`, color `#e8e6df`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 14.61:1 | AA | AAA | — |
| Body text on canvas | 13.35:1 | AA | AAA | — |
| Muted text on surface | 5.09:1 | AA | AA | — |
| Accent on surface | 14.61:1 | AA-Large | AAA | — |
| Accent on canvas | 13.35:1 | AA-Large | AAA | — |
