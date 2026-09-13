import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BlogArchiveBlock as BlogArchiveBlockProps, Post } from '@/payload-types'

export const BlogArchiveBlock: React.FC<BlogArchiveBlockProps> = async ({
  subtitle,
  title,
  populateBy,
  relationTo,
  selectedPosts,
  limit = 3,
  buttonText,
  buttonLink,
}) => {
  let posts: Post[] = []

  if (populateBy === 'selection' && selectedPosts && Array.isArray(selectedPosts)) {
    posts = selectedPosts.filter((item): item is Post => typeof item === 'object' && item !== null)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const response = await payload.find({
        collection: 'posts',
        limit: limit || 3,
        sort: '-publishedAt',
      })
      posts = response.docs as Post[]
    } catch {
      posts = []
    }
  }

  return (
    <div className="blog__one dark__image section-padding py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="blog__one-title">
            {subtitle && (
              <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold">{title || 'Blog & Articles'}</h2>
          </div>
          {buttonText && (
            <Link
              className="btn-two bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors"
              href={buttonLink || '/guides'}
            >
              {buttonText}
              <i className="far fa-chevron-double-right"></i>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((data) => {
            const mediaUrl =
              data.featuredImage && typeof data.featuredImage === 'object' && 'url' in data.featuredImage && data.featuredImage.url
                ? data.featuredImage.url
                : '/assets/img/blog/blog-1.jpg'

            const pubDate = data.publishedAt ? new Date(data.publishedAt) : new Date()
            const day = pubDate.getDate()
            const month = pubDate.toLocaleString('default', { month: 'short' })
            const authorName =
              data.author && typeof data.author === 'object' && 'name' in data.author
                ? data.author.name
                : 'A L Law Legal Team'

            const postSlug = data.postType === 'news' ? `/news/${data.slug}` : `/guides/${data.slug}`

            return (
              <div className="blog__one-item bg-card rounded-lg overflow-hidden border border-border shadow-sm flex flex-col" key={data.id}>
                <div className="blog__one-item-image relative h-48 w-full overflow-hidden">
                  <Link href={postSlug}>
                    <img src={mediaUrl} alt={data.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="blog__one-item-image-date absolute top-4 left-4 bg-brand-crimson text-white px-3 py-1 rounded text-center text-xs font-bold">
                    <span className="block text-base leading-none">{day}</span>
                    <span>{month}</span>
                  </div>
                </div>
                <div className="blog__one-item-content p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="blog__one-item-content-meta flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <i className="far fa-user"></i>
                        {authorName}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 hover:text-brand-crimson transition-colors line-clamp-2">
                      <Link href={postSlug}>{data.title}</Link>
                    </h4>
                  </div>
                  <Link href={postSlug} className="text-brand-crimson font-medium text-sm inline-flex items-center gap-1 mt-4 hover:underline">
                    Read Details <i className="far fa-chevron-double-right text-xs"></i>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
