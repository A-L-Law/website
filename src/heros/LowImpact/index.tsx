import React from 'react'
import Link from 'next/link'

import type { Page } from '@/payload-types'

export const LowImpactHero: React.FC<Page['hero']> = (props) => {
  const { title, innerTitle } = props || {}

  const displayTitle = title || 'Page'
  const displayInnerTitle = innerTitle || displayTitle

  return (
    <div className="page__banner bg-secondary/10 py-16 relative">
      <div className="container relative z-10">
        <div className="row">
          <div className="col-xl-12">
            <div className="page__banner-content">
              <span className="text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 inline-block">
                {displayInnerTitle}
              </span>
              <ul className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <li>
                  <Link href="/" className="hover:text-brand-crimson transition-colors">
                    Home
                  </Link>
                  <span className="ml-2 text-gray-400">|</span>
                </li>
                <li>{displayInnerTitle}</li>
              </ul>
              <h1 className="text-3xl md:text-5xl font-bold">{displayTitle}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
