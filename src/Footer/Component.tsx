import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const flavorDesc =
    footerData?.flavorDescription ||
    'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.'
  const headOffice = footerData?.headOfficeAddress || '2972 Westheimer Rd. Santa Ana, Illinois 85486'
  const branchOffice = footerData?.branchOfficeAddress || '8502 Preston Rd. Inglewood, Maine 98380'
  const copyrightText = footerData?.copyrightText || 'Copyright 2026 A L Law — All Rights Reserved'
  const navColumns = footerData?.navColumns || [
    {
      columnTitle: 'Our Practice Areas',
      links: [
        { link: { label: 'Commercial & Corporate', url: '/practice-areas/commercial' } },
        { link: { label: 'Real Estate & Property', url: '/practice-areas/property' } },
        { link: { label: 'Dispute Resolution', url: '/practice-areas/litigation' } },
        { link: { label: 'Private Client & Wealth', url: '/practice-areas/private-client' } },
      ],
    },
    {
      columnTitle: 'Quick Links',
      links: [
        { link: { label: 'Our Team', url: '/team' } },
        { link: { label: 'Case Studies', url: '/cases' } },
        { link: { label: 'Legal Guides', url: '/guides' } },
        { link: { label: 'Careers', url: '/vacancies' } },
      ],
    },
  ]

  return (
    <footer className="mt-auto bg-brand-charcoal text-brand-white pt-16 pb-8 border-t border-brand-slate/30 font-body">
      <div className="container">
        {/* Main Footer 4-Column Grid matching Conbix footer-one */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo & About Flavor Paragraph */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Logo loading="lazy" />
            </Link>
            <p className="text-brand-ice text-sm leading-relaxed mb-6">{flavorDesc}</p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors">
                <LucideIcons.Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors">
                <LucideIcons.Twitter className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors">
                <LucideIcons.Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Configurable Nav Columns */}
          {navColumns.slice(0, 2).map((col, idx) => (
            <div key={idx}>
              <h4 className="font-heading text-lg font-bold text-brand-white mb-6 border-b border-brand-slate/30 pb-2">
                {col.columnTitle}
              </h4>
              <ul className="space-y-3">
                {col.links?.map(({ link }, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-brand-ice hover:text-brand-coral transition-colors">
                    <LucideIcons.ChevronRight className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                    <CMSLink {...link} className="text-brand-ice hover:text-brand-coral" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Offices Location Cards */}
          <div>
            <h4 className="font-heading text-lg font-bold text-brand-white mb-6 border-b border-brand-slate/30 pb-2">
              Head Office
            </h4>
            <div className="space-y-4 text-sm text-brand-ice mb-6">
              <div className="flex items-start gap-3">
                <LucideIcons.MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-1" />
                <span>{headOffice}</span>
              </div>
            </div>

            <h5 className="font-heading text-sm font-bold text-brand-white mb-3">Branch Office</h5>
            <div className="flex items-start gap-3 text-sm text-brand-ice">
              <LucideIcons.MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-1" />
              <span>{branchOffice}</span>
            </div>
          </div>
        </div>

        {/* Copyright Bar matching Conbix copyright-one */}
        <div className="pt-8 border-t border-brand-slate/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-ice font-body">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-brand-coral">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-brand-coral">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
