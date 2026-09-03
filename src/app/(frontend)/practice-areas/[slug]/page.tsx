import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as LucideIcons from 'lucide-react'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PracticeAreaDetailPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const payload = await getPayload({ config: configPromise })
  const { docs: [area] } = await payload.find({
    collection: 'practice-areas',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!area) return notFound()

  const IconComponent = (LucideIcons as Record<string, React.ElementType>)[area.icon] || LucideIcons.Scale

  return (
    <article className="container py-12">
      <div className="bg-brand-ice dark:bg-brand-burgundy rounded-2xl p-10 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-16 h-16 rounded-xl bg-brand-crimson text-brand-white flex items-center justify-center shrink-0">
          <IconComponent className="w-8 h-8" />
        </div>
        <div>
          <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-2">
            {area.title}
          </h1>
          <p className="font-body text-lg text-brand-slate dark:text-brand-blush">
            {area.summary}
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-4xl font-body">
        {area.description ? JSON.stringify(area.description) : area.summary}
      </div>
    </article>
  )
}
