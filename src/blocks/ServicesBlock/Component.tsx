import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ServicesBlock as ServicesBlockProps, PracticeArea } from '@/payload-types'
import * as LucideIcons from 'lucide-react'

export const ServicesBlock: React.FC<ServicesBlockProps> = async ({
  subtitle,
  title,
  populateBy,
  selectedServices,
  limit = 4,
  buttonText,
  buttonLink,
}) => {
  let services: PracticeArea[] = []

  if (populateBy === 'selection' && selectedServices && Array.isArray(selectedServices)) {
    services = selectedServices.filter((item): item is PracticeArea => typeof item === 'object' && item !== null)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const response = await payload.find({
        collection: 'practice-areas',
        limit: limit || 4,
        sort: 'title',
      })
      services = response.docs as PracticeArea[]
    } catch {
      services = []
    }
  }

  return (
    <div className="services__one section-padding py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="services__one-title">
            <span className="subtitle-one text-brand-crimson font-bold text-sm uppercase tracking-wider mb-2 block">
              {subtitle || 'OUR SOLUTIONS'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {title || 'Consulting Services'}
            </h2>
          </div>
          <Link
            className="btn-one bg-brand-crimson hover:bg-black text-white px-8 py-4 rounded-md font-extrabold uppercase text-xs tracking-wider inline-flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            href={buttonLink || '/practice-areas'}
          >
            {buttonText || 'ALL SERVICES'}
            <i className="far fa-chevron-double-right text-xs"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const IconComponent =
              item.icon && item.icon in LucideIcons
                ? (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon]
                : LucideIcons.Scale

            return (
              <Link
                href={`/practice-areas/${item.slug}`}
                className="services__one-item group relative overflow-hidden bg-white dark:bg-card border border-slate-200 dark:border-slate-800 p-8 lg:p-10 rounded-xl transition-all duration-400 ease-out hover:-translate-y-2 hover:bg-brand-crimson hover:border-brand-crimson hover:shadow-2xl flex flex-col justify-between cursor-pointer no-underline block"
                key={item.id}
              >
                {/* Top-right translucent corner circle shape on hover */}
                <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                <div>
                  {/* Clean icon without background box */}
                  <div className="services__one-item-icon text-brand-crimson group-hover:text-white transition-colors duration-400 mb-6">
                    {IconComponent && <IconComponent className="w-14 h-14 stroke-[1.5]" />}
                  </div>

                  <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-white transition-colors duration-400">
                    {item.title}
                  </h4>

                  {item.summary && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-white/90 line-clamp-3 leading-relaxed mb-6 transition-colors duration-400">
                      {item.summary}
                    </p>
                  )}
                </div>

                <div className="simple-btn-2 text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-white inline-flex items-center gap-2 transition-colors duration-400 mt-auto">
                  READ MORE <i className="far fa-chevron-double-right text-xs"></i>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

