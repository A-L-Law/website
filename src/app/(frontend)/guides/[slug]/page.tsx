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
      postType: { equals: 'guide' },
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

  const { docs: [guide] } = await payload.find({
    collection: 'posts',
    draft,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
      postType: { equals: 'guide' },
    },
    limit: 1,
  })

  return generateMeta({ doc: guide })
}

export default async function GuideDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const { isEnabled: draft } = await draftMode()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  const { docs: [guide] } = await payload.find({
    collection: 'posts',
    draft,
    overrideAccess: draft,
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
  
  const heroImg = guide.heroImage as Media | undefined
  const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
    ? heroImg.url
    : '/assets/img/blog/blog-details-1.jpg'

  // Extract author info (support authors array or fallback)
  const firstAuthor = guide.authors && Array.isArray(guide.authors) && guide.authors.length > 0 && typeof guide.authors[0] === 'object'
    ? (guide.authors[0] as User)
    : null
  const authorName = firstAuthor?.name || firstAuthor?.email || 'Admin'
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
      {draft && <LivePreviewListener />}

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
                
                <h3 className="mb-6 text-3xl font-heading font-bold text-brand-charcoal dark:text-white">{guide.title}</h3>
                
                {guide.excerpt && (
                  <div className="blog__details-left-box bg-brand-ice dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] p-8 flex gap-6 my-8 rounded">
                    <i className="fa-sharp fa-solid fa-quote-left text-5xl text-brand-crimson"></i>
                    <div>
                      <h5 className="font-body text-xl font-medium m-0 text-brand-charcoal dark:text-gray-200 italic">{guide.excerpt}</h5>                                
                    </div>
                  </div>
                )}
                
                <div className="prose dark:prose-invert max-w-none font-body text-brand-slate dark:text-gray-300 leading-relaxed mb-12">
                  <RichText data={guide.content as any} enableGutter={false} />
                </div>
                
                {tags.length > 0 && (
                  <div className="blog__details-left-tag flex items-center gap-6 py-8 border-t border-gray-200 dark:border-[#2D333B] mb-12">
                    <h6 className="font-heading font-bold text-xl m-0 whitespace-nowrap text-brand-charcoal dark:text-white">Related Tags:</h6>
                    <div className="all__sidebar-item-tag flex-1">
                      <ul className="flex flex-wrap gap-2 m-0 p-0">
                        {tags.map((tag: any) => (
                          <li key={tag.id} className="list-none">
                            <Link 
                              href={`/guides?tag=${tag.slug || tag.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="border border-gray-200 dark:border-[#2D333B] dark:bg-[#181C22] dark:text-gray-300 px-4 py-2 rounded font-medium hover:bg-brand-crimson hover:text-white dark:hover:bg-brand-crimson dark:hover:text-white transition-colors"
                            >
                              {tag.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="blog__details-left-author bg-gray-50 dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] p-10 flex gap-8 rounded-lg">
                  <div className="blog__details-left-author-image w-24 h-24 shrink-0 rounded-full bg-brand-ice dark:bg-[#2D333B] flex items-center justify-center text-brand-crimson font-heading font-bold text-4xl">
                    {authorName.charAt(0)}
                  </div>
                  <div className="blog__details-left-author-content">
                    <h6 className="font-heading font-bold text-xl mb-2 text-brand-charcoal dark:text-white">{authorName}</h6>
                    <p className="text-brand-slate dark:text-gray-400 mb-4">
                      Specialist legal author contributing insights and guidance for A L Law.
                    </p>
                  </div>
                </div>
                                      
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
