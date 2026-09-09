import canUseDOM from './canUseDOM'

/**
 * De publieke URL van deze omgeving.
 *
 * Bewust `SERVER_URL` en niet `NEXT_PUBLIC_SERVER_URL`: onze deploy geeft de
 * productiebuild geen build-args mee, dus een `NEXT_PUBLIC_`-variabele is in de
 * clientbundle leeg. Lees deze waarde dus server-side en geef hem als prop door
 * aan clientcomponenten die hem nodig hebben — gebruik hem niet rechtstreeks in
 * een `'use client'`-bestand.
 */
export const getServerSideURL = (): string =>
  (process.env.SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/**
 * De origin zoals de browser hem ziet. In de browser uit `window.location`, op
 * de server uit dezelfde env als hierboven.
 */
export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const { protocol, hostname, port } = window.location

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }

  return getServerSideURL()
}
