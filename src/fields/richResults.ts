import type { Field } from 'payload'

export const richResultsField = (collectionSlug: string): Field => ({
  name: 'richResultsTest',
  type: 'ui',
  admin: {
    position: 'sidebar',
    components: {
      Field: {
        path: '@/components/Admin/RichResultsButton#RichResultsButton',
        clientProps: {
          collectionSlug,
        },
      },
    },
  },
})
