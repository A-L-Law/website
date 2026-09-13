'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import type { Post, Media } from '@/payload-types'

type Props = {
  initialGuides: Post[]
}

export default function GuidesList({ initialGuides }: Props) {
  const blogItemShow = 3
  const [currentPage, setCurrentPage] = useState(0)
  
  // Basic client-side pagination
  const totalPages = Math.ceil(initialGuides.length / blogItemShow)
  const startIndex = currentPage * blogItemShow
  const endIndex = startIndex + blogItemShow
  const currentGuides = initialGuides.slice(startIndex, endIndex)

  return (
    <div className="blog__standard-left font-body">
      {currentGuides.map((guide) => {
        const date = guide.publishedAt ? new Date(guide.publishedAt) : new Date()
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        
        const imageUrl = guide.featuredImage && typeof guide.featuredImage === 'object' && guide.featuredImage.url
          ? guide.featuredImage.url
          : '/assets/img/blog/blog-standard-1.jpg' // Fallback

        // Find author name if populated
        const authorName = guide.author && typeof guide.author === 'object' 
          ? guide.author.name || guide.author.email || 'Admin' 
          : 'Admin'

        return (
          <div className="news__standard-left-item mb-50 group" key={guide.id}>
            <div className="news__standard-left-item-image">
              <Link href={`/guides/${guide.slug}`}>
                <img src={imageUrl} alt={guide.title} className="w-full" />
              </Link>
            </div>
            <div className="news__standard-left-item-content">
              <div className="news__standard-left-item-content-meta">
                <ul>
                  <li>
                    <span className="flex items-center text-brand-slate hover:text-brand-crimson transition-colors">
                      <i className="fal fa-user mr-2 text-brand-crimson"></i>
                      {authorName}
                    </span>
                  </li>
                  <li>
                    <span className="flex items-center text-brand-slate hover:text-brand-crimson transition-colors">
                      <i className="fal fa-calendar-alt mr-2 text-brand-crimson"></i>
                      {date.getDate()}, {month} {year}
                    </span>
                  </li>
                </ul>
              </div>
              
              <h3 className="mb-10 text-3xl font-heading font-bold text-brand-charcoal group-hover:text-brand-crimson transition-colors">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h3>
              
              <p className="text-brand-slate mb-8 leading-relaxed">
                {guide.excerpt || 'Read this comprehensive guide to understand the key legal considerations.'}
              </p>
              
              <Link 
                className="btn-one" 
                href={`/guides/${guide.slug}`}
              >
                Read Details
              </Link>
            </div>
          </div>
        )
      })}
      
      <BlogPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
