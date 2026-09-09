import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Media } from '@/payload-types'

export type PageBannerSection = {
  title?: string | null
  innerTitle?: string | null
  media?: Media | string | null
}

export type PageBannersType = {
  practiceAreas?: PageBannerSection
  team?: PageBannerSection
  guides?: PageBannerSection
  cases?: PageBannerSection
  events?: PageBannerSection
  news?: PageBannerSection
  vacancies?: PageBannerSection
  posts?: PageBannerSection
  search?: PageBannerSection
  defaultBanner?: {
    media?: Media | string | null
  }
}

export async function getPageBanners(): Promise<PageBannersType | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = (await payload.findGlobal({
      slug: 'page-banners' as any,
      depth: 1,
    })) as unknown as PageBannersType
    return data
  } catch {
    return null
  }
}

export const getCachedPageBanners = unstable_cache(
  async () => getPageBanners(),
  ['page-banners'],
  { tags: ['global_page-banners'] }
)
