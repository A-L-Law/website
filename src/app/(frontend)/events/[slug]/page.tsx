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

export default async function EventDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })
  const { docs: [event] } = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!event) return notFound()

  return (
    <article className="container py-12">
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12">
        <span className="font-heading text-xs font-bold text-brand-crimson dark:text-brand-coral uppercase tracking-wider">{event.location}</span>
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white my-3">
          {event.title}
        </h1>
        <p className="font-body text-lg text-brand-slate dark:text-brand-blush">
          {event.summary}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-4xl font-body">
        {event.details ? JSON.stringify(event.details) : event.summary}
      </div>
    </article>
  )
}
