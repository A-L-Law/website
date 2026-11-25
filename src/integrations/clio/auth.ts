/**
 * Clio EU Platform OAuth 2.0 Token Refresh Service
 *
 * - Persists rotating `access_token`, `refresh_token`, and UTC `expires_at` in Postgres
 *   via the server-only Payload Global (`clio-auth`).
 * - Proactively refreshes tokens within 5 minutes of expiry via
 *   `POST https://eu.auth.api.clio.com/oauth/token` (`application/x-www-form-urlencoded`).
 * - Uses an in-flight mutex per token store so concurrent callers coalesce onto a single
 *   refresh request (preventing rotating refresh token invalidation).
 * - Never logs secrets, tokens, or raw OAuth response payloads.
 */

export const CLIO_EU_TOKEN_URL = 'https://eu.auth.api.clio.com/oauth/token'
export const DEFAULT_EXPIRY_BUFFER_MS = 5 * 60 * 1000 // 5 minutes
const DEFAULT_EXPIRES_IN_SECONDS = 86400 // 24 hours

export type ClioConnectionStatus = 'active' | 'reauth_required' | 'unconfigured'

export interface ClioTokenRecord {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: string | null
  lastRefreshedAt?: string | null
  status?: ClioConnectionStatus | null
}

export interface ClioTokenStore {
  getTokens(): Promise<ClioTokenRecord | null>
  saveTokens(record: ClioTokenRecord): Promise<void>
}

export interface GetValidTokenOptions {
  /** Force a token refresh even if the cached token has not yet expired (e.g. on 401 or cron). */
  forceRefresh?: boolean
  /** The token that just failed with 401; if the store already rotated past it, skip re-refreshing. */
  failedToken?: string
  /** Custom expiry lead window in ms (defaults to 5 minutes). */
  bufferMs?: number
  /** Injectable token store (defaults to Payload Postgres global store). */
  store?: ClioTokenStore
  /** Injectable fetch implementation for testing. */
  fetchFn?: typeof fetch
  /** Injectable clock for testing. */
  nowMs?: () => number
}

const isPlaceholder = (value?: string | null): boolean => {
  if (!value) return true
  const trimmed = value.trim()
  return trimmed === '' || trimmed.startsWith('mock_') || trimmed === 'placeholder'
}

/**
 * Returns true if `expiresAt` is missing, invalid, in the past, or within `bufferMs` of `nowMs`.
 */
export function isTokenExpiringSoon(
  expiresAt: string | null | undefined,
  nowMs: number = Date.now(),
  bufferMs: number = DEFAULT_EXPIRY_BUFFER_MS,
): boolean {
  if (!expiresAt) return true
  const expiryTime = Date.parse(expiresAt)
  if (Number.isNaN(expiryTime)) return true
  return expiryTime - nowMs <= bufferMs
}

/**
 * Reads optional initial tokens from environment variables when the database store
 * has not yet been seeded.
 */
function readEnvBootstrapTokens(): ClioTokenRecord | null {
  const accessToken = !isPlaceholder(process.env.CLIO_ACCESS_TOKEN)
    ? process.env.CLIO_ACCESS_TOKEN!.trim()
    : null
  const refreshToken = !isPlaceholder(process.env.CLIO_REFRESH_TOKEN)
    ? process.env.CLIO_REFRESH_TOKEN!.trim()
    : null
  const expiresAt = process.env.CLIO_TOKEN_EXPIRES_AT?.trim() || null

  if (!accessToken && !refreshToken) {
    return null
  }

  return {
    accessToken,
    refreshToken,
    expiresAt,
    status: 'active',
  }
}

/**
 * Default Postgres-backed token store using Payload Local API (`overrideAccess: true`).
 * Uses dynamic imports so server config is not loaded prematurely during isolated unit tests.
 */
export class PayloadClioTokenStore implements ClioTokenStore {
  async getTokens(): Promise<ClioTokenRecord | null> {
    if (!process.env.POSTGRES_URL) {
      return readEnvBootstrapTokens()
    }

    try {
      const [{ getPayload }, { default: configPromise }] = await Promise.all([
        import('payload'),
        import('@payload-config'),
      ])
      const payload = await getPayload({ config: configPromise })
      const doc = (await payload.findGlobal({
        slug: 'clio-auth' as any,
        overrideAccess: true,
      })) as any

      const accessToken = !isPlaceholder(doc?.accessToken) ? String(doc.accessToken) : null
      const refreshToken = !isPlaceholder(doc?.refreshToken) ? String(doc.refreshToken) : null
      const expiresAt = doc?.expiresAt ? String(doc.expiresAt) : null

      if (accessToken || refreshToken) {
        return {
          accessToken,
          refreshToken,
          expiresAt,
          lastRefreshedAt: doc?.lastRefreshedAt ? String(doc.lastRefreshedAt) : null,
          status: doc?.status || 'active',
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown database read error'
      console.warn(`[Clio OAuth] Unable to read clio-auth global from database: ${message}`)
    }

    return readEnvBootstrapTokens()
  }

  async saveTokens(record: ClioTokenRecord): Promise<void> {
    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL is not configured; cannot persist Clio OAuth tokens.')
    }

    try {
      const [{ getPayload }, { default: configPromise }] = await Promise.all([
        import('payload'),
        import('@payload-config'),
      ])
      const payload = await getPayload({ config: configPromise })
      await payload.updateGlobal({
        slug: 'clio-auth' as any,
        overrideAccess: true,
        data: {
          accessToken: record.accessToken ?? '',
          refreshToken: record.refreshToken ?? '',
          expiresAt: record.expiresAt ?? null,
          lastRefreshedAt: record.lastRefreshedAt ?? new Date().toISOString(),
          status: record.status ?? 'active',
        } as any,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown database write error'
      console.error(`[Clio OAuth] Failed to persist rotated Clio tokens to database: ${message}`)
      throw err
    }
  }
}

let defaultStore: ClioTokenStore = new PayloadClioTokenStore()

/**
 * In-flight refresh mutex keyed by store instance.
 * Guarantees only one OAuth refresh request is ever in flight at a time per store.
 */
const inFlightRefreshes = new WeakMap<ClioTokenStore, Promise<string | null>>()

/**
 * Allows replacing the default store (primarily for testing or custom storage adapters).
 */
export function setDefaultClioTokenStore(store: ClioTokenStore): void {
  defaultStore = store
}

export function resetDefaultClioTokenStore(): void {
  defaultStore = new PayloadClioTokenStore()
}

async function performTokenRefresh(
  store: ClioTokenStore,
  currentRecord: ClioTokenRecord,
  fetchFn: typeof fetch,
  nowMs: () => number,
): Promise<string | null> {
  const clientId = process.env.CLIO_CLIENT_ID?.trim()
  const clientSecret = process.env.CLIO_CLIENT_SECRET?.trim()
  const refreshToken = currentRecord.refreshToken?.trim()

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn(
      '[Clio OAuth] Missing CLIO_CLIENT_ID, CLIO_CLIENT_SECRET, or stored refresh_token. Cannot refresh Clio access token.',
    )
    return null
  }

  const tokenUrl = (process.env.CLIO_OAUTH_TOKEN_URL || CLIO_EU_TOKEN_URL).trim()
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }).toString()

  try {
    const response = await fetchFn(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    if (response.status === 400 || response.status === 401) {
      let errorCode = 'unknown_error'
      try {
        const errJson = (await response.json()) as { error?: string }
        if (typeof errJson?.error === 'string' && errJson.error.length > 0) {
          errorCode = errJson.error
        }
      } catch {
        // Ignore body parse errors; never log raw body
      }

      console.error(
        `[Clio OAuth] Token refresh rejected (HTTP ${response.status}, error: ${errorCode}). Manual re-authorization with Clio EU is required.`,
      )

      try {
        await store.saveTokens({
          ...currentRecord,
          status: 'reauth_required',
        })
      } catch {
        // Best-effort status update; never crash
      }

      return null
    }

    if (!response.ok) {
      console.error(`[Clio OAuth] Token refresh failed with unexpected HTTP ${response.status}.`)
      return null
    }

    const data = (await response.json()) as {
      access_token?: string
      refresh_token?: string
      expires_in?: number
    }

    if (!data?.access_token) {
      console.error('[Clio OAuth] Token refresh response did not include an access_token.')
      return null
    }

    const expiresInSeconds =
      typeof data.expires_in === 'number' && data.expires_in > 0
        ? data.expires_in
        : DEFAULT_EXPIRES_IN_SECONDS
    const now = nowMs()
    const expiresAt = new Date(now + expiresInSeconds * 1000).toISOString()
    const nextRefreshToken = data.refresh_token || refreshToken

    await store.saveTokens({
      accessToken: data.access_token,
      refreshToken: nextRefreshToken,
      expiresAt,
      lastRefreshedAt: new Date(now).toISOString(),
      status: 'active',
    })

    return data.access_token
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network error'
    console.error(`[Clio OAuth] Exception during token refresh: ${message}`)
    return null
  }
}

/**
 * Returns a valid Clio EU access token, automatically refreshing and persisting
 * rotated tokens if the current token is expired or within 5 minutes of expiry.
 *
 * Concurrent callers share a single in-flight refresh promise so rotating refresh
 * tokens are never invalidated by parallel refresh calls.
 */
export async function getValidClioAccessToken(
  options: GetValidTokenOptions = {},
): Promise<string | null> {
  const {
    forceRefresh = false,
    failedToken,
    bufferMs = DEFAULT_EXPIRY_BUFFER_MS,
    store = defaultStore,
    fetchFn = fetch,
    nowMs = () => Date.now(),
  } = options

  // If a refresh is already in flight for this store, await the same promise immediately
  const existingFlight = inFlightRefreshes.get(store)
  if (existingFlight) {
    return existingFlight
  }

  const record = await store.getTokens()
  if (!record) {
    return null
  }

  // If caller forced refresh due to a 401 on `failedToken`, check if another request
  // already rotated to a newer valid token while this caller was awaiting.
  if (
    forceRefresh &&
    failedToken &&
    record.accessToken &&
    record.accessToken !== failedToken &&
    !isTokenExpiringSoon(record.expiresAt, nowMs(), bufferMs)
  ) {
    return record.accessToken
  }

  // Fast path: cached token is present and not expiring within the buffer window
  if (
    !forceRefresh &&
    record.accessToken &&
    !isTokenExpiringSoon(record.expiresAt, nowMs(), bufferMs)
  ) {
    return record.accessToken
  }

  // Legacy static-token fallback: accessToken exists with no refreshToken and no expiry
  if (!forceRefresh && record.accessToken && !record.refreshToken && !record.expiresAt) {
    return record.accessToken
  }

  // Re-check in-flight lock after the async store.getTokens() read so concurrent
  // callers that passed the initial check together still coalesce onto one POST.
  const racedFlight = inFlightRefreshes.get(store)
  if (racedFlight) {
    return racedFlight
  }

  const refreshPromise = performTokenRefresh(store, record, fetchFn, nowMs).finally(() => {
    inFlightRefreshes.delete(store)
  })

  inFlightRefreshes.set(store, refreshPromise)
  return refreshPromise
}
