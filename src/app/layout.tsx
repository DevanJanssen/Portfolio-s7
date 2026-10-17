import type { Metadata, Viewport } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/motion/Cursor'
import { Nav } from '@/components/Nav'
import { site } from '@/content/site'

import './globals.scss'

// Variabel (gewicht + breedte): de koppen spelen met beide assen.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
}

export const viewport: Viewport = {
  // Meta-tag: kan geen CSS-variabele zijn; houd gelijk aan --raw-ink.
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html className={`${archivo.variable} ${spaceGrotesk.variable}`} lang="en">
    <body>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <Cursor />
    </body>
  </html>
)

export default RootLayout
