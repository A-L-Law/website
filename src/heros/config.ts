import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    // High Impact Hero Slides Array
    {
      name: 'slides',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      label: 'Hero Slides (Autoplay Slider)',
      maxRows: 3,
      minRows: 1,
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle Above Title',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Heading Title',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          defaultValue: 'Read More',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'CTA Button Link',
          defaultValue: '/about',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Optional Video Overlay URL (YouTube or Vimeo)',
        },
      ],
    },
    // Medium & Low Impact Page Banner Titles
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact', 'lowImpact'].includes(type),
      },
    },
    {
      name: 'innerTitle',
      type: 'text',
      label: 'Breadcrumb Sub-Title / Category',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact', 'lowImpact'].includes(type),
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact'].includes(type),
      },
      relationTo: 'media',
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type, slides } = {}) => !slides && ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type, slides } = {}) => !slides && ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        },
      },
    }),
  ],
  label: false,
}
