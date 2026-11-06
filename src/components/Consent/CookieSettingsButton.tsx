'use client'

import React from 'react'
import { openCookieSettings } from './CookieConsentBanner'

export const CookieSettingsButton: React.FC = () => {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-xs text-brand-ice hover:text-brand-coral transition-colors cursor-pointer underline-offset-2 hover:underline"
    >
      Cookie Settings
    </button>
  )
}
