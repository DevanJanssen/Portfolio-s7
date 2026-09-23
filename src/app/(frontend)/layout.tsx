import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.scss'

// Inter voor proza en koppen, JetBrains Mono voor alles wat je bedient of
// afleest. Beide als CSS-variabele; `_tokens.scss` bouwt de stacks erop.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  // Zet relatieve URL's in metadata om naar absolute. Zonder dit staan er
  // relatieve og:image- en canonical-waardes in de HTML, en die accepteert geen
  // enkele scraper.
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Portfolio',
    template: '%s',
  },
}

export const viewport: Viewport = {
  themeColor: '#161513',
  colorScheme: 'dark',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html className={`${inter.variable} ${jetbrains.variable}`} lang="en">
    <body>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </body>
  </html>
)

export default RootLayout
