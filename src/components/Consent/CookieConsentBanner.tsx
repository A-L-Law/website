'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

export interface CookieConsentData {
  title?: string | null
  description?: string | null
  privacyPolicyUrl?: string | null
  cookiePolicyUrl?: string | null
}

export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
  }
}

interface StoredConsent {
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export const CookieConsentBanner: React.FC<{ data?: CookieConsentData | null }> = ({ data }) => {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  const [analyticsConsent, setAnalyticsConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const updateGtagConsent = useCallback((analytics: boolean, marketing: boolean) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
      })
    }
  }, [])

  const saveConsent = useCallback(
    (analytics: boolean, marketing: boolean) => {
      const consentRecord: StoredConsent = {
        analytics,
        marketing,
        timestamp: new Date().toISOString(),
      }
      try {
        localStorage.setItem('al_law_cookie_consent', JSON.stringify(consentRecord))
      } catch (e) {
        console.warn('Unable to save cookie preferences to localStorage', e)
      }
      updateGtagConsent(analytics, marketing)
      setShowBanner(false)
      setShowPreferences(false)
    },
    [updateGtagConsent],
  )

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('al_law_cookie_consent')
      if (stored) {
        const parsed: StoredConsent = JSON.parse(stored)
        setAnalyticsConsent(Boolean(parsed.analytics))
        setMarketingConsent(Boolean(parsed.marketing))
        updateGtagConsent(Boolean(parsed.analytics), Boolean(parsed.marketing))
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }

    const handleOpenSettings = () => {
      setShowPreferences(true)
    }

    window.addEventListener('open-cookie-settings', handleOpenSettings)
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings)
    }
  }, [updateGtagConsent])

  if (!mounted) return null

  const title = data?.title || 'We value your privacy'
  const description =
    data?.description ||
    'We use cookies to enhance your browsing experience, provide personalized legal content, and analyze our traffic. By clicking "Accept All Cookies", you consent to our use of cookies.'
  const privacyUrl = data?.privacyPolicyUrl || '/privacy-policy'
  const cookieUrl = data?.cookiePolicyUrl || '/cookie-policy'

  return (
    <>
      {/* Floating Cookie Consent Banner */}
      {showBanner && !showPreferences && (
        <div
          role="dialog"
          aria-label="Cookie Consent"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-md w-[calc(100%-2rem)] sm:w-full bg-white dark:bg-background border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-2xl font-body transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="fal fa-cookie-bite text-brand-crimson text-2xl mt-0.5" aria-hidden="true"></span>
            <div>
              <h3 className="font-heading font-bold text-lg text-brand-charcoal dark:text-white">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-brand-slate dark:text-gray-300 mb-4 leading-relaxed">
            {description}{' '}
            <Link
              href={cookieUrl}
              className="text-brand-crimson hover:underline font-medium inline-block"
            >
              Learn more
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
            <button
              type="button"
              onClick={() => saveConsent(true, true)}
              className="btn-one bg-brand-crimson hover:bg-brand-crimson/90 text-white font-semibold py-2.5 px-4 rounded text-sm transition-colors text-center shadow-xs"
            >
              Accept All Cookies
            </button>
            <button
              type="button"
              onClick={() => saveConsent(false, false)}
              className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 text-brand-charcoal dark:text-gray-200 font-medium py-2.5 px-4 rounded text-sm transition-colors text-center"
            >
              Reject Non-Essential
            </button>
          </div>

          <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs text-brand-crimson hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <i className="fal fa-sliders-h" aria-hidden="true"></i> Manage Cookie Preferences
            </button>
            <Link
              href={privacyUrl}
              className="text-xs text-brand-slate hover:text-brand-crimson dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}

      {/* Preferences Modal Dialog */}
      {showPreferences && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
        >
          <div className="bg-white dark:bg-background border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative font-body">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
              <div className="flex items-center gap-2.5">
                <i className="fal fa-shield-alt text-brand-crimson text-xl" aria-hidden="true"></i>
                <h2
                  id="cookie-preferences-title"
                  className="font-heading font-bold text-xl text-brand-charcoal dark:text-white"
                >
                  Cookie Preferences
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Close preferences dialog"
                className="text-gray-400 hover:text-brand-charcoal dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <i className="fal fa-times text-lg" aria-hidden="true"></i>
              </button>
            </div>

            <p className="text-sm text-brand-slate dark:text-gray-300 mb-6 leading-relaxed">
              Customize your cookie preferences below. Strictly necessary cookies cannot be disabled as they are required for the website to function securely.
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential Cookies */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-heading font-semibold text-sm text-brand-charcoal dark:text-white">
                    Strictly Necessary Cookies
                  </span>
                  <span className="bg-gray-200 dark:bg-gray-800 text-brand-slate dark:text-gray-300 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-brand-slate dark:text-gray-400">
                  Required for site navigation, security verification, and accessibility features. These cookies do not store personally identifiable data.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="analytics-cookies-toggle" className="font-heading font-semibold text-sm text-brand-charcoal dark:text-white cursor-pointer">
                    Analytics & Performance Cookies
                  </label>
                  <input
                    id="analytics-cookies-toggle"
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="w-4 h-4 accent-[#BE1622] rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-brand-slate dark:text-gray-400">
                  Allows us to count visits and traffic sources to measure and improve our site performance (Google Analytics 4).
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="marketing-cookies-toggle" className="font-heading font-semibold text-sm text-brand-charcoal dark:text-white cursor-pointer">
                    Marketing & Personalization Cookies
                  </label>
                  <input
                    id="marketing-cookies-toggle"
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="w-4 h-4 accent-[#BE1622] rounded cursor-pointer"
                  />
                </div>
                <p className="text-xs text-brand-slate dark:text-gray-400">
                  Used to track visitors across websites to display relevant updates, publications, and legal seminar notices.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => {
                  setAnalyticsConsent(true)
                  setMarketingConsent(true)
                  saveConsent(true, true)
                }}
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 text-brand-charcoal dark:text-gray-200 font-medium py-2.5 px-4 rounded text-sm transition-colors text-center"
              >
                Accept All Cookies
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsConsent, marketingConsent)}
                className="bg-brand-crimson hover:bg-brand-crimson/90 text-white font-semibold py-2.5 px-6 rounded text-sm transition-colors text-center shadow-xs"
              >
                Save Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
