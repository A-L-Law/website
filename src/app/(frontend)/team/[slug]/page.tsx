import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function SolicitorProfilePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })

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

  return (
    <div className="container py-12">
      {/* Profile Header */}
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-28 h-28 rounded-full bg-brand-crimson text-brand-white flex items-center justify-center font-heading text-4xl font-bold shrink-0">
          {solicitor.name ? solicitor.name.charAt(0) : 'S'}
        </div>
        <div>
          <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
            {solicitor.name}
          </h1>
          <p className="font-body text-brand-slate dark:text-brand-blush text-lg">
            Solicitor & Legal Specialist — A L Law London
          </p>
        </div>
      </div>

      {/* Authored Guides Section */}
      {authoredGuides.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
            Authored Legal Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authoredGuides.map((guide) => (
              <div key={guide.id} className="p-6 rounded-xl border border-brand-ice dark:border-brand-slate bg-brand-white dark:bg-brand-charcoal">
                <h3 className="font-heading text-lg font-bold text-brand-charcoal dark:text-brand-white mb-2">
                  {guide.title}
                </h3>
                <p className="font-body text-sm text-brand-slate line-clamp-2">{guide.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cases Handled Section */}
      {leadCases.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
            Notable Cases & Representative Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadCases.map((c) => (
              <div key={c.id} className="p-6 rounded-xl border border-brand-ice dark:border-brand-slate bg-brand-white dark:bg-brand-charcoal">
                <h3 className="font-heading text-lg font-bold text-brand-crimson mb-2">
                  {c.title}
                </h3>
                <p className="font-body text-sm text-brand-slate mb-3">{c.caseSummary}</p>
                {c.value && <span className="font-heading text-xs font-semibold px-3 py-1 rounded-full bg-brand-ice text-brand-charcoal">{c.value}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Client Reviews Section */}
      {clientReviews.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
            Client Testimonials & ReviewSolicitors Ratings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientReviews.map((review) => (
              <div key={review.id} className="p-6 rounded-xl bg-brand-ice dark:bg-brand-charcoal border border-brand-coral/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading font-bold text-brand-charcoal dark:text-brand-white">{review.reviewerName}</span>
                  <span className="text-brand-crimson font-bold">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="font-body text-sm text-brand-slate italic">"{review.reviewText}"</p>
                <div className="mt-3 text-xs text-brand-slate font-semibold">{review.source}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
