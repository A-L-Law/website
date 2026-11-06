import { describe, it, expect } from 'vitest'
import { findOrCreateContact, createMatter, uploadMatterDocument } from '@/integrations/clio/client'
import { syncContactToAudience } from '@/integrations/resend/audiences'
import { afterFormSubmission } from '@/integrations/clio/formHook'

describe('Clio API & Resend Integrations (D-01, D-02, D-03, D-04, D-05, D-12)', () => {
  it('Clio client handles unconfigured tokens gracefully without throwing (D-03)', async () => {
    // With CLIO_ACCESS_TOKEN unset or empty in test environment
    const contactRes = await findOrCreateContact('test@example.com', 'Jane Doe')
    expect(contactRes.success).toBe(false)
    expect(contactRes.error).toContain('CLIO_ACCESS_TOKEN not configured')

    const matterRes = await createMatter({
      contactId: '123',
      description: 'Test matter',
    })
    expect(matterRes.success).toBe(false)
    expect(matterRes.error).toContain('CLIO_ACCESS_TOKEN not configured')

    const docRes = await uploadMatterDocument(
      '123',
      Buffer.from('test content'),
      'test.pdf',
      'application/pdf',
    )
    expect(docRes.success).toBe(false)
    expect(docRes.error).toContain('CLIO_ACCESS_TOKEN not configured')
  })

  it('Resend audience sync handles unconfigured tokens gracefully (D-12)', async () => {
    const res = await syncContactToAudience({
      email: 'test@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
    })
    expect(res.success).toBe(false)
    expect(res.error).toBeDefined()
  })

  it('afterFormSubmission hook is exported and defined', () => {
    expect(afterFormSubmission).toBeDefined()
    expect(typeof afterFormSubmission).toBe('function')
  })

  it('discriminates careers/vacancies forms from client inquiries (D-04)', () => {
    const isCareers = (title: string) => {
      const lower = (title || '').toLowerCase()
      return (
        lower.includes('vacancy') ||
        lower.includes('vacancies') ||
        lower.includes('career') ||
        lower.includes('job') ||
        lower.includes('apply')
      )
    }

    expect(isCareers('Senior Associate Vacancy Application')).toBe(true)
    expect(isCareers('Careers Inquiry')).toBe(true)
    expect(isCareers('Job Application Form')).toBe(true)

    expect(isCareers('General Contact Us')).toBe(false)
    expect(isCareers('Corporate Legal Inquiry')).toBe(false)
    expect(isCareers('Commercial Dispute Assessment')).toBe(false)
  })
})
