import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { BlogArchiveBlock } from '@/blocks/BlogArchiveBlock/Component'
import { CTAFormBlock } from '@/blocks/CTAFormBlock/Component'
import { CTAInlineBlock } from '@/blocks/CTAInlineBlock/Component'
import { ExperienceBlock } from '@/blocks/ExperienceBlock/Component'
import { PortfolioBlock } from '@/blocks/PortfolioBlock/Component'
import { ServicesBlock } from '@/blocks/ServicesBlock/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { HistoryBlock } from '@/blocks/HistoryBlock/Component'
import { WhoWeAreBlock } from '@/blocks/WhoWeAreBlock/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { SolutionsBlock } from '@/blocks/SolutionsBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  aboutBlock: AboutBlock,
  blogArchiveBlock: BlogArchiveBlock,
  ctaFormBlock: CTAFormBlock,
  ctaInlineBlock: CTAInlineBlock,
  experienceBlock: ExperienceBlock,
  portfolioBlock: PortfolioBlock,
  servicesBlock: ServicesBlock,
  testimonialsBlock: TestimonialsBlock,
  historyBlock: HistoryBlock,
  whoWeAreBlock: WhoWeAreBlock,
  faqBlock: FAQBlock,
  solutionsBlock: SolutionsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
