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

export default async function GuideDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [guide] } = await payload.find({
    collection: 'guides',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!guide) return notFound()

  const bannerMedia = (pageBanners?.guides?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="guide-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={guide.title}
        innerTitle={guide.title}
        breadcrumbs={[
          { label: 'Guides', url: '/guides' },
          { label: guide.title },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        {guide.excerpt && (
          <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12">
            <p className="font-body text-lg text-brand-slate dark:text-brand-blush leading-relaxed">
              {guide.excerpt}
            </p>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-4xl font-body text-base leading-relaxed">
          {guide.content ? (
            typeof guide.content === 'string' ? (
              <p>{guide.content}</p>
            ) : (
              JSON.stringify(guide.content)
            )
          ) : (
            <p>{guide.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  )
}
