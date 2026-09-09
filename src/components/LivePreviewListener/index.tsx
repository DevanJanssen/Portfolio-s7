'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/**
 * Ververst de route zodra de admin een wijziging doorgeeft, zodat de live
 * preview meeloopt met wat de redacteur typt.
 *
 * `serverURL` komt als prop binnen en wordt hier niet uit de omgeving gelezen:
 * dit is een clientcomponent, en onze productiebuild krijgt geen
 * `NEXT_PUBLIC_`-waardes mee (zie `utilities/getURL.ts`).
 */
export const LivePreviewListener = ({ serverURL }: { serverURL: string }) => {
  const router = useRouter()

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}

export default LivePreviewListener
