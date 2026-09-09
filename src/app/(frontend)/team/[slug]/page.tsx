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

export default async function SolicitorProfilePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // Find user / solicitor
  const { docs: [solicitor] } = await payload.find({
    collection: 'users',
    where: {
      id: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!solicitor) return notFound()

  // Fetch authored guides
  const { docs: authoredGuides } = await payload.find({
    collection: 'guides',
    where: {
      author: {
        equals: solicitor.id,
      },
    },
    limit: 10,
  })

  // Fetch cases handled
  const { docs: leadCases } = await payload.find({
    collection: 'cases',
    where: {
      leadSolicitor: {
        equals: solicitor.id,
      },
    },
    limit: 10,
  })

  // Fetch client reviews
  const { docs: clientReviews } = await payload.find({
    collection: 'testimonials',
    where: {
      teamMember: {
        equals: solicitor.id,
      },
    },
    limit: 10,
  })

  const bannerMedia = (pageBanners?.team?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="team-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={solicitor.name || 'Solicitor Profile'}
        innerTitle={solicitor.name || 'Team Member'}
        breadcrumbs={[
          { label: 'Team', url: '/team' },
          { label: solicitor.name || 'Profile' },
        ]}
        media={bannerMedia}
      />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Profile Header */}
        <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-brand-crimson text-brand-white flex items-center justify-center font-heading text-4xl font-bold shrink-0">
            {solicitor.name ? solicitor.name.charAt(0) : 'S'}
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
              {solicitor.name}
            </h2>
            <p className="font-body text-brand-slate dark:text-brand-blush text-lg">
              Solicitor & Legal Specialist — A L Law London
            </p>
            {solicitor.email && (
              <p className="font-body text-brand-crimson text-sm mt-2">
                <a href={`mailto:${solicitor.email}`} className="hover:underline">
                  {solicitor.email}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Authored Guides Section */}
        {authoredGuides.length > 0 && (
          <section className="mb-12">
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
              Authored Legal Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {authoredGuides.map((guide) => (
                <div key={guide.id} className="p-6 rounded-xl border border-brand-ice dark:border-brand-slate bg-brand-white dark:bg-brand-charcoal">
                  <h4 className="font-heading text-lg font-bold text-brand-charcoal dark:text-brand-white mb-2">
                    {guide.title}
                  </h4>
                  <p className="font-body text-sm text-brand-slate line-clamp-2">{guide.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cases Handled Section */}
        {leadCases.length > 0 && (
          <section className="mb-12">
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
              Notable Cases & Representative Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadCases.map((c) => (
                <div key={c.id} className="p-6 rounded-xl border border-brand-ice dark:border-brand-slate bg-brand-white dark:bg-brand-charcoal">
                  <h4 className="font-heading text-lg font-bold text-brand-charcoal dark:text-brand-white mb-2">
                    {c.title}
                  </h4>
                  <p className="font-body text-sm text-brand-slate line-clamp-2">{c.caseSummary}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Reviews Section */}
        {clientReviews.length > 0 && (
          <section className="mb-12">
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
              Client Testimonials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientReviews.map((review) => (
                <div key={review.id} className="p-6 rounded-xl border border-brand-ice dark:border-brand-slate bg-brand-white dark:bg-brand-charcoal">
                  <p className="font-body text-sm text-brand-slate italic mb-4">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>
                  <p className="font-heading text-xs font-bold text-brand-charcoal dark:text-brand-white">
                    {review.reviewerName} {review.source ? `— ${review.source}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
