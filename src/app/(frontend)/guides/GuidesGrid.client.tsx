'use client'

import React, { useState, useMemo } from 'react'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import BlogCard from '@/components/Blog/BlogCard'
import type { Post, PracticeArea } from '@/payload-types'

type Props = {
  initialGuides: Post[]
  practiceAreas: PracticeArea[]
}

export default function GuidesGrid({ initialGuides, practiceAreas }: Props) {
  const blogItemShow = 6
  const [currentPage, setCurrentPage] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique filter categories from the data, plus "All"
  const filterCategories = useMemo(() => {
    const categories = new Set<string>()
    categories.add('All')
    
    initialGuides.forEach(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object' && item.practiceArea.title) {
        categories.add(item.practiceArea.title)
      }
    })
    
    return Array.from(categories)
  }, [initialGuides])

  // Filter items
  const filteredGuides = useMemo(() => {
    if (activeFilter === 'All') return initialGuides
    
    return initialGuides.filter(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object') {
        return item.practiceArea.title === activeFilter
      }
      return false
    })
  }, [initialGuides, activeFilter])

  // Paginate filtered items
  const totalPages = Math.ceil(filteredGuides.length / blogItemShow)
  
  // Reset pagination when filter changes
  React.useEffect(() => {
    setCurrentPage(0)
  }, [activeFilter])

  const startIndex = currentPage * blogItemShow
  const endIndex = startIndex + blogItemShow
  const currentGuides = filteredGuides.slice(startIndex, endIndex)

  return (
    <>
      <div className="row mb-12">
        <div className="col-12">
          <div className="filter_button font-heading">
            {filterCategories.map(category => (
              <button 
                key={category} 
                className={activeFilter === category ? 'active' : ''} 
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="row flex flex-wrap -mx-4 font-body">
        {currentGuides.map((guide) => (
          <div className="col-xl-4 col-lg-6 w-full md:w-1/2 xl:w-1/3 px-4 mb-8" key={guide.id}>
            <BlogCard post={guide} />
          </div>
        ))}
      </div>

      <BlogPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
