import React from 'react'
import { getServerSideURL } from './getURL'

export interface TaggedEntity {
  name: string
  slug: string
  schemaType?: string
  description?: string | null
  sameAs?: Array<{ url: string } | string> | null
}

export function extractPlainText(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (content.text) return content.text
  if (Array.isArray(content.children)) {
    return content.children.map(extractPlainText).join(' ').trim()
  }
  if (content.root) {
    return extractPlainText(content.root)
  }
  return ''
}

export function formatIsoDate(dateVal?: string | Date | null): string | undefined {
  if (!dateVal) return undefined
  try {
    const d = new Date(dateVal)
    if (isNaN(d.getTime())) return undefined
    return d.toISOString()
  } catch {
    return undefined
  }
}

/**
 * Root firm organization schema (D-21)
 */
export function getRootOrganizationSchema(siteUrl = getServerSideURL()) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  return {
    '@type': 'LegalService',
    '@id': `${cleanSiteUrl}/#organization`,
    name: 'A L Law',
    legalName: 'A L Law Solicitors',
    url: cleanSiteUrl,
    telephone: '+44 20 8952 0242',
    email: 'info@al-lawassociates.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, 240-244 Edgware Road',
      addressLocality: 'London',
      postalCode: 'NW9 6NB',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5947,
      longitude: -0.2472,
    },
    priceRange: '£££',
    sameAs: ['https://www.linkedin.com/company/al-law-solicitors', 'https://twitter.com/allaw_uk'],
  }
}

/**
 * Hub: Attorney / Solicitor (Team profile) (D-22)
 */
export function getAttorneySchema(member: any, siteUrl = getServerSideURL(), pageUrl: string) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const image =
    typeof member?.photo === 'object' && member.photo?.url ? member.photo.url : undefined
  const description = member?.bio
    ? extractPlainText(member.bio)
    : member?.excerpt || member?.meta?.description || ''

  return {
    '@type': 'Attorney',
    '@id': `${pageUrl}#attorney`,
    name: member?.name || member?.title || 'Solicitor',
    jobTitle: member?.role || member?.jobTitle || 'Solicitor',
    description: description || undefined,
    image: image ? (image.startsWith('http') ? image : `${cleanSiteUrl}${image}`) : undefined,
    email: member?.email || undefined,
    telephone: member?.phone || undefined,
    worksFor: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
  }
}

/**
 * Hub: NewsArticle or Article (News & Guides) (D-22)
 */
export function getArticleSchema(post: any, siteUrl = getServerSideURL(), pageUrl: string) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const isNews = post?.postType === 'news'
  const heroImage =
    typeof post?.heroImage === 'object' && post.heroImage?.url ? post.heroImage.url : undefined
  const metaImage =
    typeof post?.meta?.image === 'object' && post.meta.image?.url ? post.meta.image.url : undefined
  const img = metaImage || heroImage

  const authorName =
    post?.authors && Array.isArray(post.authors) && post.authors.length > 0
      ? typeof post.authors[0] === 'object'
        ? post.authors[0].name
        : post.authors[0]
      : undefined

  const description = post?.excerpt || post?.meta?.description || extractPlainText(post?.content)

  return {
    '@type': isNews ? 'NewsArticle' : 'Article',
    '@id': `${pageUrl}#article`,
    headline: post?.title || 'Article',
    description: description || undefined,
    datePublished: formatIsoDate(post?.publishedAt || post?.createdAt),
    dateModified: formatIsoDate(post?.updatedAt || post?.publishedAt || post?.createdAt),
    mainEntityOfPage: pageUrl,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
        }
      : {
          '@id': `${cleanSiteUrl}/#organization`,
        },
    publisher: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
    image: img ? (img.startsWith('http') ? img : `${cleanSiteUrl}${img}`) : undefined,
  }
}

/**
 * Hub: JobPosting (Vacancies) (D-22)
 */
export function getJobPostingSchema(vacancy: any, siteUrl = getServerSideURL(), pageUrl: string) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const description = vacancy?.excerpt || extractPlainText(vacancy?.content) || vacancy?.title || ''

  return {
    '@type': 'JobPosting',
    '@id': `${pageUrl}#job`,
    title: vacancy?.title || 'Legal Vacancy',
    description: description || undefined,
    datePosted: formatIsoDate(vacancy?.createdAt || new Date()),
    validThrough: formatIsoDate(vacancy?.closingDate),
    employmentType: vacancy?.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB',
      },
    },
  }
}

/**
 * Hub: Event (Events & Webinars) (D-22)
 */
export function getEventSchema(event: any, siteUrl = getServerSideURL(), pageUrl: string) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const description = event?.excerpt || extractPlainText(event?.content) || event?.title || ''
  const isOnline = event?.location?.type === 'onlineLink' || event?.locationType === 'onlineLink'

  return {
    '@type': 'Event',
    '@id': `${pageUrl}#event`,
    name: event?.title || 'Legal Seminar',
    description: description || undefined,
    startDate: formatIsoDate(event?.startDate || event?.date || event?.createdAt),
    endDate: formatIsoDate(event?.endDate || event?.startDate || event?.date),
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: isOnline
      ? {
          '@type': 'VirtualLocation',
          url: event?.location?.onlineLinkUrl || cleanSiteUrl,
        }
      : {
          '@type': 'Place',
          name: event?.venueName || 'A L Law London Office',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'London',
            addressCountry: 'GB',
          },
        },
    organizer: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
  }
}

/**
 * Hub: Service / LegalService (Practice Areas) (D-22)
 */
export function getServiceSchema(practiceArea: any, siteUrl = getServerSideURL(), pageUrl: string) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const description =
    practiceArea?.summary ||
    practiceArea?.excerpt ||
    extractPlainText(practiceArea?.content) ||
    practiceArea?.title ||
    ''

  return {
    '@type': 'LegalService',
    '@id': `${pageUrl}#service`,
    name: practiceArea?.title || 'Practice Area',
    description: description || undefined,
    provider: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
    serviceType: 'Legal Services',
    areaServed: 'GB',
  }
}

/**
 * Build connected entity nodes from the Entities collection (D-23)
 */
export function getEntityNodes(entities: TaggedEntity[] = [], siteUrl = getServerSideURL()) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  return entities.map((entity) => {
    const sameAsUrls = (entity.sameAs || [])
      .map((item) => (typeof item === 'string' ? item : item?.url))
      .filter(Boolean)

    return {
      '@type': entity.schemaType || 'Thing',
      '@id': `${cleanSiteUrl}/entities/${entity.slug}#entity`,
      name: entity.name,
      description: entity.description || undefined,
      sameAs: sameAsUrls.length > 0 ? sameAsUrls : undefined,
    }
  })
}

export interface BuildGraphSchemaOptions {
  pageUrl: string
  pageTitle?: string
  primaryNode?: Record<string, any>
  taggedEntities?: TaggedEntity[]
  siteUrl?: string
}

/**
 * Assemble unified @graph JSON-LD schema (D-23)
 */
export function buildGraphSchema({
  pageUrl,
  pageTitle,
  primaryNode,
  taggedEntities = [],
  siteUrl = getServerSideURL(),
}: BuildGraphSchemaOptions) {
  const cleanSiteUrl = siteUrl.replace(/\/+$/, '')
  const rootOrg = getRootOrganizationSchema(cleanSiteUrl)

  const webSiteNode = {
    '@type': 'WebSite',
    '@id': `${cleanSiteUrl}/#website`,
    url: cleanSiteUrl,
    name: 'A L Law',
    publisher: {
      '@id': `${cleanSiteUrl}/#organization`,
    },
  }

  const webPageNode: Record<string, any> = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle || 'A L Law',
    isPartOf: {
      '@id': `${cleanSiteUrl}/#website`,
    },
  }

  const entityNodes = getEntityNodes(taggedEntities, cleanSiteUrl)

  if (primaryNode) {
    webPageNode.about = { '@id': primaryNode['@id'] }

    // Connect tagged entities to primary entity node via mentions (D-23)
    if (entityNodes.length > 0) {
      primaryNode.mentions = entityNodes.map((n) => ({ '@id': n['@id'] }))
    }
  }

  const graphNodes = [rootOrg, webSiteNode, webPageNode]
  if (primaryNode) {
    graphNodes.push(primaryNode)
  }
  if (entityNodes.length > 0) {
    graphNodes.push(...entityNodes)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  }
}

/**
 * JSON-LD React Script Component with safe anti-XSS serialization (T-03-09)
 */
export const JsonLdScript: React.FC<{ schema: Record<string, any> }> = ({ schema }) => {
  const safeJson = JSON.stringify(schema).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />
}
export default JsonLdScript
