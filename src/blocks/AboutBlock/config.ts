import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle Above Title',
      defaultValue: 'About Company',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Main Heading Title',
      required: true,
      defaultValue: 'Our Skilled Team Grow Your Business.',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Paragraph',
      defaultValue:
        'Aliquam volutpat diam a orci euismod ornare. Suspendisse quis massa justo. Suspendisse tortor lacus, tincidunt ut ex a, pretium lobortis sapien. Vestibulum rutrum pharetra ex,',
    },
    {
      name: 'image1',
      type: 'upload',
      relationTo: 'media',
      label: 'Primary Image (Left)',
    },
    {
      name: 'image2',
      type: 'upload',
      relationTo: 'media',
      label: 'Secondary Image (Left Overlay)',
    },
    {
      name: 'experienceNumber',
      type: 'number',
      label: 'Experience Badge Counter Number (e.g. 32)',
      defaultValue: 32,
    },
    {
      name: 'experienceTitle',
      type: 'text',
      label: 'Experience Badge Label Text',
      defaultValue: 'Years Experience Our Company',
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
      name: 'teamMember',
      type: 'relationship',
      relationTo: 'users',
      label: 'Sync Profile from Team Member / User',
      admin: {
        description: 'Optionally link a user profile for avatar, name, and title',
      },
    },
    {
      name: 'founderName',
      type: 'text',
      label: 'Founder / Author Name',
      defaultValue: 'Nguyen, Shane',
    },
    {
      name: 'founderTitle',
      type: 'text',
      label: 'Founder / Author Role Title',
      defaultValue: 'Founder CEO',
    },
    {
      name: 'founderAvatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Founder / Author Avatar Image',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Bottom Checkmark List Items',
      defaultValue: [
        { featureText: 'Performing market research.' },
        { featureText: 'Providing information to a client.' },
        { featureText: 'Strategic planning.' },
      ],
      fields: [
        {
          name: 'featureText',
          type: 'text',
          label: 'List Item Text',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryExperienceNumber',
      type: 'number',
      label: 'Secondary Counter Number (e.g. 150)',
      defaultValue: 150,
    },
    {
      name: 'secondaryExperienceTitle',
      type: 'text',
      label: 'Secondary Counter Label',
      defaultValue: 'Expert Team members',
    },
  ],
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
  },
}
