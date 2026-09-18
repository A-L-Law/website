'use client'

import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import type { Page } from '@/payload-types'
import { VideoModal } from '@/components/VideoModal'

const slideControl = {
  loop: true,
  slidesPerView: 1,
  effect: 'fade' as const,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.banner_pagination',
    clickable: true,
  },
}

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  const { slides } = props || {}

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null
  }

  return (
    <div className="banner__one relative overflow-hidden">
      <Swiper modules={[EffectFade, Autoplay, Pagination]} {...slideControl}>
        {slides.map((slide, idx) => {
          const bgUrl =
            slide.media && typeof slide.media === 'object' && 'url' in slide.media && slide.media.url
              ? slide.media.url
              : `/assets/img/banner/banner-${(idx % 2) + 1}.jpg`

          return (
            <SwiperSlide key={slide.id || idx}>
              <div
                className="banner__one-image min-h-screen flex items-center bg-cover bg-center py-28 relative z-10"
                style={{ backgroundImage: `url(${bgUrl})` }}
              >
                {/* Curved black overlay shape matching template banner-bg.png */}
                <div className="banner__one-shape hidden lg:block" />
                {/* Dark overlay for mobile/tablets */}
                <div className="absolute inset-0 bg-black/60 lg:hidden z-0" />

                <div className="container relative z-10">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="banner__one-content max-w-2xl text-white py-16">
                        {slide.subtitle && (
                          <span className="subtitle-one inline-block text-brand-crimson font-bold text-lg uppercase tracking-wider mb-4">
                            {slide.subtitle}
                          </span>
                        )}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                          {slide.title}
                        </h1>
                        <div className="banner__one-content-button flex items-center flex-wrap gap-5">
                          <div className="banner__one-content-button-item">
                            <Link
                              className="btn-one !bg-brand-crimson hover:!bg-black text-white px-8 py-4 rounded-md font-extrabold uppercase text-xs tracking-wider inline-flex items-center gap-2.5 transition-all shadow-lg shrink-0 cursor-pointer"
                              href={slide.buttonUrl || '/about'}
                            >
                              {slide.buttonText || 'Read More'}
                              <i className="far fa-chevron-double-right text-xs"></i>
                            </Link>
                          </div>
                          {slide.videoUrl && <VideoModal videoUrl={slide.videoUrl} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Side vertical pagination bullets matching template */}
      {slides.length > 1 && (
        <div className="banner__one-pagination absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-30 pointer-events-none">
          <div className="banner_pagination pointer-events-auto flex flex-col gap-5"></div>
        </div>
      )}
    </div>
  )
}

