import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import * as LucideIcons from 'lucide-react'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { CTAInlineBlock } from '@/blocks/CTAInlineBlock/Component'
import { SolutionsBlock } from '@/blocks/SolutionsBlock/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { Subscribe } from '@/components/Subscribe'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Header, Footer } from '@/payload-types'

export const revalidate = 60

export default async function PracticeAreasPage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch practice areas collection items
  const { docs: practiceAreas } = await payload.find({
    collection: 'practice-areas',
    sort: 'title',
    limit: 100,
  })

  // Fetch header, footer and page-banners globals for configurable media
  const [headerData, footerData, pageBanners] = await Promise.all([
    getCachedGlobal('header', 1)() as Promise<Header & { practiceAreasHeroMedia?: Media | string | null }>,
    getCachedGlobal('footer', 1)() as Promise<Footer & { subscribeBgMedia?: Media | string | null }>,
    getCachedPageBanners(),
  ])

  const bannerMedia = (pageBanners?.practiceAreas?.media ||
    headerData?.practiceAreasHeroMedia ||
    pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="practice-areas-page font-body">
      {/* 1. Medium Impact Hero Banner (with background media configured from Page Banners in Admin) */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.practiceAreas?.title || 'Our Practice Areas'}
        innerTitle={pageBanners?.practiceAreas?.innerTitle || 'Our Practice Areas'}
        media={bannerMedia}
      />

      {/* 2. Services Main Grid (matching template Services 1 card design with full-card link overlay) */}
      <div className="services__page section-padding-two py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, idx) => {
              const IconComponent =
                (LucideIcons as unknown as Record<string, React.ElementType>)[area.icon] ||
                LucideIcons.Scale

              let cardImgUrl = `/assets/img/service/service-${(idx % 6) + 1}.jpg`
              if (
                area.heroImage &&
                typeof area.heroImage === 'object' &&
                'url' in area.heroImage &&
                area.heroImage.url
              ) {
                cardImgUrl = (area.heroImage as Media).url!
              }

              return (
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="services__three-item page group block cursor-pointer no-underline"
                  key={area.id}
                >
                  <img
                    src={cardImgUrl}
                    alt={area.title}
                    className="w-full h-80 object-cover rounded-t-xl transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="services__three-item-content page">
                    <div className="services__three-item-content-icon transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 leading-snug group-hover:text-brand-crimson transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-sm line-clamp-3 leading-relaxed opacity-80">
                      {area.summary}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. Quote Block (CTAInlineBlock matching template CtaArea with contained width) */}
      <CTAInlineBlock
        title="Get Free Quote"
        subtitle="Perfect legal solution for your company or private practice."
        buttonText="Get Quote"
        buttonLink="/contact"
        blockType="ctaInlineBlock"
      />

      {/* 4. Solutions Block (SolutionsBlock) */}
      <SolutionsBlock
        subtitle="Advance Solutions"
        title="We Help With Strategic Planning"
        description="A L Law provides comprehensive legal counsel and structuring to safeguard commercial interests and private assets."
        blockType="solutionsBlock"
      />

      {/* 5. Testimonial Block (TestimonialsBlock) */}
      <TestimonialsBlock
        subtitle="Real Client Stories"
        title="Customer & Client Experiences"
        blockType="testimonialsBlock"
      />

      {/* 6. Footer Subscribe Area Banner (overlapping down over footer, with background image from admin) */}
      <Subscribe bgMedia={footerData?.subscribeBgMedia} />
    </article>
  )
}

