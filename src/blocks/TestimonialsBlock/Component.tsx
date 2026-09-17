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
    <div className="testimonial__area section-padding py-24">
      <img className="testimonial__area-shape dark:hidden absolute top-[-210px] right-[20px] -z-10" src="/assets/img/shape/testimonial.png" alt="shape" />
      <img className="testimonial__area-shape hidden dark:block absolute top-[-210px] right-[20px] -z-10" src="/assets/img/shape/testimonial-dark.png" alt="shape" />
      <div className="container mx-auto px-4">
        <TestimonialSlider 
          testimonials={testimonials} 
          title={title || 'Customer Experiences'}
          subtitle={subtitle}
        />
      </div>
    </div>
  )
}

