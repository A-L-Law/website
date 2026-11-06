import { describe, it, expect } from 'vitest'
import { CookieConsent } from '@/globals/CookieConsent/config'

describe('CookieConsent Global Configuration', () => {
  it('defines the correct slug and settings group', () => {
    expect(CookieConsent.slug).toBe('cookie-consent')
    expect(CookieConsent.admin?.group).toBe('Settings')
  })

  it('contains expected fields for compliance and GA4 override', () => {
    const fieldNames = CookieConsent.fields.map((f: any) => f.name || f.type)
    expect(fieldNames).toContain('title')
    expect(fieldNames).toContain('description')
    expect(fieldNames).toContain('gaMeasurementId')
  })
})
