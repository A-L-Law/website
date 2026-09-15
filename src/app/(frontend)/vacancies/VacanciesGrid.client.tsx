'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import type { Vacancy } from '@/payload-types'

type Props = {
  initialVacancies: Vacancy[]
}

export default function VacanciesGrid({ initialVacancies }: Props) {
  const itemShow = 6
  const [currentPage, setCurrentPage] = useState(0)

  // Paginate items
  const totalPages = Math.ceil(initialVacancies.length / itemShow)
  const startIndex = currentPage * itemShow
  const endIndex = startIndex + itemShow
  const currentVacancies = initialVacancies.slice(startIndex, endIndex)

  return (
    <>
      <div className="row flex flex-wrap -mx-4 font-body">
        {currentVacancies.map((vacancy) => {
          const date = vacancy.publishedAt ? new Date(vacancy.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
          const heroImg = vacancy.heroImage
          const imageUrl = heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
            ? heroImg.url
            : '/assets/img/blog/blog-standard-1.jpg'
          
          return (
            <div className="col-xl-4 col-lg-6 w-full md:w-1/2 xl:w-1/3 px-4 mb-8" key={vacancy.id}>
              <div className="blog__two-item bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                <div className="blog__two-item-image relative h-56 w-full overflow-hidden">
                  <Link href={`/vacancies/${vacancy.slug}`}>
                    <img src={imageUrl} alt={vacancy.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="blog__two-item-image-date absolute top-4 left-4 bg-brand-crimson text-white px-3 py-1 rounded text-sm font-semibold">
                    {vacancy.employmentType || 'Full-Time'}
                  </div>
                </div>
                <div className="blog__two-item-content p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {vacancy.location && (
                      <div className="text-brand-crimson text-xs font-semibold uppercase tracking-wider mb-2">
                        {vacancy.location}
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-3 group-hover:text-brand-crimson transition-colors line-clamp-2">
                      <Link href={`/vacancies/${vacancy.slug}`}>{vacancy.title}</Link>
                    </h4>
                    {vacancy.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{vacancy.excerpt}</p>
                    )}
                  </div>
                  <Link className="text-brand-charcoal dark:text-white font-semibold text-sm inline-flex items-center gap-2 hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors" href={`/vacancies/${vacancy.slug}`}>
                    View Details <i className="far fa-chevron-double-right text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
        {initialVacancies.length === 0 && (
          <div className="w-full text-center py-12 text-brand-slate dark:text-gray-400">
            No vacancies currently available.
          </div>
        )}
      </div>

      {initialVacancies.length > 0 && (
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  )
}
