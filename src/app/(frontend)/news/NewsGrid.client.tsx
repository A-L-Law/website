'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import BlogPagination from '@/components/Blog/BlogPagination.client'
import type { Post, PracticeArea } from '@/payload-types'

type Props = {
  initialNews: Post[]
  practiceAreas: PracticeArea[]
}

export default function NewsGrid({ initialNews, practiceAreas }: Props) {
  const blogItemShow = 6
  const [currentPage, setCurrentPage] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract unique filter categories from the data, plus "All"
  const filterCategories = useMemo(() => {
    const categories = new Set<string>()
    categories.add('All')
    
    initialNews.forEach(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object' && item.practiceArea.title) {
        categories.add(item.practiceArea.title)
      }
    })
    
    return Array.from(categories)
  }, [initialNews])

  // Filter items
  const filteredNews = useMemo(() => {
    if (activeFilter === 'All') return initialNews
    
    return initialNews.filter(item => {
      if (item.practiceArea && typeof item.practiceArea === 'object') {
        return item.practiceArea.title === activeFilter
      }
      return false
    })
  }, [initialNews, activeFilter])

  // Paginate filtered items
  const totalPages = Math.ceil(filteredNews.length / blogItemShow)
  
  // Reset pagination when filter changes
  React.useEffect(() => {
    setCurrentPage(0)
  }, [activeFilter])

  const startIndex = currentPage * blogItemShow
  const endIndex = startIndex + blogItemShow
  const currentNews = filteredNews.slice(startIndex, endIndex)

  return (
    <>
      <div className="row mb-50">
        <div className="col-xl-12">
          <div className="filter_button font-heading text-center mb-12">
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
        {currentNews.map((news) => {
          const date = news.publishedAt ? new Date(news.publishedAt) : new Date()
          const day = date.getDate().toString().padStart(2, '0')
          const month = date.toLocaleString('default', { month: 'short' })
          
          const imageUrl = news.featuredImage && typeof news.featuredImage === 'object' && news.featuredImage.url
            ? news.featuredImage.url
            : '/assets/img/blog/blog-standard-1.jpg' // Fallback

          // Find author name
          const authorName = news.author && typeof news.author === 'object' 
            ? news.author.name || news.author.email || 'Admin' 
            : 'Admin'

          return (
            <div className="col-xl-4 col-lg-6 w-full md:w-1/2 xl:w-1/3 px-4 mb-8" key={news.id}>
              <div className="blog__two-item page group">
                <div className="blog__two-item-image rounded-t-lg overflow-hidden relative">
                  <Link href={`/news/${news.slug}`}>
                    <img src={imageUrl} alt={news.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  <div className="blog__two-item-image-date">
                    <span className="text-three">{day}</span>
                    <span className="text-five">{month}</span>
                  </div>
                </div>
                <div className="blog__two-item-content border-t-0 rounded-b-lg border border-gray-200">
                  <div className="blog__two-item-content-meta border-b border-gray-200 pb-4 mb-4">
                    <ul className="flex items-center text-sm text-brand-slate">
                      <li className="mr-4 pr-4 border-r border-gray-200">
                        <span className="flex items-center hover:text-brand-crimson transition-colors">
                          <i className="far fa-user text-brand-crimson mr-2"></i>By {authorName}
                        </span>
                      </li>
                      <li>
                        {news.practiceArea && typeof news.practiceArea === 'object' && (
                          <span className="flex items-center text-brand-slate">
                            <i className="far fa-briefcase text-brand-crimson mr-2"></i>
                            {news.practiceArea.title}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <h4 className="font-heading font-bold text-xl mb-4 group-hover:text-brand-crimson transition-colors line-clamp-2 min-h-[56px]">
                    <Link href={`/news/${news.slug}`}>{news.title}</Link>
                  </h4>
                  <p className="text-brand-slate text-sm line-clamp-2 mb-6">
                    {news.excerpt}
                  </p>
                  <Link className="btn-six inline-flex items-center text-sm font-heading font-bold uppercase tracking-wider text-brand-charcoal hover:text-white hover:bg-brand-crimson border border-gray-200 rounded-full px-6 py-2 transition-all group-hover:border-brand-crimson" href={`/news/${news.slug}`}>
                    Read More <i className="far fa-chevron-double-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {filteredNews.length > 0 ? (
        <BlogPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-brand-slate text-lg">No news found for this practice area.</p>
        </div>
      )}
    </>
  )
}
