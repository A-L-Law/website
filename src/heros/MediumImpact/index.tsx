import React from 'react'
import Link from 'next/link'

import type { Media as MediaType, Page } from '@/payload-types'

export interface MediumImpactHeroProps {
  type?: Page['hero']['type'] | string
  title?: string | null
  innerTitle?: string | null
  media?: MediaType | string | number | null
  breadcrumbs?: Array<{ label: string; url?: string }>
}

export const MediumImpactHero: React.FC<MediumImpactHeroProps> = (props) => {
  const { title, innerTitle, media, breadcrumbs } = props || {}

  const bgUrl =
    media && typeof media === 'object' && 'url' in media && media.url
      ? media.url
      : '/assets/img/pages/page-banner.jpg'

  const displayTitle = title || 'Page'
  const displayInnerTitle = innerTitle || displayTitle

  // Outlined first word behind breadcrumbs (e.g. "OUR", "LEGAL", "PRACTICE")
  const firstWord = displayTitle ? displayTitle.trim().split(/\s+/)[0] : ''

  return (
    <div className="page__banner relative z-10 overflow-hidden bg-[#0c0c0c] pt-[90px] pb-[120px] md:pt-[110px] md:pb-[160px]">
      {/* 1. Background image (photo) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      {/* 2a. Dark curved shape overlay on the left matching template page-banner-bg.png */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          backgroundImage: `url('/assets/img/shape/page-banner-bg.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
          backgroundSize: 'max(929px, 55vw) 100%',
        }}
      />

      {/* 2b. Solid / gradient dark backing on left to guarantee seamless opacity across all aspect ratios */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(12,12,12,0.98) 0%, rgba(12,12,12,0.95) 35%, rgba(12,12,12,0) 65%)',
        }}
      />

      {/* 2c. Dark overlay for mobile view (<768px) matching template media query */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[#0c0c0c]/90 md:hidden" />

      {/* 3. Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="page__banner-content max-w-3xl">
          {/* Giant outlined first word placed behind breadcrumbs */}
          {firstWord && (
            <span
              className="block font-heading font-extrabold uppercase select-none pointer-events-none mb-[-35px] sm:mb-[-55px] md:mb-[-75px] lg:mb-[-80px] relative z-0"
              style={{
                fontSize: 'clamp(55px, 8.5vw, 120px)',
                lineHeight: '1.1',
                WebkitTextFillColor: 'transparent',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: 'rgba(255, 255, 255, 0.22)',
                letterSpacing: '0.04em',
              }}
              aria-hidden="true"
            >
              {firstWord}
            </span>
          )}

          {/* Breadcrumbs: Home | Active Title in Primary Brand Crimson */}
          <ul className="relative z-10 flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-[15px] font-bold text-white mb-2.5">
            <li>
              <Link href="/" className="hover:text-brand-crimson transition-colors text-white">
                Home
              </Link>
            </li>
            <li className="text-white/60 select-none">|</li>
            {breadcrumbs && breadcrumbs.length > 0 ? (
              breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <li className="text-white/60 select-none">|</li>}
                    {crumb.url && !isLast ? (
                      <li>
                        <Link href={crumb.url} className="hover:text-brand-crimson transition-colors text-white">
                          {crumb.label}
                        </Link>
                      </li>
                    ) : (
                      <li className="text-brand-crimson">{crumb.label}</li>
                    )}
                  </React.Fragment>
                )
              })
            ) : (
              <li className="text-brand-crimson">{displayInnerTitle}</li>
            )}
          </ul>

          {/* Main Title */}
          <h1 className="relative z-10 font-heading font-extrabold text-white text-[34px] sm:text-[45px] md:text-[58px] lg:text-[70px] lg:leading-[80px] mt-2 tracking-tight">
            {displayTitle}
          </h1>
        </div>
      </div>
    </div>
  )
}
