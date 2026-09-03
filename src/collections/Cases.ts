import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Cases: CollectionConfig = {
  slug: 'cases',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'practiceArea', 'forum', 'value', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Anonymized case title (e.g. Commercial Property Refinancing for UK Retail Group)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'practiceArea',
      type: 'relationship',
      relationTo: 'practice-areas',
      required: true,
    },
    {
      name: 'leadSolicitor',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Lead solicitor from the firm handling the matter',
      },
    },
    {
      name: 'caseSummary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary of the matter, legal issues resolved, and outcome',
      },
    },
    {
      name: 'details',
      type: 'richText',
    },
    {
      name: 'forum',
      type: 'text',
      admin: {
        description: 'Court, tribunal, or arbitration forum (e.g. High Court Chancery Division)',
      },
    },
    {
      name: 'value',
      type: 'text',
      admin: {
        description: 'Matter transaction / dispute value (e.g. £12.5M)',
      },
    },
  ],
}
