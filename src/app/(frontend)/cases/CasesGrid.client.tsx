'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Case, PracticeArea } from '@/payload-types'

type Props = {
  initialCases: Case[]
  practiceAreas: PracticeArea[]
}

export default function CasesGrid({ initialCases, practiceAreas }: Props) {
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique filter categories from the data, plus "All"
  const filterCategories = useMemo(() => {
    const categories = new Set<string>()
    categories.add('All')
    
    initialCases.forEach(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object' && item.practiceArea.title) {
        categories.add(item.practiceArea.title)
      }
    })
    
    return Array.from(categories)
  }, [initialCases])

  // Filter items
  const filteredCases = useMemo(() => {
    if (activeFilter === 'All') return initialCases
    
    return initialCases.filter(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object') {
        return item.practiceArea.title === activeFilter
      }
      return false
    })
  }, [initialCases, activeFilter])

  return (
    <div className="team__three font-body">
      <div className="row mb-12">
        <div className="col-12">
          <div className="filter_button font-heading">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={activeFilter === category ? 'active' : ''}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row flex flex-wrap -mx-4">
        {filteredCases.map((data) => {
          const heroImg = data.heroImage
          const imageUrl = heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
            ? heroImg.url
            : '/assets/img/portfolio/portfolio-1.jpg' // Standard fallback

          const subtitle = (data.practiceArea && typeof data.practiceArea === 'object' && data.practiceArea.title) || data.forum || 'Legal Case'

          return (
            <div className="col-xl-4 col-lg-4 col-md-6 w-full lg:w-1/3 md:w-1/2 px-4 mt-8" key={data.id}>
              <div className="project__one-item group relative overflow-hidden rounded-lg">
                <img src={imageUrl} alt={data.title} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="project__one-item-content absolute bottom-6 left-6 right-6 bg-white dark:bg-[#181C22] p-6 rounded shadow-lg transform translate-y-0 opacity-100 transition-all duration-300 z-10">
                  <span className="block text-brand-crimson font-medium text-sm mb-2 font-heading tracking-wide uppercase">
                    {subtitle}
                  </span>
                  <h4 className="font-heading font-bold text-xl leading-tight mb-0 text-brand-charcoal dark:text-white line-clamp-2">
                    <Link href={`/cases/${data.slug}`} className="hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
                      {data.title}
                    </Link>
                  </h4>
                </div>
                <div className="project__one-item-icon absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <Link href={`/cases/${data.slug}`} className="w-12 h-12 bg-brand-crimson rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-crimson transition-colors shadow-md">
                    <i className="fal fa-long-arrow-up rotate-45 transform"></i>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-brand-slate dark:text-gray-400">No cases found for the selected practice area.</p>
        </div>
      )}
    </div>
  )
}
