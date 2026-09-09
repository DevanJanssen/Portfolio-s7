import type { Access } from 'payload'

/**
 * Publiek leest alleen gepubliceerde documenten; een ingelogde redacteur ziet
 * ook concepten. Dit is wat draft preview mogelijk maakt zonder dat concepten
 * op de live site lekken.
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
