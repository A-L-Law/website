'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import type { Event } from '@/payload-types'

type Props = {
  initialEvents: Event[]
}

export default function EventsList({ initialEvents }: Props) {
  const blogItemShow = 3
  const [currentPage, setCurrentPage] = useState(0)
  
  // Basic client-side pagination
  const totalPages = Math.ceil(initialEvents.length / blogItemShow)
  const startIndex = currentPage * blogItemShow
  const endIndex = startIndex + blogItemShow
  const currentEvents = initialEvents.slice(startIndex, endIndex)

  return (
    <div className="blog__standard-left font-body">
      {currentEvents.map((event) => {
        const date = event.eventDate ? new Date(event.eventDate) : (event.publishedAt ? new Date(event.publishedAt) : new Date())
        const month = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        
        const heroImg = event.heroImage
        const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
          ? heroImg.url
          : '/assets/img/blog/blog-standard-1.jpg' // Fallback

        return (
          <div className="news__standard-left-item mb-50 group" key={event.id}>
            <div className="news__standard-left-item-image rounded-t-lg overflow-hidden">
              <Link href={`/events/${event.slug}`}>
                <img src={imageUrl} alt={event.title} className="w-full object-cover" />
              </Link>
            </div>
            <div className="news__standard-left-item-content bg-white dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] border-t-0 rounded-b-lg shadow-sm">
              <div className="news__standard-left-item-content-meta">
                <ul>
                  <li>
                    <span className="flex items-center text-brand-slate dark:text-gray-400 hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
                      <i className="fal fa-calendar-alt mr-2 text-brand-crimson"></i>
                      {date.getDate()}, {month} {year}
                    </span>
                  </li>
                  {event.location && (
                    <li>
                      <span className="flex items-center text-brand-slate dark:text-gray-400 hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
                        <i className="fal fa-map-marker-alt mr-2 text-brand-crimson"></i>
                        {event.location}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              
              <h3 className="mb-10 text-3xl font-heading font-bold text-brand-charcoal dark:text-white group-hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
                <Link href={`/events/${event.slug}`}>{event.title}</Link>
              </h3>
              
              <p className="text-brand-slate dark:text-gray-400 mb-8 leading-relaxed">
                {event.excerpt || 'Read the latest details about this upcoming event.'}
              </p>
              
              <Link 
                className="btn-one" 
                href={`/events/${event.slug}`}
              >
                Event Details
              </Link>
            </div>
          </div>
        )
      })}
      
      {initialEvents.length > 0 ? (
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className="text-center py-12 text-brand-slate dark:text-gray-400">
          No upcoming events found.
        </div>
      )}
    </div>
  )
}
