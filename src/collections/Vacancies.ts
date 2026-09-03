import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'employmentType', 'closingDate', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job role title (e.g. Senior Commercial Litigation Solicitor)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'practice-areas',
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'London, UK',
    },
    {
      name: 'employmentType',
      type: 'select',
      defaultValue: 'Full-Time',
      options: [
        { label: 'Full-Time', value: 'Full-Time' },
        { label: 'Part-Time', value: 'Part-Time' },
        { label: 'Contract', value: 'Contract' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'closingDate',
      type: 'date',
    },
  ],
}
