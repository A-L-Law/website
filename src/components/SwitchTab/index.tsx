'use client'

import React from 'react'
import { useTheme } from '@/providers/Theme'

export const SwitchTab: React.FC<{ addClass?: string }> = ({ addClass = '' }) => {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const toggleDark = () => {
    setTheme('dark')
  }

  const toggleLight = () => {
    setTheme('light')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-brand-charcoal/90 text-brand-white px-4 py-2.5 rounded-full shadow-2xl border border-brand-slate/40 backdrop-blur-md transition-all">
      <button
        type="button"
        onClick={toggleLight}
        className={`text-xs font-heading font-bold cursor-pointer transition-colors ${
          !isDarkMode ? 'text-brand-crimson font-black scale-105' : 'text-brand-slate hover:text-brand-white'
        }`}
      >
        Light
      </button>

      <button
        type="button"
        onClick={isDarkMode ? toggleLight : toggleDark}
        className={`relative w-10 h-5 rounded-full bg-brand-slate/40 transition-colors p-0.5 cursor-pointer ${
          isDarkMode ? 'bg-brand-crimson' : 'bg-brand-slate/40'
        } ${addClass}`}
        aria-label="Toggle Dark/Light Mode"
      >
        <span
          className={`block w-4 h-4 rounded-full bg-brand-white shadow-md transition-transform ${
            isDarkMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>

      <button
        type="button"
        onClick={toggleDark}
        className={`text-xs font-heading font-bold cursor-pointer transition-colors ${
          isDarkMode ? 'text-brand-crimson font-black scale-105' : 'text-brand-slate hover:text-brand-white'
        }`}
      >
        Dark
      </button>
    </div>
  )
}

export default SwitchTab
