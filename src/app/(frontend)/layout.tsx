import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getServerSideURL } from '@/utilities/getURL'

import './globals.scss'

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

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="nl">
    <body>
      <a className="skip-link" href="#main">
        Naar de inhoud
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </body>
  </html>
)

export default RootLayout
