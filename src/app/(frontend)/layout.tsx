import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { SwitchTab } from '@/components/SwitchTab'
import { ScrollToTop } from '@/components/ScrollToTop'
import { GoogleConsentMode } from '@/components/Consent/GoogleConsentMode'
import { CookieConsentBanner } from '@/components/Consent/CookieConsentBanner'
import { getCookieConsent } from '@/utilities/getGlobals'
import { JsonLdScript, getRootOrganizationSchema } from '@/utilities/schemaGenerator'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const cookieConsent = await getCookieConsent().catch(() => null)

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <GoogleConsentMode gaMeasurementId={cookieConsent?.gaMeasurementId} />
        <JsonLdScript schema={{ '@context': 'https://schema.org', '@graph': [getRootOrganizationSchema()] }} />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="stylesheet" href="/assets/css/fontawesome.css" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <SwitchTab />
          <ScrollToTop />
          <CookieConsentBanner data={cookieConsent} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
