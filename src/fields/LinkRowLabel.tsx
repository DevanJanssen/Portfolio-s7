'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = { link?: { label?: string | null } | null }

/**
 * Zonder dit toont de admin "Links 01", "Links 02" — onbruikbaar zodra er meer
 * dan drie links in een array staan.
 */
export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<Row>()

  const label = data?.link?.label

  return <span>{label || `Link ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}
