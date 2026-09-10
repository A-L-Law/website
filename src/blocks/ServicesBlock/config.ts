import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'OUR SOLUTIONS',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Practice Area Services',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection Query',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedServices',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'practice-areas',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 4,
      label: 'Limit (Number of practice areas to display)',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'ALL PRACTICE AREAS',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'CTA Button Link URL',
      defaultValue: '/practice-areas',
    },
  ],
  labels: {
    singular: 'Services Block',
    plural: 'Services Blocks',
  },
}
