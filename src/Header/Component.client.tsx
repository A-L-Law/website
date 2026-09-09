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
  const [openMobileLevel1, setOpenMobileLevel1] = useState<Record<number, boolean>>({})
  const [openMobileLevel2, setOpenMobileLevel2] = useState<Record<string, boolean>>({})

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

  const toggleMobileLevel1 = (index: number) => {
    setOpenMobileLevel1((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const toggleMobileLevel2 = (key: string) => {
    setOpenMobileLevel2((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const topAddress = data?.topBarAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486'
  const topEmail = data?.topBarEmail || 'info@allaw.co.uk'
  const ctaText = data?.ctaButtonText || 'Free Consultation'
  const ctaLink = data?.ctaButtonLink || '/contact'
  const offcanvasDesc =
    data?.offcanvasDescription ||
    'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.'

  const defaultNavItems = [
    {
      link: { label: 'Home', url: '/' },
      subMenu: [
        { link: { label: 'Main Business', url: '/' } },
        { link: { label: 'Consulting Business', url: '/' } },
        { link: { label: 'Business Solutions', url: '/' } },
      ],
    },
    {
      link: { label: 'Pages', url: '/about-us' },
      subMenu: [
        { link: { label: 'About Us', url: '/about-us' } },
        {
          link: { label: 'Services', url: '/practice-areas' },
          subMenu: [
            { link: { label: 'Services 01', url: '/practice-areas' } },
            { link: { label: 'Services 02', url: '/practice-areas' } },
            { link: { label: 'Services Details', url: '/practice-areas/commercial' } },
          ],
        },
        { link: { label: 'Price Plans', url: '/contact' } },
        { link: { label: "FAQ's", url: '/faq' } },
        { link: { label: 'Testimonials', url: '/testimonials' } },
        {
          link: { label: 'Teams', url: '/team' },
          subMenu: [
            { link: { label: 'Team Filter', url: '/team' } },
            { link: { label: 'Team 01', url: '/team' } },
            { link: { label: 'Team 02', url: '/team' } },
            { link: { label: 'Team Details', url: '/team' } },
          ],
        },
        { link: { label: 'Request Quote', url: '/contact' } },
        { link: { label: '404 Page', url: '/404' } },
      ],
    },
    {
      link: { label: 'Project', url: '/cases' },
      subMenu: [
        { link: { label: 'Project Filter', url: '/cases' } },
        {
          link: { label: 'Project Grid', url: '/cases' },
          subMenu: [
            { link: { label: '2 Columns', url: '/cases' } },
            { link: { label: '3 Columns', url: '/cases' } },
            { link: { label: '4 Columns', url: '/cases' } },
          ],
        },
        { link: { label: 'Project Details', url: '/cases' } },
      ],
    },
    {
      link: { label: 'Blog', url: '/posts' },
      subMenu: [
        { link: { label: 'Blog Grid', url: '/posts' } },
        { link: { label: 'Blog Standard', url: '/posts' } },
        { link: { label: 'Blog Details', url: '/posts' } },
      ],
    },
    {
      link: { label: 'Contact', url: '/contact' },
      subMenu: [
        { link: { label: 'Contact Style 01', url: '/contact' } },
        { link: { label: 'Contact Style 02', url: '/contact' } },
      ],
    },
  ]

  const rawNavItems = (data?.navItems as any[]) || []
  const navItemsToRender = rawNavItems.length > 0 ? rawNavItems : defaultNavItems

  return (
    <>
      {/* Top Bar matching Conbix template 1-to-1: red clip-path bar on left, rotated white stripe divider */}
      <div className="relative bg-black text-white text-xs hidden md:block overflow-hidden" style={{ padding: '7px 30px', zIndex: 1 }}>
        {/* Red bar covering left ~30% with slanted right edge (::before equivalent) */}
        <div
          className="absolute top-0 left-0 bottom-0 bg-brand-crimson"
          style={{
            width: '30%',
            clipPath: 'polygon(0 0, 100% 0%, 97% 100%, 0 100%)',
            zIndex: 0,
          }}
        />
        {/* Small white rotated bar at the 30% seam (::after equivalent) */}
        <div
          className="absolute bg-white"
          style={{
            top: '-5px',
            left: '30%',
            bottom: '-4px',
            width: '3px',
            zIndex: 0,
            transform: 'rotate(23deg)',
          }}
        />

        <div className="relative flex justify-between items-center" style={{ zIndex: 2 }}>
          {/* Top Left Address */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2.5 text-white font-semibold text-xs">
              <LucideIcons.MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{topAddress}</span>
            </a>
          </div>

          {/* Top Right Email & Social Media Icons */}
          <div className="flex items-center">
            <a
              href={`mailto:${topEmail}`}
              className="flex items-center gap-2.5 text-white hover:text-brand-crimson transition-colors font-semibold text-xs lowercase"
            >
              <LucideIcons.Mail className="w-3.5 h-3.5 text-brand-crimson" />
              <span>{topEmail}</span>
            </a>

            {/* Social Icons separated by border-left divider matching template */}
            <div className="flex items-center gap-4 border-l border-white/20" style={{ paddingLeft: '30px', marginLeft: '30px' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-crimson transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-semibold">f</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-crimson transition-colors"
                aria-label="Twitter / X"
              >
                <span className="text-xs font-semibold">X</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-crimson transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-semibold">in</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-crimson transition-colors"
                aria-label="Instagram"
              >
                <span className="text-xs font-semibold">ig</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header with Less Side Padding (max-w-[1700px] px-4 lg:px-8) */}
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isSticky
            ? 'fixed top-0 left-0 bg-brand-white dark:bg-brand-charcoal shadow-md py-3'
            : 'relative bg-brand-white dark:bg-brand-charcoal py-4 lg:py-5 border-b border-gray-100 dark:border-gray-800'
        }`}
      >
        <div className="mx-auto flex items-center justify-between" style={{ padding: '0 30px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Center Main Nav matching Conbix Header Menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-9 font-heading text-[15px] font-extrabold text-brand-charcoal dark:text-brand-white uppercase">
            {navItemsToRender.map((item: any, i: number) => {
              const hasLevel1Sub = Array.isArray(item.subMenu) && item.subMenu.length > 0

              return (
                <div key={i} className="relative group/level1 py-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <CMSLink
                      {...item.link}
                      className="text-brand-charcoal dark:text-brand-white group-hover/level1:text-brand-crimson transition-colors font-heading text-[15px] font-extrabold uppercase tracking-wide flex items-center"
                    />
                    {hasLevel1Sub && (
                      <span className="font-extrabold text-[15px] text-brand-crimson ml-0.5 select-none transition-colors">
                        <span className="group-hover/level1:hidden inline">+</span>
                        <span className="hidden group-hover/level1:inline">&minus;</span>
                      </span>
                    )}
                  </div>

                  {/* Level 1 Sub Menu Dropdown */}
                  {hasLevel1Sub && (
                    <ul className="sub-menu absolute top-full left-0 w-60 bg-white dark:bg-brand-charcoal border border-gray-100 dark:border-gray-800 shadow-2xl rounded-b-md py-0 transition-all duration-300 transform origin-top opacity-0 scale-y-0 pointer-events-none group-hover/level1:opacity-100 group-hover/level1:scale-y-100 group-hover/level1:pointer-events-auto z-50">
                      {item.subMenu.map((subItem: any, subIdx: number) => {
                        const level2Items = subItem.nestedSubMenu || subItem.subMenu
                        const hasLevel2Sub = Array.isArray(level2Items) && level2Items.length > 0

                        return (
                          <li
                            key={subIdx}
                            className="relative group/level2 border-b border-gray-100 dark:border-gray-800/80 last:border-b-0"
                          >
                            {/* Hover Red Left Vertical Bar Indicator */}
                            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-crimson opacity-0 group-hover/level2:opacity-100 transition-opacity duration-200" />

                            <div className="flex items-center justify-between px-5 py-3 cursor-pointer">
                              <CMSLink
                                {...subItem.link}
                                className="text-brand-charcoal dark:text-brand-white group-hover/level2:text-brand-crimson transition-colors font-body text-[14px] font-semibold capitalize flex-1"
                              />
                              {hasLevel2Sub && (
                                <span className="font-extrabold text-[14px] text-brand-crimson ml-2 select-none">
                                  <span className="group-hover/level2:hidden inline">+</span>
                                  <span className="hidden group-hover/level2:inline">&minus;</span>
                                </span>
                              )}
                            </div>

                            {/* Level 2 Split-out Sub Menu Dropdown */}
                            {hasLevel2Sub && (
                              <ul className="sub-menu absolute left-full top-0 w-56 bg-white dark:bg-brand-charcoal border border-gray-100 dark:border-gray-800 shadow-2xl rounded-r-md py-0 transition-all duration-300 transform origin-top-left opacity-0 scale-y-0 pointer-events-none group-hover/level2:opacity-100 group-hover/level2:scale-y-100 group-hover/level2:pointer-events-auto z-50">
                                {level2Items.map((nestedItem: any, nestedIdx: number) => (
                                  <li
                                    key={nestedIdx}
                                    className="relative group/level3 border-b border-gray-100 dark:border-gray-800/80 last:border-b-0"
                                  >
                                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-crimson opacity-0 group-hover/level3:opacity-100 transition-opacity duration-200" />
                                    <div className="px-5 py-3">
                                      <CMSLink
                                        {...nestedItem.link}
                                        className="text-brand-charcoal dark:text-brand-white group-hover/level3:text-brand-crimson transition-colors font-body text-[14px] font-semibold capitalize"
                                      />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Header Actions matching Conbix template sizes */}
          <div className="flex items-center">
            {/* Search Icon — template: font-size: 20px */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground hover:text-brand-crimson transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <LucideIcons.Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Grid Menu Icon with divider — template: margin-left: 70px, padding-left: 70px, 1px divider 40px tall at 0.1 opacity, icon 25px primary red */}
            <div className="relative hidden sm:flex items-center" style={{ marginLeft: '70px', paddingLeft: '70px' }}>
              {/* Vertical divider line (::before equivalent) */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-brand-charcoal dark:bg-white"
                style={{ width: '1px', height: '40px', opacity: 0.1 }}
              />
              <button
                onClick={() => setSideDrawerOpen(true)}
                className="text-brand-crimson hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
                aria-label="Open menu widget"
              >
                <LucideIcons.LayoutGrid style={{ width: '25px', height: '25px' }} className="stroke-[2]" />
              </button>
            </div>

            {/* CTA Button — template: padding 17px 43px, font-size 16px, font-weight 700, border-radius 6px */}
            <Link
              href={ctaLink}
              className="hidden sm:inline-flex items-center gap-2 bg-brand-crimson hover:bg-black text-white font-heading uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
              style={{ padding: '17px 43px', fontSize: '16px', fontWeight: 700, borderRadius: '6px', marginLeft: '70px' }}
            >
              <span>{ctaText}</span>
              <LucideIcons.ChevronsRight className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-lg bg-brand-crimson text-white lg:hidden ml-4"
              aria-label="Toggle mobile menu"
            >
              <LucideIcons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
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
                <button
                  onClick={() => setSideDrawerOpen(false)}
                  className="text-brand-slate hover:text-brand-crimson"
                >
                  <LucideIcons.X className="w-6 h-6" />
                </button>
              </div>
              <p className="font-body text-sm text-brand-slate mb-8 leading-relaxed">
                {offcanvasDesc}
              </p>
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
              <Link
                href={ctaLink}
                className="block w-full text-center bg-brand-crimson text-brand-white font-heading font-bold py-3 rounded-lg hover:bg-brand-burgundy transition-colors"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu with 2-Level Accordion Submenus */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-start lg:hidden">
          <div className="w-4/5 max-w-sm bg-brand-white dark:bg-brand-charcoal p-6 h-full flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-8">
                <Logo loading="eager" priority="high" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-slate">
                  <LucideIcons.X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-3 font-heading text-base font-bold text-brand-charcoal dark:text-brand-white">
                {navItemsToRender.map((item: any, i: number) => {
                  const hasLevel1Sub = Array.isArray(item.subMenu) && item.subMenu.length > 0
                  const isLevel1Open = !!openMobileLevel1[i]

                  return (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-3">
                      <div className="flex items-center justify-between py-1">
                        <CMSLink
                          {...item.link}
                          className="font-heading text-base font-extrabold uppercase text-brand-charcoal dark:text-brand-white hover:text-brand-crimson"
                        />
                        {hasLevel1Sub && (
                          <button
                            onClick={() => toggleMobileLevel1(i)}
                            className="p-1 rounded bg-brand-crimson/10 text-brand-crimson hover:bg-brand-crimson hover:text-white font-bold transition-colors"
                            aria-label="Toggle submenu"
                          >
                            {isLevel1Open ? '−' : '+'}
                          </button>
                        )}
                      </div>

                      {hasLevel1Sub && isLevel1Open && (
                        <div className="pl-4 mt-2 space-y-2 border-l-2 border-brand-crimson/40">
                          {item.subMenu?.map((subItem: any, subIdx: number) => {
                            const level2Items = subItem.nestedSubMenu || subItem.subMenu
                            const hasLevel2Sub =
                              Array.isArray(level2Items) && level2Items.length > 0
                            const subKey = `${i}-${subIdx}`
                            const isLevel2Open = !!openMobileLevel2[subKey]

                            return (
                              <div key={subIdx} className="py-1">
                                <div className="flex items-center justify-between">
                                  <CMSLink
                                    {...subItem.link}
                                    className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-crimson"
                                  />
                                  {hasLevel2Sub && (
                                    <button
                                      onClick={() => toggleMobileLevel2(subKey)}
                                      className="px-1 text-xs font-bold text-brand-crimson hover:text-black"
                                      aria-label="Toggle nested submenu"
                                    >
                                      {isLevel2Open ? '−' : '+'}
                                    </button>
                                  )}
                                </div>

                                {hasLevel2Sub && isLevel2Open && (
                                  <div className="pl-3 mt-1 space-y-1 border-l border-gray-300 dark:border-gray-700">
                                    {level2Items.map((nestedItem: any, nestedIdx: number) => (
                                      <CMSLink
                                        key={nestedIdx}
                                        {...nestedItem.link}
                                        className="block text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-brand-crimson py-1"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


