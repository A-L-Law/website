import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Vacancy } from '@/payload-types'
import VacanciesGrid from './VacanciesGrid.client'
import { Subscribe } from '@/components/Subscribe'

export const revalidate = 60

export default async function VacanciesHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: vacancies } = await payload.find({
    collection: 'vacancies',
    sort: '-publishedAt',
    limit: 100, // Fetch up to 100 for client-side pagination
  })

  const bannerMedia = (pageBanners?.vacancies?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="vacancies-page">
      {/* 1. Medium Impact Hero Banner */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.vacancies?.title || 'Current Vacancies'}
        innerTitle={pageBanners?.vacancies?.innerTitle || 'Careers'}
        media={bannerMedia}
      />

      {/* 2. Grid Layout (similar to Guides but without filters) */}
      <div className="blog__two dark__image section-padding py-24">
        <div className="container mx-auto px-4">
          <VacanciesGrid initialVacancies={vacancies as Vacancy[]} />
        </div>
      </div>
      <Subscribe />
    </article>
  )
}
