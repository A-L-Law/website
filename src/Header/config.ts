import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topBarAddress',
      type: 'text',
      defaultValue: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
      admin: {
        description: 'Address text displayed in the header top bar',
      },
    },
    {
      name: 'topBarEmail',
      type: 'text',
      defaultValue: 'info@allaw.co.uk',
      admin: {
        description: 'Contact email displayed in the header top bar',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Social media links displayed in the top bar and offcanvas widget',
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
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'offcanvasDescription',
      type: 'textarea',
      defaultValue: 'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.',
      admin: {
        description: 'Flavor description text shown in the slide-out menu widget',
      },
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      defaultValue: 'Free Consultation',
    },
    {
      name: 'ctaButtonLink',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
