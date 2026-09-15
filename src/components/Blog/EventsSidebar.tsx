import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Event } from '@/payload-types'

export default async function EventsSidebar() {
  const payload = await getPayload({ config: configPromise })

  const recentEvents = await payload.find({
    collection: 'events',
    sort: '-eventDate',
    limit: 5,
  })

  return (
    <div className="all__sidebar font-body">
      <div className="all__sidebar-item bg-white dark:bg-[#181C22] border border-gray-200 dark:border-[#2D333B] rounded-lg shadow-sm mb-8 p-6 lg:p-8">
        <h4 className="font-heading font-bold text-xl mb-6 text-brand-charcoal dark:text-white border-b border-gray-100 dark:border-[#2D333B] pb-3">
          Upcoming Events
        </h4>
        <div className="all__sidebar-item-post">
          {recentEvents.docs.map((data: Event) => {
            const date = data.eventDate ? new Date(data.eventDate) : (data.publishedAt ? new Date(data.publishedAt) : new Date())
            const formattedDate = date.toLocaleDateString('en-GB', { 
              day: 'numeric', month: 'short', year: 'numeric' 
            })
            const heroImg = data.heroImage
            const imageUrl = heroImg && typeof heroImg === 'object' && heroImg.url
              ? heroImg.url
              : '/assets/img/blog/blog-standard-1.jpg' // Fallback
              
            return (
              <div className="post__item group flex items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-[#2D333B] last:mb-0 last:pb-0 last:border-0" key={data.id}>
                <div className="post__item-image shrink-0 w-20 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Link href={`/events/${data.slug}`} className="block w-full h-full">
                    <img src={imageUrl} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                </div>
                <div className="post__item-title flex-1 min-w-0">
                  <h6 className="font-heading font-bold text-base mb-1.5 leading-snug line-clamp-2">
                    <Link href={`/events/${data.slug}`} className="text-brand-charcoal dark:text-white hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors line-clamp-2" title={data.title}>
                      {data.title}
                    </Link>
                  </h6>
                  <span className="text-xs text-brand-slate dark:text-gray-400 flex items-center">
                    <i className="far fa-calendar-alt text-brand-crimson mr-1.5"></i>
                    {formattedDate}
                  </span>
                </div>
              </div>
            )
          })}
          {recentEvents.docs.length === 0 && (
            <div className="text-sm text-brand-slate dark:text-gray-400">No upcoming events found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
