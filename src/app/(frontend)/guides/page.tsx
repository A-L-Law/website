import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function GuidesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: guides } = await payload.find({
    collection: 'guides',
    sort: '-publishedAt',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.guides?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="guides-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.guides?.title || 'Legal Guides & Insights'}
        innerTitle={pageBanners?.guides?.innerTitle || 'Legal Guides'}
        media={bannerMedia}
      />

      {/* 2. Guides Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            In-depth legal analysis, regulatory updates, and practical guidance from London solicitors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.slug}`}
              className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3 transition-colors">
                  {guide.title}
                </h2>
                <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Read Guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
