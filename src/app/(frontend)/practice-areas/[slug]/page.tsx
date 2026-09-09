import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as LucideIcons from 'lucide-react'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PracticeAreaDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [area] } = await payload.find({
    collection: 'practice-areas',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!area) return notFound()

  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[area.icon] || LucideIcons.Scale
  const bannerMedia = ((area.heroImage as Media) || pageBanners?.practiceAreas?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="practice-area-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={area.title}
        innerTitle={area.title}
        breadcrumbs={[
          { label: 'Practice Areas', url: '/practice-areas' },
          { label: area.title },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-brand-crimson text-brand-white flex items-center justify-center shrink-0">
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
              Overview
            </h2>
            <p className="font-body text-base md:text-lg text-brand-slate dark:text-brand-blush leading-relaxed">
              {area.summary}
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-4xl font-body text-base leading-relaxed">
          {area.description ? (
            typeof area.description === 'string' ? (
              <p>{area.description}</p>
            ) : (
              JSON.stringify(area.description)
            )
          ) : (
            <p>{area.summary}</p>
          )}
        </div>
      </div>
    </article>
  )
}
