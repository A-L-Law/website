import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { PortfolioBlock as PortfolioBlockProps, Case } from '@/payload-types'
import PortfolioSlider from './PortfolioSlider.client'

export const PortfolioBlock: React.FC<PortfolioBlockProps> = async ({
  subtitle,
  title,
  populateBy,
  selectedCases,
  limit = 6,
}) => {
  let cases: Case[] = []

  if (populateBy === 'selection' && selectedCases && Array.isArray(selectedCases)) {
    cases = selectedCases.filter((item): item is Case => typeof item === 'object' && item !== null)
  } else {
    try {
      const payload = await getPayload({ config: configPromise })
      const response = await payload.find({
        collection: 'cases',
        limit: limit || 6,
        sort: '-publishedAt',
      })
      cases = response.docs as Case[]
    } catch {
      cases = []
    }
  }

  return (
    <div className="portfolio__area dark__image section-padding pb-0 overflow-hidden font-body">
      <div className="container-fluid p-0">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="portfolio__area-title t-center">
              {subtitle && <span className="subtitle-one text-brand-crimson font-heading uppercase tracking-wider">{subtitle}</span>}
              <h2 className="font-heading font-bold text-4xl text-brand-charcoal dark:text-white">{title || 'Our Consulting Success'}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <PortfolioSlider cases={cases} />
          </div>
        </div>
      </div>
    </div>
  )
}
