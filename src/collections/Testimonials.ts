import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'reviewerName',
    defaultColumns: ['reviewerName', 'source', 'rating', 'verified', 'updatedAt'],
  },
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the client or reviewer',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'ReviewSolicitors',
      options: [
        { label: 'ReviewSolicitors', value: 'ReviewSolicitors' },
        { label: 'Google Local Services', value: 'Google Local Services' },
        { label: 'Direct Client Testimonial', value: 'Direct Client' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Rating out of 5 stars',
      },
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Full review text',
      },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this review is verified from the source platform',
      },
    },
    {
      name: 'teamMember',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Associated solicitor / team member (optional)',
      },
    },
  ],
}
