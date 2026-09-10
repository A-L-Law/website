import type { Block } from 'payload'

export const PortfolioBlock: Block = {
  slug: 'portfolioBlock',
  interfaceName: 'PortfolioBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Company Case Studies',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Our Litigation & Legal Success',
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
      name: 'selectedCases',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'cases',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      label: 'Limit (Number of cases to display)',
    },
  ],
  labels: {
    singular: 'Portfolio Block',
    plural: 'Portfolio Blocks',
  },
}
