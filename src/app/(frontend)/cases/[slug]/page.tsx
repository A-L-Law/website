import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Case } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'cases',
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

  // Fetch similar cases
  const { docs: similarCases } = await payload.find({
    collection: 'cases',
    where: {
      id: { not_equals: item.id },
    },
    limit: 3,
    sort: '-publishedAt',
  })

  const heroImg = item.heroImage
  const imageUrl = heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
    ? heroImg.url
    : '/assets/img/portfolio/portfolio-details.jpg'

  const bannerMedia = (pageBanners?.cases?.media || pageBanners?.defaultBanner?.media) as Media

  const date = item.publishedAt ? new Date(item.publishedAt) : new Date()
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const practiceAreaTitle = item.practiceArea && typeof item.practiceArea === 'object' && item.practiceArea.title ? item.practiceArea.title : 'General'

  // Extract team member info
  const teamMember = item.teamMember && typeof item.teamMember === 'object' ? item.teamMember : null
  const teamMemberName = teamMember?.name || 'A L Law Team'
  const teamMemberAvatar = teamMember?.avatar && typeof teamMember.avatar === 'object' && 'url' in teamMember.avatar ? teamMember.avatar.url : null

  // Extract case images (max 3)
  const caseImages = Array.isArray(item.caseImages) ? item.caseImages : []

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
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-xl-12">
              <div className="portfolio__details-image dark_image relative mb-12">
                <img src={imageUrl} alt={item.title} className="w-full rounded-lg h-auto" />
                
                {/* Meta Bar */}
                <div className="portfolio__details-meta bg-white dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] p-8 rounded shadow-lg md:mx-8 -mt-16 md:-mt-20 relative z-10 flex flex-wrap items-center gap-8 justify-between">
                  <div className="portfolio__details-meta-item flex items-center gap-4">
                    {teamMemberAvatar && (
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <img src={teamMemberAvatar || ''} alt={teamMemberName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <span className="text-brand-crimson font-medium block mb-1 uppercase text-xs tracking-wider">Team Member :</span>
                      <h6 className="font-heading font-bold text-base text-brand-charcoal dark:text-white m-0">
                        {teamMember?.slug ? (
                          <Link href={`/team/${teamMember.slug}`} className="hover:text-brand-crimson transition-colors">
                            {teamMemberName}
                          </Link>
                        ) : (
                          teamMemberName
                        )}
                      </h6>
                    </div>
                  </div>
                  
                  <div className="portfolio__details-meta-item">
                    <span className="text-brand-crimson font-medium block mb-1 uppercase text-xs tracking-wider">Practice Area :</span>
                    <h6 className="font-heading font-bold text-base text-brand-charcoal dark:text-white m-0">{practiceAreaTitle}</h6>
                  </div>
                  
                  <div className="portfolio__details-meta-item">
                    <span className="text-brand-crimson font-medium block mb-1 uppercase text-xs tracking-wider">Date :</span>
                    <h6 className="font-heading font-bold text-base text-brand-charcoal dark:text-white m-0">{formattedDate}</h6>
                  </div>

                  {item.officialCaseLink && (
                    <div className="portfolio__details-meta-item">
                      <a 
                        href={item.officialCaseLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-two bg-brand-crimson hover:bg-brand-crimson/90 text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors inline-flex items-center gap-2"
                      >
                        Read the Official Case <i className="far fa-external-link-alt"></i>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Case */}
          {item.aboutCase && (
            <div className="row mt-20 flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">About Case</h3>
              </div>
              <div className="w-full lg:w-2/3 px-4">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:mb-8 text-lg">
                  <RichText data={item.aboutCase} />
                </div>
              </div>
            </div>
          )}

          {/* 3 Images Block */}
          {caseImages.length > 0 && (
            <div className="row mt-16 flex flex-wrap -mx-4">
              {caseImages.map((imgObj, idx) => {
                const imgMedia = imgObj.image
                if (!imgMedia || typeof imgMedia !== 'object' || !('url' in imgMedia)) return null
                return (
                  <div key={idx} className="w-full sm:w-1/3 px-4 mb-8 sm:mb-0">
                    <img src={imgMedia.url || ''} alt={imgMedia.alt || 'Case image'} className="w-full h-auto rounded-lg shadow-sm" />
                  </div>
                )
              })}
            </div>
          )}

          {/* The Challenges */}
          {item.challenges && (
            <div className="row mt-20 pt-8 flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">The Challenges</h3>
              </div>
              <div className="w-full lg:w-2/3 px-4">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:mb-8 text-lg">
                  <RichText data={item.challenges} />
                </div>
              </div>
            </div>
          )}

          {/* The Solutions */}
          {item.solutions && (
            <div className="row mt-16 pt-8 flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                <h3 className="font-heading font-bold text-3xl text-brand-charcoal dark:text-white">The Solutions</h3>
              </div>
              <div className="w-full lg:w-2/3 px-4">
                <div className="prose dark:prose-invert max-w-none prose-p:text-brand-slate prose-p:dark:text-gray-400 prose-p:mb-8 text-lg">
                  <RichText data={item.solutions} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Cases - Blog Archive Style */}
      {similarCases.length > 0 && (
        <div className="blog__two dark__image section-padding py-24 bg-gray-50 dark:bg-brand-charcoal/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div className="blog__one-title">
                <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                  More Cases
                </span>
                <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Similar Case Studies</h2>
              </div>
              <Link
                className="btn-two bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors"
                href="/cases"
              >
                See All Cases
                <i className="far fa-chevron-double-right"></i>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarCases.map((rc) => {
                const rcHeroImg = rc.heroImage && typeof rc.heroImage === 'object' && 'url' in rc.heroImage ? rc.heroImage.url : '/assets/img/portfolio/portfolio-1.jpg'
                const rcDate = rc.publishedAt ? new Date(rc.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
                
                return (
                  <div className="blog__two-item bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full" key={rc.id}>
                    <div className="blog__two-item-image relative h-56 w-full overflow-hidden">
                      <Link href={`/cases/${rc.slug}`}>
                        <img src={rcHeroImg || ''} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </Link>
                      <div className="blog__two-item-image-date absolute top-4 left-4 bg-brand-crimson text-white px-3 py-1 rounded text-sm font-semibold">
                        {rcDate}
                      </div>
                    </div>
                    <div className="blog__two-item-content p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {rc.practiceArea && typeof rc.practiceArea === 'object' && (
                          <div className="text-brand-crimson text-xs font-semibold uppercase tracking-wider mb-2">
                            {rc.practiceArea.title}
                          </div>
                        )}
                        <h4 className="text-xl font-bold mb-3 group-hover:text-brand-crimson transition-colors line-clamp-2">
                          <Link href={`/cases/${rc.slug}`}>{rc.title}</Link>
                        </h4>
                        {rc.excerpt && (
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{rc.excerpt}</p>
                        )}
                      </div>
                      <Link className="text-brand-charcoal dark:text-white font-semibold text-sm inline-flex items-center gap-2 hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors" href={`/cases/${rc.slug}`}>
                        Read More <i className="far fa-chevron-double-right text-xs"></i>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
