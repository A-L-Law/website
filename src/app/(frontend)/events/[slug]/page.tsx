import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Event } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import EventsSidebar from '@/components/Blog/EventsSidebar'
import ContactSection from '@/components/ContactSection/ContactSection'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'events',
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
    collection: 'events',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return generateMeta({ doc: docs[0] })
}

export default async function EventDetailsPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs } = await payload.find({
    collection: 'events',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const item = docs[0] as Event
  if (!item) return notFound()

  const bannerMedia = (pageBanners?.events?.media || pageBanners?.defaultBanner?.media) as Media

  const date = item.eventDate ? new Date(item.eventDate) : (item.publishedAt ? new Date(item.publishedAt) : new Date())
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  const heroImg = item.heroImage
  const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
    ? heroImg.url
    : '/assets/img/blog/blog-standard-1.jpg' // Fallback

  const contactSection = item.contactSection

  return (
    <article className="event-details">
      <LivePreviewListener />

      <MediumImpactHero
        type="mediumImpact"
        title={item.title}
        innerTitle="Event Details"
        breadcrumbs={[
          { label: 'Events', url: '/events' },
          { label: item.title },
        ]}
        media={bannerMedia}
      />

      <div className="blog__details section-padding py-24 font-body">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-8 col-lg-8 w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
              <div className="blog__details-left">
                <div className="blog__details-left-image rounded-t-lg overflow-hidden">
                  <img src={imageUrl} alt={item.title} className="w-full h-auto object-cover" />
                </div>
                <div className="blog__details-left-content bg-white dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] border-t-0 rounded-b-lg shadow-sm p-8 md:p-12">
                  <div className="blog__details-left-content-meta mb-6 border-b border-gray-100 dark:border-[#2D333B] pb-6">
                    <ul className="flex flex-wrap gap-6 m-0 p-0 list-none">
                      <li>
                        <span className="flex items-center text-brand-slate dark:text-gray-400">
                          <i className="fal fa-calendar-alt mr-2 text-brand-crimson"></i>
                          {date.getDate()}, {month} {year}
                        </span>
                      </li>
                      {item.location && (
                        <li>
                          <span className="flex items-center text-brand-slate dark:text-gray-400">
                            <i className="fal fa-map-marker-alt mr-2 text-brand-crimson"></i>
                            {item.location}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <h3 className="mb-8 text-3xl md:text-4xl font-heading font-bold text-brand-charcoal dark:text-white">
                    {item.title}
                  </h3>
                  
                  {item.excerpt && (
                    <div className="text-xl text-brand-slate dark:text-gray-300 font-medium leading-relaxed mb-8 italic border-l-4 border-brand-crimson pl-6">
                      {item.excerpt}
                    </div>
                  )}

                  <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:mb-6 prose-p:leading-relaxed prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-charcoal prose-headings:dark:text-white prose-a:text-brand-crimson hover:prose-a:text-brand-crimson/80 prose-img:rounded-lg">
                    {item.content && <RichText data={item.content} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 w-full lg:w-1/3 px-4">
              <EventsSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section mapping */}
      <ContactSection 
        description={contactSection?.contactDescription} 
        mapEmbedUrl={contactSection?.mapEmbed} 
        formId={typeof contactSection?.contactForm === 'object' && contactSection.contactForm !== null ? contactSection.contactForm.id : (contactSection?.contactForm as number | null | undefined)} 
      />
    </article>
  )
}
