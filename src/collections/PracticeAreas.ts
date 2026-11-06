import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import { richResultsField } from '@/fields/richResults'

export const PracticeAreas: CollectionConfig<'practice-areas'> = {
  slug: 'practice-areas',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    summary: true,
    sidebarCtaImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview & Content',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              defaultValue: 'Scale',
              options: [
                { label: 'Scale (Justice)', value: 'Scale' },
                { label: 'Briefcase (Commercial / Corporate)', value: 'Briefcase' },
                { label: 'Building (Real Estate / Property)', value: 'Building2' },
                { label: 'Shield (Litigation / Protection)', value: 'ShieldCheck' },
                { label: 'FileText (Contracts & Agreements)', value: 'FileText' },
                { label: 'Users (Private Client & Family)', value: 'Users' },
                { label: 'Gavel (Dispute Resolution)', value: 'Gavel' },
                { label: 'Landmark (Finance & Banking)', value: 'Landmark' },
              ],
              admin: {
                description:
                  'Lucide SVG icon badge displayed on practice area cards and category buttons',
              },
            },
            {
              name: 'customIcon',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Optional custom icon image asset fallback',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief overview paragraph shown at the top of the page and on cards',
              },
            },
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'Main detailed description body for this practice area',
              },
            },
            {
              name: 'heroImage',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Feature photo displayed at the top of the detail page',
              },
            },
            {
              name: 'sidebarCtaImage',
              type: 'relationship',
              relationTo: 'media',
              label: 'Sidebar CTA Image',
              admin: {
                description:
                  'Background photo displayed behind the sidebar "Need Help" callout box (defaults to standard support image if unassigned)',
              },
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Key Highlights Checklist (Ticks)',
              admin: {
                description: 'Bullet points with red checkmark ticks displayed below the overview',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Highlight Point',
                },
              ],
            },
          ],
        },
        {
          label: 'Capabilities & Scope',
          fields: [
            {
              name: 'capabilitiesTitle',
              type: 'text',
              label: 'Capabilities Section Title',
              defaultValue: 'Strategic Capabilities & Scope',
            },
            {
              name: 'capabilitiesDescription',
              type: 'textarea',
              label: 'Capabilities Section Description',
              defaultValue:
                "Our solicitors combine technical excellence with acute commercial acumen. Whether advising corporate entities on complex regulatory landscapes or resolving contentious disputes, we safeguard our clients' interests with focused precision.",
            },
            {
              name: 'capabilities',
              type: 'array',
              label: 'Capabilities Checklist (Ticks)',
              admin: {
                description: 'Items displayed in the 2-column capabilities grid with red checkmarks',
              },
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  required: true,
                  label: 'Capability Item',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              label: 'Frequently Asked Questions',
              admin: {
                initCollapsed: true,
                description:
                  'Questions and rich text answers displayed in the interactive accordion at the bottom of the page',
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  label: 'Question',
                },
                {
                  name: 'answer',
                  type: 'richText',
                  required: true,
                  label: 'Answer (Rich Text)',
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
    richResultsField('practice-areas'),
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
