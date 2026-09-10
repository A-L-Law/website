import type { Block } from 'payload'

export const BlogArchiveBlock: Block = {
  slug: 'blogArchiveBlock',
  interfaceName: 'BlogArchiveBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'From The Blog',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      defaultValue: 'Blog & Articles',
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
      name: 'relationTo',
      type: 'select',
      defaultValue: 'guides',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: [
        {
          label: 'Legal Guides',
          value: 'guides',
        },
        {
          label: 'Firm News',
          value: 'news',
        },
      ],
    },
    {
      name: 'selectedGuides',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      relationTo: 'guides',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      label: 'Limit (Number of posts to display)',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'See More Articles',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'CTA Button Link URL',
      defaultValue: '/guides',
    },
  ],
  labels: {
    singular: 'Blog Archive Block',
    plural: 'Blog Archive Blocks',
  },
}
