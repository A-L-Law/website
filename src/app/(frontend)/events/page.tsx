import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Event } from '@/payload-types'
import EventsSidebar from '@/components/Blog/EventsSidebar'
import EventsList from './EventsList.client'
import { Subscribe } from '@/components/Subscribe'

export const revalidate = 60

export default async function EventsHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: events } = await payload.find({
    collection: 'events',
    sort: '-eventDate',
    limit: 100, // Fetch up to 100 for client-side pagination
  })

  const bannerMedia = (pageBanners?.events?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="events-page">
      {/* 1. Medium Impact Hero Banner */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.events?.title || 'Upcoming Events'}
        innerTitle={pageBanners?.events?.innerTitle || 'Events'}
        media={bannerMedia}
      />

      {/* 2. Blog Standard Layout */}
      <div className="blog__standard section-padding py-24">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-8 col-lg-8 w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
              <EventsList initialEvents={events as Event[]} />
            </div>
            <div className="col-xl-4 col-lg-4 w-full lg:w-1/3 px-4">
              <EventsSidebar />
            </div>
          </div>
        </div>
      </div>
      <Subscribe />
    </article>
  )
}
