import React from 'react'
import Link from 'next/link'
import type { Post, User } from '@/payload-types'

type BlogCardProps = {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  const date = post.publishedAt ? new Date(post.publishedAt) : new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('default', { month: 'short' })

  const heroImg = post.heroImage || (post as any).featuredImage
  const imageUrl =
    heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
      ? heroImg.url
      : '/assets/img/blog/blog-standard-1.jpg'

  // Extract author info
  const firstAuthor =
    post.authors && Array.isArray(post.authors) && post.authors.length > 0 && typeof post.authors[0] === 'object'
      ? (post.authors[0] as User)
      : null
  const authorName =
    firstAuthor?.name ||
    ((post as any).author && typeof (post as any).author === 'object' && (post as any).author.name) ||
    firstAuthor?.email ||
    'Admin'

  const practiceAreaTitle =
    post.practiceArea && typeof post.practiceArea === 'object' && 'title' in post.practiceArea
      ? post.practiceArea.title
      : null

  const postSlug = post.postType === 'news' ? `/news/${post.slug}` : `/guides/${post.slug}`

  return (
    <div className="blog__two-item page group h-full flex flex-col font-body">
      <div className="blog__two-item-image rounded-t-lg overflow-hidden relative shrink-0">
        <Link href={postSlug}>
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        <div className="blog__two-item-image-date">
          <span className="text-three">{day}</span>
          <span className="text-five">{month}</span>
        </div>
      </div>
      <div className="blog__two-item-content border-t-0 rounded-b-lg border border-gray-200 dark:border-[#2D333B] dark:bg-[#181C22] flex-1 flex flex-col justify-between">
        <div>
          <div className="blog__two-item-content-meta border-b border-gray-200 dark:border-[#2D333B] pb-4 mb-4">
            <ul className="flex items-center text-sm text-brand-slate dark:text-gray-400">
              <li className="mr-4 pr-4 border-r border-gray-200 dark:border-[#2D333B]">
                <span className="flex items-center hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors dark:text-gray-400">
                  <i className="far fa-user text-brand-crimson mr-2"></i>By {authorName}
                </span>
              </li>
              {practiceAreaTitle && (
                <li>
                  <span className="flex items-center text-brand-slate dark:text-gray-400">
                    <i className="far fa-briefcase text-brand-crimson mr-2"></i>
                    {practiceAreaTitle}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <h4 className="font-heading font-bold text-xl mb-4 group-hover:text-brand-crimson transition-colors line-clamp-2 min-h-[56px] text-brand-charcoal dark:text-white">
            <Link href={postSlug} className="text-brand-charcoal dark:text-white group-hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
              {post.title}
            </Link>
          </h4>
        </div>
        {post.excerpt && (
          <p className="text-brand-slate dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-0">
            {post.excerpt}
          </p>
        )}
      </div>
    </div>
  )
}
