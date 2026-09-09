import type { Metadata } from 'next'

import { generatePageMetadata, renderPage } from './renderPage'

export const generateMetadata = (): Promise<Metadata> => generatePageMetadata('/')

const HomePage = () => renderPage('/')

export default HomePage
