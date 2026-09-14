'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import type { Post } from '@/payload-types'

type Props = {
  initialNews: Post[]
}

export default function NewsList({ initialNews }: Props) {
  const blogItemShow = 3
  const [currentPage, setCurrentPage] = useState(0)
  
  // Basic client-side pagination
  const totalPages = Math.ceil(initialNews.length / blogItemShow)
  const startIndex = currentPage * blogItemShow
  const endIndex = startIndex + blogItemShow
  const currentNews = initialNews.slice(startIndex, endIndex)

  return (
    <div className="blog__standard-left font-body">
      {currentNews.map((news) => {
        const date = news.publishedAt ? new Date(news.publishedAt) : new Date()
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        
        const imageUrl = news.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url
          ? news.featuredImage.url
          : '/assets/img/blog/blog-standard-1.jpg' // Fallback

        // Find author name if populated
        const authorName = news.author && typeof news.author === 'object' 
          ? news.author.name || news.author.email || 'Admin' 
          : 'Admin'

        return (
          <div className="news__standard-left-item mb-50 group" key={news.id}>
            <div className="news__standard-left-item-image">
              <Link href={`/news/${news.slug}`}>
                <img src={imageUrl} alt={news.title} className="w-full" />
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
                <Link href={`/news/${news.slug}`}>{news.title}</Link>
              </h3>
              
              <p className="text-brand-slate mb-8 leading-relaxed">
                {news.excerpt || 'Read the latest updates and announcements from A L Law.'}
              </p>
              
              <Link 
                className="btn-one" 
                href={`/news/${news.slug}`}
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
