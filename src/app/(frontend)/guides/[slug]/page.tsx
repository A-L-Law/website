import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Post } from '@/payload-types'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import RichText from '@/components/RichText'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function GuideDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [guide] } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      postType: { equals: 'guide' },
    },
    limit: 1,
  })

  if (!guide) return notFound()

  const bannerMedia = (pageBanners?.guides?.media || pageBanners?.defaultBanner?.media) as Media
  
  const date = guide.publishedAt ? new Date(guide.publishedAt) : new Date()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  
  const imageUrl = guide.featuredImage && typeof guide.featuredImage === 'object' && guide.featuredImage.url
    ? guide.featuredImage.url
    : '/assets/img/blog/blog-details-1.jpg'

  // Extract author info
  const author = guide.author && typeof guide.author === 'object' ? guide.author : null
  const authorName = author?.name || author?.email || 'Admin'
  const authorRole = 'Legal Author'

  // Categories
  const categoryNames = guide.categories && Array.isArray(guide.categories)
    ? guide.categories.map(c => typeof c === 'object' ? c.title : '').filter(Boolean).join(', ')
    : 'Legal Guide'

  // Tags
  const tags = guide.tags && Array.isArray(guide.tags)
    ? guide.tags.map(t => typeof t === 'object' ? t : null).filter(Boolean)
    : []

  return (
    <article className="guide-detail font-body">
      <MediumImpactHero
        type="mediumImpact"
        title={guide.title}
        innerTitle="Legal Guide"
        breadcrumbs={[
          { label: 'Guides', url: '/guides' },
          { label: guide.title },
        ]}
        media={bannerMedia}
      />

      <div className="blog__details dark__image section-padding py-24">
        <div className="container">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-8 col-lg-8 w-full lg:w-2/3 px-4 lg-mb-50">
              <div className="blog__details-left dark_image">
                <img className="img__full w-full rounded-lg mb-8" src={imageUrl} alt={guide.title} />
                
                <div className="blog__details-left-meta flex flex-wrap items-center justify-between border-b border-gray-200 pb-8 mb-8">
                  <div className="blog__details-left-meta-left">
                    <div className="author flex items-center gap-4">
                      <div className="author-avatar">
                        <div className="w-12 h-12 rounded-full bg-brand-ice flex items-center justify-center text-brand-crimson font-heading font-bold text-xl">
                          {authorName.charAt(0)}
                        </div>
                      </div>
                      <div className="author-info">
                        <span className="text-sm text-brand-slate">{authorRole}</span>
                        <h6 className="font-heading font-bold m-0">{authorName}</h6>
                      </div>
                    </div>                                
                  </div>
                  <div className="blog__details-left-meta-content flex flex-col items-end">
                    <span className="text-sm text-brand-slate">Date:</span>
                    <h6 className="font-heading font-bold m-0">{month} {date.getDate()}, {year}</h6>
                  </div>
                  <div className="blog__details-left-meta-content flex flex-col items-end">
                    <span className="text-sm text-brand-slate">Category:</span>
                    <h6 className="font-heading font-bold m-0">{categoryNames}</h6>
                  </div>
                </div>
                
                <h3 className="mb-6 text-3xl font-heading font-bold text-brand-charcoal">{guide.title}</h3>
                
                {guide.excerpt && (
                  <div className="blog__details-left-box bg-brand-ice border border-gray-200 p-8 flex gap-6 my-8 rounded">
                    <i className="fa-sharp fa-solid fa-quote-left text-5xl text-brand-crimson"></i>
                    <div>
                      <h5 className="font-body text-xl font-medium m-0 text-brand-charcoal italic">{guide.excerpt}</h5>                                
                    </div>
                  </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none font-body text-brand-slate leading-relaxed mb-12">
                  <RichText data={guide.content as any} enableGutter={false} />
                </div>
                
                {tags.length > 0 && (
                  <div className="blog__details-left-tag flex items-center gap-6 py-8 border-t border-gray-200 mb-12">
                    <h6 className="font-heading font-bold text-xl m-0 whitespace-nowrap">Related Tags:</h6>
                    <div className="all__sidebar-item-tag flex-1">
                      <ul className="flex flex-wrap gap-2 m-0 p-0">
                        {tags.map((tag: any) => (
                          <li key={tag.id} className="list-none">
                            <Link 
                              href={`/guides?tag=${tag.slug || tag.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="border border-gray-200 px-4 py-2 rounded font-medium hover:bg-brand-crimson hover:text-white transition-colors"
                            >
                              {tag.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="blog__details-left-author bg-gray-50 border border-gray-200 p-10 flex gap-8 rounded-lg">
                  <div className="blog__details-left-author-image w-24 h-24 shrink-0 rounded-full bg-brand-ice flex items-center justify-center text-brand-crimson font-heading font-bold text-4xl">
                    {authorName.charAt(0)}
                  </div>
                  <div className="blog__details-left-author-content">
                    <h6 className="font-heading font-bold text-xl mb-2">{authorName}</h6>
                    <p className="text-brand-slate mb-4">
                      Specialist legal author contributing insights and guidance for A L Law.
                    </p>
                  </div>
                </div>
                
                {/* Note: Comments section removed per user request */}
                                      
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-4 w-full lg:w-1/3 px-4">
              <BlogSidebar postType="guide" />
            </div>
          </div>
        </div>
      </div>          
    </article>
  )
}
