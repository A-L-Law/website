import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as LucideIcons from 'lucide-react'

export const revalidate = 60

export default async function PracticeAreasPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    sort: 'title',
    limit: 100,
  })

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          Our Legal Practice Areas
        </h1>
        <p className="font-body text-lg text-brand-slate max-w-2xl mx-auto">
          A L Law delivers specialist legal representation for businesses, high-net-worth individuals, and private clients across London and the UK.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {practiceAreas.map((area) => {
          const IconComponent = (LucideIcons as Record<string, React.ElementType>)[area.icon] || LucideIcons.Scale

          return (
            <Link
              key={area.id}
              href={`/practice-areas/${area.slug}`}
              className="group p-8 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-lg bg-brand-ice dark:bg-brand-burgundy text-brand-crimson dark:text-brand-coral flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-3 group-hover:text-brand-crimson">
                  {area.title}
                </h2>
                <p className="font-body text-brand-slate text-sm line-clamp-3 mb-6">
                  {area.summary}
                </p>
              </div>
              <div className="font-heading text-sm font-semibold text-brand-crimson flex items-center gap-2">
                Explore Practice Area &rarr;
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
