import type { ReactNode } from 'react'

/**
 * The icons in the Safari title bar.
 *
 * In the original design these are SF Symbols: text in Apple's system font, not
 * exported shapes. That font is not in this repo and may not be, so they are
 * redrawn here as SVG. They belong to the browser window rather than to the
 * icon language of the site, which is why they live beside `BrowserFrame`
 * instead of in a shared icon set.
 *
 * Every `viewBox` is the text box from the design (width per symbol, height 15),
 * so the width of a button matches the design; the shape sits optically centred
 * in it. `stroke-width` is in those same units, so line weight scales along with
 * the window.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

type GlyphProps = {
  className?: string
}

/**
 * The box is the size from the design and sets the width of the button; the
 * shape inside it is smaller than the box, the way a letter is smaller than its
 * line. `scale` says how much smaller, measured against the design. Because it
 * is a real SVG transform, the line weight thins along with it.
 */
const svg = (width: number, height: number, scale: number, children: ReactNode) =>
  function Glyph({ className }: GlyphProps) {
    return (
      <svg
        aria-hidden
        className={className}
        fill="none"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform={`translate(${(width * (1 - scale)) / 2} ${(height * (1 - scale)) / 2}) scale(${scale})`}
        >
          {children}
        </g>
      </svg>
    )
  }

/** `sidebar.left`: a window with a sidebar holding three lines. */
export const SidebarGlyph = svg(
  16,
  15,
  0.86,
  <>
    <rect {...stroke} height="10.4" rx="1.6" strokeWidth="1.1" width="13" x="1.5" y="2.3" />
    <path {...stroke} d="M6.3 2.3v10.4" strokeWidth="1.1" />
    <path {...stroke} d="M3.4 5.2h1.1M3.4 7.5h1.1M3.4 9.8h1.1" strokeWidth="0.9" />
  </>,
)

/** `chevron.down`: the arrow marking a menu underneath. */
export const ChevronDownGlyph = svg(
  8,
  15,
  0.7,
  <path {...stroke} d="M1.6 6.2 4 8.8l2.4-2.6" strokeWidth="1.5" />,
)

/** `chevron.backward` — previous page. */
export const BackGlyph = svg(
  12.16,
  15,
  0.82,
  <path {...stroke} d="M7.2 2.6 3.4 7.5l3.8 4.9" strokeWidth="1.5" />,
)

/** `chevron.forward` — next page. */
export const ForwardGlyph = svg(
  12.16,
  15,
  0.82,
  <path {...stroke} d="M4.96 2.6l3.8 4.9-3.8 4.9" strokeWidth="1.5" />,
)

/**
 * The reader-view icon at the left of the address bar. This is the one symbol
 * the design exports as an actual shape; the path comes from there and sits at
 * its designed position within its box of 10.809.
 */
export const ReaderGlyph = ({ className }: GlyphProps) => (
  <svg
    aria-hidden
    className={className}
    fill="none"
    viewBox="0 0 10.809 10.809"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.28259 5.81058C8.28259 5.91636 8.24257 6.00641 8.16252 6.08074C8.08534 6.15221 7.98956 6.18795 7.87521 6.18795H0.443999C0.326787 6.18795 0.229586 6.15221 0.152398 6.08074C0.0752094 6.00641 0.0366151 5.91636 0.0366151 5.81058C0.0366151 5.70195 0.0752094 5.61189 0.152398 5.54042C0.229586 5.46895 0.326787 5.43322 0.443999 5.43322H7.87521C7.98956 5.43322 8.08534 5.46895 8.16252 5.54042C8.24257 5.61189 8.28259 5.70195 8.28259 5.81058ZM5.91812 7.50444C5.91812 7.61022 5.87809 7.69884 5.79805 7.77031C5.72086 7.84464 5.62509 7.88181 5.51073 7.88181H0.443999C0.326787 7.88181 0.229586 7.84464 0.152398 7.77031C0.0752094 7.69884 0.0366151 7.61022 0.0366151 7.50444C0.0366151 7.39581 0.0752094 7.30575 0.152398 7.23428C0.229586 7.16281 0.326787 7.12708 0.443999 7.12708H5.51073C5.62509 7.12708 5.72086 7.16281 5.79805 7.23428C5.87809 7.30575 5.91812 7.39581 5.91812 7.50444ZM1.24788 0H7.06275C7.51731 0 7.83893 0.104347 8.02761 0.313042C8.21915 0.521737 8.31492 0.844786 8.31492 1.28219V3.20761C8.31492 3.64501 8.21915 3.96806 8.02761 4.17676C7.83893 4.38259 7.51731 4.48551 7.06275 4.48551H1.24788C0.793327 4.48551 0.471708 4.38259 0.283025 4.17676C0.0943416 3.96806 0 3.64501 0 3.20761V1.28219C0 0.844786 0.0943416 0.521737 0.283025 0.313042C0.471708 0.104347 0.793327 0 1.24788 0ZM0.844786 3.22905C0.844786 3.40344 0.877662 3.53066 0.943416 3.61071C1.01203 3.6879 1.13067 3.72649 1.29934 3.72649H7.01558C7.18425 3.72649 7.30146 3.6879 7.36722 3.61071C7.43583 3.53066 7.47014 3.40344 7.47014 3.22905V1.25646C7.47014 1.08779 7.43583 0.963427 7.36722 0.88338C7.30146 0.803333 7.18425 0.763309 7.01558 0.763309H1.29934C1.13067 0.763309 1.01203 0.803333 0.943416 0.88338C0.877662 0.963427 0.844786 1.08779 0.844786 1.25646V3.22905Z"
      fill="currentColor"
      transform="translate(1.24 1.74)"
    />
  </svg>
)

/** `arrow.clockwise` — reload. */
export const ReloadGlyph = svg(
  10.809,
  10.809,
  0.88,
  <>
    <path {...stroke} d="M9 5.4a3.6 3.6 0 1 1-1.25-2.73" strokeWidth="1.05" />
    <path {...stroke} d="M8.5.5v2.9H5.6" strokeWidth="1.05" />
  </>,
)

/** `arrow.down.circle` — downloads. */
export const DownloadGlyph = svg(
  14,
  15,
  0.84,
  <>
    <circle {...stroke} cx="7" cy="7.5" r="5.2" strokeWidth="1.1" />
    <path {...stroke} d="M7 4.5v6M4.7 8.2 7 10.5l2.3-2.3" strokeWidth="1.1" />
  </>,
)

/** `square.and.arrow.up` — share. */
export const ShareGlyph = svg(
  13,
  15,
  0.84,
  <>
    <path {...stroke} d="M3.7 6.1H2.4v6.4h8.2V6.1H9.3" strokeWidth="1.1" />
    <path {...stroke} d="M6.5 2.1v6.6M4.4 4.2 6.5 2l2.1 2.2" strokeWidth="1.1" />
  </>,
)

/** `plus` — new tab. */
export const PlusGlyph = svg(
  12.16,
  15,
  0.78,
  <path {...stroke} d="M6.08 2.6v9.8M1.2 7.5h9.8" strokeWidth="1.2" />,
)

/** `square.on.square` — tab overview. */
export const TabsGlyph = svg(
  15,
  15,
  0.84,
  <>
    <rect {...stroke} height="8.4" rx="1.6" strokeWidth="1.1" width="8.4" x="1.7" y="4.7" />
    <path {...stroke} d="M4.6 4.2V3.9a1.6 1.6 0 0 1 1.6-1.6h5.1a1.6 1.6 0 0 1 1.6 1.6v5.1a1.6 1.6 0 0 1-1.6 1.6h-.3" strokeWidth="1.1" />
  </>,
)
