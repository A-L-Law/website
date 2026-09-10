import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
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
      defaultValue: 'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.',
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
      name: 'headOfficeAddress',
      type: 'text',
      defaultValue: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    {
      name: 'branchOfficeAddress',
      type: 'text',
      defaultValue: '8502 Preston Rd. Inglewood, Maine 98380',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: 'Copyright 2026 A L Law — All Rights Reserved',
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
