import type { GlobalConfig } from 'payload'

/**
 * Internal server-only Global for persisting Clio EU OAuth 2.0 tokens in Postgres.
 *
 * Security:
 * - External REST/GraphQL read and update access are completely denied.
 * - Hidden from the Payload Admin UI so secrets are never serialized to the browser.
 * - Accessed exclusively server-side via Payload Local API with `overrideAccess: true`.
 */
export const ClioAuth: GlobalConfig = {
  slug: 'clio-auth',
  label: 'Clio OAuth Credentials',
  access: {
    read: () => false,
    update: () => false,
  },
  admin: {
    hidden: true,
    group: 'Settings',
  },
  fields: [
    {
      name: 'accessToken',
      type: 'text',
      label: 'Access Token',
    },
    {
      name: 'refreshToken',
      type: 'text',
      label: 'Refresh Token',
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expires At (UTC)',
    },
    {
      name: 'lastRefreshedAt',
      type: 'date',
      label: 'Last Refreshed At (UTC)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Connection Status',
      defaultValue: 'unconfigured',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Re-authorization Required', value: 'reauth_required' },
        { label: 'Unconfigured', value: 'unconfigured' },
      ],
    },
  ],
}
