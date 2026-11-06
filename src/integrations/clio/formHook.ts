import type { CollectionAfterChangeHook } from 'payload'
import { findOrCreateContact, createMatter, uploadMatterDocument, UtmParams } from './client'
import { syncContactToAudience } from '../resend/audiences'

/**
 * Form Submission AfterChange Hook:
 * 1. Skips Clio for Job Vacancies/Careers forms (routes exclusively to HR via Resend) (D-04)
 * 2. Syncs marketing opt-ins to Resend Audiences if affirmative consent is present (D-12)
 * 3. Dispatches inquiries to Clio API v4 (contact creation, Pending matter, file uploads) (D-01, D-02, D-05, D-06, D-20)
 * 4. Catches all CRM errors gracefully without failing the form submission (D-03)
 */
export const afterFormSubmission: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  // Only process new submissions
  if (operation !== 'create') {
    return doc
  }

  try {
    const { payload } = req
    const formId = typeof doc.form === 'object' && doc.form !== null ? doc.form.id : doc.form

    // Retrieve full Form document to inspect title, slug, and settings
    let formDoc: any = null
    if (formId) {
      try {
        formDoc = await payload.findByID({
          collection: 'forms',
          id: formId,
          req,
        })
      } catch (err) {
        req.payload.logger.warn({ msg: `Could not load form ${formId} in afterFormSubmission` })
      }
    }

    const formTitle = (formDoc?.title || '').toLowerCase()
    const isCareersForm =
      formTitle.includes('vacancy') ||
      formTitle.includes('vacancies') ||
      formTitle.includes('career') ||
      formTitle.includes('job') ||
      formTitle.includes('apply')

    // D-04: Job vacancy applications bypass Clio entirely and route exclusively to HR
    if (isCareersForm) {
      req.payload.logger.info({
        msg: `Form submission for "${formDoc?.title || formId}" identified as career application. Bypassing Clio CRM intake.`,
      })
      return doc
    }

    // Extract fields from submissionData
    const submissionData: Array<{ field: string; value: any }> = doc.submissionData || []
    const fieldMap: Record<string, any> = {}
    for (const item of submissionData) {
      if (item && item.field) {
        fieldMap[item.field] = item.value
      }
    }

    const email = fieldMap.email || fieldMap.emailAddress || fieldMap.contactEmail
    if (!email) {
      // Inquiries without email cannot be routed to Clio
      return doc
    }

    const name = fieldMap.name || fieldMap.fullName || `${fieldMap.firstName || ''} ${fieldMap.lastName || ''}`.trim()
    const phone = fieldMap.phone || fieldMap.phoneNumber || fieldMap.mobile
    const message = fieldMap.message || fieldMap.inquiry || fieldMap.details || ''
    const practiceArea = fieldMap.practiceArea || fieldMap.service || fieldMap.department || ''

    // Marketing opt-in check (D-12): strict boolean check for consent checkbox
    const marketingOptIn =
      Boolean(fieldMap.newsletter) ||
      Boolean(fieldMap.marketingOptIn) ||
      Boolean(fieldMap.marketing) ||
      Boolean(fieldMap.subscribe)

    // Sync to Resend Audiences if opted in
    if (marketingOptIn) {
      const nameParts = (name || '').trim().split(/\s+/)
      const firstName = nameParts[0] || undefined
      const lastName = nameParts.slice(1).join(' ') || undefined
      const audienceId = formDoc?.resendAudienceId || 'General'

      void syncContactToAudience({
        email,
        firstName,
        lastName,
        audienceId,
      })
    }

    // Prepare UTM parameters
    const utmParams: UtmParams = {
      utm_source: fieldMap.utm_source,
      utm_medium: fieldMap.utm_medium,
      utm_campaign: fieldMap.utm_campaign,
      utm_content: fieldMap.utm_content,
      utm_term: fieldMap.utm_term,
      landing_url: fieldMap.landing_url || fieldMap.pageUrl,
    }

    // Push Lead to Clio CRM (D-01, D-05)
    const contactResult = await findOrCreateContact(email, name, phone, {
      privacyPolicyAgreed: true,
      marketingOptIn,
    })

    if (!contactResult.success || !contactResult.contactId) {
      req.payload.logger.warn({
        msg: `Clio contact intake skipped or failed: ${contactResult.error}`,
      })
      return doc
    }

    const matterResult = await createMatter({
      contactId: contactResult.contactId,
      description: message,
      practiceArea,
      utmParams,
    })

    if (!matterResult.success || !matterResult.matterId) {
      req.payload.logger.warn({
        msg: `Clio matter creation skipped or failed: ${matterResult.error}`,
      })
      return doc
    }

    // Push Uploaded Documents to Clio Matter (D-20)
    const submissionUploads = doc.submissionUploads || []
    if (Array.isArray(submissionUploads) && submissionUploads.length > 0) {
      for (const uploadItem of submissionUploads) {
        const fileItems = Array.isArray(uploadItem.value) ? uploadItem.value : [uploadItem.value]
        for (const item of fileItems) {
          const fileId = typeof item === 'object' && item !== null ? item.value || item.id : item
          const relationTo = (typeof item === 'object' && item !== null ? item.relationTo : null) || 'media'

          if (fileId) {
            try {
              const mediaDoc: any = await payload.findByID({
                collection: relationTo,
                id: fileId,
                req,
              })

              if (mediaDoc && mediaDoc.url) {
                // Fetch file binary
                const fileRes = await fetch(mediaDoc.url)
                if (fileRes.ok) {
                  const arrayBuffer = await fileRes.arrayBuffer()
                  const buffer = Buffer.from(arrayBuffer)
                  await uploadMatterDocument(
                    matterResult.matterId,
                    buffer,
                    mediaDoc.filename || 'supporting-document.pdf',
                    mediaDoc.mimeType || 'application/pdf',
                  )
                }
              }
            } catch (err) {
              req.payload.logger.warn({
                msg: `Failed to upload document ${fileId} to Clio matter ${matterResult.matterId}: ${(err as Error).message}`,
              })
            }
          }
        }
      }
    }
  } catch (err) {
    // T-03-06: Catch and log all errors; never throw or fail user submission
    req.payload.logger.error({
      msg: `Unexpected error in afterFormSubmission hook: ${(err as Error).message}`,
    })
  }

  return doc
}
