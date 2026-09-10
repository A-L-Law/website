import type { Block } from 'payload'

export const SolutionsBlock: Block = {
  slug: 'solutionsBlock',
  interfaceName: 'SolutionsBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Advance Solutions',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Heading Title',
      defaultValue: 'We Help With Strategic Planning',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Paragraph',
      defaultValue:
        'A L Law provides tailored legal advice and solutions designed to protect your business, assets, and future.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Solutions Feature Cards',
      defaultValue: [
        {
          icon: 'Lightbulb',
          title: 'Digital & Corporate Advice',
          description: 'Comprehensive legal structuring for commercial enterprises and contracts.',
        },
        {
          icon: 'Compass',
          title: 'Strategic Planning',
          description: 'Long-term risk mitigation and compliance planning for key stakeholders.',
        },
        {
          icon: 'ShieldCheck',
          title: 'Asset Protection',
          description: 'Robust asset management and legal defense strategies for private clients.',
        },
      ],
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'Lightbulb',
          options: [
            { label: 'Lightbulb (Innovation)', value: 'Lightbulb' },
            { label: 'Compass (Strategy)', value: 'Compass' },
            { label: 'Shield (Protection)', value: 'ShieldCheck' },
            { label: 'Scale (Justice)', value: 'Scale' },
            { label: 'Briefcase (Corporate)', value: 'Briefcase' },
            { label: 'Users (Client Services)', value: 'Users' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Card Short Description',
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'Solutions Block',
    plural: 'Solutions Blocks',
  },
}
