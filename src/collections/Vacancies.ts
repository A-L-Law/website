import { richResultsField } from '@/fields/richResults'
import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { Banner } from '../blocks/Banner/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { populatePublishedAt } from '../hooks/populatePublishedAt'
import { revalidateDelete, revalidatePost } from '../hooks/revalidatePost'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { slugField } from 'payload'
import { contactSectionFields } from '../blocks/Form/contactSectionFields'

export const Vacancies: CollectionConfig<'vacancies'> = {
  slug: 'vacancies',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'employmentType', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'vacancies',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'vacancies',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job role title (e.g. Senior Commercial Litigation Solicitor)',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    ParagraphFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    LinkFeature({
                      enabledCollections: ['pages', 'posts', 'practice-areas', 'events', 'vacancies'],
                      fields: ({ defaultFields }) => {
                        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                          if ('name' in field && field.name === 'url') return false
                          return true
                        })

                        return [
                          ...defaultFieldsWithoutUrl,
                          {
                            name: 'url',
                            type: 'text',
                            admin: {
                              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                            },
                            label: ({ t }) => t('fields:enterURL'),
                            required: true,
                          },
                        ]
                      },
                    }),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    HorizontalRuleFeature(),
                    BlocksFeature({ blocks: [MediaBlock, Banner] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Content',
              required: true,
            },
            {
              name: 'contactSection',
              type: 'group',
              label: 'Contact Section',
              admin: {
                description: 'Fields for the Contact/Map footer at the bottom of the page.',
              },
              fields: contactSectionFields
            }
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'location',
              type: 'text',
              defaultValue: 'London, UK',
            },
            {
              name: 'employmentType',
              type: 'select',
              defaultValue: 'Full-Time',
              options: [
                { label: 'Full-Time', value: 'Full-Time' },
                { label: 'Part-Time', value: 'Part-Time' },
                { label: 'Contract', value: 'Contract' },
              ],
            },
            {
              name: 'closingDate',
              type: 'date',
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
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
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
    },
    richResultsField('vacancies'),
    slugField({
      useAsSlug: 'title',
    }),
  ],
  hooks: {
    afterChange: [revalidatePost],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
