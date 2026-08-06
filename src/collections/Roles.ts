import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Roles: CollectionConfig = {
  slug: 'roles',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Human-readable role name (e.g. Super Admin, Editor, Author)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Role identifier slug (e.g. super-admin, editor, author)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'permissions',
      type: 'group',
      fields: [
        {
          name: 'canPublishContent',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'canManageUsers',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'canManageGlobals',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'canAccessAdmin',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
