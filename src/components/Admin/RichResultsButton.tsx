'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { getServerSideURL } from '@/utilities/getURL'

export interface RichResultsButtonProps {
  collectionSlug?: string
}

export const RichResultsButton: React.FC<RichResultsButtonProps> = ({ collectionSlug }) => {
  const slugField = useFormFields(([fields]) => fields?.slug)
  const postTypeField = useFormFields(([fields]) => fields?.postType)

  const slug = (slugField?.value as string) || ''
  const postType = (postTypeField?.value as string) || ''

  if (!slug) {
    return (
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: 600, fontSize: '0.825rem' }}>
          SEO Structured Data
        </label>
        <span style={{ fontSize: '0.8rem', color: '#888' }}>
          Save with a slug to test Google Rich Results.
        </span>
      </div>
    )
  }

  const siteUrl = getServerSideURL()
  let path = `/${slug}`

  if (collectionSlug === 'posts') {
    path = postType === 'guide' ? `/guides/${slug}` : `/news/${slug}`
  } else if (collectionSlug === 'team') {
    path = `/team/${slug}`
  } else if (collectionSlug === 'practice-areas') {
    path = `/practice-areas/${slug}`
  } else if (collectionSlug === 'vacancies') {
    path = `/vacancies/${slug}`
  } else if (collectionSlug === 'events') {
    path = `/events/${slug}`
  } else if (collectionSlug === 'cases') {
    path = `/cases/${slug}`
  } else if (slug === 'home') {
    path = '/'
  }

  const liveUrl = `${siteUrl}${path}`
  const googleTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(liveUrl)}`

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.825rem' }}>
        SEO Structured Data
      </label>
      <a
        href={googleTestUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.85rem',
          backgroundColor: '#BE1622',
          color: '#ffffff',
          borderRadius: '4px',
          fontSize: '0.825rem',
          fontWeight: 600,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <span>Test Structured Data (Rich Results)</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  )
}
export default RichResultsButton
