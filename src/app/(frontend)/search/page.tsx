import type { Metadata } from 'next/types'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'
import { CardPostData } from '@/components/Card'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  const bannerMedia = (pageBanners?.search?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="search-page font-body">
      <PageClient />
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={query ? `Search: ${query}` : (pageBanners?.search?.title || 'Search Results')}
        innerTitle={pageBanners?.search?.innerTitle || 'Search'}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto mb-16">
          <Search />
        </div>

        {posts.totalDocs > 0 ? (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="text-center py-12 text-brand-slate text-lg">
            No results found for &ldquo;{query}&rdquo;. Try another search term.
          </div>
        )}
      </div>
    </article>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | A L Law`,
  }
}
