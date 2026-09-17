import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TestimonialsBlock as TestimonialsBlockProps, Testimonial } from '@/payload-types'

import { TestimonialSlider } from './Slider'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = async ({
  subtitle,
  title,
  populateBy,
  selectedTestimonials,
  limit = 6,
}) => {
  let testimonials: Testimonial[] = []

  if (populateBy === 'selection' && selectedTestimonials && Array.isArray(selectedTestimonials)) {
    testimonials = selectedTestimonials.filter((item): item is Testimonial => typeof item === 'object' && item !== null)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const response = await payload.find({
        collection: 'testimonials',
        limit: limit || 6,
      })
      testimonials = response.docs as Testimonial[]
    } catch {
      testimonials = []
    }
  }

  return (
    <div className="testimonial__area section-padding">
      <img className="testimonial__area-shape dark-n" src="/assets/img/shape/testimonial.png" alt="shape" />
      <img className="testimonial__area-shape light-n" src="/assets/img/shape/testimonial-dark.png" alt="shape" />
      <div className="container">
        <div className="row mb-70 align-items-end">
          <div className="col-xl-8 col-lg-8 lg-mb-30">
            <div className="testimonial__area-title lg-t-center">
              {subtitle && <span className="subtitle-one">{subtitle}</span>}
              <h2>{title || 'Customer Experiences'}</h2>
            </div>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </div>
    </div>
  )
}
