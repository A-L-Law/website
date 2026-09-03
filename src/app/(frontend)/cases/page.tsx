import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

export default async function CasesHubPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: cases } = await payload.find({
    collection: 'cases',
    sort: '-createdAt',
    limit: 100,
  })

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          Cases & Representative Matters
        </h1>
        <p className="font-body text-lg text-brand-slate max-w-2xl mx-auto">
          High-value transaction and dispute outcomes handled by A L Law. (Client confidentiality strictly preserved.)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c) => (
          <Link
            key={c.id}
            href={`/cases/${c.slug}`}
            className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                {c.value && <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-crimson text-brand-white">{c.value}</span>}
                {c.forum && <span className="font-body text-xs text-brand-slate">{c.forum}</span>}
              </div>
              <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-3">
                {c.title}
              </h2>
              <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6">
                {c.caseSummary}
              </p>
            </div>
            <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2">
              View Case Summary &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
