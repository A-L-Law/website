import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function CasesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: cases } = await payload.find({
    collection: 'cases',
    sort: '-createdAt',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.cases?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="cases-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.cases?.title || 'Cases & Representative Matters'}
        innerTitle={pageBanners?.cases?.innerTitle || 'Cases'}
        media={bannerMedia}
      />

      {/* 2. Cases Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            High-value transaction and dispute outcomes handled by A L Law. (Client confidentiality strictly preserved.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {c.value && (
                    <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-crimson text-brand-white">
                      {c.value}
                    </span>
                  )}
                  {c.forum && (
                    <span className="font-body text-xs text-brand-slate">{c.forum}</span>
                  )}
                </div>
                <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3 transition-colors">
                  {c.title}
                </h2>
                <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6 leading-relaxed">
                  {c.caseSummary}
                </p>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                View Case Summary &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
