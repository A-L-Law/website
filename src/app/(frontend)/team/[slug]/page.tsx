import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { SkillBars, SkillItem } from './SkillBars.client'
import { TeamContactForm } from './TeamContactForm.client'

export const revalidate = 60

type Args = {
  params: Promise<{
    slug?: string
  }>
}

interface TeamMemberDetail {
  id: string
  name: string
  slug: string
  jobTitle: string
  jobRole: string
  imageUrl: string
  background?: any
  backgroundFallback?: string[]
  practiceAreas: SkillItem[]
  contact: {
    email?: string
    phone?: string
    officeLocation?: string
  }
  socialLinks: {
    linkedin?: string
    instagram?: string
    facebook?: string
    x?: string
  }
}

const fallbackTeamDetails: Record<string, TeamMemberDetail> = {
  'amelia-clover': {
    id: 'amelia-clover',
    name: 'Amelia Clover',
    slug: 'amelia-clover',
    jobTitle: 'Senior Advisor',
    jobRole: 'founder',
    imageUrl: '/assets/img/team/team-1.jpg',
    backgroundFallback: [
      "Amelia Clover has over twenty years of distinguished practice advising multinational corporations, private equity firms, and high-net-worth individuals on complex corporate governance, mergers, and strategic cross-border disputes.",
      'Known for her incisive legal acumen and steadfast advocacy, Amelia works closely with board members and general counsel to safeguard institutional value while navigating volatile regulatory landscapes across the UK and European jurisdictions.',
      'Prior to founding her senior advisory practice at A L Law, Amelia led the corporate litigation practice at a premier Magic Circle firm in the City of London and served on several legal oversight commissions.',
    ],
    practiceAreas: [
      { label: 'Corporate & Commercial Law', percentage: 95 },
      { label: 'Regulatory Compliance & Governance', percentage: 90 },
      { label: 'Strategic Cross-Border Disputes', percentage: 85 },
    ],
    contact: {
      email: 'a.clover@allaw.co.uk',
      phone: '+44 (0) 20 7946 0128',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com',
    },
  },
  'steve-rhodes': {
    id: 'steve-rhodes',
    name: 'Steve Rhodes',
    slug: 'steve-rhodes',
    jobTitle: 'Health Coach & Legal Consultant',
    jobRole: 'writer',
    imageUrl: '/assets/img/team/team-2.jpg',
    backgroundFallback: [
      'Steve Rhodes brings unique dual expertise in healthcare regulation, medical negligence law, and institutional risk mitigation, advising NHS trusts, healthcare innovators, and private practitioners.',
      'Steve is frequently retained to draft comprehensive regulatory compliance roadmaps and defend complex disciplinary investigations before healthcare governing bodies in the United Kingdom.',
    ],
    practiceAreas: [
      { label: 'Healthcare Regulation', percentage: 92 },
      { label: 'Medical Governance', percentage: 88 },
      { label: 'Institutional Compliance', percentage: 80 },
    ],
    contact: {
      email: 's.rhodes@allaw.co.uk',
      phone: '+44 (0) 20 7946 0134',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  'grace-elizabeth': {
    id: 'grace-elizabeth',
    name: 'Grace Elizabeth',
    slug: 'grace-elizabeth',
    jobTitle: 'Underwriter & Partner',
    jobRole: 'founder',
    imageUrl: '/assets/img/team/team-3.jpg',
    backgroundFallback: [
      'Grace Elizabeth specialises in high-value commercial insurance disputes, contractual risk assessment, and financial reinsurance litigation across the London market and international reinsurance hubs.',
      'With profound technical insight into underwriting criteria and policy risk covenants, Grace represents institutional underwriters and corporate insureds in multi-million-pound commercial claims.',
    ],
    practiceAreas: [
      { label: 'Commercial Insurance & Underwriting', percentage: 94 },
      { label: 'Reinsurance Litigation', percentage: 86 },
      { label: 'Financial Dispute Resolution', percentage: 82 },
    ],
    contact: {
      email: 'g.elizabeth@allaw.co.uk',
      phone: '+44 (0) 20 7946 0155',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com',
    },
  },
  'michael-james': {
    id: 'michael-james',
    name: 'Michael James',
    slug: 'michael-james',
    jobTitle: 'Claims Adjuster & Senior Solicitor',
    jobRole: 'writer',
    imageUrl: '/assets/img/team/team-4.jpg',
    backgroundFallback: [
      'Michael James has extensive expertise resolving contentious dispute claims and regulatory reviews. He delivers decisive advice designed to protect assets and achieve rapid settlement where commercial viability dictates.',
    ],
    practiceAreas: [
      { label: 'Claims Negotiation', percentage: 88 },
      { label: 'Contentious Property Claims', percentage: 84 },
      { label: 'Arbitration', percentage: 76 },
    ],
    contact: {
      email: 'm.james@allaw.co.uk',
      phone: '+44 (0) 20 7946 0162',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  'tommy-hilfiger': {
    id: 'tommy-hilfiger',
    name: 'Tommy Hilfiger',
    slug: 'tommy-hilfiger',
    jobTitle: 'Marketing Lead & IP Counsel',
    jobRole: 'designer',
    imageUrl: '/assets/img/team/team-5.jpg',
    backgroundFallback: [
      'Tommy leads intellectual property protection, brand strategy enforcement, and trademark licensing for enterprise and boutique luxury clients throughout the UK and internationally.',
    ],
    practiceAreas: [
      { label: 'Intellectual Property', percentage: 91 },
      { label: 'Brand & Trademark Licensing', percentage: 87 },
      { label: 'Copyright Protection', percentage: 82 },
    ],
    contact: {
      email: 't.hilfiger@allaw.co.uk',
      phone: '+44 (0) 20 7946 0177',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  'florence-welch': {
    id: 'florence-welch',
    name: 'Florence Welch',
    slug: 'florence-welch',
    jobTitle: 'Legal Director',
    jobRole: 'manager',
    imageUrl: '/assets/img/team/team-6.jpg',
    backgroundFallback: [
      'Florence Welch provides comprehensive leadership across our corporate dispute teams, overseeing complex High Court litigation, international arbitration, and strategic commercial settlements.',
    ],
    practiceAreas: [
      { label: 'High Court Litigation', percentage: 96 },
      { label: 'International Arbitration', percentage: 90 },
      { label: 'Corporate Dispute Strategy', percentage: 88 },
    ],
    contact: {
      email: 'f.welch@allaw.co.uk',
      phone: '+44 (0) 20 7946 0199',
      officeLocation: '100 Pall Mall, St. James’s, London SW1Y 5NQ',
    },
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com',
    },
  },
}

export default async function TeamMemberProfilePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (!slug) return notFound()

  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  let member: TeamMemberDetail | null = null

  try {
    const { docs } = await payload.find({
      collection: 'team',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (docs && docs.length > 0) {
      const doc: any = docs[0]
      let avatarUrl = '/assets/img/team/team-1.jpg'
      if (doc.avatar && typeof doc.avatar === 'object' && doc.avatar.url) {
        avatarUrl = doc.avatar.url
      }

      const practiceAreas: SkillItem[] =
        Array.isArray(doc.practiceAreas) && doc.practiceAreas.length > 0
          ? doc.practiceAreas.map((pa: any) => ({
              label: pa.label,
              percentage: Number(pa.percentage) || 80,
            }))
          : [
              { label: 'Corporate & Commercial Law', percentage: 90 },
              { label: 'Commercial Litigation', percentage: 85 },
            ]

      member = {
        id: String(doc.id),
        name: doc.name,
        slug: doc.slug,
        jobTitle: doc.jobTitle,
        jobRole: doc.jobRole,
        imageUrl: avatarUrl,
        background: doc.background,
        practiceAreas,
        contact: {
          email: doc.contact?.email,
          phone: doc.contact?.phone,
          officeLocation: doc.contact?.officeLocation || '100 Pall Mall, London',
        },
        socialLinks: {
          facebook: doc.socialLinks?.facebook,
          x: doc.socialLinks?.x,
          linkedin: doc.socialLinks?.linkedin,
          instagram: doc.socialLinks?.instagram,
        },
      }
    }
  } catch (err) {
    console.error('Error fetching team member by slug:', err)
  }

  // Fallback to static demo profile if not in CMS
  if (!member) {
    member = fallbackTeamDetails[slug] || null
  }

  if (!member) {
    return notFound()
  }

  const bannerMedia = (pageBanners?.team?.media || pageBanners?.defaultBanner?.media) as Media

  const fb = member.socialLinks.facebook || 'https://www.facebook.com'
  const tw = member.socialLinks.x || 'https://twitter.com'
  const li = member.socialLinks.linkedin || 'https://www.linkedin.com'
  const ig = member.socialLinks.instagram

  return (
    <article className="team-detail font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix Breadcrumb */}
      <MediumImpactHero
        type="mediumImpact"
        title={member.name}
        innerTitle={member.name}
        breadcrumbs={[
          { label: 'Team', url: '/team' },
          { label: member.name },
        ]}
        media={bannerMedia}
      />

      {/* 2. Conbix 2-Column Team Single Layout */}
      <div className="team__single">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Portrait, Social, Contact Info (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="team__single-left">
                <div className="team__single-left-thumb">
                  <img src={member.imageUrl} alt={member.name} />
                  <div className="team__single-left-thumb-social">
                    <ul>
                      {fb && (
                        <li>
                          <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                      )}
                      {tw && (
                        <li>
                          <a href={tw} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                            <i className="fa-brands fa-x-twitter"></i>
                          </a>
                        </li>
                      )}
                      {li && (
                        <li>
                          <a href={li} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      )}
                      {ig && (
                        <li>
                          <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="team__single-left-info">
                  <span>{member.jobTitle}</span>
                  <h3>{member.name}</h3>

                  <div className="team__single-left-info-contact">
                    {member.contact.email && (
                      <div className="team__single-left-info-contact-item">
                        <i className="far fa-envelope"></i>
                        <div className="team__single-left-info-contact-item-info">
                          <span>Quick Email</span>
                          <h5>
                            <Link href={`mailto:${member.contact.email}`}>{member.contact.email}</Link>
                          </h5>
                        </div>
                      </div>
                    )}

                    {member.contact.phone && (
                      <div className="team__single-left-info-contact-item">
                        <i className="fal fa-phone-alt"></i>
                        <div className="team__single-left-info-contact-item-info">
                          <span>Tell With US</span>
                          <h5>
                            <Link href={`tel:${member.contact.phone}`}>{member.contact.phone}</Link>
                          </h5>
                        </div>
                      </div>
                    )}

                    {member.contact.officeLocation && (
                      <div className="team__single-left-info-contact-item">
                        <i className="far fa-map-marker-alt"></i>
                        <div className="team__single-left-info-contact-item-info">
                          <span>Office Location</span>
                          <h5>
                            <a
                              href="https://www.google.com/maps"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {member.contact.officeLocation}
                            </a>
                          </h5>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Background, Practice Areas & Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="team__single-right">
                {/* Background Section (replaces Career Guidelines) */}
                <div className="team__single-right-experience">
                  <h3>Background</h3>
                  {member.background ? (
                    <RichText data={member.background} enableGutter={false} />
                  ) : (
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4 font-body leading-relaxed">
                      {member.backgroundFallback ? (
                        member.backgroundFallback.map((p, idx) => <p key={idx}>{p}</p>)
                      ) : (
                        <p>
                          Experienced legal practitioner dedicated to delivering strategic, results-focused advice for clients across the UK and internationally.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Practice Areas Section (replaces Professional Skills) */}
                <div className="team__single-right-skill">
                  <h3>Practice Areas</h3>
                  <p>
                    Specialised expertise and strategic capabilities honed through extensive courtroom advocacy, transaction leadership, and advisory counsel.
                  </p>
                  <SkillBars skills={member.practiceAreas} />
                </div>

                {/* Direct Consultation / Contact Inquiry Form */}
                <TeamContactForm memberName={member.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
