import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BlogArchiveBlock as BlogArchiveBlockProps, Post } from '@/payload-types'
import BlogCard from '@/components/Blog/BlogCard'

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
    <div className="blog__two dark__image section-padding py-16">
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
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
