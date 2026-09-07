'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as LucideIcons from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: HeaderType
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [isSticky, setIsSticky] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setSideDrawerOpen(false)
    setMobileMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  const topAddress = data?.topBarAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486'
  const topEmail = data?.topBarEmail || 'info@allaw.co.uk'
  const ctaText = data?.ctaButtonText || 'Free Consultation'
  const ctaLink = data?.ctaButtonLink || '/contact'
  const offcanvasDesc = data?.offcanvasDescription || 'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.'
  const navItems = data?.navItems || []

  return (
    <>
      {/* Top Bar matching Conbix header-one */}
      <div className="bg-brand-charcoal text-brand-white text-xs py-2 px-6 border-b border-brand-slate/30 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2 text-brand-ice font-body">
            <LucideIcons.MapPin className="w-3.5 h-3.5 text-brand-crimson" />
            <span>{topAddress}</span>
          </div>
          <div className="flex items-center gap-6 font-body">
            <a href={`mailto:${topEmail}`} className="flex items-center gap-2 text-brand-ice hover:text-brand-coral transition-colors">
              <LucideIcons.Mail className="w-3.5 h-3.5 text-brand-crimson" />
              <span>{topEmail}</span>
            </a>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral">
                <LucideIcons.Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-coral">
                <LucideIcons.Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 bg-brand-white dark:bg-brand-charcoal shadow-md py-3' : 'relative bg-brand-white dark:bg-brand-charcoal py-5 border-b border-brand-ice dark:border-brand-slate'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Center Main Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-heading text-sm font-semibold text-brand-charcoal dark:text-brand-white">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="hover:text-brand-crimson transition-colors" />
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-brand-ice dark:hover:bg-brand-burgundy text-brand-charcoal dark:text-brand-white transition-colors"
              aria-label="Search"
            >
              <LucideIcons.Search className="w-5 h-5" />
            </button>

            {/* Offcanvas Drawer Icon */}
            <button
              onClick={() => setSideDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-brand-ice dark:hover:bg-brand-burgundy text-brand-charcoal dark:text-brand-white transition-colors hidden md:block"
              aria-label="Open menu widget"
            >
              <LucideIcons.Menu className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <Link
              href={ctaLink}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-crimson hover:bg-brand-burgundy text-brand-white font-heading text-xs font-bold px-5 py-2.5 rounded-md transition-colors"
            >
              <span>{ctaText}</span>
              <LucideIcons.ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-brand-ice dark:bg-brand-burgundy text-brand-charcoal dark:text-brand-white lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <LucideIcons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay with Template Animations */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-charcoal/90 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-brand-white dark:bg-brand-charcoal rounded-2xl p-8 border border-brand-slate shadow-2xl">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-brand-slate hover:text-brand-crimson p-2"
            >
              <LucideIcons.X className="w-6 h-6" />
            </button>
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
              Search A L Law
            </h3>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practice areas, solicitors, articles..."
                autoFocus
                className="w-full p-4 rounded-xl border border-brand-slate/30 bg-transparent text-brand-charcoal dark:text-brand-white font-body text-base outline-none focus:border-brand-crimson"
              />
              <button
                type="submit"
                className="bg-brand-crimson text-brand-white font-heading font-bold px-6 py-4 rounded-xl hover:bg-brand-burgundy transition-colors shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slide-out Offcanvas Sidebar Drawer Widget */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-brand-charcoal text-brand-white p-8 h-full flex flex-col justify-between overflow-y-auto animate-slideLeft">
            <div>
              <div className="flex justify-between items-center mb-8">
                <Logo loading="eager" priority="high" />
                <button onClick={() => setSideDrawerOpen(false)} className="text-brand-slate hover:text-brand-crimson">
                  <LucideIcons.X className="w-6 h-6" />
                </button>
              </div>
              <p className="font-body text-sm text-brand-slate mb-8 leading-relaxed">{offcanvasDesc}</p>
              <div className="space-y-4 text-sm font-body">
                <div className="flex items-center gap-3 text-brand-ice">
                  <LucideIcons.MapPin className="w-4 h-4 text-brand-crimson" />
                  <span>{topAddress}</span>
                </div>
                <div className="flex items-center gap-3 text-brand-ice">
                  <LucideIcons.Mail className="w-4 h-4 text-brand-crimson" />
                  <span>{topEmail}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-brand-slate/30">
              <Link href={ctaLink} className="block w-full text-center bg-brand-crimson text-brand-white font-heading font-bold py-3 rounded-lg hover:bg-brand-burgundy transition-colors">
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-start lg:hidden">
          <div className="w-4/5 max-w-sm bg-brand-white dark:bg-brand-charcoal p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <Logo loading="eager" priority="high" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-slate">
                  <LucideIcons.X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 font-heading text-base font-bold text-brand-charcoal dark:text-brand-white">
                {navItems.map(({ link }, i) => (
                  <CMSLink key={i} {...link} className="hover:text-brand-crimson" />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
