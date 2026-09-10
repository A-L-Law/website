'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import type { ExperienceBlock as ExperienceBlockProps } from '@/payload-types'

export const ExperienceBlock: React.FC<ExperienceBlockProps> = ({
  subtitle,
  title,
  description,
  image1,
  image2,
  skillBars,
  buttonText,
  buttonLink,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (blockRef.current) {
      observer.observe(blockRef.current)
    }

    return () => {
      if (blockRef.current) {
        observer.unobserve(blockRef.current)
      }
    }
  }, [])

  const img1Url =
    image1 && typeof image1 === 'object' && 'url' in image1 && image1.url
      ? image1.url
      : '/assets/img/pages/experience-1.jpg'

  const img2Url =
    image2 && typeof image2 === 'object' && 'url' in image2 && image2.url
      ? image2.url
      : '/assets/img/pages/experience-2.jpg'

  const skills = Array.isArray(skillBars) && skillBars.length > 0
    ? skillBars
    : [
        { label: 'Business Consulting', percentage: 60 },
        { label: 'Human Resource', percentage: 85 },
      ]

  return (
    <div ref={blockRef} className="experience__area dark__image section-padding py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vertically Staggered Images with Animated Dots Asset */}
          <div className="lg:col-span-6">
            <div className="experience__area-image relative flex gap-6 items-start">
              {/* Small animated dots shape asset below the left image */}
              <img
                src="/assets/img/shape/dots.png"
                alt="dots accent shape"
                className="experience__area-image-shape left-right-animate absolute -bottom-10 left-0 z-0 pointer-events-none max-w-[140px]"
              />

              {/* Left Image (positioned higher) */}
              <div className="w-1/2 relative z-10">
                <img
                  src={img1Url}
                  alt="experience primary"
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl shadow-xl border border-border"
                />
              </div>

              {/* Right Image (vertically staggered lower) */}
              <div className="w-1/2 relative z-10 mt-16 sm:mt-20">
                <img
                  src={img2Url}
                  alt="experience secondary"
                  className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl shadow-xl border border-border"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Description, Animated Skill Bars & Action Button */}
          <div className="lg:col-span-6">
            <div className="experience__area-right lg:pl-6">
              <div className="experience__area-right-title mb-8">
                {subtitle && (
                  <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-bold text-sm mb-3 block">
                    {subtitle}
                  </span>
                )}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                  {title || 'Empowering Brand Growth Together'}
                </h2>
                {description && (
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Animated Skill Bars */}
              <div className="skill__area space-y-6 mb-10">
                {skills.map((skill, idx) => (
                  <div key={idx} className="skill__area-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-base text-foreground">{skill.label}</span>
                      <span className="text-sm font-bold text-brand-crimson">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden relative">
                      <div
                        className="bg-brand-crimson h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.percentage}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {buttonText && (
                <Link
                  className="btn-two bg-brand-crimson hover:bg-black text-white px-8 py-4 rounded-md font-bold uppercase text-xs tracking-wider inline-flex items-center gap-2 transition-colors shadow-md shrink-0 cursor-pointer"
                  href={buttonLink || '/contact'}
                >
                  {buttonText}
                  <i className="far fa-chevron-double-right text-xs"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

