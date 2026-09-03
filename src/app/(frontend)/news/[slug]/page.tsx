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

export default async function NewsDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })
  const { docs: [item] } = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!item) return notFound()

  return (
    <article className="container py-12">
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12">
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          {item.title}
        </h1>
        <p className="font-body text-lg text-brand-slate dark:text-brand-blush">
          {item.excerpt}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-4xl font-body">
        {item.content ? JSON.stringify(item.content) : item.excerpt}
      </div>
    </article>
  )
}
