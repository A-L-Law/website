import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PortfolioBlock as PortfolioBlockProps, Case } from '@/payload-types'

export const PortfolioBlock: React.FC<PortfolioBlockProps> = async ({
  subtitle,
  title,
  populateBy,
  selectedCases,
  limit = 6,
}) => {
  let cases: Case[] = []

  if (populateBy === 'selection' && selectedCases && Array.isArray(selectedCases)) {
    cases = selectedCases.filter((item): item is Case => typeof item === 'object' && item !== null)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const response = await payload.find({
        collection: 'cases',
        limit: limit || 6,
        sort: '-publishedAt',
      })
      cases = response.docs as Case[]
    } catch {
      cases = []
    }
  }

  return (
    <div className="portfolio__area dark__image section-padding py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="row mb-12 text-center">
          <div className="col-xl-12">
            <div className="portfolio__area-title">
              {subtitle && (
                <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                  {subtitle}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">{title || 'Our Legal & Case Success'}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => {
            const mediaUrl = `/assets/img/portfolio/portfolio-${(idx % 5) + 1}.jpg`

            return (
              <div
                className="portfolio__area-item bg-card border border-border rounded-xl overflow-hidden shadow-md flex flex-col group"
                key={item.id}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      href={`/cases/${item.slug}`}
                      className="w-12 h-12 rounded-full bg-brand-crimson text-white flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform"
                    >
                      <i className="far fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-brand-crimson transition-colors">
                      <Link href={`/cases/${item.slug}`}>{item.title}</Link>
                    </h4>
                    {item.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.excerpt}</p>
                    )}
                  </div>
                  <Link
                    href={`/cases/${item.slug}`}
                    className="text-brand-crimson font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-1 hover:underline"
                  >
                    View Case Study <i className="far fa-chevron-double-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
