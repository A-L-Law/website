'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '@/providers/Theme'
import * as LucideIcons from 'lucide-react'

export const SwitchTab: React.FC<{ addClass?: string }> = ({ addClass = '' }) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? theme === 'dark' : false

  const toggleDark = () => {
    setTheme('dark')
  }

  const toggleLight = () => {
    setTheme('light')
  }

  return (
    <div className="switch__tab" aria-label="Dark Light Mode Switcher" suppressHydrationWarning>
      <span
        className={`switch__tab-btn light-mode-title ${isDarkMode ? 'is-dark-theme' : 'is-light-theme'}`}
        onClick={toggleLight}
        suppressHydrationWarning
      >
        Light
      </span>

      <div
        className={`mode__switch ${isDarkMode ? 'dark-active' : 'light-active'} ${addClass}`}
        onClick={isDarkMode ? toggleLight : toggleDark}
        role="button"
        tabIndex={0}
        aria-label="Toggle Theme"
        suppressHydrationWarning
      >
        {/* White circle slider knob */}
        <span className="mode__switch-knob" />

        {/* Sun Icon (Left in horizontal / Top in vertical) */}
        <span className="mode__icon mode__icon-sun">
          <LucideIcons.Sun className={`w-4 h-4 ${!isDarkMode ? 'text-black' : 'text-white'}`} />
        </span>

        {/* Moon Icon (Right in horizontal / Bottom in vertical) */}
        <span className="mode__icon mode__icon-moon">
          <LucideIcons.MoonStar className={`w-4 h-4 ${isDarkMode ? 'text-black' : 'text-white'}`} />
        </span>
      </div>

      <span
        className={`switch__tab-btn dark-mode-title ${isDarkMode ? 'is-dark-theme' : 'is-light-theme'}`}
        onClick={toggleDark}
        suppressHydrationWarning
      >
        Dark
      </span>
    </div>
  )
}

export default SwitchTab
