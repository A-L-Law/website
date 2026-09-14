import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as LucideIcons from 'lucide-react'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import RichText from '@/components/RichText'
import type { Media, PracticeArea } from '@/payload-types'
import { ServiceFaqAccordion } from './ServiceFaqAccordion'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

type ExtendedPracticeArea = PracticeArea & {
  highlights?: Array<{ text: string; id?: string | null }> | null
  capabilitiesTitle?: string | null
  capabilitiesDescription?: string | null
  capabilities?: Array<{ item: string; id?: string | null }> | null
  faqs?: Array<{ question: string; answer: any; id?: string | null }> | null
}

export default async function PracticeAreaDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  // 1. Fetch current practice area
  const {
    docs: [rawArea],
  } = await payload.find({
    collection: 'practice-areas',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!rawArea) return notFound()
  const area = rawArea as ExtendedPracticeArea

  // 2. Fetch all practice areas for the sidebar "Our Solutions" navigation list
  const { docs: allPracticeAreas } = await payload.find({
    collection: 'practice-areas',
    sort: 'title',
    limit: 20,
  })

  // 3. Fetch related cases for this practice area
  const { docs: relatedCases } = await payload.find({
    collection: 'cases',
    where: {
      practiceArea: {
        equals: area.id,
      },
    },
    limit: 3,
  })

  const bannerMedia = ((area.heroImage as Media) ||
    pageBanners?.practiceAreas?.media ||
    pageBanners?.defaultBanner?.media) as Media

  let mainImageUrl = '/assets/img/pages/services-details.jpg'
  if (
    area.heroImage &&
    typeof area.heroImage === 'object' &&
    'url' in area.heroImage &&
    area.heroImage.url
  ) {
    mainImageUrl = (area.heroImage as Media).url!
  }

  // Editable Highlights (Ticks) with fallback
  const highlights: string[] =
    area.highlights && area.highlights.length > 0
      ? (area.highlights.map((h) => h?.text).filter(Boolean) as string[])
      : [
          'Strategic legal counsel tailored to client commercial objectives and private interests.',
          'Direct partner-led representation with extensive transaction, courtroom, and dispute experience.',
          'Transparent fee structuring, proactive case updates, and rigorous compliance at every stage.',
        ]

  // Editable Capabilities & Scope with fallback
  const capabilitiesTitle = area.capabilitiesTitle || 'Strategic Capabilities & Scope'
  const capabilitiesDescription =
    area.capabilitiesDescription !== undefined && area.capabilitiesDescription !== null
      ? area.capabilitiesDescription
      : "Our solicitors combine technical excellence with acute commercial acumen. Whether advising corporate entities on complex regulatory landscapes or resolving contentious disputes, we safeguard our clients' interests with focused precision."

  // Editable Capabilities Checklist (Ticks) with fallback
  const capabilitiesList: string[] =
    area.capabilities && area.capabilities.length > 0
      ? (area.capabilities.map((c) => c?.item).filter(Boolean) as string[])
      : [
          'Transaction & Contract Structuring',
          'Regulatory & Statutory Compliance',
          'Comprehensive Risk Advisory',
          'Cross-Border Legal Advisory',
          'Dispute Resolution & Arbitration',
          'Asset Protection & Governance',
        ]

  // Editable FAQs with richText answer support
  const faqItems =
    area.faqs && area.faqs.length > 0
      ? area.faqs
          .filter((f) => f?.question)
          .map((f) => ({
            question: f.question,
            answer:
              f.answer && typeof f.answer === 'object' ? (
                <RichText
                  data={f.answer}
                  enableGutter={false}
                  className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed"
                />
              ) : (
                <p>{String(f.answer || '')}</p>
              ),
          }))
      : undefined

  return (
    <article className="practice-area-detail font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={area.title}
        innerTitle={area.title}
        breadcrumbs={[
          { label: 'Practice Areas', url: '/practice-areas' },
          { label: area.title },
        ]}
        media={bannerMedia}
      />

      {/* 2. Services Details Content & Sidebar matching services-single.jsx */}
      <div className="services__details section-padding py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
            {/* Sidebar Column (Left on Desktop, Bottom on Mobile) */}
            <aside className="lg:col-span-4 order-last lg:order-first">
              <div className="all__sidebar sticky top-32 space-y-8">
                {/* Sidebar Item 1: Our Solutions / Practice Areas List */}
                <div className="all__sidebar-item p-8 bg-gray-50 dark:bg-brand-charcoal border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                  <h4 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Our Solutions
                  </h4>
                  <div className="all__sidebar-item-solution">
                    <ul className="space-y-2">
                      {allPracticeAreas.map((item: PracticeArea, idx: number) => {
                        const isActive = item.slug === area.slug
                        const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`

                        return (
                          <li key={item.id}>
                            <Link
                              href={`/practice-areas/${item.slug}`}
                              className={`group flex items-center justify-between py-3.5 px-4 rounded-lg text-sm md:text-[15px] font-bold transition-all ${
                                isActive
                                  ? 'bg-brand-crimson text-white shadow-md'
                                  : 'text-brand-charcoal dark:text-gray-200 hover:bg-brand-crimson hover:text-white border-b border-gray-100 dark:border-gray-800/80 last:border-b-0'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <LucideIcons.ChevronsRight
                                  className={`w-4 h-4 shrink-0 transition-transform ${
                                    isActive
                                      ? 'text-white'
                                      : 'text-brand-crimson group-hover:text-white group-hover:translate-x-1'
                                  }`}
                                />
                                <span>{item.title}</span>
                              </div>
                              <span
                                className={`text-xs font-semibold ${
                                  isActive
                                    ? 'text-white/80'
                                    : 'text-brand-slate dark:text-gray-400 group-hover:text-white/80'
                                }`}
                              >
                                ({numStr})
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                {/* Sidebar Item 2: Company Profile / Document Downloads */}
                <div className="all__sidebar-item p-8 bg-gray-50 dark:bg-brand-charcoal border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                  <h4 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Company Profile
                  </h4>
                  <div className="all__sidebar-item-download space-y-3">
                    <a
                      href="#"
                      className="group flex items-center justify-between p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700/80 rounded-lg hover:border-brand-crimson transition-all text-brand-charcoal dark:text-gray-200 font-semibold text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <LucideIcons.FileText className="w-5 h-5 text-brand-crimson shrink-0" />
                        <span>Practice Overview File</span>
                      </div>
                      <span className="w-8 h-8 rounded bg-brand-crimson text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <LucideIcons.Download className="w-4 h-4" />
                      </span>
                    </a>

                    <a
                      href="#"
                      className="group flex items-center justify-between p-4 bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700/80 rounded-lg hover:border-brand-crimson transition-all text-brand-charcoal dark:text-gray-200 font-semibold text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <LucideIcons.FileCode className="w-5 h-5 text-brand-crimson shrink-0" />
                        <span>Download Practice PDF</span>
                      </div>
                      <span className="w-8 h-8 rounded bg-brand-crimson text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <LucideIcons.Download className="w-4 h-4" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* Sidebar Item 3: Need Help Box matching template all__sidebar-help */}
                <div className="all__sidebar-help relative rounded-xl overflow-hidden shadow-md">
                  <div className="all__sidebar-help-image relative">
                    <img
                      className="w-full h-72 object-cover"
                      src="/assets/img/pages/help.jpg"
                      alt="A L Law Client Support"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="all__sidebar-help-image-content -mt-32 relative z-10 mx-5 mb-5 bg-white dark:bg-brand-charcoal p-6 text-center rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-crimson/10 text-brand-crimson flex items-center justify-center">
                        <LucideIcons.PhoneCall className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="font-heading text-lg font-bold text-brand-charcoal dark:text-brand-white mb-4 leading-snug">
                        We&apos;re Always Ready To Help You
                      </h4>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-brand-crimson hover:bg-black text-white font-heading text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-md transition-all shadow-md w-full cursor-pointer"
                      >
                        <span>Need Help</span>
                        <LucideIcons.ChevronsRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Details Content Column */}
            <main className="lg:col-span-8">
              <div className="services__details-left">
                {/* 1. Large Top Hero Feature Image */}
                <div className="services__details-left-image rounded-2xl overflow-hidden shadow-md mb-8">
                  <img
                    src={mainImageUrl}
                    alt={area.title}
                    className="w-full h-[360px] sm:h-[420px] md:h-[480px] object-cover"
                  />
                </div>

                {/* 2. Main Title and Text Content */}
                <div className="services__details-left-content">
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-charcoal dark:text-brand-white mb-6">
                    {area.title}
                  </h2>

                  {/* Summary Lead Paragraph */}
                  <p className="font-body text-base sm:text-lg text-brand-slate dark:text-gray-300 leading-relaxed mb-6 font-medium">
                    {area.summary}
                  </p>

                  {/* Rich Text Body if configured */}
                  {area.description && (
                    <div className="mb-8">
                      {typeof area.description === 'object' ? (
                        <RichText
                          data={area.description as any}
                          enableGutter={false}
                          className="prose dark:prose-invert max-w-none font-body text-base leading-relaxed"
                        />
                      ) : (
                        <p className="font-body text-base text-brand-slate dark:text-gray-300 leading-relaxed">
                          {String(area.description)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Key Highlights Checklist (Editable Ticks) */}
                  {highlights.length > 0 && (
                    <div className="services__details-left-content-list border-b border-gray-200 dark:border-gray-800 pb-8 mb-10 space-y-4">
                      {highlights.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-brand-crimson/10 text-brand-crimson flex items-center justify-center shrink-0 mt-0.5">
                            <LucideIcons.Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="font-body text-sm sm:text-base text-brand-charcoal dark:text-gray-200 font-semibold">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Strategic Capabilities & Scope (Editable) */}
                  <div className="mb-10">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
                      {capabilitiesTitle}
                    </h3>
                    {capabilitiesDescription && (
                      <p className="font-body text-sm sm:text-base text-brand-slate dark:text-gray-300 leading-relaxed mb-6">
                        {capabilitiesDescription}
                      </p>
                    )}

                    {/* Capabilities Checklist Grid (Editable Ticks) */}
                    {capabilitiesList.length > 0 && (
                      <div className="services__details-left-content-list bold grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {capabilitiesList.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <LucideIcons.Check className="w-4 h-4 text-brand-crimson shrink-0 stroke-[3]" />
                            <span className="font-heading text-sm sm:text-base font-bold text-brand-charcoal dark:text-brand-white">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Related Representative Cases (if any) */}
                  {relatedCases && relatedCases.length > 0 && (
                    <div className="mb-12 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-6">
                        Representative Matters in {area.title}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedCases.map((rc) => (
                          <Link
                            key={rc.id}
                            href={`/cases/${rc.slug}`}
                            className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-crimson transition-all bg-gray-50 dark:bg-black/30 block"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {rc.value && (
                                <span className="font-heading text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-crimson text-white">
                                  {rc.value}
                                </span>
                              )}
                              {rc.forum && (
                                <span className="text-xs text-brand-slate">{rc.forum}</span>
                              )}
                            </div>
                            <h4 className="font-heading text-base font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson transition-colors mb-2">
                              {rc.title}
                            </h4>
                            <p className="font-body text-xs text-brand-slate line-clamp-2">
                              {rc.excerpt}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Frequently Asked Questions Section (Editable with rich text answers) */}
                  <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
                      Frequently Asked Questions
                    </h3>
                    <p className="font-body text-sm text-brand-slate mb-4">
                      Common inquiries regarding our instruction, engagement terms, and procedural milestones.
                    </p>
                    <ServiceFaqAccordion items={faqItems} />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </article>
  )
}
