import { describe, it, expect } from 'vitest'
import {
  getRootOrganizationSchema,
  getAttorneySchema,
  getArticleSchema,
  getJobPostingSchema,
  getEventSchema,
  getServiceSchema,
  buildGraphSchema,
  formatIsoDate,
} from '@/utilities/schemaGenerator'

describe('Schema.org JSON-LD Structured Data Generator (SEO-02, D-21, D-22, D-23)', () => {
  const siteUrl = 'https://al-lawassociates.com'

  it('generates root LegalService organization schema (D-21)', () => {
    const root = getRootOrganizationSchema(siteUrl)
    expect(root['@type']).toBe('LegalService')
    expect(root['@id']).toBe('https://al-lawassociates.com/#organization')
    expect(root.name).toBe('A L Law')
    expect(root.telephone).toBeDefined()
    expect(root.address).toBeDefined()
    expect(root.address['@type']).toBe('PostalAddress')
    expect(root.address.addressCountry).toBe('GB')
    expect(root.geo).toBeDefined()
    expect(root.geo['@type']).toBe('GeoCoordinates')
    expect(Array.isArray(root.sameAs)).toBe(true)
    expect(root.sameAs.length).toBeGreaterThan(0)
  })

  it('generates Attorney schema for team profiles (D-22)', () => {
    const member = {
      name: 'Amelia Clover',
      jobTitle: 'Senior Partner',
      email: 'a.clover@al-lawassociates.com',
      phone: '+44 20 7946 0123',
    }
    const pageUrl = `${siteUrl}/team/amelia-clover`
    const attorney = getAttorneySchema(member, siteUrl, pageUrl)

    expect(attorney['@type']).toBe('Attorney')
    expect(attorney['@id']).toBe(`${pageUrl}#attorney`)
    expect(attorney.name).toBe('Amelia Clover')
    expect(attorney.jobTitle).toBe('Senior Partner')
    expect(attorney.worksFor['@id']).toBe('https://al-lawassociates.com/#organization')
  })

  it('generates NewsArticle vs Article based on postType with ISO 8601 dates (D-22)', () => {
    const rawDate = '2026-11-06T12:00:00.000Z'
    const newsItem = {
      title: 'Supreme Court Ruling',
      postType: 'news',
      publishedAt: rawDate,
    }
    const newsPageUrl = `${siteUrl}/news/supreme-court-ruling`
    const newsSchema = getArticleSchema(newsItem, siteUrl, newsPageUrl)
    expect(newsSchema['@type']).toBe('NewsArticle')
    expect(newsSchema.datePublished).toBe(formatIsoDate(rawDate))
    expect(newsSchema.publisher['@id']).toBe('https://al-lawassociates.com/#organization')

    const guideItem = {
      title: 'Commercial Lease Checklist',
      postType: 'guide',
      publishedAt: rawDate,
    }
    const guidePageUrl = `${siteUrl}/guides/commercial-lease-checklist`
    const guideSchema = getArticleSchema(guideItem, siteUrl, guidePageUrl)
    expect(guideSchema['@type']).toBe('Article')
  })

  it('generates JobPosting schema for vacancies (D-22)', () => {
    const vacancy = {
      title: 'Senior Associate - Commercial Litigation',
      createdAt: '2026-11-01T10:00:00.000Z',
      closingDate: '2026-12-01T23:59:59.000Z',
    }
    const pageUrl = `${siteUrl}/vacancies/senior-associate`
    const job = getJobPostingSchema(vacancy, siteUrl, pageUrl)
    expect(job['@type']).toBe('JobPosting')
    expect(job['@id']).toBe(`${pageUrl}#job`)
    expect(job.hiringOrganization['@id']).toBe('https://al-lawassociates.com/#organization')
  })

  it('generates Event schema with online/offline attendance modes (D-22)', () => {
    const event = {
      title: 'UK Corporate Law Webinar',
      location: {
        type: 'onlineLink',
        onlineLinkUrl: 'https://zoom.us/j/123456789',
      },
      startDate: '2026-11-20T14:00:00.000Z',
    }
    const pageUrl = `${siteUrl}/events/corporate-law-webinar`
    const ev = getEventSchema(event, siteUrl, pageUrl)
    expect(ev['@type']).toBe('Event')
    expect(ev.eventAttendanceMode).toBe('https://schema.org/OnlineEventAttendanceMode')
    expect(ev.location['@type']).toBe('VirtualLocation')
  })

  it('generates Service schema for practice areas (D-22)', () => {
    const area = {
      title: 'Corporate & Commercial Law',
      summary: 'Advising corporations and entrepreneurs on corporate transactions.',
    }
    const pageUrl = `${siteUrl}/practice-areas/corporate-commercial-law`
    const service = getServiceSchema(area, siteUrl, pageUrl)
    expect(service['@type']).toBe('LegalService')
    expect(service.provider['@id']).toBe('https://al-lawassociates.com/#organization')
    expect(service.areaServed).toBe('GB')
  })

  it('assembles unified @graph with connected Entities and safe anti-XSS serialization (D-23, T-03-09)', () => {
    const pageUrl = `${siteUrl}/practice-areas/corporate-commercial-law`
    const primaryNode = getServiceSchema({ title: 'Corporate Law' }, siteUrl, pageUrl)
    const taggedEntities = [
      {
        name: 'Companies House',
        slug: 'companies-house',
        schemaType: 'GovernmentOrganization',
        sameAs: [{ url: 'https://www.wikidata.org/wiki/Q2990263' }],
      },
    ]

    const graph = buildGraphSchema({
      pageUrl,
      pageTitle: 'Corporate Law | A L Law',
      primaryNode,
      taggedEntities,
      siteUrl,
    })

    expect(graph['@context']).toBe('https://schema.org')
    expect(Array.isArray(graph['@graph'])).toBe(true)

    // Verify root org, webpage, primary node and entity are in graph
    const types = graph['@graph'].map((n: any) => n['@type'])
    expect(types).toContain('LegalService')
    expect(types).toContain('WebSite')
    expect(types).toContain('WebPage')
    expect(types).toContain('GovernmentOrganization')

    // Verify entity connection in mentions
    expect((primaryNode as any).mentions).toBeDefined()
    expect((primaryNode as any).mentions[0]['@id']).toBe(
      'https://al-lawassociates.com/entities/companies-house#entity',
    )

    // Verify anti-XSS serialization replaces < with \u003c
    const maliciousPayload = { test: '<script>alert("xss")</script>' }
    const serialized = JSON.stringify(maliciousPayload).replace(/</g, '\\u003c')
    expect(serialized).not.toContain('<script>')
    expect(serialized).toContain('\\u003cscript>')
  })
})
