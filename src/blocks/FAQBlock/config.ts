import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Answers to Your Legal Enquiries',
    },
    {
      name: 'faqsCol1',
      type: 'array',
      label: 'Column 1 FAQ Items',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
      ],
    },
    {
      name: 'faqsCol2',
      type: 'array',
      label: 'Column 2 FAQ Items',
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
}
