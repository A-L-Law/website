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
    <div className="switch__tab">
      <span
        className={`switch__tab-btn light-mode-title ${isDarkMode ? '' : 'active'}`}
        onClick={toggleLight}
      >
        Light
      </span>
      <span
        className={`mode__switch ${isDarkMode ? 'active' : ''} ${addClass}`}
        onClick={isDarkMode ? toggleLight : toggleDark}
      >
        <span />
      </span>
      <span
        className={`switch__tab-btn dark-mode-title ${isDarkMode ? 'active' : ''}`}
        onClick={toggleDark}
      >
        Dark
      </span>
    </div>
  )
}

export default SwitchTab
