import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminField, ROLE_OPTIONS } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Gebruiker',
    plural: 'Gebruikers',
  },
  auth: true,
  access: {
    // Gebruikersbeheer is beheerderswerk: wie hier bij kan, kan zichzelf
    // rechten geven.
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: ({ req: { user } }) => Boolean(user),
    admin: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    group: 'Instellingen',
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Rollen',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: ROLE_OPTIONS,
      access: {
        // Zonder dit kan een redacteur zichzelf tot beheerder promoveren via de
        // API, ook al verbergt de admin het veld.
        create: isAdminField,
        update: isAdminField,
      },
    },
  ],
}
