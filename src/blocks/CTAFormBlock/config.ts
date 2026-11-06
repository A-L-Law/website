import type { Block } from 'payload'

export const CTAFormBlock: Block = {
  slug: 'ctaFormBlock',
  interfaceName: 'CTAFormBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Form Subtitle (Left)',
      defaultValue: 'Get In Touch',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Form Title (Left)',
      defaultValue: 'Free Legal Consultation',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Payload Form to Embed (Left)',
    },
    {
      name: 'rightTitle',
      type: 'text',
      label: 'Right Side Heading Title',
      defaultValue: 'Serving Global & National Clients With Integrity',
    },
    {
      name: 'rightDescription',
      type: 'textarea',
      label: 'Right Side Description Text',
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'avatarImages',
      type: 'array',
      label: 'Client Satisfaction Avatar Images',
      maxRows: 4,
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'emergencyPhone',
      type: 'text',
      label: 'Sitewide Emergency Phone Number',
      defaultValue: '+44 (0)20 7946 0912',
    },
    {
      name: 'emergencyEmail',
      type: 'text',
      label: 'Sitewide Support Email',
      defaultValue: 'enquiries@al-lawassociates.com',
    },
  ],
  labels: {
    singular: 'CTA Form Block',
    plural: 'CTA Form Blocks',
  },
}
