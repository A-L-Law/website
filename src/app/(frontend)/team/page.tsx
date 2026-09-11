import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { MediumImpactHero } from '@/heros/MediumImpact'
import { getCachedPageBanners } from '@/utilities/getPageBanners'
import type { Media, Team } from '@/payload-types'
import { TeamDirectory, TeamMemberItem } from './TeamDirectory.client'

export const revalidate = 60

const fallbackTeamMembers: TeamMemberItem[] = [
  {
    id: 'amelia-clover',
    name: 'Amelia Clover',
    slug: 'amelia-clover',
    jobTitle: 'Senior Advisor',
    jobRole: 'founder',
    imageUrl: '/assets/img/team/team-1.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'steve-rhodes',
    name: 'Steve Rhodes',
    slug: 'steve-rhodes',
    jobTitle: 'Health Coach',
    jobRole: 'writer',
    imageUrl: '/assets/img/team/team-2.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'grace-elizabeth',
    name: 'Grace Elizabeth',
    slug: 'grace-elizabeth',
    jobTitle: 'Underwriter',
    jobRole: 'founder',
    imageUrl: '/assets/img/team/team-3.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'michael-james',
    name: 'Michael James',
    slug: 'michael-james',
    jobTitle: 'Claims Adjuster',
    jobRole: 'writer',
    imageUrl: '/assets/img/team/team-4.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'tommy-hilfiger',
    name: 'Tommy Hilfiger',
    slug: 'tommy-hilfiger',
    jobTitle: 'Marketing Lead',
    jobRole: 'designer',
    imageUrl: '/assets/img/team/team-5.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
  {
    id: 'florence-welch',
    name: 'Florence Welch',
    slug: 'florence-welch',
    jobTitle: 'Legal Director',
    jobRole: 'manager',
    imageUrl: '/assets/img/team/team-6.jpg',
    socialLinks: {
      facebook: 'https://www.facebook.com',
      x: 'https://twitter.com',
      linkedin: 'https://www.linkedin.com',
    },
  },
]

export default async function TeamHubPage() {
  const [payload, pageBanners] = await Promise.all([
    getPayload({ config: configPromise }),
    getCachedPageBanners(),
  ])

  let teamMembers: TeamMemberItem[] = []

  try {
    const { docs } = await payload.find({
      collection: 'team',
      sort: 'name',
      limit: 100,
    })

    if (docs && docs.length > 0) {
      teamMembers = docs.map((doc: any) => {
        let avatarUrl = '/assets/img/team/team-1.jpg'
        if (doc.avatar && typeof doc.avatar === 'object' && doc.avatar.url) {
          avatarUrl = doc.avatar.url
        }

        return {
          id: String(doc.id),
          name: doc.name,
          slug: doc.slug,
          jobTitle: doc.jobTitle,
          jobRole: doc.jobRole,
          imageUrl: avatarUrl,
          socialLinks: doc.socialLinks,
        }
      })
    }
  } catch (err) {
    console.error('Error fetching team members from Payload CMS:', err)
  }

  // Fallback to demo template members if no documents are published yet
  if (teamMembers.length === 0) {
    teamMembers = fallbackTeamMembers
  }

  const bannerMedia = (pageBanners?.team?.media || pageBanners?.defaultBanner?.media) as Media

  return (
    <article className="team-page font-body">
      {/* 1. Medium Impact Hero Banner matching Conbix template */}
      <MediumImpactHero
        type="mediumImpact"
        title={pageBanners?.team?.title || 'Our Team & Partners'}
        innerTitle={pageBanners?.team?.innerTitle || 'Our Team'}
        media={bannerMedia}
      />

      {/* 2. Interactive Team Directory with Role Filter & 3-Column Card Grid */}
      <TeamDirectory members={teamMembers} />
    </article>
  )
}
