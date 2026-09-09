import Link from 'next/link'

export const metadata = {
  title: 'Pagina niet gevonden',
}

const NotFound = () => (
  <div className="container container--narrow" style={{ paddingBlock: '4rem' }}>
    <h1>Deze pagina bestaat niet</h1>
    <p>De pagina die je zocht is verplaatst of verwijderd.</p>
    <Link href="/">Terug naar de homepage</Link>
  </div>
)

export default NotFound
