import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function TeamHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: teamMembers } = await payload.find({
    collection: 'users',
    sort: 'name',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.team?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="team-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.team?.title || 'Our Team & Partners'}
        innerTitle={pageBanners?.team?.innerTitle || 'Our Team'}
        media={bannerMedia}
      />

      {/* 2. Team Directory Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            Experienced London solicitors and legal experts dedicated to delivering strategic, results-focused advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Link
              key={member.id}
              href={`/team/${member.id}`}
              className="group p-6 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm block"
            >
              <div className="w-20 h-20 rounded-full bg-brand-crimson text-brand-white flex items-center justify-center font-heading text-2xl font-bold mb-4 group-hover:scale-105 transition-transform">
                {member.name ? member.name.charAt(0) : 'S'}
              </div>
              <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-1 transition-colors">
                {member.name || 'Solicitor'}
              </h2>
              <p className="font-body text-sm text-brand-slate">
                {member.email}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
