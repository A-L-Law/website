import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Post, PracticeArea } from '@/payload-types'
import GuidesGrid from './GuidesGrid.client'

export const revalidate = 60

export default async function GuidesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // Fetch guides posts and practice areas for the filter
  const [{ docs: guides }, { docs: practiceAreas }] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        postType: { equals: 'guide' },
      },
      sort: '-publishedAt',
      limit: 100, // Fetch up to 100 for client-side pagination
    }),
    payload.find({
      collection: 'practice-areas',
      limit: 50,
    }),
  ])

  const bannerMedia = (pageBanners?.guides?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="guides-page">
      {/* 1. Medium Impact Hero Banner */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.guides?.title || 'Legal Guides & Insights'}
        innerTitle={pageBanners?.guides?.innerTitle || 'Legal Guides'}
        media={bannerMedia}
      />

      {/* 2. Blog Grid Layout */}
      <div className="blog__two section-padding py-24">
        <div className="container">
          <GuidesGrid initialGuides={guides as Post[]} practiceAreas={practiceAreas as PracticeArea[]} />
        </div>
      </div>
    </article>
  )
}
