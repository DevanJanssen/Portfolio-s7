import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export type Role = 'admin' | 'editor'

export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
]

export const hasRole = (user: unknown, ...roles: Role[]): boolean => {
  const userRoles = (user as User | null)?.roles

  if (!Array.isArray(userRoles)) return false

  return roles.some((role) => userRoles.includes(role))
}

/** Alleen beheerders. Gebruik dit voor gebruikersbeheer en site-instellingen. */
export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/** Beheerders en redacteuren. Gebruik dit voor content. */
export const canEditContent: Access = ({ req: { user } }) => hasRole(user, 'admin', 'editor')
