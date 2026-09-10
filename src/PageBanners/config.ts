import type { GlobalConfig } from 'payload'
import { revalidatePageBanners } from './hooks/revalidatePageBanners'

export const PageBanners: GlobalConfig = {
  slug: 'page-banners',
  label: 'Page Banners',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Practice Areas',
          name: 'practiceAreas',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Our Practice Areas',
              admin: { description: 'Banner title for /practice-areas' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Our Practice Areas',
              admin: { description: 'Breadcrumb label for /practice-areas' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Practice Areas banner' },
            },
          ],
        },
        {
          label: 'Team',
          name: 'team',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Our Team & Partners',
              admin: { description: 'Banner title for /team' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Our Team',
              admin: { description: 'Breadcrumb label for /team' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Team page banner' },
            },
          ],
        },
        {
          label: 'Guides',
          name: 'guides',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Legal Guides & Insights',
              admin: { description: 'Banner title for /guides' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Legal Guides',
              admin: { description: 'Breadcrumb label for /guides' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Guides page banner' },
            },
          ],
        },
        {
          label: 'Cases',
          name: 'cases',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Cases & Matters',
              admin: { description: 'Banner title for /cases' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Cases',
              admin: { description: 'Breadcrumb label for /cases' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Cases page banner' },
            },
          ],
        },
        {
          label: 'Events',
          name: 'events',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Events & Webinars',
              admin: { description: 'Banner title for /events' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Events',
              admin: { description: 'Breadcrumb label for /events' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Events page banner' },
            },
          ],
        },
        {
          label: 'News',
          name: 'news',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Firm News & Media',
              admin: { description: 'Banner title for /news' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'News',
              admin: { description: 'Breadcrumb label for /news' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for News page banner' },
            },
          ],
        },
        {
          label: 'Careers / Vacancies',
          name: 'vacancies',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Careers & Vacancies',
              admin: { description: 'Banner title for /vacancies' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Careers',
              admin: { description: 'Breadcrumb label for /vacancies' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Careers page banner' },
            },
          ],
        },
        {
          label: 'Search',
          name: 'search',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Search Results',
              admin: { description: 'Banner title for /search' },
            },
            {
              name: 'innerTitle',
              type: 'text',
              defaultValue: 'Search',
              admin: { description: 'Breadcrumb label for /search' },
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Banner Image',
              admin: { description: 'Background image for Search page banner' },
            },
          ],
        },
        {
          label: 'Default Fallback',
          name: 'defaultBanner',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Default Fallback Banner Image',
              admin: { description: 'Fallback image for any page without a specific banner' },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePageBanners],
  },
}
