import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function VacanciesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: vacancies } = await payload.find({
    collection: 'vacancies',
    sort: '-createdAt',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.vacancies?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="vacancies-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.vacancies?.title || 'Careers & Open Vacancies'}
        innerTitle={pageBanners?.vacancies?.innerTitle || 'Careers'}
        media={bannerMedia}
      />

      {/* 2. Vacancies Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            Join A L Law. Explore current legal career opportunities in our London office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vacancies.map((v) => (
            <Link
              key={v.id}
              href={`/vacancies/${v.slug}`}
              className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-ice text-brand-charcoal">
                    {v.employmentType || 'Full-Time'}
                  </span>
                  <span className="font-body text-xs text-brand-slate">{v.location || 'London, UK'}</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3 transition-colors">
                  {v.title}
                </h2>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2 mt-6 group-hover:translate-x-1 transition-transform">
                View Role & Apply &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
