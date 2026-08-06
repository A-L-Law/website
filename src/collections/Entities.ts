import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Entities: CollectionConfig = {
  slug: 'entities',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'schemaType', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the entity (e.g. A L Law, Commercial Law Practice, Jane Doe QC)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'schemaType',
      type: 'select',
      required: true,
      defaultValue: 'LegalService',
      options: [
        { label: 'Legal Service (Firm Entity)', value: 'LegalService' },
        { label: 'Attorney / Person (Solicitor)', value: 'Attorney' },
        { label: 'Article / Guide', value: 'Article' },
        { label: 'Job Posting (Vacancy)', value: 'JobPosting' },
        { label: 'Event / Seminar', value: 'Event' },
        { label: 'Generic Thing / Concept', value: 'Thing' },
      ],
      admin: {
        description: 'Schema.org JSON-LD type definition',
      },
    },
    {
      name: 'sameAs',
      type: 'array',
      admin: {
        description: 'External URI references for entity reconciliation (Wikidata, Wikipedia, Companies House)',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the entity for SEO structured data',
      },
    },
  ],
}
