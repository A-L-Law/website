import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Case, PracticeArea } from '@/payload-types'
import CasesGrid from './CasesGrid.client'
import { Subscribe } from '@/components/Subscribe'

export const revalidate = 60

export default async function CasesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // Fetch cases and practice areas for the filter
  const [{ docs: cases }, { docs: practiceAreas }] = await Promise.all([
    payload.find({
      collection: 'cases',
      sort: '-publishedAt',
      limit: 100, // Fetch up to 100 for client-side pagination
    }),
    payload.find({
      collection: 'practice-areas',
      limit: 50,
    }),
  ])

  const bannerMedia = (pageBanners?.cases?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="cases-page">
      {/* 1. Medium Impact Hero Banner */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.cases?.title || 'Case Studies'}
        innerTitle={pageBanners?.cases?.innerTitle || 'Our Results'}
        media={bannerMedia}
      />

      {/* 2. Portfolio Grid Layout */}
      <div className="section-padding py-24">
        <div className="container">
          <CasesGrid initialCases={cases as Case[]} practiceAreas={practiceAreas as PracticeArea[]} />
        </div>
      </div>
      <Subscribe />
    </article>
  )
}
