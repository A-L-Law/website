import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  CLIO_EU_TOKEN_URL,
  getValidClioAccessToken,
  isTokenExpiringSoon,
  type ClioTokenRecord,
  type ClioTokenStore,
} from '@/integrations/clio/auth'
import { clioFetch } from '@/integrations/clio/client'
import { ClioAuth } from '@/globals/ClioAuth/config'

function createMemoryStore(initial: ClioTokenRecord | null): ClioTokenStore & {
  state: ClioTokenRecord | null
  saveCount: number
} {
  const store = {
    state: initial ? { ...initial } : null,
    saveCount: 0,
    async getTokens() {
      return store.state ? { ...store.state } : null
    },
    async saveTokens(record: ClioTokenRecord) {
      store.saveCount += 1
      store.state = { ...record }
    },
  }
  return store
}

describe('Clio EU Platform OAuth Token Refresh', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    process.env.CLIO_CLIENT_ID = 'test_client_id_123'
    process.env.CLIO_CLIENT_SECRET = 'super_secret_client_value_xyz'
    delete process.env.CLIO_OAUTH_TOKEN_URL
    delete process.env.CLIO_ACCESS_TOKEN
    delete process.env.CLIO_REFRESH_TOKEN
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.restoreAllMocks()
  })

  it('locks down ClioAuth Payload Global from external reads, writes, and Admin UI', () => {
    expect(ClioAuth.slug).toBe('clio-auth')
    expect(ClioAuth.admin?.hidden).toBe(true)
    expect((ClioAuth.access?.read as any)({})).toBe(false)
    expect((ClioAuth.access?.update as any)({})).toBe(false)
  })

  it('returns cached token without HTTP refresh when not expiring within 5 minutes', async () => {
    const fixedNow = Date.parse('2026-11-25T10:00:00.000Z')
    const store = createMemoryStore({
      accessToken: 'valid_cached_access_token',
      refreshToken: 'valid_refresh_token',
      expiresAt: new Date(fixedNow + 60 * 60 * 1000).toISOString(), // 1 hour from now
      status: 'active',
    })

    const fetchMock = vi.fn()
    const token = await getValidClioAccessToken({
      store,
      fetchFn: fetchMock as unknown as typeof fetch,
      nowMs: () => fixedNow,
    })

    expect(token).toBe('valid_cached_access_token')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(store.saveCount).toBe(0)
  })

  it('refreshes and immediately overwrites both tokens and UTC expires_at when within 5-minute buffer', async () => {
    const fixedNow = Date.parse('2026-11-25T10:00:00.000Z')
    const store = createMemoryStore({
      accessToken: 'old_access_token_secret',
      refreshToken: 'old_refresh_token_secret',
      expiresAt: new Date(fixedNow + 4 * 60 * 1000).toISOString(), // 4 minutes left (< 5 min)
      status: 'active',
    })

    expect(isTokenExpiringSoon(store.state?.expiresAt, fixedNow)).toBe(true)

    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      expect(url).toBe(CLIO_EU_TOKEN_URL)
      expect(init?.method).toBe('POST')
      expect((init?.headers as Record<string, string>)['Content-Type']).toBe(
        'application/x-www-form-urlencoded',
      )

      const params = new URLSearchParams(String(init?.body))
      expect(params.get('client_id')).toBe('test_client_id_123')
      expect(params.get('client_secret')).toBe('super_secret_client_value_xyz')
      expect(params.get('grant_type')).toBe('refresh_token')
      expect(params.get('refresh_token')).toBe('old_refresh_token_secret')

      return new Response(
        JSON.stringify({
          access_token: 'new_rotated_access_token',
          refresh_token: 'new_rotated_refresh_token',
          expires_in: 86400,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    })

    const token = await getValidClioAccessToken({
      store,
      fetchFn: fetchMock as unknown as typeof fetch,
      nowMs: () => fixedNow,
    })

    expect(token).toBe('new_rotated_access_token')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(store.saveCount).toBe(1)
    expect(store.state?.accessToken).toBe('new_rotated_access_token')
    expect(store.state?.refreshToken).toBe('new_rotated_refresh_token')
    expect(store.state?.expiresAt).toBe(new Date(fixedNow + 86400 * 1000).toISOString())
    expect(store.state?.status).toBe('active')
  })

  it('coalesces concurrent callers onto a single POST refresh request (prevents race conditions)', async () => {
    const fixedNow = Date.parse('2026-11-25T10:00:00.000Z')
    const store = createMemoryStore({
      accessToken: 'expired_token',
      refreshToken: 'single_use_refresh_token',
      expiresAt: new Date(fixedNow - 1000).toISOString(), // already expired
      status: 'active',
    })

    let resolveFetch!: (res: Response) => void
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve
        }),
    )

    // Launch 5 concurrent callers simultaneously
    const promises = Array.from({ length: 5 }, () =>
      getValidClioAccessToken({
        store,
        fetchFn: fetchMock as unknown as typeof fetch,
        nowMs: () => fixedNow,
      }),
    )

    // Allow microtasks to queue onto the mutex
    await Promise.resolve()
    await Promise.resolve()

    expect(fetchMock).toHaveBeenCalledTimes(1)

    resolveFetch(
      new Response(
        JSON.stringify({
          access_token: 'shared_new_access_token',
          refresh_token: 'shared_new_refresh_token',
          expires_in: 86400,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    const results = await Promise.all(promises)
    expect(results).toEqual([
      'shared_new_access_token',
      'shared_new_access_token',
      'shared_new_access_token',
      'shared_new_access_token',
      'shared_new_access_token',
    ])
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(store.saveCount).toBe(1)
    expect(store.state?.refreshToken).toBe('shared_new_refresh_token')
  })

  it('retries once with a freshly refreshed token when Clio API returns 401 Unauthorized', async () => {
    const futureExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    const store = createMemoryStore({
      accessToken: 'revoked_before_expiry_token',
      refreshToken: 'working_refresh_token',
      expiresAt: futureExpiry,
      status: 'active',
    })

    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      const urlStr = String(url)
      if (urlStr === CLIO_EU_TOKEN_URL) {
        return new Response(
          JSON.stringify({
            access_token: 'fresh_token_after_401',
            refresh_token: 'fresh_refresh_after_401',
            expires_in: 86400,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        )
      }

      const authHeader = (init?.headers as Record<string, string>)?.Authorization
      if (authHeader === 'Bearer revoked_before_expiry_token') {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }
      if (authHeader === 'Bearer fresh_token_after_401') {
        return new Response(JSON.stringify({ data: { id: 999 } }), { status: 200 })
      }

      return new Response('Unexpected auth header', { status: 500 })
    })

    const res = await clioFetch('/api/v4/contacts.json?query=test', {
      store,
      fetchFn: fetchMock as unknown as typeof fetch,
    })

    expect(res).not.toBeNull()
    expect(res?.status).toBe(200)
    const json = await res?.json()
    expect(json).toEqual({ data: { id: 999 } })

    // 1 initial API call (401) + 1 OAuth refresh POST + 1 retried API call (200)
    expect(fetchMock).toHaveBeenCalledTimes(3)
    expect(store.state?.accessToken).toBe('fresh_token_after_401')
    expect(store.state?.refreshToken).toBe('fresh_refresh_after_401')
  })

  it('handles invalid_grant (400/401) gracefully, marks reauth_required, and never logs secrets', async () => {
    const fixedNow = Date.parse('2026-11-25T10:00:00.000Z')
    const store = createMemoryStore({
      accessToken: 'secret_access_tok_do_not_log',
      refreshToken: 'secret_refresh_tok_do_not_log',
      expiresAt: new Date(fixedNow - 1000).toISOString(),
      status: 'active',
    })

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          error: 'invalid_grant',
          error_description: 'The refresh token is invalid or expired.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    })

    const token = await getValidClioAccessToken({
      store,
      fetchFn: fetchMock as unknown as typeof fetch,
      nowMs: () => fixedNow,
    })

    expect(token).toBeNull()
    expect(store.state?.status).toBe('reauth_required')
    expect(errorSpy).toHaveBeenCalledTimes(1)

    const allLoggedOutput = [
      ...errorSpy.mock.calls.flat(),
      ...warnSpy.mock.calls.flat(),
      ...logSpy.mock.calls.flat(),
    ].join(' ')

    expect(allLoggedOutput).toContain('invalid_grant')
    expect(allLoggedOutput).toContain('Manual re-authorization')
    expect(allLoggedOutput).not.toContain('super_secret_client_value_xyz')
    expect(allLoggedOutput).not.toContain('secret_access_tok_do_not_log')
    expect(allLoggedOutput).not.toContain('secret_refresh_tok_do_not_log')
  })
})
