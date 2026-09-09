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

export default async function NewsDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [item] } = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!item) return notFound()

  const bannerMedia = (pageBanners?.news?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="news-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={item.title}
        innerTitle={item.title}
        breadcrumbs={[
          { label: 'News', url: '/news' },
          { label: item.title },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        {item.excerpt && (
          <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12">
            <p className="font-body text-lg text-brand-slate dark:text-brand-blush leading-relaxed">
              {item.excerpt}
            </p>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-4xl font-body text-base leading-relaxed">
          {item.content ? (
            typeof item.content === 'string' ? (
              <p>{item.content}</p>
            ) : (
              JSON.stringify(item.content)
            )
          ) : (
            <p>{item.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  )
}
