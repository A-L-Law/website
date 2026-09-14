'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import Link from 'next/link'
import type { Case } from '@/payload-types'

import 'swiper/css'
import 'swiper/css/effect-fade'

type Props = {
  cases: Case[]
}

const slideControl = {
  loop: true,
  speed: 2000,
  spaceBetween: 30,
  autoplay: {
    delay: 4500,
    reverseDirection: false,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    750: {
      slidesPerView: 2,
    },
    1138: {
      slidesPerView: 3,
    },
    1600: {
      slidesPerView: 4,
    },
  },
}

export default function PortfolioSlider({ cases }: Props) {
  return (
    <div className="px-4">
      <Swiper modules={[EffectFade, Autoplay]} {...slideControl} className="pb-12">
        {cases.map((data) => {
          const heroImg = data.heroImage
          const imageUrl =
            heroImg && typeof heroImg === 'object' && 'url' in heroImg && heroImg.url
              ? heroImg.url
              : '/assets/img/portfolio/portfolio-1.jpg' // Standard fallback

          const subtitle =
            (data.practiceArea && typeof data.practiceArea === 'object' && data.practiceArea.title) ||
            data.forum ||
            'Company Case Study'

          return (
            <SwiperSlide key={data.id}>
              <div className="project__one-item group relative overflow-hidden rounded-lg mx-2 my-2">
                <img 
                  src={imageUrl} 
                  alt={data.title} 
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Active Title Overlay - mimicking /cases grid layout exactly */}
                <div className="project__one-item-content absolute bottom-6 left-6 right-6 bg-white dark:bg-[#181C22] p-6 rounded shadow-lg opacity-100 z-10 transition-all duration-300 group-hover:-translate-y-2">
                  <span className="block text-brand-crimson font-medium text-sm mb-2 font-heading tracking-wide uppercase">
                    {subtitle}
                  </span>
                  <h4 className="font-heading font-bold text-xl leading-tight mb-0 text-brand-charcoal dark:text-white line-clamp-2">
                    <Link href={`/cases/${data.slug}`} className="hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
                      {data.title}
                    </Link>
                  </h4>
                </div>
                
                {/* Always-visible icon */}
                <div className="project__one-item-icon absolute top-6 right-6 opacity-100 z-10">
                  <Link href={`/cases/${data.slug}`} className="w-12 h-12 bg-brand-crimson rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-crimson transition-colors shadow-md">
                    <i className="fal fa-long-arrow-up rotate-45 transform"></i>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
