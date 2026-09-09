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

export default async function EventDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [event] } = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!event) return notFound()

  const bannerMedia = (pageBanners?.events?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="event-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={event.title}
        innerTitle={event.title}
        breadcrumbs={[
          { label: 'Events', url: '/events' },
          { label: event.title },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12">
          {event.location && (
            <span className="font-heading text-xs font-bold text-brand-crimson dark:text-brand-coral uppercase tracking-wider block mb-2">
              {event.location}
            </span>
          )}
          <p className="font-body text-lg text-brand-slate dark:text-brand-blush leading-relaxed">
            {event.summary}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-4xl font-body text-base leading-relaxed">
          {event.details ? (
            typeof event.details === 'string' ? (
              <p>{event.details}</p>
            ) : (
              JSON.stringify(event.details)
            )
          ) : (
            <p>{event.summary}</p>
          )}
        </div>
      </div>
    </article>
  )
}
