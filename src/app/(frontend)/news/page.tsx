export const dynamic = 'force-dynamic'

import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Post, PracticeArea } from '@/payload-types'
import NewsGrid from './NewsGrid.client'

export const revalidate = 60

export default async function NewsHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // Fetch news posts and practice areas for the filter
  const [{ docs: newsItems }, { docs: practiceAreas }] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        postType: { equals: 'news' }
      },
      sort: '-publishedAt',
      limit: 100, // Fetch up to 100 for client-side pagination
    }),
    payload.find({
      collection: 'practice-areas',
      limit: 50,
    })
  ])

  const bannerMedia = (pageBanners?.news?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="news-page">
      {/* 1. Medium Impact Hero Banner */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.news?.title || 'Firm News & Media'}
        innerTitle={pageBanners?.news?.innerTitle || 'News'}
        media={bannerMedia}
      />

      {/* 2. Blog Grid Layout */}
      <div className="blog__two section-padding py-24 bg-gray-50/50">
        <div className="container">
          <NewsGrid initialNews={newsItems as Post[]} practiceAreas={practiceAreas as PracticeArea[]} />
        </div>
      </div>
    </article>
  )
}
