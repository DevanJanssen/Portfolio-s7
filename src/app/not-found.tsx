import Link from 'next/link'

const NotFound = () => (
  <section className="container" style={{ paddingBlock: 'var(--space-3xl)' }}>
    <h1 style={{ fontSize: 'var(--text-display)', textTransform: 'uppercase' }}>404</h1>
    <p style={{ marginBlock: 'var(--space-md)', fontSize: 'var(--text-lg)' }}>
      This page does not exist.
    </p>
    <Link href="/" style={{ fontWeight: 700 }}>
      ← Back to home
    </Link>
  </section>
)

export default NotFound
