'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import type { Testimonial } from '@/payload-types'

type SliderProps = {
  testimonials: Testimonial[]
  title: string
  subtitle?: string | null
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
  navigation: {
    nextEl: '.testimonial-swiper-button-next',
    prevEl: '.testimonial-swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
}

export const TestimonialSlider: React.FC<SliderProps> = ({ testimonials, title, subtitle }) => {
  return (
    <>
      <div className="flex flex-wrap items-end mb-[70px]">
        <div className="w-full lg:w-2/3 lg:mb-[30px]">
          <div className="testimonial__area-title text-center lg:text-left">
            {subtitle && <span className="subtitle-one">{subtitle}</span>}
            <h2 className="text-4xl font-bold font-heading mb-0">{title}</h2>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="testimonial__area-button text-center lg:text-right">
            <div className="testimonial__area-button-prev testimonial-swiper-button-prev">
              <i className="fal fa-long-arrow-left"></i>
            </div>
            <div className="testimonial__area-button-next testimonial-swiper-button-next">
              <i className="fal fa-long-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full">
          <Swiper modules={[EffectFade, Autoplay, Navigation]} {...slideControl}>
            {testimonials.map((item, idx) => {
              const avatarObj = item.avatar && typeof item.avatar === 'object' ? item.avatar : null
              const avatarUrl = avatarObj?.url || `/assets/img/avatar/avatar-${(idx % 4) + 1}.jpg`

              return (
                <SwiperSlide key={item.id}>
                  <div className="testimonial__area-item swiper-slide">
                    <div className="testimonial__area-item-client">
                      <div className="testimonial__area-item-icon">
                        <i className="fal fa-quote-right"></i>
                      </div>
                      <div className="testimonial__area-item-client-image">
                        <img src={avatarUrl} alt={item.reviewerName} />
                      </div>
                      <div className="testimonial__area-item-client-title">
                        <h5>{item.reviewerName}</h5>
                        <span className="text-eight">{item.source}</span>
                      </div>
                    </div>
                    <p>{item.reviewText}</p>
                    <div className="testimonial__area-item-reviews">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}
