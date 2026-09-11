import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: '404 - Not Found | A L Law',
  description: 'The page you are looking for is not available or doesn’t belong to this website!',
}

export default async function NotFound() {
  const pageBanners = await getCachedPageBanners().catch(() => null)
  const bannerMedia = pageBanners?.defaultBanner?.media as Media | undefined

  return (
    <article className="not-found-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title="Not Found"
        innerTitle="404"
        media={bannerMedia}
      />

      {/* 2. Exact 1-to-1 Conbix Error Page Component */}
      <div className="error section-padding">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-12 w-full px-4">
              <div className="error-page">
                <h1>
                  4<span>0</span>4
                </h1>
                <h2>Oops! Page not found.</h2>
                <p>The page you are looking for is not available or doesn’t belong to this website!</p>
                <Link className="btn-one" href="/">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
