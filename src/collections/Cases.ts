import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
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
import { revalidateDelete, revalidateCase } from '../hooks/revalidateCase'
import { generatePreviewPath } from '../utilities/generatePreviewPath'
import { slugField } from 'payload'

const restrictedLexicalEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature({
        enabledCollections: ['pages', 'posts', 'practice-areas', 'cases'],
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
})

export const Cases: CollectionConfig<'cases'> = {
  slug: 'cases',
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
    defaultColumns: ['title', 'practiceArea', 'forum', 'value', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'cases',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'cases',
        req,
      }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Anonymized case title (e.g. Commercial Property Refinancing for UK Retail Group)',
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
              admin: {
                description: 'A short summary displayed on listing pages and in sidebars.',
              },
            },
            {
              name: 'aboutCase',
              type: 'richText',
              editor: restrictedLexicalEditor,
              label: 'About Case',
            },
            {
              name: 'challenges',
              type: 'richText',
              editor: restrictedLexicalEditor,
              label: 'The Challenges',
            },
            {
              name: 'solutions',
              type: 'richText',
              editor: restrictedLexicalEditor,
              label: 'The Solutions',
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Categories',
            },
            {
              name: 'practiceArea',
              type: 'relationship',
              relationTo: 'practice-areas',
              label: 'Practice Area',
              admin: {
                description: 'Link this case to a Practice Area.',
              },
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
              label: 'Tags',
            },
            {
              name: 'forum',
              type: 'text',
              admin: {
                description: 'Court, tribunal, or arbitration forum (e.g. High Court Chancery Division)',
              },
            },
            {
              name: 'value',
              type: 'text',
              admin: {
                description: 'Matter transaction / dispute value (e.g. £12.5M)',
              },
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
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: 'Authors',
      admin: {
        position: 'sidebar',
      },
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
    slugField({
      useAsSlug: 'title',
    }),
  ],
  hooks: {
    afterChange: [revalidateCase],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
