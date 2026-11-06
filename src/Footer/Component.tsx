import React from 'react'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { CookieSettingsButton } from '@/components/Consent/CookieSettingsButton'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const flavorDesc =
    footerData?.flavorDescription ||
    'A L Law provides top-tier advice and representation in Commercial Law, Litigation, Property & Private Client matters.'

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

  // Dynamic office addresses with backward-compatible fallback
  const addresses =
    footerData?.addresses && footerData.addresses.length > 0
      ? footerData.addresses
      : [
          {
            title: 'Head Office Address',
            address:
              footerData?.headOfficeAddress || '100 Pall Mall, St. James’s, London SW1Y 5NQ',
            mapLink: 'https://maps.google.com',
          },
          {
            title: 'Branch Office Address',
            address: footerData?.branchOfficeAddress || '8502 Preston Rd. Inglewood, Maine 98380',
            mapLink: 'https://maps.google.com',
          },
        ]

  // Dynamic legal links with fallback
  const legalLinks =
    footerData?.legalLinks && footerData.legalLinks.length > 0
      ? footerData.legalLinks
      : [
          { link: { label: 'Privacy Policy', type: 'custom' as const, url: '/privacy-policy' } },
          { link: { label: 'Terms of Service', type: 'custom' as const, url: '/terms-of-service' } },
        ]

  return (
    <footer className="mt-auto bg-brand-charcoal text-brand-white pt-28 md:pt-36 pb-8 border-t border-brand-slate/30 font-body relative z-10">
      <div className="container">
        {/* Main Footer 4-Column Grid matching Conbix footer-one */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo & About Flavor Paragraph */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Logo loading="lazy" variant="dark" />
            </Link>
            <p className="text-brand-ice text-sm leading-relaxed mb-6">{flavorDesc}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors"
              >
                <LucideIcons.Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors"
              >
                <LucideIcons.Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-slate/30 hover:bg-brand-crimson text-brand-white flex items-center justify-center transition-colors"
              >
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
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-brand-ice hover:text-brand-coral transition-colors"
                  >
                    <LucideIcons.ChevronRight className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                    <CMSLink {...link} className="text-brand-ice hover:text-brand-coral" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Configurable Offices Location Cards with Titles */}
          <div>
            {addresses.map((item, idx) => (
              <div key={idx} className={idx > 0 ? 'mt-6' : ''}>
                {idx === 0 ? (
                  <h4 className="font-heading text-lg font-bold text-brand-white mb-4 border-b border-brand-slate/30 pb-2">
                    {item.title}
                  </h4>
                ) : (
                  <h5 className="font-heading text-sm font-bold text-brand-white mb-2">
                    {item.title}
                  </h5>
                )}
                <div className="flex items-start gap-3 text-sm text-brand-ice">
                  <LucideIcons.MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-1" />
                  {item.mapLink ? (
                    <a
                      href={item.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-coral transition-colors"
                    >
                      {item.address}
                    </a>
                  ) : (
                    <span>{item.address}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Bar matching Conbix copyright-one */}
        <div className="pt-8 border-t border-brand-slate/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-ice font-body">
          {footerData?.copyright ? (
            <RichText
              data={footerData.copyright}
              enableGutter={false}
              enableProse={false}
              className="text-xs text-brand-ice [&_p]:m-0 [&_a]:text-brand-crimson [&_a]:underline hover:[&_a]:text-brand-coral [&_strong]:text-brand-white [&_strong]:font-bold [&_em]:italic"
            />
          ) : (
            <p>{footerData?.copyrightText || 'Copyright 2026 A L Law — All Rights Reserved'}</p>
          )}

          <div className="flex items-center gap-6">
            <CookieSettingsButton />
            {legalLinks.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                className="text-xs text-brand-ice hover:text-brand-coral transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
