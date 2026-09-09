import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent, isAdmin } from '@/access/roles'

const isImage = (mimeType: unknown): boolean =>
  typeof mimeType === 'string' && mimeType.startsWith('image/')

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    create: canEditContent,
    delete: isAdmin,
    update: canEditContent,
    // Media zijn publiek: ze worden op de site getoond.
    read: anyone,
  },
  admin: {
    group: 'Inhoud',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  upload: {
    // De maten die de site daadwerkelijk opvraagt. Elke maat kost opslag en
    // uploadtijd, dus voeg er alleen een toe als een component hem gebruikt.
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'square', width: 800, height: 800 },
      { name: 'medium', width: 1200 },
      { name: 'large', width: 1920 },
      // Vaste maat voor social sharing; OG-scrapers negeren srcset.
      { name: 'og', width: 1200, height: 630, crop: 'center' },
    ],
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-tekst',
      admin: {
        description:
          'Beschrijf wat er op de afbeelding te zien is. Verplicht bij afbeeldingen: schermlezers en Google Afbeeldingen hebben dit nodig.',
      },
      // Geen `required: true`: dat zou ook voor pdf's en video gelden, waar
      // alt-tekst niets betekent. Vandaar de check op mimetype.
      validate: (value: string | null | undefined, { data }: { data: Partial<{ mimeType?: string | null }> }) => {
        if (!isImage(data?.mimeType)) return true

        return typeof value === 'string' && value.trim().length > 0
          ? true
          : 'Vul een alt-tekst in voor deze afbeelding.'
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bijschrift',
      admin: {
        description: 'Optioneel. Wordt onder de afbeelding getoond als het blok dat ondersteunt.',
      },
    },
  ],
}
