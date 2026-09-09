import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function EventsHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: events } = await payload.find({
    collection: 'events',
    sort: 'eventDate',
    limit: 100,
  })

  const bannerMedia = (pageBanners?.events?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="events-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.events?.title || 'Events & Webinars'}
        innerTitle={pageBanners?.events?.innerTitle || 'Events'}
        media={bannerMedia}
      />

      {/* 2. Events Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-body text-lg text-brand-slate">
            Upcoming seminars, workshops, and online briefings hosted by A L Law partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group p-6 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                {event.location && (
                  <div className="font-heading text-xs font-bold text-brand-crimson mb-2 uppercase tracking-wide">
                    {event.location}
                  </div>
                )}
                <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3 transition-colors">
                  {event.title}
                </h2>
                <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6 leading-relaxed">
                  {event.summary}
                </p>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Event Details &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
