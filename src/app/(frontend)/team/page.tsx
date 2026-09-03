import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

export default async function TeamHubPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: teamMembers } = await payload.find({
    collection: 'users',
    sort: 'name',
    limit: 100,
  })

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-4xl font-bold text-brand-charcoal dark:text-brand-white mb-4">
          Our Team & Partners
        </h1>
        <p className="font-body text-lg text-brand-slate max-w-2xl mx-auto">
          Experienced London solicitors and legal experts dedicated to delivering strategic, results-focused advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <Link
            key={member.id}
            href={`/team/${member.id}`}
            className="group p-6 rounded-xl bg-brand-white dark:bg-brand-charcoal border border-brand-ice dark:border-brand-slate hover:border-brand-crimson transition-all shadow-sm"
          >
            <div className="w-20 h-20 rounded-full bg-brand-crimson text-brand-white flex items-center justify-center font-heading text-2xl font-bold mb-4">
              {member.name ? member.name.charAt(0) : 'S'}
            </div>
            <h2 className="font-heading text-xl font-bold text-brand-charcoal dark:text-brand-white group-hover:text-brand-crimson mb-1">
              {member.name || 'Solicitor'}
            </h2>
            <p className="font-body text-sm text-brand-slate">
              {member.email}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
