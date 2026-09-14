import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Post, User } from '@/payload-types'
import BlogSidebar from '@/components/Blog/BlogSidebar'
import RichText from '@/components/RichText'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      postType: { equals: 'news' },
    },
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) return {}

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const { docs: [item] } = await payload.find({
    collection: 'posts',
    draft,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
      postType: { equals: 'news' },
    },
    limit: 1,
  })

  return generateMeta({ doc: item })
}

export default async function NewsDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const { isEnabled: draft } = await draftMode()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [item] } = await payload.find({
    collection: 'posts',
    draft,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
      postType: { equals: 'news' },
    },
    limit: 1,
  })

  if (!item) return notFound()

  const bannerMedia = (pageBanners?.news?.media || pageBanners?.defaultBanner?.media) as Media
  
  const date = item.publishedAt ? new Date(item.publishedAt) : new Date()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  
  const heroImg = item.heroImage as Media | undefined
  const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
    ? heroImg.url
    : '/assets/img/blog/blog-details-1.jpg'

  // Extract author info (support authors array or fallback)
  const firstAuthor = item.authors && Array.isArray(item.authors) && item.authors.length > 0 && typeof item.authors[0] === 'object'
    ? (item.authors[0] as User)
    : null
  const authorName = firstAuthor?.name || firstAuthor?.email || 'Admin'
  const authorRole = 'A L Law Team'

  // Categories / Practice Area
  let categoryNames = 'Firm News'
  if (item.practiceArea && typeof item.practiceArea === 'object') {
    categoryNames = item.practiceArea.title
  }

  // Tags
  const tags = item.tags && Array.isArray(item.tags)
    ? item.tags.map(t => typeof t === 'object' ? t : null).filter(Boolean)
    : []

  return (
    <article className="news-detail font-body">
      {draft && <LivePreviewListener />}

      <MediumImpactHero
        type="mediumImpact"
        title={item.title}
        innerTitle="Firm News"
        breadcrumbs={[
          { label: 'News', url: '/news' },
          { label: item.title },
        ]}
        media={bannerMedia}
      />

      <div className="blog__details dark__image section-padding py-24">
        <div className="container">
          <div className="row flex flex-wrap -mx-4">
            <div className="col-xl-8 col-lg-8 w-full lg:w-2/3 px-4 lg-mb-50">
              <div className="blog__details-left dark_image">
                <img className="img__full w-full rounded-lg mb-8" src={imageUrl} alt={item.title} />
                
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
                
                <h3 className="mb-6 text-3xl font-heading font-bold text-brand-charcoal">{item.title}</h3>
                
                {item.excerpt && (
                  <div className="blog__details-left-box bg-brand-ice border border-gray-200 p-8 flex gap-6 my-8 rounded">
                    <i className="fa-sharp fa-solid fa-quote-left text-5xl text-brand-crimson"></i>
                    <div>
                      <h5 className="font-body text-xl font-medium m-0 text-brand-charcoal italic">{item.excerpt}</h5>                                
                    </div>
                  </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none font-body text-brand-slate leading-relaxed mb-12">
                  <RichText data={item.content as any} enableGutter={false} />
                </div>
                
                {tags.length > 0 && (
                  <div className="blog__details-left-tag flex items-center gap-6 py-8 border-t border-gray-200 mb-12">
                    <h6 className="font-heading font-bold text-xl m-0 whitespace-nowrap">Related Tags:</h6>
                    <div className="all__sidebar-item-tag flex-1">
                      <ul className="flex flex-wrap gap-2 m-0 p-0">
                        {tags.map((tag: any) => (
                          <li key={tag.id} className="list-none">
                            <Link 
                              href={`/news?tag=${tag.slug || tag.title.toLowerCase().replace(/\s+/g, '-')}`}
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
                                      
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-4 w-full lg:w-1/3 px-4">
              <BlogSidebar postType="news" />
            </div>
          </div>
        </div>
      </div>          
    </article>
  )
}
