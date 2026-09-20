import type { Metadata } from 'next/types'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Search as SearchIcon } from 'lucide-react'

import { Search } from '@/search/Component'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'
import PageClient from './page.client'
import { UniversalCard, resolveUniversalCardData, UniversalCardData } from '@/components/UniversalCard'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // 1. Query the search collection
  const searchResults = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 30,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      doc: true,
      resourceType: true,
      excerpt: true,
      url: true,
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
              {
                excerpt: {
                  like: query,
                },
              },
              {
                resourceType: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  // Enrich search results from posts to guarantee postType, excerpt, URL, and heroImage
  const postDocIds = searchResults.docs
    .filter((d: any) => d.doc?.relationTo === 'posts')
    .map((d: any) => (typeof d.doc?.value === 'object' ? d.doc.value?.id : d.doc?.value))
    .filter(Boolean)

  if (postDocIds.length > 0) {
    try {
      const postsBatch = await payload.find({
        collection: 'posts',
        where: {
          id: {
            in: postDocIds,
          },
        },
        depth: 1,
        pagination: false,
      })

      const postMap = new Map(postsBatch.docs.map((p) => [p.id, p]))

      for (const d of searchResults.docs as any[]) {
        if (d.doc?.relationTo === 'posts') {
          const postVal = typeof d.doc?.value === 'object' ? d.doc.value?.id : d.doc?.value
          const post = postMap.get(postVal)
          if (post) {
            d.doc.value = post
            d.postType = post.postType
            if (!d.resourceType) {
              d.resourceType = post.postType === 'guide' ? 'Guide' : 'News'
            }
            if (!d.url) {
              d.url = post.postType === 'guide' ? `/guides/${post.slug}` : `/news/${post.slug}`
            }
            if (!d.excerpt) {
              d.excerpt = post.excerpt || post.meta?.description || ''
            }
            if (!d.meta?.image && post.heroImage) {
              if (!d.meta) d.meta = {}
              d.meta.image = post.heroImage
            }
            if (!d.heroImage && post.heroImage) {
              d.heroImage = post.heroImage
            }
          }
        }
      }
    } catch {
      // Continue gracefully if batch fetch fails
    }
  }

  // Normalize search docs into UniversalCardData
  const combinedDocs: UniversalCardData[] = searchResults.docs.map(resolveUniversalCardData)

  const extractImageUrl = (mediaItem: any): string | null => {
    if (!mediaItem) return null
    if (typeof mediaItem === 'string' && (mediaItem.startsWith('http') || mediaItem.startsWith('/'))) {
      return mediaItem
    }
    if (typeof mediaItem === 'object') {
      return (
        mediaItem.url ||
        mediaItem.sizes?.medium?.url ||
        mediaItem.sizes?.large?.url ||
        mediaItem.sizes?.small?.url ||
        null
      )
    }
    return null
  }

  // 2. Supplemental live search across collections if a query is active
  // This guarantees existing unindexed documents in cases, events, vacancies, etc. are found seamlessly
  if (query) {
    const seenIds = new Set(combinedDocs.map((d) => d.id))
    const seenUrls = new Set(combinedDocs.map((d) => d.url.toLowerCase()))

    const [casesRes, eventsRes, vacanciesRes, postsRes, practiceRes] = await Promise.all([
      payload
        .find({
          collection: 'cases',
          where: {
            or: [
              { title: { like: query } },
              { excerpt: { like: query } },
              { slug: { like: query } },
            ],
          },
          depth: 1,
          limit: 10,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'events',
          where: {
            or: [
              { title: { like: query } },
              { excerpt: { like: query } },
              { location: { like: query } },
              { slug: { like: query } },
            ],
          },
          depth: 1,
          limit: 10,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'vacancies',
          where: {
            or: [
              { title: { like: query } },
              { excerpt: { like: query } },
              { slug: { like: query } },
            ],
          },
          depth: 1,
          limit: 10,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'posts',
          where: {
            or: [
              { title: { like: query } },
              { excerpt: { like: query } },
              { slug: { like: query } },
            ],
          },
          depth: 1,
          limit: 10,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'practice-areas',
          where: {
            or: [
              { title: { like: query } },
              { summary: { like: query } },
              { slug: { like: query } },
            ],
          },
          depth: 1,
          limit: 10,
        })
        .catch(() => ({ docs: [] })),
    ])

    const supplemental: UniversalCardData[] = [
      ...casesRes.docs.map((c: any) => ({
        id: `case-${c.id}`,
        title: c.title,
        excerpt: c.excerpt || c.meta?.description || '',
        resourceType: 'Case',
        url: `/cases/${c.slug}`,
        imageUrl: extractImageUrl(c.heroImage) || extractImageUrl(c.meta?.image),
      })),
      ...eventsRes.docs.map((e: any) => ({
        id: `event-${e.id}`,
        title: e.title,
        excerpt: e.excerpt || e.meta?.description || '',
        resourceType: 'Event',
        url: `/events/${e.slug}`,
        imageUrl: extractImageUrl(e.heroImage) || extractImageUrl(e.meta?.image),
      })),
      ...vacanciesRes.docs.map((v: any) => ({
        id: `vacancy-${v.id}`,
        title: v.title,
        excerpt: v.excerpt || v.meta?.description || '',
        resourceType: 'Vacancy',
        url: `/vacancies/${v.slug}`,
        imageUrl: extractImageUrl(v.heroImage) || extractImageUrl(v.meta?.image),
      })),
      ...postsRes.docs.map((p: any) => ({
        id: `post-${p.id}`,
        title: p.title,
        excerpt: p.excerpt || p.meta?.description || '',
        resourceType: p.postType === 'guide' ? 'Guide' : 'News',
        url: p.postType === 'guide' ? `/guides/${p.slug}` : `/news/${p.slug}`,
        imageUrl: extractImageUrl(p.heroImage) || extractImageUrl(p.meta?.image),
      })),
      ...practiceRes.docs.map((pa: any) => ({
        id: `practice-${pa.id}`,
        title: pa.title,
        excerpt: pa.summary || pa.meta?.description || '',
        resourceType: 'Practice Area',
        url: `/practice-areas/${pa.slug}`,
        imageUrl: extractImageUrl(pa.heroImage) || extractImageUrl(pa.meta?.image),
      })),
    ]

    for (const item of supplemental) {
      if (!seenIds.has(item.id) && !seenUrls.has(item.url.toLowerCase())) {
        combinedDocs.push(item)
        seenIds.add(item.id)
        seenUrls.add(item.url.toLowerCase())
      }
    }
  }

  const bannerMedia = (pageBanners?.search?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="search-page font-body">
      <PageClient />
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={query ? `Search: ${query}` : pageBanners?.search?.title || 'Search Results'}
        innerTitle={pageBanners?.search?.innerTitle || 'Search'}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-14">
          <Search initialQuery={query} />
        </div>

        {combinedDocs.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
              <p className="text-brand-slate dark:text-gray-400 text-sm font-semibold">
                {query ? (
                  <>
                    Found{' '}
                    <span className="text-brand-crimson font-bold">{combinedDocs.length}</span>{' '}
                    {combinedDocs.length === 1 ? 'result' : 'results'} for &ldquo;
                    <span className="text-brand-charcoal dark:text-white font-bold">{query}</span>
                    &rdquo;
                  </>
                ) : (
                  <>
                    Showing all{' '}
                    <span className="text-brand-crimson font-bold">{combinedDocs.length}</span>{' '}
                    resources
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combinedDocs.map((item) => (
                <UniversalCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-gray-50 dark:bg-background border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-crimson/10 text-brand-crimson flex items-center justify-center">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-brand-charcoal dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-brand-slate dark:text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
              We couldn&apos;t find any resources matching &ldquo;{query}&rdquo;. Try searching for
              cases, guides, events, news, or practice areas.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-brand-crimson hover:bg-black text-white font-heading text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-md transition-colors shadow-sm"
            >
              Clear Search
            </Link>
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
