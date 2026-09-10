import React from 'react'
import Link from 'next/link'
import type { WhoWeAreBlock as WhoWeAreBlockProps } from '@/payload-types'

export const WhoWeAreBlock: React.FC<WhoWeAreBlockProps> = ({
  subtitle,
  title,
  description,
  stats,
  mainImage,
  buttonText,
  buttonLink,
  solutionTitle,
  solutionButtonText,
  solutionButtonLink,
  solutionBgImage,
}) => {
  const mainImgUrl =
    mainImage && typeof mainImage === 'object' && 'url' in mainImage && mainImage.url
      ? mainImage.url
      : '/assets/img/about/about-9.jpg'

  const solBgUrl =
    solutionBgImage && typeof solutionBgImage === 'object' && 'url' in solutionBgImage && solutionBgImage.url
      ? solutionBgImage.url
      : '/assets/img/about/about-solution.jpg'

  const statItems = Array.isArray(stats) && stats.length > 0
    ? stats
    : [
        { count: 89, suffix: 'k', label: 'Cases Resolved Successfully' },
        { count: 73, suffix: 'k', label: 'Satisfied Corporate Clients' },
      ]

  return (
    <>
      <div className="company__two section-padding py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="company__two-left space-y-6">
                <div className="company__two-left-title">
                  {subtitle && (
                    <span className="subtitle-one text-brand-crimson uppercase tracking-wider font-semibold text-sm mb-2 block">
                      {subtitle}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {title || 'Best Firm Especially in Business Law'}
                  </h2>
                  {description && <p className="text-muted-foreground">{description}</p>}
                </div>
                <div className="company__two-left-skill grid grid-cols-2 gap-6 py-4">
                  {statItems.map((stat, idx) => (
                    <div key={idx} className="company__two-left-skill-item bg-card border border-border p-4 rounded-lg">
                      <h2 className="text-3xl font-bold text-brand-crimson">
                        {stat.count}
                        {stat.suffix || 'k'}
                      </h2>
                      <h6 className="text-xs uppercase font-medium text-muted-foreground mt-1">
                        {stat.label}
                      </h6>
                    </div>
                  ))}
                </div>
                <Link
                  className="btn-two bg-brand-crimson hover:bg-brand-crimson-dark text-white px-6 py-3 rounded font-medium inline-flex items-center gap-2 transition-colors"
                  href={buttonLink || '/about'}
                >
                  {buttonText || 'Discover More'}
                  <i className="far fa-chevron-double-right"></i>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="company__two-right">
                <img
                  src={mainImgUrl}
                  alt="Who We Are"
                  className="rounded-xl shadow-xl w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="about__solution bg-cover bg-center py-12 text-white relative"
        style={{ backgroundImage: `url(${solBgUrl})` }}
      >
        <div className="absolute inset-0 bg-brand-crimson/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="about__solution-left">
              <h2 className="text-2xl md:text-3xl font-bold">
                {solutionTitle || 'Implement solutions & achieve goals.'}
              </h2>
            </div>
            <div className="about__solution-right">
              <Link
                className="btn-one bg-black hover:bg-black/80 text-white px-6 py-3 rounded font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                href={solutionButtonLink || '/contact'}
              >
                {solutionButtonText || 'Get Free Consultations'}
                <i className="far fa-chevron-double-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
