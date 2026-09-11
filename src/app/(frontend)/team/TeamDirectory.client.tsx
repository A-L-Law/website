'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

export interface TeamMemberItem {
  id: string
  name: string
  slug: string
  jobTitle: string
  jobRole: string
  imageUrl: string
  socialLinks?: {
    linkedin?: string | null
    instagram?: string | null
    facebook?: string | null
    x?: string | null
  }
}

interface Props {
  members: TeamMemberItem[]
}

const roleLabels: Record<string, string> = {
  founder: 'Founder',
  partner: 'Partner',
  'senior-solicitor': 'Senior Solicitor',
  associate: 'Associate',
  solicitor: 'Solicitor',
  consultant: 'Consultant',
  manager: 'Manager',
  'legal-assistant': 'Legal Assistant',
  trainee: 'Trainee Solicitor',
  designer: 'Designer',
  writer: 'Writer',
}

export const TeamDirectory: React.FC<Props> = ({ members }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  // Extract distinct roles from the members array
  const filterCategories = useMemo(() => {
    const roles = new Set<string>()
    members.forEach((m) => {
      if (m.jobRole) {
        roles.add(m.jobRole.toLowerCase())
      }
    })

    const categories = [{ id: 'all', label: 'All', value: 'all' }]
    roles.forEach((role) => {
      categories.push({
        id: role,
        label: roleLabels[role] || role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })
    })

    return categories
  }, [members])

  const filteredMembers = useMemo(() => {
    if (activeFilter === 'all') return members
    return members.filter((m) => m.jobRole?.toLowerCase() === activeFilter.toLowerCase())
  }, [members, activeFilter])

  return (
    <div className="team__three">
      <div className="container mx-auto px-4">
        {/* Filter Buttons */}
        <div className="row mb-12">
          <div className="col-12">
            <div className="filter_button">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.value)}
                  className={activeFilter === cat.value ? 'active' : ''}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Team Grid matching Conbix 1-to-1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => {
            const fb = member.socialLinks?.facebook || 'https://www.facebook.com'
            const tw = member.socialLinks?.x || 'https://twitter.com'
            const li = member.socialLinks?.linkedin || 'https://www.linkedin.com'
            const ig = member.socialLinks?.instagram

            return (
              <div key={member.id} className="team__three-item">
                <div className="team__three-item-image">
                  <img
                    src={member.imageUrl || '/assets/img/team/team-1.jpg'}
                    alt={member.name}
                    loading="lazy"
                  />
                  <div className="team__three-item-image-info">
                    <div className="team__three-item-image-info-name">
                      <span className="text-eight">{member.jobTitle}</span>
                      <h4>
                        <Link href={`/team/${member.slug}`}>{member.name}</Link>
                      </h4>
                    </div>
                    <div className="team__three-item-image-info-icon">
                      <div className="team__three-item-image-info-social">
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
                      <span>
                        <i className="fas fa-share-alt"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
