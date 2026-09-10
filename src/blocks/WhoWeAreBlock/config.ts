import type { Block } from 'payload'

export const WhoWeAreBlock: Block = {
  slug: 'whoWeAreBlock',
  interfaceName: 'WhoWeAreBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Who We Are',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Best Firm Especially in Business Law',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Paragraph',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stat Counter Badges',
      maxRows: 2,
      fields: [
        {
          name: 'count',
          type: 'number',
          label: 'Count Number (e.g. 89)',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Count Suffix (e.g. k or +)',
          defaultValue: 'k',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Stat Label Text',
          required: true,
        },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Section Right Image',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Discover More',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'CTA Button Link URL',
      defaultValue: '/about',
    },
    {
      name: 'solutionTitle',
      type: 'text',
      label: 'Bottom Solution Banner Title',
      defaultValue: 'Implement solutions & achieve goals.',
    },
    {
      name: 'solutionButtonText',
      type: 'text',
      label: 'Bottom Solution Banner Button Text',
      defaultValue: 'Get Free Consultations',
    },
    {
      name: 'solutionButtonLink',
      type: 'text',
      label: 'Bottom Solution Banner Link URL',
      defaultValue: '/contact',
    },
    {
      name: 'solutionBgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Bottom Solution Banner Background Image',
    },
  ],
  labels: {
    singular: 'Who We Are Block',
    plural: 'Who We Are Blocks',
  },
}
