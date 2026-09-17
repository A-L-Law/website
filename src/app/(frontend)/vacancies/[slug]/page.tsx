import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Vacancy } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { Subscribe } from '@/components/Subscribe'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'vacancies',
    limit: 1000,
  })

  return docs
    .filter((doc) => typeof doc.slug === 'string')
    .map((doc) => ({
      slug: doc.slug as string,
    }))
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'vacancies',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return generateMeta({ doc: docs[0] })
}

export default async function VacancyDetailsPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs } = await payload.find({
    collection: 'vacancies',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const item = docs[0] as Vacancy
  if (!item) return notFound()

  const bannerMedia = (pageBanners?.vacancies?.media || pageBanners?.defaultBanner?.media) as Media

  const date = item.publishedAt ? new Date(item.publishedAt) : new Date()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  const heroImg = item.heroImage
  const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
    ? heroImg.url
    : '/assets/img/blog/blog-details-1.jpg' // Fallback

  const contactSection = item.contactSection

  return (
    <article className="vacancy-details">
      <LivePreviewListener />

      <MediumImpactHero
        type="mediumImpact"
        title={item.title}
        innerTitle="Vacancy Details"
        breadcrumbs={[
          { label: 'Vacancies', url: '/vacancies' },
          { label: item.title },
        ]}
        media={bannerMedia}
      />

      <div className="blog__details dark__image section-padding py-24 font-body">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap justify-center">
            <div className="col-xl-10 col-lg-10 w-full px-4 mb-12 lg:mb-0">
              <div className="blog__details-left dark_image">
                <img className="img__full w-full rounded-lg mb-8 h-[400px] object-cover" src={imageUrl} alt={item.title} />
                
                <div className="blog__details-left-meta flex flex-wrap items-center justify-between border-b border-gray-200 pb-8 mb-8">
                  <div className="blog__details-left-meta-left">
                    <span className="text-sm text-brand-slate block">Role:</span>
                    <h6 className="font-heading font-bold m-0 text-xl">{item.title}</h6>
                  </div>
                  
                  {item.employmentType && (
                    <div className="blog__details-left-meta-content flex flex-col items-end">
                      <span className="text-sm text-brand-slate">Type:</span>
                      <h6 className="font-heading font-bold m-0 text-brand-crimson">{item.employmentType}</h6>
                    </div>
                  )}

                  {item.location && (
                    <div className="blog__details-left-meta-content flex flex-col items-end">
                      <span className="text-sm text-brand-slate">Location:</span>
                      <h6 className="font-heading font-bold m-0">{item.location}</h6>
                    </div>
                  )}

                  <div className="blog__details-left-meta-content flex flex-col items-end">
                    <span className="text-sm text-brand-slate">Posted:</span>
                    <h6 className="font-heading font-bold m-0">{month} {date.getDate()}, {year}</h6>
                  </div>
                </div>
                
                {item.excerpt && (
                  <div className="blog__details-left-box bg-brand-ice dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] p-8 flex gap-6 my-8 rounded">
                    <i className="fa-sharp fa-solid fa-quote-left text-5xl text-brand-crimson"></i>
                    <div>
                      <h5 className="font-body text-xl font-medium m-0 text-brand-charcoal dark:text-gray-200 italic">{item.excerpt}</h5>                                
                    </div>
                  </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none font-body text-brand-slate dark:text-gray-300 leading-relaxed mb-12">
                  {item.content && <RichText data={item.content} enableGutter={false} />}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FormBlock mapping */}
      {(contactSection as any)?.form && typeof (contactSection as any).form === 'object' && (
        <FormBlock 
          title={(contactSection as any).title}
          content={(contactSection as any).content}
          location={(contactSection as any).location}
          form={(contactSection as any).form as any} 
        />
      )}
      <Subscribe />
    </article>
  )
}
