import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Case } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'cases',
    limit: 1000,
  })

  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'cases',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return generateMeta({ doc: docs[0] })
}

export default async function CaseDetailsPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs } = await payload.find({
    collection: 'cases',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const item = docs[0]
  if (!item) return notFound()

  const heroImg = item.heroImage
  const imageUrl = heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
    ? heroImg.url
    : '/assets/img/portfolio/portfolio-details.jpg'

  const bannerMedia = (pageBanners?.cases?.media || pageBanners?.defaultBanner?.media) as Media

  const date = item.publishedAt ? new Date(item.publishedAt) : new Date()
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const practiceAreaTitle = item.practiceArea && typeof item.practiceArea === 'object' && item.practiceArea.title ? item.practiceArea.title : 'General'

  // Extract author info
  const firstAuthor = item.authors && Array.isArray(item.authors) && item.authors.length > 0 && typeof item.authors[0] === 'object' ? item.authors[0] : null
  const authorName = firstAuthor?.name || 'A L Law'

  return (
    <article className="case-details">
      <LivePreviewListener />

      <MediumImpactHero
        type="mediumImpact"
        title={item.title}
        innerTitle="Case Study"
        breadcrumbs={[
          { label: 'Cases', url: '/cases' },
          { label: item.title },
        ]}
        media={bannerMedia}
      />

      <div className="portfolio__details dark__image section-padding py-24 font-body">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="portfolio__details-image dark_image relative mb-12">
                <img src={imageUrl} alt={item.title} className="w-full rounded-lg" />
                <div className="portfolio__details-meta bg-white dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] p-8 rounded shadow-lg mx-8 -mt-20 relative z-10 flex flex-wrap gap-8 justify-between">
                  <div className="portfolio__details-meta-item">
                    <span className="text-brand-crimson font-medium block mb-2 uppercase text-sm tracking-wider">Date :</span>
                    <h6 className="font-heading font-bold text-lg text-brand-charcoal dark:text-white m-0">{formattedDate}</h6>
                  </div>
                  <div className="portfolio__details-meta-item">
                    <span className="text-brand-crimson font-medium block mb-2 uppercase text-sm tracking-wider">Practice Area :</span>
                    <h6 className="font-heading font-bold text-lg text-brand-charcoal dark:text-white m-0">{practiceAreaTitle}</h6>
                  </div>
                  {item.forum && (
                    <div className="portfolio__details-meta-item">
                      <span className="text-brand-crimson font-medium block mb-2 uppercase text-sm tracking-wider">Forum :</span>
                      <h6 className="font-heading font-bold text-lg text-brand-charcoal dark:text-white m-0">{item.forum}</h6>
                    </div>
                  )}
                  {item.value && (
                    <div className="portfolio__details-meta-item">
                      <span className="text-brand-crimson font-medium block mb-2 uppercase text-sm tracking-wider">Value :</span>
                      <h6 className="font-heading font-bold text-lg text-brand-charcoal dark:text-white m-0">{item.value}</h6>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {item.aboutCase && (
            <div className="row mt-40 pt-8">
              <div className="col-lg-4 lg-mb-15">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">About Case</h3>
              </div>
              <div className="col-lg-8">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400">
                  <RichText data={item.aboutCase} />
                </div>
              </div>
            </div>
          )}

          {item.challenges && (
            <div className="row mt-40 pt-8 border-t border-gray-100 dark:border-[#2D333B]">
              <div className="col-lg-4 lg-mb-15">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">The Challenges</h3>
              </div>
              <div className="col-lg-8">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400">
                  <RichText data={item.challenges} />
                </div>
              </div>
            </div>
          )}

          {item.solutions && (
            <div className="row mt-40 pt-8 border-t border-gray-100 dark:border-[#2D333B]">
              <div className="col-lg-4 lg-mb-15">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">The Solutions</h3>
              </div>
              <div className="col-lg-8">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400">
                  <RichText data={item.solutions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
