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

export default async function VacancyDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })
  const { docs: [vacancy] } = await payload.find({
    collection: 'vacancies',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!vacancy) return notFound()

  return (
    <article className="container py-12">
      {/* Vacancy Hero Header */}
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-crimson text-brand-white">
            {vacancy.employmentType || 'Full-Time'}
          </span>
          <span className="font-body text-xs text-brand-slate dark:text-brand-blush">
            {vacancy.location || 'London, UK'}
          </span>
        </div>
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          {vacancy.title}
        </h1>
      </div>

      {/* Role Description & Application Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Role Details */}
        <div className="lg:col-span-2 prose dark:prose-invert font-body">
          {vacancy.description ? JSON.stringify(vacancy.description) : 'Role details available upon application.'}
        </div>

        {/* Right Column: Embedded Application Form */}
        <div className="p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate shadow-sm h-fit">
          <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
            Apply for this Role
          </h3>
          <p className="font-body text-sm text-brand-slate mb-6">
            Submit your application directly to A L Law recruitment team.
          </p>

          <form className="flex flex-col gap-4">
            {/* Auto-prefilled & Visually Hidden Job Role Input */}
            <input type="hidden" name="jobRole" value={vacancy.title} />

            <div>
              <label className="block font-heading text-sm font-semibold text-brand-charcoal dark:text-brand-white mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full p-3 rounded-lg border border-brand-slate/30 bg-transparent text-brand-charcoal dark:text-brand-white font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-heading text-sm font-semibold text-brand-charcoal dark:text-brand-white mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full p-3 rounded-lg border border-brand-slate/30 bg-transparent text-brand-charcoal dark:text-brand-white font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-heading text-sm font-semibold text-brand-charcoal dark:text-brand-white mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+44 20 1234 5678"
                className="w-full p-3 rounded-lg border border-brand-slate/30 bg-transparent text-brand-charcoal dark:text-brand-white font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-heading text-sm font-semibold text-brand-charcoal dark:text-brand-white mb-1">
                Upload CV (.pdf, .doc, .docx) *
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="w-full p-2 text-sm text-brand-slate font-body"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 p-4 rounded-lg bg-brand-crimson text-brand-white font-heading font-bold text-center hover:bg-brand-burgundy transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </article>
  )
}
