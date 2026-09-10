import type { Block } from 'payload'

export const CTAInlineBlock: Block = {
  slug: 'ctaInlineBlock',
  interfaceName: 'CTAInlineBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Get Free Quote',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle / Description',
      defaultValue: 'Perfect legal solution for your company.',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Optional Embedded Form',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text (If form is not set)',
      defaultValue: 'Get Quote',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link URL (If form is not set)',
      defaultValue: '/contact',
    },
  ],
  labels: {
    singular: 'CTA Inline Block',
    plural: 'CTA Inline Blocks',
  },
}
