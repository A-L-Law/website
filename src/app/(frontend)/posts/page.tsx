import type { Metadata } from 'next/types'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const bannerMedia = (pageBanners?.posts?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="posts-page font-body">
      <PageClient />
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.posts?.title || 'Blog & Legal Insights'}
        innerTitle={pageBanners?.posts?.innerTitle || 'Blog'}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="mt-12">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog & Legal Insights | A L Law`,
  }
}
