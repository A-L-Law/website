import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  posts: '/posts',
  'practice-areas': '/practice-areas',
  cases: '/cases',
  events: '/events',
  vacancies: '/vacancies',
  team: '/team',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  postType?: string
}

export const generatePreviewPath = ({ collection, slug, postType }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  let prefix = collectionPrefixMap[collection] || ''
  if (collection === 'posts') {
    prefix = postType === 'guide' ? '/guides' : '/news'
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: `${prefix}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
