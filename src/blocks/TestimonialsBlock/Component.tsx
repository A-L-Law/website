import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TestimonialsBlock as TestimonialsBlockProps, Testimonial } from '@/payload-types'

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
    <div className="testimonial__area section-padding py-16 bg-secondary/10 relative">
      <div className="container mx-auto px-4">
        <div className="row mb-12 text-center">
          <div className="col-xl-12">
            <div className="testimonial__area-title">
              {subtitle && (
                <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                  {subtitle}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">{title || 'Customer & Client Experiences'}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => {
            const avatarUrl = `/assets/img/avatar/avatar-${(idx % 4) + 1}.jpg`

            return (
              <div
                className="testimonial__area-item bg-card border border-border p-6 rounded-xl shadow-md flex flex-col justify-between"
                key={item.id}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={avatarUrl}
                      alt={item.reviewerName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-crimson"
                    />
                    <div>
                      <h5 className="font-bold text-lg">{item.reviewerName}</h5>
                      {item.source && (
                        <span className="text-xs text-muted-foreground block">{item.source}</span>
                      )}
                    </div>
                  </div>
                  {item.reviewText && <p className="text-sm italic text-muted-foreground mb-4">&quot;{item.reviewText}&quot;</p>}
                </div>
                <div className="testimonial__area-item-reviews flex text-amber-500 gap-1 text-sm">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
