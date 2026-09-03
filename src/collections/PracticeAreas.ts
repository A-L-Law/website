import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'slug', 'updatedAt'],
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
      name: 'icon',
      type: 'select',
      required: true,
      defaultValue: 'Scale',
      options: [
        { label: 'Scale (Justice)', value: 'Scale' },
        { label: 'Briefcase (Commercial / Corporate)', value: 'Briefcase' },
        { label: 'Building (Real Estate / Property)', value: 'Building2' },
        { label: 'Shield (Litigation / Protection)', value: 'ShieldCheck' },
        { label: 'FileText (Contracts & Agreements)', value: 'FileText' },
        { label: 'Users (Private Client & Family)', value: 'Users' },
        { label: 'Gavel (Dispute Resolution)', value: 'Gavel' },
        { label: 'Landmark (Finance & Banking)', value: 'Landmark' },
      ],
      admin: {
        description: 'Lucide SVG icon badge displayed on practice area cards and category buttons',
      },
    },
    {
      name: 'customIcon',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Optional custom icon image asset fallback',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
}
