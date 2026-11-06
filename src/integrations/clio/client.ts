/**
 * Clio API v4 REST Client
 * Implements one-way website intake push:
 * - Contact search / creation with consent tracking (D-01, D-07)
 * - Pending Matter creation with department routing and UTM tracking (D-02, D-05, D-06)
 * - 3-step S3 document upload for form attachments (D-20)
 * - Graceful fallback when tokens are not configured (D-03)
 */

export interface ContactConsentInfo {
  privacyPolicyAgreed?: boolean
  marketingOptIn?: boolean
  timestamp?: string
}

export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  landing_url?: string
}

export interface CreateMatterOptions {
  contactId: number | string
  description?: string
  practiceArea?: string
  utmParams?: UtmParams
}

const getBaseUrl = (): string => {
  return (process.env.CLIO_API_URL || 'https://eu.app.clio.com').replace(/\/+$/, '')
}

const getAuthHeaders = (): HeadersInit | null => {
  const token = process.env.CLIO_ACCESS_TOKEN
  if (!token || token.startsWith('mock_') || token === 'placeholder') {
    return null
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Searches for an existing contact by email or creates a new Person contact.
 */
export async function findOrCreateContact(
  email: string,
  name?: string,
  phone?: string,
  consentInfo?: ContactConsentInfo,
): Promise<{ success: boolean; contactId?: number | string; error?: string }> {
  const headers = getAuthHeaders()
  if (!headers) {
    console.warn('[Clio API] CLIO_ACCESS_TOKEN not configured. Skipping Clio contact intake.')
    return { success: false, error: 'CLIO_ACCESS_TOKEN not configured.' }
  }

  const baseUrl = getBaseUrl()

  try {
    // 1. Search existing contact by email
    const searchUrl = `${baseUrl}/api/v4/contacts.json?query=${encodeURIComponent(email)}&type=Person`
    const searchRes = await fetch(searchUrl, { headers })

    if (searchRes.ok) {
      const searchData = await searchRes.json()
      if (searchData.data && searchData.data.length > 0) {
        return { success: true, contactId: searchData.data[0].id }
      }
    }

    // 2. Parse name parts
    const trimmedName = (name || '').trim()
    const nameParts = trimmedName.split(/\s+/)
    const firstName = nameParts[0] || 'Inquiry'
    const lastName = nameParts.slice(1).join(' ') || 'Client'

    // 3. Format consent notes for compliance audit trail (D-07)
    const consentTime = consentInfo?.timestamp || new Date().toISOString()
    const consentNote = [
      `Website Lead Intake — ${consentTime}`,
      `Privacy Policy Agreed: ${consentInfo?.privacyPolicyAgreed !== false ? 'Yes' : 'No'}`,
      `Marketing Opt-In: ${consentInfo?.marketingOptIn ? 'Yes' : 'No'}`,
    ].join('\n')

    const createPayload: Record<string, any> = {
      data: {
        type: 'Person',
        first_name: firstName,
        last_name: lastName,
        email_addresses: [
          {
            address: email,
            name: 'Work',
            default: true,
          },
        ],
        notes: consentNote,
      },
    }

    if (phone) {
      createPayload.data.phone_numbers = [
        {
          number: phone,
          name: 'Mobile',
          default: true,
        },
      ]
    }

    const createRes = await fetch(`${baseUrl}/api/v4/contacts.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify(createPayload),
    })

    if (!createRes.ok) {
      const errBody = await createRes.text()
      console.error('[Clio API] Failed to create contact:', createRes.status, errBody)
      return { success: false, error: `Clio contact creation failed: ${createRes.status}` }
    }

    const createData = await createRes.json()
    return { success: true, contactId: createData.data?.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error during Clio contact intake'
    console.error('[Clio API] Exception in findOrCreateContact:', msg)
    return { success: false, error: msg }
  }
}

/**
 * Creates a new matter in Clio with status "Pending" and UTM referral tracking.
 */
export async function createMatter(
  options: CreateMatterOptions,
): Promise<{ success: boolean; matterId?: number | string; error?: string }> {
  const headers = getAuthHeaders()
  if (!headers) {
    console.warn('[Clio API] CLIO_ACCESS_TOKEN not configured. Skipping Clio matter creation.')
    return { success: false, error: 'CLIO_ACCESS_TOKEN not configured.' }
  }

  const baseUrl = getBaseUrl()

  try {
    // Build description with UTM details (D-06)
    const descriptionLines: string[] = []
    if (options.practiceArea) {
      descriptionLines.push(`Practice Area: ${options.practiceArea}`)
    }
    if (options.description) {
      descriptionLines.push(`Inquiry Message:\n${options.description}`)
    }

    if (options.utmParams) {
      descriptionLines.push('\n--- Marketing Attribution ---')
      if (options.utmParams.utm_source) descriptionLines.push(`UTM Source: ${options.utmParams.utm_source}`)
      if (options.utmParams.utm_medium) descriptionLines.push(`UTM Medium: ${options.utmParams.utm_medium}`)
      if (options.utmParams.utm_campaign) descriptionLines.push(`UTM Campaign: ${options.utmParams.utm_campaign}`)
      if (options.utmParams.landing_url) descriptionLines.push(`Landing URL: ${options.utmParams.landing_url}`)
    }

    const payload = {
      data: {
        client: {
          id: Number(options.contactId) || options.contactId,
        },
        description: descriptionLines.join('\n'),
        status: 'Pending', // Strictly "Pending" (D-05)
      },
    }

    const res = await fetch(`${baseUrl}/api/v4/matters.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errBody = await res.text()
      console.error('[Clio API] Failed to create matter:', res.status, errBody)
      return { success: false, error: `Clio matter creation failed: ${res.status}` }
    }

    const resData = await res.json()
    return { success: true, matterId: resData.data?.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error during Clio matter creation'
    console.error('[Clio API] Exception in createMatter:', msg)
    return { success: false, error: msg }
  }
}

/**
 * Uploads a document to Clio via the 3-step S3 flow (D-20):
 * 1. POST /api/v4/documents.json with metadata -> returns presigned `put_url`
 * 2. PUT binary to `put_url`
 * 3. PATCH /api/v4/documents/{id}.json with { fully_uploaded: true }
 */
export async function uploadMatterDocument(
  matterId: number | string,
  fileBuffer: Buffer | ArrayBuffer,
  filename: string,
  mimeType: string,
): Promise<{ success: boolean; documentId?: number | string; error?: string }> {
  const headers = getAuthHeaders()
  if (!headers) {
    return { success: false, error: 'CLIO_ACCESS_TOKEN not configured.' }
  }

  const baseUrl = getBaseUrl()

  try {
    // Step 1: Initialize document record
    const initRes = await fetch(`${baseUrl}/api/v4/documents.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          name: filename,
          parent: {
            id: Number(matterId) || matterId,
            type: 'Matter',
          },
        },
      }),
    })

    if (!initRes.ok) {
      const errBody = await initRes.text()
      console.error('[Clio API] Step 1 doc init failed:', initRes.status, errBody)
      return { success: false, error: `Step 1 doc init failed: ${initRes.status}` }
    }

    const initData = await initRes.json()
    const documentId = initData.data?.id
    const putUrl = initData.data?.latest_document_version?.put_url

    if (!putUrl || !documentId) {
      return { success: false, error: 'Missing put_url or documentId from Clio API response.' }
    }

    // Step 2: Upload file data directly to S3 presigned URL
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType || 'application/octet-stream',
      },
      body: fileBuffer,
    })

    if (!putRes.ok) {
      console.error('[Clio API] Step 2 S3 upload failed:', putRes.status)
      return { success: false, error: `Step 2 S3 upload failed: ${putRes.status}` }
    }

    // Step 3: Mark document as fully uploaded
    const patchRes = await fetch(`${baseUrl}/api/v4/documents/${documentId}.json`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        data: {
          fully_uploaded: true,
        },
      }),
    })

    if (!patchRes.ok) {
      console.error('[Clio API] Step 3 patch failed:', patchRes.status)
      return { success: false, error: `Step 3 patch failed: ${patchRes.status}` }
    }

    return { success: true, documentId }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error during Clio document upload'
    console.error('[Clio API] Exception in uploadMatterDocument:', msg)
    return { success: false, error: msg }
  }
}
