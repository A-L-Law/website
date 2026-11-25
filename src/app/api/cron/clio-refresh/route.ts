import { NextRequest, NextResponse } from 'next/server'
import { getValidClioAccessToken } from '@/integrations/clio/auth'

/**
 * Proactive Clio EU OAuth token keep-alive cron endpoint.
 *
 * Scheduled via `vercel.json` every 20 hours so rotating refresh tokens remain warm
 * even during low-traffic periods. Protected by `CRON_SECRET`.
 * Never returns any token or secret values in the response.
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get('authorization')

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const token = await getValidClioAccessToken({ forceRefresh: true })

  if (!token) {
    return NextResponse.json(
      { ok: false, refreshed: false, message: 'Clio token refresh skipped or requires re-authorization.' },
      { status: 200 },
    )
  }

  return NextResponse.json({ ok: true, refreshed: true }, { status: 200 })
}
