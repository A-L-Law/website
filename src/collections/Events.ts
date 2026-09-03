import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'London Office & Online Webinar',
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'details',
      type: 'richText',
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
}
