'use client'

import React, { useEffect, useState } from 'react'
import * as LucideIcons from 'lucide-react'

export const ScrollToTop: React.FC<{ addClass?: string }> = ({ addClass = '' }) => {
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const scrollPath = document.querySelector<SVGPathElement>('.scroll-up path')
    if (!scrollPath) return

    const pathLength = scrollPath.getTotalLength()
    scrollPath.style.transition = 'none'
    scrollPath.style.strokeDasharray = `${pathLength} ${pathLength}`
    scrollPath.style.strokeDashoffset = `${pathLength}`
    scrollPath.getBoundingClientRect()
    scrollPath.style.transition = 'stroke-dashoffset 10ms linear'

    const updateScroll = () => {
      const scroll = window.scrollY
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
      const winHeight = window.innerHeight
      const height = docHeight - winHeight

      // Toggle active class when scrolling past 50px
      if (scroll > 50) {
        setActive(true)
      } else {
        setActive(false)
      }

      if (height > 0) {
        const progress = pathLength - (scroll * pathLength) / height
        scrollPath.style.strokeDashoffset = `${Math.max(0, Math.min(pathLength, progress))}`
      } else {
        scrollPath.style.strokeDashoffset = `${pathLength}`
      }
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [mounted])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted) return null

  return (
    <div
      className={`scroll-up ${addClass} ${active ? 'active-scroll' : ''}`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      aria-label="Scroll to top"
      suppressHydrationWarning
    >
      <LucideIcons.ArrowUp className="scroll-arrow w-5 h-5" />
      <svg className="scroll-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  )
}

export default ScrollToTop
