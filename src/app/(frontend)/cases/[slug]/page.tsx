import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })
  const { docs: [c] } = await payload.find({
    collection: 'cases',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!c) return notFound()

  return (
    <article className="container py-12">
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          {c.value && <span className="font-heading text-xs font-bold px-3 py-1 rounded-full bg-brand-crimson text-brand-white">{c.value}</span>}
          {c.forum && <span className="font-body text-xs text-brand-slate dark:text-brand-blush">{c.forum}</span>}
        </div>
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          {c.title}
        </h1>
        <p className="font-body text-lg text-brand-slate dark:text-brand-blush">
          {c.caseSummary}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-4xl font-body">
        {c.details ? JSON.stringify(c.details) : c.caseSummary}
      </div>
    </article>
  )
}
