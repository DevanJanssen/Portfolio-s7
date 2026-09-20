import Link from 'next/link'

export const metadata = {
  title: 'Page not found',
}

const NotFound = () => (
  <div className="container container--narrow" style={{ paddingBlock: '4rem' }}>
    <h1>This page does not exist</h1>
    <p>The page you were looking for has moved or been removed.</p>
    <Link href="/">Back to the homepage</Link>
  </div>
)

export default NotFound
