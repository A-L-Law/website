import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Real Client Stories',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Customer & Client Experiences',
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
      name: 'selectedTestimonials',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'testimonials',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      label: 'Limit (Number of testimonials to display)',
    },
  ],
  labels: {
    singular: 'Testimonials Block',
    plural: 'Testimonials Blocks',
  },
}
