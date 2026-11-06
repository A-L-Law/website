import { Field } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'

export const contactSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Get In Touch',
    label: 'Title',
  },
  {
    name: 'formTitle',
    type: 'text',
    defaultValue: 'Contact Us',
    label: 'Form Title',
  },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: 'Content',
  },
  {
    name: 'form',
    type: 'relationship',
    relationTo: 'forms',
    required: true,
  },
  {
    name: 'layout',
    type: 'select',
    label: 'Form Layout Override',
    defaultValue: 'stacked',
    options: [
      { label: 'Stacked (Single Column)', value: 'stacked' },
      { label: 'Responsive 2-Column Grid', value: 'grid-2col' },
    ],
    admin: {
      description: 'Override layout arrangement for form fields on desktop viewports.',
    },
  },

  {
    name: 'location',
    type: 'group',
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'googleMaps',
        options: [
          { label: 'Google Maps Embed', value: 'googleMaps' },
          { label: 'Online Link', value: 'onlineLink' },
          { label: 'Remote', value: 'remote' },
        ],
      },
      {
        name: 'mapEmbedUrl',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'googleMaps',
        },
        label: 'Google Maps Embed URL',
      },
      {
        name: 'onlineLinkUrl',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'onlineLink',
        },
        label: 'Online Link URL',
      }
    ]
  }
]
