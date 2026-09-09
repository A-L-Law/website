import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [c] } = await payload.find({
    collection: 'cases',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!c) return notFound()

  const bannerMedia = (pageBanners?.cases?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="case-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={c.title}
        innerTitle={c.title}
        breadcrumbs={[
          { label: 'Cases', url: '/cases' },
          { label: c.title },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12">
          <div className="flex items-center gap-3 mb-4">
            {c.value && <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-crimson text-brand-white">{c.value}</span>}
            {c.forum && <span className="font-body text-xs text-brand-slate dark:text-brand-blush">{c.forum}</span>}
          </div>
          <p className="font-body text-lg text-brand-slate dark:text-brand-blush leading-relaxed">
            {c.caseSummary}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-4xl font-body text-base leading-relaxed">
          {c.details ? (
            typeof c.details === 'string' ? (
              <p>{c.details}</p>
            ) : (
              JSON.stringify(c.details)
            )
          ) : (
            <p>{c.caseSummary}</p>
          )}
        </div>
      </div>
    </article>
  )
}
