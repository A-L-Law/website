import { afterFormSubmission } from '@/integrations/clio/formHook'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateDescription, GenerateImage, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page | Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | A L Law` : 'A L Law'
}

const generateDescription: GenerateDescription<Page | Post> = ({ doc }) => {
  if (doc && 'excerpt' in doc && doc.excerpt) {
    return doc.excerpt
  }
  return ''
}

const generateImage: GenerateImage<Page | Post> = ({ doc }) => {
  if (doc && 'heroImage' in doc && doc.heroImage) {
    return typeof doc.heroImage === 'object' ? doc.heroImage.id : doc.heroImage
  }
  return ''
}

const generateURL: GenerateURL<Page | Post> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc?.slug) return url

  if ('postType' in doc && doc.postType) {
    return doc.postType === 'guide' ? `${url}/guides/${doc.slug}` : `${url}/news/${doc.slug}`
  }

  return `${url}/${doc.slug}`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateDescription,
    generateImage,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      upload: true,
    },
    uploadCollections: ['media'],
    beforeEmail: async (emails, beforeChangeParams) => {
      const { data, req } = beforeChangeParams
      const submissionUploads =
        (data as any)?.submissionUploads || (beforeChangeParams as any)?.doc?.submissionUploads || []

      if (!submissionUploads || submissionUploads.length === 0) {
        return emails
      }

      const attachments: Array<{ filename: string; path?: string; contentType?: string }> = []

      for (const uploadItem of submissionUploads) {
        const fileItems = Array.isArray(uploadItem.value) ? uploadItem.value : [uploadItem.value]
        for (const item of fileItems) {
          const fileId = typeof item === 'object' && item !== null ? item.value || item.id : item
          const relationTo = (typeof item === 'object' && item !== null ? item.relationTo : null) || 'media'

          if (fileId) {
            try {
              const mediaDoc: any = await req.payload.findByID({
                collection: relationTo,
                id: fileId,
                req,
              })

              if (mediaDoc) {
                attachments.push({
                  filename: mediaDoc.filename || `document-${fileId}.pdf`,
                  path: mediaDoc.url || undefined,
                  contentType: mediaDoc.mimeType || undefined,
                })
              }
            } catch (err) {
              req.payload.logger.warn({
                msg: `Failed to attach media doc ${fileId} to email: ${(err as Error).message}`,
              })
            }
          }
        }
      }

      if (attachments.length > 0) {
        return emails.map((email) => ({
          ...email,
          attachments: [...((email as any).attachments || []), ...attachments],
        }))
      }

      return emails
    },
    formSubmissionOverrides: {
      hooks: {
        afterChange: [afterFormSubmission],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        const mapped = defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })

        return [
          ...mapped,
          {
            name: 'layout',
            type: 'select',
            label: 'Form Layout',
            defaultValue: 'stacked',
            options: [
              { label: 'Stacked (Single Column)', value: 'stacked' },
              { label: 'Responsive 2-Column Grid', value: 'grid-2col' },
            ],
            admin: {
              description: 'Choose layout arrangement for form fields on desktop viewports.',
            },
          },
          {
            name: 'resendAudienceId',
            type: 'text',
            label: 'Resend Audience ID',
            defaultValue: 'General',
            admin: {
              description:
                'Target Resend Audience ID for contacts who opt-in to marketing updates (defaults to "General").',
            },
          },
        ]
      },
    },
  }),
  searchPlugin({
    collections: ['pages', 'posts', 'practice-areas', 'cases', 'events', 'vacancies'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
