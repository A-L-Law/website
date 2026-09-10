import type { Block } from 'payload'

export const ExperienceBlock: Block = {
  slug: 'experienceBlock',
  interfaceName: 'ExperienceBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'Brand Success',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Empowering Brand Growth Together',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Paragraph',
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      label: 'Primary Left Image',
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      label: 'Secondary Left Image',
    },
    {
      name: 'skillBars',
      type: 'array',
      label: 'Skill / Practice Area Progress Bars',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Skill Label',
          required: true,
        },
        {
          name: 'percentage',
          type: 'number',
          label: 'Percentage (0 - 100)',
          required: true,
          defaultValue: 85,
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Get Consulting',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'CTA Button Link URL',
      defaultValue: '/contact',
    },
  ],
  labels: {
    singular: 'Experience Block',
    plural: 'Experience Blocks',
  },
}
