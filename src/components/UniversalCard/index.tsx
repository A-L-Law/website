import React from 'react'
import Link from 'next/link'
import {
  Calendar,
  Briefcase,
  BookOpen,
  Newspaper,
  Scale,
  UserCheck,
  FileText,
  ChevronsRight,
  FolderKanban,
} from 'lucide-react'

export type UniversalCardData = {
  id: string
  title: string
  excerpt: string
  resourceType: string
  url: string
  imageUrl?: string | null
}

export function resolveUniversalCardData(item: any): UniversalCardData {
  const id = String(item.id || item._id || Math.random())
  const rawTitle = item.title || item.meta?.title || item.doc?.value?.title || 'Untitled Resource'

  const relationTo = item.doc?.relationTo
  const docVal = typeof item.doc?.value === 'object' && item.doc?.value !== null ? item.doc.value : null
  const slug = item.slug || docVal?.slug || ''
  const searchContext = `${rawTitle} ${slug}`.toLowerCase()

  let postType = docVal?.postType || item.postType
  if (!postType) {
    if (searchContext.includes('guide')) {
      postType = 'guide'
    } else if (searchContext.includes('news')) {
      postType = 'news'
    }
  }

  // 1. Resolve Resource Type Label
  let resourceType = item.resourceType
  if (!resourceType) {
    if (relationTo === 'cases' || searchContext.includes('case-')) {
      resourceType = 'Case'
    } else if (relationTo === 'events' || searchContext.includes('event-')) {
      resourceType = 'Event'
    } else if (relationTo === 'vacancies' || searchContext.includes('vacancy-')) {
      resourceType = 'Vacancy'
    } else if (relationTo === 'practice-areas') {
      resourceType = 'Practice Area'
    } else if (relationTo === 'pages') {
      resourceType = 'Page'
    } else if (relationTo === 'posts' || postType) {
      resourceType = postType === 'guide' ? 'Guide' : 'News'
    } else {
      if (searchContext.includes('guide')) resourceType = 'Guide'
      else if (searchContext.includes('news')) resourceType = 'News'
      else resourceType = 'Resource'
    }
  }

  // 2. Resolve Canonical URL
  let url = item.url
  if (!url && slug) {
    if (relationTo === 'cases' || resourceType === 'Case') {
      url = `/cases/${slug}`
    } else if (relationTo === 'events' || resourceType === 'Event') {
      url = `/events/${slug}`
    } else if (relationTo === 'vacancies' || resourceType === 'Vacancy') {
      url = `/vacancies/${slug}`
    } else if (relationTo === 'practice-areas' || resourceType === 'Practice Area') {
      url = `/practice-areas/${slug}`
    } else if (relationTo === 'pages') {
      url = slug === 'home' ? '/' : `/${slug}`
    } else if (relationTo === 'posts' || resourceType === 'Guide' || resourceType === 'News') {
      url = resourceType === 'Guide' || postType === 'guide' ? `/guides/${slug}` : `/news/${slug}`
    } else {
      url = `/${slug}`
    }
  } else if (!url) {
    url = '#'
  }

  // 3. Resolve Relevant Excerpt
  let excerpt =
    item.excerpt ||
    docVal?.excerpt ||
    docVal?.summary ||
    item.meta?.description ||
    docVal?.meta?.description ||
    ''

  if (typeof excerpt !== 'string') {
    excerpt = ''
  }

  // 4. Resolve Image URL from candidate images
  let imageUrl: string | null = null
  const candidateImages = [
    item.imageUrl,
    item.meta?.image,
    docVal?.heroImage,
    docVal?.meta?.image,
    item.heroImage,
  ]

  for (const img of candidateImages) {
    if (!img) continue
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('/'))) {
      imageUrl = img
      break
    }
    if (typeof img === 'object') {
      if (img.url) {
        imageUrl = img.url
        break
      }
      if (img.sizes?.medium?.url) {
        imageUrl = img.sizes.medium.url
        break
      }
      if (img.sizes?.large?.url) {
        imageUrl = img.sizes.large.url
        break
      }
      if (img.sizes?.small?.url) {
        imageUrl = img.sizes.small.url
        break
      }
    }
  }

  return {
    id,
    title: rawTitle,
    excerpt,
    resourceType,
    url,
    imageUrl,
  }
}

function getResourceIcon(type: string) {
  const normalized = type.toLowerCase()
  switch (normalized) {
    case 'event':
      return <Calendar className="w-3.5 h-3.5" />
    case 'case':
      return <Briefcase className="w-3.5 h-3.5" />
    case 'guide':
      return <BookOpen className="w-3.5 h-3.5" />
    case 'news':
      return <Newspaper className="w-3.5 h-3.5" />
    case 'practice area':
      return <Scale className="w-3.5 h-3.5" />
    case 'vacancy':
      return <UserCheck className="w-3.5 h-3.5" />
    case 'page':
      return <FileText className="w-3.5 h-3.5" />
    default:
      return <FolderKanban className="w-3.5 h-3.5" />
  }
}

export function UniversalCard({
  data,
  className = '',
}: {
  data: UniversalCardData
  className?: string
}) {
  const { title, excerpt, resourceType, url, imageUrl } = data
  const icon = getResourceIcon(resourceType)

  return (
    <article
      className={`group flex flex-col h-full bg-white dark:bg-background border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-crimson/50 dark:hover:border-brand-crimson/50 transition-all duration-300 font-body ${className}`}
    >
      {/* Card Header / Image */}
      {imageUrl ? (
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-100 dark:bg-black/40 shrink-0">
          <Link href={url} className="block w-full h-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider bg-brand-crimson text-white shadow-md">
              {icon}
              <span>{resourceType}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="relative h-28 w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-black/40 dark:to-black/20 border-b border-gray-100 dark:border-gray-800/80 p-5 flex items-center justify-between shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider bg-brand-crimson text-white shadow-sm">
            {icon}
            <span>{resourceType}</span>
          </span>
          <div className="text-gray-300 dark:text-gray-700 opacity-60">
            {React.cloneElement(icon, { className: 'w-8 h-8' })}
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-charcoal dark:text-white group-hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors line-clamp-2 mb-3 leading-snug">
            <Link href={url} className="hover:text-brand-crimson dark:hover:text-brand-crimson transition-colors">
              {title}
            </Link>
          </h3>

          <p className="text-brand-slate dark:text-gray-400 text-sm md:text-[15px] leading-relaxed line-clamp-3 mb-6">
            {excerpt || `Discover more details about this ${resourceType.toLowerCase()} from A L Law Associates.`}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
          <Link
            href={url}
            className="text-brand-crimson dark:text-brand-crimson font-heading font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
          >
            <span>Read Details</span>
            <ChevronsRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default UniversalCard
