import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'flavorDescription',
      type: 'textarea',
      defaultValue:
        'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.',
      admin: {
        description: 'Flavor description paragraph below the footer logo',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Social media platform links',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'navColumns',
      type: 'array',
      admin: {
        description: 'Categorized footer navigation link columns',
      },
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          required: true,
          defaultValue: 'Our Practice Areas',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Office Addresses',
      admin: {
        description:
          'Add office locations one by one with customizable titles (e.g. Head Office Address, City Office Address)',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Address Title',
          defaultValue: 'Head Office Address',
          admin: {
            description: 'e.g. Head Office Address, London City Office, Branch Office',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
          label: 'Address Details',
        },
        {
          name: 'mapLink',
          type: 'text',
          label: 'Google Maps Link (Optional)',
        },
      ],
      defaultValue: [
        {
          title: 'Head Office Address',
          address: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
          mapLink: 'https://maps.google.com',
        },
        {
          title: 'Branch Office Address',
          address: '8502 Preston Rd. Inglewood, Maine 98380',
          mapLink: 'https://maps.google.com',
        },
      ],
    },
    {
      name: 'headOfficeAddress',
      type: 'text',
      defaultValue: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'branchOfficeAddress',
      type: 'text',
      defaultValue: '8502 Preston Rd. Inglewood, Maine 98380',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'copyright',
      type: 'richText',
      label: 'Copyright Notice',
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature({
            enabledCollections: ['pages'],
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        description: 'Copyright notice supporting rich text with links, bold, and italics',
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: 'Copyright 2026 A L Law — All Rights Reserved',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Navigation Links',
      admin: {
        description: 'Bottom legal links (e.g. Privacy Policy, Terms of Service, Cookies)',
        initCollapsed: true,
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      defaultValue: [
        { link: { label: 'Privacy Policy', type: 'custom', url: '/privacy-policy' } },
        { link: { label: 'Terms of Service', type: 'custom', url: '/terms-of-service' } },
      ],
    },
    {
      name: 'subscribeBgMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Background image for the Subscribe banner above footer',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
