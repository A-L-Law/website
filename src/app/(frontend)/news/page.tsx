import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function NewsHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: newsItems } = await payload.find({
    collection: 'news',
    sort: '-publishedAt',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.news?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="news-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.news?.title || 'Firm News & Media'}
        innerTitle={pageBanners?.news?.innerTitle || 'News'}
        media={bannerMedia}
      />

      {/* 2. News Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            Latest announcements, firm developments, and media commentary from A L Law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3 transition-colors">
                  {item.title}
                </h2>
                <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Read Article &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
