import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Post } from '@/payload-types'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import NewsList from './NewsList.client'

export const revalidate = 60

export default async function NewsHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: newsItems } = await payload.find({
    collection: 'posts',
    where: {
      postType: { equals: 'news' },
    },
    sort: '-publishedAt',
    limit: 100, // Fetch up to 100 for client-side pagination
  })

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

      {/* 2. Blog Standard Layout */}
      <div className="blog__standard section-padding py-24">
        <div className="container">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-8 col-lg-8 w-full lg:w-2/3 px-4 lg-mb-50">
              <NewsList initialNews={newsItems as Post[]} />
            </div>
            <div className="col-xl-4 col-lg-4 w-full lg:w-1/3 px-4">
              <BlogSidebar postType="news" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
