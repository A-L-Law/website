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
    <Swiper modules={[EffectFade, Autoplay]} {...slideControl}>
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
            <div className="portfolio__area-item swiper-slide">
              <img src={imageUrl || ''} alt={data.title} />
              {/* Force the title window active by adding an active class or inline style if needed. 
                  In Conbix CSS, .portfolio__area-item:hover .portfolio__area-item-content is used.
                  By adding an "active" class or keeping it visible, we mimic the /cases page. */}
              <div className="portfolio__area-item-content active" style={{ bottom: '30px', opacity: 1, visibility: 'visible' }}>
                <div className="portfolio__area-item-content-title">
                  <h4>
                    <Link href={`/cases/${data.slug}`}>{data.title}</Link>
                  </h4>
                  <span className="text-eight">{subtitle}</span>
                </div>
                <div className="portfolio__area-item-content-icon">
                  <Link href={`/cases/${data.slug}`}>
                    <img src="/assets/img/icon/up-arrow.png" alt="icon" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
