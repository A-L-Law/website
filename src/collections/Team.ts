import { richResultsField } from '@/fields/richResults'
import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    jobTitle: true,
    jobRole: true,
    avatar: true,
    contact: true,
    socialLinks: true,
    practiceAreas: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'jobTitle', 'jobRole', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the team member / solicitor',
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      admin: {
        description:
          'Specific written job title (e.g., Senior Advisor, Partner - Commercial Litigation)',
      },
    },
    {
      name: 'jobRole',
      type: 'select',
      required: true,
      admin: {
        description: 'Role category used for filtering on the /team directory page',
      },
      options: [
        { label: 'Founder', value: 'founder' },
        { label: 'Partner', value: 'partner' },
        { label: 'Senior Solicitor', value: 'senior-solicitor' },
        { label: 'Associate', value: 'associate' },
        { label: 'Solicitor', value: 'solicitor' },
        { label: 'Consultant', value: 'consultant' },
        { label: 'Manager', value: 'manager' },
        { label: 'Legal Assistant', value: 'legal-assistant' },
        { label: 'Trainee Solicitor', value: 'trainee' },
      ],
    },
    {
      name: 'avatar',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Portrait photo of the team member (used on directory cards and profile header)',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'Optional link to a system user account',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Background & Bio',
          fields: [
            {
              name: 'background',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              admin: {
                description:
                  'Professional background, career history, and legal biography (replaces Career Guidelines). Supports bold, italics, links, ordered lists, and unordered lists.',
              },
            },
          ],
        },
        {
          label: 'Practice Areas',
          fields: [
            {
              name: 'practiceAreas',
              type: 'array',
              label: 'Practice Areas & Skills',
              admin: {
                description:
                  'Areas of legal expertise with proficiency percentage bars matching the Conbix experience layout',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Practice Area / Skill Name',
                },
                {
                  name: 'percentage',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 100,
                  label: 'Proficiency Percentage (0–100)',
                },
              ],
            },
          ],
        },
        {
          label: 'Contact Details',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'Direct Contact Details',
              fields: [
                {
                  name: 'email',
                  type: 'email',
                  label: 'Quick Email Address',
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Direct Phone / Telephone',
                },
                {
                  name: 'officeLocation',
                  type: 'text',
                  label: 'Primary Office Location',
                  defaultValue: 'London Head Office',
                },
              ],
            },
          ],
        },
        {
          label: 'Social Profiles',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'linkedin',
                  type: 'text',
                  label: 'LinkedIn Profile URL',
                },
                {
                  name: 'instagram',
                  type: 'text',
                  label: 'Instagram Profile URL',
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook Profile URL',
                },
                {
                  name: 'x',
                  type: 'text',
                  label: 'X (formerly Twitter) URL',
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    richResultsField('team'),
    slugField({
      useAsSlug: 'name',
    }),
  ],
}
