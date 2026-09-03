import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

export default async function NewsHubPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: newsItems } = await payload.find({
    collection: 'news',
    sort: '-publishedAt',
    limit: 100,
  })

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          Firm News & Press Releases
        </h1>
        <p className="font-body text-lg text-brand-slate max-w-2xl mx-auto">
          Latest announcements, firm developments, and media commentary from A L Law.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group p-6 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3">
                {item.title}
              </h2>
              <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6">
                {item.excerpt}
              </p>
            </div>
            <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2">
              Read Article &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
