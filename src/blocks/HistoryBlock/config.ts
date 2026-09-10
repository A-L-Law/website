import type { Block } from 'payload'

export const HistoryBlock: Block = {
  slug: 'historyBlock',
  interfaceName: 'HistoryBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Our History',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Our Firm History & Growth',
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'History Timeline Items',
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Year (e.g. 2003)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Milestone Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description Text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Milestone Image',
        },
      ],
    },
  ],
  labels: {
    singular: 'History Block',
    plural: 'History Blocks',
  },
}
