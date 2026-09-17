'use client'

import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export default function BlogPagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="row text-center mt-25 font-heading">
      <div className="col-xl-12">
        <div className="theme__pagination flex justify-center">
          <ul className="flex flex-wrap gap-2 items-center m-0 p-0">
            <li className={currentPage === 0 ? "hidden" : "list-none"}>
              <span
                onClick={handlePrevPage}
                className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-brand-slate/30 dark:bg-background dark:text-gray-300 rounded cursor-pointer hover:bg-brand-crimson hover:text-white hover:border-brand-crimson dark:hover:bg-brand-crimson dark:hover:text-white dark:hover:border-brand-crimson transition-colors"
              >
                <i className="fas fa-chevron-double-left text-sm"></i>
              </span>
            </li>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="list-none">
                <span
                  onClick={() => setCurrentPage(index)}
                  className={`w-12 h-12 flex items-center justify-center border rounded cursor-pointer transition-colors font-bold ${
                    currentPage === index 
                      ? "bg-brand-crimson text-white border-brand-crimson" 
                      : "border-gray-200 dark:border-brand-slate/30 dark:bg-background dark:text-gray-300 hover:bg-brand-crimson hover:text-white hover:border-brand-crimson dark:hover:bg-brand-crimson dark:hover:text-white dark:hover:border-brand-crimson"
                  }`}
                >
                  {index + 1}
                </span>
              </li>
            ))}
            
            <li className={currentPage === totalPages - 1 ? "hidden" : "list-none"}>
              <span
                onClick={handleNextPage}
                className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-brand-slate/30 dark:bg-background dark:text-gray-300 rounded cursor-pointer hover:bg-brand-crimson hover:text-white hover:border-brand-crimson dark:hover:bg-brand-crimson dark:hover:text-white dark:hover:border-brand-crimson transition-colors"
              >
                <i className="fas fa-chevron-double-right text-sm"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
