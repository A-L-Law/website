import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const CookieConsent: GlobalConfig = {
  slug: 'cookie-consent',
  label: 'Cookie Consent',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Banner Title',
      defaultValue: 'We value your privacy',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Banner Description',
      defaultValue:
        'We use cookies to enhance your browsing experience, provide personalized legal content, and analyze our traffic. By clicking "Accept All Cookies", you consent to our use of cookies.',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'privacyPolicyUrl',
          type: 'text',
          label: 'Privacy Policy URL',
          defaultValue: '/privacy-policy',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'cookiePolicyUrl',
          type: 'text',
          label: 'Cookie Policy URL',
          defaultValue: '/cookie-policy',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'gaMeasurementId',
      type: 'text',
      label: 'GA4 Measurement ID (Optional Override)',
      admin: {
        description:
          'Override for Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX). If left empty, NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is used.',
      },
    },
  ],
}
