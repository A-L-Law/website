import { Resend } from 'resend'

export interface SyncContactOptions {
  email: string
  firstName?: string
  lastName?: string
  audienceId?: string
}

export async function syncContactToAudience(
  options: SyncContactOptions,
): Promise<{ success: boolean; data?: any; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey || apiKey === 're_placeholder_token' || apiKey.startsWith('re_mock')) {
    console.warn('[Resend Audience Sync] RESEND_API_KEY is not configured or is a mock token. Skipping audience sync.')
    return {
      success: false,
      error: 'RESEND_API_KEY is not configured.',
    }
  }

  try {
    const resend = new Resend(apiKey)
    const audienceId = options.audienceId && options.audienceId !== 'General'
      ? options.audienceId
      : process.env.RESEND_DEFAULT_AUDIENCE_ID

    if (!audienceId) {
      console.warn('[Resend Audience Sync] No audienceId provided and RESEND_DEFAULT_AUDIENCE_ID not set. Skipping.')
      return {
        success: false,
        error: 'No target audienceId configured.',
      }
    }

    const { data, error } = await resend.contacts.create({
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
      audienceId,
      unsubscribed: false,
    })

    if (error) {
      console.error('[Resend Audience Sync] Resend API error:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error during Resend contact sync'
    console.error('[Resend Audience Sync] Exception:', message)
    return { success: false, error: message }
  }
}
